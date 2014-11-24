var Shader = require("../shader");
"use strict";


function Unlit() {

    Shader.call(this, {
        name: "shader_unlit",
        load: false,

        vertex: [
            "varying vec2 vUv;",

            "void main() {",
            "	vUv = uv;",
            "	gl_Position = projectionMatrix * mvPosition;",
            "}"
        ].join("\n"),

        fragment: [
            "uniform vec3 diffuseColor;",
            "uniform sampler2D diffuseMap;",

            "varying vec2 vUv;",

            "void main() {",
            "	vec4 finalColor = texture2D(diffuseMap, vUv);",
            "	finalColor.xyz *= diffuseColor;",

            "	gl_FragColor = finalColor;",
            "}"
        ].join("\n")
    });
}

Shader.extend(Unlit);


module.exports = Unlit;
