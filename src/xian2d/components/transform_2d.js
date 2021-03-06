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

function Transform2D() {

    Transform.call(this);

    this.identity = false;
    this._position = new Vec2;
    this._rotation = 0;
    this._scale = new Vec2(1, 1);

    this._skewX = 0;
    this._skewY = 0;
    this._dirty_skewX = true;
    this._dirty_skewY = true;
    this._skewed = false;

    this.matrix = new Mat32;
    this.matrixWorld = new Mat32;
    this.modelView = new Mat32;

    this._dirty_rotation = true;
    //world matrix changed flag
    this._matrix_changed = false;
    //PVM changed flag
    this._pvm_changed = false;
}

Transform.extend(Transform2D);

Object.defineProperty(Transform2D.prototype, "position", {
    get: function () {
        return this._position;
    },
    set: function (value) {
        this._position.copy(value);
    }
});
Object.defineProperty(Transform2D.prototype, "scale", {
    get: function () {
        return this._scale;
    },
    set: function (value) {
        this._scale.copy(value);
    }
});
Object.defineProperty(Transform2D.prototype, "skewX", {
    get: function () {
        return this._skewX;
    },
    set: function (value) {
        if (this._skewX === value) return;
        this._skewX = value;
        this._skewed = true;
        this._rotation = value;
        this._dirty_skewX = true;
    }
});
Object.defineProperty(Transform2D.prototype, "skewY", {
    get: function () {
        return this._skewY;
    },
    set: function (value) {
        if (this._skewY === value) return;
        this._skewY = value;
        this._skewed = true;
        this._rotation = value;
        this._dirty_skewY = true;
    }
});
Object.defineProperty(Transform2D.prototype, "rotation", {
    get: function () {
        return this._rotation;
    },
    set: function (value) {
        if (this._rotation === value) return;
        this._rotation = value;
        this._skewed = false;
        this._skewX = value;
        this._skewY = value;
        this._dirty_rotation = true;
    }
});

Transform2D.prototype.copy = function (other) {
    Transform.prototype.copy.call(this, other);

    this.identity = other.identity;
    this.position.copy(other.position);
    this.scale.copy(other.scale);
    this._skewed = other._skewed;
    if(other._skewed){
        this.skewX = other.skewX;
        this.skewY = other.skewY;
    }
    else
        this.rotation = other.rotation;

    return this;
};

Transform2D.prototype.clear = function () {
    Transform.prototype.clear.call(this);

    this.identity = false;
    this.position.set(0, 0);
    this.scale.set(1, 1);
    this.rotation = 0;

    return this;
};

Transform2D.prototype.destroy = function () {
    Transform.prototype.destroy.call(this);

    this._position = undefined;
    this._scale = undefined;

    this.matrix = undefined;
    this.matrixWorld = undefined;
    this.modelView = undefined;
};

Transform2D.prototype.toJSON = function (json) {
    json = Transform.prototype.toJSON.call(this, json);

    json.identity = this.identity;

    json.position = this.position.toJSON(json.position);
    json.scale = this.scale.toJSON(json.scale);

    json.skewed = this._skewed;
    if(this._skewed)
    {
        json.skewX = this.skewX;
        json.skewY = this.skewY;
    }
    else
        json.rotation = this.rotation;

    return json;
};

Transform2D.prototype.fromJSON = function (json) {
    Transform.prototype.fromJSON.call(this, json);

    this.identity = json.identity !== undefined ? !!json.identity : false;

    json.position ? this.position.fromJSON(json.position) : this.position.clear();
    json.scale ? this.scale.fromJSON(json.scale) : this.scale.set(1,1);

    this._skewed = json.skewed !== undefined ? !!json.skewed : false;
    if(this._skewed)
    {
        this.skewX = json.skewX || 0;
        this.skewY = json.skewY || 0;
    }
    else
        this.rotation = json.rotation || 0;

    return this;
};

Transform2D.prototype.update = function () {
    //var mat = new Mat32;
    var matrix = this.matrix,
        parent = this.parent;

    this._matrix_changed = false;
    if (this.identity) {
        if (parent) {
            this.matrixWorld = parent.matrixWorld;
            this._matrix_changed = parent._matrix_changed;
        } else {
            this.matrixWorld.copy(matrix);
        }
    } else {
        //if(this._position._dirty || this._scale._dirty || this._dirty_rotation)
        //{
        //    //matrix.fromMat32(mat.compose(this._position, this._scale, this._rotation));
        //    matrix.compose(this._position, this._scale, this._rotation);
        //    this._position._dirty = this._scale._dirty = this._dirty_rotation = false;
        //}
        if (this._position._dirty) {
            matrix.setPosition(this._position);
            this._position._dirty = false;
            this._matrix_changed = true;
        }
        if (this._dirty_rotation || this._scale._dirty || this._dirty_skewX || this._dirty_skewY) {
            if(this._skewed){
                //TODO should be optimized
                matrix.setScaleSkew(this._scale, this._skewX, this._skewY);
            }
            else {
                matrix.setScaleRotation(this._scale, this._rotation);
            }
            this._dirty_rotation = false;
            this._dirty_skewX = this._dirty_skewY = false;
            this._scale._dirty = false;
            this._matrix_changed = true;
        }

        if (parent) {
            if (parent._matrix_changed || this._matrix_changed) {
                this.matrixWorld.mmul(parent.matrixWorld, matrix);
                this._matrix_changed = true;
            }
        } else {
            if (this._matrix_changed)
                this.matrixWorld.copy(matrix);
        }
    }
};

Transform2D.prototype.updateMatrices = function (viewMatrix, pv_changed) {
    this._pvm_changed = false;
    if (pv_changed || this._matrix_changed) {
        this._pvm_changed = true;
        this.modelView.mmul(viewMatrix, this.matrixWorld);
    }
    //this.normalMatrix.inverseMat4(this.modelView).transpose();
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

Transform2D.prototype.toWorld = function (v) {

    return v.transformMat32(this.matrixWorld);
};


Transform2D.prototype.toLocal = function () {
    var mat = new Mat4;

    return function (v) {

        //TODO
        return v.transformMat32(mat.inverseMat(this.matrixWorld));
    };
}();


module.exports = Transform2D;
