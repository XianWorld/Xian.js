var Renderer2D = require("./renderer_2d");
var Enums = require("../../../core/enums");
var Dom = require("../../../context/dom");
var util = require("../../../base/util");
var Color = require("../../../math/color");
"use strict";

function CanvasRenderer2D(canvas, opts) {
    opts || (opts = {});

    Renderer2D.call(this, opts);

    //this.transparent = opts.transparent !== undefined ? opts.transparent : true;

    this.globalAlpha = 1;
    this.canvas = canvas;
    //this.canvasContext = this.canvas.getContext("2d", {alpha: this.transparent});
    this.canvasContext = this.canvas.getContext("2d");

    var f = this.canvasContext.setTransform;
    var that = this;
    this.canvasContext.setTransform = function (a, b, c, d, tx, ty) {
        that._matrixA = a;
        that._matrixB = b;
        that._matrixC = c;
        that._matrixD = d;
        that._matrixTx = tx;
        that._matrixTy = ty;
        f.call(that.canvasContext, a, b, c, d, tx, ty);
    };
    this._matrixA = 1;
    this._matrixB = 0;
    this._matrixC = 0;
    this._matrixD = 1;
    this._matrixTx = 0;
    this._matrixTy = 0;
    this._transformTx = 0;
    this._transformTy = 0;

    this.blendModes = {};

    //this.clearBeforeRender = opts.clearBeforeRender !== undefined ? opts.clearBeforeRender : true;

    this.initBlendMode();

}

Renderer2D.extend(CanvasRenderer2D);

CanvasRenderer2D.prototype.clearScreen = function (transparent, background) {
    //if (navigator.isCocoonJS && this.canvas.screencanvas) {
    //    this.canvasContext.fillStyle = "black";
    //    this.canvasContext.clear();
    //}

    if (transparent)
    {
        this.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    else
    {
        this.canvasContext.fillStyle = background.toHEX();//Color.colorNames.blue;//this.backgroundColorString;
        //this.canvasContext.clear();
        this.canvasContext.fillRect(0, 0, this.canvas.width , this.canvas.height);
    }

    //this.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderCost = 0;
};

CanvasRenderer2D.prototype.clearRect = function (x, y, w, h) {
    this.canvasContext.clearRect(x, y, w, h);
};

CanvasRenderer2D.prototype.drawImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat) {
    if (repeat === void 0) {
        repeat = undefined;
    }

    var scale = this.texture_scale_factor;
    sourceX = sourceX / scale;
    sourceY = sourceY / scale;
    sourceWidth = sourceWidth / scale;
    sourceHeight = sourceHeight / scale;

    var image = texture.raw;
    destX += this._transformTx;
    destY += this._transformTy;
    //var beforeDraw = egret.getTimer();
    if (repeat === undefined) {
        this.canvasContext.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    }
    else {
        this.drawRepeatImage(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat);
    }
    //super.drawImage.call(this, texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat);
    //this.renderCost += egret.getTimer() - beforeDraw;
};

CanvasRenderer2D.prototype.drawRepeatImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat) {
    if (texture['pattern'] === undefined) {
        var image = texture.raw;
        var tempImage = image;
        if (image.width != sourceWidth || image.height != sourceHeight) {
            var tempCanvas = document.createElement("canvas");
            tempCanvas.width = sourceWidth;
            tempCanvas.height = sourceHeight;
            tempCanvas.getContext("2d").drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
            tempImage = tempCanvas;
        }
        var pat = this.canvasContext.createPattern(tempImage, repeat);
        texture['pattern'] = pat;
    }
    var pattern = texture['pattern'];
    this.canvasContext.fillStyle = pattern;
    this.canvasContext.translate(destX, destY);
    this.canvasContext.fillRect(0, 0, destWidth, destHeight);
    this.canvasContext.translate(-destX, -destY);
};

