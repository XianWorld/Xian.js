var AbstractFilter = require("./AbstractFilter");

/**
 * A Cross Hatch effect filter.
 * 
 * @class CrossHatchFilter
 * @extends AbstractFilter
 * @constructor
 */
function CrossHatchFilter(opts)
{
    opts || (opts = {});

    AbstractFilter.call( this,opts );

    //this.passes = [this];

    // set the uniforms
    this.uniforms = {
        blur: {type: '1f', value: 1 / 512}
    };

    if(opts.blur) this.blur = opts.blur;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform float blur;',
        'uniform sampler2D uSampler;',

        'void main(void) {',
        '    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);',

        '    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);',

        '    if (lum < 1.00) {',
        '        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {',
        '            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
        '        }',
        '    }',

        '    if (lum < 0.75) {',
        '        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) {',
        '            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
        '        }',
        '    }',

        '    if (lum < 0.50) {',
        '        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) {',
        '            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
        '        }',
        '    }',

        '    if (lum < 0.3) {',
        '        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) {',
        '            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
        '        }',
        '    }',
        '}'
    ];
};

CrossHatchFilter.prototype = Object.create( AbstractFilter.prototype );
CrossHatchFilter.prototype.constructor = CrossHatchFilter;

/**
 * Sets the strength of both the blur.
 *
 * @property blur
 * @type Number the strength of the blur
 * @default 2
 */
Object.defineProperty(CrossHatchFilter.prototype, 'blur', {
    get: function() {
        return this.uniforms.blur.value / (1/7000);
    },
    set: function(value) {
        //this.padding = value;
        this.uniforms.blur.value = (1/7000) * value;
    }
});
CrossHatchFilter.prototype.fromJSON = function (json) {

    this.blur = json.blur;

    return this;
};

CrossHatchFilter.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "CrossHatchFilter";
    json.blur = this.blur;

    return json;
};


module.exports = CrossHatchFilter;