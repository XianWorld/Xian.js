/**
 * Created by Dianyan on 2014/12/20.
 */
var Sprite2D = require("./sprite_2d");
var Vec2 = require("../../math/vec2");
var utils = require("../../base/util");
var CanvasBuffer = require("../../context/graphics/canvas_buffer");
var Texture = require("../../context/assets/texture");
var MainContext = require("../../context/main_context");
var GraphicsContext = MainContext.GraphicsContext;

function TilingSprite2D() {

    Sprite2D.call(this);

    this.tileScale = new Vec2(1, 1);
    this.tilePosition = new Vec2(0, 0);
    this.tileScaleOffset = new Vec2(1, 1);

    this.destTexture = undefined;
}

Sprite2D.extend(TilingSprite2D);

TilingSprite2D.prototype.copy = function (other) {
    Sprite2D.prototype.copy.call(this, other);

    this.tileScale.copy(other.tileScale);
    this.tilePosition.copy(other.tilePosition);
    this.tileScaleOffset.copy(other.tileScaleOffset);

    return this;
};

TilingSprite2D.prototype.clear = function () {
    Sprite2D.prototype.clear.call(this);

    this.tileScale.set(1, 1);
    this.tilePosition.set(0, 0);
    this.tileScaleOffset.set(1, 1);

    if(this.destTexture) this.destTexture.destroy();
    this.destTexture = undefined;
    return this;
};
TilingSprite2D.prototype.destroy = function () {
    Sprite2D.prototype.destroy.call(this);

    this.tileScale = undefined;
    this.tilePosition = undefined;
    this.tileScaleOffset = undefined;
    return this;
};

TilingSprite2D.prototype.toJSON = function (json) {
    json = Sprite2D.prototype.toJSON.call(this, json);

    json.tileScale = this.tileScale.toJSON(json.tileScale);
    json.tilePosition = this.tilePosition.toJSON(json.tilePosition);

    return json;
};

TilingSprite2D.prototype.fromJSON = function (json) {
    Sprite2D.prototype.fromJSON.call(this, json);

    json.tileScale ? this.tileScale.fromJSON(json.tileScale) : this.tileScale.set(1, 1);
    json.tilePosition ? this.tilePosition.fromJSON(json.tilePosition) : this.tilePosition.set(0, 0);

    return this;
};

TilingSprite2D.prototype._generateTilingTexture = function (forcePowerOfTwo) {
    if (!this._texture.ready) return;

    var texture = this._texture;
    var clip = this._clip;

    var sourceX = this.cliped ? clip.x : 0;
    var sourceY = this.cliped ? clip.y : 0;
    var sourceWidth = this.cliped ? clip.width : texture.width;
    var sourceHeight = this.cliped ? clip.height : texture.height;

    //var frame = this._textureClip;
    var targetWidth, targetHeight;

    //  Check that the frame is the same size as the base texture.
    var isFrame = sourceWidth !== texture.width || sourceHeight !== texture.height;

    var newTextureRequired = false;

    if (!forcePowerOfTwo) {
        if (isFrame) {
            targetWidth = sourceWidth;
            targetHeight = sourceHeight;

            newTextureRequired = true;
        }
    }
    else {
        targetWidth = utils.getNextPowerOfTwo(sourceWidth);
        targetHeight = utils.getNextPowerOfTwo(sourceHeight);

        if (sourceWidth !== targetWidth || sourceHeight !== targetHeight) newTextureRequired = true;
    }

    if (newTextureRequired) {
        var canvasBuffer;

        if (this.destTexture && this.destTexture.isTiling) {
            canvasBuffer = this.destTexture.canvasBuffer;
            canvasBuffer.resize(targetWidth, targetHeight);
            this.destTexture.width = targetWidth;
            this.destTexture.height = targetHeight;
            this.destTexture.needsUpdate = true;
        }
        else {
            canvasBuffer = new CanvasBuffer(targetWidth, targetHeight);

            this.destTexture = Texture.fromCanvas(canvasBuffer.canvas);//new Texture();//Texture.fromCanvas(canvasBuffer.canvas);
            //this.destTexture.parse(canvasBuffer.canvas);
            this.destTexture.canvasBuffer = canvasBuffer;
            this.destTexture.isTiling = true;
        }

        canvasBuffer.drawImage(texture.image,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            0,
            0,
            targetWidth,
            targetHeight);

        this.tileScaleOffset.x = sourceWidth / targetWidth;
        this.tileScaleOffset.y = sourceHeight / targetHeight;
    }
    else {
        //  TODO - switching?
        if (this.destTexture && this.destTexture.isTiling) {
            // destroy the tiling texture!
            // TODO could store this somewhere?
            this.destTexture.destroy(true);
        }

        this.tileScaleOffset.x = 1;
        this.tileScaleOffset.y = 1;
        this.destTexture = texture;
    }

    this.destTexture._powerOf2 = true;

    this.sourceX = 0;
    this.sourceY = 0;
    this.sourceWidth = this.destTexture.width;
    this.sourceHeight = this.destTexture.height;

    this.destWidth = this._width;
    this.destHeight = this._height;
    this.destX = this.textureClip ? -(this.textureClip.offsetX * this.destWidth) : 0;//-sourceX;
    this.destY = this.textureClip ? -(this.textureClip.offsetY * this.destHeight) : 0;//-sourceY;

    //this._dirty = false;

};

TilingSprite2D.prototype.getLocalBounds = function () {
    if (this._dirtySize) {
        var textureClip = this._textureClip;
        var bounds = this._localBounds;

        bounds.width = this._width;
        bounds.height = this._height;
        bounds.x = textureClip ? -(textureClip.offsetX * bounds.width) : 0;
        bounds.y = textureClip ? -(textureClip.offsetY * bounds.height) : 0;

        this._dirtySize = false;
    }
    return this._localBounds;
};

TilingSprite2D.prototype._render = function (renderer) {
    if(!this.texture || !this.texture.ready) return;

    if (!this.destTexture || this._dirty) {
        this._generateTilingTexture(GraphicsContext.isWebgl);

        this._dirty = false;
    }
    renderer.renderTilingSprite2D(this);
};

module.exports = TilingSprite2D;
