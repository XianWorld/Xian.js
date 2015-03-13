var Mathf = require("./mathf");
"use strict";


var sqrt = Math.sqrt,
    cos = Math.cos,
    sin = Math.sin,
    atan2 = Math.atan2;

/**
 * @class Mat32
 * 3x2 matrix
 * @param Number m11
 * @param Number m12
 * @param Number m13
 * @param Number m21
 * @param Number m22
 * @param Number m23
 */
function Mat32(m11, m12, m13, m21, m22, m23) {
    var te = new Float32Array(6);

    /**
     * @property Float32Array elements
     * @memberof Odin.Mat32
     */
    this.elements = te;

    te[0] = m11 !== undefined ? m11 : 1.0;
    te[2] = m12 || 0.0;
    te[4] = m13 || 0.0;
    te[1] = m21 || 0.0;
    te[3] = m22 !== undefined ? m22 : 1.0;
    te[5] = m23 || 0.0;
}

Mathf._classes.Mat32 = Mat32;

/**
 * @method clone
 * @memberof Odin.Mat32
 * returns new instance of this
 * @return Mat32
 */
Mat32.prototype.clone = function () {
    var te = this.elements;

    return new Mat32(
        te[0], te[2], te[4],
        te[1], te[3], te[5]
    );
};

/**
 * @method copy
 * @memberof Odin.Mat32
 * copies other
 * @param Mat32 other
 * @return this
 */
Mat32.prototype.copy = function (other) {
    var te = this.elements,
        me = other.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];

    return this;
};

/**
 * @method set
 * @memberof Odin.Mat32
 * sets values of this
 * @param Number m11
 * @param Number m12
 * @param Number m13
 * @param Number m21
 * @param Number m22
 * @param Number m23
 * @return this
 */
Mat32.prototype.set = function (m11, m12, m13, m21, m22, m23) {
    var te = this.elements;

    te[0] = m11;
    te[2] = m12;
    te[4] = m13;
    te[1] = m21;
    te[3] = m22;
    te[5] = m23;

    return this;
};

/**
 * @method mul
 * @memberof Odin.Mat32
 * muliples this's values by other's
 * @param Mat32 other
 * @return this
 */
Mat32.prototype.mul = function (other) {
    var ae = this.elements,
        be = other.elements,

        a11 = ae[0],
        a12 = ae[2],
        a13 = ae[4],
        a21 = ae[1],
        a22 = ae[3],
        a23 = ae[5],

        b11 = be[0],
        b12 = be[2],
        b13 = be[4],
        b21 = be[1],
        b22 = be[3],
        b23 = be[5];

    //ae[0] = a11 * b11 + a12 * b21;
    //ae[2] = a11 * b12 + a12 * b22;
    //
    //ae[1] = a21 * b11 + a22 * b21;
    //ae[3] = a21 * b12 + a22 * b22;
    //
    //ae[4] = a11 * b13 + a12 * b23 + a13;
    //ae[5] = a21 * b13 + a22 * b23 + a23;

    ae[0] = a11 * b11 + a21 * b12;
    ae[2] = a12 * b11 + a22 * b12;

    ae[1] = a11 * b21 + a21 * b22;
    ae[3] = a12 * b21 + a22 * b22;

    ae[4] = a11 * b13 + a12 * b23 + a13;
    ae[5] = a21 * b13 + a22 * b23 + a23;

    return this;
};

/**
 * @method mmul
 * @memberof Odin.Mat32
 * muliples a and b saves it in this
 * @param Mat32 a
 * @param Mat32 b
 * @return this
 */
