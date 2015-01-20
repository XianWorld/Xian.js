var Class = require("../../../base/class");
var Vec2 = require("../../../math/vec2");
var P2Enums = require("./p2enums");
var P2Solver = require("./p2solver");
var P2Broadphase = require("./collision/p2broadphase");
var P2Nearphase = require("./collision/p2nearphase");
var P2Friction = require("./constraints/p2friction");
var Context = require("../../../context/main_context");
var Time = Context.Time;
var ObjectPools = Context.ObjectPools;
var Log = Context.Log;
"use strict";


var now = Time.now,
    MotionState = P2Enums.MotionState,

    FRICTION_POOL = ObjectPools.getPool(P2Friction);//new ObjectPool(P2Friction);


function P2Space(opts) {
    opts || (opts = {});

    Class.call(this, opts);

    this.useGravity = opts.useGravity != undefined ? !!opts.useGravity : true;
    this.gravity = opts.gravity != undefined ? opts.gravity : new Vec2(0.0, 9.801);

    this.time = 0.0;

    this.broadphase = new P2Space.DefaultBroadPhase(opts.broadphase);
    this.nearphase = new P2Space.DefaultNearPhase(opts.nearphase);

    this.solver = new P2Space.DefaultSolver(opts.solver);

    this.bodies = [];
    this._bodyHash = {};

    this._pairsi = [];
    this._pairsj = [];

    this.contacts = [];
    this.frictions = [];
    this.constraints = [];

    this._collisionMatrix = [];
    this._collisionMatrixPrevious = [];

    this.stats = {
        step: 0.0,
        solve: 0.0,
        integrate: 0.0,
        nearphase: 0.0,
        broadphase: 0.0
    };
}

Class.extend(P2Space);


P2Space.DefaultBroadPhase = P2Broadphase;
P2Space.DefaultNearPhase = P2Nearphase;
P2Space.DefaultSolver = P2Solver;
P2Space.FRICTION_POOL = FRICTION_POOL;


P2Space.prototype.collisionMatrixGet = function (i, j, current) {
    var tmp = j;

    if (j > i) {
        j = i;
        i = tmp;
    }
    i = (i * (i + 1) >> 1) + j - 1;

    return (current === undefined || current) ? this._collisionMatrix[i] : this._collisionMatrixPrevious[i];
};


P2Space.prototype.collisionMatrixSet = function (i, j, value, current) {
    var tmp = j;

    if (j > i) {
        j = i;
        i = tmp;
    }

    i = (i * (i + 1) >> 1) + j - 1;

    if (current == undefined || current) {
        this._collisionMatrix[i] = value;
    } else {
        this._collisionMatrixPrevious[i] = value;
    }
};


P2Space.prototype.collisionMatrixTick = function () {
    var collisionMatrix = this._collisionMatrixPrevious,
        i;

    this._collisionMatrixPrevious = this._collisionMatrix;
    this._collisionMatrix = collisionMatrix;

    i = collisionMatrix.length;
    while (i--) collisionMatrix[i] = 0;
};


P2Space.prototype.clear = function () {
    var bodies = this.bodies,
        i = bodies.length;

    while (i--) this.removeBody(bodies[i]);

    return this;
};


P2Space.prototype.addBody = function (body) {
    var bodies = this.bodies,
        index = bodies.indexOf(body);

    if (index === -1) {
        bodies.push(body);
        this._bodyHash[body._id] = body;

        body.space = this;
        body._index = bodies.length - 1;

        body.init();
    } else {
        Log.error("P2Space.addBody: Body already member of P2Space");
    }

    return this;
};


P2Space.prototype.addBodies = function () {
    var i = arguments.length;

    while (i--) this.addBody(arguments[i]);
    return this;
};


P2Space.prototype.removeBody = function (body) {
    var bodies = this.bodies,
        index = bodies.indexOf(body);

    if (index !== -1) {
        body.space = undefined;
        body._index = -1;

        bodies.splice(index, 1);
        this._bodyHash[body._id] = undefined;
    } else {
        Log.error("P2Space.addBody: Body not member of P2Space");
    }

    return this;
};


