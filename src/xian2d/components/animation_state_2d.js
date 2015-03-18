/**
 * Created by Dianyan on 2015/2/7.
 */
var Class = require("../../base/class");
//var Animation2DData = require('../context/assets/animation_2d_data');
var Animation2D = require('./animation_2d');

function TrackEntry () {
    this.next = null;
    this.previous = null;
    this.animation = null;
    this.loop = false;
    this.delay = 0;
    this.time = 0;
    this.lastTime = -1;
    this.endTime = 0;
    this.timeScale = 1;
    this.mixTime = 0;
    this.mixDuration = 0;
    this.mix = 1;
    this.onStart = null;
    this.onEnd = null;
    this.onComplete = null;
    this.onEvent = null;
}

function AnimationState2D() {
    Class.call(this);

    this.animationHash = {};

    //this.data = undefined;
    this.tracks = [];
    this.events = [];

    this.onStart = null;
    this.onEnd = null;
    this.onComplete = null;
    this.onEvent = null;
    this.timeScale = 1;

    this.animationToMixTime = {};
    this.defaultMix = 0;

    this.animator = undefined;
}
Class.extend(AnimationState2D);

AnimationState2D.prototype.init = function (stateData) {
    for(var key in stateData.animationToMixTime){
        this.animationToMixTime[key] = stateData.animationToMixTime[key];
    }
};

AnimationState2D.prototype.addAnimationDatas = function (datas) {
    var i, len = datas.length;
    var animData;
    for(i=0;i<len;i++){
        animData = datas[i];
        this.addAnimationData(animData);
    }
};
AnimationState2D.prototype.addAnimationData = function (data) {
    var animation = this.animationHash[data.name];
    if(animation) return;
    animation = this.animationHash[data.name] = new Animation2D();
    animation.init(data);
};
AnimationState2D.prototype.clear = function () {
    //this.data = undefined;
    this.tracks.length = 0;
    this.events.length = 0;

    for(var key in this.animationHash){
        this.animationHash[key].destroy();
        delete this.animationHash[key];
    }
    this.onStart = null;
    this.onEnd = null;
    this.onComplete = null;
    this.onEvent = null;
    this.timeScale = 1;

    this.animationToMixTime = {};
    this.defaultMix = 0;

    this.animator = undefined;
};
AnimationState2D.prototype.destroy = function () {
    this.clear();
    this.tracks = undefined;
    this.events = undefined;
    this.animationToMixTime = undefined;
    this.animationHash = undefined;
};

AnimationState2D.prototype.setMixByName = function (fromName, toName, duration) {
    //var from = this.skeletonData.findAnimation(fromName);
    //if (!from) throw "Animation not found: " + fromName;
    //var to = this.skeletonData.findAnimation(toName);
    //if (!to) throw "Animation not found: " + toName;
    //this.setMix(from, to, duration);
    this.animationToMixTime[fromName + ":" + toName] = duration;
};
AnimationState2D.prototype.setMix = function (from, to, duration) {
    this.animationToMixTime[from.name + ":" + to.name] = duration;
};
AnimationState2D.prototype.getMix = function (from, to) {
    var key = from.name + ":" + to.name;
    return this.animationToMixTime.hasOwnProperty(key) ? this.animationToMixTime[key] : this.defaultMix;
};

AnimationState2D.prototype.update = function (delta) {
    delta *= this.timeScale;
    for (var i = 0; i < this.tracks.length; i++) {
        var current = this.tracks[i];
        if (!current) continue;

        current.time += delta * current.timeScale;
        if (current.previous) {
            var previousDelta = delta * current.previous.timeScale;
            current.previous.time += previousDelta;
            current.mixTime += previousDelta;
        }

        var next = current.next;
        if (next) {
            next.time = current.lastTime - next.delay;
            if (next.time >= 0) this.setCurrent(i, next);
        } else {
            // End non-looping animation when it reaches its end time and there is no next entry.
            if (!current.loop && current.lastTime >= current.endTime) this.clearTrack(i);
        }
    }
};

