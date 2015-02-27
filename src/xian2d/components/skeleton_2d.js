/**
 * Created by Dianyan on 2015/2/7.
 */
var Class = require("../../base/class");
var Context = require("../../context/main_context");
//var Time = Context.Time;
var Assets = Context.Assets;
var Mathf = require("../../math/mathf");
var Color = require('../../math/color');
var GameObject = require('../../core/game_object');
var Transform2D = require('./transform_2d');
var Renderer2D = require('./renderer_2d');
var Graphics = require('./graphics');
var Text2D = require('./text_2d');
var Sprite2D = require('./sprite_2d');

var Skeleton2DData = require('../context/assets/skeleton_2d_data');
//var Bone2DData = Skeleton2DData.Bone2DData;
//var Slot2DData = Skeleton2DData.Slot2DData;
////var IkConstraint2DData = Skeleton2DData.IkConstraint2DData;
//var SkinData = Skeleton2DData.SkinData;
var AttachmentType = Skeleton2DData.AttachmentType;
//var RegionAttachmentData = Skeleton2DData.RegionAttachmentData;
//var Animation2DData = Skeleton2DData.Animation2DData;
//var Curves2DData = Skeleton2DData.Curves2DData;
//
//var Timeline2DType = Skeleton2DData.Timeline2DType;

"use strict";
var abs = Math.abs;
var TO_RADS = Mathf.TO_RADS;

function Skeleton2D() {
    Class.call(this);

    this.animator = undefined;
    this._data = undefined;
    this.slotContainers = [];
    this.ready = false;

    this.bones = [];
    this.drawOrder = [];
    this.slots = [];
    this.ikConstraints = [];

    this.boneCache = [];

    this.x = 0;
    this.y = 0;
    this.skin = undefined;
    this.r = 1;
    this.g = 1;
    this.b = 1;
    this.a = 1;
    this.time = 0;
    this.flipX = false;
    this.flipY = false;
}
Class.extend(Skeleton2D);

Skeleton2D.prototype.onAssetInited = function(asset) {
    this._dirty = true;

    this._initSkeleton();
};

Object.defineProperty(Skeleton2D.prototype, "data", {
    get: function () {
        return this._data;
    },
    set: function (value) {
        if (this._data === value) return;
        if (this._data) {
            //if(this._skeletonData.ready) this.skeleton.clear();
            this._data.release(this);
        }
        this._data = value;
        if (this._data){
            //if(this._skeletonData.ready) this.skeleton.init(this._skeletonData);
            this._data.retain(this);
        }

        this._initSkeleton();

        this._dirty = true;
    }
});

Skeleton2D.prototype.clear = function () {
    this._clearSkeleton();

    this.data = undefined;
    this.animator = undefined;
    this.ready = false;
};

Skeleton2D.prototype.destroy = function () {
    this.clear();
    this.bones = undefined;
    this.slots = undefined;
    this.drawOrder = undefined;
    this.ikConstraints = undefined;

    this.slotContainers = undefined;

    this.boneCache = undefined;
};

Skeleton2D.prototype.toJSON = function (json) {
    //json = Class.prototype.toJSON.call(this, json);
    json || (json = {});

    json.skeletonData = this.data ? this.data.name : undefined;

    return json;
};

Skeleton2D.prototype.fromJSON = function (json) {
    //Class.prototype.fromJSON.call(this, json);
    this.data = json.skeletonData ? Assets.load(json.skeletonData, "Skeleton2DData") : undefined;

    return this;
};

