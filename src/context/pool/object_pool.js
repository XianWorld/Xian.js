"use strict";

function ObjectPool(constructor) {

    this.pooled = [];
    this.objects = [];
    this.object = constructor;
}

ObjectPool.prototype.create = function () {
    var pooled = this.pooled,
        object;// = pooled.length ? pooled.pop() : new this.object;

    if(pooled.length)
        object = pooled.pop();
    else{
        object = new this.object;

        object._objectPool = this;
        //object._refCount = 0;
        //object.retain = retain;
        var f = object.destroy;
        object.destroy = function(){
            this.emit("destroy");
            if(this.clear) this.clear();
            this._objectPool.removeObject(this);
        };
        if(f){
            object.__destroy = function(){
                f.call(this);
            };
        }

        //if(object.destroy){
        //    var f = object.destroy;
        //    object.destroy = function(){
        //        //if(--this._refCount) return;
        //
        //        f.call(this);
        //        this._objectPool.removeObject(this);
        //    };
        //}
        //else{
        //    object.destroy = function(){
        //        //if(--this._refCount) return;
        //        this._objectPool.removeObject(this);
        //    };
        //}

    }
    //object.retain();

    this.objects.push(object);
    return object;
};


ObjectPool.prototype.removeObject = function (object) {
    var objects = this.objects,
        pooled = this.pooled,
        index = objects.indexOf(object);

    if (index > -1) {
        pooled.push(object);
        objects.splice(index, 1);
    }

    return this;
};


ObjectPool.prototype.remove = ObjectPool.prototype.removeObjects = function () {
    var i = arguments.length;

    while (i--) this.removeObject(arguments[i]);

    return this;
};

//TODO what is this function want? who will and dare call this function?
ObjectPool.prototype.clear = function () {
    var objects = this.objects,
        pooled = this.pooled,
        i = objects.length;

    while (i--) pooled.push(objects[i]);
    objects.length = 0;

    return this;
};


ObjectPool.prototype.clearForEach = function (fn) {
    var objects = this.objects,
        pooled = this.pooled,
        object,
        i = objects.length;

    while (i--) {
        object = objects[i];

        pooled.push(object);
        fn(object);
    }
    objects.length = 0;

    return this;
};

/**
 * really destroy all pooled object.
 * @returns {ObjectPool}
 */
ObjectPool.prototype.empty = function () {
    var i = this.pooled.length;
    while (i--) this.pooled[i].__destroy();

    this.pooled.length = 0;
    //this.pooled.length = this.objects.length = 0;
    return this;
};

//var pools = {};
//ObjectPool.getPool = function(constructor){
//    var pool = pools[constructor];
//    if(!pool){
//        pool = new ObjectPool(constructor);
//        pools[constructor] = pool;
//    }
//    return pool;
//};
//
//ObjectPool.clearPool = function(constructor){
//    var pool = pools[constructor];
//    if(pool){
//        pool.clear();
//    }
//};
//
//function retain() {
//    this._refCount++;
//}

module.exports = ObjectPool;