AnimationState2D.prototype.apply = function (skeleton) {
    for (var i = 0; i < this.tracks.length; i++) {
        var current = this.tracks[i];
        if (!current) continue;

        this.events.length = 0;

        var time = current.time;
        var lastTime = current.lastTime;
        var endTime = current.endTime;
        var loop = current.loop;
        if (!loop && time > endTime) time = endTime;

        console.log(current.animation.name+": "+time+", "+lastTime+", "+endTime);

        var previous = current.previous;
        if (!previous) {
            if (current.mix == 1)
                current.animation.apply(skeleton, current.lastTime, time, loop, this.events);
            else
                current.animation.mix(skeleton, current.lastTime, time, loop, this.events, current.mix);
        } else {
            var previousTime = previous.time;
            if (!previous.loop && previousTime > previous.endTime) previousTime = previous.endTime;
            previous.animation.apply(skeleton, previousTime, previousTime, previous.loop, null);

            var alpha = current.mixTime / current.mixDuration * current.mix;
            if (alpha >= 1) {
                alpha = 1;
                current.previous = null;
            }
            current.animation.mix(skeleton, current.lastTime, time, loop, this.events, alpha);
        }

        for (var ii = 0, nn = this.events.length; ii < nn; ii++) {
            var event = this.events[ii];
            if (current.onEvent) current.onEvent(i, event);
            if (this.onEvent) this.onEvent(i, event);
        }

        // Check if completed the animation or a loop iteration.
        if (loop ? (lastTime % endTime > time % endTime) : (lastTime < endTime && time >= endTime)) {
            var count = Math.floor(time / endTime);
            if (current.onComplete) current.onComplete(i, count);
            if (this.onComplete) this.onComplete(i, count);
        }

        current.lastTime = current.time;
    }
};

AnimationState2D.prototype.clearTracks = function () {
    for (var i = 0, n = this.tracks.length; i < n; i++)
        this.clearTrack(i);
    this.tracks.length = 0;
};

AnimationState2D.prototype.clearTrack = function (trackIndex) {
    if (trackIndex >= this.tracks.length) return;
    var current = this.tracks[trackIndex];
    if (!current) return;

    if (current.onEnd) current.onEnd(trackIndex);
    if (this.onEnd) this.onEnd(trackIndex);

    this.tracks[trackIndex] = null;
};

AnimationState2D.prototype._expandToIndex = function (index) {
    if (index < this.tracks.length) return this.tracks[index];
    while (index >= this.tracks.length)
        this.tracks.push(null);
    return null;
};

AnimationState2D.prototype.setCurrent = function (index, entry) {
    var current = this._expandToIndex(index);
    if (current) {
        var previous = current.previous;
        current.previous = null;

        if (current.onEnd) current.onEnd(index);
        if (this.onEnd) this.onEnd(index);

        entry.mixDuration = this.getMix(current.animation, entry.animation);
        if (entry.mixDuration > 0) {
            entry.mixTime = 0;
            // If a mix is in progress, mix from the closest animation.
            if (previous && current.mixTime / current.mixDuration < 0.5)
                entry.previous = previous;
            else
                entry.previous = current;
        }
    }

    this.tracks[index] = entry;

    if (entry.onStart) entry.onStart(index);
    if (this.onStart) this.onStart(index);
    //this.emit('start', this, index);
};

AnimationState2D.prototype.findAnimation = function(name) {
    return this.animationHash[name];
};

AnimationState2D.prototype.setAnimationByName = function (trackIndex, animationName, loop) {
    var animation = this.findAnimation(animationName);
    if (!animation) throw "Animation not found: " + animationName;
    return this.setAnimation(trackIndex, animation, loop);
};

/** Set the current animation. Any queued animations are cleared. */
AnimationState2D.prototype.setAnimation = function (trackIndex, animation, loop) {
    var entry = new TrackEntry();
    entry.animation = animation;
    entry.loop = loop;
    entry.endTime = animation.duration;
    this.setCurrent(trackIndex, entry);
    return entry;
};

AnimationState2D.prototype.addAnimationByName = function (trackIndex, animationName, loop, delay) {
    var animation = this.findAnimation(animationName);
    if (!animation) throw "Animation not found: " + animationName;
    return this.addAnimation(trackIndex, animation, loop, delay);
};

/** Adds an animation to be played delay seconds after the current or last queued animation.
 * @param delay May be <= 0 to use duration of previous animation minus any mix duration plus the negative delay. */
AnimationState2D.prototype.addAnimation = function (trackIndex, animation, loop, delay) {
    var entry = new TrackEntry();
    entry.animation = animation;
    entry.loop = loop;
    entry.endTime = animation.duration;

    var last = this._expandToIndex(trackIndex);
    if (last) {
        while (last.next)
            last = last.next;
        last.next = entry;
    } else
        this.tracks[trackIndex] = entry;

    if (delay <= 0) {
        if (last)
            delay += last.endTime - this.getMix(last.animation, animation);
        else
            delay = 0;
    }
    entry.delay = delay;

    return entry;
};

/** May be null. */
AnimationState2D.prototype.getCurrent = function (trackIndex) {
    if (trackIndex >= this.tracks.length) return null;
    return this.tracks[trackIndex];
};

module.exports = AnimationState2D;
