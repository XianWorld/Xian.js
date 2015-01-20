var Class = require("../../../../base/class");
var Vec2 = require("../../../../math/vec2");
var Mat32 = require("../../../../math/mat32");
var AABB2 = require("../../../../math/aabb2");
"use strict";


function P2Shape(opts) {
    opts || (opts = {});

    Class.call(this);

    this.type = -1;

    this.body = undefined;

    this.density = opts.density != undefined ? opts.density : 1;

    this.localPosition = opts.position != undefined ? opts.position : new Vec2;
    this.localRotation = opts.rotation != undefined ? opts.rotation : 0;

    this.position = new Vec2;
    this.rotation = 0;

    this.matrix = new Mat32;
    this.matrixWorld = new Mat32;

    this.friction = opts.friction != undefined ? opts.friction : 0.5;
    this.elasticity = opts.elasticity != undefined ? opts.elasticity : 0.25;

    this.isTrigger = opts.isTrigger != undefined ? !!opts.isTrigger : false;

    this.filterMask = opts.filterMask != undefined ? opts.filterMask : 1;
    this.filterGroup = opts.filterGroup != undefined ? opts.filterGroup : 1;

    this.aabb = new AABB2;
}

Class.extend(P2Shape);


P2Shape.prototype.copy = function (other) {

    this.density = other.density;

    this.localPosition.copy(other.localPosition);
    this.localRotation = other.localRotation;

    this.friction = other.friction;
    this.elasticity = other.elasticity;

    this.isTrigger = other.isTrigger;

    this.filterMask = other.filterMask;
    this.filterGroup = other.filterGroup;

    return this;
};


P2Shape.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.density = this.density;

    json.localPosition = this.localPosition.toJSON(json.localPosition);
    json.localRotation = this.localRotation;

    json.friction = this.friction;
    json.elasticity = this.elasticity;

    json.isTrigger = this.isTrigger;

    json.filterMask = this.filterMask;
    json.filterGroup = this.filterGroup;

    return json;
};


P2Shape.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.density = json.density || 1;

    json.localPosition ? this.localPosition.fromJSON(json.localPosition) : this.localPosition.clear();
    this.localRotation = json.localRotation || 0;

    this.friction = json.friction || 0.5;
    this.elasticity = json.elasticity || 0.25;

    this.isTrigger = json.isTrigger !== undefined ? !!json.isTrigger : false;

    this.filterMask = json.filterMask || 1;
    this.filterGroup = json.filterGroup || 1;

    return this;
};


module.exports = P2Shape;
