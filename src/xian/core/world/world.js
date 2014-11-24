var Class = require("../../base/class");
var Color = require("../../math/color");
"use strict";


function World(opts) {
    opts || (opts = {});

    Class.call(this);

    this.scene = undefined;

    this.ambient = opts.ambient != undefined ? opts.ambient : new Color;
}

Class.extend(World);


World.prototype.init = function () {

};


World.prototype.start = function () {

};


World.prototype.update = function () {

};


World.prototype.clear = function () {

    return this;
};


World.prototype.destroy = function () {
    if (!this.scene) {
        Log.error("World.destroy: can't destroy World if it's not set to a Scene");
        return this;
    }

    this.scene.removeWorld();
    this.emit("destroy");

    this.clear();

    return this;
};


World.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.ambient = this.ambient.toJSON(json.ambient);

    return json;
};


World.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.ambient.fromJSON(json.ambient);

    return this;
};


module.exports = World;
