var Renderer2D = require("./../renderer_2d");
var Enums = require("../../../core/enums");
var Dom = require("../../../context/dom");
var util = require("../../../base/util");
var Color = require("../../../math/color");
var Mat32 = require("../../../math/mat32");
var WebGLShaderManager = require("./webgl_shader_manager");
"use strict";

function WebGLRenderer2D(canvas, opts) {
    opts || (opts = {});

    Renderer2D.call(this, opts);

    this.size = 2000;
    this.vertSize = 5;
    this.contextLost = false;
    this.glContextId = 0;
    this.currentBlendMode = "";
    this.currentBaseTexture = null;
    this.currentBatchSize = 0;
    this.maskList = [];
    this.maskDataFreeList = [];
    this.canvasContext = document.createElement("canvas").getContext("2d");

    this.canvas = canvas;
    this.canvas.addEventListener("webglcontextlost", this._handleContextLost.bind(this), false);
    this.canvas.addEventListener("webglcontextrestored", this._handleContextRestored.bind(this), false);

    this.projectionX = this.canvas.width / 2;
    this.projectionY = -this.canvas.height / 2;
    var numVerts = this.size * 4 * this.vertSize;
    var numIndices = this.size * 6;
    this.vertices = new Float32Array(numVerts);
    this.indices = new Uint16Array(numIndices);
    for (var i = 0, j = 0; i < numIndices; i += 6, j += 4) {
        this.indices[i + 0] = j + 0;
        this.indices[i + 1] = j + 1;
        this.indices[i + 2] = j + 2;
        this.indices[i + 3] = j + 0;
        this.indices[i + 4] = j + 2;
        this.indices[i + 5] = j + 3;
    }
    this._initWebGL();
    this.shaderManager = new WebGLShaderManager(this.gl);
    this.worldTransform = new Mat32;
    this._initBlendMode();

    this.colorTransformMatrix = undefined;
    this.renderTexture = undefined;
}

Renderer2D.extend(WebGLRenderer2D);

