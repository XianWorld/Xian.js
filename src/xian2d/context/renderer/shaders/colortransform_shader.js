/**
 * Created by Dianyan on 2014/12/12.
 */
var XianShader = require("./xian_shader");

function ColorTransformShader(gl) {
    XianShader.call(this, gl);
    this.fragmentSrc = "precision mediump float;\n" + "varying vec2 vTextureCoord;\n" + "varying vec4 vColor;\n" + "uniform float invert;\n" + "uniform mat4 matrix;\n" + "uniform vec4 colorAdd;\n" + "uniform sampler2D uSampler;\n" + "void main(void) {\n" + "vec4 locColor = texture2D(uSampler, vTextureCoord) * matrix;\n" + "if(locColor.a != 0.0){\n" + "locColor += colorAdd;\n" + "}\n" + "gl_FragColor = locColor;\n" + "}";
    this.uniforms = {
        matrix: { type: 'mat4', value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
        colorAdd: { type: '4f', value: { x: 0, y: 0, z: 0, w: 0 } }
    };
    this.init();
}
XianShader.extend(ColorTransformShader);

module.exports = ColorTransformShader;