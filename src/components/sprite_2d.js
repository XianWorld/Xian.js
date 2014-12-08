var Enums = require("../core/enums");
var Renderable2D = require("./renderable_2d");
var Assets = require("../assets/assets");
//var TextureClip = require("../assets/texture_clip");
"use strict";


function Sprite2D(opts) {
    opts || (opts = {});

    Renderable2D.call(this, opts);

    this.texture = undefined;
    this.textureClip = undefined;
    //this.material = opts.material !== undefined ? opts.material : undefined;
}

Renderable2D.extend(Sprite2D);


Sprite2D.prototype.copy = function (other) {

    return this;
};


Sprite2D.prototype.clear = function () {
    Renderable2D.prototype.clear.call(this);

    return this;
};

Sprite2D.prototype._draw = function (renderer) {
    var texture = this.texture,
        textureClip = this.textureClip;

    var sourceX = 0,
        sourceY = 0,
        sourceWidth = texture.width,
        sourceHeight = texture.height;

    var destX = -textureClip.offsetX,
        destY = -textureClip.offsetY,
        destWidth = textureClip.clipWidth,
        destHeight = textureClip.clipHeight;

    if(textureClip){
        sourceX = textureClip.clipX;
        sourceY = textureClip.clipY;
        sourceWidth = textureClip.clipWidth;
        sourceHeight = textureClip.clipHeight;
    }

    renderer.drawImage(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
};


Sprite2D.prototype.toJSON = function (json) {
    json = Renderable2D.prototype.toJSON.call(this, json);

    return json;
};


Sprite2D.prototype.fromJSON = function (json) {
    Renderable2D.prototype.fromJSON.call(this, json);

    return this;
};


module.exports = Sprite2D;