Skeleton2D.prototype.update = function()
{
    if(!this.ready) return;

    this.updateWorldTransform();

    var transform;
    var drawOrder = this.drawOrder;
    for (var i = 0, n = drawOrder.length; i < n; i++) {
        var slot = drawOrder[i];
        var attachment = slot.attachment;
        var slotContainer = this.slotContainers[i];

        if (!attachment)
        {
            slotContainer.setActive(false);
            continue;
        }

        var type = attachment.type;
        if (type === AttachmentType.region)
        {
            if (attachment.skinName)
            {
                if (!slot.currentSpriteName || slot.currentSpriteName !== attachment.name)
                {
                    var spriteName = attachment.name;
                    if (slot.currentSprite !== undefined)
                    {
                        slot.currentSprite.setActive(false);
                    }
                    slot.sprites = slot.sprites || {};
                    if (slot.sprites[spriteName] !== undefined)
                    {
                        slot.sprites[spriteName].setActive(true);
                    }
                    else
                    {
                        var sprite = this._createRegionAttachment(slot, attachment);
                        //slotContainer.addChild(sprite);
                        slotContainer.transform.addChild(sprite.transform);
                    }
                    slot.currentSprite = slot.sprites[spriteName];
                    slot.currentSpriteName = spriteName;

                }
            }

            var bone = slot.bone;

            transform = slotContainer.transform;
            transform.position.x = bone.worldX + attachment.x * bone.m00 + attachment.y * bone.m01;
            transform.position.y = bone.worldY + attachment.x * bone.m10 + attachment.y * bone.m11;
            transform.scale.x = bone.worldScaleX;
            transform.scale.y = bone.worldScaleY;

            transform.rotation = -(slot.bone.worldRotation * TO_RADS);

            slot.currentSprite.tint = Color.rgb2hex([slot.r,slot.g,slot.b]);
        }
        //else if (type === AttachmentType.skinnedmesh)
        //{
        //    if (!slot.currentMeshName || slot.currentMeshName !== attachment.name)
        //    {
        //        var meshName = attachment.name;
        //        if (slot.currentMesh !== undefined)
        //        {
        //            slot.currentMesh.visible = false;
        //        }
        //
        //        slot.meshes = slot.meshes || {};
        //
        //        if (slot.meshes[meshName] !== undefined)
        //        {
        //            slot.meshes[meshName].visible = true;
        //        }
        //        else
        //        {
        //            var mesh = this.createMesh(slot, attachment);
        //            slotContainer.addChild(mesh);
        //        }
        //
        //        slot.currentMesh = slot.meshes[meshName];
        //        slot.currentMeshName = meshName;
        //    }
        //
        //    attachment.computeWorldVertices(slot.bone.skeleton.x, slot.bone.skeleton.y, slot, slot.currentMesh.vertices);
        //
        //}
        else
        {
            slotContainer.setActive(false);
            continue;
        }
        slotContainer.setActive(true);

        //slotContainer.alpha = slot.a;
    }
};

Skeleton2D.prototype._clearSkeleton = function () {
    var i,n;
    for (i = 0; i < this.bones.length; i++) {
        this.bones[i].destroy();
    }
    this.bones.length = 0;

    for (i = 0; i < this.slots.length; i++) {
        this.slots[i].destroy();
    }
    this.slots.length = 0;
    this.drawOrder.length = 0;

    this.skin = undefined;

    for (i = 0, n = this.slotContainers.length; i < n; i++) {
        var slotContainer = this.slotContainers[i];
        slotContainer.destroy();
        this.slotContainers[i] = undefined;
    }
    this.slotContainers.length = 0;

    this.boneCache.length = 0;

    this.ready = false;
};
Skeleton2D.prototype._initSkeleton = function () {
    this._clearSkeleton();

    if(!this._data || !this._data.ready) return;

    var i,n;
    var gameObject = this.animator.gameObject;
    var transform = gameObject.transform;

    if(this.data)
    {
        this.init(this._data);

        //init animation data to animation state.
        this.animator.animationState.addAnimationDatas(this._data.animations);

        for (i = 0, n = this.drawOrder.length; i < n; i++) {
            var slot = this.drawOrder[i];
            var attachment = slot.attachment;
            var slotContainer = this._createSlot(slot);
            this.slotContainers.push(slotContainer);
            transform.addChild(slotContainer.transform);

            if (attachment.type === AttachmentType.region)
            {
                var spriteName = attachment.name;
                var sprite = this._createRegionAttachment(slot, attachment);
                slot.currentSprite = sprite;
                slot.currentSpriteName = spriteName;
                slotContainer.transform.addChild(sprite.transform);
            }
            //else if (attachment instanceof spine.MeshAttachment)
            //{
            //    var mesh = this.createMesh(slot, attachment);
            //    slot.currentMesh = mesh;
            //    slot.currentMeshName = attachment.name;
            //    slotContainer.addChild(mesh);
            //}
            else
            {
                continue;
            }

        }
    }
    else{

    }
    this.ready = true;
};
Skeleton2D.prototype._createSlot = function(slot){
    var gameObject = new GameObject().addComponents(Transform2D);
    gameObject.name = slot.name;
    return gameObject;
};

