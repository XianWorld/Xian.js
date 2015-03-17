/**
 * Created by Dianyan on 2015/2/9.
 */
var Class = require("../../base/class");
var Context = require("../../context/main_context");
//var Time = Context.Time;
var Assets = Context.Assets;

function Skin2D(){
    Class.call(this);

    this.skinParts = {};

    this.animator = undefined;
}
Class.extend(Skin2D);

Skin2D.prototype.onAssetInited = function(asset) {
    this._dirty = true;


};

Skin2D.prototype.copy = function (other) {

    return this;
};

Skin2D.prototype.clear = function () {
    for(var key in this.skinParts){
        this.setSkinPart(key, undefined);
    }

    this.animator = undefined;
    return this;
};

Skin2D.prototype.destroy = function () {
    this.clear();

    for(var key in this.skinParts){
        if(this.skinParts[key]) this.skinParts[key].destroy();
    }
    this.skinParts = undefined;
    return this;
};

Skin2D.prototype.toJSON = function (json) {
    //json = Class.prototype.toJSON.call(this, json);
    json || (json = {});

    json.skinParts || (json.skinParts = {});
    for(var key in this.skinParts){
        json.skinParts[key] = this.skinParts[key].name;
    }
    return json;
};

Skin2D.prototype.fromJSON = function (json) {
    //Class.prototype.fromJSON.call(this, json);

    //if(json){
    //    var ssd, ssdName;
    //    for(var key in json){
    //        ssdName = json[key];
    //        ssd = ssdName ? Assets.load(ssdName, "SpriteSheet") : undefined;
    //        this.setSkinPart(key, ssd);
    //    }
    //}
    this.setSkin(json.skinParts);
    return this;
};

Skin2D.prototype.applySkin = function (partName, clipName, sprite2d) {
    var skinPart = this.skinParts[partName];
    if(!skinPart) return false;
    var ssd = skinPart.data;
    if(!ssd || !ssd.ready) return false;

    sprite2d.texture = ssd.texture;
    sprite2d.textureClip = ssd.getFrameByName(clipName);

    return true;
};

//Skin2D.prototype.update = function () {
//    var skinPart;
//    for(var key in this.skinParts) {
//        skinPart = this.skinParts[key];
//        if(skinPart) skinPart.update();
//    }
//};

//Skin2D.prototype.applyAll = function () {
//    var skeleton = this.animator.skeleton;
//
//    if(!skeleton) return;
//    var skeletonData = skeleton.data;
//    var skinDatas = skeleton.data.skins;
//    var skinData;
//    for(var key in this.skinParts){
//        skinData = skeletonData.findSkin(key);
//
//    }
//
//};

Skin2D.prototype.setSkin = function (skinParts) {
    if(!skinParts) return;

    var ssd, ssdName;
    for(var key in skinParts){
        ssdName = skinParts[key];
        if(typeof(ssdName) === 'string')
            ssd = ssdName ? Assets.load(ssdName, "SpriteSheet") : undefined;
        else
            ssd = ssdName;
        this.setSkinPart(key, ssd);
    }
};

Skin2D.prototype.setSkinPart = function (name, spriteSheetData) {
    var ssd = this.skinParts[name];
    if(ssd === undefined){
        ssd = this.skinParts[name] = new SkinPart2D();
        ssd.skin = this;
        ssd.name = name;
    }
    if (ssd.data === spriteSheetData) return;
    ssd.data = spriteSheetData;

    this._dirty = true;
};


function SkinPart2D(){
    Class.call(this);

    this.name = undefined;
    this.skin = undefined;
    this._data = undefined;
    this._dirty = true;
}
Class.extend(SkinPart2D);

SkinPart2D.prototype.onAssetInited = function(asset) {
    //this._dirty = true;

    this.apply();
};

Object.defineProperty(SkinPart2D.prototype, "data", {
    get: function () {
        return this._data;
    },
    set: function (value) {
        if (this._data === value) return;
        if (this._data) this._data.release(this);
        this._data = value;
        if (this._data) this._data.retain(this);

        if(this._data.ready)
            this.apply();
        //this._dirty = true;
    }
});

SkinPart2D.prototype.copy = function (other) {
    this.data = other._data;
    return this;
};

SkinPart2D.prototype.clear = function () {
    this.data = undefined;
    this.name = undefined;
    this.skin = undefined;
    return this;
};

SkinPart2D.prototype.apply = function () {
    var skin = this.skin;
    var skeleton = skin.animator.skeleton;

    if(!skeleton || !skeleton.ready) return;
    var skeletonData = skeleton.data;
    var skinData;
    skinData = skeletonData.findSkin(this.name);
    if(!skinData) return;

    var data = this._data;
    for (var key in skinData.attachments) {
        var colon = key.indexOf(":");
        var slotIndex = parseInt(key.substring(0, colon));
        var name = key.substring(colon + 1);
        var slot = skeleton.slots[slotIndex];
        var sprite = slot.currentSprite;
        if(sprite && sprite.name == name){
            sprite.sprite2d.texture = data.texture;
            sprite.sprite2d.textureClip = data.getFrameByName(name);
        }
    }
};

Skin2D.SkinPart2D = SkinPart2D;

module.exports = Skin2D;