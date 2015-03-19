/**
 * Created by Dianyan on 2014/11/30.
 */
var Device = require('./device/device');
var Input = require('./input/input');
var Handler = require('./input/handler');
var Time = require('./time/time');
var Loop = require('./time/loop');
var NetContext = require('./net/socket.io');
var AudioContext = require('./audio/audio_ctx');
//var CanvasContext = require('./canvas');
var LogContext = require('./log/log');
var ScreenContext = require('./screen/screen_context');
var GraphicsContext = require('./graphics/graphics_context');

var Assets = require("./assets/assets");
var ObjectPools = require("./pool/object_pools");

function MainContext()
{
    this.Device = Device;
    this.Input = Input;
    //this.CanvasContext = CanvasContext;
    this.ScreenContext = ScreenContext;
    this.GraphicsContext = GraphicsContext;

    //time
    this.Time = Time;
    this.Loop = Loop;
    //net
    this.Net = NetContext;
    //audio
    this.AudioContext = AudioContext;
    //log
    this.Log = LogContext;
    //assets
    this.Assets = Assets;
    //pool
    this.ObjectPools = ObjectPools;
}

MainContext.prototype.init = function()
{
    //this.CanvasContext.init();
    this.ScreenContext.init();
    this.GraphicsContext.init();
    //this.Input.init();
    Handler.setElement(this.ScreenContext.rootDiv);
    return this;
};

MainContext.prototype.update = function()
{
    this.Time.update();
    this.Assets.update();
    this.ObjectPools.update();
    this.Input.update();

    return this;
};

MainContext.prototype.clear = function()
{
    this.Assets.clear();
    this.ObjectPools.clear();
    return this;
};
MainContext.prototype.destroy = function(){
    this.clear();
    this.GraphicsContext.destroy();
};

module.exports = new MainContext;