
var Enums = require("../../../../../core/enums");

WebGLBlendModeManager = function()
{
    this.currentBlendMode = 99999;

};

WebGLBlendModeManager.prototype.constructor = WebGLBlendModeManager;

WebGLBlendModeManager.prototype.setContext = function(gl)
{
    this.gl = gl;

    this.initBlendMode();
};

WebGLBlendModeManager.blendModesWebGL = undefined;

WebGLBlendModeManager.prototype.initBlendMode = function () {
    var blendModesWebGL = WebGLBlendModeManager.blendModesWebGL;
    if(blendModesWebGL) return;

    var gl = this.gl;
    blendModesWebGL = WebGLBlendModeManager.blendModesWebGL = [];

    blendModesWebGL[Enums.blendModes.NORMAL]        = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.ADD]           = [gl.SRC_ALPHA, gl.DST_ALPHA];
    blendModesWebGL[Enums.blendModes.MULTIPLY]      = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.SCREEN]        = [gl.SRC_ALPHA, gl.ONE];
    blendModesWebGL[Enums.blendModes.OVERLAY]       = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.DARKEN]        = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.LIGHTEN]       = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.COLOR_DODGE]   = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.COLOR_BURN]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.HARD_LIGHT]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.SOFT_LIGHT]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.DIFFERENCE]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.EXCLUSION]     = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.HUE]           = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.SATURATION]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.COLOR]         = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
    blendModesWebGL[Enums.blendModes.LUMINOSITY]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];

};

WebGLBlendModeManager.prototype.setBlendMode = function(blendMode)
{
    if(this.currentBlendMode === blendMode)return false;

    this.currentBlendMode = blendMode;
    
    var blendModeWebGL = WebGLBlendModeManager.blendModesWebGL[this.currentBlendMode];
    this.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
    
    return true;
};


WebGLBlendModeManager.prototype.destroy = function()
{
    this.gl = null;
};

module.exports = WebGLBlendModeManager;