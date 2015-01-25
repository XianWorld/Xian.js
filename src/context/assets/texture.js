var Enums = require("../../base/enums");
var Asset = require("./asset");
"use strict";


function Texture(opts) {
    //opts || (opts = {});

    Asset.call(this, opts);

    this._image = undefined;

    this.width = 0;
    this.height = 0;

    //this.invWidth = 0;
    //this.invHeight = 0;

    this.generateMipmap = true;
    this.flipY = true;
    this.premultiplyAlpha = true;

    this.anisotropy = 1;

    this.filter = Enums.filterMode.LINEAR;
    this.format = Enums.TextureFormat.RGBA;
    this.wrap = Enums.TextureWrap.Repeat;
    //this.generateMipmap = opts.generateMipmap !== undefined ? !!opts.generateMipmap : true;
    //this.flipY = opts.flipY !== undefined ? !!opts.flipY : true;
    //this.premultiplyAlpha = opts.premultiplyAlpha !== undefined ? !!opts.premultiplyAlpha : true;
    //
    //this.anisotropy = opts.anisotropy !== undefined ? opts.anisotropy : 1;
    //
    //this.filter = opts.filter !== undefined ? opts.filter : Enums.filterMode.LINEAR;
    //this.format = opts.format !== undefined ? opts.format : Enums.TextureFormat.RGBA;
    //this.wrap = opts.wrap !== undefined ? opts.wrap : Enums.TextureWrap.Repeat;

    this.resolution = 1;

    this.needsUpdate = true;

    this._powerOf2 = false;
}

Asset.extend(Texture);

Object.defineProperty(Texture.prototype, "image", {
    get: function(){
        return this._image;
    },
    set: function(value){
        if(this._image === value) return;
        this._image = value;
        if(value){
            this.width = value.width;
            this.height = value.height;
        }
        this.needsUpdate = true;
    }
});
Texture.prototype.clear = function () {

    //TODO
    this._image = undefined;

    return this;
};

Texture.prototype.copy = function (other) {
    Asset.prototype.copy.call(this, other);

    this.width = other.width;
    this.height = other.height;

    //this.invWidth = other.invWidth;
    //this.invHeight = other.invHeight;

    this.generateMipmap = other.generateMipmap;
    this.flipY = other.flipY;
    this.premultiplyAlpha = other.premultiplyAlpha;

    this.anisotropy = other.anisotropy;

    this.filter = other.filter;
    this.format = other.format;
    this.wrap = other.wrap;

    return this;
};


//Texture.prototype.parse = function (raw) {
//    Asset.prototype.parse.call(this, raw);
//
//    this.width = raw.width;
//    this.height = raw.height;
//
//    //this.invWidth = 1 / this.width;
//    //this.invHeight = 1 / this.height;
//
//    return this;
//};


Texture.prototype.setMipmap = function (value) {

    this.generateMipmap = value !== undefined ? !!value : !this.generateMipmap;
    this.needsUpdate = true;
};


Texture.prototype.setAnisotropy = function (value) {

    this.anisotropy = value;
    this.needsUpdate = true;
};


Texture.prototype.setFilter = function (value) {

    this.filter = value;
    this.needsUpdate = true;
};


Texture.prototype.setFormat = function (value) {

    this.format = value;
    this.needsUpdate = true;
};


Texture.prototype.setWrap = function (value) {

    this.wrap = value;
    this.needsUpdate = true;
};


Texture.prototype.toJSON = function (json, pack) {
    json = Asset.prototype.toJSON.call(this, json);

    if ((pack || !this.src) && this.image) {
        if (typeof(window) === "undefined") {
            json.image = this.image;
        } else {
            var raw = this.image,
                canvas = document.createElement("canvas"),
                ctx = canvas.getContext("2d");

            canvas.width = raw.width;
            canvas.height = raw.height;
            ctx.drawImage(raw, 0, 0);

            json.image = canvas.toDataURL();
        }
    }

    json.width = this.width;
    json.height = this.height;

    //json.invWidth = this.invWidth;
    //json.invHeight = this.invHeight;

    json.generateMipmap = this.generateMipmap;
    json.flipY = this.flipY;
    json.premultiplyAlpha = this.premultiplyAlpha;

    json.anisotropy = this.anisotropy;

    json.filter = this.filter;
    json.format = this.format;
    json.wrap = this.wrap;

    return json;
};

Texture.prototype.fromJSON = function (json) {
    Asset.prototype.fromJSON.call(this, json);

    if (!json.src && json.image) {
        if (typeof(window) === "undefined") {
            this.image = json.image;
        } else {
            var image = new Image;
            image.src = json.image;
            this.image = image;
        }
    }

    this.width = json.width || 0;
    this.height = json.height || 0;

    //this.invWidth = json.invWidth;
    //this.invHeight = json.invHeight;

    this.generateMipmap = json.generateMipmap !== undefined ? !!json.generateMipmap : true;
    this.flipY = json.flipY !== undefined ? !!json.flipY : true;
    this.premultiplyAlpha = json.premultiplyAlpha !== undefined ? !!json.premultiplyAlpha : true;

    this.anisotropy = json.anisotropy !== undefined ? json.anisotropy : 1;

    this.filter = json.filter !== undefined ? json.filter : Enums.filterMode.LINEAR;
    this.format = json.format !== undefined ? json.format : Enums.TextureFormat.RGBA;
    this.wrap = json.wrap !== undefined ? json.wrap : Enums.TextureWrap.Repeat;

    //this.generateMipmap = json.generateMipmap;
    //this.flipY = json.flipY;
    //this.premultiplyAlpha = json.premultiplyAlpha;
    //
    //this.anisotropy = json.anisotropy;
    //
    //this.filter = json.filter;
    //this.format = json.format;
    //this.wrap = json.wrap;

    return this;
};

Texture.fromCanvas = function(canvas)
{
    var texture = new Texture();
    texture.image = canvas;
    texture.state = Asset.AssetState.INITED;
    return texture;
};

module.exports = Texture;
