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
        this._dirty[gl.id] = false;

        this.textureBuffer = new FilterTexture(gl, this.width * this.resolution, this.height * this.resolution, this.filter);
        this._glTextures[gl.id] = this.textureBuffer.texture;
        this.webGLTexture = this.textureBuffer.texture;

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

///**
// * This function will draw the display object to the texture.
// *
// * @method renderWebGL
// * @param displayObject {DisplayObject} The display object to render this texture on
// * @param [matrix] {Matrix} Optional matrix to apply to the display object before rendering.
// * @param [clear] {Boolean} If true the texture will be cleared before the displayObject is drawn
// * @private
// */
//RenderTexture.prototype.renderWebGL = function(displayObject, matrix, clear)
//{
//    if(!this.valid)return;
//    //TOOD replace position with matrix..
//
//    //Lets create a nice matrix to apply to our display object. Frame buffers come in upside down so we need to flip the matrix
//    var wt = displayObject.worldTransform;
//    wt.identity();
//    wt.translate(0, this.projection.y * 2);
//    if(matrix)wt.append(matrix);
//    wt.scale(1,-1);
//
//    // setWorld Alpha to ensure that the object is renderer at full opacity
//    displayObject.worldAlpha = 1;
//
//    // Time to update all the children of the displayObject with the new matrix..
//    var children = displayObject.children;
//
//    for(var i=0,j=children.length; i<j; i++)
//    {
//        children[i].updateTransform();
//    }
//
//    // time for the webGL fun stuff!
//    var gl = this.renderer.gl;
//
//    gl.viewport(0, 0, this.width * this.resolution, this.height * this.resolution);
//
//    gl.bindFramebuffer(gl.FRAMEBUFFER, this.textureBuffer.frameBuffer );
//
//    if(clear)this.textureBuffer.clear();
//
//    this.renderer.spriteBatch.dirty = true;
//
//    this.renderer.renderDisplayObject(displayObject, this.projection, this.textureBuffer.frameBuffer);
//
//    this.renderer.spriteBatch.dirty = true;
//};
//
//
///**
// * This function will draw the display object to the texture.
// *
// * @method renderCanvas
// * @param displayObject {DisplayObject} The display object to render this texture on
// * @param [matrix] {Matrix} Optional matrix to apply to the display object before rendering.
// * @param [clear] {Boolean} If true the texture will be cleared before the displayObject is drawn
// * @private
// */
//RenderTexture.prototype.renderCanvas = function(displayObject, matrix, clear)
//{
//    if(!this.valid)return;
//
//    var wt = displayObject.worldTransform;
//    wt.identity();
//    if(matrix)wt.append(matrix);
//
//    // setWorld Alpha to ensure that the object is renderer at full opacity
//    displayObject.worldAlpha = 1;
//
//    // Time to update all the children of the displayObject with the new matrix..
//    var children = displayObject.children;
//
//    for(var i = 0, j = children.length; i < j; i++)
//    {
//        children[i].updateTransform();
//    }
//
//    if(clear)this.textureBuffer.clear();
//
//    var context = this.textureBuffer.context;
//
//    var realResolution = this.renderer.resolution;
//
//    this.renderer.resolution = this.resolution;
//
//    this.renderer.renderDisplayObject(displayObject, context);
//
//    this.renderer.resolution = realResolution;
//};
//
//
//RenderTexture.tempMatrix = new Matrix();

module.exports = RenderTexture;