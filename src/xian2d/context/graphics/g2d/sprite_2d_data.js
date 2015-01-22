/**
 * Created by Dianyan on 2014/12/14.
 */
var ObjectPools = require("../../../../context/pool/object_pools");

function Sprite2DData() {
    this.destTexture = undefined;

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
Sprite2DData.prototype.constructor = Sprite2DData;

Sprite2DData.prototype.destroy = function () {
    this.destTexture = undefined;

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

};

var pool = ObjectPools.getPool(Sprite2DData);
Sprite2DData.create = function() {
    var obj = pool.create();
    if(!obj) obj = new Sprite2DData;

    return obj;
};

module.exports = Sprite2DData;