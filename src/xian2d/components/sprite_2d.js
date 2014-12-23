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
}

Renderable2D.extend(Sprite2D);

Object.defineProperty(Sprite2D.prototype, "texture", {
    get: function () {
        return this._texture;
    },
    set: function (value) {
        if (this._texture === value) return;
        this._texture = value;
        this._dirtyRender = true;
        this._dirtyLocalBounds = true;
    }
});
Object.defineProperty(Sprite2D.prototype, "textureClip", {
    get: function () {
        return this._textureClip;
    },
    set: function (value) {
        this._textureClip = value;
        this._dirtyRender = true;
        this._dirtyLocalBounds = true;
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
        this._dirtyLocalBounds = true;
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
        this._dirtyLocalBounds = true;
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

    this.destTexture = texture;
    //
    //var bounds = this._localBounds;
    //bounds.x =this.destX;
    //bounds.y =this.destY;
    //bounds.width =this.destWidth;
    //bounds.height =this.destHeight;

    return this;
};

Sprite2D.prototype.getLocalBounds = function()
{
    if(this._dirtyLocalBounds){
        var texture = this._texture,
            textureClip = this._textureClip;
        var bounds = this._localBounds;

        if (textureClip) {
            bounds.x = -textureClip.offsetX;
            bounds.y = -textureClip.offsetY;
            bounds.width = this._width <= 0 ? textureClip.clipWidth : this._width;
            bounds.height = this._height <= 0 ? textureClip.clipHeight : this._height;
        }
        else if (texture) {
            bounds.x = 0;
            bounds.y = 0;
            bounds.width = this._width <= 0 ? texture.width : this._width;//;
            bounds.height = this._height <= 0 ? texture.height : this._height;
        }
        this._dirtyLocalBounds = false;
    }
    return this._localBounds;
};

Sprite2D.prototype.copy = function (other) {
    Renderable2D.prototype.copy.call(this, other);

    this.width = other._width;
    this.height = other._height;
    this.texture = other.texture;
    //TODO need test
    this.textureClip = other.textureClip;

    return this;
};

Sprite2D.prototype.clear = function () {
    Renderable2D.prototype.clear.call(this);

    this.width = 0;
    this.height = 0;
    this.texture = undefined;
    this.textureClip = undefined;

    return this;
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

    json.width = this._width;
    json.height = this._height;
    json.texture = this.texture ? this.texture.name : undefined;
    if(json.textureClip) this.textureClip.fromJSON(json.textureClip);

    return json;
};

Sprite2D.prototype.fromJSON = function (json) {
    Renderable2D.prototype.fromJSON.call(this, json);

    this.width = json.width;
    this.height = json.height;
    this.texture = json.texture ? Assets.get(json.texture) : undefined;
    if(this.textureClip) json.textureClip.toJSON(json.textureClip);

    return this;
};


module.exports = Sprite2D;