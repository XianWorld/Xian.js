var Class = require("../base/class");
var util = require("../base/util");
var Log = require("../context/main_context").Log;
"use strict";


var camelize = util.camelize;


function Component() {

    Class.call(this);

    //use for getComponentByType.
    this._type = this._className;
    this._name = camelize(this._className, true);
    this.json = true;
    this.enabled = true;

    this.gameObject = undefined;
}

Class.extend(Component);

Object.defineProperty(Component.prototype, 'transform', {
    get: function() {
        return this.gameObject === undefined ? undefined : this.gameObject.transform;
    }
});

Object.defineProperty(Component.prototype, 'inScene', {
    get: function() {
        return this.gameObject !== undefined && this.gameObject.scene !== undefined;
    }
});

Component.prototype.copy = function (other) {
    //this._name = other._name;
    this.json = other.json;
    this.enabled = other.enabled;
    return this;
};

Component.prototype.init = function () {
    return this;
};

Component.prototype.start = function () {
    return this;
};

Component.prototype.update = function () {
};

Component.prototype.clear = function () {
    if (this.gameObject) {
        this.gameObject.removeComponent(this);
        this.gameObject = undefined;
    }
    this.off();
    //this._name = camelize(this._className, true);
    this.json = true;
    this.enabled = true;
    return this;
};

Component.prototype.destroy = function () {
    this.emit("destroy");
    this.clear();
    return this;
};

Component.prototype.remove = function () {
    if (!this.gameObject) {
        Log.error("Component.remove: can't remove Component if it's not added to a GameObject");
        return this;
    }
    this.gameObject.removeComponent(this, true);
    this.gameObject = undefined;
    return this;
};

Component.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.name = this._name;
    json.json = this.json;
    json.enabled = this.enabled;
    return json;
};

Component.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    if(json.name) this._name = json.name;
    this.json = json.json !== undefined ? !!json.json : true;
    this.enabled = json.enabled !== undefined ? !!json.enabled : true;
    return this;
};


module.exports = Component;
