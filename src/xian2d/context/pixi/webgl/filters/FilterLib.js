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

};

module.exports = ShaderLib;