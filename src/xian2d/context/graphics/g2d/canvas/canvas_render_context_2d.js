var RenderContext2D = require("./../render_context_2d");
var Enums = require("../../../../../base/enums");
var Dom = require("../../../../../context/utils/dom");
var util = require("../../../../../base/util");
var Color = require("../../../../../math/color");
var CanvasGraphics = require("./utils/canvas_graphics");
var CanvasMaskManager = require("./utils/canvas_mask_manager");
var CanvasTinter = require("./utils/canvas_tinter");
var ScreenContext = require('../../../../../context/screen/screen_context');
var CanvasText = require("../../../graphics/canvas_text");
"use strict";

function CanvasRenderContext2D() {
    RenderContext2D.call(this);

    //this.transparent = opts.transparent !== undefined ? opts.transparent : true;

    this.globalAlpha = 1;
    this.canvas = undefined;
    this.mainContext = undefined;

    //this._initContext(this.mainContext);

    this._matrixA = 1;
    this._matrixB = 0;
    this._matrixC = 0;
    this._matrixD = 1;
    this._matrixTx = 0;
    this._matrixTy = 0;
    this._transformTx = 0;
    this._transformTy = 0;

    this.maskManager = new CanvasMaskManager(this);
    //this._initBlendMode();
}

RenderContext2D.extend(CanvasRenderContext2D);

CanvasRenderContext2D.prototype.init = function (canvas, opts) {
    this.canvas = canvas;
    this.mainContext = this.canvas.getContext("2d");
    this._initBlendMode();

    this._initContext(this.mainContext);
};

CanvasRenderContext2D.prototype.clear = function () {
    this.globalAlpha = 1;
    this.canvas = undefined;
    this.mainContext = undefined;
};

CanvasRenderContext2D.prototype.destroy = function () {
    this.maskManager = undefined;
};

CanvasRenderContext2D.prototype.startRender = function (renderTexture, viewportRect) {
    if(renderTexture !== undefined){
        var buffer = renderTexture.getBuffer();
        if(!buffer.context._inited)
            this._initContext(buffer.context);
        this.canvasContext = buffer.context;
    }else{
        this.canvasContext = this.mainContext;
    }

    this.viewportRect = viewportRect;
    this.rendering = true;
    this.canvasContext.save();
};

CanvasRenderContext2D.prototype.finishRender = function (renderTexture) {
    this.canvasContext.restore();
    this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    this.canvasContext.globalAlpha = this.globalAlpha = 1;

    this.rendering = false;
};

CanvasRenderContext2D.prototype.clearScreen = function (transparent, background) {
    var viewportRect = this.viewportRect;
    var viewportWidth = ScreenContext._viewWidth;//this.canvas.width;
    var viewportHeight = ScreenContext._viewHeight;//this.canvas.height;
    var x = viewportRect.x * viewportWidth;
    var y = viewportRect.y * viewportHeight;
    var width = viewportRect.width * viewportWidth;
    var height = viewportRect.height * viewportHeight;
    if (transparent)
    {
        this._clearRect(x, y, width, height);
    }
    else
    {
        this.canvasContext.fillStyle = background.toHEX();//Color.colorNames.blue;//this.backgroundColorString;
        //this.canvasContext.clear();
        this.canvasContext.fillRect(x, y, width, height);
    }

    //this.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderCost = 0;
};

CanvasRenderContext2D.prototype.renderSprite2D = function (sprite2D) {

    var texture = sprite2D.destTexture,
        sourceX = sprite2D.sourceX,
        sourceY = sprite2D.sourceY,
        sourceWidth = sprite2D.sourceWidth,
        sourceHeight = sprite2D.sourceHeight,
        destX = sprite2D.destX,
        destY = sprite2D.destY,
        destWidth = sprite2D.destWidth,
        destHeight = sprite2D.destHeight,
        tint = sprite2D.tint,
        alpha = sprite2D.worldAlpha,
        blendMode = sprite2D.blendMode,
        worldMatrix = sprite2D.worldMatrix;

    if(destWidth <= 0) destWidth = sourceWidth;
    if(destHeight <= 0) destHeight = sourceHeight;
    this._setAlpha(alpha, blendMode);
    this._setTransform(worldMatrix);
    this._drawImage(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, tint);
};