Mat32.prototype.mmul = function (a, b) {
    var te = this.elements,
        ae = a.elements,
        be = b.elements,

        a11 = ae[0],
        a12 = ae[2],
        a13 = ae[4],
        a21 = ae[1],
        a22 = ae[3],
        a23 = ae[5],

        b11 = be[0],
        b12 = be[2],
        b13 = be[4],
        b21 = be[1],
        b22 = be[3],
        b23 = be[5];

    //te[0] = a11 * b11 + a12 * b21;//a0 * b0 + a2 * b1;
    //te[2] = a11 * b12 + a12 * b22;//a0 * b2 + a2 * b3;
    //
    //te[1] = a21 * b11 + a22 * b21;//a1 * b0 + a3 * b1;
    //te[3] = a21 * b12 + a22 * b22;//a1 * b2 + a3 * b3;
    //
    //te[4] = a11 * b13 + a12 * b23 + a13;//a0 * b4 + a2 * b5 + a4;
    //te[5] = a21 * b13 + a22 * b23 + a23;//a1 * b4 + a3 * b5 + a5;

    te[0] = a11 * b11 + a21 * b12;//a0 * b0 + a2 * b1;
    te[2] = a12 * b11 + a22 * b12;//a0 * b2 + a2 * b3;

    te[1] = a11 * b21 + a21 * b22;//a1 * b0 + a3 * b1;
    te[3] = a12 * b21 + a22 * b22;//a1 * b2 + a3 * b3;

    te[4] = a11 * b13 + a12 * b23 + a13;//a0 * b4 + a2 * b5 + a4;
    te[5] = a21 * b13 + a22 * b23 + a23;//a1 * b4 + a3 * b5 + a5;

    return this;
};

/**
 * @method smul
 * @memberof Odin.Mat32
 * muliples this by a scalar value
 * @param Number s
 * @return this
 */
Mat32.prototype.smul = function (s) {
    var te = this.elements;

    te[0] *= s;
    te[1] *= s;
    te[2] *= s;
    te[3] *= s;
    te[4] *= s;
    te[5] *= s;

    return this;
};

/**
 * @method sdiv
 * @memberof Odin.Mat32
 * divides this by scalar value
 * @param Number s
 * @return this
 */
Mat32.prototype.sdiv = function (s) {
    var te = this.elements;

    s = s !== 0.0 ? 1.0 / s : 1.0;

    te[0] *= s;
    te[1] *= s;
    te[2] *= s;
    te[3] *= s;
    te[4] *= s;
    te[5] *= s;

    return this;
};

/**
 * @method identity
 * @memberof Odin.Mat32
 * identity matrix
 * @return this
 */
Mat32.prototype.identity = function () {
    var te = this.elements;

    te[0] = 1;
    te[1] = 0.0;
    te[2] = 0.0;
    te[3] = 1;
    te[4] = 0.0;
    te[5] = 0.0;

    return this;
};

/**
 * @method zero
 * @memberof Odin.Mat32
 * zero matrix
 * @return this
 */
Mat32.prototype.zero = function () {
    var te = this.elements;

    te[0] = 0.0;
    te[1] = 0.0;
    te[2] = 0.0;
    te[3] = 0.0;
    te[4] = 0.0;
    te[5] = 0.0;

    return this;
};

/**
 * @method determinant
 * @memberof Odin.Mat32
 * returns the determinant of this
 * @return this
 */
Mat32.prototype.determinant = function () {
    var te = this.elements;

    return te[0] * te[3] - te[2] * te[1];
};

/**
 * @method inverse
 * @memberof Odin.Mat32
 * returns the inverse of this
 * @return this
 */
Mat32.prototype.inverse = function () {
    var te = this.elements,

        m11 = te[0],
        m12 = te[2],
        m13 = te[4],
        m21 = te[1],
        m22 = te[3],
        m23 = te[5],

        det = m11 * m22 - m12 * m21;

    if (det === 0.0) {
        return this.identity();
    }
    det = 1.0 / det;

    te[0] = m22 * det;
    te[1] = -m12 * det;
    te[2] = -m21 * det;
    te[3] = m11 * det;

    te[4] = (m21 * m23 - m22 * m13) * det;
    te[5] = -(m11 * m23 - m12 * m13) * det;

    return this;
};

/**
 * @method inverseMat
 * @memberof Odin.Mat32
 * returns the inverse of other
 * @param Mat32 other
 * @return this
 */
