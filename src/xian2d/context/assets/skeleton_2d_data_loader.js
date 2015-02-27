/**
 * Created by Dianyan on 2014/12/31.
 */
//var Assets = require('../../../context/assets/assets');
var AssetLoader = require('../../../context/assets/asset_loader');
var Skeleton2DData = require('./skeleton_2d_data');
var Bone2DData = Skeleton2DData.Bone2DData;
var Slot2DData = Skeleton2DData.Slot2DData;
//var IkConstraint2DData = Skeleton2DData.IkConstraint2DData;
var SkinData = Skeleton2DData.SkinData;
var AttachmentType = Skeleton2DData.AttachmentType;
var RegionAttachmentData = Skeleton2DData.RegionAttachmentData;

var Animation2DData = require('./animation_2d_data');
var Curves2DData = Animation2DData.Curves2DData;
var Timeline2DType = Animation2DData.Timeline2DType;
var RotateTimeline2DData = Animation2DData.RotateTimeline2DData;
var TranslateTimeline2DData = Animation2DData.TranslateTimeline2DData;
var ScaleTimeline2DData = Animation2DData.ScaleTimeline2DData;
var ColorTimeline2DData = Animation2DData.ColorTimeline2DData;
var AttachmentTimeline2DData = Animation2DData.AttachmentTimeline2DData;

var util = require("../../../base/util");
var ajax = util.ajax;
'use strict';

function Skeleton2DDataLoader(){
    AssetLoader.call(this);
    this._data = undefined;
    this.scale = 1;

}
Skeleton2DDataLoader.prototype = Object.create(AssetLoader.prototype);
Skeleton2DDataLoader.prototype.constructor = Skeleton2DDataLoader;

