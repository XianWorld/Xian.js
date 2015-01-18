var TransformSystem = require("./../../systems/transform_system");
var Transform2D = require("./../components/transform_2d");
"use strict";


function Transform2DSystem(opts) {
    //opts || (opts = {});

    TransformSystem.call(this, opts);

    this.addEventName = "addTransform2D";
    this.removeEventName = "removeTransform2D";
    this.componentType = Transform2D;
}

TransformSystem.extend(Transform2DSystem);

//Transform2DSystem.prototype.onAdd = function (component) {
//
//    component.on("depthChanged", this._onDepthChanged, this);
//
//    if (component.depth === 0) this.rootTransforms.push(component);
//};
//
//Transform2DSystem.prototype.onRemove = function (component) {
//
//    component.off("depthChanged", this._onDepthChanged, this);
//
//    if (component.depth === 0) {
//        var index = this.rootTransforms.indexOf(component);
//        this.rootTransforms.splice(index, 1);
//    }
//};
//
//Transform2DSystem.prototype._onDepthChanged = function (transform, depth) {
//    this._setDirty();
//
//    //update root transforms
//    var index,
//        rootTransforms = this.rootTransforms;
//    index = rootTransforms.indexOf(transform);
//    if (depth === 0) {
//        if (index === -1) rootTransforms.push(transform);
//    }
//    else {
//        if (index !== -1) rootTransforms.splice(index, 1);
//    }
//};
//
//Transform2DSystem.prototype.sortFunction = function (a, b) {
//
//    return a.depth - b.depth;
//};


module.exports = Transform2DSystem;
