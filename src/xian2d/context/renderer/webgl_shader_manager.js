/**
 * Created by Dianyan on 2014/12/12.
 */

var PrimitiveShader = require("./shaders/primitive_shader");
var XianShader = require("./shaders/xian_shader");
var ColorTransformShader = require("./shaders/colortransform_shader");

function WebGLShaderManager(gl) {
    this.maxAttibs = 10;
    this.attribState = [];
    this.tempAttribState = [];
    for (var i = 0; i < this.maxAttibs; i++) {
        this.attribState[i] = false;
    }
    this.setContext(gl);
}
WebGLShaderManager.prototype.setContext = function (gl) {
    this.gl = gl;
    this.primitiveShader = new PrimitiveShader(gl);
    this.defaultShader = new XianShader(gl);
    this.colorTransformShader = new ColorTransformShader(gl);
    this.activateShader(this.defaultShader);
};
WebGLShaderManager.prototype.activateShader = function (shader) {
    if (this.currentShader != shader) {
        this.gl.useProgram(shader.program);
        this.setAttribs(shader.attributes);
        this.currentShader = shader;
    }
};
WebGLShaderManager.prototype.setAttribs = function (attribs) {
    var i;
    var l;
    l = this.tempAttribState.length;
    for (i = 0; i < l; i++) {
        this.tempAttribState[i] = false;
    }
    l = attribs.length;
    for (i = 0; i < l; i++) {
        var attribId = attribs[i];
        this.tempAttribState[attribId] = true;
    }
    var gl = this.gl;
    l = this.attribState.length;
    for (i = 0; i < l; i++) {
        if (this.attribState[i] !== this.tempAttribState[i]) {
            this.attribState[i] = this.tempAttribState[i];
            if (this.tempAttribState[i]) {
                gl.enableVertexAttribArray(i);
            }
            else {
                gl.disableVertexAttribArray(i);
            }
        }
    }
};

module.exports = WebGLShaderManager;