var Mathf = require("../math/mathf");
var Color = require("../math/color");
var Rect = require("../math/rect");
//var Mat4 = require("../math/mat4");
var Component = require("./../core/component");
"use strict";

var degsToRads = Mathf.degsToRads,
    clamp = Mathf.clamp,
    EPSILON = Mathf.EPSILON;


function Camera() {

    Component.call(this);

    this.viewportRect = new Rect(0,0,1,1);
    this.background = new Color(0.5, 0.5, 0.5);

    this.orthographicSizeX = 1;
    this.orthographicSizeY = 1;

    this.minOrthographicSize = EPSILON;
    this.maxOrthographicSize = 1024;

    //render target: default(main)/RenderTexture
    this.renderTexture = undefined;

    this.isMain = false;

    this.needsUpdate = true;

    //temporary solution for Camera.main
    this._onAddToScene = function(){
        if(this.isMain)
            if(Camera.main !== undefined) Camera.main = this;
    };
    this._onRemoveFromScene = function(){
        if(this.isMain)
            if(Camera.main === this) Camera.main = undefined;
    };
    this.on('addToScene', this._onAddToScene, this);
    this.on('removeFromScene', this._onRemoveFromScene, this);
}

Component.extend(Camera);

Camera.prototype.copy = function (other) {
    Component.prototype.copy.call(this, other);

    this.viewportRect.copy(other.viewportRect);
    this.background.copy(other.background);

    this.orthographicSizeX = other.orthographicSizeX;
    this.orthographicSizeY = other.orthographicSizeY;
    this.minOrthographicSize = other.minOrthographicSize;
    this.maxOrthographicSize = other.maxOrthographicSize;

    this.isMain = other.isMain;
    this.needsUpdate = true;

    return this;
};

Camera.prototype.clear = function () {
    Component.prototype.clear.call(this);

    this.viewportRect.set(0,0,1,1);
    this.background.set(0.5, 0.5, 0.5);

    this.orthographicSizeX = 1;
    this.orthographicSizeY = 1;

    this.minOrthographicSize = EPSILON;
    this.maxOrthographicSize = 1024;

    this.renderTexture = undefined;

    this.needsUpdate = true;

    this.on('init', this._onAddToScene, this);
    this.on('remove', this._onRemoveFromScene, this);

    return this;
};

Camera.prototype.destroy = function () {
    Component.prototype.destroy.call(this);
    this.viewportRect = undefined;
    this.background = undefined;

    this.off('init', this._onAddToScene, this);
    this.off('remove', this._onRemoveFromScene, this);
    this._onAddToScene = undefined;
    this._onRemoveFromScene = undefined;
};

Camera.prototype.setOrthographicSizeX = function (size) {
    var orthographicSizeX = clamp(size, this.minOrthographicSize, this.maxOrthographicSize);
    if(this.orthographicSizeX === orthographicSizeX) return;
    this.orthographicSizeX = orthographicSizeX;
    this.needsUpdate = true;
};
Camera.prototype.setOrthographicSizeY = function (size) {
    var orthographicSizeY = clamp(size, this.minOrthographicSize, this.maxOrthographicSize);
    if(this.orthographicSizeY === orthographicSizeY) return;
    this.orthographicSizeY = orthographicSizeY;
    this.needsUpdate = true;
};

Camera.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.viewportRect = this.viewportRect.toJSON(json.viewportRect);
    json.background = this.background.toJSON(json.background);

    json.orthographicSizeX = this.orthographicSizeX;
    json.orthographicSizeY = this.orthographicSizeY;
    json.minOrthographicSize = this.minOrthographicSize;
    json.maxOrthographicSize = this.maxOrthographicSize;

    return json;
};

Camera.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    json.viewportRect ? this.viewportRect.fromJSON(json.viewportRect) : this.viewportRect.set(0,0,1,1);
    json.background ? this.background.fromJSON(json.background) : this.background.set(0.5, 0.5, 0.5);

    this.orthographicSizeX = json.orthographicSizeX || 1;
    this.orthographicSizeY = json.orthographicSizeY || 1;
    this.minOrthographicSize = json.minOrthographicSize || EPSILON;
    this.maxOrthographicSize = json.maxOrthographicSize || 1024;

    this.needsUpdate = true;

    return this;
};

Camera.main = undefined;
//no implements
Camera.allCameras = undefined;

module.exports = Camera;
