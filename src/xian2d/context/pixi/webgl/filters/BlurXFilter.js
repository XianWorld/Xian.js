var AbstractFilter = require("./AbstractFilter");

BlurXFilter = function(opts)
{
    opts || (opts = {});

    AbstractFilter.call( this, opts );

    //this.passes = [this];

    // set the uniforms
    this.uniforms = {
        blur: {type: '1f', value: 1/512}
    };

    if (opts.blur) this.blur = opts.blur;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform float blur;',
        'uniform sampler2D uSampler;',

        'void main(void) {',
        '   vec4 sum = vec4(0.0);',

        '   sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;',

        '   gl_FragColor = sum;',
        '}'
    ];
};

BlurXFilter.prototype = Object.create( AbstractFilter.prototype );
BlurXFilter.prototype.constructor = BlurXFilter;

Object.defineProperty(BlurXFilter.prototype, 'blur', {
    get: function() {
        return this.uniforms.blur.value / (1/7000);
    },
    set: function(value) {

        this.dirty = true;
        this.uniforms.blur.value = (1/7000) * value;
    }
});
BlurXFilter.prototype.fromJSON = function (json) {

    this.blur = json.blur;

    return this;
};

BlurXFilter.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "BlurXFilter";
    json.blur = this.blur;

    return json;
};

//AbstractFilter._classes.BlurXFilter = BlurXFilter;

module.exports = BlurXFilter;