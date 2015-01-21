/**
 * Created by Dianyan on 2014/12/4.
 */
var Class = require("../base/class");
"use strict";


function System() {
    this.order = 0;
    this.scene = undefined;

    Class.call(this);
}

Class.extend(System);

System.prototype.copy = function (other) {
    this.order = other.order;
    return this;
};

System.prototype.init = function () {
};

System.prototype.start = function () {
};

System.prototype.update = function () {
};

System.prototype.clear = function () {
    if(this.scene){
        this.scene.removeSystem(this);
        this.scene = undefined;
    }
    return this;
};

System.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.order = this.order;

    return json;
};

System.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.order = json.order || this.order;

    return this;
};

module.exports = System;