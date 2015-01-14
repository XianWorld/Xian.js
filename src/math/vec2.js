var Mathf = require("./mathf");
"use strict";


var sqrt = Math.sqrt;

/**
 * @class Vec2
 * 2d vector
 * @param Number x
 * @param Number y
 */
function Vec2(x, y) {

    /**
     * @property Number x
     * @memberof Xian.Vec2
     */
    this._x = x || 0.0;

    /**
     * @property Number y
     * @memberof Xian.Vec2
     */
    this._y = y || 0.0;

    this._dirty = true;
}

Mathf._classes.Vec2 = Vec2;

Object.defineProperty(Vec2.prototype, "x", {
    get: function(){
        return this._x;
    },
    set: function(value){
        if(this._x === value) return;
        this._x = value;
        this._dirty = true;
    }
});
Object.defineProperty(Vec2.prototype, "y", {
    get: function(){
        return this._y;
    },
    set: function(value){
        if(this._y === value) return;
        this._y = value;
        this._dirty = true;
    }
});

/**
 * @method clone
 * @memberof Xian.Vec2
 * returns new instance of this
 * @return Vec2
 */
Vec2.prototype.clone = function () {

    return new Vec2(this._x, this._y);
};

/**
 * @method copy
 * @memberof Xian.Vec2
 * copies other
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.copy = function (other) {

    this.x = other._x;
    this.y = other._y;

    return this;
};

/**
 * @method set
 * @memberof Xian.Vec2
 * sets values of this
 * @param Number x
 * @param Number y
 * @return this
 */
Vec2.prototype.set = function (x, y) {

    this.x = x;
    this.y = y;

    return this;
};

/**
 * @method add
 * @memberof Xian.Vec2
 * adds other's values to this
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.add = function (other) {

    this.x += other._x;
    this.y += other._y;

    return this;
};

/**
 * @method vadd
 * @memberof Xian.Vec2
 * adds a and b together saves it in this
 * @param Vec2 a
 * @param Vec2 b
 * @return this
 */
Vec2.prototype.vadd = function (a, b) {

    this.x = a._x + b._x;
    this.y = a._y + b._y;

    return this;
};

/**
 * @method sadd
 * @memberof Xian.Vec2
 * adds scalar value to this
 * @param Number s
 * @return this
 */
Vec2.prototype.sadd = function (s) {

    this.x += s;
    this.y += s;

    return this;
};

/**
 * @method sub
 * @memberof Xian.Vec2
 * subtracts other's values from this
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.sub = function (other) {

    this.x -= other._x;
    this.y -= other._y;

    return this;
};

/**
 * @method vsub
 * @memberof Xian.Vec2
 * subtracts b from a saves it in this
 * @param Vec2 a
 * @param Vec2 b
 * @return this
 */
Vec2.prototype.vsub = function (a, b) {

    this.x = a._x - b._x;
    this.y = a._y - b._y;

    return this;
};

/**
 * @method ssub
 * @memberof Xian.Vec2
 * subtracts this by a scalar value
 * @param Number s
 * @return this
 */
Vec2.prototype.ssub = function (s) {

    this.x -= s;
    this.y -= s;

    return this;
};

/**
 * @method mul
 * @memberof Xian.Vec2
 * muliples this's values by other's
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.mul = function (other) {

    this.x *= other._x;
    this.y *= other._y;

    return this;
};

/**
 * @method vmul
 * @memberof Xian.Vec2
 * muliples a and b saves it in this
 * @param Vec2 a
 * @param Vec2 b
 * @return this
 */
Vec2.prototype.vmul = function (a, b) {

    this.x = a._x * b._x;
    this.y = a._y * b._y;

    return this;
};

/**
 * @method smul
 * @memberof Xian.Vec2
 * muliples this by a scalar value
 * @param Number s
 * @return this
 */
Vec2.prototype.smul = function (s) {

    this.x *= s;
    this.y *= s;

    return this;
};

/**
 * @method div
 * @memberof Xian.Vec2
 * divides this's values by other's
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.div = function (other) {
    var x = other._x,
        y = other._y;

    this.x *= x !== 0.0 ? 1.0 / x : 0.0;
    this.y *= y !== 0.0 ? 1.0 / y : 0.0;

    return this;
};

/**
 * @method vdiv
 * @memberof Xian.Vec2
 * divides b from a saves it in this
 * @param Vec2 a
 * @param Vec2 b
 * @return this
 */
