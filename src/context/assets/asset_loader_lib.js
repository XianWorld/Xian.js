var ObjectPools = require("../pool/object_pools");
var ImageLoader = require("./image_loader");
var JsonDataLoader = require("./json_data_loader");
var ModuleLoader = require("./module_loader");
"use strict";

var AssetLoaderLib = {};

AssetLoaderLib.loaderClassHash = {
    'Texture': {
        'jpg':  ImageLoader,
        'jpeg': ImageLoader,
        'png':  ImageLoader,
        'gif':  ImageLoader,
        'webp': ImageLoader,
    },
    'JsonData': {
        'json':  JsonDataLoader
    },
    'Prefab': {
        'json':  JsonDataLoader
    },
    'Module': {
        'js':  ModuleLoader
    },
    //'BitmapFont': {
    //    'fnt':  BitmapFontLoader
    //},
    //'SpriteSheet': {
    //    'json': JsonLoader,
    //}
};

AssetLoaderLib.registerLoader = function (fileType, assetType, loaderClass) {
    if(!fileType || !assetType || !loaderClass) return;
    var loaderHash = AssetLoaderLib.loaderClassHash[assetType];
    if(!loaderHash){
        loaderHash = AssetLoaderLib.loaderClassHash[assetType] = {};
    }
    loaderHash[fileType] = loaderClass;
};

AssetLoaderLib.getLoader = function (assetType, fileType) {
    var types = AssetLoaderLib.loaderClassHash[assetType];
    if(!types) return undefined;

    var loaderClass = types[fileType];
    if(!loaderClass) return undefined;

    var pool = ObjectPools.getPool(loaderClass);
    return pool.create();
};

AssetLoaderLib.getLoaderForAsset = function (asset) {
    return AssetLoaderLib.getLoader(asset._className, asset.fileType);
};

module.exports = AssetLoaderLib;