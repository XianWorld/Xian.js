var Class = require("../base/class");
var util = require("../base/util");
var Log = require("../context/main_context").Log;
"use strict";


var camelize = util.camelize;


function Component(opts) {
    //opts || (opts = {});
    //if (!type) {
    //    //Log.error("Component defined without a type, use Component.call(this, \"ComponentName\", { sync: Boolean, json: Boolean })");
    //}

    Class.call(this);

    //this._type = type || this._className;
    this._name = camelize(this._className, true);
    this.json = true;
    this.enabled = true;

    //this._name = opts.name !== undefined ? opts.name : camelize(this._className, true);
    //this.sync = opts.sync !== undefined ? !!opts.sync : false;
    //this.json = opts.json !== undefined ? !!opts.json : true;
    //this._comp_state = undefined;
    this.gameObject = undefined;

    //this.enabled = opts.enabled !== undefined ? !!opts.enabled : true;
}

Class.extend(Component);

//Object.defineProperty(Component.prototype, 'json', {
//    get: function() {
//        return this._json = this.toJSON();
//    },
//    set: function(value){
//        this._json = value;
//        if(this._comp_state !== undefined){
//            //this.clear();
//            this.fromJSON(this._json);
//        }
//    }
//});

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

//Object.defineProperty(Component.prototype, 'transform2d', {
//    get: function() {
//        return this.gameObject === undefined ? undefined : this.gameObject.transform2d;
//    }
//});
//
Component.prototype.copy = function (other) {

    //this.sync = other.sync;
    this.json = other.json;
    this.enabled = other.enabled;
    return this;
};


Component.prototype.init = function () {
    //this._comp_state = "init";

    //only when add to scene and call init.
    //this.fromJSON(this._json);

    return this;
};


Component.prototype.start = function () {
    //this._comp_state = "start";

    return this;
};


Component.prototype.update = function () {

};


Component.prototype.clear = function () {

    //this._comp_state = undefined;
    this.off();

    return this;
};


Component.prototype.destroy = function () {
    //if (!this.gameObject) {
    //    Log.error("Component.destroy: can't destroy Component if it's not added to a GameObject");
    //    return this;
    //}
    if (this.gameObject) {
        this.gameObject.removeComponent(this);
    }
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

    json.name = this._name;
    //json.sync = this.sync;
    json.json = this.json;

    json.enabled = this.enabled;
    return json;
};


Component.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    if(json.name) this._name = json.name;// || camelize(this._className, true);
    //this.sync = json.sync;
    this.json = json.json !== undefined ? !!json.json : true;

    this.enabled = json.enabled !== undefined ? !!json.enabled : true;
    return this;
};


module.exports = Component;
