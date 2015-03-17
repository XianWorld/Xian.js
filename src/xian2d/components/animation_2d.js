/**
 * Created by Dianyan on 2015/2/7.
 */
var Class = require("../../base/class");

var Skeleton2DData = require('../context/assets/skeleton_2d_data');
var Bone2DData = Skeleton2DData.Bone2DData;
var Slot2DData = Skeleton2DData.Slot2DData;
//var IkConstraint2DData = Skeleton2DData.IkConstraint2DData;
var SkinData = Skeleton2DData.SkinData;
var AttachmentType = Skeleton2DData.AttachmentType;
var RegionAttachmentData = Skeleton2DData.RegionAttachmentData;

var Animation2DData = require('../context/assets/animation_2d_data');
var Curves2DData = Animation2DData.Curves2DData;
var Timeline2DType = Animation2DData.Timeline2DType;

"use strict";

function Animation2D() {
    Class.call(this);

    this.data = undefined;
    this.name = undefined;
    this.timelines = [];
    this.duration = 0;
}
Class.extend(Animation2D);
Animation2D.prototype.init = function (data) {
    this.data = data;
    this.name = data.name;
    //this.timelines = data.timelines;
    var i, timeline, timelineData;
    for(i=0;i<data.timelines.length;i++){
        timelineData = data.timelines[i];
        timeline = Timeline2D.create(timelineData);
        this.timelines.push(timeline);
    }
    this.duration = data.duration;
};
Animation2D.prototype.clear = function () {
    this.data = undefined;
    this.name = undefined;
    var i, timeline;
    for(i=0;i<this.timelines.length;i++) {
        timeline = this.timelines[i];
        timeline.destroy();
    }
    this.timelines.length = 0;
    this.duration = 0;
};
Animation2D.prototype.destroy = function () {
    this.clear();
    this.timelines = undefined;
};
Animation2D.prototype.apply = function (skeleton, lastTime, time, loop, events) {
    if (loop && this.duration != 0) {
        time %= this.duration;
        lastTime %= this.duration;
    }
    var timelines = this.timelines;
    for (var i = 0, n = timelines.length; i < n; i++)
        timelines[i].apply(skeleton, lastTime, time, events, 1);
};
Animation2D.prototype.mix = function (skeleton, lastTime, time, loop, events, alpha) {
    if (loop && this.duration != 0) {
        time %= this.duration;
        lastTime %= this.duration;
    }
    var timelines = this.timelines;
    for (var i = 0, n = timelines.length; i < n; i++)
        timelines[i].apply(skeleton, lastTime, time, events, alpha);
};

function Timeline2D(){
    Class.call(this);
    this.data = undefined;
}
Class.extend(Timeline2D);
Timeline2D.prototype.init = function (data) {
    this.data = data;
    return this;
};
Timeline2D.prototype.clear = function () {
    this.data = undefined;
};
Timeline2D.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha) {
};
Timeline2D.typeHash = {};
Timeline2D.create = function(data){
    var constructor = Timeline2D.typeHash[data.type];
    if(!constructor) return undefined;
    return new constructor().init(data);
};

function RotateTimeline2D() {
    Timeline2D.call(this);
}
Timeline2D.extend(RotateTimeline2D);

