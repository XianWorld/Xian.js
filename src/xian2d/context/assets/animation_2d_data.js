/**
 * Created by Dianyan on 2015/2/7.
 */
var Class = require("../../../base/class");

function Animation2DData(name, timelines, duration) {
    this.name = name;
    this.timelines = timelines;
    this.duration = duration;
}
Animation2DData.binarySearch = function (values, target, step) {
    var low = 0;
    var high = Math.floor(values.length / step) - 2;
    if (!high) return step;
    var current = high >>> 1;
    while (true) {
        if (values[(current + 1) * step] <= target)
            low = current + 1;
        else
            high = current;
        if (low == high) return (low + 1) * step;
        current = (low + high) >>> 1;
    }
};
Animation2DData.binarySearch1 = function (values, target) {
    var low = 0;
    var high = values.length - 2;
    if (!high) return 1;
    var current = high >>> 1;
    while (true) {
        if (values[current + 1] <= target)
            low = current + 1;
        else
            high = current;
        if (low == high) return low + 1;
        current = (low + high) >>> 1;
    }
};
Animation2DData.linearSearch = function (values, target, step) {
    for (var i = 0, last = values.length - step; i <= last; i += step)
        if (values[i] > target) return i;
    return -1;
};

function Curves2DData(frameCount) {
    this.curves = []; // type, x, y, ...
    //this.curves.length = (frameCount - 1) * 19/*BEZIER_SIZE*/;
}
Curves2DData.prototype.destroy = function () {
    this.curves = undefined;
};
Curves2DData.prototype.setLinear = function (frameIndex) {
    this.curves[frameIndex * 19/*BEZIER_SIZE*/] = 0/*LINEAR*/;
};
Curves2DData.prototype.setStepped = function (frameIndex) {
    this.curves[frameIndex * 19/*BEZIER_SIZE*/] = 1/*STEPPED*/;
};
/** Sets the control handle positions for an interpolation bezier curve used to transition from this keyframe to the next.
 * cx1 and cx2 are from 0 to 1, representing the percent of time between the two keyframes. cy1 and cy2 are the percent of
 * the difference between the keyframe's values. */
Curves2DData.prototype.setCurve = function (frameIndex, cx1, cy1, cx2, cy2) {
    var subdiv1 = 1 / 10/*BEZIER_SEGMENTS*/, subdiv2 = subdiv1 * subdiv1, subdiv3 = subdiv2 * subdiv1;
    var pre1 = 3 * subdiv1, pre2 = 3 * subdiv2, pre4 = 6 * subdiv2, pre5 = 6 * subdiv3;
    var tmp1x = -cx1 * 2 + cx2, tmp1y = -cy1 * 2 + cy2, tmp2x = (cx1 - cx2) * 3 + 1, tmp2y = (cy1 - cy2) * 3 + 1;
    var dfx = cx1 * pre1 + tmp1x * pre2 + tmp2x * subdiv3, dfy = cy1 * pre1 + tmp1y * pre2 + tmp2y * subdiv3;
    var ddfx = tmp1x * pre4 + tmp2x * pre5, ddfy = tmp1y * pre4 + tmp2y * pre5;
    var dddfx = tmp2x * pre5, dddfy = tmp2y * pre5;

    var i = frameIndex * 19/*BEZIER_SIZE*/;
    var curves = this.curves;
    curves[i++] = 2/*BEZIER*/;

    var x = dfx, y = dfy;
    for (var n = i + 19/*BEZIER_SIZE*/ - 1; i < n; i += 2) {
        curves[i] = x;
        curves[i + 1] = y;
        dfx += ddfx;
        dfy += ddfy;
        ddfx += dddfx;
        ddfy += dddfy;
        x += dfx;
        y += dfy;
    }
};
Curves2DData.prototype.getCurvePercent = function (frameIndex, percent) {
    percent = percent < 0 ? 0 : (percent > 1 ? 1 : percent);
    var curves = this.curves;
    var i = frameIndex * 19/*BEZIER_SIZE*/;
    var type = curves[i];
    if (type === 0/*LINEAR*/) return percent;
    if (type == 1/*STEPPED*/) return 0;
    i++;
    var x = 0;
    for (var start = i, n = i + 19/*BEZIER_SIZE*/ - 1; i < n; i += 2) {
        x = curves[i];
        if (x >= percent) {
            var prevX, prevY;
            if (i == start) {
                prevX = 0;
                prevY = 0;
            } else {
                prevX = curves[i - 2];
                prevY = curves[i - 1];
            }
            return prevY + (curves[i + 1] - prevY) * (percent - prevX) / (x - prevX);
        }
    }
    var y = curves[i - 1];
    return y + (1 - y) * (percent - x) / (1 - x); // Last point is 1,1.
};

