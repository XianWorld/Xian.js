/**
 * Created by Dianyan on 2014/12/4.
 */
var Class = require("../base/class");
"use strict";


function System(opts) {
    opts || (opts = {});

    this.order = opts.order || 0;

    this.scene = undefined;

    Class.call(this);
}

Class.extend(System);

System.prototype.init = function () {
};

System.prototype.start = function () {
};

System.prototype.update = function () {
};

System.prototype.clear = function () {
};

System.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.order = this.order;

    return json;
};

System.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.order = json.order;

    return this;
};

module.exports = System;