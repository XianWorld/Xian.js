var Enums = require("../core/enums");
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

    return this;
};

TextureClip.prototype.toJSON = function (json) {

    json.offsetX = this.offsetX;
    json.offsetY = this.offsetY;

    return json;
};


TextureClip.prototype.fromJSON = function (json) {

    this.offsetX = json.offsetX;
    this.offsetY = json.offsetY;

    return this;
};


module.exports = TextureClip;