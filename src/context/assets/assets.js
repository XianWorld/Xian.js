var Class = require("../../base/class");
var EventEmitter = require('../../base/event_emitter');
var Config = require("../../base/config");
//var ObjectPool = require("../../base/object_pool");
var Asset = require("./asset");
var Log = require("../log/log");
var AssetLoaderLib = require("./asset_loader_lib");
"use strict";

function Assets() {

    EventEmitter.call(this);

    this.assetHash = {};

    this.assets = [[],[],[],[],[]];
    this._noneAssets = this.assets[Asset.AssetState.NONE];
    this._loadingAssets = this.assets[Asset.AssetState.LOADING];
    this._loadedAssets = this.assets[Asset.AssetState.LOADED];
    this._initedAssets = this.assets[Asset.AssetState.INITED];
    this._errorLoadAssets = this.assets[Asset.AssetState.ERROR_LOAD];
    this._errorInitAssets = this.assets[Asset.AssetState.ERROR_INIT];

    //this.unusedAssets = [];

    this._rootUrl = "";

    //TODO make LoaderManager to manage loaders, update loaders, load asset by strategies(concurrent/frame idle time)
    //TODO let loader send asset event in frame update.
}
EventEmitter.extend(Assets);

Assets.prototype.init = function () {
    //TODO init properties and strategies from Config
};
Assets.prototype.update = function () {
    //TODO use some strategies to manage the asset caches
};
Assets.prototype.clear = function () {
    var key, asset;
    var assetHash = this.assetHash;
    for (key in assetHash) {
        if (asset = assetHash[key]){
            this.unload(asset);
        }
    }
    this._noneAssets.length = 0;
    this._loadingAssets.length = 0;
    this._loadedAssets.length = 0;
    this._initedAssets.length = 0;
    this._errorLoadAssets.length = 0;
    this._errorInitAssets.length = 0;

    this._rootUrl = "";

    //TODO should stop the running loaders
};

Assets.prototype.get = function (name) {
    return this.assetHash[name];
};
Assets.prototype.load = function (name, assetType, fileType) {
    var asset = this.assetHash[name];
    if (asset) {
        //asset._ref_asset++;
        return asset;
    }

    asset = Class.create(assetType);
    //TODO temporarily use a simple policy, if name start with "http" then use it as src, if not add root url.
    asset.name = name;
    if(name.slice(0, 4).toLowerCase() === 'http')
        asset.src = name;
    else
        asset.src = this._rootUrl + name;
    if(!fileType)
        fileType = name.split('?').shift().split('.').pop().toLowerCase();
    asset.fileType = fileType;
    //asset._ref_asset++;
    asset.assets = this;
    this.assetHash[name] = asset;

    this._noneAssets.push(asset);
    this._load();
    return asset;
};

Assets.prototype.unload = function (name) {
    var asset = this.assetHash[name];
    if(!asset) return;

    //asset._ref_asset --;
    //if(asset._ref_asset <= 0){
        var state = asset.state;
        var index = this.assets[state].indexOf(asset);
        if(index !== -1)
            this.assets[state].splice(index, 1);

        asset.destroy();
        delete this.assetHash[name];
    //}
};

Assets.prototype.unloadAsset = function (asset) {
    this.unload(asset.name);
};

Assets.prototype.loadAll = function (assetInfos, preload) {
    var asset,info,i,len = assetInfos.length;

    for(i=0;i<len;i++){
        info = assetInfos[i];
        asset = this.load(info.name, info.type, info.fileType);

        if(preload){
            if(asset.ready){
                this._onAssetInited(asset);
            }
            else{
                asset.on("inited", this._onAssetInited.bind(this));
                this._preloadingAssets.push(asset);
            }
        }
    }

    if(preload){
        this._preloadCount = len;
        //event: progress, total, left
        //var left = this._preloadingAssets.length;
        //if(left === 0)
        //    this.emit("complete", this._preloadCount);
        //else
        //    this.emit("progress", this._preloadCount, left);
        this._notifyPreload();
    }
};

