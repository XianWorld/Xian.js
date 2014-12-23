/**
 * Created by Dianyan on 2014/12/22.
 */

function WebGLTextureManager() {
    this._glTextureHolders = [];
}

WebGLTextureManager.prototype.setContext = function (gl) {
    this.gl = gl;

};

WebGLTextureManager.prototype.clear = function () {
    var i = this._glTextureHolders.length,
        texture;
    while(i--){
        texture = this._glTextureHolders[i];
        this.destroyGLTexture(texture);
    }
};
WebGLTextureManager.prototype.destroy = function () {
    this.clear();
};

WebGLTextureManager.prototype.getGLTexture = function (texture, bind) {
    var gl = this.gl;
    if (!texture._glTexture) {
        //texture._gl = gl;
        texture._glTexture = gl.createTexture();

        if (this._glTextureHolders.indexOf(texture) === -1) {
            this._glTextureHolders.push(texture);
            texture.on("destroy", this.destroyGLTexture.bind(this))
        }
    }

    if (texture.needsUpdate) {
        gl.bindTexture(gl.TEXTURE_2D, texture._glTexture);

        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.raw);

        //texture.scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        // reguler...
        if (!texture._powerOf2) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
        else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        }
        texture.needsUpdate = false;

        if(!bind) gl.bindTexture(gl.TEXTURE_2D, null);
    }
    else{
        if(bind) gl.bindTexture(gl.TEXTURE_2D, texture._glTexture);
    }

    return texture._glTexture;

};

WebGLTextureManager.prototype.destroyGLTexture = function (texture) {
    //TODO should test when context lost, gl maybe invalid
    var gl = texture._gl,
        glTexture = texture._glTexture;
    if(gl && glTexture){
        gl.deleteTexture(glTexture);
    }
    texture._gl = undefined;
    texture._glTexture = undefined;

    texture.needsUpdate = true;

    //remove from holder list
    var index = this._glTextureHolders.indexOf(texture);
    if (index !== -1) {
        this._glTextureHolders.splice(index, 1);
        texture.off("destroy", this.destroyGLTexture.bind(this))
    }
};

module.exports = WebGLTextureManager;