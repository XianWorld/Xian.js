var JsonData = require("./json_data");
//var GameObject = require("../../core/game_object");
//var MainContext = require("../main_context");
//var ObjectPools = MainContext.ObjectPools;
"use strict";

//var objectPool = ObjectPools.getPool(GameObject);

function Prefab(opts) {
    //opts || (opts = {});
    JsonData.call(this, opts);

    //if(opts.object)
    //    this.setObject(opts.object);
}

JsonData.extend(Prefab);

//Prefab.prototype.create = function () {
//    var object = objectPool.create();
//
//    object.fromJSON(this.jsonData);
//    //object.on("destroy", onRemove, this);
//
//    return object;
//};

Prefab.prototype.setObject = function (object) {

    this.jsonData = object.toJSON();
    return this;
};


//Prefab.prototype.empty = function () {
//
//    this.objectPool.empty();
//    return this;
//};
//
//
//Prefab.prototype.toJSON = function (json) {
//    json = Class.prototype.toJSON.call(this, json);
//
//    json.object = this.object;
//
//    return json;
//};
//
//
//Prefab.prototype.fromJSON = function (json) {
//    Class.prototype.fromJSON.call(this, json);
//
//    this.object = json.object;
//    this.objectPool = new ObjectPool(Class._classes[json.object._className]);
//
//    return this;
//};


//function onRemove(object) {
//
//    this.objectPool.removeObject(object);
//    object.off("remove", onRemove, this);
//}


module.exports = Prefab;