Vec2.prototype.vdiv = function (a, b) {
    var x = b._x,
        y = b._y;

    this.x = x !== 0.0 ? a._x / x : 0.0;
    this.y = y !== 0.0 ? a._y / y : 0.0;

    return this;
};

/**
 * @method sdiv
 * @memberof Xian.Vec2
 * divides this by scalar value
 * @param Number s
 * @return this
 */
Vec2.prototype.sdiv = function (s) {
    s = s === 0.0 ? 0.0 : 1.0 / s;

    this.x *= s;
    this.y *= s;

    return this;
};

/**
 * @method length
 * @memberof Xian.Vec2
 * returns the length of this
 * @return Number
 */
Vec2.prototype.length = function () {
    var x = this._x,
        y = this._y,
        lsq = x * x + y * y;

    if (lsq === 1) return 1;

    return lsq > 0.0 ? sqrt(lsq) : 0.0;
};

/**
 * @method lengthSq
 * @memberof Xian.Vec2
 * returns the squared length of this
 * @return Number
 */
Vec2.prototype.lengthSq = function () {
    var x = this._x,
        y = this._y;

    return x * x + y * y;
};

/**
 * @method setLength
 * @memberof Xian.Vec2
 * sets this so its magnitude is equal to length
 * @param Number length
 * @return Vec2
 */
Vec2.prototype.setLength = function (length) {
    var x = this._x,
        y = this._y,
        l = x * x + y * y;

    if (l === 1) {
        this.x *= length;
        this.y *= length;

        return this;
    }

    l = l > 0.0 ? 1.0 / sqrt(l) : 0.0;

    this.x *= l * length;
    this.y *= l * length;

    return this;
};

/**
 * @method normalize
 * @memberof Xian.Vec2
 * returns this with a length of 1
 * @return this
 */
Vec2.prototype.normalize = function () {
    var x = this._x,
        y = this._y,
        l = x * x + y * y;

    if (l === 1) return this;

    l = l > 0.0 ? 1.0 / sqrt(l) : 0.0;

    this.x *= l;
    this.y *= l;

    return this;
};

/**
 * @method orthoNormalize
 * @memberof Xian.Vec2
 * returns makes vectors normalized and orthogonal to each other
 * @param Vec2 a
 * @param Vec2 b
 * @param Vec2 c
 * @return this
 */
Vec2.prototype.orthoNormalize = function (a, b, c) {
    if (a.lengthSq() !== 1.0) a.normalize();
    c.vcross(a, b);
    if (a.lengthSq() === 0.0) return;
    c.normalize();
    b.vcross(c, a);
};

/**
 * @method inverse
 * @memberof Xian.Vec2
 * returns the inverse of this
 * @return this
 */
Vec2.prototype.inverse = function () {

    this.x *= -1;
    this.y *= -1;

    return this;
};

/**
 * @method inverseVec
 * @memberof Xian.Vec2
 * returns the inverse of other
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.inverseVec = function (other) {

    this.x = -other._x;
    this.y = -other._y;

    return this;
};

/**
 * @method lerp
 * @memberof Xian.Vec2
 * linear interpolation between this and other by x
 * @param Vec2 other
 * @param Number x
 * @return Vec2
 */
Vec2.prototype.lerp = function (other, x) {

    this.x += (other._x - this._x) * x;
    this.y += (other._y - this._y) * x;

    return this;
};

/**
 * @method vlerp
 * @memberof Xian.Vec2
 * linear interpolation between a and b by x
 * @param Vec2 a
 * @param Vec2 b
 * @param Number x
 * @return Vec2
 */
Vec2.prototype.vlerp = function (a, b, x) {
    var ax = a._x,
        ay = a._y;

    this.x = ax + (b._x - ax) * x;
    this.y = ay + (b._y - ay) * x;

    return this;
};

/**
 * @method vdot
 * @memberof Xian.Vec2
 * dot product of two vectors, can be called as a static function Vec2.vdot( a, b )
 * @param Vec2 a
 * @param Vec2 b
 * @return Number
 */
Vec2.vdot = Vec2.prototype.vdot = function (a, b) {

    return a._x * b._x + a._y * b._y;
};

/**
 * @method dot
 * @memberof Xian.Vec2
 * dot product of this and other vector
 * @param Vec2 other
 * @return Number
 */
Vec2.prototype.dot = function (other) {

    return this._x * other._x + this._y * other._y;
};

/**
 * @method vcross
 * @memberof Xian.Vec2
 * cross product between a vector and b vector, can be called as a static function Vec2.vcross( a, b )
 * @param Vec2 a
 * @param Vec2 b
 * @return Number
 */
