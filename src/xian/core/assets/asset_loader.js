var Device = require("../../base/device");
var util = require("../../base/util");
var EventEmitter = require("../../base/event_emitter");
var AudioCtx = require("../../base/audio_ctx");
var Asset = require("./asset");
var Assets = require("./assets");
var Log = require("../../base/log");
"use strict";


var isArray = util.isArray,
    ajax = util.ajax,
    each = util.each;


function getExt(src) {

    return src ? (src.split(".").pop()).toLowerCase() : "none";
};


function AssetLoader() {

    EventEmitter.call(this);

    var supports = this.supports = ["json", "jpeg", "jpg", "png", "gif"];

    if (Device.audioMpeg) supports.push("mpeg");
    if (Device.audioOgg || Device.videoOgg) supports.push("ogg");
    if (Device.audioMp3) supports.push("mp3");
    if (Device.audioMp4 || Device.videoMp4) supports.push("mp4");
}

EventEmitter.extend(AssetLoader);


AssetLoader.prototype.load = function (reload) {
    var _this = this,
        count = Assets.length,
        i = count,
        fn = function (err) {
            if (err) Log.error(err);

            count--;
            if (count <= 0) _this.emit("load");
        };

    if (!count) this.emit("load");
    while (i--) this.loadAsset(Assets[i], fn, reload, true);
};


AssetLoader.prototype.loadAsset = function (asset, callback, reload, known) {
    var _this = this,
        supports = this.supports,
        src = asset.src;

    if (!known || Assets.indexOf(asset) === -1) Assets.addAsset(asset);

    if (!asset.load || !src || asset.raw && !reload) {
        asset._loaded = true;
        callback && callback()
        return;
    }
    ;

    if (isArray(src)) {
        var raw = [],
            exts = [],
            loaded = src.length,
            hasExt = false;

        each(src, function (s, i) {
            var ext = getExt(s);
            exts.push(ext);

            if (!this[ext]) {
                callback && callback(new Error("AssetLoader.load: has no loader for " + src + " of type " + ext));
                return false;
            }

            this[ext](s, function (err, data) {
                loaded--;
                raw[i] = data;

                if (err) Log.error(err);

                if (loaded <= 0) {
                    for (var j = exts.length; j--;) {
                        if (supports.indexOf(exts[i]) !== -1) {
                            hasExt = true;
                            break;
                        }
                    }

                    if (!hasExt) {
                        callback && callback(new Error("AssetLoader.load: device does not support any of the given file types " + exts));
                        return;
                    }

                    asset._loaded = true;
                    asset.parse(raw);
                    asset.emit("load", raw);
                    _this.emit("loadAsset", asset);
                    callback && callback();
                }
            });

            return true;
        }, this);
    } else {
        var ext = getExt(src);

        if (!this[ext]) {
            callback && callback(new Error("AssetLoader.load: has no loader file " + src + " of type " + ext));
            return;
        }
        if (supports.indexOf(ext) === -1) {
            callback && callback(new Error("AssetLoader.load: device does not support file " + src + " of type " + ext));
            return;
        }

        this[ext](src, function (err, raw) {
            if (err) {
                callback && callback(new Error("AssetLoader.load: " + err.message));
                return;
            }

            asset._loaded = true;
            asset.parse(raw);
            asset.emit("load", raw);
            _this.emit("loadAsset", asset);
            callback && callback();
        });
    }
};


AssetLoader.prototype.gif = AssetLoader.prototype.jpg = AssetLoader.prototype.jpeg = AssetLoader.prototype.png = function (src, callback) {
    var image = new Image;

    image.onload = function () {
        callback && callback(null, image);
    };
    image.onerror = function () {
        callback && callback(new Error("GET " + src + " 404 (Not Found)"));
    };

    image.src = src;
};


AssetLoader.prototype.json = function (src, callback) {

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
                callback && callback(err);
                return;
            }

            callback && callback(null, json);
        },
        error: function (err) {
            callback && callback(err);
        }
    });
};


AssetLoader.prototype.ogg = AssetLoader.prototype.wav = AssetLoader.prototype.mp3 = AssetLoader.prototype.aac = function (src, callback) {

    ajax({
        src: src,
        before: function () {
            this.responseType = "arraybuffer";
        },
        success: function () {
            if (AudioCtx) {
                if (AudioCtx.decodeAudioData) {
                    AudioCtx.decodeAudioData(
                        this.response,
                        function success(buffer) {
                            callback && callback(null, buffer);
                        },
                        function failure() {
                            callback && callback(new Error("AudioContext Failed to parse Audio Clip"));
                        }
                    );
                } else {
                    var buffer = AudioCtx.createBuffer(this.response, false);

                    if (buffer) {
                        callback && callback(null, buffer);
                    } else {
                        callback && callback(new Error("AudioContext Failed to parse Audio Clip"));
                    }
                }
            } else {
                callback && callback(new Error("AudioContext (WebAudio API) is not supported by this browser"));
            }
        },
        error: function (err) {
            callback && callback(err);
        }
    });
};


module.exports = new AssetLoader;