Mat32.prototype.inverseMat = function (other) {
    var te = this.elements,
        me = other.elements,

        m11 = me[0],
        m12 = me[2],
        m13 = me[4],
        m21 = me[1],
        m22 = me[3],
        m23 = me[5],

        det = m11 * m22 - m12 * m21;

    if (det === 0.0) {
        return this.identity();
    }
    det = 1.0 / det;

    te[0] = m22 * det;
    te[1] = -m12 * det;
    te[2] = -m21 * det;
    te[3] = m11 * det;

    te[4] = (m21 * m23 - m22 * m13) * det;
    te[5] = -(m11 * m23 - m12 * m13) * det;

    return this;
};

/**
 * @method transpose
 * @memberof Odin.Mat32
 * transposes this matrix
 * @return this
 */
Mat32.prototype.transpose = function () {
    var te = this.elements,
        tmp;

    tmp = te[1];
    te[1] = te[2];
    te[2] = tmp;

    return this;
};

/**
 * @method setTrace
 * @memberof Odin.Mat32
 * sets the diagonal of matrix
 * @param Number x
 * @param Number y
 * @return this
 */
Mat32.prototype.setTrace = function (x, y) {
    var te = this.elements;

    te[0] = x;
    te[3] = y;

    return this;
};

/**
 * @method lookAt
 * @memberof Odin.Mat32
 * makes matrix look from eye to target
 * @param Vec2 eye
 * @param Vec2 target
 * @return this
 */
Mat32.prototype.lookAt = function (eye, target) {
    var te = this.elements,
        x = target.x - eye.x,
        y = target.y - eye.y,
        a = atan2(y, x) - HALF_PI,
        c = cos(a),
        s = sin(a);

    te[0] = c;
    te[1] = s;
    te[2] = -s;
    te[3] = c;

    return this;
};

/**
 * @method compose
 * @memberof Odin.Mat32
 * sets matrix from position, scale, and an angle in radians
 * @param Vec2 position
 * @param Vec2 scale
 * @param Number angle
 * @return this
 */
Mat32.prototype.compose = function (position, scale, angle) {
    var te = this.elements,
        sx = scale.x,
        sy = scale.y,
        c = cos(angle),
        s = sin(angle);

    te[0] = c * sx;
    te[1] = s * sx;
    te[2] = -s * sy;
    te[3] = c * sy;

    te[4] = position.x;
    te[5] = position.y;

    return this;
};

/**
 * @method decompose
 * @memberof Odin.Mat32
 * gets matrix position, scale, and returns its angle in radians
 * @param Vec2 position
 * @param Vec2 scale
 * @return Number
 */
Mat32.prototype.decompose = function (position, scale) {
    var te = this.elements,
        m11 = te[0],
        m12 = te[1],
        sx = scale.set(m11, m12).length(),
        sy = scale.set(te[2], te[3]).length();

    position.x = te[4];
    position.y = te[5];

    scale.x = sx;
    scale.y = sy;

    return atan2(m12, m11);
};

/**
 * @method setRotation
 * @memberof Odin.Mat32
 * sets the rotation in radians this
 * @param Number angle
 * @return this
 */
Mat32.prototype.setScaleRotation = function (scale, angle) {
    var te = this.elements,
        sx = scale.x,
        sy = scale.y,
        c = cos(angle),
        s = sin(angle);

    te[0] = c * sx;
    te[1] = s * sx;
    te[2] = -s * sy;
    te[3] = c * sy;

    return this;
};

Mat32.prototype.setScaleSkew = function (scale, skewX, skewY) {
    var te = this.elements,
        sx = scale.x,
        sy = scale.y,
        cosx = cos(skewX),
        sinx = sin(skewX),
        cosy = cos(skewY),
        siny = sin(skewY);

    te[0] = cosy * sx;
    te[1] = siny * sx;
    te[2] = -sinx * sy;
    te[3] = cosx * sy;

    return this;
};

/**
 * @method setRotation
 * @memberof Odin.Mat32
 * sets the rotation in radians this
 * @param Number angle
 * @return this
 */
Mat32.prototype.setRotation = function (angle) {
    var te = this.elements,
        c = cos(angle),
        s = sin(angle);

    te[0] = c;
    te[1] = s;
    te[2] = -s;
    te[3] = c;

    return this;
};

/**
 * @method getRotation
 * @memberof Odin.Mat32
 * returns the rotation in radians of this
 * @return Number
 */
