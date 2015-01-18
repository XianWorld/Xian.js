//var Enums = require("../../core/enums");
var Asset = require("../../../context/assets/asset");
var TextureClipData = require("./texture_clip_data");
"use strict";


function SpriteSheet(opts) {
    //opts || (opts = {});

    Asset.call(this, opts);

    //name, texture_clip
    this.frameHash = {};
    this.frames = [];
    //if(opts.frames) this.addFrames(opts.frames);

    this._texture = undefined;
    //if(opts.texture) this.texture = opts.texture;
}

Asset.extend(SpriteSheet);

Object.defineProperty(SpriteSheet.prototype, "texture", {
    get: function () {
        return this._texture;
    },
    set: function (value) {
        if (this._texture === value) return;
        if(this._texture) {
            //this._texture.off("inited", this._onTextureInited.bind(this));
            this._texture.release();
        }
        this._texture = value;
        if(this._texture) {
            this._texture.retain();
            //if(!this._texture.ready)
                //this._texture.on("inited", this._onTextureInited.bind(this));
        }
    }
});

SpriteSheet.prototype.clear = function () {
    var key;
    for(key in this.frameHash){
        this.frameHash[key].destroy();
        delete this.frameHash[key];
    }
    this.frames.length = 0;
    if(this._texture){
        this._texture.release();
    }
    return this;
};

SpriteSheet.prototype.copy = function (other) {
    Asset.prototype.copy.call(this, other);
    //TODO
    return this;
};

SpriteSheet.prototype.toJSON = function (json, pack) {
    json = Asset.prototype.toJSON.call(this, json);
    //TODO

    return json;
};

SpriteSheet.prototype.fromJSON = function (json) {
    Asset.prototype.fromJSON.call(this, json);
    //TODO

    return this;
};

SpriteSheet.prototype.addFrame = function (frame) {
    var frames = this.frames;
    var frameHash = this.frameHash;
    var clip = frame;
    if(!(clip instanceof TextureClipData)){
        clip = TextureClipData.create();
        clip.fromJSON(frame);
    }
    var name = clip.name;
    if(frameHash[name]) return;

    frameHash[name] = frame;
    frames.push(frame);
    return this;
};

//SpriteSheet.prototype.addFrames = function (frames) {
//    var i,len = frames.length;
//    for(i = 0;i < len;i++){
//        this.addFrame(frames[i]);
//    }
//};

module.exports = SpriteSheet;
