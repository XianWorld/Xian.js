/**
 * Created by Dianyan on 2014/12/18.
 */

var ShaderLib = {};

ShaderLib.fromJSON = function (json) {

    return new ShaderLib._classes[json._className]().fromJSON(json);
};

ShaderLib.create = function (type) {

    return new ShaderLib._classes[type];
};


ShaderLib._classes = {
    AlphaMaskFilter: require("./AlphaMaskFilter"),
    AsciiFilter: require("./AsciiFilter"),
    BlurFilter: require("./BlurFilter"),
    BlurXFilter: require("./BlurXFilter"),
    BlurYFilter: require("./BlurYFilter"),
    ColorMatrixFilter: require("./ColorMatrixFilter"),
    ColorStepFilter: require("./ColorStepFilter"),
    ConvolutionFilter: require("./ConvolutionFilter"),
    CrossHatchFilter: require("./CrossHatchFilter"),
    DisplacementFilter: require("./DisplacementFilter"),
    DotScreenFilter: require("./DotScreenFilter"),
    GrayFilter: require("./GrayFilter"),
    InvertFilter: require("./InvertFilter"),
    NoiseFilter: require("./NoiseFilter"),
    NormalMapFilter: require("./NormalMapFilter"),
    PixelateFilter: require("./PixelateFilter"),
    RGBSplitFilter: require("./RGBSplitFilter"),
    SepiaFilter: require("./SepiaFilter"),
    SmartBlurFilter: require("./SmartBlurFilter"),
    TiltShiftXFilter: require("./TiltShiftXFilter"),
    TiltShiftYFilter: require("./TiltShiftYFilter"),
    TiltShiftFilter: require("./TiltShiftFilter"),
    TwistFilter: require("./TwistFilter"),

};

module.exports = ShaderLib;