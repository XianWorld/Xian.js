var Utils = require("../utils/WebGLShaderUtils");
var Class = require("../../../../../../base/class");

function PrimitiveShader(gl)
{
    Class.call(this);
    /**
     * @property _UID
     * @type Number
     * @private
     */
    //this._UID = _UID++;
 
    /**
     * @property gl
     * @type WebGLContext
     */
    this.gl = gl;

    /**
     * The WebGL program.
     * @property program
     * @type {Any}
     */
    this.program = null;

    /**
     * The fragment shader.
     * @property fragmentSrc
     * @type Array
     */
    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec4 vColor;',

        'void main(void) {',
        '   gl_FragColor = vColor;',
        '}'
    ];

    /**
     * The vertex shader.
     * @property vertexSrc
     * @type Array
     */
    this.vertexSrc  = [
        'attribute vec2 aVertexPosition;',
        'attribute vec4 aColor;',
        'uniform mat3 translationMatrix;',
        'uniform vec2 projectionVector;',
        'uniform vec2 offsetVector;',
        'uniform float alpha;',
        'uniform vec3 tint;',
        'varying vec4 vColor;',

        'void main(void) {',
        '   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);',
        '   v -= offsetVector.xyx;',
        '   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);',
        '   vColor = aColor * vec4(tint * alpha, alpha);',
        '}'
    ];

    this.init();
};
Class.extend(PrimitiveShader);

//PrimitiveShader.prototype.constructor = PrimitiveShader;

/**
* Initialises the shader.
* 
* @method init
*/
PrimitiveShader.prototype.init = function()
{
    var gl = this.gl;

    var program = Utils.compileProgram(gl, this.vertexSrc, this.fragmentSrc);
    gl.useProgram(program);

    // get and store the uniforms for the shader
    this.projectionVector = gl.getUniformLocation(program, 'projectionVector');
    this.offsetVector = gl.getUniformLocation(program, 'offsetVector');
    this.tintColor = gl.getUniformLocation(program, 'tint');

    // get and store the attributes
    this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    this.colorAttribute = gl.getAttribLocation(program, 'aColor');

    this.attributes = [this.aVertexPosition, this.colorAttribute];

    this.translationMatrix = gl.getUniformLocation(program, 'translationMatrix');
    this.alpha = gl.getUniformLocation(program, 'alpha');

    this.program = program;
};

/**
* Destroys the shader.
* 
* @method destroy
*/
PrimitiveShader.prototype.destroy = function()
{
    this.gl.deleteProgram( this.program );
    this.uniforms = null;
    this.gl = null;

    this.attributes = null;
};

module.exports = PrimitiveShader;