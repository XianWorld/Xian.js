var Enums = require("../../core/enums");
var Component = require("./../../core/component");
var Assets = require("../../assets/assets");
var Rect = require("../../math/rect");
"use strict";


function Renderable2D(opts) {
    opts || (opts = {});

    Component.call(this, opts);

    this.visible = opts.visible !== undefined ? !!opts.visible : true;
    this.blendMode = opts.blendMode !== undefined ? opts.blendMode : Enums.blendModes.NORMAL;

    //this.layer = opts.layer !== undefined ? opts.layer : 0;
    //this.z = opts.z !== undefined ? opts.z : 0;

    this.alpha = opts.alpha !== undefined ? opts.alpha : 1;

    this.tint = opts.tint !== undefined ? opts.tint : 0xFFFFFF;

    this.worldAlpha = 1.0;

    this.worldMatrix = undefined;

    //this.mask = opts.mask !== undefined ? opts.mask : undefined;
}

Component.extend(Renderable2D);


Renderable2D.prototype.copy = function (other) {

    this.visible = other.visible;
    this.blendMode = other.blendMode;

    //this.layer = other.layer;
    //this.z = other.z;

    this.alpha = other.alpha;
    this.tint = other.tint;

    //this.material = other.material;
    //
    //this.width = other.width;
    //this.height = other.height;
    //
    //this.x = other.x;
    //this.y = other.y;
    //this.w = other.w;
    //this.h = other.h;
    //
    //this._webglInitted = false;

    return this;
};


Renderable2D.prototype.clear = function () {
    Component.prototype.clear.call(this);

    //this.material = undefined;
    //this._webglInitted = false;

    return this;
};

//Renderable2D.prototype.update = function () {
//// multiply the alphas..
//    var transform = this.transform || this.transform2d;
//    //this.worldAlpha = this.alpha * transform.parent.worldAlpha;
//
//};

Renderable2D.prototype.startRender = function (renderer) {
    if (!this.visible) {
        return;
    }
    var transform = this.transform;
    //renderer.setAlpha(this.worldAlpha, this.blendMode);
    //renderer.setTransform(transform.modelView);

    this.worldMatrix = transform.modelView;

    this._render(renderer);

};

Renderable2D.prototype._render = function (renderer) {

};

Renderable2D.prototype.finishRender = function (renderer) {

};

Renderable2D.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.visible = this.visible;
    json.blendMode = this.blendMode;

    //json.layer = this.layer;
    //json.z = this.z;

    json.alpha = this.alpha;
    json.tint = this.tint;

    //if(this.mask)
    //    json.mask = this.mask.toJSON(json.mask);

    //json.material = this.material ? this.material.name : undefined;

    //json.width = this.width;
    //json.height = this.height;
    //
    //json.x = this.x;
    //json.y = this.y;
    //json.w = this.w;
    //json.h = this.h;

    return json;
};


Renderable2D.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.visible = json.visible;
    this.blendMode = json.blendMode;

    //this.layer = json.layer;
    //this.z = json.z;

    this.alpha = json.alpha;
    this.tint = json.tint;

    //if(json.mask){
    //    this.mask = new Rect();
    //    this.mask.fromJSON(json.mask);
    //}
    //else
    //    this.mask = undefined;

    //this.material = json.material ? Assets.get(json.material) : undefined;

    //this.width = json.width;
    //this.height = json.height;
    //
    //this.x = json.x;
    //this.y = json.y;
    //this.w = json.w;
    //this.h = json.h;
    //
    //this._webglInitted = false;

    return this;
};


module.exports = Renderable2D;
