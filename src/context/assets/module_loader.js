/**
 * Created by Dianyan on 2014/12/31.
 */
var AssetLoader = require('./asset_loader');

'use strict';

function ModuleLoader(){
    AssetLoader.call(this);
    this._data = undefined;

}
ModuleLoader.prototype = Object.create(AssetLoader.prototype);
ModuleLoader.prototype.constructor = ModuleLoader;

ModuleLoader.prototype.load = function(asset){

    this.asset = asset;
    var src = asset.src;
    var loader = this;

    var seajs = require('./sea-debug');
    //var a = require('');
    require.async(src, function(target) {
        loader._data = target;
        loader.emit("loaded", loader, asset);
    });
};

ModuleLoader.prototype.init = function(asset){
    this.asset = asset;

    asset.exportTarget = this._data;
    this.emit("inited", this, this.asset);
};

ModuleLoader.prototype.destroy = function() {
    AssetLoader.prototype.destroy.call(this);

    this._data = undefined;
};

module.exports = ModuleLoader;
