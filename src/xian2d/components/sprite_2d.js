var Enums = require("../../core/enums");
var Renderable2D = require("./renderable_2d");
var Assets = require("../../assets/assets");
//var TextureClip = require("../assets/texture_clip");
"use strict";


function Sprite2D(opts) {
    opts || (opts = {});

    Renderable2D.call(this, opts);

    this._width = opts.width || 0;
    this._height = opts.height || 0;

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

    //this._dirtyRenderSize = true;
}

Renderable2D.extend(Sprite2D);

Object.defineProperty(Sprite2D.prototype, "texture", {
    get: function () {
        return this._texture;
    },
    set: function (value) {
        if (this._texture === value) return;
        this._texture = value;
        //this.destTexture = value;

        this._dirtyRender = true;
        //this._updateRenderSize();
    }
});
Object.defineProperty(Sprite2D.prototype, "textureClip", {
    get: function () {
        return this._textureClip;
    },
    set: function (value) {
        this._textureClip = value;

        this._dirtyRender = true;
        //this._updateRenderSize();
    }
});
Object.defineProperty(Sprite2D.prototype, "width", {
    get: function () {
        return this._textureClip;
    },
    set: function (value) {
        if(this._width === value) return;
        this._width = value;

        this._dirtyRender = true;
    }
});
Object.defineProperty(Sprite2D.prototype, "height", {
    get: function () {
        return this._textureClip;
    },
    set: function (value) {
        if(this._height === value) return;
        this._height = value;

        this._dirtyRender = true;
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
        this.destWidth = this._width <= 0 ? textureClip.clipWidth : this._width;
        this.destHeight = this._height <= 0 ? textureClip.clipHeight : this._height;
    }
    else if (texture) {
        this.sourceX = 0;
        this.sourceY = 0;
        this.sourceWidth = texture.width;
        this.sourceHeight = texture.height;

        this.destX = 0;
        this.destY = 0;
        this.destWidth = this._width <= 0 ? texture.width : this._width;//;
        this.destHeight = this._height <= 0 ? texture.height : this._height;
    }
    //this._dirtyRenderSize = false;

    this.destTexture = texture;

    var bounds = this._localBounds;
    bounds.x =this.destX;
    bounds.y =this.destY;
    bounds.width =this.destWidth;
    bounds.height =this.destHeight;

    return this;
};

Sprite2D.prototype.copy = function (other) {

    return this;
};


Sprite2D.prototype.clear = function () {
    Renderable2D.prototype.clear.call(this);

    return this;
};

//Sprite2D.prototype.getLocalBounds = function()
//{
//    var bounds = this._localBounds;
//    var texture = this._texture,
//        textureClip = this.textureClip;
//
//    if(!texture) return bounds;
//
//    bounds.x = textureClip ? -textureClip.offsetX : 0;
//    bounds.y = textureClip ? -textureClip.offsetX : 0;
//    bounds.width = textureClip ? textureClip.clipWidth : texture.width;
//    bounds.height = textureClip ? textureClip.clipHeight : texture.height;
//
//    return bounds;//this.getBounds(Mat32.Identity);///PIXI.EmptyRectangle();
//};

Sprite2D.prototype.update = function () {
    Renderable2D.prototype.update.call(this);

};
Sprite2D.prototype._render = function (renderer) {
    if(this._dirtyRender){
        this._updateRenderSize();

        this._dirtyRender = false;
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
