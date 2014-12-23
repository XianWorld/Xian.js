var Enums = require("../../core/enums");
var Component = require("./../../core/component");
var Rect = require("../../math/rect");
//var Mat32 = require("../../math/mat32");
"use strict";


function Renderable2D(opts) {
    opts || (opts = {});

    Component.call(this, opts);

    this.blendMode = opts.blendMode !== undefined ? opts.blendMode : Enums.blendModes.NORMAL;

    this.alpha = opts.alpha !== undefined ? opts.alpha : 1;

    this.tint = opts.tint !== undefined ? opts.tint : 0xFFFFFF;

    this.worldAlpha = 1.0;
    this.worldMatrix = undefined;

    this._bounds = new Rect(0, 0, 1, 1);
    this._localBounds = new Rect(0, 0, 1, 1);
    this._dirtyBounds = true;
    this._dirtyLocalBounds = true;

    this._dirtyRender = true;
}

Component.extend(Renderable2D);

Renderable2D.prototype.copy = function (other) {

    this.blendMode = other.blendMode;
    this.alpha = other.alpha;
    this.tint = other.tint;

    return this;
};

Renderable2D.prototype.clear = function () {
    Component.prototype.clear.call(this);

    this.blendMode = Enums.blendModes.NORMAL;
    this.alpha = 1;
    this.tint = 0xFFFFFF;

    this._dirtyBounds = true;
    this._dirtyRender = true;
    this._dirtyLocalBounds = true;

    return this;
};

Renderable2D.prototype.getBounds = function()
{
    if(this._dirtyBounds)
    {
        var worldTransform = this.transform.modelView;
        this.getLocalBounds();
        this._localBounds.getBounds(worldTransform, this._bounds);
        this._dirtyBounds = false;
    }
    return this._bounds;
};

Renderable2D.prototype.getLocalBounds = function()
{
    return this._localBounds;//this.getBounds(Mat32.Identity);///PIXI.EmptyRectangle();
};

Renderable2D.prototype.update = function () {
    this.worldMatrix = this.transform.modelView;
    //when transform changed, the world bounds will update
    if(this.transform._matrix_changed)
        this._dirtyBounds = true;
};

Renderable2D.prototype._render = function (renderer) {
};

Renderable2D.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.blendMode = this.blendMode;
    json.alpha = this.alpha;
    json.tint = this.tint;

    return json;
};

Renderable2D.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.blendMode = json.blendMode;
    this.alpha = json.alpha;
    this.tint = json.tint;
    return this;
};

module.exports = Renderable2D;
