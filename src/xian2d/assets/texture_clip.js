var Enums = require("../../core/enums");
"use strict";

function TextureClip(opts) {
    opts || (opts = {});

    //Class.call(this);
    this.offsetX = 0;
    this.offsetY = 0;

    this.clipX = 0;
    this.clipY = 0;
    this.clipWidth = 0;
    this.clipHeight = 0;
}

//Class.extend(TextureClip);

TextureClip.prototype.copy = function (other) {

    this.offsetX = other.offsetX;
    this.offsetY = other.offsetY;

    this.clipX = other.clipX;
    this.clipY = other.clipY;
    this.clipWidth = other.clipWidth;
    this.clipHeight = other.clipHeight;

    return this;
};

TextureClip.prototype.toJSON = function (json) {

    json.offsetX = this.offsetX;
    json.offsetY = this.offsetY;

    json.clipX = this.clipX;
    json.clipY = this.clipY;
    json.clipWidth = this.clipWidth;
    json.clipHeight = this.clipHeight;
    return json;
};


TextureClip.prototype.fromJSON = function (json) {

    this.offsetX = json.offsetX;
    this.offsetY = json.offsetY;

    this.clipX = json.clipX;
    this.clipY = json.clipY;
    this.clipWidth = json.clipWidth;
    this.clipHeight = json.clipHeight;
    return this;
};


module.exports = TextureClip;