CanvasRenderContext2D.prototype.renderTilingSprite2D = function (tilingSprite) {
    var tilingTexture = tilingSprite.destTexture,
    sourceX = tilingSprite.sourceX,
    sourceY = tilingSprite.sourceY,
    sourceWidth = tilingSprite.sourceWidth,
    sourceHeight = tilingSprite.sourceHeight,
        destX = tilingSprite.destX,
        destY = tilingSprite.destY,
        destWidth = tilingSprite.destWidth,
        destHeight = tilingSprite.destHeight,
        tint = tilingSprite.tint,
        alpha = tilingSprite.worldAlpha,
        blendMode = tilingSprite.blendMode,
        worldMatrix = tilingSprite.worldMatrix;

    var tilePosition = tilingSprite.tilePosition;
    var tileScale = tilingSprite.tileScale;

    this._setAlpha(alpha, blendMode);
    this._setTransform(worldMatrix);

    if (tilingTexture['pattern'] === undefined) {
        var image = tilingTexture.raw;
        var tempImage = image;
        //if (image.width != sourceWidth || image.height != sourceHeight) {
        //    var tempCanvas = document.createElement("canvas");
        //    tempCanvas.width = sourceWidth;
        //    tempCanvas.height = sourceHeight;
        //    tempCanvas.getContext("2d").drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
        //    tempImage = tempCanvas;
        //}
        //TODO in this canvas renderer, only first set tint will work
        if (tint !== 0xFFFFFF) {
            tempImage = CanvasTinter.getTintedTexture(tilingTexture, sourceX, sourceY, sourceWidth, sourceHeight, tint);
            //sourceX = 0;
            //sourceY = 0;
        }
        var pat = this.canvasContext.createPattern(tempImage, 'repeat');
        tilingTexture['pattern'] = pat;
    }
    var pattern = tilingTexture['pattern'];

    tilePosition.x %= tilingTexture.width;
    tilePosition.y %= tilingTexture.height;

    // offset - make sure to account for the anchor point..
    this.canvasContext.scale(tileScale.x,tileScale.y);
    this.canvasContext.translate(tilePosition.x + (destX), tilePosition.y + (destY));

    this.canvasContext.fillStyle = pattern;

    this.canvasContext.fillRect(-tilePosition.x,
        -tilePosition.y,
        destWidth / tileScale.x,
        destHeight / tileScale.y);

    this.canvasContext.scale(1 / tileScale.x, 1 / tileScale.y);
    this.canvasContext.translate(-tilePosition.x - (destX), -tilePosition.y - (destY));
};

CanvasRenderContext2D.prototype.renderGraphics = function (graphics) {
    //CanvasGraphics.renderGraphics(this, worldTransform, graphicsData, worldAlpha, tint);

    this._setAlpha(graphics.worldAlpha, graphics.blendMode);
    //this._setTransform(graphics.worldMatrix);
    CanvasGraphics.renderGraphics(this, graphics);
};

CanvasRenderContext2D.prototype.renderText = function (text2d) {
    var worldAlpha = text2d.worldAlpha,
        blendMode = text2d.blendMode,
        worldMatrix = text2d.worldMatrix;

    this._setAlpha(worldAlpha, blendMode);
    this._setTransform(worldMatrix);

    this.canvasContext.translate(this._transformTx,this._transformTy);
    CanvasText.renderText(text2d, this.canvasContext);
    this.canvasContext.translate(-this._transformTx,-this._transformTy);
};

//CanvasRenderContext2D.prototype.renderGraphicsMask = function (graphics) {
//    //CanvasGraphics.renderGraphicsMask(this, worldTransform, graphicsData, worldAlpha, tint);
//    CanvasGraphics.renderGraphicsMask(this, graphics);
//};

CanvasRenderContext2D.prototype.pushMask = function (graphics) {
    //this.canvasContext.save();
    //this.canvasContext.beginPath();
    //this.canvasContext.rect(mask.x + this._transformTx, mask.y + this._transformTy, mask.width, mask.height);
    //this.canvasContext.clip();
    //this.canvasContext.closePath();
    this.maskManager.pushMask(this, graphics);
};

CanvasRenderContext2D.prototype.popMask = function (graphics) {
    //this.canvasContext.restore();
    //this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    this.maskManager.popMask(this, graphics);
};

CanvasRenderContext2D.prototype._initContext = function (context) {
    var f = context.setTransform;
    var that = this;
    context.setTransform = function (a, b, c, d, tx, ty) {
        that._matrixA = a;
        that._matrixB = b;
        that._matrixC = c;
        that._matrixD = d;
        that._matrixTx = tx;
        that._matrixTy = ty;
        f.call(context, a, b, c, d, tx, ty);
    };
    context._inited = true;
};