Skeleton2D.prototype._createRegionAttachment = function(slot, attachment){
    var gameObject = new GameObject().addComponents(Transform2D, Renderer2D);
    var transform = gameObject.transform;

    var sprite2d = gameObject.addComponent(Sprite2D);
    sprite2d.anchor.x = sprite2d.anchor.y = 0.5;
    this.animator.skin.applySkin(attachment.skinName, attachment.name, sprite2d);
    //var skinSSD = this.animator.skin.applySkin(attachment.skinName, attachment.name, sprite2d)//skinParts[attachment.skinName];
    //if(skinSSD && skinSSD.ready){
    //    sprite2d.texture = skinSSD.texture;
    //    sprite2d.textureClip = skinSSD.getFrameByName(attachment.name);
    //}

    var graphics = gameObject.addComponent(Graphics);

    gameObject.name = attachment.name;

    //graphics.beginFill(0xff0000);
    graphics.lineStyle(1,0xff0000);
    //graphics.drawRect(attachment.x, attachment.y, attachment.width, attachment.height);
    graphics.drawRect(0, 0, 4, 4);
    //graphics.endFill();
    transform.scale.set(attachment.scaleX, attachment.scaleY);
    transform.rotation = -attachment.rotation * TO_RADS;
    graphics.anchor.x = graphics.anchor.y = 0.5;

    var text2d = gameObject.addComponent(Text2D);
    text2d.text = attachment.name;
    text2d.setStyle({
        'font': "14px Arial",
        'fill': "#ffffff",
        'align': "center",
        //'stroke': "#FFFFFF",
        //'strokeThickness': 4
    });


    slot.sprites = slot.sprites || {};
    slot.sprites[attachment.name] = gameObject;

    return gameObject;
};


Skeleton2D.prototype.init = function (skeletonData) {
    //this.data = skeletonData;

    //this.bones = [];
    for (var i = 0, n = skeletonData.bones.length; i < n; i++) {
        var boneData = skeletonData.bones[i];
        var parent = !boneData.parent ? null : this.bones[skeletonData.bones.indexOf(boneData.parent)];
        this.bones.push(new Bone2D().init(boneData, this, parent));
    }

    //this.slots = [];
    //this.drawOrder = [];
    for (var i = 0, n = skeletonData.slots.length; i < n; i++) {
        var slotData = skeletonData.slots[i];
        var bone = this.bones[skeletonData.bones.indexOf(slotData.boneData)];
        var slot = new Slot2D().init(slotData, bone);
        this.slots.push(slot);
        this.drawOrder.push(slot);
    }

    //this.ikConstraints = [];
    //for (var i = 0, n = skeletonData.ikConstraints.length; i < n; i++)
    //    this.ikConstraints.push(new spine.IkConstraint(skeletonData.ikConstraints[i], this));

    //this.boneCache = [];
    this.updateCache();
};

/** Caches information about bones and IK constraints. Must be called if bones or IK constraints are added or removed. */
Skeleton2D.prototype.updateCache = function () {
    var ikConstraints = this.ikConstraints;
    var ikConstraintsCount = ikConstraints.length;

    var arrayCount = ikConstraintsCount + 1;
    var boneCache = this.boneCache;
    if (boneCache.length > arrayCount) boneCache.length = arrayCount;
    for (var i = 0, n = boneCache.length; i < n; i++)
        boneCache[i].length = 0;
    while (boneCache.length < arrayCount)
        boneCache[boneCache.length] = [];

    var nonIkBones = boneCache[0];
    var bones = this.bones;

    outer:
        for (var i = 0, n = bones.length; i < n; i++) {
            var bone = bones[i];
            var current = bone;
            do {
                for (var ii = 0; ii < ikConstraintsCount; ii++) {
                    var ikConstraint = ikConstraints[ii];
                    var parent = ikConstraint.bones[0];
                    var child = ikConstraint.bones[ikConstraint.bones.length - 1];
                    while (true) {
                        if (current == child) {
                            boneCache[ii].push(bone);
                            boneCache[ii + 1].push(bone);
                            continue outer;
                        }
                        if (child == parent) break;
                        child = child.parent;
                    }
                }
                current = current.parent;
            } while (current);
            nonIkBones[nonIkBones.length] = bone;
        }
};

