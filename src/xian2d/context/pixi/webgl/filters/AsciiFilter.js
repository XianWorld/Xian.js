var AbstractFilter = require("./AbstractFilter");

AsciiFilter = function(opts)
{
    opts || (opts = {});

    AbstractFilter.call(this, opts);

    //this.passes = [this];

    // set the uniforms
    this.uniforms = {
        dimensions: {type: '4fv', value:new Float32Array([10000, 100, 10, 10])},
        pixelSize: {type: '1f', value:8}
    };

    if(opts.size) this.size = opts.size;

    this.fragmentSrc = [
        
        'precision mediump float;',
        'uniform vec4 dimensions;',
        'uniform float pixelSize;',
        'uniform sampler2D uSampler;',

        'float character(float n, vec2 p)',
        '{',
        '    p = floor(p*vec2(4.0, -4.0) + 2.5);',
        '    if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y)',
        '    {',
        '        if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;',
        '    }',
        '    return 0.0;',
        '}',

        'void main()',
        '{',
        '    vec2 uv = gl_FragCoord.xy;',
        '    vec3 col = texture2D(uSampler, floor( uv / pixelSize ) * pixelSize / dimensions.xy).rgb;',
            
        '    #ifdef HAS_GREENSCREEN',
        '    float gray = (col.r + col.b)/2.0;', 
        '    #else',
        '    float gray = (col.r + col.g + col.b)/3.0;',
        '    #endif',
  
        '    float n =  65536.0;             // .',
        '    if (gray > 0.2) n = 65600.0;    // :',
        '    if (gray > 0.3) n = 332772.0;   // *',
        '    if (gray > 0.4) n = 15255086.0; // o',
        '    if (gray > 0.5) n = 23385164.0; // &',
        '    if (gray > 0.6) n = 15252014.0; // 8',
        '    if (gray > 0.7) n = 13199452.0; // @',
        '    if (gray > 0.8) n = 11512810.0; // #',
            
        '    vec2 p = mod( uv / ( pixelSize * 0.5 ), 2.0) - vec2(1.0);',
        '    col = col * character(n, p);',
            
        '    gl_FragColor = vec4(col, 1.0);',
        '}'
    ];
};

AsciiFilter.prototype = Object.create( AbstractFilter.prototype );
AsciiFilter.prototype.constructor = AsciiFilter;

Object.defineProperty(AsciiFilter.prototype, 'size', {
    get: function() {
        return this.uniforms.pixelSize.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.pixelSize.value = value;
    }
});

AsciiFilter.prototype.fromJSON = function (json) {

    this.size = json.size;

    return this;
};

AsciiFilter.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "AsciiFilter";
    json.size = this.size;

    return json;
};

//AbstractFilter._classes.AsciiFilter = AsciiFilter;

module.exports = AsciiFilter;