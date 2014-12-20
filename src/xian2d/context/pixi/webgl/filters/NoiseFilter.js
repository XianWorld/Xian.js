var AbstractFilter = require("./AbstractFilter");

/**
 * A Noise effect filter.
 * 
 * @class NoiseFilter
 * @extends AbstractFilter
 * @constructor
 */
function NoiseFilter(opts)
{
    opts || (opts = {});

    AbstractFilter.call( this,opts );

    //this.passes = [this];

    // set the uniforms
    this.uniforms = {
        noise: {type: '1f', value: 0.5}
    };
    if(opts.noise) this.noise = opts.noise;

    this.fragmentSrc = [
        'precision mediump float;',
        'uniform sampler2D uSampler;',
        'uniform float noise;',
        'varying vec2 vTextureCoord;',

        'float rand(vec2 co) {',
        '    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);',
        '}',
        'void main() {',
        '    vec4 color = texture2D(uSampler, vTextureCoord);',
            
        '    float diff = (rand(vTextureCoord) - 0.5) * noise;',
        '    color.r += diff;',
        '    color.g += diff;',
        '    color.b += diff;',
            
        '    gl_FragColor = color;',
        '}'
    ];
};

NoiseFilter.prototype = Object.create( AbstractFilter.prototype );
NoiseFilter.prototype.constructor = NoiseFilter;

/**
 * The amount of noise to apply.
 * @property noise
 * @type Number
*/
Object.defineProperty(NoiseFilter.prototype, 'noise', {
    get: function() {
        return this.uniforms.noise.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.noise.value = value;
    }
});
NoiseFilter.prototype.fromJSON = function (json) {

    this.noise = json.noise;

    return this;
};

NoiseFilter.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "NoiseFilter";
    json.noise = this.noise;

    return json;
};


module.exports = NoiseFilter;