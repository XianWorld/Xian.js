//var Enums = require("../../../base/enums");
var Vec2 = require("../../../math/vec2");
var Rect = require("../../../math/rect");
var ObjectPools = require("../../../context/pool/object_pools");
"use strict";

function TextureClipData() {

    //Class.call(this);
    this.name = undefined;
    //anchor
    this.anchored = false;
    this._anchor = new Vec2;
    //clip
    this._clip = new Rect;
    //trim...
    this.trimed = false;
    this._trim = new Rect;
}

Object.defineProperty(TextureClipData.prototype, "anchor", {
    get: function () {
        return this._anchor;
    },
    set: function (value) {
        if (value) this._anchor.copy(value);
    }
});
Object.defineProperty(TextureClipData.prototype, "clip", {
    get: function () {
        return this._clip;
    },
    set: function (value) {
        if (value) this._clip.copy(value);
    }
});
Object.defineProperty(TextureClipData.prototype, "trim", {
    get: function () {
        return this._trim;
    },
    set: function (value) {
        if (value) this._trim.copy(value);
    }
});

//Class.extend(TextureClipData);
TextureClipData.prototype.clone = function () {
    return TextureClipData.create().copy(this);
};

TextureClipData.prototype.copy = function (other) {
    this.name = other.name;
    this.anchored = other.anchored;
    if(this.anchored) this._anchor.copy(other._anchor);
    this._clip.copy(other._clip);
    this.trimed = other.trimed;
    if(this.trimed) this._trim.copy(other._trim);
    return this;
};

TextureClipData.prototype.clear = function () {
    this.name = undefined;
    this.anchored = false;
    this._anchor.clear();
    this._clip.clear();
    this._trim.clear();
    this.trimed = false;
};

TextureClipData.prototype.destroy = function () {
    this.name = undefined;
    this.anchored = false;
    this._anchor = undefined;
    this._clip = undefined;
    this._trim = undefined;
    this.trimed = false;
};

TextureClipData.prototype.toJSON = function (json) {

    json.name = this.name;
    json.clip = this._clip.toJSON(json.clip);
    json.anchored = this.anchored;
    if(this.anchored) json.anchor = this._anchor.toJSON(json.anchor);
    json.trimed = this.trimed;
    if(this.trimed) json.trim = this._trim.toJSON(json.trim);
    return json;
};

TextureClipData.prototype.fromJSON = function (json) {
    this.name = json.name;
    if(json.clip) this._clip.fromJSON(json.clip);
    this.anchored = json.anchored || false;
    if(json.anchor) this._anchor.fromJSON(json.anchor);
    this.trimed = json.trimed || false;
    if(json.trim) this._trim.fromJSON(json.trim);
    return this;
};

var pool = ObjectPools.getPool(TextureClipData);
TextureClipData.create = function() {
    var obj = pool.create();
    if(!obj) obj = new TextureClipData;
    return obj;
};

module.exports = TextureClipData;