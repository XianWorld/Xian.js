var Enums = require("../../core/enums");
var Renderable2D = require("./renderable_2d");
var Assets = require("../../assets/assets");
//var TextureClip = require("../assets/texture_clip");
"use strict";


function Sprite2D(opts) {
    opts || (opts = {});

    Renderable2D.call(this, opts);

    this._texture = opts.texture !== undefined ? opts.texture : undefined;
    this._textureClip = opts.textureClip !== undefined ? opts.textureClip : undefined;

    this.sourceX = 0;
    this.sourceY = 0;
    this.sourceWidth = 0;
    this.sourceHeight = 0;

    this.destX = 0;
    this.destY = 0;
    this.destWidth = 0;
    this.destHeight = 0;
    this.destTexture = undefined;

    //if (this._texture)
    //    this._updateRenderSize();
    this._dirtyRenderSize = true;
}

Renderable2D.extend(Sprite2D);

Object.defineProperty(Sprite2D.prototype, "texture", {
    get: function () {
        return this._texture;
    },
    set: function (value) {
        if (this._texture === value) return;
        this._texture = value;
        this.destTexture = value;

        this._dirtyRenderSize = true;
        //this._updateRenderSize();
    }
});
Object.defineProperty(Sprite2D.prototype, "textureClip", {
    get: function () {
        return this._textureClip;
    },
    set: function (value) {
        this._textureClip = value;

        this._dirtyRenderSize = true;
        //this._updateRenderSize();
    }
});

Sprite2D.prototype._updateRenderSize = function () {
    var texture = this._texture,
        textureClip = this._textureClip;

    if (textureClip) {
        this.sourceX = textureClip.clipX;
        this.sourceY = textureClip.clipY;
        this.sourceWidth = textureClip.clipWidth;
        this.sourceHeight = textureClip.clipHeight;

        this.destX = -textureClip.offsetX;
        this.destY = -textureClip.offsetY;
        this.destWidth = textureClip.clipWidth;
        this.destHeight = textureClip.clipHeight;
    }
    else if (texture) {
        this.sourceX = 0;
        this.sourceY = 0;
        this.sourceWidth = texture.width;
        this.sourceHeight = texture.height;

        this.destX = 0;
        this.destY = 0;
        this.destWidth = texture.width;
        this.destHeight = texture.height;
    }
    this._dirtyRenderSize = false;

    return this;
};

Sprite2D.prototype.copy = function (other) {

    return this;
};


Sprite2D.prototype.clear = function () {
    Renderable2D.prototype.clear.call(this);

    return this;
};

Sprite2D.prototype.getBounds = function (matrix) {
//    var w0 = this.destX + this.destWidth;
//    var w1 = this.destX;
//    var h0 = this.destY + this.destHeight;
//    var h1 = this.destY;
//
//    return this._getBounds(w1, h1, w0, h0, matrix);
//};
//
//Sprite2D.prototype._getBounds = function (w1, h1, w0, h0, matrix) {
//    if(this._dirtyRenderSize){
//        this._updateRenderSize();
//        this._dirtyRenderSize = false;
//    }

    //var width = this.texture.frame.width;
    //var height = this.texture.frame.height;
    //
    //var w0 = width * (1-this.anchor.x);
    //var w1 = width * -this.anchor.x;
    //
    //var h0 = height * (1-this.anchor.y);
    //var h1 = height * -this.anchor.y;

    var w0 = this.destX + this.destWidth;
    var w1 = this.destX;

    var h0 = this.destY + this.destHeight;
    var h1 = this.destY;

    var worldTransform = matrix || this.transform.modelView;
    var m = worldTransform.elements;
    var a = m[0];
    var b = m[1];
    var c = m[2];
    var d = m[3];
    var tx = m[4];
    var ty = m[5];

    var x1 = a * w1 + c * h1 + tx;
    var y1 = d * h1 + b * w1 + ty;

    var x2 = a * w0 + c * h1 + tx;
    var y2 = d * h1 + b * w0 + ty;

    var x3 = a * w0 + c * h0 + tx;
    var y3 = d * h0 + b * w0 + ty;

    var x4 = a * w1 + c * h0 + tx;
    var y4 = d * h0 + b * w1 + ty;

    var maxX = -Infinity;
    var maxY = -Infinity;

    var minX = Infinity;
    var minY = Infinity;

    minX = x1 < minX ? x1 : minX;
    minX = x2 < minX ? x2 : minX;
    minX = x3 < minX ? x3 : minX;
    minX = x4 < minX ? x4 : minX;

    minY = y1 < minY ? y1 : minY;
    minY = y2 < minY ? y2 : minY;
    minY = y3 < minY ? y3 : minY;
    minY = y4 < minY ? y4 : minY;

    maxX = x1 > maxX ? x1 : maxX;
    maxX = x2 > maxX ? x2 : maxX;
    maxX = x3 > maxX ? x3 : maxX;
    maxX = x4 > maxX ? x4 : maxX;

    maxY = y1 > maxY ? y1 : maxY;
    maxY = y2 > maxY ? y2 : maxY;
    maxY = y3 > maxY ? y3 : maxY;
    maxY = y4 > maxY ? y4 : maxY;

    var bounds = this._bounds;

    bounds.x = minX;
    bounds.width = maxX - minX;

    bounds.y = minY;
    bounds.height = maxY - minY;

    // store a reference so that if this function gets called again in the render cycle we do not have to recalculate
    //this._currentBounds = bounds;

    return bounds;
};

Sprite2D.prototype._render = function (renderer) {
    this.worldMatrix = this.transform.modelView;

    if(this._dirtyRenderSize){
        this._updateRenderSize();
    }

    //renderer.drawImage(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, this.tint);
    renderer.renderSprite2D(this);
};

Sprite2D.prototype.toJSON = function (json) {
    json = Renderable2D.prototype.toJSON.call(this, json);

    json.texture = this.texture ? this.texture.name : undefined;

    return json;
};


Sprite2D.prototype.fromJSON = function (json) {
    Renderable2D.prototype.fromJSON.call(this, json);

    this.texture = json.texture ? Assets.get(json.texture) : undefined;

    return this;
};


module.exports = Sprite2D;