/** Updates the world transform for each bone. */
Skeleton2D.prototype.updateWorldTransform = function () {
    var bones = this.bones;
    for (var i = 0, n = bones.length; i < n; i++) {
        var bone = bones[i];
        bone.rotationIK = bone.rotation;
    }
    var i = 0, last = this.boneCache.length - 1;
    while (true) {
        var cacheBones = this.boneCache[i];
        for (var ii = 0, nn = cacheBones.length; ii < nn; ii++)
            cacheBones[ii].updateWorldTransform();
        if (i == last) break;
        this.ikConstraints[i].apply();
        i++;
    }
};

/** Sets the bones and slots to their setup pose values. */
Skeleton2D.prototype.setToSetupPose = function () {
    this.setBonesToSetupPose();
    this.setSlotsToSetupPose();
};

Skeleton2D.prototype.setBonesToSetupPose = function () {
    var bones = this.bones;
    for (var i = 0, n = bones.length; i < n; i++)
        bones[i].setToSetupPose();

    var ikConstraints = this.ikConstraints;
    for (var i = 0, n = ikConstraints.length; i < n; i++) {
        var ikConstraint = ikConstraints[i];
        ikConstraint.bendDirection = ikConstraint.data.bendDirection;
        ikConstraint.mix = ikConstraint.data.mix;
    }
};

Skeleton2D.prototype.setSlotsToSetupPose = function () {
    var slots = this.slots;
    var drawOrder = this.drawOrder;
    for (var i = 0, n = slots.length; i < n; i++) {
        drawOrder[i] = slots[i];
        slots[i].setToSetupPose(i);
    }
};

/** @return May return null. */
Skeleton2D.prototype.getRootBone = function () {
    return this.bones.length ? this.bones[0] : null;
};

/** @return May be null. */
Skeleton2D.prototype.findBone = function (boneName) {
    var bones = this.bones;
    for (var i = 0, n = bones.length; i < n; i++)
        if (bones[i].data.name == boneName) return bones[i];
    return null;
};

/** @return -1 if the bone was not found. */
Skeleton2D.prototype.findBoneIndex = function (boneName) {
    var bones = this.bones;
    for (var i = 0, n = bones.length; i < n; i++)
        if (bones[i].data.name == boneName) return i;
    return -1;
};

/** @return May be null. */
Skeleton2D.prototype.findSlot = function (slotName) {
    var slots = this.slots;
    for (var i = 0, n = slots.length; i < n; i++)
        if (slots[i].data.name == slotName) return slots[i];
    return null;
};

/** @return -1 if the bone was not found. */
Skeleton2D.prototype.findSlotIndex = function (slotName) {
    var slots = this.slots;
    for (var i = 0, n = slots.length; i < n; i++)
        if (slots[i].data.name == slotName) return i;
    return -1;
};

Skeleton2D.prototype.setSkinByName = function (skinName) {
    var skin = this.data.findSkin(skinName);
    if (!skin) throw "Skin not found: " + skinName;
    this.setSkin(skin);
};

/** Sets the skin used to look up attachments before looking in the {@link SkeletonData#getDefaultSkin() default skin}.
 * Attachments from the new skin are attached if the corresponding attachment from the old skin was attached. If there was
 * no old skin, each slot's setup mode attachment is attached from the new skin.
 * @param newSkin May be null. */
Skeleton2D.prototype.setSkin = function (newSkin) {
    if (newSkin) {
        if (this.skin)
            newSkin._attachAll(this, this.skin);
        else {
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++) {
                var slot = slots[i];
                var name = slot.data.attachmentName;
                if (name) {
                    var attachment = newSkin.getAttachment(i, name);
                    if (attachment) slot.setAttachment(attachment);
                }
            }
        }
    }
    this.skin = newSkin;
};

