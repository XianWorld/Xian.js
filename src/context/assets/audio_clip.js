var util = require("../../base/util");
//var Context = require("../context/main_context");
var Asset = require("./asset");
"use strict";


var isArray = util.isArray,
    defineProperty = Object.defineProperty,
    arrayBufferToBase64 = util.arrayBufferToBase64,
    base64ToArrayBuffer = util.base64ToArrayBuffer;


function AudioClip(opts) {
    //opts || (opts = {});

    Asset.call(this, opts);

    this.raw = undefined;
}

Asset.extend(AudioClip);


defineProperty(AudioClip.prototype, "length", {
    get: function () {
        return this.raw ? this.raw.duration : 0;
    }
});


defineProperty(AudioClip.prototype, "samples", {
    get: function () {
        return this.raw ? this.raw.length : 0;
    }
});


defineProperty(AudioClip.prototype, "frequency", {
    get: function () {
        return this.raw ? this.raw.sampleRate : 44100;
    }
});


defineProperty(AudioClip.prototype, "channels", {
    get: function () {
        return this.raw ? this.raw.numberOfChannels : 0;
    }
});


AudioClip.prototype.parse = function (raw) {
    //Asset.prototype.parse.call(this, raw);
    var i;

    if (isArray(raw)) {
        i = raw.length;
        while (i--) {
            if (raw[i]) this.raw = raw[i];
        }
    }

    return this;
};


AudioClip.prototype.getData = function (array, offset) {
    array || (array = []);

    return this.raw ? this.raw.getChannelData(array, offset) : array;
};


AudioClip.prototype.toJSON = function (json, pack) {
    json = Asset.prototype.toJSON.call(this, json, pack);

    if ((pack || !this.src) && this.raw) json.raw = arrayBufferToBase64(this.raw);

    return json;
};


AudioClip.prototype.fromJSON = function (json, pack) {
    Asset.prototype.fromJSON.call(this, json, pack);

    if ((pack || !this.src) && this.raw) this.raw = base64ToArrayBuffer(json.raw);

    return this;
};


module.exports = AudioClip;
