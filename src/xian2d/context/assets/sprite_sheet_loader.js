/**
 * Created by Dianyan on 2014/12/31.
 */
//var Assets = require('../../../context/assets/assets');
var AssetLoader = require('../../../context/assets/asset_loader');
var TextureClipData = require('./texture_clip_data');
var util = require("../../../base/util");
var ajax = util.ajax;
'use strict';

function SpriteSheetLoader(){
    AssetLoader.call(this);
    this._data = undefined;

}
SpriteSheetLoader.prototype = Object.create(AssetLoader.prototype);
SpriteSheetLoader.prototype.constructor = SpriteSheetLoader;

SpriteSheetLoader.prototype.load = function(asset){

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

SpriteSheetLoader.prototype.init = function(asset){
    this.asset = asset;

    var loader = this;
    var json = this._data;

    if(!json.frames || !json.meta || !json.meta.image){
        loader.emit("errorInit", loader, asset, new Error("data format error"));
        return;
    }

    // sprite sheet
    var textureUrl = json.meta.image;
    var frameDatas = json.frames;
    var frameData, rect;
    var clipData,clip,anchor,trim;
    for (var i in frameDatas)
    {
        frameData = frameDatas[i];
        rect = frameData.frame;

        if (rect)
        {
            clipData = TextureClipData.create();
            clipData.name = i;
            clipData.clip.set(rect.x,rect.y,rect.w,rect.h);

            if(frameData.pivot){
                clipData.anchored = true;
                clipData.anchor.set(frameData.pivot.x, frameData.pivot.y);
            }
            //  Check to see if the sprite is trimmed
            if (frameData.trimmed)
            {
                clipData.trimed = true;
                var actualSize = frameData.sourceSize;
                var realSize = frameData.spriteSourceSize;
                clipData.trim.set(realSize.x,realSize.y,actualSize.w,actualSize.h);
            }
            asset.addFrame(clipData);
        }
    }

    var texture = this.assets.load(textureUrl, "Texture");
    asset.texture = texture;
    if(texture.ready){
        this.emit("inited", this, asset);
    }
    else{
        texture.on("inited", this._onTextureInited.bind(this));
    }
};

SpriteSheetLoader.prototype._onTextureInited = function(asset){
    asset.off("inited", this._onTextureInited.bind(this));
    this.emit("inited", this, this.asset);
};

SpriteSheetLoader.prototype.destroy = function() {
    AssetLoader.prototype.destroy.call(this);

    this._data = undefined;
};

module.exports = SpriteSheetLoader;
