var Class = require("../../base/class");
"use strict";

function AbstractRenderer2D(opts) {
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

Class.extend(AbstractRenderer2D);

AbstractRenderer2D.prototype.startRender = function (renderTexture) {
};

AbstractRenderer2D.prototype.finishRender = function () {
};

AbstractRenderer2D.prototype.clearScreen = function (transparent, background) {
};

//AbstractRenderer2D.prototype.clearRect = function (x, y, w, h) {
//};

AbstractRenderer2D.prototype.renderSprite2D = function (sprite2D) {

};

AbstractRenderer2D.prototype.renderTilingSprite2D = function (tilingSprite) {

};
AbstractRenderer2D.prototype.renderGraphics = function (graphics) {
};

AbstractRenderer2D.prototype.renderText = function (text2d) {
};

AbstractRenderer2D.prototype.pushMask = function (mask) {
};

AbstractRenderer2D.prototype.popMask = function (mask) {
};

AbstractRenderer2D.prototype.pushFilter = function (filterBlock) {
};

AbstractRenderer2D.prototype.popFilter = function () {
};

AbstractRenderer2D.prototype.resize = function (stageWidth, stageHeight, scaleX, scaleY) {
};

//AbstractRenderer2D.prototype.drawImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, tint, repeat) {
//    if (repeat === void 0) {
//        repeat = "no-repeat";
//    }
//};
//
//AbstractRenderer2D.prototype.setTransform = function (matrix) {
//};
//
//AbstractRenderer2D.prototype.setAlpha = function (value, blendMode) {
//};

//AbstractRenderer2D.prototype.setupFont = function (textField) {
//    var ctx = this.canvasContext;
//    var font = textField.italic ? "italic " : "normal ";
//    font += textField.bold ? "bold " : "normal ";
//    font += textField.size + "px " + textField.fontFamily;
//    ctx.font = font;
//    ctx.textAlign = "left";
//    ctx.textBaseline = "middle";
//};
//
//AbstractRenderer2D.prototype.measureText = function (text) {
//    var result = this.canvasContext.measureText(text);
//    return result.width;
//};

//AbstractRenderer2D.prototype.drawText = function (textField, text, x, y, maxWidth, style) {
//};
//
//AbstractRenderer2D.prototype.strokeRect = function (x, y, w, h, color) {
//};
//
//AbstractRenderer2D.prototype.setGlobalColorTransform = function (colorTransformMatrix) {
//};

AbstractRenderer2D.prototype.toJSON = function (json) {
    return json;
};

AbstractRenderer2D.prototype.fromJSON = function (json) {
    return this;
};

module.exports = AbstractRenderer2D;