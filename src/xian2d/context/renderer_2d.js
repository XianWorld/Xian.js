var Class = require("../../base/class");
"use strict";

function Renderer2D(opts) {
    opts || (opts = {});

    Class.call(this);

    this.canvasContext = undefined;
    /**
     * 渲染全部纹理的时间开销
     */
    this.renderCost = 0;
    /**
     * 绘制纹理的缩放比率，默认值为1
     */
    this.texture_scale_factor = 1;

    this.rendering = false;

}

Class.extend(Renderer2D);

Renderer2D.prototype.startRender = function (renderTexture) {
};

Renderer2D.prototype.finishRender = function () {
};

Renderer2D.prototype.clearScreen = function (transparent, background) {
};

//Renderer2D.prototype.clearRect = function (x, y, w, h) {
//};

Renderer2D.prototype.renderSprite2D = function (sprite2D) {

};

Renderer2D.prototype.pushMask = function (mask) {
};

Renderer2D.prototype.popMask = function () {
};

//Renderer2D.prototype.drawImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, tint, repeat) {
//    if (repeat === void 0) {
//        repeat = "no-repeat";
//    }
//};
//
//Renderer2D.prototype.setTransform = function (matrix) {
//};
//
//Renderer2D.prototype.setAlpha = function (value, blendMode) {
//};

//Renderer2D.prototype.setupFont = function (textField) {
//    var ctx = this.canvasContext;
//    var font = textField.italic ? "italic " : "normal ";
//    font += textField.bold ? "bold " : "normal ";
//    font += textField.size + "px " + textField.fontFamily;
//    ctx.font = font;
//    ctx.textAlign = "left";
//    ctx.textBaseline = "middle";
//};
//
//Renderer2D.prototype.measureText = function (text) {
//    var result = this.canvasContext.measureText(text);
//    return result.width;
//};
//
//Renderer2D.prototype.drawText = function (textField, text, x, y, maxWidth, style) {
//};
//
//Renderer2D.prototype.strokeRect = function (x, y, w, h, color) {
//};
//
//Renderer2D.prototype.setGlobalColorTransform = function (colorTransformMatrix) {
//};

Renderer2D.prototype.toJSON = function (json) {
    return json;
};

Renderer2D.prototype.fromJSON = function (json) {
    return this;
};

module.exports = Renderer2D;