CanvasRenderer2D.prototype.setTransform = function (matrix) {
    if(!matrix){
        this._transformTx = this._transformTy = 0;
        this.canvasContext.setTransform(1,0,0,1,0,0);
        return;
    }
    var m = matrix.elements;
    //在没有旋转缩放斜切的情况下，先不进行矩阵偏移，等下次绘制的时候偏移
    if (m[0] == 1 && m[1] == 0 && m[4] == 0 && m[5] == 1 && this._matrixA == 1 && this._matrixB == 0 && this._matrixC == 0 && this._matrixD == 1) {
        this._transformTx = m[12] - this._matrixTx;
        this._transformTy = m[13] - this._matrixTy;
        return;
    }
    this._transformTx = this._transformTy = 0;
    if (this._matrixA != m[0] || this._matrixB != m[1] || this._matrixC != m[4] || this._matrixD != m[5] || this._matrixTx != m[12] || this._matrixTy != m[13]) {
        this.canvasContext.setTransform(m[0], m[1], m[4], m[5], m[12], m[13]);
    }
};

CanvasRenderer2D.prototype.setAlpha = function (alpha, blendMode) {
    if (alpha != this.globalAlpha) {
        this.canvasContext.globalAlpha = this.globalAlpha = alpha;
    }
    if (blendMode) {
        this.blendValue = this.blendModes[blendMode];
        this.canvasContext.globalCompositeOperation = this.blendValue;
    }
    else if (this.blendValue != Enums.blendModes.NORMAL) {
        this.blendValue = this.blendModes[Enums.blendModes.NORMAL];
        this.canvasContext.globalCompositeOperation = this.blendValue;
    }
};

CanvasRenderer2D.prototype.initBlendMode = function () {
    var blendModesCanvas = this.blendModes;

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

CanvasRenderer2D.prototype.setupFont = function (textField) {
    var ctx = this.canvasContext;
    var font = textField._italic ? "italic " : "normal ";
    font += textField._bold ? "bold " : "normal ";
    font += textField._size + "px " + textField._fontFamily;
    ctx.font = font;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
};

CanvasRenderer2D.prototype.measureText = function (text) {
    var result = this.canvasContext.measureText(text);
    return result.width;
};

CanvasRenderer2D.prototype.drawText = function (textField, text, x, y, maxWidth, style) {
    var textColor;
    if (style["textColor"]) {

        textColor = util.toColorString(parseInt(style["textColor"]));
    }
    else {
        textColor = textField._textColorString;
    }
    var strokeColor;
    if (style["strokeColor"]) {
        strokeColor = util.toColorString(style["strokeColor"]);
    }
    else {
        strokeColor = textField._strokeColorString;
    }
    var outline;
    if (style["outline"]) {
        outline = style["outline"];
    }
    else {
        outline = textField._stroke;
    }
    var renderContext = this.canvasContext;
    renderContext.fillStyle = textColor;
    renderContext.strokeStyle = strokeColor;
    if (outline) {
        renderContext.lineWidth = outline * 2;
        renderContext.strokeText(text, x + this._transformTx, y + this._transformTy, maxWidth || 0xFFFF);
    }
    renderContext.fillText(text, x + this._transformTx, y + this._transformTy, maxWidth || 0xFFFF);
    //super.drawText.call(this, textField, text, x, y, maxWidth, style);
};

CanvasRenderer2D.prototype.strokeRect = function (x, y, w, h, color) {
    this.canvasContext.strokeStyle = color;
    this.canvasContext.strokeRect(x, y, w, h);
};

CanvasRenderer2D.prototype.pushMask = function (mask) {
    this.canvasContext.save();
    this.canvasContext.beginPath();
    this.canvasContext.rect(mask.x + this._transformTx, mask.y + this._transformTy, mask.width, mask.height);
    this.canvasContext.clip();
    this.canvasContext.closePath();
};

CanvasRenderer2D.prototype.popMask = function () {
    this.canvasContext.restore();
    this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
};

CanvasRenderer2D.prototype.onRenderStart = function () {
    this.canvasContext.save();
};

CanvasRenderer2D.prototype.onRenderFinish = function () {
    this.canvasContext.restore();
    this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
};

CanvasRenderer2D.prototype.setGlobalColorTransform = function (colorTransformMatrix) {
};

CanvasRenderer2D.prototype.toJSON = function (json) {
    return json;
};

CanvasRenderer2D.prototype.fromJSON = function (json) {
    return this;
};

module.exports = CanvasRenderer2D;