Assets.prototype._load = function () {
    if(this._loadingAssets.length >=2) return;

    if(this._noneAssets.length == 0) return;

    var asset = this._noneAssets.shift();
    var loader = AssetLoaderLib.getLoaderForAsset(asset);//this._getLoader(asset);
    if(!loader){
        Log.error("Assets._load: no loader for "+asset.src);
        this._errorLoadAssets.push(asset);
        asset.state = Asset.AssetState.ERROR_LOAD;
        asset.emit("errorLoad", asset);
        this.emit("errorLoad", asset);
        return;
    }
    this._loadingAssets.push(asset);
    asset.state = Asset.AssetState.LOADING;
    loader.assets = this;
    loader.on("loaded", this._onAssetLoaded.bind(this));
    loader.on("errorLoad", this._onAssetErrorLoad.bind(this));
    loader.load(asset);
};
Assets.prototype._onAssetLoaded = function (loader, asset) {
    var index = this._loadingAssets.indexOf(asset);
    if(index === -1) return;

    this._loadingAssets.splice(index, 1);
    asset.state = Asset.AssetState.LOADED;
    asset.emit("loaded", asset);
    this.emit("loaded", asset);
    this._loadedAssets.push(asset);
    loader.on("inited", this._onAssetInited.bind(this));
    loader.on("errorInit", this._onAssetErrorInit.bind(this));
    loader.init(asset);

    this._load();
};
Assets.prototype._onAssetErrorLoad = function (loader, asset, error) {
    var index = this._loadingAssets.indexOf(asset);
    if(index === -1) return;

    if(error) Log.error(error);
    this._loadingAssets.splice(index, 1);
    //error strategy, temporarily add to error list
    this._errorLoadAssets.push(asset);
    asset.state = Asset.AssetState.ERROR_LOAD;
    asset.emit("errorLoad", asset);
    this.emit("errorLoad", asset);

    loader.destroy();
    this._load();
};

Assets.prototype._onAssetInited = function (loader, asset) {
    var index = this._loadedAssets.indexOf(asset);
    if(index === -1) return;

    this._loadedAssets.splice(index, 1);
    asset.state = Asset.AssetState.INITED;
    asset.emit("inited", asset);
    this.emit("inited", asset);
    this._initedAssets.push(asset);

    loader.destroy();
};

Assets.prototype._onAssetErrorInit = function (loader, asset) {
    var index = this._loadedAssets.indexOf(asset);
    if(index === -1) return;

    this._loadedAssets.splice(index, 1);
    //error strategy, temporarily add to error list
    this._errorInitAssets.push(asset);
    asset.state = Asset.AssetState.ERROR_INIT;
    asset.emit("errorInit", asset);
    this.emit("errorInit", asset);

    loader.destroy();
};

//Assets.prototype.get = function (name) {
//    var asset = this.hash[name];
//    if (asset) return asset;
//
//    Log.error("Assets.get: can't find asset with name " + name + ", it has not been added to Assets, use Assets.addAsset(asset)");
//    return undefined;
//};
//
//Assets.prototype.addAsset = function (asset) {
//    if (!(asset instanceof Asset)) {
//        Log.error("Assets.addAsset: can't add passed argument, it is not an instance of Asset");
//        return this;
//    }
//    var name = asset.src;
//
//    if (this.hash[name]) {
//        Log.error("Assets.addAsset: Assets already have Asset named " + asset.name);
//        return undefined;
//    }
//
//    //asset.assets = this;
//    //this.push(asset);
//    this.hash[name] = asset;
//
//    return asset;
//};
//
//
//Assets.prototype.addAssets = function () {
//    var i, il;
//
//    for (i = 0, il = arguments.length; i < il; i++) this.addAsset(arguments[i]);
//};
//
//
//Assets.prototype.removeAsset = function (asset) {
//    var name = typeof(asset) === "string" ? asset : asset.name;
//    asset = this.hash[name];
//
//    if (!asset) {
//        Log.error("Assets.removeAsset: Assets does not have an Asset named " + name);
//        return undefined;
//    }
//
//    this.splice(this.indexOf(asset), 1);
//    this.hash[name] = null;
//
//    return asset;
//};
//
//
//Assets.prototype.removeAssets = function () {
//    var i, il;
//
//    for (i = 0, il = arguments.length; i < il; i++) this.removeAsset(arguments[i]);
//};
//
//
//Assets.prototype.toJSON = function (json, pack) {
//    json || (json = {});
//    var jsonAssets = json.assets || (json.assets = []),
//        jsonAsset,
//        i = this.length;
//
//    while (i--) {
//        if ((jsonAsset = this[i]).json) jsonAssets[i] = jsonAsset.toJSON(jsonAssets[i], pack);
//    }
//
//    return json;
//};
//
//
//Assets.prototype.fromJSON = function (json) {
//    var assetsHash = this.hash,
//        jsonAssets = json.assets || (json.assets = []),
//        asset, jsonAsset,
//        i = jsonAssets.length;
//
//    while (i--) {
//        if (!(jsonAsset = jsonAssets[i])) continue;
//
//        if ((asset = assetsHash[jsonAsset.name])) {
//            asset.fromJSON(jsonAsset);
//        } else {
//            this.add(Class.fromJSON(jsonAsset));
//        }
//    }
//
//    return this;
//};


module.exports = new Assets;