var Timeline2DType = {
    rotate: 0,
    translate: 1,
    scale: 2,
    color: 3,
    attachment: 4,
    drawOrder: 5
};

function Timeline2DData() {
    Class.call(this);
    this.type = -1;
    this.curves = undefined;
    this.frames = []; // time, angle, ...
    this.frameCount = 0;
}
Class.extend(Timeline2DData);
Timeline2DData.prototype.init = function (frameCount) {
    this.curves = new Curves2DData(frameCount);
    this.frames.length = frameCount * 2;
    this.frameCount = frameCount;
    return this;
};
Timeline2DData.prototype.clear = function () {
    this.curves.destroy();
    this.curves = undefined;
    this.frames.length = 0;
    this.frameCount = 0;
    return this;
};
Timeline2DData.prototype.destroy = function () {
    this.clear();
    this.frames = undefined;
    return this;
};
Timeline2DData.prototype.getFrameCount = function () {
    return this.frameCount;
};

function RotateTimeline2DData() {
    Timeline2DData.call(this);
    this.type = Timeline2DType.rotate;
    this.boneIndex = 0;
}
Timeline2DData.extend(RotateTimeline2DData);
RotateTimeline2DData.prototype.init = function (frameCount) {
    Timeline2DData.prototype.init.call(this, frameCount);
    this.frames.length = frameCount * 4;
    return this;
};
RotateTimeline2DData.prototype.setFrame = function (frameIndex, time, angle, skewX, skewY) {
    frameIndex *= 4;
    this.frames[frameIndex] = time;
    this.frames[frameIndex + 1] = angle;
    this.frames[frameIndex + 2] = skewX;
    this.frames[frameIndex + 3] = skewY;
};
//RotateTimeline2DData.prototype.init = function (frameCount) {
//    Timeline2DData.prototype.init.call(this, frameCount);
//    this.frames.length = frameCount * 2;
//    return this;
//};
//RotateTimeline2DData.prototype.setFrame = function (frameIndex, time, angle) {
//    frameIndex *= 2;
//    this.frames[frameIndex] = time;
//    this.frames[frameIndex + 1] = angle;
//};

function TranslateTimeline2DData() {
    Timeline2DData.call(this);
    this.type = Timeline2DType.translate;
    this.boneIndex = 0;
}
Timeline2DData.extend(TranslateTimeline2DData);
TranslateTimeline2DData.prototype.init = function (frameCount) {
    Timeline2DData.prototype.init.call(this, frameCount);
    this.frames.length = frameCount * 3;
    return this;
};
TranslateTimeline2DData.prototype.setFrame = function (frameIndex, time, x, y) {
    frameIndex *= 3;
    this.frames[frameIndex] = time;
    this.frames[frameIndex + 1] = x;
    this.frames[frameIndex + 2] = y;
};

function ScaleTimeline2DData() {
    Timeline2DData.call(this);
    this.type = Timeline2DType.scale;
    this.boneIndex = 0;
}
Timeline2DData.extend(ScaleTimeline2DData);
ScaleTimeline2DData.prototype.init = function (frameCount) {
    Timeline2DData.prototype.init.call(this, frameCount);
    this.frames.length = frameCount * 3;
    return this;
};
ScaleTimeline2DData.prototype.setFrame = function (frameIndex, time, x, y) {
    frameIndex *= 3;
    this.frames[frameIndex] = time;
    this.frames[frameIndex + 1] = x;
    this.frames[frameIndex + 2] = y;
};