Vec2.vcross = Vec2.prototype.vcross = function (a, b) {

    return a._x * b._y - a._y * b._x;
};

/**
 * @method cross
 * @memberof Xian.Vec2
 * cross product between this vector and other
 * @param Vec2 other
 * @return Number
 */
Vec2.prototype.cross = function (other) {

    return this._x * other._y - this._y * other._x;
};

/**
 * @method perp
 * @memberof Xian.Vec2
 * @param Vec2 other
 * @return Number
 */
Vec2.prototype.perp = function () {
    var x = this._x,
        y = this._y;

    this.x = -y;
    this.y = x;

    return this;
};

/**
 * @method min
 * @memberof Xian.Vec2
 * returns min values from this and other vector
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.min = function (other) {
    var ax = this._x,
        ay = this._y,
        bx = other._x,
        by = other._y;

    this.x = bx < ax ? bx : ax;
    this.y = by < ay ? by : ay;

    return this;
};

/**
 * @method max
 * @memberof Xian.Vec2
 * returns max values from this and other vector
 * @param Vec2 other
 * @return this
 */
Vec2.prototype.max = function (other) {
    var ax = this._x,
        ay = this._y,
        bx = other._x,
        by = other._y;

    this.x = bx > ax ? bx : ax;
    this.y = by > ay ? by : ay;

    return this;
};

/**
 * @method clamp
 * @memberof Xian.Vec2
 * clamp values between min and max's values
 * @param Vec2 min
 * @param Vec2 max
 * @return this
 */
Vec2.prototype.clamp = function (min, max) {
    var x = this._x,
        y = this._y,
        minx = min._x,
        miny = min._y,
        maxx = max._x,
        maxy = max._y;

    this.x = x < minx ? minx : x > maxx ? maxx : x;
    this.y = y < miny ? miny : y > maxy ? maxy : y;

    return this;
};

/**
 * @method transformAngle
 * @memberof Xian.Vec2
 * transforms this with angle
 * @param Mat2 m
 * @return this
 */
Vec2.prototype.transformAngle = function (a) {
    var x = this._x,
        y = this._y,
        c = cos(a),
        s = sin(a);

    this.x = x * c - y * s;
    this.y = x * s + y * c;

    return this;
};

/**
 * @method transformMat2
 * @memberof Xian.Vec2
 * transforms this with Mat2
 * @param Mat2 m
 * @return this
 */
Vec2.prototype.transformMat2 = function (m) {
    var me = m.elements,
        x = this._x,
        y = this._y;

    this.x = x * me[0] + y * me[2];
    this.y = x * me[1] + y * me[3];

    return this;
};

/**
 * @method untransformMat2
 * @memberof Xian.Vec2
 * untransforms this with Mat2
 * @param Mat2 m
 * @return this
 */
Vec2.prototype.untransformMat2 = function (m) {
    var me = m.elements,
        x = this._x,
        y = this._y;

    this.x = x * me[0] + y * me[1];
    this.y = x * me[2] + y * me[3];

    return this;
};

/**
 * @method transformMat32
 * @memberof Xian.Vec2
 * transforms this with Mat32
 * @param Mat32 m
 * @return this
 */
Vec2.prototype.transformMat32 = function (m) {
    var me = m.elements,
        x = this._x,
        y = this._y;

    this.x = x * me[0] + y * me[2] + me[4];
    this.y = x * me[1] + y * me[3] + me[5];

    return this;
};

/**
 * @method untransformMat32
 * @memberof Xian.Vec2
 * untransforms this with Mat32
 * @param Mat32 m
 * @return this
 */
Vec2.prototype.untransformMat32 = function (m) {
    var me = m.elements,
        x = this._x - me[4],
        y = this._y - me[5];

    this.x = x * me[0] + y * me[1];
    this.y = x * me[2] + y * me[3];

    return this;
};

/**
 * @method transformMat3
 * @memberof Xian.Vec2
 * transforms this with Mat3
 * @param Mat3 m
 * @return this
 */
Vec2.prototype.transformMat3 = function (m) {
    var me = m.elements,
        x = this._x,
        y = this._y;

    this.x = x * me[0] + y * me[3] + me[6];
    this.y = x * me[1] + y * me[4] + me[7];

    return this;
};

/**
 * @method transformMat4
 * @memberof Xian.Vec2
 * transforms this with Mat4
 * @param Mat4 m
 * @return this
 */
