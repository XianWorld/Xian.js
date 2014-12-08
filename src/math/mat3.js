var Mathf = require("./mathf");
"use strict";


var cos = Math.cos,
    sin = Math.sin;

/**
 * @class Mat3
 * 3x3 matrix
 * @param Number m11
 * @param Number m12
 * @param Number m13
 * @param Number m21
 * @param Number m22
 * @param Number m23
 * @param Number m31
 * @param Number m32
 * @param Number m33
 */
function Mat3(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
    var te = new Float32Array(9);

    /**
     * @property Float32Array elements
     * @memberof Odin.Mat3
     */
    this.elements = te;

    te[0] = m11 !== undefined ? m11 : 1.0;
    te[3] = m12 || 0.0;
    te[6] = m13 || 0.0;
    te[1] = m21 || 0.0;
    te[4] = m22 !== undefined ? m22 : 1.0;
    te[7] = m23 || 0.0;
    te[2] = m31 || 0.0;
    te[5] = m32 || 0.0;
    te[8] = m33 !== undefined ? m33 : 1.0;
}

Mathf._classes.Mat3 = Mat3;

/**
 * @method clone
 * @memberof Odin.Mat3
 * returns new instance of this
 * @return Mat3
 */
Mat3.prototype.clone = function () {
    var te = this.elements;

    return new Mat3(
        te[0], te[3], te[6],
        te[1], te[4], te[7],
        te[2], te[5], te[8]
    );
};

/**
 * @method copy
 * @memberof Odin.Mat3
 * copies other
 * @param Mat3 other
 * @return this
 */
Mat3.prototype.copy = function (other) {
    var te = this.elements,
        me = other.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];

    return this;
};

/**
 * @method set
 * @memberof Odin.Mat3
 * sets values of this
 * @param Number m11
 * @param Number m12
 * @param Number m13
 * @param Number m21
 * @param Number m22
 * @param Number m23
 * @param Number m31
 * @param Number m32
 * @param Number m33
 * @return this
 */
Mat3.prototype.set = function (m11, m12, m13, m21, m22, m23, m31, m32, m33) {
    var te = this.elements;

    te[0] = m11;
    te[3] = m12;
    te[6] = m13;
    te[1] = m21;
    te[4] = m22;
    te[7] = m23;
    te[2] = m31;
    te[5] = m32;
    te[8] = m33;

    return this;
};

/**
 * @method mul
 * @memberof Odin.Mat3
 * muliples this's values by other's
 * @param Mat3 other
 * @return this
 */
Mat3.prototype.mul = function (other) {
    var ae = this.elements,
        be = other.elements,

        a11 = ae[0],
        a12 = ae[3],
        a13 = ae[6],
        a21 = ae[1],
        a22 = ae[4],
        a23 = ae[7],
        a31 = ae[2],
        a32 = ae[5],
        a33 = ae[8],

        b11 = be[0],
        b12 = be[3],
        b13 = be[6],
        b21 = be[1],
        b22 = be[4],
        b23 = be[7],
        b31 = be[2],
        b32 = be[5],
        b33 = be[8];

    ae[0] = a11 * b11 + a21 * b12 + a31 * b13;
    ae[3] = a12 * b11 + a22 * b12 + a32 * b13;
    ae[6] = a13 * b11 + a23 * b12 + a33 * b13;

    ae[1] = a11 * b21 + a21 * b22 + a31 * b23;
    ae[4] = a12 * b21 + a22 * b22 + a32 * b23;
    ae[7] = a13 * b21 + a23 * b22 + a33 * b23;

    ae[2] = a11 * b31 + a21 * b32 + a31 * b33;
    ae[5] = a12 * b31 + a22 * b32 + a32 * b33;
    ae[8] = a13 * b31 + a23 * b32 + a33 * b33;

    return this;
};

/**
 * @method mmul
 * @memberof Odin.Mat3
 * muliples a and b saves it in this
 * @param Mat3 a
 * @param Mat3 b
 * @return this
 */
Mat3.prototype.mmul = function (a, b) {
    var te = this.elements,
        ae = a.elements,
        be = b.elements,

        a11 = ae[0],
        a12 = ae[3],
        a13 = ae[6],
        a21 = ae[1],
        a22 = ae[4],
        a23 = ae[7],
        a31 = ae[2],
        a32 = ae[5],
        a33 = ae[8],

        b11 = be[0],
        b12 = be[3],
        b13 = be[6],
        b21 = be[1],
        b22 = be[4],
        b23 = be[7],
        b31 = be[2],
        b32 = be[5],
        b33 = be[8];

    te[0] = a11 * b11 + a21 * b12 + a31 * b13;
    te[3] = a12 * b11 + a22 * b12 + a32 * b13;
    te[6] = a13 * b11 + a23 * b12 + a33 * b13;

    te[1] = a11 * b21 + a21 * b22 + a31 * b23;
    te[4] = a12 * b21 + a22 * b22 + a32 * b23;
    te[7] = a13 * b21 + a23 * b22 + a33 * b23;

    te[2] = a11 * b31 + a21 * b32 + a31 * b33;
    te[5] = a12 * b31 + a22 * b32 + a32 * b33;
    te[8] = a13 * b31 + a23 * b32 + a33 * b33;

    return this;
};

