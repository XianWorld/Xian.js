/**
 * Created by Dianyan on 2014/11/30.
 */
//var CanvasContext = require('./canvas');
var ScreenContext = require('../screen/screen_context');
//var Canvas2DRenderer = require('./renderer/canvas_renderer_2d');
var Log = require('../log/log');
var Dom = require('../utils/dom');
var Device = require('../device/device');
var Config = require('../../base/config');
var Class = require('../../base/class');
//var RendererLib = require('./renderer_lib');

//var canvas_name = "xianCanvas";

function GraphicsContext() {
    this.canvasRenderContext2D = undefined;
    this.webglRenderContext2D = undefined;

    //this.rendererClass = undefined;
    this.renderContext2D = undefined;

    this.isWebgl = false;
}

GraphicsContext.prototype._onScreenResize = function () {
    //if(!this.renderer) return;
    //
    //var stageWidth = ScreenContext._stageWidth;
    //var stageHeight = ScreenContext._stageHeight;
    //var scaleX = ScreenContext.getScaleX();
    //var scaleY = ScreenContext.getScaleY();
    //this.renderer.resize(stageWidth, stageHeight, scaleX, scaleY);

    var canvas = this.canvas;
    var container = ScreenContext.rootDiv;//document.getElementById(ScreenContext.canvas_div_name);
    canvas.width = ScreenContext._viewWidth; //stageW
    canvas.height = ScreenContext._viewHeight; //stageH
    canvas.style.width = container.style.width;
    canvas.style.height = container.style.height;
};

GraphicsContext.prototype.init = function (opts) {

    ScreenContext.on("resize", this._onScreenResize.bind(this));
    this.canvas = this._createCanvas();

    opts || (opts = Config.graphics);
    opts || (opts = {});

    var renderContext2D;
    this.renderer = undefined;
    var type = opts.type || "auto";
    if (type === undefined) {
        renderContext2D = this.canvasRenderContext2D;
    } else if (type === 'canvas' && this.canvasRenderContext2D !== undefined) {
        renderContext2D = this.canvasRenderContext2D;
    }
    else {
        //var gl = Device.webgl;
        if (Device.webgl && this.webglRenderContext2D !== undefined) {
            renderContext2D = this.webglRenderContext2D;
        }
        else if (type === 'auto' && this.canvasRenderContext2D !== undefined) {
            renderContext2D = this.canvasRenderContext2D;
        }
    }

    this.renderContext2D = renderContext2D;
    if (renderContext2D === undefined) {
        Log.error("can not init the renderer required!");
    }
    else {
        this.isWebgl = this.renderContext2D === this.webglRenderContext2D;

        //this.renderer = new this.rendererClass(this.canvas, opts);
        this.renderContext2D.init(this.canvas, opts);
        this._onScreenResize();
    }

    //if (opts.canvasRenderer)
    //    this.setRendererClass("canvas", RendererLib.getClass(opts.canvasRenderer));
    //if (opts.webglRenderer)
    //    this.setRendererClass("webgl", RendererLib.getClass(opts.webglRenderer));
    //
    //this.rendererClass = undefined;
    //this.renderer = undefined;
    //var type = opts.type || "auto";
    //if (type === undefined) {
    //    //this.rendererClass = this.canvasRendererClass = Canvas2DRenderer;
    //} else if (type === 'canvas' && this.canvasRendererClass !== undefined) {
    //    this.rendererClass = this.canvasRendererClass;
    //}
    //else {
    //    //var gl = Device.webgl;
    //    if (Device.webgl && this.webglRendererClass !== undefined) {
    //        this.rendererClass = this.webglRendererClass;
    //    }
    //    else if (type === 'auto' && this.canvasRendererClass !== undefined) {
    //        this.rendererClass = this.canvasRendererClass;
    //    }
    //}
    //
    //if (this.rendererClass === undefined) {
    //    Log.error("can not init the renderer required!");
    //}
    //else {
    //    this.isWebgl = this.rendererClass == this.webglRendererClass;
    //
    //    this.renderer = new this.rendererClass(this.canvas, opts);
    //    this._onScreenResize();
    //}

    return this;
};

GraphicsContext.prototype.clear = function () {
    ScreenContext.off("resize", this._onScreenResize.bind(this));
    //if(this.renderer) this.renderer.destroy();

    //this.canvasRendererClass = undefined;
    //this.webglRendererClass = undefined;
    if(this.canvasRenderContext2D) this.canvasRenderContext2D.clear();
    if(this.webglRenderContext2D) this.webglRenderContext2D.clear();

    //this.rendererClass = undefined;
    this.renderContext2D = undefined;

    this.isWebgl = false;
};

GraphicsContext.prototype.destroy = function () {
    //this.clear();

    if(this.canvasRenderContext2D) this.canvasRenderContext2D.destroy();
    if(this.webglRenderContext2D) this.webglRenderContext2D.destroy();
    this.canvasRenderContext2D = undefined;
    this.webglRenderContext2D = undefined;
};

GraphicsContext.prototype._createCanvas = function () {
    var canvas = document.getElementById(ScreenContext.canvas_name);
    if (!canvas) {
        var container = ScreenContext.rootDiv;//document.getElementById(ScreenContext.canvas_div_name);
        canvas = document.createElement("canvas");
        canvas.id = ScreenContext.canvas_name;
        canvas.width = ScreenContext._viewWidth; //stageW
        canvas.height = ScreenContext._viewHeight; //stageH
        canvas.style.width = container.style.width;
        canvas.style.height = container.style.height;
        //                canvas.style.position = "absolute";
        container.appendChild(canvas);
    }
    return canvas;
};

GraphicsContext.prototype.setRenderContext = function (type, canvas, webgl) {
    //var classType = renderer;
    //if (typeof(classType) === "string")
    //    classType = Class._classes[classType];
    //
    //if (type === "canvas")
    //    this.canvasRendererClass = classType;
    //else if (type === "webgl")
    //    this.webglRendererClass = classType;
    //
    if (type === "2d"){
        this.canvasRenderContext2D = canvas;
        this.webglRenderContext2D = webgl;
    }
    else if (type === "3d"){

    }
};

module.exports = new GraphicsContext;