var AbstractFilter = require("./AbstractFilter");

function ColorMatrixFilter(opts) {
    opts || (opts = {});

    AbstractFilter.call(this, opts);

    //this.passes = [this];

    // set the uniforms
    this.uniforms = {
        matrix: {
            type: 'mat4', value: [1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1]
        }
    };

    if(opts.matrix) this.matrix = opts.matrix;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform float invert;',
        'uniform mat4 matrix;',
        'uniform sampler2D uSampler;',

        'void main(void) {',
        '   gl_FragColor = texture2D(uSampler, vTextureCoord) * matrix;',
        //  '   gl_FragColor = gl_FragColor;',
        '}'
    ];
};

ColorMatrixFilter.prototype = Object.create(AbstractFilter.prototype);
ColorMatrixFilter.prototype.constructor = ColorMatrixFilter;

Object.defineProperty(ColorMatrixFilter.prototype, 'matrix', {
    get: function () {
        return this.uniforms.matrix.value;
    },
    set: function (value) {
        this.uniforms.matrix.value = value;
    }
});

ColorMatrixFilter.prototype.fromJSON = function (json) {

    this.matrix = json.matrix;

    return this;
};

ColorMatrixFilter.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "ColorMatrixFilter";
    json.matrix = this.matrix;

    return json;
};

//AbstractFilter._classes.ColorMatrixFilter = ColorMatrixFilter;

module.exports = ColorMatrixFilter;