var Class = require("../base/class");
var Asset = require("./asset");
var Log = require("../context/main_context").Log;
"use strict";


function Assets() {

    Array.call(this);

    this.hash = {};
}

Assets.prototype = Object.create(Array.prototype);
Assets.prototype.constructor = Assets;


Assets.prototype.get = function (name) {
    var asset = this.hash[name];
    if (asset) return asset;

    Log.error("Assets.get: can't find asset with name " + name + ", it has not been added to Assets, use Assets.addAsset(asset)");
    return undefined;
};


Assets.prototype.addAsset = function (asset) {
    if (!(asset instanceof Asset)) {
        Log.error("Assets.addAsset: can't add passed argument, it is not an instance of Asset");
        return this;
    }
    var name = asset.name;

    if (this.hash[name]) {
        Log.error("Assets.addAsset: Assets already have Asset named " + asset.name);
        return undefined;
    }

    asset.assets = this;
    this.push(asset);
    this.hash[name] = asset;

    return asset;
};


Assets.prototype.addAssets = function () {
    var i, il;

    for (i = 0, il = arguments.length; i < il; i++) this.addAsset(arguments[i]);
};


Assets.prototype.removeAsset = function (asset) {
    var name = typeof(asset) === "string" ? asset : asset.name;
    asset = this.hash[name];

    if (!asset) {
        Log.error("Assets.removeAsset: Assets does not have an Asset named " + name);
        return undefined;
    }

    this.splice(this.indexOf(asset), 1);
    this.hash[name] = null;

    return asset;
};


Assets.prototype.removeAssets = function () {
    var i, il;

    for (i = 0, il = arguments.length; i < il; i++) this.removeAsset(arguments[i]);
};


Assets.prototype.toJSON = function (json, pack) {
    json || (json = {});
    var jsonAssets = json.assets || (json.assets = []),
        jsonAsset,
        i = this.length;

    while (i--) {
        if ((jsonAsset = this[i]).json) jsonAssets[i] = jsonAsset.toJSON(jsonAssets[i], pack);
    }

    return json;
};


Assets.prototype.fromJSON = function (json) {
    var assetsHash = this.hash,
        jsonAssets = json.assets || (json.assets = []),
        asset, jsonAsset,
        i = jsonAssets.length;

    while (i--) {
        if (!(jsonAsset = jsonAssets[i])) continue;

        if ((asset = assetsHash[jsonAsset.name])) {
            asset.fromJSON(jsonAsset);
        } else {
            this.add(Class.fromJSON(jsonAsset));
        }
    }

    return this;
};


module.exports = new Assets;
