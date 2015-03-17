var Asset = require("./../../../context/assets/asset");
var Class = require("../../../base/class");
"use strict";

function Skeleton2DData(opts) {
    Asset.call(this, opts);

    this.name = undefined;
    this.defaultSkin = undefined;
    this.width = 0;
    this.height = 0;
    this.version = undefined;
    this.hash = undefined;

    this.bones = [];
    this.slots = [];
    this.skins = [];
    this.events = [];
    this.animations = [];
    this.ikConstraints = [];

}
Asset.extend(Skeleton2DData);

Skeleton2DData.prototype.toJSON = function (json) {
    json = Asset.prototype.toJSON.call(this, json);

    return json;
};

Skeleton2DData.prototype.fromJSON = function (json) {
    Asset.prototype.fromJSON.call(this, json);

    return this;
};

/** @return May be null. */
Skeleton2DData.prototype.findBone = function (boneName) {
    var bones = this.bones;
    for (var i = 0, n = bones.length; i < n; i++)
        if (bones[i].name == boneName) return bones[i];
    return null;
};

/** @return -1 if the bone was not found. */
Skeleton2DData.prototype.findBoneIndex = function (boneName) {
    var bones = this.bones;
    for (var i = 0, n = bones.length; i < n; i++)
        if (bones[i].name == boneName) return i;
    return -1;
};

/** @return May be null. */
Skeleton2DData.prototype.findSlot = function (slotName) {
    var slots = this.slots;
    for (var i = 0, n = slots.length; i < n; i++) {
        if (slots[i].name == slotName) return slot[i];
    }
    return null;
};

/** @return -1 if the bone was not found. */
Skeleton2DData.prototype.findSlotIndex = function (slotName) {
    var slots = this.slots;
    for (var i = 0, n = slots.length; i < n; i++)
        if (slots[i].name == slotName) return i;
    return -1;
};

/** @return May be null. */
Skeleton2DData.prototype.findSkin = function (skinName) {
    var skins = this.skins;
    for (var i = 0, n = skins.length; i < n; i++)
        if (skins[i].name == skinName) return skins[i];
    return null;
};

/** @return May be null. */
Skeleton2DData.prototype.findEvent = function (eventName) {
    var events = this.events;
    for (var i = 0, n = events.length; i < n; i++)
        if (events[i].name == eventName) return events[i];
    return null;
};

/** @return May be null. */
Skeleton2DData.prototype.findAnimation = function (animationName) {
    var animations = this.animations;
    for (var i = 0, n = animations.length; i < n; i++)
        if (animations[i].name == animationName) return animations[i];
    return null;
};

/** @return May be null. */
Skeleton2DData.prototype.findIkConstraint = function (ikConstraintName) {
    var ikConstraints = this.ikConstraints;
    for (var i = 0, n = ikConstraints.length; i < n; i++)
        if (ikConstraints[i].name == ikConstraintName) return ikConstraints[i];
    return null;
};

function Bone2DData(name, parent) {
    this.name = name;
    this.parent = parent;
    this.length = 0;
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.skewX = 0;
    this.skewY = 0;
    this.inheritScale = true;
    this.inheritRotation = true;
    this.flipX = false;
    this.flipY = false;
}

function Slot2DData(name, boneData) {
    this.name = name;
    this.boneData = boneData;
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.attachmentName = null;
    this.additiveBlending = false;
    this.skinName = null;
}

//function IkConstraint2DData(name) {
//    this.name = name;
//    this.bones = [];
//    this.target = null;
//    this.bendDirection = 1;
//    this.mix = 1;
//}

function SkinData (name) {
    this.name = name;
    this.attachments = {};
}
SkinData.prototype.addAttachment = function (slotIndex, name, attachment) {
    this.attachments[slotIndex + ":" + name] = attachment;
    //this.slots[slotIndex].skinName = this.name;
    attachment.skinName = this.name;
};
SkinData.prototype.getAttachment = function (slotIndex, name) {
    return this.attachments[slotIndex + ":" + name];
};
//SkinData.prototype._attachAll = function (skeleton, oldSkin) {
//    for (var key in oldSkin.attachments) {
//        var colon = key.indexOf(":");
//        var slotIndex = parseInt(key.substring(0, colon));
//        var name = key.substring(colon + 1);
//        var slot = skeleton.slots[slotIndex];
//        if (slot.attachment && slot.attachment.name == name) {
//            var attachment = this.getAttachment(slotIndex, name);
//            if (attachment) slot.setAttachment(attachment);
//        }
//    }
//};

var AttachmentType = {
    region: 0,
    boundingbox: 1,
    mesh: 2,
    skinnedmesh: 3
};

function RegionAttachmentData(name) {
    this.name = name;
    this.offset = [];
    this.offset.length = 8;
    this.uvs = [];
    this.uvs.length = 8;

    this.type = AttachmentType.region;
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.width = 0;
    this.height = 0;
    this.r = 1;
    this.g = 1;
    this.b = 1;
    this.a = 1;
}

Skeleton2DData.Bone2DData = Bone2DData;
Skeleton2DData.Slot2DData = Slot2DData;
//Skeleton2DData.IkConstraint2DData = IkConstraint2DData;
Skeleton2DData.SkinData = SkinData;
Skeleton2DData.AttachmentType = AttachmentType;
Skeleton2DData.RegionAttachmentData = RegionAttachmentData;

module.exports = Skeleton2DData;
