var Mathf = require("../../math/mathf");
var Vec2 = require("../../math/vec2");
var Mat32 = require("../../math/mat32");
var Mat3 = require("../../math/mat3");
var Mat4 = require("../../math/mat4");
var Component = require("./../../core/component");
var Config = require("../../base/config");
var Log = require("../../context/main_context").Log;
var Transform = require("./../../components/transform");
"use strict";


var EPSILON = Mathf.EPSILON;


function Transform2D(opts) {
    opts || (opts = {});
    //opts.sync = opts.sync !== undefined ? opts.sync : true;

    Transform.call(this, opts);

    //this.root = this;
    //this.depth = 0;
    //
    //this.parent = undefined;
    //this.children = [];
    //
    this.position = opts.position !== undefined ? opts.position : new Vec2;
    this.rotation = opts.rotation !== undefined ? opts.rotation : 0;
    this.scale = opts.scale !== undefined ? opts.scale : new Vec2(1, 1);

    this.matrix = new Mat4;
    this.matrixWorld = new Mat4;

    this.modelView = new Mat4;
    this.normalMatrix = new Mat3;
}

Transform.extend(Transform2D);


Transform2D.prototype.copy = function (other) {
    Transform.prototype.copy.call(this, other);

    //var children = other.children,
    //    i = children.length;
    //
    //
    //while (i--) this.addChild(children[i].gameObject.clone().transform);
    //if (other.parent) other.parent.addChild(this);

    this.position.copy(other.position);
    this.scale.copy(other.scale);
    this.rotation = other.rotation;

    return this;
};

Transform2D.prototype.clear = function () {
    Transform.prototype.clear.call(this);
    //var children = this.children,
    //    i = children.length;
    //
    //while (i--) this.removeChild(children[i]);

    this.position.set(0, 0);
    this.scale.set(1, 1);
    this.rotation = 0;

    //this.root = this;
    //this.depth = 0;

    return this;
};


Transform2D.prototype.translate = function () {
    var vec = new Vec2;

    return function (translation, relativeTo) {
        vec.copy(translation);

        if (relativeTo instanceof Transform2D) {
            vec.transformAngle(relativeTo.rotation);
        } else if (relativeTo) {
            vec.transformAngle(relativeTo);
        }

        this.position.add(vec);

        return this;
    };
}();


Transform2D.prototype.rotate = function (rotation, relativeTo) {

    if (relativeTo instanceof Transform2D) {
        rotation += relativeTo.rotation;
    } else if (relativeTo) {
        rotation += relativeTo;
    }

    this.rotation += rotation;

    return this;
};


Transform2D.prototype.lookAt = function () {
    var mat = new Mat32,
        vec = new Vec2;

    return function (target) {

        if (target instanceof Transform2D) {
            vec.copy(target.position);
        } else {
            vec.copy(target);
        }

        mat.lookAt(this.position, vec);
        this.rotation = mat.getRotation();

        return this;
    };
}();


Transform2D.prototype.follow = function () {
    var target = new Vec2,
        position = new Vec2,
        delta = new Vec2;

    return function (transform, speed) {
        position.set(0, 0).transformMat4(this.matrixWorld);
        target.set(0, 0).transformMat4(transform.matrixWorld);

        delta.vsub(target, position);

        if (delta.lengthSq() > EPSILON) this.position.add(delta.smul(speed));

        return this;
    };
}();


