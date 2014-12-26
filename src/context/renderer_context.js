/**
 * Created by Dianyan on 2014/11/30.
 */
//var CanvasContext = require('./canvas');
var ScreenContext = require('./screen_context');
//var Canvas2DRenderer = require('./renderer/canvas_renderer_2d');
var Log = require('./log');
var Dom = require('./dom');
var Device = require('./device');
var Config = require('../base/config');
var Class = require('../base/class');

//var canvas_name = "xianCanvas";

function RendererContext() {
    this.canvasRendererClass = undefined;
    this.webglRendererClass = undefined;

    this.rendererClass = undefined;
    this.renderer = undefined;

    this.isWebgl = false;
}

RendererContext.prototype._onScreenResize = function () {
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
RendererContext.prototype.init = function (opts) {
    //if (this.canvasRendererClass === undefined && this.webglRendererClass === undefined) {
    //    Log.error("no renderer set!");
    //    return this;
    //}
    //var canvas = CanvasContext.element;
    //if (canvas === undefined) {
    //    Log.error("the CanvasContext should be inited!");
    //    return this;
    //}

    ScreenContext.on("resize", this._onScreenResize.bind(this));
    this.canvas = this._createCanvas();

    opts || (opts = Config.renderer);
    opts || (opts = {});

    if (opts.canvasRenderer)
        this.setRendererClass("canvas", opts.canvasRenderer);
    if (opts.webglRenderer)
        this.setRendererClass("webgl", opts.webglRenderer);

    this.rendererClass = undefined;
    this.renderer = undefined;
    var type = opts.type || "auto";
    if (type === undefined) {
        //this.rendererClass = this.canvasRendererClass = Canvas2DRenderer;
    } else if (type === 'canvas' && this.canvasRendererClass !== undefined) {
        this.rendererClass = this.canvasRendererClass;
    }
    else {
        //var gl = Device.webgl;
        if (Device.webgl && this.webglRendererClass !== undefined) {
            this.rendererClass = this.webglRendererClass;
        }
        else if (type === 'auto' && this.canvasRendererClass !== undefined) {
            this.rendererClass = this.canvasRendererClass;
        }
    }

    if (this.rendererClass === undefined) {
        Log.error("can not init the renderer required!");
    }
    else {
        this.isWebgl = this.rendererClass == this.webglRendererClass;

        this.renderer = new this.rendererClass(this.canvas, opts);
        this._onScreenResize();
    }

    return this;
};

RendererContext.prototype.clear = function () {
    ScreenContext.off("resize", this._onScreenResize.bind(this));
    if(this.renderer) this.renderer.destroy();

    this.canvasRendererClass = undefined;
    this.webglRendererClass = undefined;

    this.rendererClass = undefined;
    this.renderer = undefined;

    this.isWebgl = false;
};

RendererContext.prototype._createCanvas = function () {
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

RendererContext.prototype.setRendererClass = function (type, renderer) {
    var classType = renderer;
    if (typeof(classType) === "string")
        classType = Class._classes[classType];

    if (type === "canvas")
        this.canvasRendererClass = classType;
    else if (type === "webgl")
        this.webglRendererClass = classType;
};


//RendererContext.prototype.createRenderer = function (canvas, opts) {
//    if (this.rendererClass === undefined) {
//        Log.error("can not init the renderer required!");
//        return undefined;
//    }
//    return new this.rendererClass(canvas, opts);
//};

module.exports = new RendererContext;