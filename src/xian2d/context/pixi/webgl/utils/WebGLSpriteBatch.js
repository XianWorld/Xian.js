var AbstractFilter = require("../filters/AbstractFilter");
var PixiShader = require("../shaders/PixiShader");
var Utils = require("../utils/WebGLShaderUtils");

WebGLSpriteBatch = function () {
    this.vertSize = 6;

    this.size = 2000;//Math.pow(2, 16) /  this.vertSize;

    //the total number of floats in our batch
    var numVerts = this.size * 4 * this.vertSize;
    //the total number of indices in our batch
    var numIndices = this.size * 6;

    this.vertices = new Float32Array(numVerts);

    this.indices = new Uint16Array(numIndices);

    this.lastIndexCount = 0;

    for (var i = 0, j = 0; i < numIndices; i += 6, j += 4) {
        this.indices[i + 0] = j + 0;
        this.indices[i + 1] = j + 1;
        this.indices[i + 2] = j + 2;
        this.indices[i + 3] = j + 0;
        this.indices[i + 4] = j + 2;
        this.indices[i + 5] = j + 3;
    }

    this.drawing = false;

    this.currentBatchSize = 0;

    this.currentBaseTexture = null;

    this.dirty = true;

    this.textures = [];

    this.blendModes = [];

    this.shaders = [];

    this.sprites = [];

    this.defaultShader = new AbstractFilter({
        fragmentSrc: [
            'precision lowp float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform sampler2D uSampler;',
            'void main(void) {',
            '   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;',
            '}'
        ]
    });
};

WebGLSpriteBatch.prototype.setContext = function (gl) {
    this.gl = gl;

    // create a couple of buffers
    this.vertexBuffer = gl.createBuffer();
    this.indexBuffer = gl.createBuffer();

    // 65535 is max index, so 65535 / 6 = 10922.

    //upload the index data
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);

    this.currentBlendMode = 99999;

    var shader = new PixiShader(gl);

    shader.fragmentSrc = this.defaultShader.fragmentSrc;
    shader.uniforms = {};
    shader.init();

    this.defaultShader.shaders[gl.id] = shader;
};

WebGLSpriteBatch.prototype.begin = function (renderSession) {
    this.renderSession = renderSession;
    this.shader = this.renderSession.shaderManager.defaultShader;

    this.start();
};

WebGLSpriteBatch.prototype.end = function () {
    this.flush();
};