/**
 * @method smul
 * @memberof Odin.Mat3
 * muliples this by a scalar value
 * @param Number s
 * @return this
 */
Mat3.prototype.smul = function (s) {
    var te = this.elements;

    te[0] *= s;
    te[1] *= s;
    te[2] *= s;
    te[3] *= s;
    te[4] *= s;
    te[5] *= s;
    te[6] *= s;
    te[7] *= s;
    te[8] *= s;

    return this;
};

/**
 * @method sdiv
 * @memberof Odin.Mat3
 * divides this by scalar value
 * @param Number s
 * @return this
 */
Mat3.prototype.sdiv = function (s) {
    var te = this.elements;

    s = s === 0.0 ? 0.0 : 1.0 / s;

    te[0] *= s;
    te[1] *= s;
    te[2] *= s;
    te[3] *= s;
    te[4] *= s;
    te[5] *= s;
    te[6] *= s;
    te[7] *= s;
    te[8] *= s;

    return this;
};

/**
 * @method identity
 * @memberof Odin.Mat3
 * identity matrix
 * @return this
 */
Mat3.prototype.identity = function () {
    var te = this.elements;

    te[0] = 1;
    te[1] = 0.0;
    te[2] = 0.0;
    te[3] = 0.0;
    te[4] = 1;
    te[5] = 0.0;
    te[6] = 0.0;
    te[7] = 0.0;
    te[8] = 1;

    return this;
};

/**
 * @method zero
 * @memberof Odin.Mat3
 * zero matrix
 * @return this
 */
Mat3.prototype.zero = function () {
    var te = this.elements;

    te[0] = 0.0;
    te[1] = 0.0;
    te[2] = 0.0;
    te[3] = 0.0;
    te[4] = 0.0;
    te[5] = 0.0;
    te[6] = 0.0;
    te[7] = 0.0;
    te[8] = 0.0;

    return this;
};

/**
 * @method determinant
 * @memberof Odin.Mat3
 * returns the determinant of this
 * @return this
 */
Mat3.prototype.determinant = function () {
    var te = this.elements,

        a = te[0],
        b = te[1],
        c = te[2],
        d = te[3],
        e = te[4],
        f = te[5],
        g = te[6],
        h = te[7],
        i = te[8];

    return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
};

/**
 * @method inverse
 * @memberof Odin.Mat3
 * returns the inverse of this
 * @return this
 */
Mat3.prototype.inverse = function () {
    var te = this.elements,
        m11 = te[0],
        m12 = te[3],
        m13 = te[6],
        m21 = te[1],
        m22 = te[4],
        m23 = te[7],
        m31 = te[2],
        m32 = te[5],
        m33 = te[8],

        m0 = m22 * m33 - m23 * m32,
        m3 = m13 * m32 - m12 * m33,
        m6 = m12 * m23 - m13 * m22,

        det = m11 * m0 + m21 * m3 + m31 * m6;

    if (det === 0.0) {
        return this.identity();
    }
    det = 1.0 / det;

    te[0] = m0 * det;
    te[1] = (m23 * m31 - m21 * m33) * det;
    te[2] = (m21 * m32 - m22 * m31) * det;

    te[3] = m3 * det;
    te[4] = (m11 * m33 - m13 * m31) * det;
    te[5] = (m12 * m31 - m11 * m32) * det;

    te[6] = m6 * det;
    te[7] = (m13 * m21 - m11 * m23) * det;
    te[8] = (m11 * m22 - m12 * m21) * det;

    return this;
};

/**
 * @method inverseMat
 * @memberof Odin.Mat3
 * returns the inverse of other
 * @param Mat3 other
 * @return this
 */
Mat3.prototype.inverseMat = function (other) {
    var te = this.elements,
        me = other.elements,
        m11 = me[0],
        m12 = me[3],
        m13 = me[6],
        m21 = me[1],
        m22 = me[4],
        m23 = me[7],
        m31 = me[2],
        m32 = me[5],
        m33 = me[8],

        m0 = m22 * m33 - m23 * m32,
        m3 = m13 * m32 - m12 * m33,
        m6 = m12 * m23 - m13 * m22,

        det = m11 * m0 + m21 * m3 + m31 * m6;

    if (det === 0.0) {
        return this.identity();
    }
    det = 1.0 / det;

    te[0] = m0 * det;
    te[1] = (m23 * m31 - m21 * m33) * det;
    te[2] = (m21 * m32 - m22 * m31) * det;

    te[3] = m3 * det;
    te[4] = (m11 * m33 - m13 * m31) * det;
    te[5] = (m12 * m31 - m11 * m32) * det;

    te[6] = m6 * det;
    te[7] = (m13 * m21 - m11 * m23) * det;
    te[8] = (m11 * m22 - m12 * m21) * det;

    return this;
};

