/**
 * Created by Dianyan on 2014/12/12.
 */
var XianShader = require("./xian_shader");
var WebGLUtils = require("../webgl_utils");

function PrimitiveShader(gl) {
    //XianShader.call(this, gl);

    this.program = null;
    this.projectionVector = null;
    this.offsetVector = null;
    this.tintColor = null;
    this.aVertexPosition = null;
    this.colorAttribute = null;
    this.attributes = null;
    this.translationMatrix = null;
    this.alpha = null;
    this.fragmentSrc = "precision mediump float;\n" + "varying vec4 vColor;\n" + "void main(void) {\n" + "   gl_FragColor = vColor;\n" + "}";
    this.vertexSrc = "attribute vec2 aVertexPosition;\n" + "attribute vec4 aColor;\n" + "uniform mat3 translationMatrix;\n" + "uniform vec2 projectionVector;\n" + "uniform vec2 offsetVector;\n" + "uniform float alpha;\n" + "uniform vec3 tint;\n" + "varying vec4 vColor;\n" + "void main(void) {\n" + "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);\n" + "   v -= offsetVector.xyx;\n" + "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);\n" + "   vColor = aColor * vec4(tint * alpha, alpha);\n" + "}";
    this.gl = gl;
    this.init();
}
//XianShader.extend(PrimitiveShader);
PrimitiveShader.prototype.constructor = PrimitiveShader;

PrimitiveShader.prototype.init = function () {
    var gl = this.gl;
    var program = WebGLUtils.compileProgram(gl, this.vertexSrc, this.fragmentSrc);
    gl.useProgram(program);
    this.projectionVector = gl.getUniformLocation(program, "projectionVector");
    this.offsetVector = gl.getUniformLocation(program, "offsetVector");
    this.tintColor = gl.getUniformLocation(program, "tint");
    this.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
    this.colorAttribute = gl.getAttribLocation(program, "aColor");
    this.attributes = [this.aVertexPosition, this.colorAttribute];
    this.translationMatrix = gl.getUniformLocation(program, "translationMatrix");
    this.alpha = gl.getUniformLocation(program, "alpha");
    this.program = program;
};

module.exports = PrimitiveShader;