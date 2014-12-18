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

    //this._updateRenderSize();
    this._dirtyRenderSize = true;
}

Renderable2D.extend(Sprite2D);

Object.defineProperty(Sprite2D.prototype, "texture", {
    get: function () {
        return this._texture;
    },
    set: function (value){
        this._texture = value;

        this._dirtyRenderSize = true;
    }
});
Object.defineProperty(Sprite2D.prototype, "textureClip", {
    get: function () {
        return this._textureClip;
    },
    set: function (value){
        this._textureClip = value;

        this._dirtyRenderSize = true;
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
    }else{
        this.sourceX = 0;
        this.sourceY = 0;
        this.sourceWidth = texture.width;
        this.sourceHeight = texture.height;

        this.destX = 0;
        this.destY = 0;
        this.destWidth = texture.width;
        this.destHeight = texture.height;
    }
    return this;
};

Sprite2D.prototype.copy = function (other) {

    return this;
};


Sprite2D.prototype.clear = function () {
    Renderable2D.prototype.clear.call(this);

    return this;
};

Sprite2D.prototype._render = function (renderer) {

    if(this._dirtyRenderSize){
        this._updateRenderSize();
        this._dirtyRenderSize = false;
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
