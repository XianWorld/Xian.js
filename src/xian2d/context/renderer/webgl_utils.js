/**
 * Created by Dianyan on 2014/12/12.
 */
function WebGLUtils() {
}

WebGLUtils.compileProgram = function (gl, vertexSrc, fragmentSrc) {
    var fragmentShader = WebGLUtils.compileFragmentShader(gl, fragmentSrc);
    var vertexShader = WebGLUtils.compileVertexShader(gl, vertexSrc);
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log("无法初始化着色器");
    }
    return shaderProgram;
};
WebGLUtils.compileFragmentShader = function (gl, shaderSrc) {
    return WebGLUtils._compileShader(gl, shaderSrc, gl.FRAGMENT_SHADER);
};
WebGLUtils.compileVertexShader = function (gl, shaderSrc) {
    return WebGLUtils._compileShader(gl, shaderSrc, gl.VERTEX_SHADER);
};
WebGLUtils._compileShader = function (gl, shaderSrc, shaderType) {
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSrc);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
};
WebGLUtils.checkCanUseWebGL = function () {
    if (WebGLUtils.canUseWebGL == undefined) {
        try {
            var canvas = document.createElement("canvas");
            WebGLUtils.canUseWebGL = !!window["WebGLRenderingContext"] && !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
        }
        catch (e) {
            WebGLUtils.canUseWebGL = false;
        }
    }
    return WebGLUtils.canUseWebGL;
};

module.exports = WebGLUtils;