var AbstractFilter = require("./AbstractFilter");

/**
 * An RGB Split Filter.
 * 
 * @class RGBSplitFilter
 * @extends AbstractFilter
 * @constructor
 */
function RGBSplitFilter(opts)
{
    opts || (opts = {});

    AbstractFilter.call( this,opts );

    //this.passes = [this];

    // set the uniforms
    this.uniforms = {
        red: {type: '2f', value: {x:20, y:20}},
        green: {type: '2f', value: {x:-20, y:20}},
        blue: {type: '2f', value: {x:20, y:-20}},
        dimensions:   {type: '4fv', value:[0,0,0,0]}
    };
    if(opts.red) this.red = opts.red;
    if(opts.green) this.green = opts.green;
    if(opts.blue) this.blue = opts.blue;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform vec2 red;',
        'uniform vec2 green;',
        'uniform vec2 blue;',
        'uniform vec4 dimensions;',
        'uniform sampler2D uSampler;',

        'void main(void) {',
        '   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;',
        '   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;',
        '   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;',
        '   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;',
        '}'
    ];
};

RGBSplitFilter.prototype = Object.create( AbstractFilter.prototype );
RGBSplitFilter.prototype.constructor = RGBSplitFilter;

/**
 * Red channel offset.
 * 
 * @property red
 * @type Point
 */
Object.defineProperty(RGBSplitFilter.prototype, 'red', {
    get: function() {
        return this.uniforms.red.value;
    },
    set: function(value) {
        this.uniforms.red.value = value;
    }
});

/**
 * Green channel offset.
 * 
 * @property green
 * @type Point
 */
Object.defineProperty(RGBSplitFilter.prototype, 'green', {
    get: function() {
        return this.uniforms.green.value;
    },
    set: function(value) {
        this.uniforms.green.value = value;
    }
});

/**
 * Blue offset.
 * 
 * @property blue
 * @type Point
 */
Object.defineProperty(RGBSplitFilter.prototype, 'blue', {
    get: function() {
        return this.uniforms.blue.value;
    },
    set: function(value) {
        this.uniforms.blue.value = value;
    }
});
RGBSplitFilter.prototype.fromJSON = function (json) {

    this.red = json.red;
    this.green = json.green;
    this.blue = json.blue;

    return this;
};

RGBSplitFilter.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "RGBSplitFilter";
    json.red = this.red;
    json.green = this.green;
    json.blue = this.blue;

    return json;
};


module.exports = RGBSplitFilter;