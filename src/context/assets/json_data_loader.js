/**
 * Created by Dianyan on 2014/12/31.
 */
//var Assets = require('../../context/assets/assets');
var AssetLoader = require('./asset_loader');
var util = require("../../base/util");
var ajax = util.ajax;
'use strict';

function JsonDataLoader(){
    AssetLoader.call(this);

}
JsonDataLoader.prototype = Object.create(AssetLoader.prototype);
JsonDataLoader.prototype.constructor = JsonDataLoader;

JsonDataLoader.prototype.load = function(asset){

    this.asset = asset;
    var src = asset.src;
    var loader = this;

    ajax({
        src: src,
        before: function () {
            this.setRequestHeader("Content-Type", "application/json");
        },
        success: function () {
            var json = this.responseText;

            try {
                json = JSON.parse(this.responseText);
            } catch (err) {
                loader.emit("errorLoad", loader, asset, err);
                return;
            }

            loader._data = json;
            loader.emit("loaded", loader, asset);
        },
        error: function (err) {
            loader.emit("errorLoad", loader, asset, err);
        }
    });
};

JsonDataLoader.prototype.init = function(asset){
    this.asset = asset;

    asset.jsonData = this._data;
    this.emit("inited", this, this.asset);
};

JsonDataLoader.prototype.destroy = function() {
    AssetLoader.prototype.destroy.call(this);

    this._data = undefined;
};

module.exports = JsonDataLoader;
