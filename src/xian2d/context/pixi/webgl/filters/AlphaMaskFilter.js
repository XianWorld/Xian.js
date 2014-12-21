var AbstractFilter = require("./AbstractFilter");
var Assets = require("../../../../../assets/assets");

AlphaMaskFilter = function(opts)
{
    opts || (opts = {});

    AbstractFilter.call( this, opts );

    //this.passes = [this];

    var texture = opts.map;
    // set the uniforms
    this.uniforms = {
        mask: {type: 'sampler2D', value:texture},
        mapDimensions:   {type: '2f', value:{x:1, y:5112}},
        dimensions:   {type: '4fv', value:[0,0,0,0]}
    };

    if(texture) this.map = texture;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D mask;',
        'uniform sampler2D uSampler;',
        'uniform vec2 offset;',
        'uniform vec4 dimensions;',
        'uniform vec2 mapDimensions;',

        'void main(void) {',
        '   vec2 mapCords = vTextureCoord.xy;',
        '   mapCords += (dimensions.zw + offset)/ dimensions.xy ;',
        '   mapCords.y *= -1.0;',
        '   mapCords.y += 1.0;',
        '   mapCords *= dimensions.xy / mapDimensions;',

        '   vec4 original =  texture2D(uSampler, vTextureCoord);',
        '   float maskAlpha =  texture2D(mask, mapCords).r;',
        '   original *= maskAlpha;',
        //'   original.rgb *= maskAlpha;',
        '   gl_FragColor =  original;',
        //'   gl_FragColor = gl_FragColor;',
        '}'
    ];
};


AlphaMaskFilter.prototype = Object.create( AbstractFilter.prototype );
AlphaMaskFilter.prototype.constructor = AlphaMaskFilter;

/**
 * Sets the map dimensions uniforms when the texture becomes available.
 *
 * @method onTextureLoaded
 */
AlphaMaskFilter.prototype.onTextureLoaded = function()
{
    this.uniforms.mapDimensions.value.x = this.uniforms.mask.value.width;
    this.uniforms.mapDimensions.value.y = this.uniforms.mask.value.height;

    this.uniforms.mask.value.off('load', this.boundLoadedFunction);
};

/**
 * The texture used for the displacement map. Must be power of 2 sized texture.
 *
 * @property map
 * @type Texture
 */
Object.defineProperty(AlphaMaskFilter.prototype, 'map', {
    get: function() {
        return this.uniforms.mask.value;
    },
    set: function(value) {
        if(this.uniforms.mask.value === value) return;
        this.uniforms.mask.value = value;
        if(value){
            value._powerOf2 = true;

            if (value._loaded) {
                this.uniforms.mapDimensions.value.x = value.width;
                this.uniforms.mapDimensions.value.y = value.height;
            }
            else {
                this.boundLoadedFunction = this.onTextureLoaded.bind(this);

                value.on('load', this.boundLoadedFunction);
            }
        }
    }
});

AlphaMaskFilter.prototype.fromJSON = function (json) {

    this.map = json.map ? Assets.get(json.map) : undefined;

    return this;
};

AlphaMaskFilter.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "AlphaMaskFilter";
    json.map = this.map ? this.map.name : undefined;

    return json;
};

//AbstractFilter._classes.AlphaMaskFilter = AlphaMaskFilter;

module.exports = AlphaMaskFilter;