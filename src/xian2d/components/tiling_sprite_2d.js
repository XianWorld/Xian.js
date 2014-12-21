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

    //this._originTexture = opts.texture !== undefined ? opts.texture : undefined;
    //this._texture = undefined;

    this.destWidth = opts.destWidth || 100;
    this.destHeight = opts.destHeight || 100;

    this.tileScale = opts.tileScale || new Vec2(1, 1);
    this.tilePosition = opts.tilePosition || new Vec2(0, 0);

    this.tileScaleOffset = new Vec2(1, 1);
    this.destTexture = undefined;
    this.refreshTexture = false;
};

Sprite2D.extend(TilingSprite2D);

//Object.defineProperty(TilingSprite2D.prototype, "texture", {
//    get: function () {
//        return this._texture;//this.destTexture ||
//    },
//    set: function (value) {
//        if (this._texture === value) return;
//        this._texture = value;
//
//        this._dirtyRenderSize = true;
//        //this._updateRenderSize();
//        this.refreshTexture = true;
//    }
//});
//Object.defineProperty(Sprite2D.prototype, "textureClip", {
//    get: function () {
//        return this._textureClip;
//    },
//    set: function (value) {
//        this._textureClip = value;
//
//        this._dirtyRenderSize = true;
//        //this._updateRenderSize();
//        this.refreshTexture = true;
//    }
//});

//Sprite2D.prototype._updateRenderSize = function () {
//    var textureClip = this._textureClip;
//
//    this.sourceX = 0;
//    this.sourceY = 0;
//    if (textureClip) {
//        this.sourceWidth = textureClip.clipWidth;
//        this.sourceHeight = textureClip.clipHeight;
//        this.destX = -textureClip.offsetX;
//        this.destY = -textureClip.offsetY;
//    }
//    return this;
//};

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

    this._dirtyRenderSize = false;

    //this.originalTexture = this.texture;
    //this._texture = this.destTexture;
    //
    this.destTexture._powerOf2 = true;

    this.sourceX = 0;
    this.sourceY = 0;
    this.sourceWidth = this.destTexture.width;
    this.sourceHeight = this.destTexture.height;
    this.destX = -sourceX;
    this.destY = -sourceY;
};

TilingSprite2D.prototype._render = function (renderer) {
    if (!this.destTexture || this._dirtyRenderSize) {
        this._generateTilingTexture(RenderContext.isWebgl);

        if (this.destTexture && this.destTexture.needsUpdate) {
            //TODO - tweaking
            //updateWebGLTexture(this.destTexture.baseTexture, renderSession.gl);
            this.destTexture.needsUpdate = false;
            // this.destTexture._uvs = null;
        }
    }

    this.worldMatrix = this.transform.modelView;

    renderer.renderTilingSprite2D(this);
};

TilingSprite2D.prototype.toJSON = function (json) {
    json = Sprite2D.prototype.toJSON.call(this, json);

    json.destWidth = this.destWidth;
    json.destHeight = this.destHeight;

    json.tileScale = this.tileScale.toJSON(json.tileScale);
    json.tilePosition = this.tilePosition.toJSON(json.tilePosition);

    return json;
};


TilingSprite2D.prototype.fromJSON = function (json) {
    Sprite2D.prototype.fromJSON.call(this, json);

    this.destWidth = json.destWidth;
    this.destHeight = json.destHeight;

    this.tileScale.fromJSON(json.tileScale);
    this.tilePosition.fromJSON(json.tilePosition);

    return this;
};


module.exports = TilingSprite2D;
