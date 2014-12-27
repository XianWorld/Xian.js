/**
 * Created by Dianyan on 2014/12/20.
 */
var Sprite2D = require("./sprite_2d");
var Vec2 = require("../../math/vec2");
var utils = require("../../base/util");
var CanvasBuffer = require("../../render/CanvasBuffer");
var Texture = require("../../assets/texture");
var MainContext = require("../../context/main_context");
var RenderContext = MainContext.RendererContext;

function TilingSprite2D(opts) {
    opts || (opts = {});

    Sprite2D.call(this, opts);

    this.tileScale = opts.tileScale || new Vec2(1, 1);
    this.tilePosition = opts.tilePosition || new Vec2(0, 0);

    this.tileScaleOffset = new Vec2(1, 1);
    this.destTexture = undefined;
    //this.refreshTexture = false;
};

Sprite2D.extend(TilingSprite2D);

TilingSprite2D.prototype._generateTilingTexture = function (forcePowerOfTwo) {
    if (!this._texture._loaded) return;

    var texture = this._texture;

    var sourceX = this.textureClip ? this.textureClip.clipX : 0;
    var sourceY = this.textureClip ? this.textureClip.clipY : 0;
    var sourceWidth = this.textureClip ? this.textureClip.clipWidth : texture.width;
    var sourceHeight = this.textureClip ? this.textureClip.clipHeight : texture.height;

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

            this.destTexture = new Texture();//Texture.fromCanvas(canvasBuffer.canvas);
            this.destTexture.parse(canvasBuffer.canvas);
            this.destTexture.canvasBuffer = canvasBuffer;
            this.destTexture.isTiling = true;
        }

        canvasBuffer.drawImage(texture.raw,
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

    this.destX = this.textureClip ? -this.textureClip.offsetX : 0;//-sourceX;
    this.destY = this.textureClip ? -this.textureClip.offsetY : 0;//-sourceY;
    this.destWidth = this._width;
    this.destHeight = this._height;

    //this._dirtyRender = false;

};

TilingSprite2D.prototype.getLocalBounds = function () {
    if (this._dirtySize) {
        var textureClip = this._textureClip;
        var bounds = this._localBounds;

        bounds.x = textureClip ? -textureClip.offsetX : 0;
        bounds.y = textureClip ? -textureClip.offsetY : 0;
        bounds.width = this._width;
        bounds.height = this._height;

        this._dirtySize = false;
    }
    return this._localBounds;
};

TilingSprite2D.prototype._render = function (renderer) {
    if (!this.destTexture || this._dirtyRender) {
        this._generateTilingTexture(RenderContext.isWebgl);

        this._dirtyRender = false;
    }
    renderer.renderTilingSprite2D(this);
};

TilingSprite2D.prototype.toJSON = function (json) {
    json = Sprite2D.prototype.toJSON.call(this, json);

    json.tileScale = this.tileScale.toJSON(json.tileScale);
    json.tilePosition = this.tilePosition.toJSON(json.tilePosition);

    return json;
};


TilingSprite2D.prototype.fromJSON = function (json) {
    Sprite2D.prototype.fromJSON.call(this, json);

    this.tileScale.fromJSON(json.tileScale);
    this.tilePosition.fromJSON(json.tilePosition);

    return this;
};

module.exports = TilingSprite2D;