WebGLSpriteBatch.prototype.render = function (sprite) {
    var texture = sprite.destTexture;

    //TODO set blend modes..
    // check texture..
    if (this.currentBatchSize >= this.size) {
        this.flush();
        this.currentBaseTexture = texture;
    }

    //// get the uvs for the texture
    //var uvs = texture._uvs;
    //// if the uvs have not updated then no point rendering just yet!
    //if(!uvs)return;

    // get the sprites current alpha
    var alpha = sprite.worldAlpha;
    var tint = sprite.tint;

    var sourceX = sprite.sourceX,
        sourceY = sprite.sourceY,
        sourceWidth = sprite.sourceWidth,
        sourceHeight = sprite.sourceHeight,
        destX = sprite.destX,
        destY = sprite.destY,
        destWidth = sprite.destWidth,
        destHeight = sprite.destHeight,
    //blendMode = sprite.blendMode,
        worldMatrix = sprite.worldMatrix;

    if(destWidth <= 0) destWidth = sourceWidth;
    if(destHeight <= 0) destHeight = sourceHeight;

    var vertices = this.vertices;
    var index = this.currentBatchSize * 4 * this.vertSize;

    var m = worldMatrix.elements;
    var a = m[0];
    var b = m[1];
    var c = m[2];
    var d = m[3];
    var tx = m[4];
    var ty = m[5];

    if (this.renderSession.renderTexture) {
        //render to texture is upside down
        ty = this.renderSession.renderTexture.height - ty;
        b = -b;
        d = -d;
    }

    if (destX != 0 || destY != 0) {
        tx = a * destX + c * destY + tx;
        ty = b * destX + d * destY + ty;
    }
    var sx = destWidth / sourceWidth,
        sy = destHeight / sourceHeight;
    if (sx != 1 || sy != 1) {
        a *= sx;
        b *= sx;

        c *= sy;
        d *= sy;
    }

    var width = texture.width;
    var height = texture.height;
    var w = sourceWidth;
    var h = sourceHeight;
    sourceX = sourceX / width;
    sourceY = sourceY / height;
    sourceWidth = sourceWidth / width;
    sourceHeight = sourceHeight / height;

    // xy
    vertices[index++] = tx;
    vertices[index++] = ty;
    // uv
    vertices[index++] = sourceX;
    vertices[index++] = sourceY;
    // alpha
    vertices[index++] = alpha;
    vertices[index++] = tint;
    // xy
    vertices[index++] = a * w + tx;
    vertices[index++] = b * w + ty;
    // uv
    vertices[index++] = sourceWidth + sourceX;
    vertices[index++] = sourceY;
    // alpha
    vertices[index++] = alpha;
    vertices[index++] = tint;
    // xy
    vertices[index++] = a * w + c * h + tx;
    vertices[index++] = d * h + b * w + ty;
    // uv
    vertices[index++] = sourceWidth + sourceX;
    vertices[index++] = sourceHeight + sourceY;
    // alpha
    vertices[index++] = alpha;
    vertices[index++] = tint;
    // xy
    vertices[index++] = c * h + tx;
    vertices[index++] = d * h + ty;
    // uv
    vertices[index++] = sourceX;
    vertices[index++] = sourceHeight + sourceY;
    // alpha
    vertices[index++] = alpha;
    vertices[index++] = tint;

    //this._render(worldMatrix, texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, alpha, tint);
    // increment the batchsize
    this.sprites[this.currentBatchSize++] = sprite;
};

//WebGLSpriteBatch.prototype._render = function (worldMatrix, texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, alpha, tint) {
//    var vertices = this.vertices;
//    var index = this.currentBatchSize * 4 * this.vertSize;
//
//    var m = worldMatrix.elements;
//    var a = m[0];
//    var b = m[1];
//    var c = m[2];
//    var d = m[3];
//    var tx = m[4];
//    var ty = m[5];
//
//    if (this.renderSession.renderTexture) {
//        //render to texture is upside down
//        ty = this.renderSession.renderTexture.height - ty;
//        b = -b;
//        d = -d;
//    }
//
//    if (destX != 0 || destY != 0) {
//        tx = a * destX + c * destY + tx;
//        ty = b * destX + d * destY + ty;
//    }
//    var sx = destWidth / sourceWidth,
//        sy = destHeight / sourceHeight;
//    if (sx != 1 || sy != 1) {
//        a *= sx;
//        b *= sx;
//
//        c *= sy;
//        d *= sy;
//    }
//
//    var width = texture.width;
//    var height = texture.height;
//    var w = sourceWidth;
//    var h = sourceHeight;
//    sourceX = sourceX / width;
//    sourceY = sourceY / height;
//    sourceWidth = sourceWidth / width;
//    sourceHeight = sourceHeight / height;
//
//    // xy
//    vertices[index++] = tx;
//    vertices[index++] = ty;
//    // uv
//    vertices[index++] = sourceX;
//    vertices[index++] = sourceY;
//    // alpha
//    vertices[index++] = alpha;
//    vertices[index++] = tint;
//    // xy
//    vertices[index++] = a * w + tx;
//    vertices[index++] = b * w + ty;
//    // uv
//    vertices[index++] = sourceWidth + sourceX;
//    vertices[index++] = sourceY;
//    // alpha
//    vertices[index++] = alpha;
//    vertices[index++] = tint;
//    // xy
//    vertices[index++] = a * w + c * h + tx;
//    vertices[index++] = d * h + b * w + ty;
//    // uv
//    vertices[index++] = sourceWidth + sourceX;
//    vertices[index++] = sourceHeight + sourceY;
//    // alpha
//    vertices[index++] = alpha;
//    vertices[index++] = tint;
//    // xy
//    vertices[index++] = c * h + tx;
//    vertices[index++] = d * h + ty;
//    // uv
//    vertices[index++] = sourceX;
//    vertices[index++] = sourceHeight + sourceY;
//    // alpha
//    vertices[index++] = alpha;
//    vertices[index++] = tint;
//
//};

