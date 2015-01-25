var Context = require("../context/main_context");
var AudioCtx = Context.AudioContext;
var Time = Context.Time;
var Mathf = require("../math/mathf");
var Vec2 = require("../math/vec2");
var Vec3 = require("../math/vec3");
var Assets = require("../context/main_context").Assets;
var Behaviour = require("./../components/behaviour");
var Camera = require("./../components/camera");
"use strict";

var now = Time.now,
    clamp01 = Mathf.clamp01,
    defineProperty = Object.defineProperty;

function AudioSource() {

    Behaviour.call(this);

    this._clip = undefined;

    this._source = undefined;
    this._gain = undefined;
    this._panner = undefined;

    this.dopplerLevel = 1;
    this._loop = false;

    this.maxDistance = 15;
    this.minDistance = 1;

    this.offset = new Vec3;

    this.pitch = 0;

    this.playOnStart = false;

    this.spread = 0;

    this.time = 0;
    this._volume = 1;

    this.playing = false;
    this.stopped = false;
    this.paused = false;

    this._startTime = 0;

    var _this = this;
    this._onended = function () {

        _this.playing = false;
        _this.time = 0;
        _this.emit("end");
    };
}

Behaviour.extend(AudioSource);

defineProperty(AudioSource.prototype, "volume", {
    get: function () {
        return this._volume;
    },
    set: function (value) {
        this._volume = clamp01(value);
        if (this._gain) this._gain.gain.value = this._volume;
    }
});

defineProperty(AudioSource.prototype, "loop", {
    get: function () {
        return this._loop;
    },
    set: function (value) {
        this._loop = !!value;
        if (this._source) this._source.loop = this._loop;
    }
});

Object.defineProperty(AudioSource.prototype, "clip", {
    get: function () {
        return this._clip;
    },
    set: function (value) {
        if (this._clip === value) return;
        if (this._clip) this._clip.release(this);
        this._clip = value;
        if (this._clip) this._clip.retain(this);
    }
});

AudioSource.prototype.copy = function (other) {
    Behaviour.prototype.copy.call(this, other);

    this.clip = other.clip;

    this.dopplerLevel = other.dopplerLevel;
    this.loop = other.loop;

    this.maxDistance = other.maxDistance;
    this.minDistance = other.minDistance;

    this.offset.copy(other.offset);
    this.panLevel = other.panLevel;

    this.pitch = other.pitch;

    this.playOnStart = other.playOnStart;

    this.spread = other.spread;

    this.time = other.time;
    this.volume = other.volume;

    this.playing = false;
    this.stopped = false;
    this.paused = false;

    return this;
};

AudioSource.prototype.clear = function () {
    Behaviour.prototype.clear.call(this);
    if (this.playing) this.stop();

    this.clip = undefined;
    this._source = undefined;
    this._gain = undefined;
    this._panner = undefined;

    this.dopplerLevel = 1;
    this._loop = false;
    this.maxDistance = 15;
    this.minDistance = 1;
    this.offset.set(0,0,0);
    this.pitch = 0;
    this.playOnStart = false;
    this.spread = 0;
    this.time = 0;
    this._volume = 1;
    this.playing = false;
    this.stopped = false;
    this.paused = false;
    this._startTime = 0;
};

AudioSource.prototype.destroy = function () {
    Behaviour.prototype.destroy.call(this);
    this.offset = undefined;
};

AudioSource.prototype.start = function () {
    if (this.playOnStart) this.play();
};

var VEC2 = new Vec2,
    VEC3 = new Vec3;