WebGLRenderer2D.prototype.startRender = function (renderTexture) {

    var gl = this.gl;
    gl.colorMask(true, true, true, true);

    if(renderTexture !== undefined){
        this.renderTexture = renderTexture;
        var buffer = renderTexture.getBuffer(this);

        this.projectionX = renderTexture.width / 2;
        this.projectionY = -renderTexture.height / 2;

        gl.viewport(0, 0, renderTexture.width, renderTexture.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, buffer.frameBuffer);
    }else{
        this.renderTexture = undefined;

        this.projectionX = this.canvas.width / 2;
        this.projectionY = -this.canvas.height / 2;

        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    this.rendering = true;

    //gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};

WebGLRenderer2D.prototype.finishRender = function (renderTexture) {
    this._draw();
    this.rendering = false;
    this.renderTexture = undefined;
};

WebGLRenderer2D.prototype.clearScreen = function (transparent, background) {
    var gl = this.gl;
    //gl.colorMask(true, true, true, true);
    //
    //gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    if (transparent)
        gl.clearColor(0, 0, 0, 0);
    else if (background) {
        gl.clearColor(background.r, background.g, background.b, 1);
    }
    gl.clear(gl.COLOR_BUFFER_BIT);

    this.renderCost = 0;
};

WebGLRenderer2D.prototype.renderSprite2D = function (sprite2D) {

    var texture = sprite2D.destTexture,
        sourceX = sprite2D.sourceX,
        sourceY = sprite2D.sourceY,
        sourceWidth = sprite2D.sourceWidth,
        sourceHeight = sprite2D.sourceHeight,
        destX = sprite2D.destX,
        destY = sprite2D.destY,
        destWidth = sprite2D.destWidth,
        destHeight = sprite2D.destHeight,
        tint = sprite2D.tint,
        alpha = sprite2D.worldAlpha,
        blendMode = sprite2D.blendMode,
        worldMatrix = sprite2D.worldMatrix;

    this._setAlpha(alpha, blendMode);
    this._setTransform(worldMatrix);
    this._drawImage(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, tint);
};


WebGLRenderer2D.prototype._drawRepeatImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, tint, repeat) {
    for (var x = destX; x < destWidth; x += sourceWidth) {
        for (var y = destY; y < destHeight; y += sourceHeight) {
            var destW = Math.min(sourceWidth, destWidth - x);
            var destH = Math.min(sourceHeight, destHeight - y);
            this.drawImage(texture, sourceX, sourceY, destW, destH, x, y, destW, destH);
        }
    }
};

WebGLRenderer2D.prototype._drawImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, tint, repeat) {
    if (repeat === void 0) {
        repeat = undefined;
    }
    if (this.contextLost) {
        return;
    }
    if (repeat !== undefined) {
        this._drawRepeatImage(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, tint, repeat);
        return;
    }
    var texture_scale_factor = this.texture_scale_factor;
    sourceX = sourceX / texture_scale_factor;
    sourceY = sourceY / texture_scale_factor;
    sourceWidth = sourceWidth / texture_scale_factor;
    sourceHeight = sourceHeight / texture_scale_factor;
    this._createWebGLTexture(texture);
    if (texture.webGLTexture !== this.currentBaseTexture || this.currentBatchSize >= this.size) {
        this._draw();
        this.currentBaseTexture = texture.webGLTexture;
    }

    //计算出绘制矩阵，之后把矩阵还原回之前的
    //var locWorldTransform = this.worldTransform;
    var m = this.worldTransform.elements;
    var a = m[0];
    var b = m[1];
    var c = m[2];
    var d = m[3];
    var tx = m[4];
    var ty = m[5];

    //var originalA = locWorldTransform.a;
    //var originalB = locWorldTransform.b;
    //var originalC = locWorldTransform.c;
    //var originalD = locWorldTransform.d;
    //var originalTx = locWorldTransform.tx;
    //var originalTy = locWorldTransform.ty;

    if(this.renderTexture){

        ty = this.renderTexture.height-ty;

        b = -b;
        d = -d;
        //tx = -c * this.renderTexture.height + tx;
        //ty = -d * this.renderTexture.height + ty;
        //
        //c = -c;
        //d = -d;
    }

    if (destX != 0 || destY != 0) {
        //locWorldTransform.append(1, 0, 0, 1, destX, destY);
        //locWorldTransform.translate0(destX, destY);
        tx = a * destX + c * destY + tx;
        ty = b * destX + d * destY + ty;
    }
    var sx = destWidth / sourceWidth,
        sy = destHeight / sourceHeight;
    if (sx != 1 || sy != 1) {
        //locWorldTransform.append(destWidth / sourceWidth, 0, 0, destHeight / sourceHeight, 0, 0);
        //locWorldTransform.scale0(destWidth / sourceWidth, destHeight / sourceHeight);
        a *= sx;
        b *= sx;

        c *= sy;
        d *= sy;
    }
    //var a = locWorldTransform.a;
    //var b = locWorldTransform.b;
    //var c = locWorldTransform.c;
    //var d = locWorldTransform.d;
    //var tx = locWorldTransform.tx;
    //var ty = locWorldTransform.ty;
    //locWorldTransform.a = originalA;
    //locWorldTransform.b = originalB;
    //locWorldTransform.c = originalC;
    //locWorldTransform.d = originalD;
    //locWorldTransform.tx = originalTx;
    //locWorldTransform.ty = originalTy;
    var width = texture.width;
    var height = texture.height;
    var w = sourceWidth;
    var h = sourceHeight;
    sourceX = sourceX / width;
    sourceY = sourceY / height;
    sourceWidth = sourceWidth / width;
    sourceHeight = sourceHeight / height;
    var vertices = this.vertices;
    var index = this.currentBatchSize * 4 * this.vertSize;
    var alpha = this.worldAlpha;
    // xy
    vertices[index++] = tx;
    vertices[index++] = ty;
    // uv
    vertices[index++] = sourceX;
    vertices[index++] = sourceY;
    // alpha
    vertices[index++] = alpha;
    // xy
    vertices[index++] = a * w + tx;
    vertices[index++] = b * w + ty;
    // uv
    vertices[index++] = sourceWidth + sourceX;
    vertices[index++] = sourceY;
    // alpha
    vertices[index++] = alpha;
    // xy
    vertices[index++] = a * w + c * h + tx;
    vertices[index++] = d * h + b * w + ty;
    // uv
    vertices[index++] = sourceWidth + sourceX;
    vertices[index++] = sourceHeight + sourceY;
    // alpha
    vertices[index++] = alpha;
    // xy
    vertices[index++] = c * h + tx;
    vertices[index++] = d * h + ty;
    // uv
    vertices[index++] = sourceX;
    vertices[index++] = sourceHeight + sourceY;
    // alpha
    vertices[index++] = alpha;
    this.currentBatchSize++;
};

WebGLRenderer2D.prototype._draw = function () {
    if (this.currentBatchSize == 0 || this.contextLost) {
        return;
    }
    //var beforeDraw = getTimer();
    this._start();
    var gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.currentBaseTexture);
    var view = this.vertices.subarray(0, this.currentBatchSize * 4 * this.vertSize);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
    gl.drawElements(gl.TRIANGLES, this.currentBatchSize * 6, gl.UNSIGNED_SHORT, 0);
    this.currentBatchSize = 0;
    //this.renderCost += getTimer() - beforeDraw;
    //Profiler.getInstance().onDrawImage();
};