WebGLSpriteBatch.prototype.renderTilingSprite = function (tilingSprite) {
    var texture = tilingSprite.destTexture;

    // check texture..
    if (this.currentBatchSize >= this.size) {
        this.flush();
        this.currentBaseTexture = texture;
    }

    //// set the textures uvs temporarily
    //// TODO create a separate texture so that we can tile part of a texture
    //
    //if (!tilingSprite._uvs)tilingSprite._uvs = new TextureUvs();
    //
    //var uvs = tilingSprite._uvs;

    var sourceX = tilingSprite.sourceX,
        sourceY = tilingSprite.sourceY,
        sourceWidth = tilingSprite.sourceWidth,
        sourceHeight = tilingSprite.sourceHeight,
        destX = tilingSprite.destX,
        destY = tilingSprite.destY,
        destWidth = tilingSprite.destWidth,
        destHeight = tilingSprite.destHeight,
    //blendMode = sprite.blendMode,
        worldMatrix = tilingSprite.worldMatrix;

    tilingSprite.tilePosition.x %= texture.width * tilingSprite.tileScaleOffset.x;
    tilingSprite.tilePosition.y %= texture.height * tilingSprite.tileScaleOffset.y;

    var offsetX = tilingSprite.tilePosition.x / (texture.width * tilingSprite.tileScaleOffset.x);
    var offsetY = tilingSprite.tilePosition.y / (texture.height * tilingSprite.tileScaleOffset.y);

    var scaleX = (destWidth / texture.width) / (tilingSprite.tileScale.x * tilingSprite.tileScaleOffset.x);
    var scaleY = (destHeight / texture.height) / (tilingSprite.tileScale.y * tilingSprite.tileScaleOffset.y);

    var uvs_x0 = 0 - offsetX;
    var uvs_y0 = 0 - offsetY;

    var uvs_x1 = (1 * scaleX) - offsetX;
    var uvs_y1 = 0 - offsetY;

    var uvs_x2 = (1 * scaleX) - offsetX;
    var uvs_y2 = (1 * scaleY) - offsetY;

    var uvs_x3 = 0 - offsetX;
    var uvs_y3 = (1 * scaleY) - offsetY;

    // get the tilingSprites current alpha
    var alpha = tilingSprite.worldAlpha;
    var tint = tilingSprite.tint;

    var vertices = this.vertices;
    var index = this.currentBatchSize * 4 * this.vertSize;

    var m = worldMatrix.elements;
    var a = m[0];
    var b = m[1];
    var c = m[2];
    var d = m[3];
    var tx = m[4];
    var ty = m[5];

    if (this.renderSession.renderTexture) {
        //render to texture is upside down
        ty = this.renderSession.renderTexture.height - ty;
        b = -b;
        d = -d;
    }

    //if (destX != 0 || destY != 0) {
    //    tx = a * destX + c * destY + tx;
    //    ty = b * destX + d * destY + ty;
    //}
    //var sx = destWidth / sourceWidth,
    //    sy = destHeight / sourceHeight;
    //if (sx != 1 || sy != 1) {
    //    a *= sx;
    //    b *= sx;
    //
    //    c *= sy;
    //    d *= sy;
    //}
    var w0 = destX + destWidth;
    var w1 = destX;

    var h0 = destY + destHeight;
    var h1 = destY;

    var width = texture.width;
    var height = texture.height;
    var w = sourceWidth;
    var h = sourceHeight;
    //sourceX = sourceX / width;
    //sourceY = sourceY / height;
    //sourceWidth = sourceWidth / width;
    //sourceHeight = sourceHeight / height;

    // xy
    vertices[index++] = a * w1 + c * h1 + tx;
    vertices[index++] = d * h1 + b * w1 + ty;
    // uv
    vertices[index++] = uvs_x0;//sourceX;
    vertices[index++] = uvs_y0;//sourceY;
    // alpha
    vertices[index++] = alpha;
    vertices[index++] = tint;
    // xy
    vertices[index++] = a * w0 + c * h1 + tx;
    vertices[index++] = d * h1 + b * w0 + ty;
    // uv
    vertices[index++] = uvs_x1;//sourceWidth + sourceX;
    vertices[index++] = uvs_y1;//sourceY;
    // alpha
    vertices[index++] = alpha;
    vertices[index++] = tint;
    // xy
    vertices[index++] = a * w0 + c * h0 + tx;
    vertices[index++] = d * h0 + b * w0 + ty;
    // uv
    vertices[index++] = uvs_x2;//sourceWidth + sourceX;
    vertices[index++] = uvs_y2;//sourceHeight + sourceY;
    // alpha
    vertices[index++] = alpha;
    vertices[index++] = tint;
    // xy
    vertices[index++] = a * w1 + c * h0 + tx;
    vertices[index++] = d * h0 + b * w1 + ty;
    // uv
    vertices[index++] = uvs_x3;//sourceX;
    vertices[index++] = uvs_y3;//sourceHeight + sourceY;
    // alpha
    vertices[index++] = alpha;
    vertices[index++] = tint;

    //var verticies = this.vertices;
    //
    //var width = tilingSprite.width;
    //var height = tilingSprite.height;
    //
    //// TODO trim??
    //var aX = tilingSprite.anchor.x;
    //var aY = tilingSprite.anchor.y;
    //var w0 = width * (1 - aX);
    //var w1 = width * -aX;
    //
    //var h0 = height * (1 - aY);
    //var h1 = height * -aY;
    //
    //var index = this.currentBatchSize * 4 * this.vertSize;
    //
    //var resolution = texture.baseTexture.resolution;
    //
    //var worldTransform = tilingSprite.worldTransform;
    //
    //var a = worldTransform.a / resolution;//[0];
    //var b = worldTransform.b / resolution;//[3];
    //var c = worldTransform.c / resolution;//[1];
    //var d = worldTransform.d / resolution;//[4];
    //var tx = worldTransform.tx;//[2];
    //var ty = worldTransform.ty;///[5];
    //
    //// xy
    //verticies[index++] = a * w1 + c * h1 + tx;
    //verticies[index++] = d * h1 + b * w1 + ty;
    //// uv
    //verticies[index++] = uvs.x0;
    //verticies[index++] = uvs.y0;
    //// color
    //verticies[index++] = alpha;
    //verticies[index++] = tint;
    //
    //// xy
    //verticies[index++] = (a * w0 + c * h1 + tx);
    //verticies[index++] = d * h1 + b * w0 + ty;
    //// uv
    //verticies[index++] = uvs.x1;
    //verticies[index++] = uvs.y1;
    //// color
    //verticies[index++] = alpha;
    //verticies[index++] = tint;
    //
    //// xy
    //verticies[index++] = a * w0 + c * h0 + tx;
    //verticies[index++] = d * h0 + b * w0 + ty;
    //// uv
    //verticies[index++] = uvs.x2;
    //verticies[index++] = uvs.y2;
    //// color
    //verticies[index++] = alpha;
    //verticies[index++] = tint;
    //
    //// xy
    //verticies[index++] = a * w1 + c * h0 + tx;
    //verticies[index++] = d * h0 + b * w1 + ty;
    //// uv
    //verticies[index++] = uvs.x3;
    //verticies[index++] = uvs.y3;
    //// color
    //verticies[index++] = alpha;
    //verticies[index++] = tint;

    // increment the batchsize
    this.sprites[this.currentBatchSize++] = tilingSprite;
};