function nomalizeAngle(angle){
    while (angle > 180)
        angle -= 360;
    while (angle < -180)
        angle += 360;
    return angle;
}
RotateTimeline2D.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha) {
    var data = this.data;
    var frames = data.frames;
    if (time < frames[0]) return; // Time is before first frame.

    var bone = skeleton.bones[data.boneIndex];

    var amount,sx,sy;
    if (time >= frames[frames.length - 4]) { // Time is after last frame.
        amount = frames[frames.length - 2] - bone.skewX;
        //amount = bone.data.skewX + frames[frames.length - 2] - bone.skewX;
        amount = nomalizeAngle(amount);
        sx = bone.skewX + amount * alpha;
        amount = frames[frames.length - 1] - bone.skewY;
        //amount = bone.data.skewY + frames[frames.length - 1] - bone.skewY;
        amount = nomalizeAngle(amount);
        sy = bone.skewY + amount * alpha;
        if (Math.abs(sx - sy) <= 0.1){
            bone.skewX = bone.skewY = bone.rotation = sx;
        }
        else{
            bone.skewX = sx;
            bone.skewY = sy;
            bone.rotation = null;
        }

        return;
    }

    // Interpolate between the previous frame and the current frame.
    var frameIndex = Animation2DData.binarySearch(frames, time, 4);
    var prevFrameValue = frames[frameIndex - 3];
    var prevFrameSkewX = frames[frameIndex - 2];
    var prevFrameSkewY = frames[frameIndex - 1];
    var frameTime = frames[frameIndex];
    var percent = 1 - (time - frameTime) / (frames[frameIndex - 4/*PREV_FRAME_TIME*/] - frameTime);
    percent = data.curves.getCurvePercent(frameIndex / 4 - 1, percent);

    amount = frames[frameIndex + 2/*FRAME_VALUE*/] - prevFrameSkewX;
    amount = nomalizeAngle(amount);
    amount = (prevFrameSkewX + amount * percent) - bone.skewX;
    //amount = bone.data.skewX + (prevFrameSkewX + amount * percent) - bone.skewX;
    amount = nomalizeAngle(amount);
    sx = bone.skewX + amount * alpha;
    amount = frames[frameIndex + 3/*FRAME_VALUE*/] - prevFrameSkewY;
    amount = nomalizeAngle(amount);
    amount = (prevFrameSkewY + amount * percent) - bone.skewY;
    //amount = bone.data.skewY + (prevFrameSkewY + amount * percent) - bone.skewY;
    amount = nomalizeAngle(amount);
    sy = bone.skewY + amount * alpha;

    if (Math.abs(sx - sy) <= 0.1){
        bone.skewX = bone.skewY = bone.rotation = sx;
    }
    else{
        bone.skewX = sx;
        bone.skewY = sy;
        bone.rotation = null;
    }
};
//RotateTimeline2D.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha) {
//    var data = this.data;
//    var frames = data.frames;
//    if (time < frames[0]) return; // Time is before first frame.
//
//    var bone = skeleton.bones[data.boneIndex];
//
//    if (time >= frames[frames.length - 2]) { // Time is after last frame.
//        var amount = bone.data.rotation + frames[frames.length - 1] - bone.rotation;
//        while (amount > 180)
//            amount -= 360;
//        while (amount < -180)
//            amount += 360;
//        bone.rotation += amount * alpha;
//        return;
//    }
//
//    // Interpolate between the previous frame and the current frame.
//    var frameIndex = Animation2DData.binarySearch(frames, time, 2);
//    var prevFrameValue = frames[frameIndex - 1];
//    var frameTime = frames[frameIndex];
//    var percent = 1 - (time - frameTime) / (frames[frameIndex - 2/*PREV_FRAME_TIME*/] - frameTime);
//    percent = data.curves.getCurvePercent(frameIndex / 2 - 1, percent);
//
//    var amount = frames[frameIndex + 1/*FRAME_VALUE*/] - prevFrameValue;
//    while (amount > 180)
//        amount -= 360;
//    while (amount < -180)
//        amount += 360;
//    amount = bone.data.rotation + (prevFrameValue + amount * percent) - bone.rotation;
//    while (amount > 180)
//        amount -= 360;
//    while (amount < -180)
//        amount += 360;
//    bone.rotation += amount * alpha;
//};
Timeline2D.typeHash[Timeline2DType.rotate] = RotateTimeline2D;