WebGLRenderer2D.prototype._setTransform = function (matrix) {
    var locWorldTransform = this.worldTransform;
    //locWorldTransform.a = matrix.a;
    //locWorldTransform.b = matrix.b;
    //locWorldTransform.c = matrix.c;
    //locWorldTransform.d = matrix.d;
    //locWorldTransform.tx = matrix.tx;
    //locWorldTransform.ty = matrix.ty;

    locWorldTransform.copy(matrix);
};

WebGLRenderer2D.prototype._setAlpha = function (value, blendMode) {
    this.worldAlpha = value;
    this._setBlendMode(blendMode);
};

WebGLRenderer2D.prototype._createWebGLTexture = function (texture) {
    if (!texture.webGLTexture) {
        var gl = this.gl;
        texture.webGLTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture.webGLTexture);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.raw);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
};
//
//WebGLRenderer2D.prototype.pushMask = function (mask) {
//    this._draw();
//    var gl = this.gl;
//    if (this.maskList.length == 0) {
//        gl.enable(gl.STENCIL_TEST);
//        gl.stencilFunc(gl.ALWAYS, 1, 1);
//    }
//    var maskData = this.maskDataFreeList.pop();
//    if (!maskData) {
//        maskData = { x: mask.x, y: mask.y, w: mask.width, h: mask.height };
//    }
//    else {
//        maskData.x = mask.x;
//        maskData.y = mask.y;
//        maskData.w = mask.width;
//        maskData.h = mask.height;
//    }
//    this.maskList.push(maskData);
//    gl.colorMask(false, false, false, false);
//    gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
//    this.renderGraphics(maskData);
//    gl.colorMask(true, true, true, true);
//    gl.stencilFunc(gl.NOTEQUAL, 0, this.maskList.length);
//    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
//};
//
//WebGLRenderer2D.prototype.popMask = function () {
//    this._draw();
//    var gl = this.gl;
//    var maskData = this.maskList.pop();
//    if (maskData) {
//        gl.colorMask(false, false, false, false);
//        gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
//        this.renderGraphics(maskData);
//        gl.colorMask(true, true, true, true);
//        gl.stencilFunc(gl.NOTEQUAL, 0, this.maskList.length);
//        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
//        this.maskDataFreeList.push(maskData);
//    }
//    if (this.maskList.length == 0) {
//        gl.disable(gl.STENCIL_TEST);
//    }
//};
//
//WebGLRenderer2D.prototype.setGlobalColorTransform = function (colorTransformMatrix) {
//    if (this.colorTransformMatrix != colorTransformMatrix) {
//        this._draw();
//        this.colorTransformMatrix = colorTransformMatrix;
//        if (colorTransformMatrix) {
//            var colorTransformMatrix = colorTransformMatrix.concat();
//            var shader = this.shaderManager.colorTransformShader;
//            shader.uniforms.colorAdd.value.w = colorTransformMatrix.splice(19, 1)[0] / 255.0;
//            shader.uniforms.colorAdd.value.z = colorTransformMatrix.splice(14, 1)[0] / 255.0;
//            shader.uniforms.colorAdd.value.y = colorTransformMatrix.splice(9, 1)[0] / 255.0;
//            shader.uniforms.colorAdd.value.x = colorTransformMatrix.splice(4, 1)[0] / 255.0;
//            shader.uniforms.matrix.value = colorTransformMatrix;
//        }
//    }
//};
//WebGLRenderer2D.prototype.renderGraphics = function (graphics) {
//    var gl = this.gl;
//    var shader = this.shaderManager.primitiveShader;
//    if (!this.graphicsPoints) {
//        this.graphicsPoints = [];
//        this.graphicsIndices = [];
//        this.graphicsBuffer = gl.createBuffer();
//        this.graphicsIndexBuffer = gl.createBuffer();
//    }
//    else {
//        this.graphicsPoints.length = 0;
//        this.graphicsIndices.length = 0;
//    }
//    this.updateGraphics(graphics);
//    this.shaderManager.activateShader(shader);
//    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
//    gl.uniformMatrix3fv(shader.translationMatrix, false, this.worldTransform.toArray(true));
//    gl.uniform2f(shader.projectionVector, this.projectionX, -this.projectionY);
//    gl.uniform2f(shader.offsetVector, 0, 0);
//    gl.uniform3fv(shader.tintColor, [1, 1, 1]);
//    gl.uniform1f(shader.alpha, this.worldAlpha);
//    gl.bindBuffer(gl.ARRAY_BUFFER, this.graphicsBuffer);
//    gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);
//    gl.vertexAttribPointer(shader.colorAttribute, 4, gl.FLOAT, false, 4 * 6, 2 * 4);
//    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.graphicsIndexBuffer);
//    gl.drawElements(gl.TRIANGLE_STRIP, this.graphicsIndices.length, gl.UNSIGNED_SHORT, 0);
//    this.shaderManager.activateShader(this.shaderManager.defaultShader);
//};
//
//WebGLRenderer2D.prototype.updateGraphics = function (graphics) {
//    var gl = this.gl;
//    this.buildRectangle(graphics);
//    gl.bindBuffer(gl.ARRAY_BUFFER, this.graphicsBuffer);
//    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.graphicsPoints), gl.STATIC_DRAW);
//    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.graphicsIndexBuffer);
//    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.graphicsIndices), gl.STATIC_DRAW);
//};
//
//WebGLRenderer2D.prototype.buildRectangle = function (graphicsData) {
//    var x = graphicsData.x;
//    var y = graphicsData.y;
//    var width = graphicsData.w;
//    var height = graphicsData.h;
//    var r = 0;
//    var g = 0;
//    var b = 0;
//    var alpha = 1;
//    var verts = this.graphicsPoints;
//    var indices = this.graphicsIndices;
//    var vertPos = verts.length / 6;
//    verts.push(x, y);
//    verts.push(r, g, b, alpha);
//    verts.push(x + width, y);
//    verts.push(r, g, b, alpha);
//    verts.push(x, y + height);
//    verts.push(r, g, b, alpha);
//    verts.push(x + width, y + height);
//    verts.push(r, g, b, alpha);
//    indices.push(vertPos, vertPos, vertPos + 1, vertPos + 2, vertPos + 3, vertPos + 3);
//};

