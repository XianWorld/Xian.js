/**
 * Created by Dianyan on 2014/12/31.
 */
//var Component = require("./../core/component");
var Behaviour = require("../behaviour");
var MainContext = require("../../context/main_context");
var Assets = MainContext.Assets;
var Time = MainContext.Time;
"use strict";

//TODO AssetAgent now have two function: manage agent(asset holder) and preload agent
function AssetAgent(opts) {
    //opts || (opts = {});
    Behaviour.call(this, opts);

    //{name, type, fileType}
    this.preloads = [];//opts.preloads;

    this._assetHash = {};
    this._assetMetaHash = {};

    //event: progress, complete
    this._preloadingAssets = [];
    this._preloadCount = 0;

    //indicate that the last preload procession is finished for those late checkers
    this.preloaded = false;
}

Behaviour.extend(AssetAgent);

AssetAgent.prototype.copy = function (other) {

    return this;
};

AssetAgent.prototype.clear = function () {

    this.preloads = undefined;
    this._assetHash = {};
    this._assetMetaHash = {};

    //event: progress, complete
    this._preloadingAssets.length = 0;
    this._preloadCount = 0;

    this.preloaded = false;
    return this;
};

AssetAgent.prototype.onStart = function () {

    if (this.preloads) {
        this.loadAll(this.preloads, true);
    }
};

AssetAgent.prototype.onUpdate = function () {
    //TODO use some strategy to manage or auto unload those asset cached by this agent
};

AssetAgent.prototype.onDestroy = function () {

};

AssetAgent.prototype.toJSON = function (json) {
    json = Behaviour.prototype.toJSON.call(this, json);

    var jsonPreloads = json.preloads || (json.preloads = []);
    var i, len = this.preloads.length;
    for (i = 0; i < len; i++)
        jsonPreloads[i] = this.preloads[i];
    return json;
};

AssetAgent.prototype.fromJSON = function (json) {
    Behaviour.prototype.fromJSON.call(this, json);

    this.preloads.length = 0;
    if (json.preloads) {
        var i, len = json.preloads.length;
        for (i = 0; i < len; i++)
            this.preloads[i] = json.preloads[i];
    }
    return this;
};

AssetAgent.prototype.get = function (name) {
    return this._assetHash[name];
};

AssetAgent.prototype.load = function (name, type, fileType) {
    var meta;
    var asset = this._assetHash[name];
    if (asset) {
        meta = this._assetMetaHash[name];
        meta.count++;
        meta.time = Time.now();
        return asset;
    }

    asset = Assets.load(name, type, fileType);
    asset.assets = this;
    //asset.retain();
    this._assetHash[name] = asset;
    meta = this._assetMetaHash[name] = {};
    meta.count = 1;
    meta.time = Time.now();

    return asset;
};

AssetAgent.prototype.unload = function (name) {
    var meta;
    var asset = this._assetHash[name];
    if (asset) {
        meta = this._assetMetaHash[name];
        meta.count--;
        //meta.time = Time.now();
        //return asset;
    }
    //do not really unload the asset, unload when this agent destroyed
    return;
};

AssetAgent.prototype.unloadAsset = function (asset) {
    this.unload(asset.name);
};

AssetAgent.prototype.loadAll = function (assetInfos, preload) {
    var asset, info, i, len = assetInfos.length;

    for (i = 0; i < len; i++) {
        info = assetInfos[i];
        asset = this.load(info.name, info.type, info.fileType);

        if (preload) {
            if (asset.ready) {
                //this._onAssetInited(asset);
            }
            else {
                asset.on("inited", this._onAssetInited.bind(this));
                this._preloadingAssets.push(asset);
            }
        }
    }

    if (preload) {
        this._preloadCount += len;
        //event: progress, total, left
        //var left = this._preloadingAssets.length;
        //if(left === 0)
        //    this.emit("complete", this._preloadCount);
        //else
        //    this.emit("progress", this._preloadCount, left);
        this._notifyPreload();
    }
};

AssetAgent.prototype._onAssetInited = function (asset) {
    asset.off("inited", this._onAssetInited.bind(this));

    var index = this._preloadingAssets.indexOf(asset);
    if (index === -1) return;

    this._preloadingAssets.splice(index, 1);

    this._notifyPreload();
};

AssetAgent.prototype._notifyPreload = function () {
    var left = this._preloadingAssets.length;
    if (left === 0) {
        this.preloaded = true;
        this.emit("complete", this._preloadCount);
        this._preloadCount = 0;
    }
    else
        this.emit("progress", this._preloadCount, left);
};
module.exports = AssetAgent;