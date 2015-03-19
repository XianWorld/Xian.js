var Context = require("../../context/main_context");
var Time = Context.Time;
var Assets = Context.Assets;
//var Component = require("./../../core/component");
var Behaviour = require("./../../components/behaviour");
//var Enums = require("../../base/enums");
//var Class = require("../../base/class");
var Mathf = require('../../math/mathf');

var Skeleton2DData = require('../context/assets/skeleton_2d_data');
//var Bone2DData = Skeleton2DData.Bone2DData;
//var Slot2DData = Skeleton2DData.Slot2DData;
////var IkConstraint2DData = Skeleton2DData.IkConstraint2DData;
//var SkinData = Skeleton2DData.SkinData;
var AttachmentType = Skeleton2DData.AttachmentType;
var RegionAttachmentData = Skeleton2DData.RegionAttachmentData;
//var Animation2DData = Skeleton2DData.Animation2DData;
//var Curves2DData = Skeleton2DData.Curves2DData;
//
//var Timeline2DType = Skeleton2DData.Timeline2DType;

var Skeleton2D = require("./skeleton_2d");
var Animation2D = require("./animation_2d");
var AnimationState2D = require("./animation_state_2d");
var Skin2D = require('./skin_2d');
"use strict";

var abs = Math.abs;
var TO_RADS = Mathf.TO_RADS;
//var TO_DEGS = Mathf.TO_DEGS;

function SkeletonAnimation2D() {
    Behaviour.call(this);

    //this._skeletonData = undefined;
    this.autoPlay = true;
    this.skeleton = new Skeleton2D();
    this.skin = new Skin2D();

    //this.animationDatas = {};
    //this.animations = {};
    this.animationState = new AnimationState2D();
}
Behaviour.extend(SkeletonAnimation2D);

SkeletonAnimation2D.prototype.init = function() {
    this.skeleton.animator = this;

    this.skin.animator = this;

    this.animationState.animator = this;
};

SkeletonAnimation2D.prototype.copy = function (other) {

    return this;
};

SkeletonAnimation2D.prototype.clear = function () {
    Behaviour.prototype.clear.call(this);

    this.skeleton.clear();
    this.skin.clear();
    return this;
};

SkeletonAnimation2D.prototype.destroy = function () {
    Behaviour.prototype.destroy.call(this);

    this.skeleton.destroy();
    this.skeleton = undefined;

    this.skin.destroy();
    this.skin = undefined;

    //this.animationDatas = undefined;
    //this.animations = undefined;

    this.animationState.destroy();
    this.animationState = undefined;

    this.slotContainers = undefined;
    return this;
};

SkeletonAnimation2D.prototype.toJSON = function (json) {
    json = Behaviour.prototype.toJSON.call(this, json);

    json.skeleton = this.skeleton.toJSON(json.skeleton);

    json.skin = this.skin.toJSON(json.skin);

    return json;
};

SkeletonAnimation2D.prototype.fromJSON = function (json) {
    Behaviour.prototype.fromJSON.call(this, json);

    if(json.skeleton) this.skeleton.fromJSON(json.skeleton);

    if(json.skin) this.skin.fromJSON(json.skin);

    return this;
};

SkeletonAnimation2D.prototype.update = function()
{
    if(!this.autoPlay) return;
    if(!this.skeleton.ready) return;

    //this.lastTime = this.lastTime || Date.now();
    //var timeDelta = (Date.now() - this.lastTime) * 0.001;
    //this.lastTime = Date.now();
    var timeDelta = Time.delta;// * 0.001;

    this.animationState.update(timeDelta);
    this.animationState.apply(this.skeleton);

    this.skeleton.update();
};

SkeletonAnimation2D.prototype.updateTime = function(timeDelta)
{
    if(!this.skeleton.ready) return;

    //this.lastTime = this.lastTime || Date.now();
    //var timeDelta = (Date.now() - this.lastTime) * 0.001;
    //this.lastTime = Date.now();
    //var timeDelta = Time.delta;// * 0.001;

    this.animationState.update(timeDelta);
    this.animationState.apply(this.skeleton);

    this.skeleton.update();
};

module.exports = SkeletonAnimation2D;