Vec2.prototype.transformMat4 = function (m) {
    var me = m.elements,
        x = this._x,
        y = this._y;

    this.x = x * me[0] + y * me[4] + me[12];
    this.y = x * me[1] + y * me[5] + me[13];

    return this;
};

/**
 * @method transformProjection
 * @memberof Xian.Vec3
 * transforms this with Mat4 projection matrix
 * @param Mat4 m
 * @return this
 */
Vec2.prototype.transformProjection = function (m) {
    var me = m.elements,
        x = this._x,
        y = this._y,
        d = 1 / (me[3] * x + me[7] * y + me[11] * z + me[15]);

    this.x = (me[0] * x + me[4] * y + me[12]) * d;
    this.y = (me[1] * x + me[5] * y + me[13]) * d;

    return this;
};

/**
 * @method fromVec3
 * @memberof Xian.Vec2
 * sets values from Vec3
 * @param Vec3 v
 * @return this
 */
Vec2.prototype.fromVec3 = function (v) {

    this.x = v.x;
    this.y = v.y;

    return this;
};

/**
 * @method fromVec4
 * @memberof Xian.Vec2
 * sets values from Vec4
 * @param Vec4 v
 * @return this
 */
Vec2.prototype.fromVec4 = function (v) {

    this.x = v.x;
    this.y = v.y;

    return this;
};

/**
 * @method positionFromMat32
 * @memberof Xian.Vec2
 * sets position from Mat32
 * @param Mat32 m
 * @return this
 */
Vec2.prototype.positionFromMat32 = function (m) {
    var me = m.elements;

    this.x = me[4];
    this.y = me[5];

    return this;
};

/**
 * @method positionFromMat4
 * @memberof Xian.Vec2
 * sets position from Mat4
 * @param Mat4 m
 * @return this
 */
Vec2.prototype.positionFromMat4 = function (m) {
    var me = m.elements;

    this.x = me[12];
    this.y = me[13];

    return this;
};

/**
 * @method scaleFromMat2
 * @memberof Xian.Vec2
 * sets this from Mat2 scale
 * @param Mat2 m
 * @return this
 */
Vec2.prototype.scaleFromMat2 = function (m) {
    var me = m.elements,
        x = this.set(me[0], m[2]).length(),
        y = this.set(me[1], m[3]).length();

    this.x = x;
    this.y = y;

    return this;
};

/**
 * @method scaleFromMat32
 * @memberof Xian.Vec2
 * sets this from Mat32 scale
 * @param Mat32 m
 * @return this
 */
Vec2.prototype.scaleFromMat32 = Vec2.prototype.scaleFromMat2;

/**
 * @memberof Xian.Vec2
 * @param Xian.Vec2 other
 * @return this
 */
Vec2.prototype.equals = function (other) {

    return !(
    this._x !== other._x ||
    this._y !== other._y
    );
};

/**
 * @memberof Xian.Vec2
 * @param Xian.Vec2 other
 * @return this
 */
Vec2.prototype.notEquals = function (other) {

    return (
    this._x !== other._x ||
    this._y !== other._y
    );
};

/**
 * @method fromJSON
 * @memberof Xian.Vec2
 * sets values from JSON object
 * @param Object json
 * @return this
 */
Vec2.prototype.fromJSON = function (json) {

    this.x = json.x || 0.0;
    this.y = json.y || 0.0;

    return this;
};

/**
 * @method toJSON
 * @memberof Xian.Vec2
 * returns json object of this
 * @return Object
 */
Vec2.prototype.toJSON = function (json) {
    json || (json = {});

    json._className = "Vec2";
    json.x = this._x;
    json.y = this._y;

    return json;
};

/**
 * @method fromArray
 * @memberof Xian.Vec2
 * sets values from Array object
 * @param Array array
 * @return this
 */
Vec2.prototype.fromArray = function (array) {

    this.x = array[0];
    this.y = array[1];

    return this;
};

/**
 * @method toArray
 * @memberof Xian.Vec2
 * returns array object of this
 * @return Array
 */
Vec2.prototype.toArray = function (array) {
    array || (array = []);

    array[0] = this._x;
    array[1] = this._y;

    return array;
};

/**
 * @method toString
 * @memberof Xian.Vec2
 * returns string of this
 * @return String
 */
Vec2.prototype.toString = function () {

    return "Vec2( " + this.x + ", " + this.y + " )";
};

Vec2.prototype.clear = function () {
    this._x = this._y = 0;
};

module.exports = Vec2;
