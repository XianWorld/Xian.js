var Enums = require("../../core/enums");
var Component = require("./../../core/component");
//var Assets = require("../../assets/assets");
var Rect = require("../../math/rect");
var Mat32 = require("../../math/mat32");
//var FilterLib = require("../context/pixi/webgl/filters/FilterLib");
"use strict";


function Renderable2D(opts) {
    opts || (opts = {});

    Component.call(this, opts);

    //this.visible = opts.visible !== undefined ? !!opts.visible : true;
    this.blendMode = opts.blendMode !== undefined ? opts.blendMode : Enums.blendModes.NORMAL;

    //this.layer = opts.layer !== undefined ? opts.layer : 0;
    //this.z = opts.z !== undefined ? opts.z : 0;

    this.alpha = opts.alpha !== undefined ? opts.alpha : 1;

    this.tint = opts.tint !== undefined ? opts.tint : 0xFFFFFF;

    this.worldAlpha = 1.0;

    this.worldMatrix = undefined;

    this._bounds = new Rect(0, 0, 1, 1);
    this._localBounds = new Rect(0, 0, 1, 1);
    this._dirtyBounds = true;
    //this._dirtyLocalBounds = true;

    this._dirtyRender = true;
}

Component.extend(Renderable2D);

//Object.defineProperty(Renderable2D.prototype, 'worldMatrix', {
//    get: function() {
//        return this.transform.modelView;
//    }
//});

Renderable2D.prototype.copy = function (other) {

    this.visible = other.visible;
    this.blendMode = other.blendMode;

    //this.layer = other.layer;
    //this.z = other.z;

    this.alpha = other.alpha;
    this.tint = other.tint;

    return this;
};


Renderable2D.prototype.clear = function () {
    Component.prototype.clear.call(this);

    return this;
};

Renderable2D.prototype.getBounds = function()
{
    if(this._dirtyBounds){
        var worldTransform = this.transform.modelView;
        this.getLocalBounds();
        this._localBounds.getBounds(worldTransform, this._bounds);
        this._dirtyBounds = false;
    }

    return this._bounds;
};

Renderable2D.prototype.getLocalBounds = function()
{
    return this._localBounds;//this.getBounds(Mat32.Identity);///PIXI.EmptyRectangle();
};


//Renderable2D.prototype._getBounds = function (w1, h1, w0, h0, matrix) {
//
//    var worldTransform = matrix || this.transform.modelView;
//    var m = worldTransform.elements;
//    var a = m[0];
//    var b = m[1];
//    var c = m[2];
//    var d = m[3];
//    var tx = m[4];
//    var ty = m[5];
//
//    var x1 = a * w1 + c * h1 + tx;
//    var y1 = d * h1 + b * w1 + ty;
//
//    var x2 = a * w0 + c * h1 + tx;
//    var y2 = d * h1 + b * w0 + ty;
//
//    var x3 = a * w0 + c * h0 + tx;
//    var y3 = d * h0 + b * w0 + ty;
//
//    var x4 = a * w1 + c * h0 + tx;
//    var y4 = d * h0 + b * w1 + ty;
//
//    var maxX = -Infinity;
//    var maxY = -Infinity;
//
//    var minX = Infinity;
//    var minY = Infinity;
//
//    minX = x1 < minX ? x1 : minX;
//    minX = x2 < minX ? x2 : minX;
//    minX = x3 < minX ? x3 : minX;
//    minX = x4 < minX ? x4 : minX;
//
//    minY = y1 < minY ? y1 : minY;
//    minY = y2 < minY ? y2 : minY;
//    minY = y3 < minY ? y3 : minY;
//    minY = y4 < minY ? y4 : minY;
//
//    maxX = x1 > maxX ? x1 : maxX;
//    maxX = x2 > maxX ? x2 : maxX;
//    maxX = x3 > maxX ? x3 : maxX;
//    maxX = x4 > maxX ? x4 : maxX;
//
//    maxY = y1 > maxY ? y1 : maxY;
//    maxY = y2 > maxY ? y2 : maxY;
//    maxY = y3 > maxY ? y3 : maxY;
//    maxY = y4 > maxY ? y4 : maxY;
//
//    var bounds = this._bounds;
//
//    bounds.x = minX;
//    bounds.width = maxX - minX;
//
//    bounds.y = minY;
//    bounds.height = maxY - minY;
//
//    // store a reference so that if this function gets called again in the render cycle we do not have to recalculate
//    //this._currentBounds = bounds;
//
//    return bounds;
//};

Renderable2D.prototype.update = function () {
    this.worldMatrix = this.transform.modelView;
    if(this.transform._matrix_changed)
        this._dirtyBounds = true;
};

Renderable2D.prototype._render = function (renderer) {
};

Renderable2D.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.visible = this.visible;
    json.blendMode = this.blendMode;

    //json.layer = this.layer;
    //json.z = this.z;

    json.alpha = this.alpha;
    json.tint = this.tint;

    //if(this.mask)
    //    json.mask = this.mask.toJSON(json.mask);
    //
    //if(this._filters){
    //    json.filters = [];
    //
    //    var len = this._filters.length;
    //    var i;
    //    for(i = 0; i<len; i++){
    //        //TODO the filter would be null or undefined
    //        json.filters.push(this._filters[i].toJSON());
    //    }
    //}

    return json;
};


Renderable2D.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.visible = json.visible;
    this.blendMode = json.blendMode;

    //this.layer = json.layer;
    //this.z = json.z;

    this.alpha = json.alpha;
    this.tint = json.tint;

    //if(json.mask){
    //    this.mask = new Rect();
    //    this.mask.fromJSON(json.mask);
    //}
    //else
    //    this.mask = undefined;

    //if(json.filters){
    //    var filters = [];
    //
    //    var len = json.filters.length;
    //    var i;
    //    for(i = 0; i<len; i++){
    //        //TODO the filter would be null or undefined
    //        filters.push(FilterLib.fromJSON(json.filters[i]));
    //    }
    //}

    return this;
};


module.exports = Renderable2D;
