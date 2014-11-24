var Class = require("../../base/class");
var util = require("../../base/util");
var Log = require("../../base/log");
"use strict";


var camelize = util.camelize;


function Component(type, opts) {
    opts || (opts = {});
    if (!type) Log.error("Component defined without a type, use Component.call(this, \"ComponentName\", { sync: Boolean, json: Boolean })");

    Class.call(this);

    this._type = type || "UnknownComponent";
    this._name = camelize(this._type, true);

    this.sync = opts.sync != undefined ? !!opts.sync : false;
    this.json = opts.json != undefined ? !!opts.json : true;

    this.gameObject = undefined;
}

Class.extend(Component);


Component.prototype.copy = function (other) {

    this.sync = other.sync;
    this.json = other.json;

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

    this.off();

    return this;
};


Component.prototype.destroy = function () {
    if (!this.gameObject) {
        Log.error("Component.destroy: can't destroy Component if it's not added to a GameObject");
        return this;
    }

    this.gameObject.removeComponent(this);
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
    return this;
};


Component.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json._type = this._type;
    json.sync = this.sync;
    json.json = this.json;

    return json;
};


Component.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.sync = json.sync;
    this.json = json.json;

    return this;
};


module.exports = Component;
