var Class = require("../../base/class");
var P2Enums = require("../p2enums");
var P2Shape = require("./p2shape");
"use strict";


var ShapeType = P2Enums.ShapeType,

    abs = Math.abs,
    PI = Math.PI;


function P2Circle(opts) {
    opts || (opts = {});

    P2Shape.call(this, opts);

    this.type = ShapeType.Circle;
    this.radius = opts.radius != undefined ? abs(opts.radius) : 0.5;
}

P2Shape.extend(P2Circle);


P2Circle.prototype.copy = function (other) {
    P2Shape.prototype.copy.call(this, other);

    this.radius = other.radius;

    return this;
};


P2Circle.prototype.pointQuery = function (p) {
    var x = this.position,
        dx = x.x - p.x,
        dy = x.y - p.y,
        r = this.radius;

    return (dx * dx + dy * dy) < r * r;
};


P2Circle.prototype.centroid = function (v) {
    var localPosition = this.localPosition;

    v.x = localPosition.x;
    v.y = localPosition.y;

    return v;
};


P2Circle.prototype.area = function () {
    var r = this.radius;

    return PI * (r * r);
};


P2Circle.prototype.inertia = function (mass) {
    var r = this.radius,
        localPosition = this.localPosition,
        lx = localPosition.x,
        ly = localPosition.y;

    return mass * ((r * r * 0.5) + (lx * lx + ly * ly));
};


P2Circle.prototype.update = function (matrix) {
    var localMatrix = this.matrix,
        matrixWorld = this.matrixWorld,
        localPosition = this.localPosition,
        pos = this.position,
        r = this.radius,
        aabb = this.aabb,
        min = aabb.min,
        max = aabb.max,
        x, y;

    localMatrix.setRotation(this.localRotation);
    localMatrix.setPosition(localPosition);
    matrixWorld.mmul(matrix, localMatrix);

    pos.x = localPosition.x;
    pos.y = localPosition.y;
    pos.transformMat32(matrix);
    x = pos.x;
    y = pos.y;

    min.x = x - r;
    min.y = y - r;
    max.x = x + r;
    max.y = y + r;
};


P2Circle.prototype.toJSON = function (json) {
    json = P2Shape.prototype.toJSON.call(this, json);

    json.radius = this.radius;

    return json;
};


P2Circle.prototype.fromJSON = function (json) {
    P2Shape.prototype.fromJSON.call(this, json);

    this.radius = json.radius;

    return this;
};


module.exports = P2Circle;
