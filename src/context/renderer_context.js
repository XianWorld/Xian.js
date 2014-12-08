/**
 * Created by Dianyan on 2014/11/30.
 */
var CanvasContext = require('./canvas');
var Canvas2DRenderer = require('./renderer/canvas_renderer_2d');
var Log = require('./log');
var Dom = require('./dom');
var Config = require('../base/config');

function RendererContext() {
    this.canvasRendererClass = undefined;
    this.webglRendererClass = undefined;

    this.rendererClass = undefined;
    this.renderer = undefined;
}

RendererContext.prototype.init = function (opts) {
    if (this.canvasRendererClass === undefined && this.webglRendererClass === undefined) {
        Log.error("no renderer set!");
        return this;
    }
    var canvas = CanvasContext.element;
    if (canvas === undefined) {
        Log.error("the CanvasContext should be inited!");
        return this;
    }

    opts || (opts = Config.renderer);
    opts || (opts = {});

    this.rendererClass = undefined;
    this.renderer = undefined;
    var type = opts.type;
    if(type === undefined){
        //this.rendererClass = this.canvasRendererClass = Canvas2DRenderer;
    }else if (type === 'canvas' && this.canvasRendererClass !== undefined) {
        this.rendererClass = this.canvasRendererClass;
    }
    else {
        var gl = Dom.getWebGLContext(canvas, opts.WEBGL_ATTRIBUTES);
        if (gl !== undefined && this.webglRendererClass !== undefined) {
            this.rendererClass = this.webglRendererClass;
        }
    }

    if (this.rendererClass === undefined) {
        Log.error("can not init the renderer required!");
    }
    else{
        this.renderer = new this.rendererClass(canvas,opts);
    }

    return this;
};

RendererContext.prototype.createRenderer = function (canvas, opts) {
    if (this.rendererClass === undefined) {
        Log.error("can not init the renderer required!");
        return undefined;
    }
    return new this.rendererClass(canvas, opts);
};

module.exports = new RendererContext;