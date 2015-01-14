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
    //this._json = undefined;
    this._jsonId = -1;
    this._name = '';
}

//TODO in order to let Class be the root Object, EventEmitter should be removed from this root Object and mixed in child Object when required. Refer to PIXI's EventTarget
EventEmitter.extend(Class);

//Object.defineProperty(Class.prototype, 'json', {
//    get: function() {
//        return this._json = this.toJSON();
//    },
//    set: function(value){
//        this._json = value;
//    }
//});

/**
 * returns new copy of this
 * @memberof Xian.Class
 * @return Class
 */
Class.prototype.clone = function () {

    return Class.create(this._className).copy(this);
    //return new this.constructor().copy(this);
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
    //this._json = undefined;

    return this;
};

Class.prototype.destroy = function () {

    this.clear();
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

    if(Class._classes[child.name])
        console.log("Class exist: "+child.name);
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

    return Class.create(json._className).fromJSON(json);
    //return new Class._classes[json._className]().fromJSON(json);
    //var obj = new Class._classes[json._className]();
    //obj.json = json;
    //return obj;
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
