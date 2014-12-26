/**
 * Created by Dianyan on 2014/11/30.
 */
var Device = require('./device');
var Input = require('./input');
var TimeContext = require('./time');
var NetContext = require('./socket.io');
var AudioContext = require('./audio_ctx');
//var CanvasContext = require('./canvas');
var LogContext = require('./log');
var ScreenContext = require('./screen_context');
var RendererContext = require('./renderer_context');

function MainContext()
{
    this.Device = Device;
    this.Input = Input;
    //this.CanvasContext = CanvasContext;
    this.ScreenContext = ScreenContext;
    this.RendererContext = RendererContext;
    this.Time = TimeContext;
    this.Net = NetContext;
    this.AudioContext = AudioContext;
    this.Log = LogContext;
}

MainContext.prototype.init = function()
{
    //this.CanvasContext.init();
    this.ScreenContext.init();
    this.RendererContext.init();
    //this.Input.init();
    return this;
};

MainContext.prototype.update = function()
{
    this.Time.update();

    return this;
};

MainContext.prototype.clear = function()
{
    return this;
};

module.exports = new MainContext;