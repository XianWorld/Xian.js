/**
 * Created by Dianyan on 2014/12/31.
 */
var AssetLoader = require('./asset_loader');
//var Texture = require('../../assets/texture');
'use strict';

function ImageLoader(){
    AssetLoader.call(this);

    this.image = undefined;
}
ImageLoader.prototype = Object.create(AssetLoader.prototype);
ImageLoader.prototype.constructor = ImageLoader;

ImageLoader.prototype.load = function(asset){
    //if(!(asset instanceof Texture)){
    //    this.emit("errorLoad", this, asset, "GET " + src + " 404 (Not Found)");
    //    return;
    //}

    this.asset = asset;

    this.image = new Image;
    var src = asset.src;
    var loader = this;
    this.image.onload = function () {
        loader.emit("loaded", loader, asset);
    };
    this.image.onerror = function () {
        //callback && callback(new Error("GET " + src + " 404 (Not Found)"));
        loader.emit("errorLoad", loader, asset, new Error("GET " + src + " 404 (Not Found)"));
    };

    this.image.src = src;
};

ImageLoader.prototype.init = function(asset){
    this.asset = asset;
    var image = this.image;
    //asset.parse(image);
    asset.image = image;
    asset.width = image.width;
    asset.height = image.height;

    this.emit("inited", this, asset);
};

ImageLoader.prototype.destroy = function() {
    this.asset = undefined;
    this.image = undefined;
};

module.exports = ImageLoader;