//WebGLSpriteBatch.prototype.render = function (sprite) {
//    var texture = sprite.texture;
//
//    //TODO set blend modes..
//    // check texture..
//    if (this.currentBatchSize >= this.size) {
//        this.flush();
//        this.currentBaseTexture = texture;
//    }
//
//    //// get the uvs for the texture
//    //var uvs = texture._uvs;
//    //// if the uvs have not updated then no point rendering just yet!
//    //if(!uvs)return;
//
//    // get the sprites current alpha
//    var alpha = sprite.worldAlpha;
//    var tint = sprite.tint;
//
//    var vertices = this.vertices;
//    var index = this.currentBatchSize * 4 * this.vertSize;
//
//    var sourceX = sprite.sourceX,
//        sourceY = sprite.sourceY,
//        sourceWidth = sprite.sourceWidth,
//        sourceHeight = sprite.sourceHeight,
//        destX = sprite.destX,
//        destY = sprite.destY,
//        destWidth = sprite.destWidth,
//        destHeight = sprite.destHeight,
//    //blendMode = sprite.blendMode,
//        worldMatrix = sprite.worldMatrix;
//
//    //var texture_scale_factor = this.texture_scale_factor;
//    //sourceX = sourceX / texture_scale_factor;
//    //sourceY = sourceY / texture_scale_factor;
//    //sourceWidth = sourceWidth / texture_scale_factor;
//    //sourceHeight = sourceHeight / texture_scale_factor;
//    var m = worldMatrix.elements;
//    var a = m[0];
//    var b = m[1];
//    var c = m[2];
//    var d = m[3];
//    var tx = m[4];
//    var ty = m[5];
//
//    if (this.renderSession.renderTexture) {
//        //render to texture is upside down
//        ty = this.renderSession.renderTexture.height - ty;
//
//        b = -b;
//        d = -d;
//        //tx = -c * this.renderTexture.height + tx;
//        //ty = -d * this.renderTexture.height + ty;
//        //
//        //c = -c;
//        //d = -d;
//    }
//
//    if (destX != 0 || destY != 0) {
//        tx = a * destX + c * destY + tx;
//        ty = b * destX + d * destY + ty;
//    }
//    var sx = destWidth / sourceWidth,
//        sy = destHeight / sourceHeight;
//    if (sx != 1 || sy != 1) {
//        a *= sx;
//        b *= sx;
//
//        c *= sy;
//        d *= sy;
//    }
//
//    var width = texture.width;
//    var height = texture.height;
//    var w = sourceWidth;
//    var h = sourceHeight;
//    sourceX = sourceX / width;
//    sourceY = sourceY / height;
//    sourceWidth = sourceWidth / width;
//    sourceHeight = sourceHeight / height;
//
//    // xy
//    vertices[index++] = tx;
//    vertices[index++] = ty;
//    // uv
//    vertices[index++] = sourceX;
//    vertices[index++] = sourceY;
//    // alpha
//    vertices[index++] = alpha;
//    vertices[index++] = tint;
//    // xy
//    vertices[index++] = a * w + tx;
//    vertices[index++] = b * w + ty;
//    // uv
//    vertices[index++] = sourceWidth + sourceX;
//    vertices[index++] = sourceY;
//    // alpha
//    vertices[index++] = alpha;
//    vertices[index++] = tint;
//    // xy
//    vertices[index++] = a * w + c * h + tx;
//    vertices[index++] = d * h + b * w + ty;
//    // uv
//    vertices[index++] = sourceWidth + sourceX;
//    vertices[index++] = sourceHeight + sourceY;
//    // alpha
//    vertices[index++] = alpha;
//    vertices[index++] = tint;
//    // xy
//    vertices[index++] = c * h + tx;
//    vertices[index++] = d * h + ty;
//    // uv
//    vertices[index++] = sourceX;
//    vertices[index++] = sourceHeight + sourceY;
//    // alpha
//    vertices[index++] = alpha;
//    vertices[index++] = tint;
//
//    // increment the batchsize
//    this.sprites[this.currentBatchSize++] = sprite;
//
//};

