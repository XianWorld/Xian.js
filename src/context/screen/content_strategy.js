/**
 * Created by Dianyan on 2014/12/25.
 */

//var ScreenContext = require("../screen_context");

function ContentStrategy() {
}
ContentStrategy.prototype.init = function (view) {
};
ContentStrategy.prototype._apply = function (delegate) {//, designedResolutionWidth, designedResolutionHeight
};
//ContentStrategy.prototype.setEgretSize = function (w, h, styleW, styleH, left, top) {
//    left = left || 0;
//    top = top || 0;
//    ScreenContext._stageWidth = w;
//    ScreenContext._stageHeight = h;
//    var container = document.getElementById(ScreenContext.canvas_div_name);
//    container.style.width = styleW + "px";
//    container.style.height = styleH + "px";
//    container.style.top = top + "px";
//};
ContentStrategy.prototype._getClientWidth = function () {
    return document.documentElement.clientWidth;
};
ContentStrategy.prototype._getClientHeight = function () {
    return document.documentElement.clientHeight;
};
ContentStrategy.prototype.destroy = function () {
};
ContentStrategy.prototype.fromJSON = function (json) {
    return this;
};
ContentStrategy.prototype.toJSON = function (json) {
    json || (json = {});
    return json;
};

function FixedHeight() {
    ContentStrategy.call(this);
    this.minWidth = 0;
}
FixedHeight.prototype = Object.create(ContentStrategy.prototype);
FixedHeight.prototype.constructor = FixedHeight;

FixedHeight.prototype._apply = function (delegate, designedResolutionWidth, designedResolutionHeight) {
    //var viewPortWidth = this._getClientWidth(); //分辨率宽
    //var viewPortHeight = this._getClientHeight(); //分辨率高
    //var scale = viewPortHeight / designedResolutionHeight;
    //var designW = viewPortWidth / scale;
    //var designH = designedResolutionHeight;
    //var scale2 = 1;
    //if (this.minWidth != 0) {
    //    scale2 = Math.min(1, designW / this.minWidth);
    //}
    //this.setEgretSize(designW / scale2, designH, viewPortWidth, viewPortHeight * scale2);
    //delegate._scaleX = scale * scale2;
    //delegate._scaleY = scale * scale2;

    var designW, designH, viewPortWidth, viewPortHeight, scaleX, scaleY, left, top;
    viewPortWidth = this._getClientWidth(); //分辨率宽
    viewPortHeight = this._getClientHeight(); //分辨率高
    var scale = viewPortHeight / designedResolutionHeight;
    designW = viewPortWidth / scale;
    designH = designedResolutionHeight;
    var scale2 = 1;
    if (this.minWidth != 0) {
        scale2 = Math.min(1, designW / this.minWidth);
    }
    designW = designW / scale2;
    viewPortHeight = viewPortHeight * scale2;
    left = 0;
    top = 0;
    scaleX = scale * scale2;
    scaleY = scale * scale2;

    delegate._setScreenSize(designW, designH, viewPortWidth, viewPortHeight, left, top, scaleX, scaleY);
};
FixedHeight.prototype.fromJSON = function (json) {
    this.minWidth = json.minWidth || 0;
    return this;
};
FixedHeight.prototype.toJSON = function (json) {
    json || (json = {});
    json._className = "FixedHeight";
    json.minWidth = this.minWidth;
    return json;
};
//ContentStrategy.FixedHeight = FixedHeight;

function FixedWidth() {
    ContentStrategy.call(this);
    this.minHeight = 0;
}
FixedWidth.prototype = Object.create(ContentStrategy.prototype);
FixedWidth.prototype.constructor = FixedWidth;

