var Texture = require("./texture");
var MainContext = require("../context/main_context");
var RenderContext = MainContext.RendererContext;
var FilterTexture = require("../render/FilterTexture");
var CanvasBuffer = require("../render/CanvasBuffer");
var Vec2 = require("../math/vec2");

function RenderTexture(opts) {
    opts || (opts = {});

    Texture.call(this, opts);

    this.width = opts.width || 100;
    this.height = opts.height || 100;

    this.valid = true;

    this.textureBuffer = undefined;
    this.renderer = undefined;
    this.resize(this.width, this.height);
}
Texture.extend(RenderTexture);

RenderTexture.prototype.getBuffer = function (renderer) {
    renderer = renderer || RenderContext.renderer;
    if (this.renderer === renderer)
        return this.textureBuffer;

    this.renderer = renderer;

    //if(this.renderer.type === WEBGL_RENDERER)
    if (this.renderer.gl) {
        var gl = this.renderer.gl;
        this.needsUpdate = false;
        //this._dirty[gl.id] = false;

        this.textureBuffer = new FilterTexture(gl, this.width * this.resolution, this.height * this.resolution, this.filter);
        //this._glTextures[gl.id] = this.textureBuffer.texture;
        //this.webGLTexture = this.textureBuffer.texture;
        this._glTexture = this.textureBuffer.texture;

        //this.render = this.renderWebGL;
        //this.projection = new Vec2(this.width*0.5, -this.height*0.5);
    }
    else {
        //this.render = this.renderCanvas;
        this.textureBuffer = new CanvasBuffer(this.width * this.resolution, this.height * this.resolution);
        this.raw = this.textureBuffer.canvas;
    }
    return this.textureBuffer;
};


RenderTexture.prototype.resize = function (width, height) {
    if (width === this.width && height === this.height)return;

    this.valid = (width > 0 && height > 0);

    this.width = width;
    this.height = height;

    //if (this.renderer.type === WEBGL_RENDERER)
    //{
    //    this.projection.x = this.width / 2;
    //    this.projection.y = -this.height / 2;
    //}

    if (!this.valid)return;

    if (this.textureBuffer)
        this.textureBuffer.resize(this.width * this.resolution, this.height * this.resolution);
};

RenderTexture.prototype.clear = function () {
    if (!this.valid)return;

    //if (this.renderer.type === WEBGL_RENDERER)
    //{
    //    this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER, this.textureBuffer.frameBuffer);
    //}

    this.textureBuffer.clear();
};

RenderTexture.prototype.getImage = function () {
    var image = new Image();
    image.src = this.getBase64();
    return image;
};

RenderTexture.prototype.getBase64 = function () {
    return this.getCanvas().toDataURL();
};

RenderTexture.prototype.getCanvas = function () {
    //if (this.renderer.type === WEBGL_RENDERER)
    if (this.renderer.gl) {
        var gl = this.renderer.gl;
        var width = this.textureBuffer.width;
        var height = this.textureBuffer.height;

        var webGLPixels = new Uint8Array(4 * width * height);

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.textureBuffer.frameBuffer);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, webGLPixels);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        var tempCanvas = new CanvasBuffer(width, height);
        var canvasData = tempCanvas.context.getImageData(0, 0, width, height);
        canvasData.data.set(webGLPixels);

        tempCanvas.context.putImageData(canvasData, 0, 0);

        return tempCanvas.canvas;
    }
    else {
        return this.textureBuffer.canvas;
    }
};

module.exports = RenderTexture;