CanvasRenderContext2D.prototype._clearRect = function (x, y, w, h) {
    this.canvasContext.clearRect(x, y, w, h);
};

CanvasRenderContext2D.prototype._drawImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, tint, repeat) {
    if (repeat === void 0) {
        repeat = undefined;
    }
    destX += this._transformTx;
    destY += this._transformTy;

    if (repeat === undefined) {
        var image = texture.image;

        var scale = this.texture_scale_factor;
        sourceX = sourceX / scale;
        sourceY = sourceY / scale;
        sourceWidth = sourceWidth / scale;
        sourceHeight = sourceHeight / scale;

        if (tint !== 0xFFFFFF) {
            //  TODO clean up caching - how to clean up the caches?
            image = CanvasTinter.getTintedTexture(texture, sourceX, sourceY, sourceWidth, sourceHeight, tint);
            sourceX = 0;
            sourceY = 0;
        }

        this.canvasContext.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    }
    else {
        //this._drawRepeatImage(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, tint, repeat);
    }
    //this.renderCost += egret.getTimer() - beforeDraw;
};

//CanvasRenderContext2D.prototype._drawRepeatImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, tint, repeat) {
//    if (texture['pattern'] === undefined) {
//        var image = texture.raw;
//        var tempImage = image;
//        if (image.width != sourceWidth || image.height != sourceHeight) {
//            var tempCanvas = document.createElement("canvas");
//            tempCanvas.width = sourceWidth;
//            tempCanvas.height = sourceHeight;
//            tempCanvas.getContext("2d").drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
//            tempImage = tempCanvas;
//        }
//        var pat = this.canvasContext.createPattern(tempImage, repeat);
//        texture['pattern'] = pat;
//    }
//    var pattern = texture['pattern'];
//    this.canvasContext.fillStyle = pattern;
//    this.canvasContext.translate(destX, destY);
//    this.canvasContext.fillRect(0, 0, destWidth, destHeight);
//    this.canvasContext.translate(-destX, -destY);
//};

CanvasRenderContext2D.prototype._setTransform = function (matrix) {
    if(!matrix){
        this._transformTx = this._transformTy = 0;
        this.canvasContext.setTransform(1,0,0,1,0,0);
        return;
    }
    var m = matrix.elements;
    var a, b, c, d,tx,ty;
    //if(ismat32){
        a = m[0]; b = m[1]; c = m[2]; d = m[3]; tx = m[4]; ty = m[5];
    //}else{
    //    a = m[0]; b = m[1]; c = m[4]; d = m[5]; tx = m[12]; ty = m[13];
    //}

    //在没有旋转缩放斜切的情况下，先不进行矩阵偏移，等下次绘制的时候偏移
    if (a == 1 && b == 0 && c == 0 && d == 1 && this._matrixA == 1 && this._matrixB == 0 && this._matrixC == 0 && this._matrixD == 1) {
        this._transformTx = tx - this._matrixTx;
        this._transformTy = ty - this._matrixTy;
        return;
    }
    this._transformTx = this._transformTy = 0;
    if (this._matrixA != a || this._matrixB != b || this._matrixC != c || this._matrixD != d || this._matrixTx != tx || this._matrixTy != ty) {
        this.canvasContext.setTransform(a, b, c, d, tx, ty);
    }
};

CanvasRenderContext2D.prototype._setAlpha = function (alpha, blendMode) {
    if (alpha != this.globalAlpha) {
        this.canvasContext.globalAlpha = this.globalAlpha = alpha;
    }
    if (blendMode) {
        this.blendValue = CanvasRenderContext2D.blendModes[blendMode];
        this.canvasContext.globalCompositeOperation = this.blendValue;
    }
    else if (this.blendValue != Enums.blendModes.NORMAL) {
        this.blendValue = CanvasRenderContext2D.blendModes[Enums.blendModes.NORMAL];
        this.canvasContext.globalCompositeOperation = this.blendValue;
    }
};

CanvasRenderContext2D.blendModes = undefined;

