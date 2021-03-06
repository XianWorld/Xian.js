var Mathf = require("../math/mathf");
var Vec3 = require("../math/vec3");
var Quat = require("../math/quat");
var Mat3 = require("../math/mat3");
var Mat4 = require("../math/mat4");
var Component = require("./../core/component");
var Log = require("../context/main_context").Log;
"use strict";


var EPSILON = Mathf.EPSILON;


function Transform() {

    Component.call(this);

    //only one 'transform' named component allowed
    this._name = "transform";

    this.root = this;
    this.depth = 0;

    this.parent = undefined;
    this.children = [];

}

Component.extend(Transform);

Transform.prototype.copy = function (other) {
    var children = other.children,
        i = children.length;

    while (i--) this.addChild(children[i].gameObject.clone().transform);
    if (other.parent) other.parent.addChild(this);

    return this;
};

Transform.prototype.clear = function () {
    Component.prototype.clear.call(this);
    var children = this.children,
        i = children.length;
    var child;

    while (i--) {
        child = children[i];
        this.removeChild(child);
        //If a transform is cleared, it's children will be destroyed.
        if(child.gameObject) child.gameObject.destroy();
    }

    this.root = this;
    this.depth = 0;

    return this;
};

Transform.prototype.destroy = function () {
    Component.prototype.destroy.call(this);
    this.root = undefined;
    return this;
};

Transform.prototype.addChild = function (child) {
    if (!(child instanceof Transform)) {
        Log.error("Transform.add: can\'t add passed argument, it is not an instance of Transform");
        return this;
    }
    if(!child.gameObject || !this.gameObject){
        Log.error("Transform.add: can\'t add passed argument, it should attach to a gameobject!");
        return this;
    }
    var children = this.children,
        index = children.indexOf(child),
        root, depth, scene, childScene;


    if (index === -1) {
        //when the transform attached, then automatically add to/remove from the scene
        scene = this.gameObject.scene;
        childScene = child.gameObject.scene;
        if (scene) {
            if(!childScene){
                scene.addGameObject(child.gameObject);
            }
        }
        else{
            if(childScene){
                childScene.removeGameObject(child.gameObject);
            }
        }

        if (child.parent) child.parent.removeChild(child);

        //child.parent = this;
        child._setParent(this);
        children.push(child);

        root = this;
        depth = 0;

        while (root.parent) {
            root = root.parent;
            depth++;
        }
        child.root = root;
        this.root = root;

        updateDepth(this, depth);

        child.gameObject.updateActive();
        //if (!others) {
        //    if (this.gameObject && (scene = this.gameObject.scene)) {
        //        scene.componentManagers.Transform.sort();
        //    }
        //}
    } else {
        Log.error("Transform.add: child is not a member of this Transform");
    }

    return this;
};

Transform.prototype.moveToTop = function (child) {
    var i;
    var children = this.children;

    i = children.indexOf(child);
    if(i < 0) return false;

    children.splice(i, 1);
    children.unshift(child);
    return true;
};

Transform.prototype.moveToBottom = function (child) {
    var i;
    var children = this.children;

    i = children.indexOf(child);
    if(i < 0) return false;

    children.splice(i, 1);
    children.push(child);
    return true;
};

Transform.prototype.addChildren = function () {
    var i, il, scene;

    for (i = 0, il = arguments.length; i < il; i++) this.addChild(arguments[i]);
    //if (this.gameObject && (scene = this.gameObject.scene)) {
    //    scene.componentManagers.Transform.sort();
    //}
    return this;
};


Transform.prototype.removeChild = function (child) {
    var children = this.children,
        index = children.indexOf(child),
        root, depth, scene;

    //TODO when child removed, it will retain in the scene, and move to the root of the scene

    if (index !== -1) {
        //child.parent = undefined;
        child._setParent(undefined);
        children.splice(index, 1);

        //root = this;
        //depth = 0;
        //
        //while (root.parent) {
        //    root = root.parent;
        //    depth++;
        //}
        child.root = child;
        //this.root = root;

        updateDepth(child, 0);
        child.gameObject.updateActive();

        //if (!others) {
        //    if (this.gameObject && (scene = this.gameObject.scene)) {
        //        scene.componentManagers.Transform.sort();
        //    }
        //}
    } else {
        Log.error("Transform.remove: child is not a member of this Transform");
    }

    return this;
};


Transform.prototype.removeChildren = function () {
    var i, il, scene;

    for (i = 0, il = arguments.length; i < il; i++) this.removeChild(arguments[i]);
    //if (this.gameObject && (scene = this.gameObject.scene)) {
    //    scene.componentManagers.Transform.sort();
    //}
    return this;
};


Transform.prototype.detachChildren = function () {
    var children = this.children,
        i = children.length;

    while (i--) this.removeChild(children[i]);
    return this;
};


Transform.prototype.hasChild = function (child) {

    return !!~this.children.indexOf(child);
};


Transform.prototype.find = function (name) {
    var children = this.children,
        child,
        i = children.length;

    while (i--) {
        child = children[i];

        if (child.gameObject.name === name) return child.gameObject;
        if ((child = child.find(name))) return child;
    }

    return undefined;
};

Transform.prototype._setDepth = function (depth) {
    if(this.depth === depth) return;

    this.depth = depth;
    this.emit("depthChanged", this, depth);
};

Transform.prototype._setParent = function (parent) {
    if(this.parent === parent) return;

    this.parent = parent;
    this.emit("parentChanged", this, parent);
};

Transform.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);
    var children = this.children,
        jsonChildren = json.children || (json.children = []),
        i = children.length;

    while (i--) jsonChildren[i] = children[i]._id;

    return json;
};


Transform.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);
    var children = json.children;
    if(children){
        var i, len = children.length,
            child, scene;

        if (this.gameObject && (scene = this.gameObject.scene)) {
            //while (i--) {
            for(i=0;i<len;i++){
                child = scene.findComponentByJSONId(children[i]);

                if (!this.hasChild(child)) {
                    this.addChild(child);
                }
            }
        } else {
            this.once("init", function () {
                var scene = this.gameObject.scene;

                //while (i--) {
                for(i=0;i<len;i++){
                    child = scene.findComponentByJSONId(children[i]);

                    if (!this.hasChild(child)) {
                        this.addChild(child);
                    }
                }
            });
        }
    }

    return this;
};


function updateDepth(transform, depth) {
    var children = transform.children,
        i = children.length;

    //transform.depth = depth;
    transform._setDepth(depth);

    while (i--) updateDepth(children[i], depth + 1);
}


module.exports = Transform;
