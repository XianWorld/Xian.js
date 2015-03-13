var RenderContext2D = require("./../render_context_2d");
var Enums = require("../../../../../base/enums");
var Dom = require("../../../../../context/utils/dom");
var util = require("../../../../../base/util");
var Color = require("../../../../../math/color");
var Mat32 = require("../../../../../math/mat32");
var Vec2 = require("../../../../../math/vec2");
var WebGLShaderManager = require("./utils/WebGLShaderManager");
var WebGLTextureManager = require("./utils/WebGLTextureManager");
var WebGLSpriteBatch = require("./utils/WebGLSpriteBatch");
var WebGLMaskManager = require("./utils/WebGLMaskManager");
var WebGLFilterManager = require("./utils/WebGLFilterManager");
var WebGLStencilManager = require("./utils/WebGLStencilManager");
var WebGLBlendModeManager = require("./utils/WebGLBlendModeManager");
var WebGLGraphics = require("./utils/WebGLGraphics");
var ScreenContext = require('../../../../../context/screen/screen_context');

"use strict";

function WebGLRenderContext2D() {
    RenderContext2D.call(this);

    //this.width = opts.width || 800;
    //this.height = opts.height || 600;
    //this.autoResize = opts.autoResize || false;

    this.canvasContext = document.createElement("canvas").getContext("2d");

    this.contextLost = false;
    this.glContextId = 0;

    //this.canvas = canvas;
    //this.canvas.addEventListener("webglcontextlost", this._handleContextLost.bind(this), false);
    //this.canvas.addEventListener("webglcontextrestored", this._handleContextRestored.bind(this), false);

    //TODO should a total solution for autosize
    //this.width = this.canvas.width;
    //this.height = this.canvas.height;

    this.projection = new Vec2;
    this.offset = new Vec2;

    this.resolution = 1;

    //this.projection.x =  this.width / 2;// / this.resolution;
    //this.projection.y =  -this.height / 2;// / this.resolution;

    this._contextOptions = {
        alpha: true,//this.transparent,
        antialias: false,//opts.antialias, // SPEED UP??
        premultipliedAlpha: true,//this.transparent && this.transparent !== 'notMultiplied',
        stencil:true,
        preserveDrawingBuffer: false//opts.preserveDrawingBuffer
    };

    this.shaderManager = new WebGLShaderManager();
    this.textureManager = new WebGLTextureManager();
    this.spriteBatch = new WebGLSpriteBatch();
    this.maskManager = new WebGLMaskManager();
    this.filterManager = new WebGLFilterManager();
    this.stencilManager = new WebGLStencilManager();
    this.blendModeManager = new WebGLBlendModeManager();

    //// time init the context..
    //this._initContext();

    // map some webGL blend modes..
    //this.mapBlendModes();

    this.renderTexture = undefined;
    this.drawCount = 0;
}

RenderContext2D.extend(WebGLRenderContext2D);

WebGLRenderContext2D.prototype.init = function (canvas, opts) {
    this.canvas = canvas;
    this.canvas.addEventListener("webglcontextlost", this._handleContextLost.bind(this), false);
    this.canvas.addEventListener("webglcontextrestored", this._handleContextRestored.bind(this), false);

    // time init the context..
    this._initContext();
};
WebGLRenderContext2D.prototype.clear = function () {
    if(this.canvas){
        this.canvas.removeEventListener("webglcontextlost", this._handleContextLost.bind(this));
        this.canvas.removeEventListener("webglcontextrestored", this._handleContextRestored.bind(this));
        this.canvas = undefined;
    }
    this.textureManager.clear();
    this.gl = undefined;
};
WebGLRenderContext2D.prototype.destroy = function () {
    this.clear();

    this.shaderManager = undefined;
    this.textureManager = undefined;
    this.spriteBatch = undefined;
    this.maskManager = undefined;
    this.filterManager = undefined;
    this.stencilManager = undefined;
    this.blendModeManager = undefined;
};