CanvasRenderContext2D.prototype._initBlendMode = function () {
    var blendModesCanvas = CanvasRenderContext2D.blendModes;//this.blendModes;

    if(blendModesCanvas) return;

    blendModesCanvas = CanvasRenderContext2D.blendModes = [];
    if (Dom.canUseNewCanvasBlendModes()) {
        blendModesCanvas[Enums.blendModes.NORMAL] = "source-over";
        blendModesCanvas[Enums.blendModes.ADD] = "lighter"; //IS THIS OK???
        blendModesCanvas[Enums.blendModes.MULTIPLY] = "multiply";
        blendModesCanvas[Enums.blendModes.SCREEN] = "screen";
        blendModesCanvas[Enums.blendModes.OVERLAY] = "overlay";
        blendModesCanvas[Enums.blendModes.DARKEN] = "darken";
        blendModesCanvas[Enums.blendModes.LIGHTEN] = "lighten";
        blendModesCanvas[Enums.blendModes.COLOR_DODGE] = "color-dodge";
        blendModesCanvas[Enums.blendModes.COLOR_BURN] = "color-burn";
        blendModesCanvas[Enums.blendModes.HARD_LIGHT] = "hard-light";
        blendModesCanvas[Enums.blendModes.SOFT_LIGHT] = "soft-light";
        blendModesCanvas[Enums.blendModes.DIFFERENCE] = "difference";
        blendModesCanvas[Enums.blendModes.EXCLUSION] = "exclusion";
        blendModesCanvas[Enums.blendModes.HUE] = "hue";
        blendModesCanvas[Enums.blendModes.SATURATION] = "saturation";
        blendModesCanvas[Enums.blendModes.COLOR] = "color";
        blendModesCanvas[Enums.blendModes.LUMINOSITY] = "luminosity";
    }
    else {
        // this means that the browser does not support the cool new blend modes in canvas "cough" ie "cough"
        blendModesCanvas[Enums.blendModes.NORMAL] = "source-over";
        blendModesCanvas[Enums.blendModes.ADD] = "lighter"; //IS THIS OK???
        blendModesCanvas[Enums.blendModes.MULTIPLY] = "source-over";
        blendModesCanvas[Enums.blendModes.SCREEN] = "source-over";
        blendModesCanvas[Enums.blendModes.OVERLAY] = "source-over";
        blendModesCanvas[Enums.blendModes.DARKEN] = "source-over";
        blendModesCanvas[Enums.blendModes.LIGHTEN] = "source-over";
        blendModesCanvas[Enums.blendModes.COLOR_DODGE] = "source-over";
        blendModesCanvas[Enums.blendModes.COLOR_BURN] = "source-over";
        blendModesCanvas[Enums.blendModes.HARD_LIGHT] = "source-over";
        blendModesCanvas[Enums.blendModes.SOFT_LIGHT] = "source-over";
        blendModesCanvas[Enums.blendModes.DIFFERENCE] = "source-over";
        blendModesCanvas[Enums.blendModes.EXCLUSION] = "source-over";
        blendModesCanvas[Enums.blendModes.HUE] = "source-over";
        blendModesCanvas[Enums.blendModes.SATURATION] = "source-over";
        blendModesCanvas[Enums.blendModes.COLOR] = "source-over";
        blendModesCanvas[Enums.blendModes.LUMINOSITY] = "source-over";
    }
};

//CanvasRenderContext2D.prototype.drawText = function (textField, text, x, y, maxWidth, style) {
//    var textColor;
//    if (style["textColor"]) {
//
//        textColor = util.toColorString(parseInt(style["textColor"]));
//    }
//    else {
//        textColor = textField._textColorString;
//    }
//    var strokeColor;
//    if (style["strokeColor"]) {
//        strokeColor = util.toColorString(style["strokeColor"]);
//    }
//    else {
//        strokeColor = textField._strokeColorString;
//    }
//    var outline;
//    if (style["outline"]) {
//        outline = style["outline"];
//    }
//    else {
//        outline = textField._stroke;
//    }
//    var renderContext = this.canvasContext;
//    renderContext.fillStyle = textColor;
//    renderContext.strokeStyle = strokeColor;
//    if (outline) {
//        renderContext.lineWidth = outline * 2;
//        renderContext.strokeText(text, x + this._transformTx, y + this._transformTy, maxWidth || 0xFFFF);
//    }
//    renderContext.fillText(text, x + this._transformTx, y + this._transformTy, maxWidth || 0xFFFF);
//    //super.drawText.call(this, textField, text, x, y, maxWidth, style);
//};
//
//CanvasRenderContext2D.prototype.strokeRect = function (x, y, w, h, color) {
//    this.canvasContext.strokeStyle = color;
//    this.canvasContext.strokeRect(x, y, w, h);
//};

//CanvasRenderContext2D.prototype.setGlobalColorTransform = function (colorTransformMatrix) {
//};

//
//CanvasRenderContext2D.prototype.toJSON = function (json) {
//    return json;
//};
//
//CanvasRenderContext2D.prototype.fromJSON = function (json) {
//    return this;
//};

module.exports = new CanvasRenderContext2D;