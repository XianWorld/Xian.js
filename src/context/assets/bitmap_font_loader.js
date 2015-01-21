/**
 * Created by Dianyan on 2015/01/20
 */
//var Assets = require('../../context/assets/assets');
var AssetLoader = require('./asset_loader');
var util = require("../../base/util");
var ajax = util.ajax;
var Rect = require("../../math/rect");
'use strict';

function BitmapFontLoader(){
    AssetLoader.call(this);

    this._xml = undefined;
}
BitmapFontLoader.prototype = Object.create(AssetLoader.prototype);
BitmapFontLoader.prototype.constructor = BitmapFontLoader;

BitmapFontLoader.prototype.load = function(asset){

    this.asset = asset;
    var src = asset.src;
    var loader = this;

    ajax({
        src: src,
        before: function () {
            this.setRequestHeader("Content-Type", "application/xml");
        },
        success: function () {
            var responseXML = this.responseXML;
            if(!responseXML || /MSIE 9/i.test(navigator.userAgent) || navigator.isCocoonJS) {
                if(typeof(window.DOMParser) === 'function') {
                    var domparser = new DOMParser();
                    responseXML = domparser.parseFromString(this.responseText, 'text/xml');
                } else {
                    var div = document.createElement('div');
                    div.innerHTML = this.responseText;
                    responseXML = div;
                }
            }

            loader._xml = responseXML;
            loader.emit("loaded", loader, asset);
        },
        error: function (err) {
            loader.emit("errorLoad", loader, asset, err);
        }
    });
};

BitmapFontLoader.prototype.init = function(asset){
    this.asset = asset;

    var responseXML = this._xml;

    //var data = {};
    var info = responseXML.getElementsByTagName('info')[0];
    var common = responseXML.getElementsByTagName('common')[0];
    asset.font = info.getAttribute('face');
    asset.size = parseInt(info.getAttribute('size'), 10);
    asset.lineHeight = parseInt(common.getAttribute('lineHeight'), 10);
    asset.chars = {};

    //parse letters
    var letters = responseXML.getElementsByTagName('char');

    for (var i = 0; i < letters.length; i++)
    {
        var charCode = parseInt(letters[i].getAttribute('id'), 10);

        var textureRect = new Rect(
            parseInt(letters[i].getAttribute('x'), 10),
            parseInt(letters[i].getAttribute('y'), 10),
            parseInt(letters[i].getAttribute('width'), 10),
            parseInt(letters[i].getAttribute('height'), 10)
        );

        asset.chars[charCode] = {
            xOffset: parseInt(letters[i].getAttribute('xoffset'), 10),
            yOffset: parseInt(letters[i].getAttribute('yoffset'), 10),
            xAdvance: parseInt(letters[i].getAttribute('xadvance'), 10),
            kerning: {},
            textureRect: textureRect
            //texture: PIXI.TextureCache[charCode] = new PIXI.Texture(this.texture, textureRect)

        };
    }

    //parse kernings
    var kernings = responseXML.getElementsByTagName('kerning');
    if(kernings){
        for (i = 0; i < kernings.length; i++)
        {
            var first = parseInt(kernings[i].getAttribute('first'), 10);
            var second = parseInt(kernings[i].getAttribute('second'), 10);
            var amount = parseInt(kernings[i].getAttribute('amount'), 10);

            asset.chars[second].kerning[first] = amount;

        }
    }

    var textureUrl = responseXML.getElementsByTagName('page')[0].getAttribute('file');
    var texture = this.assets.load(textureUrl, "Texture");
    asset.texture = texture;
    if(texture.ready){
        this.emit("inited", this, asset);
    }
    else{
        texture.on("inited", this._onTextureInited.bind(this));
    }
};

BitmapFontLoader.prototype._onTextureInited = function(asset){
    asset.off("inited", this._onTextureInited.bind(this));
    this.emit("inited", this, this.asset);
};

BitmapFontLoader.prototype.destroy = function() {
    AssetLoader.prototype.destroy.call(this);

    this._xml = undefined;
};

module.exports = BitmapFontLoader;
