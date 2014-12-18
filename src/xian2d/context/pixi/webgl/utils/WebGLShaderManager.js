
var PrimitiveShader = require("../shaders/PrimitiveShader");
var ComplexPrimitiveShader = require("../shaders/ComplexPrimitiveShader");
var PixiShader = require("../shaders/PixiShader");
var PixiFastShader = require("../shaders/PixiFastShader");
var StripShader = require("../shaders/StripShader");

WebGLShaderManager = function()
{
    this.maxAttibs = 10;

    this.attribState = [];

    this.tempAttribState = [];

    for (var i = 0; i < this.maxAttibs; i++)
    {
        this.attribState[i] = false;
    }

    this.stack = [];

};

WebGLShaderManager.prototype.constructor = WebGLShaderManager;

WebGLShaderManager.prototype.setContext = function(gl)
{
    this.gl = gl;
    
    // the next one is used for rendering primitives
    this.primitiveShader = new PrimitiveShader(gl);

    // the next one is used for rendering triangle strips
    this.complexPrimitiveShader = new ComplexPrimitiveShader(gl);

    // this shader is used for the default sprite rendering
    this.defaultShader = new PixiShader(gl);

    // this shader is used for the fast sprite rendering
    this.fastShader = new PixiFastShader(gl);

    // the next one is used for rendering triangle strips
    this.stripShader = new StripShader(gl);
    this.setShader(this.defaultShader);
};

WebGLShaderManager.prototype.setAttribs = function(attribs)
{
    // reset temp state
    var i;

    for (i = 0; i < this.tempAttribState.length; i++)
    {
        this.tempAttribState[i] = false;
    }

    // set the new attribs
    for (i = 0; i < attribs.length; i++)
    {
        var attribId = attribs[i];
        this.tempAttribState[attribId] = true;
    }

    var gl = this.gl;

    for (i = 0; i < this.attribState.length; i++)
    {
        if(this.attribState[i] !== this.tempAttribState[i])
        {
            this.attribState[i] = this.tempAttribState[i];

            if(this.tempAttribState[i])
            {
                gl.enableVertexAttribArray(i);
            }
            else
            {
                gl.disableVertexAttribArray(i);
            }
        }
    }
};

WebGLShaderManager.prototype.setShader = function(shader)
{
    if(this._currentId === shader._id)return false;
    
    this._currentId = shader._id;

    this.currentShader = shader;

    this.gl.useProgram(shader.program);
    this.setAttribs(shader.attributes);

    return true;
};

WebGLShaderManager.prototype.destroy = function()
{
    this.attribState = null;

    this.tempAttribState = null;

    this.primitiveShader.destroy();

    this.complexPrimitiveShader.destroy();

    this.defaultShader.destroy();

    this.fastShader.destroy();

    this.stripShader.destroy();

    this.gl = null;
};

module.exports = WebGLShaderManager;