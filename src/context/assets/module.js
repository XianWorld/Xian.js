var Asset = require("./asset");
//var GameObject = require("../../core/game_object");
//var MainContext = require("../main_context");
//var ObjectPools = MainContext.ObjectPools;
"use strict";

function Module(opts) {
    Asset.call(this, opts);

    this.script = undefined;
    this.exportTarget = undefined;
}

Asset.extend(Module);

//Module.prototype.toJSON = function (json) {
//    json = Asset.prototype.toJSON.call(this, json);
//
//    json.script = this.script;
//
//    return json;
//};
//
//
//Module.prototype.fromJSON = function (json) {
//    Asset.prototype.fromJSON.call(this, json);
//
//    this.script = json.script;
//
//    return this;
//};

module.exports = Module;
