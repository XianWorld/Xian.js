var AbstractFilter = require("./AbstractFilter");

/**
 * This filter applies a dotscreen effect making display objects appear to be made out of black and white halftone dots like an old printer.
 * 
 * @class DotScreenFilter
 * @extends AbstractFilter
 * @constructor
 */
function DotScreenFilter(opts)
{
    opts || (opts = {});

    AbstractFilter.call( this, opts );

    //this.passes = [this];

    // set the uniforms
    this.uniforms = {
        scale: {type: '1f', value:1},
        angle: {type: '1f', value:5},
        dimensions:   {type: '4fv', value:[0,0,0,0]}
    };
    if(opts.angle) this.angle = opts.angle;
    if(opts.scale) this.scale = opts.scale;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform vec4 dimensions;',
        'uniform sampler2D uSampler;',

        'uniform float angle;',
        'uniform float scale;',

        'float pattern() {',
        '   float s = sin(angle), c = cos(angle);',
        '   vec2 tex = vTextureCoord * dimensions.xy;',
        '   vec2 point = vec2(',
        '       c * tex.x - s * tex.y,',
        '       s * tex.x + c * tex.y',
        '   ) * scale;',
        '   return (sin(point.x) * sin(point.y)) * 4.0;',
        '}',

        'void main() {',
        '   vec4 color = texture2D(uSampler, vTextureCoord);',
        '   float average = (color.r + color.g + color.b) / 3.0;',
        '   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);',
        '}'
    ];
};

DotScreenFilter.prototype = Object.create( AbstractFilter.prototype );
DotScreenFilter.prototype.constructor = DotScreenFilter;

/**
 * The scale of the effect.
 * @property scale
 * @type Number
 */
Object.defineProperty(DotScreenFilter.prototype, 'scale', {
    get: function() {
        return this.uniforms.scale.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.scale.value = value;
    }
});

/**
 * The radius of the effect.
 * @property angle
 * @type Number
 */
Object.defineProperty(DotScreenFilter.prototype, 'angle', {
    get: function() {
        return this.uniforms.angle.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.angle.value = value;
    }
});
DotScreenFilter.prototype.fromJSON = function (json) {

    this.angle = json.angle;
    this.scale = json.scale;

    return this;
};

DotScreenFilter.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "DotScreenFilter";
    json.angle = this.angle;
    json.scale = this.scale;

    return json;
};


module.exports = DotScreenFilter;