function TranslateTimeline2D() {
    Timeline2D.call(this);
}
Timeline2D.extend(TranslateTimeline2D);
TranslateTimeline2D.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha) {
    var data = this.data;
    var frames = data.frames;
    if (time < frames[0]) return; // Time is before first frame.

    var bone = skeleton.bones[data.boneIndex];

    if (time >= frames[frames.length - 3]) { // Time is after last frame.
        bone.x += (frames[frames.length - 2] - bone.x) * alpha;
        bone.y += (frames[frames.length - 1] - bone.y) * alpha;
        //bone.x += (bone.data.x + frames[frames.length - 2] - bone.x) * alpha;
        //bone.y += (bone.data.y + frames[frames.length - 1] - bone.y) * alpha;
        return;
    }

    // Interpolate between the previous frame and the current frame.
    var frameIndex = Animation2DData.binarySearch(frames, time, 3);
    var prevFrameX = frames[frameIndex - 2];
    var prevFrameY = frames[frameIndex - 1];
    var frameTime = frames[frameIndex];
    var percent = 1 - (time - frameTime) / (frames[frameIndex + -3/*PREV_FRAME_TIME*/] - frameTime);
    percent = data.curves.getCurvePercent(frameIndex / 3 - 1, percent);

    bone.x += (prevFrameX + (frames[frameIndex + 1/*FRAME_X*/] - prevFrameX) * percent - bone.x) * alpha;
    bone.y += (prevFrameY + (frames[frameIndex + 2/*FRAME_Y*/] - prevFrameY) * percent - bone.y) * alpha;
    //bone.x += (bone.data.x + prevFrameX + (frames[frameIndex + 1/*FRAME_X*/] - prevFrameX) * percent - bone.x) * alpha;
    //bone.y += (bone.data.y + prevFrameY + (frames[frameIndex + 2/*FRAME_Y*/] - prevFrameY) * percent - bone.y) * alpha;
};
Timeline2D.typeHash[Timeline2DType.translate] = TranslateTimeline2D;

function ScaleTimeline2D() {
    Timeline2D.call(this);
}
Timeline2D.extend(ScaleTimeline2D);
ScaleTimeline2D.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha) {
    var data = this.data;
    var frames = data.frames;
    if (time < frames[0]) return; // Time is before first frame.

    var bone = skeleton.bones[data.boneIndex];

    if (time >= frames[frames.length - 3]) { // Time is after last frame.
        bone.scaleX += (frames[frames.length - 2] - bone.scaleX) * alpha;
        bone.scaleY += (frames[frames.length - 1] - bone.scaleY) * alpha;
        //bone.scaleX += (bone.data.scaleX * frames[frames.length - 2] - bone.scaleX) * alpha;
        //bone.scaleY += (bone.data.scaleY * frames[frames.length - 1] - bone.scaleY) * alpha;
        return;
    }

    // Interpolate between the previous frame and the current frame.
    var frameIndex = Animation2DData.binarySearch(frames, time, 3);
    var prevFrameX = frames[frameIndex - 2];
    var prevFrameY = frames[frameIndex - 1];
    var frameTime = frames[frameIndex];
    var percent = 1 - (time - frameTime) / (frames[frameIndex + -3/*PREV_FRAME_TIME*/] - frameTime);
    percent = data.curves.getCurvePercent(frameIndex / 3 - 1, percent);

    bone.scaleX += ((prevFrameX + (frames[frameIndex + 1/*FRAME_X*/] - prevFrameX) * percent) - bone.scaleX) * alpha;
    bone.scaleY += ((prevFrameY + (frames[frameIndex + 2/*FRAME_Y*/] - prevFrameY) * percent) - bone.scaleY) * alpha;
    //bone.scaleX += (bone.data.scaleX * (prevFrameX + (frames[frameIndex + 1/*FRAME_X*/] - prevFrameX) * percent) - bone.scaleX) * alpha;
    //bone.scaleY += (bone.data.scaleY * (prevFrameY + (frames[frameIndex + 2/*FRAME_Y*/] - prevFrameY) * percent) - bone.scaleY) * alpha;
};
Timeline2D.typeHash[Timeline2DType.scale] = ScaleTimeline2D;