WebGLRenderer2D.prototype._setBlendMode = function (blendMode) {
    if (!blendMode) {
        blendMode = Enums.blendModes.NORMAL;
    }
    if (this.currentBlendMode !== blendMode) {
        var blendModeWebGL = WebGLRenderer2D.blendModesWebGL[blendMode];
        if (blendModeWebGL) {
            this._draw();
            this.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
            this.currentBlendMode = blendMode;
        }
    }
};

WebGLRenderer2D.prototype._initWebGL = function () {
    var options = {
        stencil: true //设置可以使用模板（用于遮罩实现）
    };
    var gl;
    var names = ["experimental-webgl", "webgl"];
    for (var i = 0; i < names.length; i++) {
        try {
            gl = this.canvas.getContext(names[i], options);
        }
        catch (e) {
        }
        if (gl) {
            break;
        }
    }
    if (!gl) {
        throw new Error("当前浏览器不支持webgl");
    }
    this._setContext(gl);
};

WebGLRenderer2D.prototype._setContext = function (gl) {
    this.gl = gl;
    gl.id = this.glContextId++;
    this.vertexBuffer = gl.createBuffer();
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.colorMask(true, true, true, true);
};

WebGLRenderer2D.blendModesWebGL = undefined;

WebGLRenderer2D.prototype._initBlendMode = function () {
    var blendModesWebGL = WebGLRenderer2D.blendModesWebGL;
    if (blendModesWebGL) return;

    var gl = this.gl;
    blendModesWebGL = WebGLRenderer2D.blendModesWebGL = [];

    blendModesWebGL[Enums.blendModes.NORMAL] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.ADD] = [gl.SRC_ALPHA, gl.DST_ALPHA];
    blendModesWebGL[Enums.blendModes.MULTIPLY] = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.SCREEN] = [gl.SRC_ALPHA, gl.ONE];
    blendModesWebGL[Enums.blendModes.OVERLAY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.DARKEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.LIGHTEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.COLOR_DODGE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.COLOR_BURN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.HARD_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.SOFT_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.DIFFERENCE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.EXCLUSION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.HUE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.SATURATION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.COLOR] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.LUMINOSITY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];

};

WebGLRenderer2D.prototype._start = function () {
    if (this.contextLost) {
        return;
    }
    var gl = this.gl;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    var shader;
    if (this.colorTransformMatrix) {
        shader = this.shaderManager.colorTransformShader;
    }
    else {
        shader = this.shaderManager.defaultShader;
    }
    this.shaderManager.activateShader(shader);
    shader.syncUniforms();
    gl.uniform2f(shader.projectionVector, this.projectionX, this.projectionY);
    var stride = this.vertSize * 4;
    gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, stride, 0);
    gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, stride, 2 * 4);
    gl.vertexAttribPointer(shader.colorAttribute, 2, gl.FLOAT, false, stride, 4 * 4);
};

WebGLRenderer2D.prototype._handleContextLost = function () {
    this.contextLost = true;
};

WebGLRenderer2D.prototype._handleContextRestored = function () {
    this._initWebGL();
    this.shaderManager.setContext(this.gl);
    this.contextLost = false;
};


WebGLRenderer2D.prototype.toJSON = function (json) {
    return json;
};

WebGLRenderer2D.prototype.fromJSON = function (json) {
    return this;
};

module.exports = WebGLRenderer2D;