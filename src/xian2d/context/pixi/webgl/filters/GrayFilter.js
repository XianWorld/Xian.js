var AbstractFilter = require("./AbstractFilter");

/**
 * This greyscales the palette of your Display Objects.
 * 
 * @class GrayFilter
 * @extends AbstractFilter
 * @constructor
 */
function GrayFilter(opts)
{
    opts || (opts = {});

    AbstractFilter.call( this, opts );

    //this.passes = [this];

    // set the uniforms
    this.uniforms = {
        gray: {type: '1f', value: 1}
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D uSampler;',
        'uniform float gray;',

        'void main(void) {',
        '   gl_FragColor = texture2D(uSampler, vTextureCoord);',
        '   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);',
     //   '   gl_FragColor = gl_FragColor;',
        '}'
    ];
};

GrayFilter.prototype = Object.create( AbstractFilter.prototype );
GrayFilter.prototype.constructor = GrayFilter;

/**
 * The strength of the gray. 1 will make the object black and white, 0 will make the object its normal color.
 * @property gray
 * @type Number
 */
Object.defineProperty(GrayFilter.prototype, 'gray', {
    get: function() {
        return this.uniforms.gray.value;
    },
    set: function(value) {
        this.uniforms.gray.value = value;
    }
});
GrayFilter.prototype.fromJSON = function (json) {

    this.gray = json.gray;

    return this;
};

GrayFilter.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "GrayFilter";
    json.gray = this.gray;

    return json;
};


module.exports = GrayFilter;