WebGLSpriteBatch.prototype.flush = function () {
    // If the batch is length 0 then return as there is nothing to draw
    if (this.currentBatchSize === 0)return;

    var gl = this.gl;
    var shader;

    if (this.dirty) {
        this.dirty = false;
        // bind the main texture
        gl.activeTexture(gl.TEXTURE0);

        // bind the buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        shader = this.defaultShader.shaders[gl.id];

        // this is the same for each shader?
        var stride = this.vertSize * 4;
        gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, stride, 0);
        gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, stride, 2 * 4);
        gl.vertexAttribPointer(shader.colorAttribute, 2, gl.FLOAT, false, stride, 4 * 4);
    }

    // upload the verts to the buffer  
    if (this.currentBatchSize > ( this.size * 0.5 )) {
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);
    }
    else {
        var view = this.vertices.subarray(0, this.currentBatchSize * 4 * this.vertSize);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
    }

    var nextTexture, nextBlendMode, nextShader;
    var batchSize = 0;
    var start = 0;

    var currentBaseTexture = null;
    var currentBlendMode = this.renderSession.blendModeManager.currentBlendMode;
    var currentShader = null;

    var blendSwap = false;
    var shaderSwap = false;
    var sprite;

    for (var i = 0, j = this.currentBatchSize; i < j; i++) {

        sprite = this.sprites[i];

        nextTexture = sprite.destTexture;//.baseTexture;
        nextBlendMode = sprite.blendMode;
        nextShader = sprite.shader || this.defaultShader;

        blendSwap = currentBlendMode !== nextBlendMode;
        shaderSwap = currentShader !== nextShader; // should I use _UIDS???

        if (currentBaseTexture !== nextTexture || blendSwap || shaderSwap) {
            this.renderBatch(currentBaseTexture, batchSize, start);

            start = i;
            batchSize = 0;
            currentBaseTexture = nextTexture;

            if (blendSwap) {
                currentBlendMode = nextBlendMode;
                this.renderSession.blendModeManager.setBlendMode(currentBlendMode);
            }

            if (shaderSwap) {
                currentShader = nextShader;

                shader = currentShader.shaders[gl.id];

                if (!shader) {
                    shader = new PixiShader(gl);

                    shader.fragmentSrc = currentShader.fragmentSrc;
                    shader.uniforms = currentShader.uniforms;
                    shader.init();

                    currentShader.shaders[gl.id] = shader;
                }

                // set shader function???
                this.renderSession.shaderManager.setShader(shader);

                if (shader.dirty)shader.syncUniforms();

                // both thease only need to be set if they are changing..
                // set the projection
                var projection = this.renderSession.projection;
                gl.uniform2f(shader.projectionVector, projection.x, projection.y);

                // TODO - this is temprorary!
                var offsetVector = this.renderSession.offset;
                gl.uniform2f(shader.offsetVector, offsetVector.x, offsetVector.y);

                // set the pointers
            }
        }

        batchSize++;
    }

    this.renderBatch(currentBaseTexture, batchSize, start);

    // then reset the batch!
    this.currentBatchSize = 0;
};

