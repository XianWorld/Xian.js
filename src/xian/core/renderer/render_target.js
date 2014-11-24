var Class = require("../../base/class");
var Enums = require("../enums");
"use strict";

/**
 * @class RenderTarget
 * @extends Class
 * @brief WebGL Render Target helper
 */

function RenderTarget(opts) {
    opts || (opts = {});

    Class.call(this);

    this.width = opts.width || 512;
    this.height = opts.height || 512;

    this.invWidth = 1 / this.width;
    this.invHeight = 1 / this.height;

    this.depthOnly = opts.depthOnly != undefined ? !!opts.depthOnly : false;
    this.depthBuffer = opts.depthBuffer != undefined ? !!opts.depthBuffer : true;
    this.stencilBuffer = opts.stencilBuffer != undefined ? !!opts.stencilBuffer : true;

    this.generateMipmap = opts.generateMipmap != undefined ? !!opts.generateMipmap : true;
    this.flipY = opts.flipY != undefined ? !!opts.flipY : true;
    this.premultiplyAlpha = opts.premultiplyAlpha != undefined ? !!opts.premultiplyAlpha : false;

    this.anisotropy = opts.anisotropy != undefined ? opts.anisotropy : 1;

    this.filter = opts.filter != undefined ? opts.filter : Enums.FilterMode.Linear;
    this.format = opts.format != undefined ? opts.format : Enums.TextureFormat.RGBA;
    this.wrap = opts.wrap != undefined ? opts.wrap : Enums.TextureWrap.Repeat;

    this._webglUsed = 0;
    this._webgl = undefined;
    this._webglFramebuffer = undefined;
    this._webglRenderbuffer = undefined;
}

Class.extend(RenderTarget);


RenderTarget.prototype.clone = function () {

    return new RenderTarget().copy(this);
};


RenderTarget.prototype.copy = function (other) {

    this.width = other.width;
    this.height = other.height;

    this.invWidth = other.invWidth;
    this.invHeight = other.invHeight;

    this.generateMipmap = other.generateMipmap;
    this.flipY = other.flipY;
    this.premultiplyAlpha = other.premultiplyAlpha;

    this.anisotropy = other.anisotropy;

    this.filter = other.filter;
    this.format = other.format;
    this.wrap = other.wrap;

    return this;
};


RenderTarget.prototype.setWidth = function (width) {

    this.width = width || this.width;
    this.needsUpdate = true;
};


RenderTarget.prototype.setHeight = function (height) {

    this.height = height || this.height;
    this.needsUpdate = true;
};


RenderTarget.prototype.setMipmap = function (value) {

    this.generateMipmap = value != undefined ? !!value : !this.generateMipmap;
    this.needsUpdate = true;
};


RenderTarget.prototype.setAnisotropy = function (value) {

    this.anisotropy = value;
    this.needsUpdate = true;
};


RenderTarget.prototype.setFilter = function (value) {

    this.filter = value;
    this.needsUpdate = true;
};


RenderTarget.prototype.setFormat = function (value) {

    this.format = value;
    this.needsUpdate = true;
};


RenderTarget.prototype.setWrap = function (value) {

    this.wrap = value;
    this.needsUpdate = true;
};


RenderTarget.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.width = this.width;
    json.height = this.height;

    json.invWidth = this.invWidth;
    json.invHeight = this.invHeight;

    json.generateMipmap = this.generateMipmap;
    json.flipY = this.flipY;
    json.premultiplyAlpha = this.premultiplyAlpha;

    json.anisotropy = this.anisotropy;

    json.filter = this.filter;
    json.format = this.format;
    json.wrap = this.wrap;

    return json;
};


RenderTarget.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.width = json.width;
    this.height = json.height;

    this.invWidth = json.invWidth;
    this.invHeight = json.invHeight;

    this.generateMipmap = json.generateMipmap;
    this.flipY = json.flipY;
    this.premultiplyAlpha = json.premultiplyAlpha;

    this.anisotropy = json.anisotropy;

    this.filter = json.filter;
    this.format = json.format;
    this.wrap = json.wrap;

    return this;
};


module.exports = RenderTarget;
