var Unlit = require("./normal/unlit");
var VertexLit = require("./normal/specular");
var Diffuse = require("./normal/diffuse");
var Specular = require("./normal/specular");
var NormalDiffuse = require("./normal/normal_diffuse");
var NormalSpecular = require("./normal/normal_specular");
var ParallaxDiffuse = require("./normal/parallax_diffuse");
var ParticleUnlit = require("./particle/unlit");
var ReflectiveVertexLit = require("./reflective/reflective_vertex_lit");
"use strict";


module.exports = {
    Unlit: Unlit,
    VertexLit: VertexLit,
    Diffuse: Diffuse,
    Specular: Specular,
    NormalDiffuse: NormalDiffuse,
    NormalSpecular: NormalSpecular,
    ParallaxDiffuse: ParallaxDiffuse,

    ParticleUnlit: ParticleUnlit,

    ReflectiveVertexLit: ReflectiveVertexLit
};
