var Enum = require("../base/enum");
"use strict";


module.exports = {
    AxisType: new Enum("Button Mouse MouseWheel Touch Joystick"),

    blendModes: {
        NORMAL:0,
        ADD:1,
        MULTIPLY:2,
        SCREEN:3,
        OVERLAY:4,
        DARKEN:5,
        LIGHTEN:6,
        COLOR_DODGE:7,
        COLOR_BURN:8,
        HARD_LIGHT:9,
        SOFT_LIGHT:10,
        DIFFERENCE:11,
        EXCLUSION:12,
        HUE:13,
        SATURATION:14,
        COLOR:15,
        LUMINOSITY:16
    },

    //Blending: new Enum("Default None Additive Subtractive Muliply Custom"),
    Side: new Enum("Front Back Both"),

    CullFace: new Enum("None Back Front FrontBack"),

    EmitterType: new Enum("Circle Box Sphere"),

    LightType: new Enum("Point Directional Spot Hemi"),

    TextClipping: new Enum("Overflow Clip"),
    TextAnchor: new Enum("Left Center Right"),

    ShadowMapType: new Enum("BasicShadowMap PCFShadowMap PCFSoftShadowMap"),

    filterMode: {
        DEFAULT: 0,
        LINEAR: 0,
        NEAREST: 1
    },
    //FilterMode: new Enum("None Linear"),
    TextureFormat: new Enum("RGB RGBA Luminance Alpha LuminanceAlpha"),
    TextureWrap: new Enum("Repeat Clamp MirrorRepeat"),

    WrapMode: new Enum("Once Loop PingPong Clamp")
};