Skeleton2DDataLoader.prototype.load = function(asset){

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

Skeleton2DDataLoader.prototype.init = function(asset){
    this.asset = asset;

    var loader = this;
    var json = this._data;

    if(!json.bones || !json.slots){
        loader.emit("errorInit", loader, asset, new Error("data format error"));
        return;
    }

    //this.readSkeletonData(json);
    try{
        this.readSkeletonData(json);
        this.emit("inited", this, asset);
    }
    catch (e){
        this.emit("errorInit", this, asset, e);
    }

    //var texture = this.assets.load(textureUrl, "Texture");
    //asset.texture = texture;
    //if(texture.ready){
    //    this.emit("inited", this, asset);
    //}
    //else{
    //    texture.on("inited", this._onTextureInited.bind(this));
    //}
};

Skeleton2DDataLoader.prototype._onTextureInited = function(asset){
    asset.off("inited", this._onTextureInited.bind(this));
    this.emit("inited", this, this.asset);
};

Skeleton2DDataLoader.prototype.destroy = function() {
    AssetLoader.prototype.destroy.call(this);

    this._data = undefined;
};

Skeleton2DDataLoader.prototype.readSkeletonData = function (root, name) {
    var skeletonData = this.asset;//new spine.SkeletonData();
    skeletonData.name = name;

    // Skeleton.
    var skeletonMap = root["skeleton"];
    if (skeletonMap) {
        skeletonData.hash = skeletonMap["hash"];
        skeletonData.version = skeletonMap["spine"];
        skeletonData.width = skeletonMap["width"] || 0;
        skeletonData.height = skeletonMap["height"] || 0;
    }

    // Bones.
    var bones = root["bones"];
    for (var i = 0, n = bones.length; i < n; i++) {
        var boneMap = bones[i];
        var parent = null;
        if (boneMap["parent"]) {
            parent = skeletonData.findBone(boneMap["parent"]);
            if (!parent) throw "Parent bone not found: " + boneMap["parent"];
        }
        var boneData = new Bone2DData(boneMap["name"], parent);
        boneData.length = (boneMap["length"] || 0) * this.scale;
        boneData.x = (boneMap["x"] || 0) * this.scale;
        boneData.y = (boneMap["y"] || 0) * this.scale;
        boneData.rotation = (boneMap["rotation"] || 0);
        boneData.scaleX = boneMap.hasOwnProperty("scaleX") ? boneMap["scaleX"] : 1;
        boneData.scaleY = boneMap.hasOwnProperty("scaleY") ? boneMap["scaleY"] : 1;
        boneData.inheritScale = boneMap.hasOwnProperty("inheritScale") ? boneMap["inheritScale"] : true;
        boneData.inheritRotation = boneMap.hasOwnProperty("inheritRotation") ? boneMap["inheritRotation"] : true;
        skeletonData.bones.push(boneData);
    }

    //// IK constraints.
    //var ik = root["ik"];
    //if (ik) {
    //    for (var i = 0, n = ik.length; i < n; i++) {
    //        var ikMap = ik[i];
    //        var ikConstraintData = new IkConstraint2DData(ikMap["name"]);
    //
    //        var bones = ikMap["bones"];
    //        for (var ii = 0, nn = bones.length; ii < nn; ii++) {
    //            var bone = skeletonData.findBone(bones[ii]);
    //            if (!bone) throw "IK bone not found: " + bones[ii];
    //            ikConstraintData.bones.push(bone);
    //        }
    //
    //        ikConstraintData.target = skeletonData.findBone(ikMap["target"]);
    //        if (!ikConstraintData.target) throw "Target bone not found: " + ikMap["target"];
    //
    //        ikConstraintData.bendDirection = (!ikMap.hasOwnProperty("bendPositive") || ikMap["bendPositive"]) ? 1 : -1;
    //        ikConstraintData.mix = ikMap.hasOwnProperty("mix") ? ikMap["mix"] : 1;
    //
    //        skeletonData.ikConstraints.push(ikConstraintData);
    //    }
    //}

    // Slots.
    var slots = root["slots"];
    for (var i = 0, n = slots.length; i < n; i++) {
        var slotMap = slots[i];
        var boneData = skeletonData.findBone(slotMap["bone"]);
        if (!boneData) throw "Slot bone not found: " + slotMap["bone"];
        var slotData = new Slot2DData(slotMap["name"], boneData);

        var color = slotMap["color"];
        if (color) {
            slotData.r = this.toColor(color, 0);
            slotData.g = this.toColor(color, 1);
            slotData.b = this.toColor(color, 2);
            slotData.a = this.toColor(color, 3);
        }

        slotData.attachmentName = slotMap["attachment"];
        slotData.additiveBlending = slotMap["additive"] && slotMap["additive"] == "true";

        skeletonData.slots.push(slotData);
    }

    // Skins.
    var skins = root["skins"];
    for (var skinName in skins) {
        if (!skins.hasOwnProperty(skinName)) continue;
        var skinMap = skins[skinName];
        var skin = new SkinData(skinName);
        for (var slotName in skinMap) {
            if (!skinMap.hasOwnProperty(slotName)) continue;
            var slotIndex = skeletonData.findSlotIndex(slotName);
            var slotEntry = skinMap[slotName];
            for (var attachmentName in slotEntry) {
                if (!slotEntry.hasOwnProperty(attachmentName)) continue;
                var attachment = this.readAttachment(skin, attachmentName, slotEntry[attachmentName]);
                if (attachment) skin.addAttachment(slotIndex, attachmentName, attachment);
            }
        }
        skeletonData.skins.push(skin);
        if (skin.name == "default") skeletonData.defaultSkin = skin;
    }

    //// Events.
    //var events = root["events"];
    //for (var eventName in events) {
    //    if (!events.hasOwnProperty(eventName)) continue;
    //    var eventMap = events[eventName];
    //    var eventData = new spine.EventData(eventName);
    //    eventData.intValue = eventMap["int"] || 0;
    //    eventData.floatValue = eventMap["float"] || 0;
    //    eventData.stringValue = eventMap["string"] || null;
    //    skeletonData.events.push(eventData);
    //}

    // Animations.
    var animations = root["animations"];
    for (var animationName in animations) {
        if (!animations.hasOwnProperty(animationName)) continue;
        this.readAnimation(animationName, animations[animationName], skeletonData);
    }

    return skeletonData;
};

Skeleton2DDataLoader.prototype.readAttachment = function (skin, name, map) {
    name = map["name"] || name;

    var type = AttachmentType[map["type"] || "region"];
    var path = map["path"] || name;

    var scale = this.scale;
    if (type == AttachmentType.region) {
        var region = new RegionAttachmentData(name);//this.attachmentLoader.newRegionAttachment(skin, name, path);
        if (!region) return null;
        //region.path = path;
        region.x = (map["x"] || 0) * scale;
        region.y = (map["y"] || 0) * scale;
        region.scaleX = map.hasOwnProperty("scaleX") ? map["scaleX"] : 1;
        region.scaleY = map.hasOwnProperty("scaleY") ? map["scaleY"] : 1;
        region.rotation = map["rotation"] || 0;
        region.width = (map["width"] || 0) * scale;
        region.height = (map["height"] || 0) * scale;

        var color = map["color"];
        if (color) {
            region.r = this.toColor(color, 0);
            region.g = this.toColor(color, 1);
            region.b = this.toColor(color, 2);
            region.a = this.toColor(color, 3);
        }

        //region.updateOffset();
        return region;
    }
    //else if (type == spine.AttachmentType.mesh) {
    //    var mesh = this.attachmentLoader.newMeshAttachment(skin, name, path);
    //    if (!mesh) return null;
    //    mesh.path = path;
    //    mesh.vertices = this.getFloatArray(map, "vertices", scale);
    //    mesh.triangles = this.getIntArray(map, "triangles");
    //    mesh.regionUVs = this.getFloatArray(map, "uvs", 1);
    //    mesh.updateUVs();
    //
    //    color = map["color"];
    //    if (color) {
    //        mesh.r = this.toColor(color, 0);
    //        mesh.g = this.toColor(color, 1);
    //        mesh.b = this.toColor(color, 2);
    //        mesh.a = this.toColor(color, 3);
    //    }
    //
    //    mesh.hullLength = (map["hull"] || 0) * 2;
    //    if (map["edges"]) mesh.edges = this.getIntArray(map, "edges");
    //    mesh.width = (map["width"] || 0) * scale;
    //    mesh.height = (map["height"] || 0) * scale;
    //    return mesh;
    //} else if (type == spine.AttachmentType.skinnedmesh) {
    //    var mesh = this.attachmentLoader.newSkinnedMeshAttachment(skin, name, path);
    //    if (!mesh) return null;
    //    mesh.path = path;
    //
    //    var uvs = this.getFloatArray(map, "uvs", 1);
    //    var vertices = this.getFloatArray(map, "vertices", 1);
    //    var weights = [];
    //    var bones = [];
    //    for (var i = 0, n = vertices.length; i < n; ) {
    //        var boneCount = vertices[i++] | 0;
    //        bones[bones.length] = boneCount;
    //        for (var nn = i + boneCount * 4; i < nn; ) {
    //            bones[bones.length] = vertices[i];
    //            weights[weights.length] = vertices[i + 1] * scale;
    //            weights[weights.length] = vertices[i + 2] * scale;
    //            weights[weights.length] = vertices[i + 3];
    //            i += 4;
    //        }
    //    }
    //    mesh.bones = bones;
    //    mesh.weights = weights;
    //    mesh.triangles = this.getIntArray(map, "triangles");
    //    mesh.regionUVs = uvs;
    //    mesh.updateUVs();
    //
    //    color = map["color"];
    //    if (color) {
    //        mesh.r = this.toColor(color, 0);
    //        mesh.g = this.toColor(color, 1);
    //        mesh.b = this.toColor(color, 2);
    //        mesh.a = this.toColor(color, 3);
    //    }
    //
    //    mesh.hullLength = (map["hull"] || 0) * 2;
    //    if (map["edges"]) mesh.edges = this.getIntArray(map, "edges");
    //    mesh.width = (map["width"] || 0) * scale;
    //    mesh.height = (map["height"] || 0) * scale;
    //    return mesh;
    //} else if (type == spine.AttachmentType.boundingbox) {
    //    var attachment = this.attachmentLoader.newBoundingBoxAttachment(skin, name);
    //    var vertices = map["vertices"];
    //    for (var i = 0, n = vertices.length; i < n; i++)
    //        attachment.vertices.push(vertices[i] * scale);
    //    return attachment;
    //}
    throw "Unknown attachment type: " + type;
};

Skeleton2DDataLoader.prototype.readAnimation = function (name, map, skeletonData) {
    var timelines = [];
    var duration = 0;

    var slots = map["slots"];
    for (var slotName in slots) {
        if (!slots.hasOwnProperty(slotName)) continue;
        var slotMap = slots[slotName];
        var slotIndex = skeletonData.findSlotIndex(slotName);

        for (var timelineName in slotMap) {
            if (!slotMap.hasOwnProperty(timelineName)) continue;
            var values = slotMap[timelineName];
            if (timelineName == "color") {
                var timeline = new ColorTimeline2DData().init(values.length);
                timeline.slotIndex = slotIndex;

                var frameIndex = 0;
                for (var i = 0, n = values.length; i < n; i++) {
                    var valueMap = values[i];
                    var color = valueMap["color"];
                    var r = this.toColor(color, 0);
                    var g = this.toColor(color, 1);
                    var b = this.toColor(color, 2);
                    var a = this.toColor(color, 3);
                    timeline.setFrame(frameIndex, valueMap["time"], r, g, b, a);
                    this.readCurve(timeline, frameIndex, valueMap);
                    frameIndex++;
                }
                timelines.push(timeline);
                duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 5 - 5]);

            } else if (timelineName == "attachment") {
                var timeline = new AttachmentTimeline2DData().init(values.length);
                timeline.slotIndex = slotIndex;

                var frameIndex = 0;
                for (var i = 0, n = values.length; i < n; i++) {
                    var valueMap = values[i];
                    timeline.setFrame(frameIndex++, valueMap["time"], valueMap["name"]);
                }
                timelines.push(timeline);
                duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);

            } else
                throw "Invalid timeline type for a slot: " + timelineName + " (" + slotName + ")";
        }
    }

    var bones = map["bones"];
    for (var boneName in bones) {
        if (!bones.hasOwnProperty(boneName)) continue;
        var boneIndex = skeletonData.findBoneIndex(boneName);
        if (boneIndex == -1) throw "Bone not found: " + boneName;
        var boneMap = bones[boneName];

        for (var timelineName in boneMap) {
            if (!boneMap.hasOwnProperty(timelineName)) continue;
            var values = boneMap[timelineName];
            if (timelineName == "rotate") {
                var timeline = new RotateTimeline2DData().init(values.length);
                timeline.boneIndex = boneIndex;

                var frameIndex = 0;
                for (var i = 0, n = values.length; i < n; i++) {
                    var valueMap = values[i];
                    timeline.setFrame(frameIndex, valueMap["time"], valueMap["angle"]);
                    this.readCurve(timeline, frameIndex, valueMap);
                    frameIndex++;
                }
                timelines.push(timeline);
                duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 2 - 2]);

            } else if (timelineName == "translate" || timelineName == "scale") {
                var timeline;
                var timelineScale = 1;
                if (timelineName == "scale")
                    timeline = new ScaleTimeline2DData().init(values.length);
                else {
                    timeline = new TranslateTimeline2DData().init(values.length);
                    timelineScale = this.scale;
                }
                timeline.boneIndex = boneIndex;

                var frameIndex = 0;
                for (var i = 0, n = values.length; i < n; i++) {
                    var valueMap = values[i];
                    var x = (valueMap["x"] || 0) * timelineScale;
                    var y = (valueMap["y"] || 0) * timelineScale;
                    timeline.setFrame(frameIndex, valueMap["time"], x, y);
                    this.readCurve(timeline, frameIndex, valueMap);
                    frameIndex++;
                }
                timelines.push(timeline);
                duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 3 - 3]);

            }
            //else if (timelineName == "flipX" || timelineName == "flipY") {
            //    var x = timelineName == "flipX";
            //    var timeline = x ? new spine.FlipXTimeline(values.length) : new spine.FlipYTimeline(values.length);
            //    timeline.boneIndex = boneIndex;
            //
            //    var field = x ? "x" : "y";
            //    var frameIndex = 0;
            //    for (var i = 0, n = values.length; i < n; i++) {
            //        var valueMap = values[i];
            //        timeline.setFrame(frameIndex, valueMap["time"], valueMap[field] || false);
            //        frameIndex++;
            //    }
            //    timelines.push(timeline);
            //    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 2 - 2]);
            //}
            else
                throw "Invalid timeline type for a bone: " + timelineName + " (" + boneName + ")";
        }
    }

    //var ikMap = map["ik"];
    //for (var ikConstraintName in ikMap) {
    //    if (!ikMap.hasOwnProperty(ikConstraintName)) continue;
    //    var ikConstraint = skeletonData.findIkConstraint(ikConstraintName);
    //    var values = ikMap[ikConstraintName];
    //    var timeline = new spine.IkConstraintTimeline(values.length);
    //    timeline.ikConstraintIndex = skeletonData.ikConstraints.indexOf(ikConstraint);
    //    var frameIndex = 0;
    //    for (var i = 0, n = values.length; i < n; i++) {
    //        var valueMap = values[i];
    //        var mix = valueMap.hasOwnProperty("mix") ? valueMap["mix"] : 1;
    //        var bendDirection = (!valueMap.hasOwnProperty("bendPositive") || valueMap["bendPositive"]) ? 1 : -1;
    //        timeline.setFrame(frameIndex, valueMap["time"], mix, bendDirection);
    //        this.readCurve(timeline, frameIndex, valueMap);
    //        frameIndex++;
    //    }
    //    timelines.push(timeline);
    //    duration = Math.max(duration, timeline.frames[timeline.frameCount * 3 - 3]);
    //}
    //
    //var ffd = map["ffd"];
    //for (var skinName in ffd) {
    //    var skin = skeletonData.findSkin(skinName);
    //    var slotMap = ffd[skinName];
    //    for (slotName in slotMap) {
    //        var slotIndex = skeletonData.findSlotIndex(slotName);
    //        var meshMap = slotMap[slotName];
    //        for (var meshName in meshMap) {
    //            var values = meshMap[meshName];
    //            var timeline = new spine.FfdTimeline(values.length);
    //            var attachment = skin.getAttachment(slotIndex, meshName);
    //            if (!attachment) throw "FFD attachment not found: " + meshName;
    //            timeline.slotIndex = slotIndex;
    //            timeline.attachment = attachment;
    //
    //            var isMesh = attachment.type == spine.AttachmentType.mesh;
    //            var vertexCount;
    //            if (isMesh)
    //                vertexCount = attachment.vertices.length;
    //            else
    //                vertexCount = attachment.weights.length / 3 * 2;
    //
    //            var frameIndex = 0;
    //            for (var i = 0, n = values.length; i < n; i++) {
    //                var valueMap = values[i];
    //                var vertices;
    //                if (!valueMap["vertices"]) {
    //                    if (isMesh)
    //                        vertices = attachment.vertices;
    //                    else {
    //                        vertices = [];
    //                        vertices.length = vertexCount;
    //                    }
    //                } else {
    //                    var verticesValue = valueMap["vertices"];
    //                    var vertices = [];
    //                    vertices.length = vertexCount;
    //                    var start = valueMap["offset"] || 0;
    //                    var nn = verticesValue.length;
    //                    if (this.scale == 1) {
    //                        for (var ii = 0; ii < nn; ii++)
    //                            vertices[ii + start] = verticesValue[ii];
    //                    } else {
    //                        for (var ii = 0; ii < nn; ii++)
    //                            vertices[ii + start] = verticesValue[ii] * this.scale;
    //                    }
    //                    if (isMesh) {
    //                        var meshVertices = attachment.vertices;
    //                        for (var ii = 0, nn = vertices.length; ii < nn; ii++)
    //                            vertices[ii] += meshVertices[ii];
    //                    }
    //                }
    //
    //                timeline.setFrame(frameIndex, valueMap["time"], vertices);
    //                this.readCurve(timeline, frameIndex, valueMap);
    //                frameIndex++;
    //            }
    //            timelines[timelines.length] = timeline;
    //            duration = Math.max(duration, timeline.frames[timeline.frameCount - 1]);
    //        }
    //    }
    //}
    //
    //var drawOrderValues = map["drawOrder"];
    //if (!drawOrderValues) drawOrderValues = map["draworder"];
    //if (drawOrderValues) {
    //    var timeline = new spine.DrawOrderTimeline(drawOrderValues.length);
    //    var slotCount = skeletonData.slots.length;
    //    var frameIndex = 0;
    //    for (var i = 0, n = drawOrderValues.length; i < n; i++) {
    //        var drawOrderMap = drawOrderValues[i];
    //        var drawOrder = null;
    //        if (drawOrderMap["offsets"]) {
    //            drawOrder = [];
    //            drawOrder.length = slotCount;
    //            for (var ii = slotCount - 1; ii >= 0; ii--)
    //                drawOrder[ii] = -1;
    //            var offsets = drawOrderMap["offsets"];
    //            var unchanged = [];
    //            unchanged.length = slotCount - offsets.length;
    //            var originalIndex = 0, unchangedIndex = 0;
    //            for (var ii = 0, nn = offsets.length; ii < nn; ii++) {
    //                var offsetMap = offsets[ii];
    //                var slotIndex = skeletonData.findSlotIndex(offsetMap["slot"]);
    //                if (slotIndex == -1) throw "Slot not found: " + offsetMap["slot"];
    //                // Collect unchanged items.
    //                while (originalIndex != slotIndex)
    //                    unchanged[unchangedIndex++] = originalIndex++;
    //                // Set changed items.
    //                drawOrder[originalIndex + offsetMap["offset"]] = originalIndex++;
    //            }
    //            // Collect remaining unchanged items.
    //            while (originalIndex < slotCount)
    //                unchanged[unchangedIndex++] = originalIndex++;
    //            // Fill in unchanged items.
    //            for (var ii = slotCount - 1; ii >= 0; ii--)
    //                if (drawOrder[ii] == -1) drawOrder[ii] = unchanged[--unchangedIndex];
    //        }
    //        timeline.setFrame(frameIndex++, drawOrderMap["time"], drawOrder);
    //    }
    //    timelines.push(timeline);
    //    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
    //}
    //
    //var events = map["events"];
    //if (events) {
    //    var timeline = new spine.EventTimeline(events.length);
    //    var frameIndex = 0;
    //    for (var i = 0, n = events.length; i < n; i++) {
    //        var eventMap = events[i];
    //        var eventData = skeletonData.findEvent(eventMap["name"]);
    //        if (!eventData) throw "Event not found: " + eventMap["name"];
    //        var event = new spine.Event(eventData);
    //        event.intValue = eventMap.hasOwnProperty("int") ? eventMap["int"] : eventData.intValue;
    //        event.floatValue = eventMap.hasOwnProperty("float") ? eventMap["float"] : eventData.floatValue;
    //        event.stringValue = eventMap.hasOwnProperty("string") ? eventMap["string"] : eventData.stringValue;
    //        timeline.setFrame(frameIndex++, eventMap["time"], event);
    //    }
    //    timelines.push(timeline);
    //    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
    //}

    skeletonData.animations.push(new Animation2DData(name, timelines, duration));
};