Mat32.prototype.getRotation = function () {
    var te = this.elements;

    return atan2(te[1], te[0]);
};

/**
 * @method setPosition
 * @memberof Odin.Mat32
 * sets the position of this
 * @param Vec2 v
 * @return this
 */
Mat32.prototype.setPosition = function (v) {
    var te = this.elements;

    te[4] = v.x;
    te[5] = v.y;

    return this;
};

/**
 * @method getPosition
 * @memberof Odin.Mat32
 * gets the position of this
 * @param Vec2 v
 * @return Vec2
 */
Mat32.prototype.getPosition = function (v) {
    var te = this.elements;

    v.x = te[4];
    v.y = te[5];

    return v;
};

/**
 * @method extractPosition
 * @memberof Odin.Mat32
 * gets position from other saves it in this
 * @param Mat32 other
 * @return this
 */
Mat32.prototype.extractPosition = function (other) {
    var te = this.elements,
        me = other.elements;

    te[4] = me[4];
    te[5] = me[5];

    return this;
};

/**
 * @method extractRotation
 * @memberof Odin.Mat32
 * gets rotation from other saves it in this
 * @param Mat32 other
 * @return this
 */
Mat32.prototype.extractRotation = function (other) {
    var te = this.elements,
        me = other.elements,

        m11 = me[0],
        m12 = me[2],
        m21 = me[1],
        m22 = me[3],

        x = m11 * m11 + m21 * m21,
        y = m12 * m12 + m22 * m22,

        sx = x > 0.0 ? 1.0 / sqrt(x) : 0.0,
        sy = y > 0.0 ? 1.0 / sqrt(y) : 0.0;

    te[0] = m11 * sx;
    te[1] = m21 * sx;

    te[2] = m12 * sy;
    te[3] = m22 * sy;

    return this;
};

/**
 * @method translate
 * @memberof Odin.Mat32
 * translates matrix by vector
 * @param Vec2 v
 * @return this
 */
Mat32.prototype.translate = function (v) {
    var te = this.elements,
        x = v.x,
        y = v.y;

    te[4] = te[0] * x + te[2] * y + te[4];
    te[5] = te[1] * x + te[3] * y + te[5];

    return this;
};

//Mat32.prototype.translate0 = function (x, y) {
//    var te = this.elements;
//
//    te[4] = te[0] * x + te[2] * y + te[4];
//    te[5] = te[1] * x + te[3] * y + te[5];
//
//    return this;
//};

/**
 * @method rotate
 * @memberof Odin.Mat32
 * rotates this by angle in radians
 * @param Number angle
 * @return this
 */
Mat32.prototype.rotate = function (angle) {
    var te = this.elements,

        m11 = te[0],
        m12 = te[2],
        m21 = te[1],
        m22 = te[3],

        s = sin(angle),
        c = sin(angle);

    te[0] = m11 * c + m12 * s;
    te[1] = m11 * -s + m12 * c;
    te[2] = m21 * c + m22 * s;
    te[3] = m21 * -s + m22 * c;

    return this;
};

/**
 * @method scale
 * @memberof Odin.Mat32
 * scales matrix by vector
 * @param Vec2 v
 * @return this
 */
Mat32.prototype.scale = function (v) {
    var te = this.elements,
        x = v.x,
        y = v.y;

    te[0] *= x;
    te[1] *= x;
    //te[4] *= x;

    te[2] *= y;
    te[3] *= y;
    //te[5] *= y;

    return this;
};
//Mat32.prototype.scale0 = function (x, y) {
//    var te = this.elements;
//
//    te[0] *= x;
//    te[1] *= x;
//    //te[4] *= x;
//
//    te[2] *= y;
//    te[3] *= y;
//    //te[5] *= y;
//
//    return this;
//};

/**
 * @method orthographic
 * @memberof Odin.Mat32
 * makes orthographic matrix
 * @param Number left
 * @param Number right
 * @param Number bottom
 * @param Number top
 * @return Mat32
 */