function ColorTimeline2DData() {
    Timeline2DData.call(this);
    this.type = Timeline2DType.color;
    this.slotIndex = 0;
}
Timeline2DData.extend(ColorTimeline2DData);
ColorTimeline2DData.prototype.init = function (frameCount) {
    Timeline2DData.prototype.init.call(this, frameCount);
    this.frames.length = frameCount * 5;
    return this;
};
ColorTimeline2DData.prototype.setFrame = function (frameIndex, time, r, g, b, a) {
    frameIndex *= 5;
    this.frames[frameIndex] = time;
    this.frames[frameIndex + 1] = r;
    this.frames[frameIndex + 2] = g;
    this.frames[frameIndex + 3] = b;
    this.frames[frameIndex + 4] = a;
};

function AttachmentTimeline2DData() {
    Timeline2DData.call(this);
    this.type = Timeline2DType.attachment;
    this.attachmentNames = [];
    this.slotIndex = 0;
}
Timeline2DData.extend(AttachmentTimeline2DData);
AttachmentTimeline2DData.prototype.init = function (frameCount) {
    Timeline2DData.prototype.init.call(this, frameCount);
    this.frames.length = frameCount;
    this.attachmentNames.length = frameCount;
    return this;
};
AttachmentTimeline2DData.prototype.clear = function () {
    Timeline2DData.prototype.init.clear(this);
    this.attachmentNames.length = 0;
    return this;
};
AttachmentTimeline2DData.prototype.destroy = function () {
    Timeline2DData.prototype.destroy.call(this);
    this.attachmentNames = undefined;
    return this;
};
AttachmentTimeline2DData.prototype.setFrame = function (frameIndex, time, attachmentName) {
    this.frames[frameIndex] = time;
    this.attachmentNames[frameIndex] = attachmentName;
};

function DrawOrderTimeline2DData() {
    Timeline2DData.call(this);
    this.type = Timeline2DType.drawOrder;
    this.slotIndex = 0;
}
Timeline2DData.extend(DrawOrderTimeline2DData);
DrawOrderTimeline2DData.prototype.init = function (frameCount) {
    Timeline2DData.prototype.init.call(this, frameCount);
    this.frames.length = frameCount * 2;
    return this;
};
DrawOrderTimeline2DData.prototype.setFrame = function (frameIndex, time, index) {
    frameIndex *= 2;
    this.frames[frameIndex] = time;
    this.frames[frameIndex + 1] = index;
};

function AnimationState2DData(skeletonData) {
    this.skeletonData = skeletonData;
    this.animationToMixTime = {};
    this.defaultMix = 0;
}
AnimationState2DData.prototype.setMixByName = function (fromName, toName, duration) {
    var from = this.skeletonData.findAnimation(fromName);
    if (!from) throw "Animation not found: " + fromName;
    var to = this.skeletonData.findAnimation(toName);
    if (!to) throw "Animation not found: " + toName;
    this.setMix(from, to, duration);
};
AnimationState2DData.prototype.setMix = function (from, to, duration) {
    this.animationToMixTime[from.name + ":" + to.name] = duration;
};
AnimationState2DData.prototype.getMix = function (from, to) {
    var key = from.name + ":" + to.name;
    return this.animationToMixTime.hasOwnProperty(key) ? this.animationToMixTime[key] : this.defaultMix;
};

Animation2DData.Curves2DData = Curves2DData;
Animation2DData.Timeline2DType = Timeline2DType;
Animation2DData.Timeline2DData = Timeline2DData;
Animation2DData.RotateTimeline2DData = RotateTimeline2DData;
Animation2DData.TranslateTimeline2DData = TranslateTimeline2DData;
Animation2DData.ScaleTimeline2DData = ScaleTimeline2DData;
Animation2DData.ColorTimeline2DData = ColorTimeline2DData;
Animation2DData.AttachmentTimeline2DData = AttachmentTimeline2DData;
Animation2DData.DrawOrderTimeline2DData = DrawOrderTimeline2DData;

Animation2DData.AnimationState2DData = AnimationState2DData;

module.exports = Animation2DData;
