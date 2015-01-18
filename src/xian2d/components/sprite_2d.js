var Enums = require("../../base/enums");
var Vec2 = require("../../math/vec2");
var Rect = require("../../math/rect");
var Renderable2D = require("./renderable_2d");
var Assets = require("../../context/main_context").Assets;
//var TextureClip = require("../context/assets/texture_clip");
"use strict";


function Sprite2D(opts) {
    //opts || (opts = {});

    Renderable2D.call(this, opts);

    this._texture = undefined;
    //this.texture = opts.texture !== undefined ? opts.texture : undefined;

    this.cliped = false;
    this._clip = new Rect;
    this.trimed = false;
    this._trim = new Rect;
    this.anchored = false;
    this._anchor = new Vec2;

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

Sprite2D.prototype.onAssetInited = function(asset) {
    this._dirtyRender = true;
    this._dirtySize = true;
};

Object.defineProperty(Sprite2D.prototype, "texture", {
    get: function () {
        return this._texture;
    },
    set: function (value) {
        if (this._texture === value) return;
        if (this._texture) this._texture.release(this);
        this._texture = value;
        if (this._texture) this._texture.retain(this);
        this._dirtyRender = true;
        this._dirtySize = true;
    }
});

Object.defineProperty(Sprite2D.prototype, "textureClip", {
    set: function (value) {
        if (!value) return;
        this.cliped = true;
        this._clip.copy(value.clip);
        this.anchored = value.anchored;
        if(this.anchored) this._anchor.copy(value.anchor);
        this.trimed = value.trimed;
        if(this.trimed) this._trim.copy(value.trim);
        this._dirtyRender = true;
        this._dirtySize = true;
    }
});

Object.defineProperty(Sprite2D.prototype, "anchor", {
    get: function () {
        return this._anchor;
    },
    set: function (value) {
        if (value) this._anchor.copy(value);
        this._dirtyRender = true;
        this._dirtySize = true;
    }
});

Object.defineProperty(Sprite2D.prototype, "clip", {
    get: function () {
        return this._clip;
    },
    set: function (value) {
        if (value) this._clip.copy(value);
        this._dirtyRender = true;
        this._dirtySize = true;
    }
});

Object.defineProperty(Sprite2D.prototype, "trim", {
    get: function () {
        return this._trim;
    },
    set: function (value) {
        if (value) this._trim.copy(value);
        this._dirtyRender = true;
        this._dirtySize = true;
    }
});

Sprite2D.prototype._updateRenderSize = function () {
    var texture = this._texture,
        anchor = this._anchor,
        clip = this._clip,
        trim = this._trim;

    if(!texture) return;

    this.sourceX = this.cliped ? clip.x : 0;
    this.sourceY = this.cliped ? clip.y : 0;
    this.sourceWidth = this.cliped ? clip.width : texture.width;
    this.sourceHeight = this.cliped ? clip.height : texture.height;

    this.destWidth = this.sourceWidth;
    this.destHeight = this.sourceHeight;
    if (!this.trimed) {
        this.destX = this.anchored ? -(anchor.x * this.destWidth) : 0;
        this.destY = this.anchored ? -(anchor.y * this.destHeight) : 0;
    }
    else {
        this.destX = this.anchored ? trim.x -(anchor.x * trim.width) : trim.x;
        this.destY = this.anchored ? trim.y -(anchor.y * trim.height) : trim.y;
    }

    var sx, sy;
    if (this._width > 0) {
        sx = this._width / this.destWidth;
        this.destWidth *= sx;
        this.destX *= sx;
    }
    if (this._height > 0) {
        sy = this._height / this.destHeight;
        this.destHeight *= sy;
        this.destY *= sy;
    }

    this.destTexture = texture;

    return this;
};

Sprite2D.prototype.getLocalBounds = function () {
    if (this._dirtySize) {
        var bounds = this._localBounds;

        this._updateRenderSize();
        bounds.x = this.destX;
        bounds.y = this.destY;
        bounds.width = this.destWidth;
        bounds.height = this.destHeight;
        this._dirtySize = false;
    }
    return this._localBounds;
};

Sprite2D.prototype.copy = function (other) {
    Renderable2D.prototype.copy.call(this, other);

    this.width = other._width;
    this.height = other._height;
    this.texture = other.texture;
    this.clip = other.clip;
    this.trim = other.trim;
    this.anchor = other.anchor;
    this.anchored = other.anchored;
    this.trimed = other.trimed;
    this.cliped = other.cliped;

    return this;
};

Sprite2D.prototype.clear = function () {
    Renderable2D.prototype.clear.call(this);

    this.width = 0;
    this.height = 0;
    this.texture = undefined;
    this.anchor.clear();
    this.clip.clear();
    this.trim.clear();
    this.anchored = false;
    this.trimed = false;
    this.cliped = false;

    return this;
};
Sprite2D.prototype.destroy = function () {
    Renderable2D.prototype.destroy.call(this);

    this.anchor = undefined;
    this.clip = undefined;
    this.trim = undefined;
    return this;
};

Sprite2D.prototype.toJSON = function (json) {
    json = Renderable2D.prototype.toJSON.call(this, json);

    json.texture = this.texture ? this.texture.name : undefined;
    json.cliped = this.cliped;
    if(this.cliped) json.clip = this._clip.toJSON(json.clip);
    json.trimed = this.trimed;
    if(this.trimed) json.trim = this._trim.toJSON(json.trim);
    json.anchored = this.anchored;
    if(this.anchored) json.anchor = this._anchor.toJSON(json.anchor);

    return json;
};

Sprite2D.prototype.fromJSON = function (json) {
    Renderable2D.prototype.fromJSON.call(this, json);

    this.texture = json.texture ? Assets.load(json.texture, "Texture") : undefined;
    this.cliped = json.cliped;
    if(json.clip) this._clip.fromJSON(json.clip);
    this.trimed = json.trimed;
    if(json.trim) this._trim.fromJSON(json.trim);
    this.anchored = json.anchored;
    if(json.anchor) this._anchor.fromJSON(json.anchor);

    this._dirtyRender = true;
    this._dirtySize = true;
    return this;
};

Sprite2D.prototype._render = function (renderer) {
    if (!this.texture || !this.texture.ready) return;
    if (this._dirtyRender) {
        this._updateRenderSize();
        this._dirtyRender = false;
    }

    //renderer.drawImage(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, this.tint);
    renderer.renderSprite2D(this);
};


module.exports = Sprite2D;