FixedWidth.prototype._apply = function (delegate, designedResolutionWidth, designedResolutionHeight) {
    //var viewPortWidth = this._getClientWidth(); //分辨率宽
    //var viewPortHeight = this._getClientHeight(); //分辨率高
    //var scale = viewPortWidth / designedResolutionWidth;
    //var designW = designedResolutionWidth;
    //var designH = viewPortHeight / scale;
    //var scale2 = 1;
    //if (this.minHeight != 0) {
    //    scale2 = Math.min(1, designH / this.minHeight);
    //}
    //var offsetX = viewPortWidth * (1 - scale2) / 2;
    //this.setEgretSize(designW, designH / scale2, viewPortWidth * scale2, viewPortHeight, offsetX);
    //delegate._scaleX = scale * scale2;
    //delegate._scaleY = scale * scale2;

    var designW, designH, viewPortWidth, viewPortHeight, scaleX, scaleY, left, top;
    viewPortWidth = this._getClientWidth(); //分辨率宽
    viewPortHeight = this._getClientHeight(); //分辨率高
    var scale = viewPortWidth / designedResolutionWidth;
    designW = designedResolutionWidth;
    designH = viewPortHeight / scale;
    var scale2 = 1;
    if (this.minHeight != 0) {
        scale2 = Math.min(1, designH / this.minHeight);
    }
    var offsetX = viewPortWidth * (1 - scale2) / 2;
    designH = designH / scale2;
    viewPortWidth = viewPortWidth * scale2;
    left = offsetX;
    top = 0;
    scaleX = scale * scale2;
    scaleY = scale * scale2;

    delegate._setScreenSize(designW, designH, viewPortWidth, viewPortHeight, left, top, scaleX, scaleY);

};
FixedWidth.prototype.fromJSON = function (json) {
    this.minHeight = json.minHeight || 0;
    return this;
};
FixedWidth.prototype.toJSON = function (json) {
    json || (json = {});
    json._className = "FixedHeight";
    json.minHeight = this.minHeight;
    return json;
};
//ContentStrategy.FixedWidth = FixedWidth;

function FixedSize() {
    ContentStrategy.call(this);
    this.width = 100;
    this.height = 100;
}
FixedSize.prototype = Object.create(ContentStrategy.prototype);
FixedSize.prototype.constructor = FixedSize;

FixedSize.prototype._apply = function (delegate, designedResolutionWidth, designedResolutionHeight) {
    //var viewPortWidth = this.width;
    //var viewPortHeight = this.height;
    //var scale = viewPortWidth / designedResolutionWidth;
    //this.setEgretSize(designedResolutionWidth, viewPortHeight / scale, viewPortWidth, viewPortHeight);
    //delegate._scaleX = scale;
    //delegate._scaleY = scale;

    var designW, designH, viewPortWidth, viewPortHeight, scaleX, scaleY, left, top;
    viewPortWidth = this.width;
    viewPortHeight = this.height;
    var scale = viewPortWidth / designedResolutionWidth;
    designW = designedResolutionWidth;
    designH = viewPortHeight / scale;
    left = 0;
    top = 0;
    scaleX = scale;
    scaleY = scale;

    delegate._setScreenSize(designW, designH, viewPortWidth, viewPortHeight, left, top, scaleX, scaleY);

};
FixedSize.prototype.fromJSON = function (json) {
    this.width = json.width || 0;
    this.height = json.height || 0;
    return this;
};
FixedSize.prototype.toJSON = function (json) {
    json || (json = {});
    json._className = "FixedHeight";
    json.width = this.width;
    json.height = this.height;
    return json;
};
//ContentStrategy.FixedSize = FixedSize;

function NoScale() {
    ContentStrategy.call(this);
}
NoScale.prototype = Object.create(ContentStrategy.prototype);
NoScale.prototype.constructor = NoScale;

NoScale.prototype._apply = function (delegate, designedResolutionWidth, designedResolutionHeight) {
    //var offsetX = Math.floor((this._getClientWidth() - designedResolutionWidth) / 2);
    //this.setEgretSize(designedResolutionWidth, designedResolutionHeight, designedResolutionWidth, designedResolutionHeight, offsetX);
    //delegate._scaleX = 1;
    //delegate._scaleY = 1;

    var designW, designH, viewPortWidth, viewPortHeight, scaleX, scaleY, left, top;
    designW = designedResolutionWidth;
    designH = designedResolutionHeight;
    viewPortWidth = designedResolutionWidth;
    viewPortHeight = designedResolutionHeight;
    left = Math.floor((this._getClientWidth() - designedResolutionWidth) / 2);
    top = 0;
    scaleX = 1;
    scaleY = 1;

    delegate._setScreenSize(designW, designH, viewPortWidth, viewPortHeight, left, top, scaleX, scaleY);

};
NoScale.prototype.toJSON = function (json) {
    json || (json = {});
    json._className = "NoScale";
    return json;
};
//ContentStrategy.NoScale = NoScale;

function ShowAll() {
    ContentStrategy.call(this);
}
ShowAll.prototype = Object.create(ContentStrategy.prototype);
ShowAll.prototype.constructor = ShowAll;

