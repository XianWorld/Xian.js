var Class = require("../../../base/class");
"use strict";

function Renderer2D(opts) {
    opts || (opts = {});

    Class.call(this);

    /**
     * 渲染全部纹理的时间开销
     */
    this.renderCost = 0;
    /**
     * 绘制纹理的缩放比率，默认值为1
     */
    this.texture_scale_factor = 1;

}

Class.extend(Renderer2D);

Renderer2D.prototype.clearScreen = function (transparent, background) {
};

Renderer2D.prototype.clearRect = function (x, y, w, h) {
};

Renderer2D.prototype.drawImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat) {
    if (repeat === void 0) {
        repeat = "no-repeat";
    }
};

Renderer2D.prototype.setTransform = function (matrix) {
};

Renderer2D.prototype.setAlpha = function (value, blendMode) {
};

Renderer2D.prototype.setupFont = function (textField) {
};

Renderer2D.prototype.measureText = function (text) {
    return 0;
};

Renderer2D.prototype.drawText = function (textField, text, x, y, maxWidth, style) {
};

Renderer2D.prototype.strokeRect = function (x, y, w, h, color) {
};

Renderer2D.prototype.pushMask = function (mask) {
};

Renderer2D.prototype.popMask = function () {
};

Renderer2D.prototype.onRenderStart = function () {
};

Renderer2D.prototype.onRenderFinish = function () {
};

Renderer2D.prototype.setGlobalColorTransform = function (colorTransformMatrix) {
};

Renderer2D.prototype.toJSON = function (json) {
    return json;
};

Renderer2D.prototype.fromJSON = function (json) {
    return this;
};

module.exports = Renderer2D;