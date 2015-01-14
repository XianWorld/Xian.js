/**
 * Created by Dianyan on 2014/12/30.
 */
var EventEmitter = require('../../base/event_emitter');
'use strict';

function AssetLoader(){
    EventEmitter.call(this);
    this.assets = undefined;
    this.asset = undefined;
}
EventEmitter.extend(AssetLoader);

AssetLoader.prototype.load = function(asset){
    this.asset = asset;
};

AssetLoader.prototype.init = function(asset){
    this.asset = asset;
};

AssetLoader.prototype.destroy = function() {
    this.asset = undefined;
    this.assets = undefined;
};

module.exports = AssetLoader;