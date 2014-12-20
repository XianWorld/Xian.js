var AbstractFilter = require("./AbstractFilter");

/**
 * This inverts your Display Objects colors.
 * 
 * @class InvertFilter
 * @extends AbstractFilter
 * @constructor
 */
function InvertFilter(opts)
{
    opts || (opts = {});

    AbstractFilter.call( this,opts );

    //this.passes = [this];

    // set the uniforms
    this.uniforms = {
        invert: {type: '1f', value: 1}
    };

    if(opts.invert) this.invert = opts.invert;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform float invert;',
        'uniform sampler2D uSampler;',

        'void main(void) {',
        '   gl_FragColor = texture2D(uSampler, vTextureCoord);',
        '   gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);',
        //'   gl_FragColor.rgb = gl_FragColor.rgb  * gl_FragColor.a;',
      //  '   gl_FragColor = gl_FragColor * vColor;',
        '}'
    ];
};

InvertFilter.prototype = Object.create( AbstractFilter.prototype );
InvertFilter.prototype.constructor = InvertFilter;

/**
 * The strength of the invert. 1 will fully invert the colors, 0 will make the object its normal color
 * @property invert
 * @type Number
*/
Object.defineProperty(InvertFilter.prototype, 'invert', {
    get: function() {
        return this.uniforms.invert.value;
    },
    set: function(value) {
        this.uniforms.invert.value = value;
    }
});
InvertFilter.prototype.fromJSON = function (json) {

    this.invert = json.invert;

    return this;
};

InvertFilter.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "InvertFilter";
    json.invert = this.invert;

    return json;
};


module.exports = InvertFilter;