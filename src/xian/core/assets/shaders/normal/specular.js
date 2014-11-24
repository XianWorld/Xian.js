var Shader = require("../shader");
"use strict";


function Specular() {

    Shader.call(this, {
        name: "shader_specular",
        load: false,

        lights: true,

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

            "uniform float shininess;",

            "varying vec2 vUv;",

            "void main() {",
            "	vec4 finalColor = texture2D(diffuseMap, vUv);",
            "	finalColor.xyz *= diffuseColor;",

            "	vec3 diffuseLight, specularLight;",
            "	PixelLight(normalize(vNormal), vec3(finalColor.w), finalColor.w, shininess, diffuseLight, specularLight);",

            "	gl_FragColor = vec4(diffuseLight * finalColor.xyz + specularLight * finalColor.xyz, 1.0);",
            "}"
        ].join("\n")
    });
}

Shader.extend(Specular);


module.exports = Specular;
