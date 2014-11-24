var ObjectPool = require("../../base/object_pool");
var Touch = require("./touch");
"use strict";


var TOUCH_POOL = new ObjectPool(Touch),
    OBJECT_POOL = new ObjectPool(Object);


function Touches() {

    Array.call(this);
    this._SYNC = {};
}

Touches.prototype = Object.create(Array.prototype);
Touches.prototype.constructor = Touches;
Touches.TOUCH_POOL = TOUCH_POOL;


Touches.prototype.start = function (index, targetTouch) {
    var touch = TOUCH_POOL.create();

    touch.clear();
    touch.id = targetTouch.identifier;
    touch.fromEvent(targetTouch);

    this.push(touch);

    return touch;
};


Touches.prototype.end = function (index) {
    var touch = this[index];

    TOUCH_POOL.removeObject(touch);
    this.splice(index, 1);

    return touch;
};


Touches.prototype.cancel = function () {

    TOUCH_POOL.clear();
    this.length = 0;

    return this;
};


Touches.prototype.move = function (index, targetTouch) {
    var touch = this[index];

    touch.fromEvent(targetTouch);

    return touch;
};


Touches.prototype.toSYNC = function (json) {
    json || (json = this._SYNC);
    var jsonTouches = json.touches || (json.touches = []),
        i = this.length;

    jsonTouches.length = 0;
    OBJECT_POOL.clear();

    while (i--) jsonTouches[i] = this[i].toSYNC(OBJECT_POOL.create());

    return json;
};


Touches.prototype.fromSYNC = function (json) {
    var jsonTouches = json.touches,
        i = jsonTouches.length;

    this.length = 0;
    TOUCH_POOL.clear();

    while (i--) this[i] = TOUCH_POOL.create().fromSYNC(jsonTouches[i]);

    return this;
};


Touches.prototype.toJSON = function (json) {
    json || (json = {});
    var jsonTouches = json.touches || (json.touches = []),
        i;

    for (i = this.length; i--;) jsonTouches[i] = this[i].toJSON(jsonTouches[i]);
    return json;
};


Touches.prototype.fromJSON = function (json) {
    var jsonTouches = json.touches,
        touch, i, j, tl;

    for (i = jsonTouches.length, tl = this.length, j = tl; i--;) {
        if (i < tl) {
            this.splice(j--, 1);
            TOUCH_POOL.removeObject(this[j]);
        }

        if ((touch = this[i])) {
            touch.fromJSON(jsonTouches[i]);
        } else {
            this[i] = TOUCH_POOL.create().fromJSON(jsonTouches[i]);
        }
    }

    return this;
};


module.exports = Touches;