/**
 * @method inverseMat4
 * @memberof Odin.Mat3
 * returns the inverse of a Mat4
 * @param Mat4 other
 * @return this
 */
Mat3.prototype.inverseMat4 = function (other) {
    var te = this.elements,
        me = other.elements,
        m11 = me[0],
        m12 = me[4],
        m13 = me[8],
        m21 = me[1],
        m22 = me[5],
        m23 = me[9],
        m31 = me[2],
        m32 = me[6],
        m33 = me[10],

        m0 = m22 * m33 - m23 * m32,
        m3 = m13 * m32 - m12 * m33,
        m6 = m12 * m23 - m13 * m22,

        det = m11 * m0 + m21 * m3 + m31 * m6;

    if (det === 0.0) {
        return this.identity();
    }
    det = 1.0 / det;

    te[0] = m0 * det;
    te[1] = (m23 * m31 - m21 * m33) * det;
    te[2] = (m21 * m32 - m22 * m31) * det;

    te[3] = m3 * det;
    te[4] = (m11 * m33 - m13 * m31) * det;
    te[5] = (m12 * m31 - m11 * m32) * det;

    te[6] = m6 * det;
    te[7] = (m13 * m21 - m11 * m23) * det;
    te[8] = (m11 * m22 - m12 * m21) * det;

    return this;
};

/**
 * @method transpose
 * @memberof Odin.Mat3
 * transposes this matrix
 * @return this
 */
Mat3.prototype.transpose = function () {
    var te = this.elements,
        tmp;

    tmp = te[1];
    te[1] = te[3];
    te[3] = tmp;
    tmp = te[2];
    te[2] = te[6];
    te[6] = tmp;
    tmp = te[5];
    te[5] = te[7];
    te[7] = tmp;

    return this;
};

/**
 * @method setTrace
 * @memberof Odin.Mat3
 * sets the diagonal of matrix
 * @param Vec3 v
 * @return this
 */
Mat3.prototype.setTrace = function (v) {
    var te = this.elements;

    te[0] = v.x;
    te[4] = v.y;
    te[8] = v.z;

    return this;
};

/**
 * @method scale
 * @memberof Odin.Mat3
 * scales this by vector
 * @param Vec3 v
 * @return this
 */
Mat3.prototype.scale = function (v) {
    var te = this.elements,
        x = v.x,
        y = v.y,
        z = v.z;

    te[0] *= x;
    te[3] *= y;
    te[6] *= z;
    te[1] *= x;
    te[4] *= y;
    te[7] *= z;
    te[2] *= x;
    te[5] *= y;
    te[8] *= z;

    return this;
};

/**
 * @method makeScale
 * @memberof Odin.Mat3
 * makes this a scale matrix
 * @param Number x
 * @param Number y
 * @param Number z
 * @return this
 */
Mat3.prototype.makeScale = function (x, y, z) {

    return this.set(
        x, 0.0, 0.0,
        0.0, y, 0.0,
        0.0, 0.0, z
    );
};

/**
 * @method makeRotationX
 * @memberof Odin.Mat3
 * makes this a rotation matrix along x axis
 * @param Number angle
 * @return this
 */
Mat3.prototype.makeRotationX = function (angle) {
    var c = cos(angle),
        s = sin(angle);

    return this.set(
        1, 0.0, 0.0,
        0.0, c, -s,
        0.0, s, c
    );
};

/**
 * @method makeRotationY
 * @memberof Odin.Mat3
 * makes this a rotation matrix along y axis
 * @param Number angle
 * @return this
 */
Mat3.prototype.makeRotationY = function (angle) {
    var c = cos(angle),
        s = sin(angle);

    return this.set(
        c, 0.0, s,
        0.0, 1, 0.0, -s, 0.0, c
    );
};

/**
 * @method makeRotationZ
 * @memberof Odin.Mat3
 * makes this a rotation matrix along z axis
 * @param Number angle
 * @return this
 */
Mat3.prototype.makeRotationZ = function (angle) {
    var c = cos(angle),
        s = sin(angle);

    return this.set(
        c, -s, 0.0,
        s, c, 0.0,
        0.0, 0.0, 1
    );
};

/**
 * @method fromMat2
 * @memberof Odin.Mat3
 * sets this from Mat2
 * @param Mat2 m
 * @return this
 */