/** @return May be null. */
Skeleton2D.prototype.getAttachmentBySlotName = function (slotName, attachmentName) {
    return this.getAttachmentBySlotIndex(this.data.findSlotIndex(slotName), attachmentName);
};

/** @return May be null. */
Skeleton2D.prototype.getAttachmentBySlotIndex = function (slotIndex, attachmentName) {
    if (this.skin) {
        var attachment = this.skin.getAttachment(slotIndex, attachmentName);
        if (attachment) return attachment;
    }
    if (this.data.defaultSkin) return this.data.defaultSkin.getAttachment(slotIndex, attachmentName);
    return null;
};

/** @param attachmentName May be null. */
Skeleton2D.prototype.setAttachment = function (slotName, attachmentName) {
    var slots = this.slots;
    for (var i = 0, n = slots.length; i < n; i++) {
        var slot = slots[i];
        if (slot.data.name == slotName) {
            var attachment = null;
            if (attachmentName) {
                attachment = this.getAttachmentBySlotIndex(i, attachmentName);
                if (!attachment) throw "Attachment not found: " + attachmentName + ", for slot: " + slotName;
            }
            slot.setAttachment(attachment);
            return;
        }
    }
    throw "Slot not found: " + slotName;
};

/** @return May be null. */
Skeleton2D.prototype.findIkConstraint = function (ikConstraintName) {
    var ikConstraints = this.ikConstraints;
    for (var i = 0, n = ikConstraints.length; i < n; i++)
        if (ikConstraints[i].data.name == ikConstraintName) return ikConstraints[i];
    return null;
};

//Skeleton2D.prototype.update = function (delta) {
//    this.time += delta;
//};

function Bone2D() {
    Class.call(this);

    this.data = undefined;
    this.skeleton = undefined;
    this.parent = undefined;

    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.rotationIK = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.flipX = false;
    this.flipY = false;
    this.m00 = 0; //a
    this.m01 = 0; //b
    this.worldX = 0; // x
    this.m10 = 0; //c
    this.m11 = 0; //d
    this.worldY = 0; // y
    this.worldRotation = 0;
    this.worldScaleX = 1;
    this.worldScaleY = 1;
    this.worldFlipX = false;
    this.worldFlipY = false;
}
Class.extend(Bone2D);

Bone2D.prototype.init = function (boneData, skeleton, parent) {
    this.data = boneData;
    this.skeleton = skeleton;
    this.parent = parent;
    this.setToSetupPose();
    return this;
};
Bone2D.yDown = true;
Bone2D.prototype.updateWorldTransform = function () {
    var parent = this.parent;
    if (parent) {
        this.worldX = this.x * parent.m00 + this.y * parent.m01 + parent.worldX;
        this.worldY = this.x * parent.m10 + this.y * parent.m11 + parent.worldY;
        if (this.data.inheritScale) {
            this.worldScaleX = parent.worldScaleX * this.scaleX;
            this.worldScaleY = parent.worldScaleY * this.scaleY;
        } else {
            this.worldScaleX = this.scaleX;
            this.worldScaleY = this.scaleY;
        }
        this.worldRotation = this.data.inheritRotation ? (parent.worldRotation + this.rotationIK) : this.rotationIK;
        this.worldFlipX = parent.worldFlipX != this.flipX;
        this.worldFlipY = parent.worldFlipY != this.flipY;
    } else {
        var skeletonFlipX = this.skeleton.flipX, skeletonFlipY = this.skeleton.flipY;
        this.worldX = skeletonFlipX ? -this.x : this.x;
        this.worldY = (skeletonFlipY != Bone2D.yDown) ? -this.y : this.y;
        this.worldScaleX = this.scaleX;
        this.worldScaleY = this.scaleY;
        this.worldRotation = this.rotationIK;
        this.worldFlipX = skeletonFlipX != this.flipX;
        this.worldFlipY = skeletonFlipY != this.flipY;
    }
    var radians = this.worldRotation * Mathf.TO_RADS;
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    if (this.worldFlipX) {
        this.m00 = -cos * this.worldScaleX;
        this.m01 = sin * this.worldScaleY;
    } else {
        this.m00 = cos * this.worldScaleX;
        this.m01 = -sin * this.worldScaleY;
    }
    if (this.worldFlipY != Bone2D.yDown) {
        this.m10 = -sin * this.worldScaleX;
        this.m11 = -cos * this.worldScaleY;
    } else {
        this.m10 = sin * this.worldScaleX;
        this.m11 = cos * this.worldScaleY;
    }
};

