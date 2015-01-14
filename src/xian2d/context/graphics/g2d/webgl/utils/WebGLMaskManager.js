
var WebGLGraphics = require("./WebGLGraphics");

WebGLMaskManager = function()
{
    //this.renderer = renderer;
};

WebGLMaskManager.prototype.constructor = WebGLMaskManager;

WebGLMaskManager.prototype.setContext = function(gl)
{
    this.gl = gl;
};

WebGLMaskManager.prototype.pushMask = function(maskData, renderSession)
{
    var gl = renderSession.gl;

    if(maskData.dirty)
    {
        WebGLGraphics.updateGraphics(maskData, gl);
    }

    if(!maskData._webGL[gl.id].data.length)return;

    renderSession.stencilManager.pushStencil(maskData, maskData._webGL[gl.id].data[0], renderSession);
};

WebGLMaskManager.prototype.popMask = function(maskData, renderSession)
{
    var gl = this.gl;
    renderSession.stencilManager.popStencil(maskData, maskData._webGL[gl.id].data[0], renderSession);
};

WebGLMaskManager.prototype.destroy = function()
{
    //this.renderer = undefined;
    this.gl = null;
};

module.exports = WebGLMaskManager;