Mat3.prototype.fromMat2 = function (m) {
    var te = this.elements,
        me = m.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = 0.0;
    te[3] = me[2];
    te[4] = me[3];
    te[5] = 0.0;
    te[6] = 0.0;
    te[7] = 0.0;
    te[8] = 1;

    return this;
};

/**
 * @method fromMat4
 * @memberof Odin.Mat3
 * sets this from Mat4
 * @param Mat2 m
 * @return this
 */
Mat3.prototype.fromMat4 = function (m) {
    var te = this.elements,
        me = m.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[4];
    te[4] = me[5];
    te[5] = me[6];
    te[6] = me[8];
    te[7] = me[9];
    te[8] = me[10];

    return this;
};

/**
 * @method fromQuat
 * @memberof Odin.Mat3
 * sets rotation of this from quaterian
 * @param Quat q
 * @return this
 */
Mat3.prototype.fromQuat = function (q) {
    var te = this.elements,
        x = q.x,
        y = q.y,
        z = q.z,
        w = q.w,
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    te[0] = 1 - (yy + zz);
    te[1] = xy + wz;
    te[2] = xz - wy;

    te[3] = xy - wz;
    te[4] = 1 - (xx + zz);
    te[5] = yz + wx;

    te[6] = xz + wy;
    te[7] = yz - wx;
    te[8] = 1 - (xx + yy);

    return this;
};

/**
 * @memberof Odin.Mat3
 * @param Odin.Mat3 other
 * @return this
 */
Mat3.prototype.equals = function (other) {
    var ae = this.elements,
        be = other.elements;

    return !(
    ae[0] !== be[0] ||
    ae[1] !== be[1] ||
    ae[2] !== be[2] ||
    ae[3] !== be[3] ||
    ae[4] !== be[4] ||
    ae[5] !== be[5] ||
    ae[6] !== be[6] ||
    ae[7] !== be[7] ||
    ae[8] !== be[8]
    );
};

/**
 * @memberof Odin.Mat3
 * @param Odin.Mat3 other
 * @return this
 */
Mat3.prototype.notEquals = function (other) {
    var ae = this.elements,
        be = other.elements;

    return (
    ae[0] !== be[0] ||
    ae[1] !== be[1] ||
    ae[2] !== be[2] ||
    ae[3] !== be[3] ||
    ae[4] !== be[4] ||
    ae[5] !== be[5] ||
    ae[6] !== be[6] ||
    ae[7] !== be[7] ||
    ae[8] !== be[8]
    );
};

/**
 * @method fromJSON
 * @memberof Odin.Mat3
 * sets values from JSON object
 * @param Object json
 * @return this
 */
Mat3.prototype.fromJSON = function (json) {
    var te = this.elements,
        me = json.elements;

    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];

    return this;
};

/**
 * @method toJSON
 * @memberof Odin.Mat3
 * returns json object of this
 * @param Array array
 * @return Object
 */
Mat3.prototype.toJSON = function (json) {
    json || (json = {});
    var te = this.elements,
        je = json.elements || (json.elements = []);

    json._className = "Mat3";
    je[0] = te[0];
    je[1] = te[1];
    je[2] = te[2];
    je[3] = te[3];
    je[4] = te[4];
    je[5] = te[5];
    je[6] = te[6];
    je[7] = te[7];
    je[8] = te[8];

    return json;
};

/**
 * @method fromArray
 * @memberof Odin.Mat3
 * sets values from Array object
 * @param Object json
 * @return this
 */
Mat3.prototype.fromArray = function (array) {
    var te = this.elements;

    te[0] = array[0];
    te[1] = array[1];
    te[2] = array[2];
    te[3] = array[3];
    te[4] = array[4];
    te[5] = array[5];
    te[6] = array[6];
    te[7] = array[7];
    te[8] = array[8];

    return this;
};

/**
 * @method toArray
 * @memberof Odin.Mat3
 * returns array object of this
 * @return Object
 */
Mat3.prototype.toArray = function (array) {
    array || (array = []);
    var te = this.elements;

    array[0] = te[0];
    array[1] = te[1];
    array[2] = te[2];
    array[3] = te[3];
    array[4] = te[4];
    array[5] = te[5];
    array[6] = te[6];
    array[7] = te[7];
    array[8] = te[8];

    return array;
};

/**
 * @method toString
 * @memberof Odin.Mat3
 * returns string of this
 * @return String
 */
Mat3.prototype.toString = function () {
    var te = this.elements;

    return (
    "Mat3[" + te[0] + ", " + te[3] + ", " + te[6] + "]\n" +
    "     [" + te[1] + ", " + te[4] + ", " + te[7] + "]\n" +
    "     [" + te[2] + ", " + te[5] + ", " + te[8] + "]"
    );
};


module.exports = Mat3;