Skeleton2DDataLoader.prototype.readCurve = function (timeline, frameIndex, valueMap) {
    var curve = valueMap["curve"];
    if (!curve)
        timeline.curves.setLinear(frameIndex);
    else if (curve == "stepped")
        timeline.curves.setStepped(frameIndex);
    else if (curve instanceof Array)
        timeline.curves.setCurve(frameIndex, curve[0], curve[1], curve[2], curve[3]);
};

Skeleton2DDataLoader.prototype.toColor = function (hexString, colorIndex) {
    if (hexString.length != 8) throw "Color hexidecimal length must be 8, recieved: " + hexString;
    return parseInt(hexString.substring(colorIndex * 2, (colorIndex * 2) + 2), 16) / 255;
};

Skeleton2DDataLoader.prototype.getFloatArray = function (map, name, scale) {
    var list = map[name];
    var values = new spine.Float32Array(list.length);
    var i = 0, n = list.length;
    if (scale == 1) {
        for (; i < n; i++)
            values[i] = list[i];
    } else {
        for (; i < n; i++)
            values[i] = list[i] * scale;
    }
    return values;
};

Skeleton2DDataLoader.prototype.getIntArray = function (map, name) {
    var list = map[name];
    var values = new spine.Uint16Array(list.length);
    for (var i = 0, n = list.length; i < n; i++)
        values[i] = list[i] | 0;
    return values;
};

module.exports = Skeleton2DDataLoader;
