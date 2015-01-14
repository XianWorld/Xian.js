var AbstractFilter = require("./AbstractFilter");

/**
 * This filter applies a twist effect making display objects appear twisted in the given direction.
 * 
 * @class TwistFilter
 * @extends AbstractFilter
 * @constructor
 */
function TwistFilter(opts)
{
    opts || (opts = {});

    AbstractFilter.call( this,opts );

    //this.passes = [this];

    // set the uniforms
    this.uniforms = {
        radius: {type: '1f', value:0.5},
        angle: {type: '1f', value:5},
        offset: {type: '2f', value:{x:0.5, y:0.5}}
    };
    if(opts.radius) this.radius = opts.radius;
    if(opts.angle) this.angle = opts.angle;
    if(opts.offset) this.offset = opts.offset;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform vec4 dimensions;',
        'uniform sampler2D uSampler;',

        'uniform float radius;',
        'uniform float angle;',
        'uniform vec2 offset;',

        'void main(void) {',
        '   vec2 coord = vTextureCoord - offset;',
        '   float distance = length(coord);',

        '   if (distance < radius) {',
        '       float ratio = (radius - distance) / radius;',
        '       float angleMod = ratio * ratio * angle;',
        '       float s = sin(angleMod);',
        '       float c = cos(angleMod);',
        '       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);',
        '   }',

        '   gl_FragColor = texture2D(uSampler, coord+offset);',
        '}'
    ];
};

TwistFilter.prototype = Object.create( AbstractFilter.prototype );
TwistFilter.prototype.constructor = TwistFilter;

/**
 * This point describes the the offset of the twist.
 * 
 * @property offset
 * @type Point
 */
Object.defineProperty(TwistFilter.prototype, 'offset', {
    get: function() {
        return this.uniforms.offset.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.offset.value = value;
    }
});

/**
 * This radius of the twist.
 * 
 * @property radius
 * @type Number
 */
Object.defineProperty(TwistFilter.prototype, 'radius', {
    get: function() {
        return this.uniforms.radius.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.radius.value = value;
    }
});

/**
 * This angle of the twist.
 * 
 * @property angle
 * @type Number
 */
Object.defineProperty(TwistFilter.prototype, 'angle', {
    get: function() {
        return this.uniforms.angle.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.angle.value = value;
    }
});
TwistFilter.prototype.fromJSON = function (json) {

    this.offset = json.offset;
    this.radius = json.radius;
    this.angle = json.angle;

    return this;
};

TwistFilter.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "TwistFilter";
    json.offset = this.offset;
    json.radius = this.radius;
    json.angle = this.angle;

    return json;
};

module.exports = TwistFilter;