ShowAll.prototype._apply = function (delegate, designedResolutionWidth, designedResolutionHeight) {
    //var clientWidth = this._getClientWidth(); //分辨率宽
    //var clientHeight = this._getClientHeight(); //分辨率宽
    //var viewPortWidth = clientWidth;
    //var viewPortHeight = clientHeight;
    //var scale = (viewPortWidth / designedResolutionWidth < viewPortHeight / designedResolutionHeight) ? viewPortWidth / designedResolutionWidth : viewPortHeight / designedResolutionHeight;
    //var designW = designedResolutionWidth;
    //var designH = designedResolutionHeight;
    //viewPortWidth = designW * scale;
    //viewPortHeight = designH * scale;
    //var scale2 = 1;
    //var offsetX = Math.floor((clientWidth - viewPortWidth) / 2);
    //var offsetY = Math.floor((clientHeight - viewPortHeight) / 2);
    //delegate._offSetY = Math.floor((clientHeight - viewPortHeight) / 2);
    //this.setEgretSize(designW, designH / scale2, viewPortWidth * scale2, viewPortHeight, offsetX, delegate._offSetY);
    //delegate._scaleX = scale * scale2;
    //delegate._scaleY = scale * scale2;

    var clientWidth = this._getClientWidth(); //分辨率宽
    var clientHeight = this._getClientHeight(); //分辨率宽
    var designW, designH, viewPortWidth, viewPortHeight, scaleX, scaleY, left, top;
    viewPortWidth = clientWidth;
    viewPortHeight = clientHeight;
    var scale = (viewPortWidth / designedResolutionWidth < viewPortHeight / designedResolutionHeight) ? viewPortWidth / designedResolutionWidth : viewPortHeight / designedResolutionHeight;
    designW = designedResolutionWidth;
    designH = designedResolutionHeight;
    viewPortWidth = designW * scale;
    viewPortHeight = designH * scale;
    left = Math.floor((clientWidth - viewPortWidth) / 2);
    top = Math.floor((clientHeight - viewPortHeight) / 2);
    scaleX = scale;
    scaleY = scale;

    delegate._setScreenSize(designW, designH, viewPortWidth, viewPortHeight, left, top, scaleX, scaleY);
};
ShowAll.prototype.toJSON = function (json) {
    json || (json = {});
    json._className = "ShowAll";
    return json;
};
//ContentStrategy.ShowAll = ShowAll;

function FullScreen() {
    ContentStrategy.call(this);
}
FullScreen.prototype = Object.create(ContentStrategy.prototype);
FullScreen.prototype.constructor = FullScreen;

FullScreen.prototype._apply = function (delegate, designedResolutionWidth, designedResolutionHeight) {
    //var viewPortWidth = this._getClientWidth(); //分辨率宽
    //var viewPortHeight = this._getClientHeight(); //分辨率高
    //var designW = designedResolutionWidth;
    //var designH = designedResolutionHeight;
    //var scalex = viewPortWidth / designedResolutionWidth;
    //var scaley = viewPortHeight / designedResolutionHeight;
    //viewPortWidth = designW * scalex;
    //viewPortHeight = designH * scaley;
    //this.setEgretSize(designW, designH, viewPortWidth, viewPortHeight);
    //delegate._scaleX = scalex;
    //delegate._scaleY = scaley;

    var designW, designH, viewPortWidth, viewPortHeight, scaleX, scaleY, left, top;
    viewPortWidth = this._getClientWidth(); //分辨率宽
    viewPortHeight = this._getClientHeight(); //分辨率高
    designW = designedResolutionWidth;
    designH = designedResolutionHeight;
    scaleX = viewPortWidth / designedResolutionWidth;
    scaleY = viewPortHeight / designedResolutionHeight;
    //viewPortWidth = designW * scaleX;
    //viewPortHeight = designH * scaleY;
    left = 0;
    top = 0;

    delegate._setScreenSize(designW, designH, viewPortWidth, viewPortHeight, left, top, scaleX, scaleY);

};
FullScreen.prototype.toJSON = function (json) {
    json || (json = {});
    json._className = "FullScreen";
    return json;
};
//ContentStrategy.FullScreen = FullScreen;

ContentStrategy.fromJSON = function (json) {
    return ContentStrategy._classes[json._className].fromJSON(json);
};
ContentStrategy.get = function (type) {
    return ContentStrategy._classes[type];
};
//TODO should use static instance??
ContentStrategy._classes = {
    FixedHeight: new FixedHeight,
    FixedWidth: new FixedWidth,
    FixedSize: new FixedSize,
    NoScale: new NoScale,
    ShowAll: new ShowAll,
    FullScreen: new FullScreen,
};
ContentStrategy.default = ContentStrategy._classes.NoScale;

module.exports = ContentStrategy;