Mat32.prototype.orthographic = function (left, right, top, bottom) {
    var te = this.elements,
        w = right - left,
        h = top - bottom,

        x = (right + left) / w,
        y = (top + bottom) / h;

    te[0] = 2 / w;
    te[1] = 0.0;
    te[2] = 0.0;
    te[3] = 2 / h;
    te[4] = -x;
    te[5] = -y;

    return this;
};

/**
 * @method fromMat3
 * @memberof Odin.Mat32
 * sets this from Mat3
 * @param Mat3 m
 * @return this
 */
Mat32.prototype.fromMat3 = function (m) {
    var te = this.elements,
        me = m.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[3];
    te[3] = me[4];
    te[4] = 0.0;
    te[5] = 0.0;

    return this;
};

/**
 * @method fromMat4
 * @memberof Odin.Mat32
 * sets this from Mat4
 * @param Mat4 m
 * @return this
 */
Mat32.prototype.fromMat4 = function (m) {
    var te = this.elements,
        me = m.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[4];
    te[3] = me[5];
    te[4] = me[12];
    te[5] = me[13];

    return this;
};

/**
 * @memberof Odin.Mat32
 * @param Odin.Mat32 other
 * @return this
 */
Mat32.prototype.equals = function (other) {
    var ae = this.elements,
        be = other.elements;

    return !(
    ae[0] !== be[0] ||
    ae[1] !== be[1] ||
    ae[2] !== be[2] ||
    ae[3] !== be[3] ||
    ae[4] !== be[4] ||
    ae[5] !== be[5]
    );
};

/**
 * @memberof Odin.Mat32
 * @param Odin.Mat32 other
 * @return this
 */
Mat32.prototype.notEquals = function (other) {
    var ae = this.elements,
        be = other.elements;

    return (
    ae[0] !== be[0] ||
    ae[1] !== be[1] ||
    ae[2] !== be[2] ||
    ae[3] !== be[3] ||
    ae[4] !== be[4] ||
    ae[5] !== be[5]
    );
};

/**
 * @method fromJSON
 * @memberof Odin.Mat32
 * sets values from JSON object
 * @param Object json
 * @return this
 */
Mat32.prototype.fromJSON = function (json) {
    var te = this.elements,
        me = json.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];

    return this;
};

/**
 * @method toJSON
 * @memberof Odin.Mat32
 * returns json object of this
 * @return Object
 */
Mat32.prototype.toJSON = function (json) {
    json || (json = {});
    var te = this.elements,
        je = json.elements || (json.elements = []);

    json._className = "Mat32";
    je[0] = te[0];
    je[1] = te[1];
    je[2] = te[2];
    je[3] = te[3];
    je[4] = te[4];
    je[5] = te[5];

    return json;
};

/**
 * @method fromArray
 * @memberof Odin.Mat32
 * sets values from Array object
 * @param Object json
 * @return this
 */
Mat32.prototype.fromArray = function (array) {
    var te = this.elements;

    te[0] = array[0];
    te[1] = array[1];
    te[2] = array[2];
    te[3] = array[3];
    te[4] = array[4];
    te[5] = array[5];

    return this;
};

/**
 * @method toArray
 * @memberof Odin.Mat32
 * returns array object of this
 * @return Object
 */
Mat32.prototype.toArray = function (array) {
    array || (array = []);
    var te = this.elements;

    array[0] = te[0];
    array[1] = te[1];
    array[2] = te[2];
    array[3] = te[3];
    array[4] = te[4];
    array[5] = te[5];

    return array;
};

Mat32.prototype.toArray3 = function (array) {
    array || (array = new Float32Array(9));
    var te = this.elements;

    array[0] = te[0];
    array[1] = te[1];
    array[2] = te[2];
    array[3] = te[3];
    array[4] = te[4];
    array[5] = te[5];

    return array;
};
/**
 * @method toString
 * @memberof Odin.Mat32
 * returns string of this
 * @return String
 */
Mat32.prototype.toString = function () {
    var te = this.elements;

    return (
    "Mat32[ " + te[0] + ", " + te[2] + ", " + te[4] + "]\n" +
    "     [ " + te[1] + ", " + te[3] + ", " + te[5] + "]"
    );
};

Mat32.Identity = new Mat32();

module.exports = Mat32;