function ColorTimeline2D() {
    Timeline2D.call(this);
}
Timeline2D.extend(ColorTimeline2D);
ColorTimeline2D.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha) {
    var data = this.data;
    var frames = data.frames;
    if (time < frames[0]) return; // Time is before first frame.

    var r, g, b, a;
    if (time >= frames[frames.length - 5]) {
        // Time is after last frame.
        var i = frames.length - 1;
        r = frames[i - 3];
        g = frames[i - 2];
        b = frames[i - 1];
        a = frames[i];
    } else {
        // Interpolate between the previous frame and the current frame.
        var frameIndex = Animation2DData.binarySearch(frames, time, 5);
        var prevFrameR = frames[frameIndex - 4];
        var prevFrameG = frames[frameIndex - 3];
        var prevFrameB = frames[frameIndex - 2];
        var prevFrameA = frames[frameIndex - 1];
        var frameTime = frames[frameIndex];
        var percent = 1 - (time - frameTime) / (frames[frameIndex - 5/*PREV_FRAME_TIME*/] - frameTime);
        percent = data.curves.getCurvePercent(frameIndex / 5 - 1, percent);

        r = prevFrameR + (frames[frameIndex + 1/*FRAME_R*/] - prevFrameR) * percent;
        g = prevFrameG + (frames[frameIndex + 2/*FRAME_G*/] - prevFrameG) * percent;
        b = prevFrameB + (frames[frameIndex + 3/*FRAME_B*/] - prevFrameB) * percent;
        a = prevFrameA + (frames[frameIndex + 4/*FRAME_A*/] - prevFrameA) * percent;
    }
    var slot = skeleton.slots[data.slotIndex];
    if (alpha < 1) {
        slot.r += (r - slot.r) * alpha;
        slot.g += (g - slot.g) * alpha;
        slot.b += (b - slot.b) * alpha;
        slot.a += (a - slot.a) * alpha;
    } else {
        slot.r = r;
        slot.g = g;
        slot.b = b;
        slot.a = a;
    }
};
Timeline2D.typeHash[Timeline2DType.color] = ColorTimeline2D;

function AttachmentTimeline2D() {
    Timeline2D.call(this);
}
Timeline2D.extend(AttachmentTimeline2D);
AttachmentTimeline2D.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha) {
    var data = this.data;
    var frames = data.frames;
    if (time < frames[0]) {
        if (lastTime > time) this.apply(skeleton, lastTime, Number.MAX_VALUE, null, 0);
        return;
    } else if (lastTime > time) //
        lastTime = -1;

    var frameIndex = time >= frames[frames.length - 1] ? frames.length - 1 : Animation2DData.binarySearch1(frames, time) - 1;
    if (frames[frameIndex] < lastTime) return;

    var attachmentName = data.attachmentNames[frameIndex];
    skeleton.slots[data.slotIndex].setAttachment(
        !attachmentName ? null : skeleton.getAttachmentBySlotIndex(data.slotIndex, attachmentName));
};
Timeline2D.typeHash[Timeline2DType.attachment] = AttachmentTimeline2D;

function DrawOrderTimeline2D() {
    Timeline2D.call(this);
}
Timeline2D.extend(DrawOrderTimeline2D);
DrawOrderTimeline2D.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha) {
    var data = this.data;
    var frames = data.frames;
    if (time < frames[0]) return; // Time is before first frame.

    var index;
    if (time >= frames[frames.length - 2]) { // Time is after last frame.
        index = frames[frames.length - 1];
    }
    else{
        var frameIndex = Animation2DData.binarySearch(frames, time, 2);
        index = frames[frameIndex - 1];
    }
    skeleton.setSlotDrawOrder(data.slotIndex, index);
};
Timeline2D.typeHash[Timeline2DType.drawOrder] = DrawOrderTimeline2D;

Animation2D.Timeline2D = Timeline2D;

module.exports = Animation2D;
