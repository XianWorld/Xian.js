var AbstractFilter = require("./AbstractFilter");

/**
 * This filter applies a pixelate effect making display objects appear 'blocky'.
 * 
 * @class PixelateFilter
 * @extends AbstractFilter
 * @constructor
 */
function PixelateFilter(opts)
{
    opts || (opts = {});

    AbstractFilter.call( this,opts );

    //this.passes = [this];

    // set the uniforms
    this.uniforms = {
        invert: {type: '1f', value: 0},
        dimensions: {type: '4fv', value:new Float32Array([10000, 100, 10, 10])},
        pixelSize: {type: '2f', value:{x:10, y:10}}
    };
    if(opts.size) this.size = opts.size;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform vec2 testDim;',
        'uniform vec4 dimensions;',
        'uniform vec2 pixelSize;',
        'uniform sampler2D uSampler;',

        'void main(void) {',
        '   vec2 coord = vTextureCoord;',

        '   vec2 size = dimensions.xy/pixelSize;',

        '   vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;',
        '   gl_FragColor = texture2D(uSampler, color);',
        '}'
    ];
};

PixelateFilter.prototype = Object.create( AbstractFilter.prototype );
PixelateFilter.prototype.constructor = PixelateFilter;

/**
 * This a point that describes the size of the blocks. x is the width of the block and y is the height.
 * 
 * @property size
 * @type Point
 */
Object.defineProperty(PixelateFilter.prototype, 'size', {
    get: function() {
        return this.uniforms.pixelSize.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.pixelSize.value = value;
    }
});
PixelateFilter.prototype.fromJSON = function (json) {

    this.size = json.size;

    return this;
};

PixelateFilter.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "PixelateFilter";
    json.size = this.size;

    return json;
};


module.exports = PixelateFilter;