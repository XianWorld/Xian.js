var Enums = require("../../base/enums");
var Component = require("./../../core/component");
var Rect = require("../../math/rect");
var Vec2 = require("../../math/vec2");
"use strict";


function Renderable2D() {

    Component.call(this);

    this._width = 0;
    this._height = 0;
    this.blendMode = Enums.blendModes.NORMAL;
    this.alpha = 1;
    this.tint = 0xFFFFFF;
    this._anchor = new Vec2;


    this.worldAlpha = 1.0;
    this.worldMatrix = undefined;
    this._bounds = new Rect(0, 0, 1, 1);
    this._localBounds = new Rect(0, 0, 1, 1);
    //this._dirtyBounds = true;
    this._dirtySize = true;
    this._dirty = true;
}

Component.extend(Renderable2D);

Object.defineProperty(Renderable2D.prototype, "width", {
    get: function () {
        return this._width;
    },
    set: function (value) {
        if(this._width === value) return;
        this._width = value;
        this._dirty = true;
        this._dirtySize = true;
    }
});

Object.defineProperty(Renderable2D.prototype, "height", {
    get: function () {
        return this._height;
    },
    set: function (value) {
        if(this._height === value) return;
        this._height = value;
        this._dirty = true;
        this._dirtySize = true;
    }
});

Object.defineProperty(Renderable2D.prototype, "anchor", {
    get: function () {
        return this._anchor;
    },
    set: function (value) {
        if (value) this._anchor.copy(value);
        this._dirty = true;
        this._dirtySize = true;
    }
});

Renderable2D.prototype.copy = function (other) {

    this.width = other.width;
    this.height = other.height;
    this.blendMode = other.blendMode;
    this.alpha = other.alpha;
    this.tint = other.tint;
    this.anchor = other.anchor;

    return this;
};

Renderable2D.prototype.clear = function () {
    Component.prototype.clear.call(this);

    this._width = 0;
    this._height = 0;
    this.blendMode = Enums.blendModes.NORMAL;
    this.alpha = 1;
    this.tint = 0xFFFFFF;
    this.anchor.clear();

    //this._dirtyBounds = true;
    this._dirty = true;
    this._dirtySize = true;

    return this;
};

Renderable2D.prototype.destroy = function () {
    Component.prototype.destroy.call(this);

    this.anchor = undefined;
    this.worldMatrix = undefined;
    this._bounds = undefined;
    this._localBounds = undefined;
};

Renderable2D.prototype.update = function () {
    this.worldMatrix = this.transform.modelView;
    //when transform changed, the world bounds will update
    if(this.transform._pvm_changed)
        this._dirtyBounds = true;
};

Renderable2D.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.width = this._width;
    json.height = this._height;
    json.blendMode = this.blendMode;
    json.alpha = this.alpha;
    json.tint = this.tint;

    json.anchor = this._anchor.toJSON(json.anchor);

    return json;
};

Renderable2D.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.width = json.width || 0;
    this.height = json.height || 0;
    this.blendMode = json.blendMode || Enums.blendModes.NORMAL;
    this.alpha = json.alpha || 1;
    this.tint = json.tint || 0xFFFFFF;

    json.anchor ? this._anchor.fromJSON(json.anchor) : this._anchor.clear();
    return this;
};

//Renderable2D.prototype._setDirty= function() {
//    this._dirty = true;
//};
//Renderable2D.prototype.getDirty = function() {
//    return this._dirty || this._dirtySize;
//};
//Renderable2D.prototype._setSizeDirty = function() {
//    if (this._dirtySize) {
//        return;
//    }
//    this._dirtySize = true;
//    this._setDirty();
//};
//Renderable2D.prototype._clearDirty = function() {
//    this._dirty = false;
//};
//Renderable2D.prototype._clearSizeDirty = function() {
//    this._dirtySize = false;
//};

Renderable2D.prototype.getBounds = function()
{
    //if(this._dirtyBounds)
    {
        var worldTransform = this.transform.modelView;
        this.getLocalBounds();
        this._localBounds.getBounds(worldTransform, this._bounds);
        //this._dirtyBounds = false;
    }
    return this._bounds;
};

Renderable2D.prototype.getLocalBounds = function()
{
    return this._localBounds;//this.getBounds(Mat32.Identity);///PIXI.EmptyRectangle();
};


Renderable2D.prototype._render = function (renderer) {
};


module.exports = Renderable2D;