Bone2D.prototype.setToSetupPose = function () {
    var data = this.data;
    this.x = data.x;
    this.y = data.y;
    this.rotation = data.rotation;
    this.rotationIK = this.rotation;
    this.scaleX = data.scaleX;
    this.scaleY = data.scaleY;
    this.flipX = data.flipX;
    this.flipY = data.flipY;
};
Bone2D.prototype.worldToLocal = function (world) {
    var dx = world[0] - this.worldX, dy = world[1] - this.worldY;
    var m00 = this.m00, m10 = this.m10, m01 = this.m01, m11 = this.m11;
    if (this.worldFlipX != (this.worldFlipY != Bone2D.yDown)) {
        m00 = -m00;
        m11 = -m11;
    }
    var invDet = 1 / (m00 * m11 - m01 * m10);
    world[0] = dx * m00 * invDet - dy * m01 * invDet;
    world[1] = dy * m11 * invDet - dx * m10 * invDet;
};
Bone2D.prototype.localToWorld = function (local) {
    var localX = local[0], localY = local[1];
    local[0] = localX * this.m00 + localY * this.m01 + this.worldX;
    local[1] = localX * this.m10 + localY * this.m11 + this.worldY;
};

function Slot2D() {
    Class.call(this);
    this.data = undefined;
    this.bone = undefined;
    this.r = 1;
    this.g = 1;
    this.b = 1;
    this.a = 1;
    this._attachmentTime = 0;
    this.attachment = null;
    this.attachmentVertices = [];
}
Class.extend(Slot2D);

Slot2D.prototype.init = function (slotData, bone) {
    this.data = slotData;
    this.bone = bone;
    this.setToSetupPose();
    return this;
};
Slot2D.prototype.setAttachment = function (attachment) {
    this.attachment = attachment;
    this._attachmentTime = this.bone.skeleton.time;
    this.attachmentVertices.length = 0;
};
Slot2D.prototype.setAttachmentTime = function (time) {
    this._attachmentTime = this.bone.skeleton.time - time;
};
Slot2D.prototype.getAttachmentTime = function () {
    return this.bone.skeleton.time - this._attachmentTime;
};
Slot2D.prototype.setToSetupPose = function () {
    var data = this.data;
    this.r = data.r;
    this.g = data.g;
    this.b = data.b;
    this.a = data.a;

    var slotDatas = this.bone.skeleton.data.slots;
    for (var i = 0, n = slotDatas.length; i < n; i++) {
        if (slotDatas[i] == data) {
            this.setAttachment(!data.attachmentName ? null : this.bone.skeleton.getAttachmentBySlotIndex(i, data.attachmentName));
            break;
        }
    }
};