WebGLSpriteBatch.prototype.renderBatch = function (texture, size, startIndex) {
    if (size === 0)return;

    var gl = this.gl;

    // check if a texture is dirty..
    //if (texture._dirty[gl.id]) {
    //    //this.renderSession._updateTexture(texture);
    //    Utils.updateTexture(gl, texture);
    //}
    //else {
    //    // bind the current texture
    //    gl.bindTexture(gl.TEXTURE_2D, texture._glTextures[gl.id]);
    //    //gl.bindTexture(gl.TEXTURE_2D, texture.webGLTexture);
    //}
    gl.renderer.textureManager.getGLTexture(texture, true);

    // now draw those suckas!
    gl.drawElements(gl.TRIANGLES, size * 6, gl.UNSIGNED_SHORT, startIndex * 6 * 2);

    // increment the draw count
    this.renderSession.drawCount++;
};

WebGLSpriteBatch.prototype.stop = function () {
    this.flush();
    this.dirty = true;
};

WebGLSpriteBatch.prototype.start = function () {
    this.dirty = true;
};

WebGLSpriteBatch.prototype.destroy = function () {
    this.vertices = null;
    this.indices = null;

    this.gl.deleteBuffer(this.vertexBuffer);
    this.gl.deleteBuffer(this.indexBuffer);

    this.currentBaseTexture = null;

    this.gl = null;
};

module.exports = WebGLSpriteBatch;