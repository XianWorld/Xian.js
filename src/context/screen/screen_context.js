/**
 * Created by Dianyan on 2014/12/25.
 */
var EventEmitter = require('../../base/event_emitter');
var ResolutionPolicy = require("./resolution_policy");
var Dom = require("../utils/dom");

var addEvent = Dom.addEvent,
    removeEvent = Dom.removeEvent,
    addMeta = Dom.addMeta,
    floor = Math.floor;

//ScreenContext.canvas_name = "xianCanvas";
//var canvas_div_name = "xianDiv";


function ScreenContext() {
    EventEmitter.call(this);

    this.canvas_name = "xianCanvas";
    this.canvas_div_name = "xianDiv";

    //designed game view area
    this._designWidth = 0;
    this._designHeight = 0;

    this._offSetY = 0;
    //real viewport area
    this._viewWidth = 0;
    this._viewHeight = 0;

    //real game view area
    this._stageWidth = 0;
    this._stageHeight = 0;

    //real scale factor
    this._scaleX = 1;
    this._scaleY = 1;

    this._autoSize = false;
    this._resolutionPolicy = ResolutionPolicy;
}
EventEmitter.extend(ScreenContext);

Object.defineProperty(ScreenContext.prototype, "autoSize", {
    get: function(){
        return this._autoSize;
    },
    set: function(value){
        if(this._autoSize === value) return;
        this._autoSize = value;
        if(value)
            addEvent(window, "resize orientationchange", this._handleResize, this);
        else
            removeEvent(window, "resize orientationchange", this._handleResize, this);
    }
});

Object.defineProperty(ScreenContext.prototype, "designWidth", {
    get: function(){
        return this._designWidth;
    },
    set: function(value){
        if(this._designWidth === value) return;
        this._designWidth = value;
        this._resolutionPolicy.apply(this, this._designWidth, this._designHeight);
    }
});

Object.defineProperty(ScreenContext.prototype, "designHeight", {
    get: function(){
        return this._designHeight;
    },
    set: function(value){
        if(this._designHeight === value) return;
        this._designHeight = value;
        this._resolutionPolicy.apply(this, this._designWidth, this._designHeight);
    }
});
Object.defineProperty(ScreenContext.prototype, "scaleMode", {
    get: function(){
        return this._resolutionPolicy.getScaleMode();
    },
    set: function(value){
        var mode = this._resolutionPolicy.getScaleMode();
        if(mode === value) return;
        this._resolutionPolicy.setScaleMode(value);
    }
});

ScreenContext.prototype.init = function (opts) {
    opts || (opts = Config.screen);
    opts || (opts = {});

    //init or create the root div
    this.rootDiv = document.getElementById(this.canvas_div_name);
    if(!this.rootDiv){
        this.rootDiv = document.createElement("div");
        this.rootDiv.id = this.canvas_div_name;
        document.body.appendChild(this.rootDiv);
    }

    this._designWidth = opts.designWidth !== undefined ? opts.designWidth : 960;
    this._designHeight = opts.designHeight !== undefined ? opts.designHeight : 640;

    this.autoSize = opts.autoSize || false;
    //var resolutionPolicy = opts.resolutionPolicy || ResolutionPolicy.default;

    this._setResolutionPolicy(opts.resolutionPolicy);
};

ScreenContext.prototype.clear = function () {
    this.autoSize = false;
    this._resolutionPolicy.clear();
    return this;
};

ScreenContext.prototype._handleResize = function () {
    if(this._autoSize)
        this._resolutionPolicy.apply(this, this._designWidth, this._designHeight);
};

//ScreenContext.prototype.setDesignSize = function (width, height) {
//    this._designWidth = width;
//    this._designHeight = height;
//};
ScreenContext.prototype._setResolutionPolicy = function (resolutionPolicy) {
    if(resolutionPolicy)
        this._resolutionPolicy.fromJSON(resolutionPolicy);

    //this._resolutionPolicy = resolutionPolicy;
    this._resolutionPolicy.init(this);
    this._resolutionPolicy.apply(this, this._designWidth, this._designHeight);
    //resolutionPolicy = resolutionPolicy || ResolutionPolicy.default;
    //if(this._resolutionPolicy === resolutionPolicy) return;
    //
    //this._resolutionPolicy = resolutionPolicy;
    //resolutionPolicy.init(this);
    //resolutionPolicy._apply(this, this._designWidth, this._designHeight);
};

ScreenContext.prototype.getScaleX = function () {
    return this._scaleX;
};
ScreenContext.prototype.getScaleY = function () {
    return this._scaleY;
};
ScreenContext.prototype.getOffSetY = function () {
    return this._offSetY;
};

ScreenContext.prototype._setScreenSize = function (stageWidth, stageHeight, viewWidth, viewHeight, left, top, scaleX, scaleY) {
    left = left || 0;
    top = top || 0;
    scaleX = scaleX || 1;
    scaleY = scaleY || 1;
    viewWidth = floor(viewWidth);
    viewHeight = floor(viewHeight);
    stageWidth = floor(stageWidth);
    stageHeight = floor(stageHeight);
    //if(this._stageWidth === stageWidth && this._stageHeight === stageHeight && this._scaleX === scaleX && this._scaleY === scaleY) return;

    this._viewWidth = viewWidth;
    this._viewHeight = viewHeight;

    this._stageWidth = stageWidth;
    this._stageHeight = stageHeight;
    this._scaleX = scaleX;
    this._scaleY = scaleY;

    var container = this.rootDiv;//document.getElementById(ScreenContext.canvas_div_name);
    container.style.width = viewWidth + "px";
    container.style.height = viewHeight + "px";
    container.style.marginTop = top + "px";
    container.style.marginLeft = left + "px";

    this.emit("resize");
};

module.exports = new ScreenContext;