AudioSource.prototype.update = function () {
    if (this.dopplerLevel === 0 || !this.playing) return;
    var transform2d, transform, camera, cameraTransform, panner;

    if (!(camera = Camera.main)) return;
    if (!(panner = this._panner)) return;

    transform = this.transform;
    //transform2d = this.transform2d;

    cameraTransform = camera.transform;

    if (transform._type === 'Transform2D') {
        VEC2.vadd(transform.position, this.offset);
        VEC2.sub(cameraTransform.position);
        VEC2.smul(this.dopplerLevel);

        panner.setPosition(VEC2.x, VEC2.y, camera.orthographicSizeX * 0.5);
    } else {
        VEC3.vadd(transform.position, this.offset);
        VEC3.sub(cameraTransform.position);
        VEC3.smul(this.dopplerLevel);

        panner.setPosition(VEC3.x, VEC3.y, VEC3.z || 0);
    }
};

AudioSource.prototype.play = function (delay, offset, duration) {
    if (!AudioCtx) return this;
    if (!AudioCtx.UNLOCKED && this._loop) {
        var _this = this,
            listener = function (e) {
                _this.play();
                window.removeEventListener("audiocontextunlock", listener, false);
            };

        window.addEventListener("audiocontextunlock", listener, false);
    }
    if (!this.clip || !this.clip.raw) return this;
    var time = this.time,
        clipLength = this.clip.length,
        maxLength = clipLength - time;

    delay || (delay = 0);
    offset || (offset = time);
    duration || (duration = clipLength);
    duration = duration > maxLength ? maxLength : duration;

    this._refresh();

    this.playing = true;
    this.stopped = false;
    this.paused = false;
    this._startTime = now();

    this.time = offset;
    this._source.start(delay, offset, duration);

    return this;
};


AudioSource.prototype.pause = function () {
    if (!AudioCtx || !this.clip || !this.clip.raw) return this;

    this.playing = false;
    this.stopped = false;
    this.paused = true;
    this.time = now() - this._startTime;

    this._source.stop(this.time);

    return this;
};


AudioSource.prototype.stop = function () {
    if (!AudioCtx || !this.clip || !this.clip.raw) return this;

    this.time = 0;
    this.playing = false;
    this.stopped = true;
    this.paused = false;

    this._source.stop(this.time);

    return this;
};


AudioSource.prototype._refresh = function () {
    var source = this._source = AudioCtx.createBufferSource(),
        gain = this._gain = AudioCtx.createGain(),
        panner;

    if (this.dopplerLevel === 0) {
        gain.connect(AudioCtx.destination);
        source.connect(gain);
    } else {
        panner = this._panner = AudioCtx.createPanner();

        gain.connect(AudioCtx.destination);
        panner.connect(gain);
        source.connect(panner);
    }

    source.buffer = this.clip.raw;
    source.onended = this._onended;

    gain.gain.value = this.volume;
    source.loop = this._loop;

    return this;
};


AudioSource.prototype.toJSON = function (json) {
    json = Behaviour.prototype.toJSON.call(this, json);

    json.clip = this.clip ? this.clip.name : undefined;

    json.dopplerLevel = this.dopplerLevel;
    json.loop = this.loop;

    json.maxDistance = this.maxDistance;
    json.minDistance = this.minDistance;

    json.offset = this.offset.toJSON(json.offset);
    json.panLevel = this.panLevel;

    json.pitch = this.pitch;

    json.playOnStart = this.playOnStart;

    json.spread = this.spread;

    json.time = this.time;
    json.volume = this.volume;

    return json;
};


AudioSource.prototype.fromJSON = function (json) {
    Behaviour.prototype.fromJSON.call(this, json);

    this.clip = json.clip ? Assets.load(json.clip, "AudioClip") : undefined;

    this.dopplerLevel = json.dopplerLevel || 1;
    this.loop = json.loop !== undefined ? !!json.loop : false;

    this.maxDistance = json.maxDistance || 15;
    this.minDistance = json.minDistance || 1;

    if(json.offset) this.offset.fromJSON(json.offset);
    this.panLevel = json.panLevel || 0;

    this.pitch = json.pitch || 0;

    this.playOnStart = json.playOnStart !== undefined ? !!json.playOnStart : false;

    this.spread = json.spread || 0;

    this.time = json.time || 0;
    this.volume = json.volume || 1;

    return this;
};


module.exports = AudioSource;
