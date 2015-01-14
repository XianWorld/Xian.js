/**
 * Created by Dianyan on 2014/12/31.
 */
var AssetLoader = require('./asset_loader');
var Context = require("../main_context");
//var Device = Context.Device;
var AudioCtx = Context.AudioContext;
var Log = Context.Log;
var util = require("../../base/util");
var ajax = util.ajax;
'use strict';

function AudioClipLoader(){
    AssetLoader.call(this);

    this._data = undefined;
}
AudioClipLoader.prototype = Object.create(AssetLoader.prototype);
AudioClipLoader.prototype.constructor = AudioClipLoader;

AudioClipLoader.prototype.load = function(asset){
    this.asset = asset;
    var src = asset.src;
    var loader = this;

    ajax({
        src: src,
        before: function () {
            this.responseType = "arraybuffer";
        },
        success: function () {
            loader._data = this.response;
            loader.emit("loaded", loader, asset);
        },
        error: function (err) {
            loader.emit("errorLoad", loader, asset, err);
        }
    });
};

AudioClipLoader.prototype.init = function(asset){
    this.asset = asset;
    var loader = this;
    var data = this._data;

    if (AudioCtx) {
        if (AudioCtx.decodeAudioData) {
            AudioCtx.decodeAudioData(
                data,
                function success(buffer) {
                    asset.parse(buffer);
                    loader.emit("inited", loader, asset);
                },
                function failure() {
                    loader.emit("errorInit", loader, asset, new Error("AudioContext Failed to parse Audio Clip"));
                }
            );
        } else {
            var buffer = AudioCtx.createBuffer(data, false);

            if (buffer) {
                asset.parse(buffer);
                loader.emit("inited", loader, asset);
            } else {
                loader.emit("errorInit", loader, asset, new Error("AudioContext Failed to parse Audio Clip"));
            }
        }
    } else {
        loader.emit("errorInit", loader, asset, new Error("AudioContext (WebAudio API) is not supported by this browser"));
    }
};

AudioClipLoader.prototype.destroy = function() {
    this.asset = undefined;
    this._data = undefined;
};

module.exports = AudioClipLoader;