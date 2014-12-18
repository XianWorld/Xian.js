/**
 * Created by Dianyan on 2014/12/14.
 */
var ObjectPool = require("../../base/object_pool");

function Renderable2DData() {
    this._refCount = 0;

    this.texture = undefined;

    this.sourceX = 0;
    this.sourceY = 0;
    this.sourceWidth = 0;
    this.sourceHeight = 0;

    this.destX = 0;
    this.destY = 0;
    this.destWidth = 0;
    this.destHeight = 0;

    this.tint = 0xFFFFFF;
    this.worldAlpha = 1;
    this.blendMode = 0;

    this.worldMatrix = undefined;
}

Renderable2DData.prototype.clear = function () {
    this._refCount = 0;

    this.texture = undefined;

    this.sourceX = 0;
    this.sourceY = 0;
    this.sourceWidth = 0;
    this.sourceHeight = 0;

    this.destX = 0;
    this.destY = 0;
    this.destWidth = 0;
    this.destHeight = 0;

    this.tint = 0xFFFFFF;
    this.worldAlpha = 1;
    this.blendMode = 0;

    this.worldMatrix = undefined;

    pool.removeObject(this);
};

var pool = ObjectPool.getPool(Renderable2DData);
Renderable2DData.create = function() {
    var obj = pool.create();
    if(!obj) obj = new Renderable2DData;

    return obj;
};

module.exports = Renderable2DData;