var Enums = require("../enums");
var Component = require("./component");
var Assets = require("../assets/assets");
"use strict";


function Sprite(opts) {
    opts || (opts = {});

    Component.call(this, "Sprite", opts);

    this.visible = opts.visible != undefined ? !!opts.visible : true;
    this.blending = opts.blending != undefined ? opts.blending : Enums.Blending.Default;

    this.layer = opts.layer != undefined ? opts.layer : 0;
    this.z = opts.z != undefined ? opts.z : 0;

    this.alpha = opts.alpha != undefined ? opts.alpha : 1;

    this.material = opts.material != undefined ? opts.material : undefined;

    this.width = opts.width || 1;
    this.height = opts.height || 1;

    this.x = opts.x || 0;
    this.y = opts.y || 0;
    this.w = opts.w || 1;
    this.h = opts.h || 1;

    this._webglInitted = false;
}

Component.extend(Sprite);


Sprite.prototype.copy = function (other) {

    this.visible = other.visible;
    this.blending = other.blending;

    this.layer = other.layer;
    this.z = other.z;

    this.alpha = other.alpha;

    this.material = other.material;

    this.width = other.width;
    this.height = other.height;

    this.x = other.x;
    this.y = other.y;
    this.w = other.w;
    this.h = other.h;

    this._webglInitted = false;

    return this;
};


Sprite.prototype.clear = function () {
    Component.prototype.clear.call(this);

    this.material = undefined;
    this._webglInitted = false;

    return this;
};


Sprite.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.visible = this.visible;
    json.blending = this.blending;

    json.layer = this.layer;
    json.z = this.z;

    json.alpha = this.alpha;

    json.material = this.material ? this.material.name : undefined;

    json.width = this.width;
    json.height = this.height;

    json.x = this.x;
    json.y = this.y;
    json.w = this.w;
    json.h = this.h;

    return json;
};


Sprite.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.visible = json.visible;
    this.blending = json.blending;

    this.layer = json.layer;
    this.z = json.z;

    this.alpha = json.alpha;

    this.material = json.material ? Assets.get(json.material) : undefined;

    this.width = json.width;
    this.height = json.height;

    this.x = json.x;
    this.y = json.y;
    this.w = json.w;
    this.h = json.h;

    this._webglInitted = false;

    return this;
};


module.exports = Sprite;
