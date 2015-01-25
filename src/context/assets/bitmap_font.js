var Asset = require("./asset");
"use strict";

function BitmapFont(opts) {
    //opts || (opts = {});

    Asset.call(this, opts);

    this.font = '';
    this.size = 12;
    this.lineHeight = 12;
    this.chars = {};

    this._texture = undefined;
}

Asset.extend(BitmapFont);

Object.defineProperty(BitmapFont.prototype, "texture", {
    get: function () {
        return this._texture;
    },
    set: function (value) {
        if (this._texture === value) return;
        if(this._texture) {
            this._texture.release();
        }
        this._texture = value;
        if(this._texture) {
            this._texture.retain();
        }
    }
});

BitmapFont.prototype.clear = function () {
    //var key;
    //for(key in this.frameHash){
    //    this.frameHash[key].destroy();
    //    delete this.frameHash[key];
    //}
    //this.frames.length = 0;
    if(this._texture){
        this._texture.release();
        this._texture = undefined;
    }
    return this;
};

BitmapFont.prototype.copy = function (other) {
    Asset.prototype.copy.call(this, other);
    //TODO
    return this;
};

BitmapFont.prototype.toJSON = function (json, pack) {
    json = Asset.prototype.toJSON.call(this, json);
    //TODO

    return json;
};

BitmapFont.prototype.fromJSON = function (json) {
    Asset.prototype.fromJSON.call(this, json);
    //TODO

    return this;
};

module.exports = BitmapFont;