//function IkConstraint2D() {
//    this.data = undefined;
//    this.mix = 1;
//    this.bendDirection = 1;
//
//    this.bones = undefined;
//    this.target = undefined;
//}
//
//IkConstraint2D.prototype.init = function (data, skeleton) {
//    this.data = data;
//    this.mix = data.mix;
//    this.bendDirection = data.bendDirection;
//
//    this.bones = [];
//    for (var i = 0, n = data.bones.length; i < n; i++)
//        this.bones.push(skeleton.findBone(data.bones[i].name));
//    this.target = skeleton.findBone(data.target.name);
//};
//IkConstraint2D.prototype.apply = function () {
//    var target = this.target;
//    var bones = this.bones;
//    switch (bones.length) {
//        case 1:
//            IkConstraint2D.apply1(bones[0], target.worldX, target.worldY, this.mix);
//            break;
//        case 2:
//            IkConstraint2D.apply2(bones[0], bones[1], target.worldX, target.worldY, this.bendDirection, this.mix);
//            break;
//    }
//};
//
///** Adjusts the bone rotation so the tip is as close to the target position as possible. The target is specified in the world
// * coordinate system. */
//IkConstraint2D.apply1 = function (bone, targetX, targetY, alpha) {
//    var parentRotation = (!bone.data.inheritRotation || !bone.parent) ? 0 : bone.parent.worldRotation;
//    var rotation = bone.rotation;
//    var rotationIK = Math.atan2(targetY - bone.worldY, targetX - bone.worldX) * spine.radDeg - parentRotation;
//    bone.rotationIK = rotation + (rotationIK - rotation) * alpha;
//};
///** Adjusts the parent and child bone rotations so the tip of the child is as close to the target position as possible. The
// * target is specified in the world coordinate system.
// * @param child Any descendant bone of the parent. */
//IkConstraint2D.apply2 = function (parent, child, targetX, targetY, bendDirection, alpha) {
//    var childRotation = child.rotation, parentRotation = parent.rotation;
//    if (!alpha) {
//        child.rotationIK = childRotation;
//        parent.rotationIK = parentRotation;
//        return;
//    }
//    var positionX, positionY, tempPosition = spine.temp;
//    var parentParent = parent.parent;
//    if (parentParent) {
//        tempPosition[0] = targetX;
//        tempPosition[1] = targetY;
//        parentParent.worldToLocal(tempPosition);
//        targetX = (tempPosition[0] - parent.x) * parentParent.worldScaleX;
//        targetY = (tempPosition[1] - parent.y) * parentParent.worldScaleY;
//    } else {
//        targetX -= parent.x;
//        targetY -= parent.y;
//    }
//    if (child.parent == parent) {
//        positionX = child.x;
//        positionY = child.y;
//    } else {
//        tempPosition[0] = child.x;
//        tempPosition[1] = child.y;
//        child.parent.localToWorld(tempPosition);
//        parent.worldToLocal(tempPosition);
//        positionX = tempPosition[0];
//        positionY = tempPosition[1];
//    }
//    var childX = positionX * parent.worldScaleX, childY = positionY * parent.worldScaleY;
//    var offset = Math.atan2(childY, childX);
//    var len1 = Math.sqrt(childX * childX + childY * childY), len2 = child.data.length * child.worldScaleX;
//    // Based on code by Ryan Juckett with permission: Copyright (c) 2008-2009 Ryan Juckett, http://www.ryanjuckett.com/
//    var cosDenom = 2 * len1 * len2;
//    if (cosDenom < 0.0001) {
//        child.rotationIK = childRotation + (Math.atan2(targetY, targetX) * spine.radDeg - parentRotation - childRotation) * alpha;
//        return;
//    }
//    var cos = (targetX * targetX + targetY * targetY - len1 * len1 - len2 * len2) / cosDenom;
//    if (cos < -1)
//        cos = -1;
//    else if (cos > 1)
//        cos = 1;
//    var childAngle = Math.acos(cos) * bendDirection;
//    var adjacent = len1 + len2 * cos, opposite = len2 * Math.sin(childAngle);
//    var parentAngle = Math.atan2(targetY * adjacent - targetX * opposite, targetX * adjacent + targetY * opposite);
//    var rotation = (parentAngle - offset) * spine.radDeg - parentRotation;
//    if (rotation > 180)
//        rotation -= 360;
//    else if (rotation < -180) //
//        rotation += 360;
//    parent.rotationIK = parentRotation + rotation * alpha;
//    rotation = (childAngle + offset) * spine.radDeg - childRotation;
//    if (rotation > 180)
//        rotation -= 360;
//    else if (rotation < -180) //
//        rotation += 360;
//    child.rotationIK = childRotation + (rotation + parent.worldRotation - child.parent.worldRotation) * alpha;
//};


Skeleton2D.Bone2D = Bone2D;
Skeleton2D.Slot2D = Slot2D;
//Skeleton2D.IkConstraint2D = IkConstraint2D;

module.exports = Skeleton2D;
