var ComponentSystem = require("./component_system");
var Transform = require("./../components/transform");
"use strict";


function TransformSystem(opts) {
    opts || (opts = {});

    ComponentSystem.call(this, opts);

    this.order = 99999;

    this.addEventName = "startTransform";
    this.removeEventName = "removeTransform";
    this.componentType = Transform;

    this.rootTransforms = [];
}

ComponentSystem.extend(TransformSystem);

//TransformSystem.prototype.isMatch = function (component) {
//    //if(component instanceof Transform)
//    if (component._type === "Transform")
//        return true;
//
//    return false;
//};

TransformSystem.prototype.onAdd = function (component) {

    component.on("depthChanged", this._onDepthChanged, this);

    if (component.depth === 0) this.rootTransforms.push(component);
};

TransformSystem.prototype.onRemove = function (component) {

    component.off("depthChanged", this._onDepthChanged, this);

    if (component.depth === 0) {
        var index = this.rootTransforms.indexOf(component);
        this.rootTransforms.splice(index, 1);
    }
};

TransformSystem.prototype._onDepthChanged = function (transform, depth) {
    this._setDirty();

    //update root transforms
    var index,
        rootTransforms = this.rootTransforms;
    index = rootTransforms.indexOf(transform);
    if (depth === 0) {
        if (index === -1) rootTransforms.push(transform);
    }
    else {
        if (index !== -1) rootTransforms.splice(index, 1);
    }
};

TransformSystem.prototype.sortFunction = function (a, b) {

    return a.depth - b.depth;
};


module.exports = TransformSystem;
