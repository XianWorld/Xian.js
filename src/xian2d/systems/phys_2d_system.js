var ComponentSystem = require("./../../systems/component_system");
var RigidBody2D = require("./../components/rigid_body_2d");
var util = require("../../base/util");
var Time = require("../../context/main_context").Time;
var Color = require("../../math/color");
var Phys2D = require("../context/phys2d/phys2d");
"use strict";


function Phys2DSystem(opts) {
    //opts || (opts = {});

    ComponentSystem.call(this, opts);

    this.needsSort = false;
    this.order = -90000;

    this.addEventName = "addRigidBody2D";
    this.removeEventName = "removeRigidBody2D";
    this.componentType = RigidBody2D;

    this.space = new Phys2D.P2Space();//opts.space
}

ComponentSystem.extend(Phys2DSystem);

Phys2DSystem.prototype.onAdd = function (component) {
    this.space.addBody(component.body);
};

Phys2DSystem.prototype.onRemove = function (component) {
    this.space.removeBody(component.body);
};

Phys2DSystem.prototype.update = function () {
    ComponentSystem.prototype.update.call(this);

    this.space.step(Time.delta);
};

Phys2DSystem.prototype.clear = function () {
    ComponentSystem.prototype.clear.call(this);

    this.space.clear();
};

Phys2DSystem.prototype.toJSON = function (json) {
    json = ComponentSystem.prototype.toJSON.call(this, json);

    json.space = this.space.toJSON(json.space);

    return json;
};


Phys2DSystem.prototype.fromJSON = function (json) {
    ComponentSystem.prototype.fromJSON.call(this, json);

    if (json.space) this.space.fromJSON(json.space);

    return this;
};

module.exports = Phys2DSystem;