WebGLRenderContext2D.prototype.startRender = function (renderTexture, viewportRect) {
    if(this.contextLost)return;

    var gl = this.gl;
    //gl.colorMask(true, true, true, true);

    var viewportWidth, viewportHeight, x, y, width, height;
    if(renderTexture !== undefined){
        this.renderTexture = renderTexture;
        var buffer = renderTexture.getBuffer(gl);

        viewportWidth = renderTexture.width;//this.canvas.width;
        viewportHeight = renderTexture.height;//this.canvas.height;
        x = viewportRect.x * viewportWidth;
        y = viewportRect.y * viewportHeight;
        width = viewportRect.width * viewportWidth;
        height = viewportRect.height * viewportHeight;

        this.projection.x =  viewportWidth / 2;// / this.resolution;
        this.projection.y =  -viewportHeight / 2;// / this.resolution;

        gl.viewport(x, y, width, height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, buffer.frameBuffer);

        //buffer.clear();
        // start the sprite batch
        this.spriteBatch.begin(this);

        // start the filter manager
        //this.filterManager.begin(this);
        this.filterManager.begin(this, buffer.frameBuffer);
        this.blendModeManager.setBlendMode(Enums.blendModes.NORMAL);

    }else{
        this.renderTexture = undefined;

        viewportWidth = ScreenContext._viewWidth;//this.canvas.width;
        viewportHeight = ScreenContext._viewHeight;//this.canvas.height;
        x = viewportRect.x * viewportWidth;
        y = viewportRect.y * viewportHeight;
        width = viewportRect.width * viewportWidth;
        height = viewportRect.height * viewportHeight;

        this.projection.x =  viewportWidth / 2;// / this.resolution;
        this.projection.y =  -viewportHeight / 2;// / this.resolution;

        gl.viewport(x, y, width, height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        // start the sprite batch
        this.spriteBatch.begin(this);

        // start the filter manager
        this.filterManager.begin(this);
        //this.filterManager.begin(this, buffer);
        this.blendModeManager.setBlendMode(Enums.blendModes.NORMAL);
    }
    this.rendering = true;

    //gl.viewport(0, 0, this.width, this.height);
    //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    //
    //// start the sprite batch
    //this.spriteBatch.begin(this);
    //
    //// start the filter manager
    //this.filterManager.begin(this);
    ////this.filterManager.begin(this, buffer);
    //this.blendModeManager.setBlendMode(Enums.blendModes.NORMAL);

    this.drawCount = 0;

};

WebGLRenderContext2D.prototype.finishRender = function (renderTexture) {
    // finish the sprite batch
    this.spriteBatch.end();

    this.rendering = false;
    this.renderTexture = undefined;
};

WebGLRenderContext2D.prototype.clearScreen = function (transparent, background) {
    var gl = this.gl;
    //gl.colorMask(true, true, true, true);
    //
    //gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    if(transparent)
        gl.clearColor(0, 0, 0, 0);
    else if(background){
        gl.clearColor(background.r, background.g, background.b, 1);
    }
    gl.clear(gl.COLOR_BUFFER_BIT);

    this.renderCost = 0;
};

//WebGLRenderContext2D.prototype.drawRepeatImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, tint, repeat) {
//    for (var x = destX; x < destWidth; x += sourceWidth) {
//        for (var y = destY; y < destHeight; y += sourceHeight) {
//            var destW = Math.min(sourceWidth, destWidth - x);
//            var destH = Math.min(sourceHeight, destHeight - y);
//            this.drawImage(texture, sourceX, sourceY, destW, destH, x, y, destW, destH);
//        }
//    }
//};

//WebGLRenderContext2D.prototype.drawImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, tint, repeat) {
//    if (repeat === void 0) { repeat = undefined; }
//    if (this.contextLost) {
//        return;
//    }
//    if (repeat !== undefined) {
//        this.drawRepeatImage(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, tint, repeat);
//        return;
//    }
//
//    var spriteData = Renderable2DData.create();
//    spriteData.texture = texture;
//
//    spriteData.sourceX = sourceX;
//    spriteData.sourceY = sourceY;
//    spriteData.sourceWidth = sourceWidth;
//    spriteData.sourceHeight = sourceHeight;
//
//    spriteData.destX = destX;
//    spriteData.destY = destY;
//    spriteData.destWidth = destWidth;
//    spriteData.destHeight = destHeight;
//
//    spriteData.tint = tint;
//    spriteData.alpha = this.worldAlpha;
//    spriteData.blendMode = this.currentBlendMode;
//
//    this.spriteBatch.render(spriteData);
//};

WebGLRenderContext2D.prototype.renderSprite2D = function (sprite2D) {
    this.spriteBatch.render(sprite2D);

    //this.drawCount++;
};

WebGLRenderContext2D.prototype.renderTilingSprite2D = function (tilingSprite) {
    this.spriteBatch.renderTilingSprite(tilingSprite);
};

WebGLRenderContext2D.prototype.renderGraphics = function (graphics) {
    //CanvasGraphics.renderGraphics(this, worldTransform, graphicsData, worldAlpha, tint);

    //this._setAlpha(graphics.worldAlpha, graphics.blendMode);
    //this._setTransform(graphics.worldMatrix);
    WebGLGraphics.renderGraphics(this, graphics);
};

WebGLRenderContext2D.prototype.renderText = function (text2d) {
    var sprite2D;
    if(text2d._dirtyRender){
        text2d._generateCachedSprite();
        text2d._dirtyRender = false;
    }
    sprite2D = text2d._cachedSprite;
    sprite2D.worldMatrix = text2d.worldMatrix;
    sprite2D.worldAlpha = text2d.worldAlpha;

    this.renderSprite2D(sprite2D);
};

//WebGLRenderContext2D.prototype.renderGraphicsMask = function (graphics) {
//    //CanvasGraphics.renderGraphicsMask(this, worldTransform, graphicsData, worldAlpha, tint);
//    WebGLGraphics.renderGraphicsMask(this, graphics);
//};

WebGLRenderContext2D.prototype.pushMask = function (graphics) {
    this.spriteBatch.stop();
    this.maskManager.pushMask(graphics, this);
    this.spriteBatch.start();
};

WebGLRenderContext2D.prototype.popMask = function (graphics) {
    this.spriteBatch.stop();
    this.maskManager.popMask(graphics, this);
    this.spriteBatch.start();
};

WebGLRenderContext2D.prototype.pushFilter = function (filterBlock) {
    this.spriteBatch.stop();
    this.filterManager.pushFilter(filterBlock);
    this.spriteBatch.start();
};

WebGLRenderContext2D.prototype.popFilter = function () {
    this.spriteBatch.stop();
    this.filterManager.popFilter();
    this.spriteBatch.start();
};

//WebGLRenderContext2D.prototype.setTransform = function (matrix) {
//    var locWorldTransform = this.worldTransform;
//    //locWorldTransform.a = matrix.a;
//    //locWorldTransform.b = matrix.b;
//    //locWorldTransform.c = matrix.c;
//    //locWorldTransform.d = matrix.d;
//    //locWorldTransform.tx = matrix.tx;
//    //locWorldTransform.ty = matrix.ty;
//
//    locWorldTransform.copy(matrix);
//};
//
//WebGLRenderContext2D.prototype.setBlendMode = function (blendMode) {
//    if (!blendMode) {
//        blendMode = Enums.blendModes.NORMAL;
//    }
//    //if (this.currentBlendMode != blendMode) {
//    //    var blendModeWebGL = WebGLRenderContext2D.blendModesWebGL[blendMode];
//    //    if (blendModeWebGL) {
//    //        this._draw();
//    //        this.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
//    //        this.currentBlendMode = blendMode;
//    //    }
//    //}
//};
//
//WebGLRenderContext2D.prototype.setAlpha = function (value, blendMode) {
//    this.worldAlpha = value;
//    this.setBlendMode(blendMode);
//};

//WebGLRenderContext2D.prototype._updateTexture = function(gl, texture)
//{
//    //var gl = this.gl;
//
//    if(!texture._glTextures[gl.id]) texture._glTextures[gl.id] = gl.createTexture();
//
//    gl.bindTexture(gl.TEXTURE_2D, texture._glTextures[gl.id]);
//
//    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultipliedAlpha);
//    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.raw);
//
//    //texture.scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST
//    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
//    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
//
//    // reguler...
//    if(!texture._powerOf2)
//    {
//        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//    }
//    else
//    {
//        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
//        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
//    }
//
//    texture._dirty[gl.id] = false;
//
//    return  texture._glTextures[gl.id];
//};

//WebGLRenderContext2D.prototype.createWebGLTexture = function (texture) {
//    if (!texture.webGLTexture) {
//        var gl = this.gl;
//        texture.webGLTexture = gl.createTexture();
//        gl.bindTexture(gl.TEXTURE_2D, texture.webGLTexture);
//        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
//        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.raw);
//        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
//        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
//        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//        gl.bindTexture(gl.TEXTURE_2D, null);
//    }
//};


WebGLRenderContext2D.prototype.toJSON = function (json) {
    return json;
};

WebGLRenderContext2D.prototype.fromJSON = function (json) {
    return this;
};

WebGLRenderContext2D.prototype._initContext = function()
{
    var gl = this.canvas.getContext('webgl', this._contextOptions) || this.canvas.getContext('experimental-webgl', this._contextOptions);
    this.gl = gl;

    if (!gl) {
        // fail, not able to get a context
        throw new Error('This browser does not support webGL. Try using the canvas renderer');
    }
    //gl.id = this.glContextId++;
    this.glContextId = gl.id = WebGLRenderContext2D.glContextId ++;
    gl.renderer = this;

    //WebGLRenderContext2D.glContexts[this.glContextId] = gl;
    //WebGLRenderContext2D.instances[this.glContextId] = this;

    // set up the default pixi settings..
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.enable(gl.BLEND);

    // need to set the context for all the managers...
    this.shaderManager.setContext(gl);
    this.textureManager.setContext(gl);
    this.spriteBatch.setContext(gl);
    this.maskManager.setContext(gl);
    this.filterManager.setContext(gl);
    this.blendModeManager.setContext(gl);
    this.stencilManager.setContext(gl);
    //
    //this.renderSession.gl = this.gl;

    // now resize and we are good to go!
    //this._resize(this.width, this.height);
};

//WebGLRenderContext2D.prototype._resize = function(width, height)
//{
//    this.width = width * this.resolution;
//    this.height = height * this.resolution;
//
//    this.canvas.width = this.width;
//    this.canvas.height = this.height;
//
//    if (this.autoResize) {
//        this.canvas.style.width = this.width / this.resolution + 'px';
//        this.canvas.style.height = this.height / this.resolution + 'px';
//    }
//
//    this.gl.viewport(0, 0, this.width, this.height);
//
//    this.projection.x =  this.width / 2 / this.resolution;
//    this.projection.y =  -this.height / 2 / this.resolution;
//};

WebGLRenderContext2D.prototype._handleContextLost = function (event) {
    event.preventDefault();
    this.contextLost = true;
    this.textureManager.clear();
};

WebGLRenderContext2D.prototype._handleContextRestored = function () {
    this._initContext();
    //this.shaderManager.setContext(this.gl);

    //TODO how to release all lost context related object?

    this.contextLost = false;
};


//WebGLRenderContext2D.blendModesWebGL = undefined;
//
//WebGLRenderContext2D.prototype.initBlendMode = function () {
//    var blendModesWebGL = WebGLRenderContext2D.blendModesWebGL;
//    if(blendModesWebGL) return;
//
//    var gl = this.gl;
//    blendModesWebGL = WebGLRenderContext2D.blendModesWebGL = [];
//
//    blendModesWebGL[Enums.blendModes.NORMAL]        = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
//    blendModesWebGL[Enums.blendModes.ADD]           = [gl.SRC_ALPHA, gl.DST_ALPHA];
//    blendModesWebGL[Enums.blendModes.MULTIPLY]      = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA];
//    blendModesWebGL[Enums.blendModes.SCREEN]        = [gl.SRC_ALPHA, gl.ONE];
//    blendModesWebGL[Enums.blendModes.OVERLAY]       = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
//    blendModesWebGL[Enums.blendModes.DARKEN]        = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
//    blendModesWebGL[Enums.blendModes.LIGHTEN]       = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
//    blendModesWebGL[Enums.blendModes.COLOR_DODGE]   = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
//    blendModesWebGL[Enums.blendModes.COLOR_BURN]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
//    blendModesWebGL[Enums.blendModes.HARD_LIGHT]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
//    blendModesWebGL[Enums.blendModes.SOFT_LIGHT]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
//    blendModesWebGL[Enums.blendModes.DIFFERENCE]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
//    blendModesWebGL[Enums.blendModes.EXCLUSION]     = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
//    blendModesWebGL[Enums.blendModes.HUE]           = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
//    blendModesWebGL[Enums.blendModes.SATURATION]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
//    blendModesWebGL[Enums.blendModes.COLOR]         = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
//    blendModesWebGL[Enums.blendModes.LUMINOSITY]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
//
//};

//WebGLRenderContext2D.glContextId = 0;
//WebGLRenderContext2D.glContexts = []; // this is where we store the webGL contexts for easy access.
//WebGLRenderContext2D.instances = [];

module.exports = new WebGLRenderContext2D;