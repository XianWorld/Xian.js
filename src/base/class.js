var EventEmitter = require('./event_emitter');
'use strict';


var CLASS_ID = 0;

/**
 * @class Xian.Class
 * @extends Xian.EventEmitter
 */
function Class() {

    EventEmitter.call(this);

    this._id = ++CLASS_ID;
    this._jsonId = -1;
    this._name = '';
}

EventEmitter.extend(Class);


/**
 * returns new copy of this
 * @memberof Xian.Class
 * @return Class
 */
Class.prototype.clone = function () {

    return new this.constructor().copy(this);
};

/**
 * copies other of same class
 * @memberof Xian.Class
 * @param {Xian.Class} other
 * @return this
 */
Class.prototype.copy = function () {

    return this;
};

/**
 * clears data for GC
 * @memberof Xian.Class
 * @return this
 */
Class.prototype.clear = function () {

    return this;
};

/**
 * converts this to a JSON object
 * @memberof Xian.Class
 * @return json
 */
Class.prototype.toJSON = function (json) {
    json || (json = {});

    json._id = this._id;
    json._jsonId = this._id;
    json._className = this._className;

    return json;
};

/**
 * sets this from JSON object
 * @memberof Xian.Class
 * @return this
 */
Class.prototype.fromJSON = function (json) {

    this._jsonId = json._jsonId;

    return this;
};

/**
 * returns class name
 * @memberof Xian.Class
 * @return string
 */
Class.prototype.toString = function () {

    return this._name;
};

/**
 * @memberof Xian.Class
 * @param {constructor} child
 * @param {constructor} parent
 * @return child
 */
Class.extend = function (child, parent) {
    if (!parent) parent = this;

    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;

    child.extend = parent.extend;
    child.prototype._className = child._className = child.name;

    (this._children || (this._children = {}))[child.name] = child;
    child._parent = this;

    if(Class._classes[child.name]) console.log("Class exist: "+child.name);
    Class._classes[child.name] = child;

    if (parent.onExtend) {
        if (!child.onExtend) child.onExtend = parent.onExtend;
        parent.onExtend(child);
    }

    return child;
};

/**
 * creates new Xian.Class from json object
 * @memberof Xian.Class
 * @param {object} json
 * @return Xian.Class
 */
Class.fromJSON = function (json) {

    return new Class._classes[json._className]().fromJSON(json);
};

/**
 * creates new Xian.Class from string type
 * @memberof Xian.Class
 * @param {string} type
 * @return Xian.Class
 */
Class.create = function (type) {

    return new Class._classes[type];
};


Class._classes = {};


module.exports = Class;
