var Enum = require("../base/enum");
"use strict";


module.exports = {
    AxisType: new Enum("Button Mouse MouseWheel Touch Joystick"),

    Blending: new Enum("Default None Additive Subtractive Muliply Custom"),
    Side: new Enum("Front Back Both"),

    CullFace: new Enum("None Back Front FrontBack"),

    EmitterType: new Enum("Circle Box Sphere"),

    LightType: new Enum("Point Directional Spot Hemi"),

    TextClipping: new Enum("Overflow Clip"),
    TextAnchor: new Enum("Left Center Right"),

    ShadowMapType: new Enum("BasicShadowMap PCFShadowMap PCFSoftShadowMap"),

    FilterMode: new Enum("None Linear"),
    TextureFormat: new Enum("RGB RGBA Luminance Alpha LuminanceAlpha"),
    TextureWrap: new Enum("Repeat Clamp MirrorRepeat"),

    WrapMode: new Enum("Once Loop PingPong Clamp")
};