//Transform2D.prototype.addChild = function (child, others) {
//    if (!(child instanceof Transform2D)) {
//        Log.error("Transform2D.add: can\'t add passed argument, it is not an instance of Transform2D");
//        return this;
//    }
//    var children = this.children,
//        index = children.indexOf(child),
//        root, depth, scene;
//
//    if (index === -1) {
//        if (child.parent) child.parent.remove(child);
//
//        //child.parent = this;
//        child._setParent(this);
//        children.push(child);
//
//        root = this;
//        depth = 0;
//
//        while (root.parent) {
//            root = root.parent;
//            depth++;
//        }
//        child.root = root;
//        this.root = root;
//
//        updateDepth(this, depth);
//        if (!others) {
//            //if (this.gameObject && (scene = this.gameObject.scene)) {
//            //    scene.componentManagers.Transform2D.sort();
//            //}
//        }
//    } else {
//        Log.error("Transform2D.add: child is not a member of this Transform2D");
//    }
//
//    return this;
//};
//
//
//Transform2D.prototype.addChildren = function () {
//    var i, il, scene;
//
//    for (i = 0, il = arguments.length; i < il; i++) this.addChild(arguments[i], true);
//    //if (this.gameObject && (scene = this.gameObject.scene)) {
//    //    scene.componentManagers.Transform2D.sort();
//    //}
//    return this;
//};
//
//
//Transform2D.prototype.removeChild = function (child, others) {
//    var children = this.children,
//        index = children.indexOf(child),
//        root, depth, scene;
//
//    if (index !== -1) {
//        //child.parent = undefined;
//        child._setParent(undefined);
//        children.splice(index, 1);
//
//        //root = this;
//        //depth = 0;
//        //
//        //while (root.parent) {
//        //    root = root.parent;
//        //    depth++;
//        //}
//        child.root = child;
//        //this.root = root;
//
//        updateDepth(this, 0);
//        if (!others) {
//            //if (this.gameObject && (scene = this.gameObject.scene)) {
//            //    scene.componentManagers.Transform2D.sort();
//            //}
//        }
//    } else {
//        Log.error("Transform2D.remove: child is not a member of this Transform2D");
//    }
//
//    return this;
//};
//
//
//Transform2D.prototype.removeChildren = function () {
//    var i, il, scene;
//
//    for (i = 0, il = arguments.length; i < il; i++) this.removeChild(arguments[i], true);
//    //if (this.gameObject && (scene = this.gameObject.scene)) {
//    //    scene.componentManagers.Transform2D.sort();
//    //}
//    return this;
//};
//
//
//Transform2D.prototype.detachChildren = function () {
//    var i = arguments.length;
//
//    while (i--) this.removeChild(children[i]);
//    return this;
//};
//
//
//Transform2D.prototype.hasChild = function (child) {
//
//    return !!~this.children.indexOf(child);
//};
//
//
//Transform2D.prototype.find = function (name) {
//    var children = this.children,
//        child,
//        i = children.length;
//
//    while (i--) {
//        child = children[i];
//
//        if (child.gameObject.name === name) return child;
//        if ((child = child.find(name))) return child;
//    }
//
//    return undefined;
//};


Transform2D.prototype.toWorld = function (v) {

    return v.transformMat4(this.matrixWorld);
};


Transform2D.prototype.toLocal = function () {
    var mat = new Mat4;

    return function (v) {

        return v.transformMat4(mat.inverseMat(this.matrixWorld));
    };
}();


Transform2D.prototype.update = function () {
    var mat = new Mat32;

    return function () {
        var matrix = this.matrix,
            parent = this.parent;

        matrix.fromMat32(mat.compose(this.position, this.scale, this.rotation));

        if (parent) {
            this.matrixWorld.mmul(parent.matrixWorld, matrix);
        } else {
            this.matrixWorld.copy(matrix);
        }
    };
}();

//Transform2D.prototype._setDepth = function (depth) {
//    if (this.depth === depth) return;
//
//    this.depth = depth;
//    this.emit("depthChanged", this, depth);
//};
//
//Transform2D.prototype._setParent = function (parent) {
//    if (this.parent === parent) return;
//
//    this.parent = parent;
//    this.emit("parentChanged", this, parent);
//};

Transform2D.prototype.updateMatrices = function (viewMatrix) {

    this.modelView.mmul(viewMatrix, this.matrixWorld);
    this.normalMatrix.inverseMat4(this.modelView).transpose();
};


Transform2D.prototype.toJSON = function (json) {
    json = Transform.prototype.toJSON.call(this, json);
    //var children = this.children,
    //    jsonChildren = json.children || (json.children = []),
    //    i = children.length;
    //
    //while (i--) jsonChildren[i] = children[i]._id;

    json.position = this.position.toJSON(json.position);
    json.scale = this.scale.toJSON(json.scale);
    json.rotation = this.rotation;

    return json;
};


Transform2D.prototype.fromJSON = function (json) {
    Transform.prototype.fromJSON.call(this, json);
    //var children = json.children,
    //    i = children.length,
    //    child, scene;
    //
    //if (this.gameObject && (scene = this.gameObject.scene)) {
    //    while (i--) {
    //        child = scene.findComponentByJSONId(children[i]);
    //
    //        if (!this.hasChild(child)) {
    //            this.addChild(child);
    //        }
    //    }
    //} else {
    //    this.once("init", function () {
    //        var scene = this.gameObject.scene;
    //
    //        while (i--) {
    //            child = scene.findComponentByJSONId(children[i]);
    //
    //            if (!this.hasChild(child)) {
    //                this.addChild(child);
    //            }
    //        }
    //    });
    //}

    this.position.fromJSON(json.position);
    this.scale.fromJSON(json.scale);
    this.rotation = json.rotation;

    return this;
};


//function updateDepth(transform, depth) {
//    var children = transform.children,
//        i = children.length;
//
//    transform.depth = depth;
//    while (i--) updateDepth(children[i], depth + 1);
//}


module.exports = Transform2D;
