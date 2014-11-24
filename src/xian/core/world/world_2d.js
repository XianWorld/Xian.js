var util = require("../../base/util");
var Time = require("../../base/time");
var Color = require("../../math/color");
var World = require("./world");
var Phys2D = require("../../phys2d/phys2d");
"use strict";


function World2D(opts) {
    opts || (opts = {});

    World.call(this, opts);

    this.space = new Phys2D.P2Space(opts.space);
}

World.extend(World2D);


World2D.prototype.init = function () {
    var space = this.space,
        scene = this.scene,
        RigidBodies = scene.componentManagers.RigidBody2D;

    function addBody(component) {

        space.addBody(component.body);
    }

    if (RigidBodies) RigidBodies.forEach(addBody);
    scene.on("addRigidBody2D", addBody);

    scene.on("removeRigidBody2D", function (component) {
        space.removeBody(component.body);
    });
};


World2D.prototype.update = function () {

    this.space.step(Time.delta);
};


World2D.prototype.clear = function () {
    World.prototype.clear.call(this);

    return this;
};


World2D.prototype.toSYNC = function (json) {
    json = World.prototype.toSYNC.call(this, json);

    return json;
};


World2D.prototype.fromSYNC = function (json) {
    World.prototype.fromSYNC.call(this, json);

    return this;
};


World2D.prototype.toJSON = function (json) {
    json = World.prototype.toJSON.call(this, json);

    json.space = this.space.toJSON(json.space);

    return json;
};


World2D.prototype.fromJSON = function (json) {
    World.prototype.fromJSON.call(this, json);

    this.space.fromJSON(json.space);

    return this;
};


module.exports = World2D;