P2Space.prototype.removeBodies = function () {
    var i = arguments.length;

    while (i--) this.removeBody(arguments[i]);
    return this;
};


P2Space.prototype.addConstraint = function (constraint) {
    var constraints = this.constraints,
        index = constraints.indexOf(constraint);

    if (index === -1) {
        constraints.push(constraint);
    } else {
        Log.error("P2Space.addConstraint: Constraint already member of P2Space");
    }

    return this;
};


P2Space.prototype.removeConstraint = function (constraint) {
    var constraints = this.constraints,
        index = constraints.indexOf(constraint);

    if (index !== -1) {
        constraints.splice(index, 1);
    } else {
        Log.error("P2Space.removeConstraint: Constraint not a member of P2Space");
    }

    return this;
};


P2Space.prototype.findBodyByPoint = function (p) {
    var bodies = this.bodies,
        body, shapes, shape,
        i = bodies.length,
        j;

    while (i--) {
        body = bodies[i];
        if (!body) continue;

        shapes = body.shapes;
        j = shapes.length;
        while (j--) {
            shape = shapes[j];
            if (!shape) continue;

            if (shape.pointQuery(p)) return body;
        }
    }

    return undefined;
};


P2Space.prototype.findBodyById = function (id) {

    return this._bodyHash[id];
};


P2Space.prototype.step = function (dt) {
    var stepStart = now(),
        stats = this.stats,
        g = this.gravity,
        gx = g.x,
        gy = g.y,
        bodies = this.bodies,
        numBodies = bodies.length,
        solver = this.solver,
        constraints = this.constraints,
        pairsi = this._pairsi,
        pairsj = this._pairsj,
        contacts = this.contacts,
        frictions = this.frictions,
        constraint, time, start, body, force, mass,
        bi, bj, c, cp, cn, u, slipForce, fc, fcp, fct,
        i;

    time = this.time += dt;

    if (this.useGravity) {
        i = numBodies;
        while (i--) {
            body = bodies[i];

            if (body.motionState === MotionState.Dynamic) {
                force = body.force;
                mass = body.mass;

                force.x += gx * mass;
                force.y += gy * mass;
            }
        }
    }

    this.collisionMatrixTick();

    start = now();
    this.broadphase.collisions(bodies, pairsi, pairsj);
    stats.broadphase = now() - start;

    start = now();
    this.nearphase.collisions(pairsi, pairsj, contacts);
    stats.nearphase = now() - start;

    start = now();
    solver.solve(dt, contacts);

    FRICTION_POOL.clear();
    frictions.length = 0;

    i = contacts.length;
    while (i--) {
        c = contacts[i];

        if (c.u > 0.0) {
            bi = c.bi;
            bj = c.bj;
            fc = FRICTION_POOL.create();
            u = c.u;

            slipForce = u * c.lambda;
            fc.minForce = -slipForce;
            fc.maxForce = slipForce;

            fc.bi = bi;
            fc.bj = bj;

            cp = c.p;
            fcp = fc.p;

            fcp.x = cp.x;
            fcp.y = cp.y;

            cn = c.n;
            fct = fc.t;

            fct.x = -cn.y;
            fct.y = cn.x;

            frictions.push(fc);
        }
    }

    solver.solve(dt, frictions);

    i = constraints.length;
    while (i--) {
        constraint = constraints[i];
        constraint.update();
        solver.solve(dt, constraint.equations);
    }
    stats.solve = now() - start;

    start = now();
    i = numBodies;
    while (i--) {
        body = bodies[i];
        if (!body) continue;

        body.update(dt);
        body.sleepTick(time);
    }
    stats.integrate = now() - start;

    stats.step = now() - stepStart;
};

P2Space.prototype.clear = function () {
    //TODO
};

P2Space.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.useGravity = this.useGravity;
    json.gravity = this.gravity.toJSON(json.gravity);
    json.broadphase = this.broadphase.toJSON(json.broadphase);

    return json;
};


P2Space.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.useGravity = json.useGravity !== undefined ? !!json.useGravity : true;
    if(json.gravity) this.gravity.fromJSON(json.gravity);
    if(json.broadphase) this.broadphase.fromJSON(json.broadphase);

    return this;
};


module.exports = P2Space;
