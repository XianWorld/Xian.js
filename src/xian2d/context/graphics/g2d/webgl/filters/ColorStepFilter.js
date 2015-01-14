var AbstractFilter = require("./AbstractFilter");

/**
 * This lowers the color depth of your image by the given amount, producing an image with a smaller palette.
 * 
 * @class ColorStepFilter
 * @extends AbstractFilter
 * @constructor
 */
ColorStepFilter = function(opts)
{
    opts || (opts = {});
    AbstractFilter.call( this,opts );

    //this.passes = [this];

    // set the uniforms
    this.uniforms = {
        step: {type: '1f', value: 5}
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D uSampler;',
        'uniform float step;',

        'void main(void) {',
        '   vec4 color = texture2D(uSampler, vTextureCoord);',
        '   color = floor(color * step) / step;',
        '   gl_FragColor = color;',
        '}'
    ];
};

ColorStepFilter.prototype = Object.create( AbstractFilter.prototype );
ColorStepFilter.prototype.constructor = ColorStepFilter;

/**
 * The number of steps to reduce the palette by.
 *
 * @property step
 * @type Number
 */
Object.defineProperty(ColorStepFilter.prototype, 'step', {
    get: function() {
        return this.uniforms.step.value;
    },
    set: function(value) {
        this.uniforms.step.value = value;
    }
});

ColorStepFilter.prototype.fromJSON = function (json) {

    this.step = json.step;

    return this;
};

ColorStepFilter.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "ColorStepFilter";
    json.step = this.step;

    return json;
};

module.exports = ColorStepFilter;