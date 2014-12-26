var EventEmitter = require("../base/event_emitter");
var Device = require("./device");
var Dom = require("./dom");
var Config = require("../base/config");
"use strict";

var addEvent = Dom.addEvent,
    removeEvent = Dom.removeEvent,
    addMeta = Dom.addMeta,
    floor = Math.floor,

    CANVAS_ID = 0,
    SCALE_REG = /-scale\s *=\s*[.0-9]+/g,
    CANVAS_STYLE = [
        "position: fixed;",
        "top: 50%;",
        "left: 50%;",
        "padding: 0px;",
        "margin: 0px;"
    ].join("\n"),
    VIEWPORT, VIEWPORT_WIDTH, VIEWPORT_HEIGHT, VIEWPORT_SCALE;

addMeta("viewport", "viewport", "initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no");
addMeta("viewport-width", "viewport", "width=device-width");
addMeta("viewport-height", "viewport", "height=device-height");

VIEWPORT = document.getElementById("viewport");
VIEWPORT_WIDTH = document.getElementById("viewport-width");
VIEWPORT_HEIGHT = document.getElementById("viewport-height");
VIEWPORT_SCALE = VIEWPORT.getAttribute("content");

function windowOnResize() {
    VIEWPORT.setAttribute("content", VIEWPORT_SCALE.replace(SCALE_REG, "-scale=" + Device.invPixelRatio));
    VIEWPORT_WIDTH.setAttribute("content", "width=" + window.innerWidth);
    VIEWPORT_HEIGHT.setAttribute("content", "height=" + window.innerHeight);
    window.scrollTo(0, 1);
}

addEvent(window, "resize orientationchange", windowOnResize);
windowOnResize();

/**
 * @class Canvas
 * @extends EventEmitter
 * @brief canvas helper
 * @param {Object} options
 */
function Canvas() {

    EventEmitter.call(this);

    /**
     * @property Number canvasId
     * @memberof Canvas
     */
    this.canvasId = ++CANVAS_ID;

    /**
     * @property Boolean fullScreen
     * @memberof Canvas
     */
    this.fullScreen = false;

    /**
     * @property String customCursor
     * @memberof Canvas
     */
    this.customCursor = false;

    /**
     * @property Boolean hideMouse
     * @memberof Canvas
     */
    this.hideMouse = false;

    /**
     * @property Number width
     * @memberof Canvas
     */
    this.width = window.innerWidth;

    /**
     * @property Number height
     * @memberof Canvas
     */
    this.height = window.innerHeight;

    /**
     * @property Number aspect
     * @memberof Canvas
     */
    this.aspect = this.width / this.height;

    /**
     * @property Number pixelWidth
     * @memberof Canvas
     */
    this.pixelWidth = this.width;

    /**
     * @property Number pixelHeight
     * @memberof Canvas
     */
    this.pixelHeight = this.height;

    /**
     * @property HTMLCanvasElement element
     * @memberof Canvas
     */
    this.element = undefined;
}

EventEmitter.extend(Canvas);


Canvas.prototype.init = function (opts) {
    opts || (opts = Config.canvas);
    opts || (opts = {});

    this.fullScreen = opts.fullScreen ? opts.fullScreen : (opts.width === undefined && opts.height === undefined) ? true : false;
    this.customCursor = opts.customCursor !== undefined ? opts.customCursor : false;
    this.hideMouse = opts.hideMouse !== undefined ? opts.hideMouse : false;
    this.width = opts.width !== undefined ? opts.width : window.innerWidth;
    this.height = opts.height !== undefined ? opts.height : window.innerHeight;
    this.aspect = this.width / this.height;

    if (this.element) this.clear();
    var element = document.createElement("canvas"),
        style = element.style;

    element.id = "canvas-" + this.canvasId;
    style.cssText = CANVAS_STYLE;
    style.cursor = this.customCursor ? "url(" + this.customCursor + ")" : this.hideMouse ? "none" : "default";
    document.body.appendChild(element);

    if (!Config.debug) {
        element.oncontextmenu = function () {
            return false;
        };
    }

    addEvent(window, "resize orientationchange", this.handleResize, this);

    element.requestPointerLock || (element.requestPointerLock = (
    element.webkitRequestPointerLock ||
    element.mozRequestPointerLock ||
    element.oRequestPointerLock ||
    element.msRequestPointerLock
    ));
    element.exitPointerLock || (element.exitPointerLock = (
    document.webkitExitPointerLock ||
    document.mozExitPointerLock ||
    document.oExitPointerLock ||
    document.msExitPointerLock
    ));
    element.requestFullscreen || (element.requestFullscreen = (
    element.webkitRequestFullscreen ||
    element.mozRequestFullscreen ||
    element.oRequestFullscreen ||
    element.msRequestFullscreen
    ));
    element.exitFullscreen || (element.exitFullscreen = (
    element.webkitExitFullscreen ||
    element.mozExitFullscreen ||
    element.oExitFullscreen ||
    element.msExitFullscreen
    ));

    this.element = element;
    this.handleResize();
};


Canvas.prototype.clear = function () {
    if (!this.element) return this;

    removeEvent(window, "resize orientationchange", this.handleResize, this);
    document.body.removeChild(this.element);
    this.element = undefined;

    return this;
};

/**
 * @method setFullscreen
 * @memberof Canvas
 * @brief sets fullScreen boolean
 * @param Number width
 */
Canvas.prototype.setFullscreen = function (value) {
    if (!this.element || this.fullScreen === value) return this;

    this.fullScreen = !!value;
    this.handleResize();

    return this;
};

/**
 * @method setWidth
 * @memberof Canvas
 * @brief sets width and updates aspect
 * @param Number width
 */
Canvas.prototype.setWidth = function (width) {
    if (!this.element || this.width === width) return this;

    this.width = width;
    this.fullScreen = false;
    this.aspect = this.width / this.height;

    this.handleResize();

    return this;
};

/**
 * @method setHeight
 * @memberof Canvas
 * @brief sets height and updates aspect
 * @param Number height
 */
Canvas.prototype.setHeight = function (height) {
    if (!this.element || this.height === height) return this;

    this.height = height;
    this.fullScreen = false;
    this.aspect = this.width / this.height;

    this.handleResize();

    return this;
};

/**
 * @method style
 * @memberof Canvas
 * @brief sets style of html element
 * @param String key
 * @param String value
 */
Canvas.prototype.style = function (key, value) {
    if (!this.element) return this;

    this.element.style[key] = value;
    return this;
};

/**
 * @method setBackgroundColor
 * @memberof Canvas
 * @brief sets html background color
 * @param String color
 */
Canvas.prototype.setBackgroundColor = function (color) {
    if (!this.element) return this;

    this.element.style.background = color;
    return this;
};


Canvas.prototype.handleResize = function () {
    var w = window.innerWidth,
        h = window.innerHeight,
        aspect = w / h,
        element = this.element,
        style = element.style,
        width, height;

    if (this.fullScreen) {
        width = w;
        height = h;
    } else {
        if (aspect > this.aspect) {
            width = h * this.aspect;
            height = h;
        } else {
            width = w;
            height = w / this.aspect;
        }
    }

    this.pixelWidth = floor(width);
    this.pixelHeight = floor(height);

    element.width = width;
    element.height = height;

    style.marginLeft = -floor((width + 1) * 0.5) + "px";
    style.marginTop = -floor((height + 1) * 0.5) + "px";

    style.width = floor(width) + "px";
    style.height = floor(height) + "px";

    this.emit("resize");
};

Canvas.prototype.newCanvas = function () {
    return document.createElement("canvas");
};

module.exports = new Canvas;
