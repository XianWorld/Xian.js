/**
 * Created by Dianyan on 2014/12/12.
 */
var WebGLUtils = require("../webgl_utils");
var Class = require("../../../../base/class");

function XianShader(gl) {
    Class.call(this);

    this.defaultVertexSrc = "attribute vec2 aVertexPosition;\n" + "attribute vec2 aTextureCoord;\n" + "attribute vec2 aColor;\n" + "uniform vec2 projectionVector;\n" + "uniform vec2 offsetVector;\n" + "varying vec2 vTextureCoord;\n" + "varying vec4 vColor;\n" + "const vec2 center = vec2(-1.0, 1.0);\n" + "void main(void) {\n" + "   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);\n" + "   vTextureCoord = aTextureCoord;\n" + "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" + "}";
    this.program = null;
    this.fragmentSrc = "precision lowp float;\n" + "varying vec2 vTextureCoord;\n" + "varying vec4 vColor;\n" + "uniform sampler2D uSampler;\n" + "void main(void) {\n" + "gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;\n" + "}";
    this.gl = gl;
    this.init();
}
Class.extend(XianShader);

XianShader.prototype.init = function () {
    var gl = this.gl;
    var program = WebGLUtils.compileProgram(gl, this.defaultVertexSrc, this.fragmentSrc);
    gl.useProgram(program);
    this.uSampler = gl.getUniformLocation(program, "uSampler");
    this.projectionVector = gl.getUniformLocation(program, "projectionVector");
    this.offsetVector = gl.getUniformLocation(program, "offsetVector");
    this.dimensions = gl.getUniformLocation(program, "dimensions");
    this.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
    this.aTextureCoord = gl.getAttribLocation(program, "aTextureCoord");
    this.colorAttribute = gl.getAttribLocation(program, "aColor");
    if (this.colorAttribute === -1) {
        this.colorAttribute = 2;
    }
    this.attributes = [this.aVertexPosition, this.aTextureCoord, this.colorAttribute];
    for (var key in this.uniforms) {
        this.uniforms[key].uniformLocation = gl.getUniformLocation(program, key);
    }
    this.initUniforms();
    this.program = program;
};

XianShader.prototype.initUniforms = function () {
    if (!this.uniforms) {
        return;
    }
    var gl = this.gl;
    var uniform;
    for (var key in this.uniforms) {
        uniform = this.uniforms[key];
        var type = uniform.type;
        if (type === 'mat2' || type === 'mat3' || type === 'mat4') {
            uniform.glMatrix = true;
            uniform.glValueLength = 1;
            if (type === 'mat2') {
                uniform.glFunc = gl.uniformMatrix2fv;
            }
            else if (type === 'mat3') {
                uniform.glFunc = gl.uniformMatrix3fv;
            }
            else if (type === 'mat4') {
                uniform.glFunc = gl.uniformMatrix4fv;
            }
        }
        else {
            uniform.glFunc = gl['uniform' + type];
            if (type === '2f' || type === '2i') {
                uniform.glValueLength = 2;
            }
            else if (type === '3f' || type === '3i') {
                uniform.glValueLength = 3;
            }
            else if (type === '4f' || type === '4i') {
                uniform.glValueLength = 4;
            }
            else {
                uniform.glValueLength = 1;
            }
        }
    }
};

XianShader.prototype.syncUniforms = function () {
    if (!this.uniforms) {
        return;
    }
    var uniform;
    var gl = this.gl;
    for (var key in this.uniforms) {
        uniform = this.uniforms[key];
        if (uniform.glValueLength === 1) {
            if (uniform.glMatrix === true) {
                uniform.glFunc.call(gl, uniform.uniformLocation, uniform.transpose, uniform.value);
            }
            else {
                uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value);
            }
        }
        else if (uniform.glValueLength === 2) {
            uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y);
        }
        else if (uniform.glValueLength === 3) {
            uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y, uniform.value.z);
        }
        else if (uniform.glValueLength === 4) {
            uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y, uniform.value.z, uniform.value.w);
        }
    }
};
module.exports = XianShader;