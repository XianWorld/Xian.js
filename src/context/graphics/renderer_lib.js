//var ObjectPools = require("../pool/object_pools");
"use strict";

var RendererLib = {};

RendererLib.classHash = {

};

RendererLib.register = function (rendererClass) {
    RendererLib.classHash[rendererClass.name] = rendererClass;
};

RendererLib.getClass = function (name) {
    return RendererLib.classHash[name];
};

module.exports = RendererLib;