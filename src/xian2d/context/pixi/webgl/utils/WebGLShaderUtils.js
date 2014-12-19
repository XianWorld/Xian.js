
function WebGLShaderUtils(){

}

WebGLShaderUtils.initDefaultShaders = function()
{
};

WebGLShaderUtils.CompileVertexShader = function(gl, shaderSrc)
{
    return WebGLShaderUtils._CompileShader(gl, shaderSrc, gl.VERTEX_SHADER);
};

WebGLShaderUtils.CompileFragmentShader = function(gl, shaderSrc)
{
    return WebGLShaderUtils._CompileShader(gl, shaderSrc, gl.FRAGMENT_SHADER);
};

WebGLShaderUtils._CompileShader = function(gl, shaderSrc, shaderType)
{
    var src = shaderSrc.join("\n");
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        window.console.log(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
};

WebGLShaderUtils.compileProgram = function(gl, vertexSrc, fragmentSrc)
{
    var fragmentShader = WebGLShaderUtils.CompileFragmentShader(gl, fragmentSrc);
    var vertexShader = WebGLShaderUtils.CompileVertexShader(gl, vertexSrc);

    var shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
    {
        window.console.log("Could not initialise shaders");
    }

    return shaderProgram;
};

WebGLShaderUtils.updateTexture = function(gl, texture)
{
    //var gl = this.gl;

    if(!texture._glTextures[gl.id]) texture._glTextures[gl.id] = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture._glTextures[gl.id]);

    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.raw);

    //texture.scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    // reguler...
    if(!texture._powerOf2)
    {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    else
    {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }

    texture._dirty[gl.id] = false;

    return  texture._glTextures[gl.id];
};

module.exports = WebGLShaderUtils;