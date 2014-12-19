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

    //this.mask = opts.mask !== undefined ? opts.mask : undefined;

    //this._filters = undefined;
    //this._filterBlock = undefined;
    //if(opts.filters) this.filters = opts.filters;
}

Component.extend(Renderable2D);

//Object.defineProperty(Renderable2D.prototype, 'filters', {
//
//    get: function() {
//        return this._filters;
//    },
//
//    set: function(value) {
//
//        if(value)
//        {
//            // now put all the passes in one place..
//            var passes = [];
//            for (var i = 0; i < value.length; i++)
//            {
//                var filterPasses = value[i].passes;
//                for (var j = 0; j < filterPasses.length; j++)
//                {
//                    passes.push(filterPasses[j]);
//                }
//            }
//
//            // TODO change this as it is legacy
//            this._filterBlock = {target:this, filterPasses:passes};
//        }
//
//        this._filters = value;
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

Renderable2D.prototype.getBounds = function(matrix)
{
    matrix = matrix;//just to get passed js hinting (and preserve inheritance)
    return Rect.Empty;
};
Renderable2D.prototype.getLocalBounds = function()
{
    return this.getBounds(Mat32.Identity);///PIXI.EmptyRectangle();
};

//Renderable2D.prototype.startRender = function (renderer) {
//    //if (!this.visible) {
//    //    return;
//    //}
//    var transform = this.transform;
//    //renderer.setAlpha(this.worldAlpha, this.blendMode);
//    //renderer.setTransform(transform.modelView);
//
//    this.worldMatrix = transform.modelView;
//
//    if(this._filters)
//    {
//        renderer.pushFilter(this._filterBlock);
//    }
//
//    this._render(renderer);
//
//};

Renderable2D.prototype._render = function (renderer) {

};

//Renderable2D.prototype.finishRender = function (renderer) {
//    if(this._filters)
//    {
//        renderer.popFilter();
//    }
//
//};

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
