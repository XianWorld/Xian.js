/**
 * Created by Dianyan on 2015/1/22.
 */
//var Enums = require("../../core/enums");
var Asset = require("../../../context/assets/asset");
var TextureClipData = require("./texture_clip_data");
"use strict";

function SpriteAnimationAsset() {

    Asset.call(this);

    //name, texture_clip
    this.frameHash = {};
    this.frames = [];
    //if(opts.frames) this.addFrames(opts.frames);

    this._texture = undefined;
    //if(opts.texture) this.texture = opts.texture;
}

Asset.extend(SpriteAnimationAsset);

Object.defineProperty(SpriteAnimationAsset.prototype, "texture", {
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

SpriteAnimationAsset.prototype.clear = function () {
    var key;
    for(key in this.frameHash){
        this.frameHash[key].destroy();
        delete this.frameHash[key];
    }
    this.frames.length = 0;
    if(this._texture){
        this._texture.release();
        this._texture = undefined;
    }
    return this;
};

SpriteAnimationAsset.prototype.copy = function (other) {
    Asset.prototype.copy.call(this, other);
    //TODO
    return this;
};

SpriteAnimationAsset.prototype.toJSON = function (json, pack) {
    json = Asset.prototype.toJSON.call(this, json);
    //TODO

    return json;
};

SpriteAnimationAsset.prototype.fromJSON = function (json) {
    Asset.prototype.fromJSON.call(this, json);
    //TODO

    return this;
};

SpriteAnimationAsset.prototype.addFrame = function (frame) {
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

//SpriteAnimationAsset.prototype.addFrames = function (frames) {
//    var i,len = frames.length;
//    for(i = 0;i < len;i++){
//        this.addFrame(frames[i]);
//    }
//};

function AnimFrameData(){
    this.frameDataIndex = 0;
}

function SpriteFrameData(){
    this.frameClipData = new SpriteFrameClipData();
    this.position = new Vec2;
    this.scale = new Vec2(1,1);
    this.rotation = 0;

    this.flipX = false;
    this.flipY = false;
}

function SpriteFrameClipData(){
    this.spriteSheetIndex = 0;
    this.clipIndex = 0;
    this.clipId = undefined;

    this.clipData = undefined;
}

module.exports = SpriteAnimationAsset;
