var ObjectPool = require("./object_pool");
"use strict";

function ObjectPools() {
    this.pools = {};
}

ObjectPools.prototype.getPool = function(constructor){
    var pool = this.pools[constructor];
    if(!pool){
        pool = new ObjectPool(constructor);
        this.pools[constructor] = pool;
    }
    return pool;
};

ObjectPools.prototype.init = function(){
    //TODO use Config to init and preload pools needed
};
ObjectPools.prototype.update = function(){
    //TODO use some strategies to manage and update the pools
};

ObjectPools.prototype.clear = function(){
};

ObjectPools.prototype.destroy = function(){
    this.clear();
};
//ObjectPools.clearPool = function(constructor){
//    var pool = pools[constructor];
//    if(pool){
//        pool.clear();
//    }
//};
//
//function retain() {
//    this._refCount++;
//}

module.exports = new ObjectPools;
