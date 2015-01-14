var Log = require("../log/log");
var Class = require("../../base/class");
"use strict";

var defineProperty = Object.defineProperty;

Asset.AssetState = {
    NONE: 0,
    LOADING: 1,
    LOADED: 2,
    INITED: 3,
    ERROR_LOAD: 4,
    ERROR_INIT: 5
};

function Asset(opts) {
    opts || (opts = {});

    Class.call(this);

    this.name = opts.name !== undefined ? opts.name : "Asset_" + this._id;
    this._state = Asset.AssetState.NONE;
    //this._scopes = [];
    this._ref_asset = 0;
    //this._loaded = false;

    //this.json = opts.json !== undefined ? !!opts.json : true;
    this.assets = undefined;
    //this.load = opts.load !== undefined ? !!opts.load : !!opts.src;
    this.src = opts.src;
    this.fileType = opts.fileType;

    //this.raw = opts.raw;
}

Class.extend(Asset);


defineProperty(Asset.prototype, "state", {
    get: function () {
        return this._state;
    },
    set: function (value) {
        if(this._state === value) return;
        this.emit("stateChange",this.state, value);
        this._state = value;
    }
});
defineProperty(Asset.prototype, "ready", {
    get: function () {
        return this._state === Asset.AssetState.INITED;
    }
});

//defineProperty(Asset.prototype, "name", {
//    get: function () {
//        return this._name;
//    },
//    set: function (value) {
//        var assets = this.assets,
//            hash;
//
//        if (assets) {
//            hash = assets.hash;
//
//            if (hash[value]) {
//                Log.warn("Asset.set name: can't change name to " + value + " Assets already have an asset with same name");
//                return;
//            }
//
//            delete hash[this.name];
//            hash[value] = this;
//        }
//
//        this._name = value;
//    }
//});

Asset.prototype.copy = function (other) {

    //this.sync = other.sync;
    //this.json = other.json;

    this.name = other.name + "." + this._id;
    this.src = other.src;
    this.fileType = other.fileType;
    //this.raw = other.raw;
    //if (other.assets && this.assets !== other.assets) other.assets.addAsset(this);

    return this;
};

Asset.prototype.clear = function () {

    this._ref_asset = 0;
    this.assets = undefined;
    return this;
};

Asset.prototype.destroy = function () {
    //if (!this.assets) {
    //    Log.error("Asset.destroy: can't destroy Asset if it's not added to Assets");
    //    return this;
    //}

    this.emit("destroy", this);
    this.clear();

    this.off();
    return this;
};


//Asset.prototype.parse = function (raw) {
//
//    this.raw = raw;
//    return this;
//};


Asset.prototype.toJSON = function (json, pack) {
    json = Class.prototype.toJSON.call(this, json);

    json.name = this.name;
    if (!pack) json.src = this.src;

    return json;
};


Asset.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.name = json.name;
    this.src = json.src;

    return this;
};

Asset.prototype.setReady = function () {
    this.state = Asset.AssetState.INITED;
    return this;
};

Asset.prototype.retain = function (handler) {
    if (!this.ready && handler){
        if(handler.onAssetInited) this.on("inited", handler.onAssetInited, handler);
        //if(handler.onAssetInited) this.on("inited", handler.onAssetInited, handler);
    }

    this._ref_asset ++;
    return this;
};
Asset.prototype.release = function (handler) {
    if(handler)
        if(handler.onAssetInited) this.off("inited", handler.onAssetInited, handler);

    this._ref_asset --;
    if(this._ref_asset > 0) return this;

    if(this.assets){
        this.assets.unloadAsset(this);
    }
    else{
        this.destroy();
    }
};

module.exports = Asset;
