var Class = require("../../../../base/class");
"use strict";

function RenderContext2D() {

    Class.call(this);

    this.canvas = undefined;
    this.mainContext = undefined;
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

Class.extend(RenderContext2D);

RenderContext2D.prototype.init = function (canvas, opts) {

};
RenderContext2D.prototype.clear = function () {

};
RenderContext2D.prototype.destroy = function () {

};
RenderContext2D.prototype.startRender = function (renderTexture) {
};

RenderContext2D.prototype.finishRender = function () {
};

RenderContext2D.prototype.clearScreen = function (transparent, background) {
};

//RenderContext2D.prototype.clearRect = function (x, y, w, h) {
//};

RenderContext2D.prototype.renderSprite2D = function (sprite2D) {

};

RenderContext2D.prototype.renderTilingSprite2D = function (tilingSprite) {

};
RenderContext2D.prototype.renderGraphics = function (graphics) {
};

RenderContext2D.prototype.renderText = function (text2d) {
};

RenderContext2D.prototype.pushMask = function (mask) {
};

RenderContext2D.prototype.popMask = function (mask) {
};

RenderContext2D.prototype.pushFilter = function (filterBlock) {
};

RenderContext2D.prototype.popFilter = function () {
};

RenderContext2D.prototype.resize = function (stageWidth, stageHeight, scaleX, scaleY) {
};

//RenderContext2D.prototype.drawImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, tint, repeat) {
//    if (repeat === void 0) {
//        repeat = "no-repeat";
//    }
//};
//
//RenderContext2D.prototype.setTransform = function (matrix) {
//};
//
//RenderContext2D.prototype.setAlpha = function (value, blendMode) {
//};

//RenderContext2D.prototype.setupFont = function (textField) {
//    var ctx = this.canvasContext;
//    var font = textField.italic ? "italic " : "normal ";
//    font += textField.bold ? "bold " : "normal ";
//    font += textField.size + "px " + textField.fontFamily;
//    ctx.font = font;
//    ctx.textAlign = "left";
//    ctx.textBaseline = "middle";
//};
//
//RenderContext2D.prototype.measureText = function (text) {
//    var result = this.canvasContext.measureText(text);
//    return result.width;
//};

//RenderContext2D.prototype.drawText = function (textField, text, x, y, maxWidth, style) {
//};
//
//RenderContext2D.prototype.strokeRect = function (x, y, w, h, color) {
//};
//
//RenderContext2D.prototype.setGlobalColorTransform = function (colorTransformMatrix) {
//};

RenderContext2D.prototype.toJSON = function (json) {
    return json;
};

RenderContext2D.prototype.fromJSON = function (json) {
    return this;
};

module.exports = RenderContext2D;