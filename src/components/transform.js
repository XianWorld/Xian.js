var Mathf = require("../math/mathf");
var Vec3 = require("../math/vec3");
var Quat = require("../math/quat");
var Mat3 = require("../math/mat3");
var Mat4 = require("../math/mat4");
var Component = require("./../core/component");
var Log = require("../context/main_context").Log;
"use strict";


var EPSILON = Mathf.EPSILON;


function Transform(opts) {
    opts || (opts = {});
    opts.sync = opts.sync !== undefined ? opts.sync : true;

    Component.call(this, opts);

    this.root = this;
    this.depth = 0;

    this.parent = undefined;
    this.children = [];

    this.position = opts.position !== undefined ? opts.position : new Vec3;
    this.rotation = opts.rotation !== undefined ? opts.rotation : new Quat;
    this.scale = opts.scale !== undefined ? opts.scale : new Vec3(1, 1, 1);

    this.matrix = new Mat4;
    this.matrixWorld = new Mat4;

    this.modelView = new Mat4;
    this.normalMatrix = new Mat3;
}

Component.extend(Transform);


Transform.prototype.copy = function (other) {
    var children = other.children,
        i = children.length;

    this.position.copy(other.position);
    this.scale.copy(other.scale);
    this.rotation.copy(other.rotation);

    while (i--) this.addChild(children[i].gameObject.clone().transform);
    if (other.parent) other.parent.addChild(this);

    return this;
};

Transform.prototype.clear = function () {
    Component.prototype.clear.call(this);
    var children = this.children,
        i = children.length;

    while (i--) this.removeChild(children[i]);

    this.position.set(0, 0, 0);
    this.scale.set(1, 1, 1);
    this.rotation.set(0, 0, 0, 1);

    this.root = this;
    this.depth = 0;

    return this;
};


Transform.prototype.translate = function () {
    var vec = new Vec3;

    return function (translation, relativeTo) {
        vec.copy(translation);

        if (relativeTo instanceof Transform) {
            vec.transformQuat(relativeTo.rotation);
        } else if (relativeTo instanceof Quat) {
            vec.transformQuat(relativeTo);
        }

        this.position.add(vec);

        return this;
    };
}();


Transform.prototype.rotate = function () {
    var vec = new Vec3;

    return function (rotation, relativeTo) {
        vec.copy(rotation);

        if (relativeTo instanceof Transform) {
            vec.transformQuat(relativeTo.rotation);
        } else if (relativeTo instanceof Quat) {
            vec.transformQuat(relativeTo);
        }

        this.rotation.rotate(vec.x, vec.y, vec.z);

        return this;
    };
}();


Transform.prototype.lookAt = function () {
    var mat = new Mat4,
        vec = new Vec3,
        dup = new Vec3(0.0, 0.0, 1.0);

    return function (target, up) {
        up = up || dup;

        if (target instanceof Transform) {
            vec.set(0.0, 0.0, 0.0).transformMat4(target.matrixWorld);
        } else {
            vec.copy(target);
        }

        mat.lookAt(this.position, vec, up);
        this.rotation.fromMat4(mat);

        return this;
    };
}();


Transform.prototype.follow = function () {
    var target = new Vec3,
        position = new Vec3,
        delta = new Vec3;

    return function (transform, speed) {
        position.set(0.0, 0.0, 0.0).transformMat4(this.matrixWorld);
        target.set(0.0, 0.0, 0.0).transformMat4(transform.matrixWorld);

        delta.vsub(target, position);

        if (delta.lengthSq() > EPSILON) this.position.add(delta.smul(speed));

        return this;
    };
}();


Transform.prototype.addChild = function (child, others) {
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

    if (index === -1) {
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


Transform.prototype.addChildren = function () {
    var i, il, scene;

    for (i = 0, il = arguments.length; i < il; i++) this.addChild(arguments[i], true);
    //if (this.gameObject && (scene = this.gameObject.scene)) {
    //    scene.componentManagers.Transform.sort();
    //}
    return this;
};


Transform.prototype.removeChild = function (child, others) {
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

    for (i = 0, il = arguments.length; i < il; i++) this.removeChild(arguments[i], true);
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


Transform.prototype.toWorld = function (v) {

    return v.transformMat4(this.matrixWorld);
};


Transform.prototype.toLocal = function () {
    var mat = new Mat4;

    return function (v) {

        return v.transformMat4(mat.inverseMat(this.matrixWorld));
    };
}();


Transform.prototype.update = function () {
    var matrix = this.matrix,
        parent = this.parent;

    //TODO use get/set for position/scale/rotation to assign dirty flag for recalculations.
    matrix.compose(this.position, this.scale, this.rotation);

    if (parent) {
        this.matrixWorld.mmul(parent.matrixWorld, matrix);
    } else {
        this.matrixWorld.copy(matrix);
    }
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

Transform.prototype.updateMatrices = function (viewMatrix) {

    this.modelView.mmul(viewMatrix, this.matrixWorld);
    //this.normalMatrix.inverseMat4(this.modelView).transpose();
};

//Transform.prototype.init = function () {
//    Component.prototype.init.call(this);
//
//};

Transform.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);
    var children = this.children,
        jsonChildren = json.children || (json.children = []),
        i = children.length;

    while (i--) jsonChildren[i] = children[i]._id;

    json.position = this.position.toJSON(json.position);
    json.scale = this.scale.toJSON(json.scale);
    json.rotation = this.rotation.toJSON(json.rotation);

    return json;
};


Transform.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);
    var children = json.children,
        i = children.length,
        child, scene;

    if (this.gameObject && (scene = this.gameObject.scene)) {
        while (i--) {
            child = scene.findComponentByJSONId(children[i]);

            if (!this.hasChild(child)) {
                this.addChild(child);
            }
        }
    } else {
        this.once("init", function () {
            var scene = this.gameObject.scene;

            while (i--) {
                child = scene.findComponentByJSONId(children[i]);

                if (!this.hasChild(child)) {
                    this.addChild(child);
                }
            }
        });
    }

    this.position.fromJSON(json.position);
    this.scale.fromJSON(json.scale);
    this.rotation.fromJSON(json.rotation);

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
