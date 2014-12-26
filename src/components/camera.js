var Mathf = require("../math/mathf");
var Color = require("../math/color");
var Rect = require("../math/rect");
//var Mat4 = require("../math/mat4");
var Component = require("./../core/component");
"use strict";


var degsToRads = Mathf.degsToRads,
    clamp = Mathf.clamp,
    EPSILON = Mathf.EPSILON;


function Camera(opts) {
    opts || (opts = {});

    Component.call(this, opts);

    this.viewportRect = opts.viewportRect !== undefined ? opts.viewportRect : new Rect(0,0,1,1);
    this.background = opts.background !== undefined ? opts.background : new Color(0.5, 0.5, 0.5);

    this.orthographicSizeX = opts.orthographicSizeX !== undefined ? opts.orthographicSizeX : 1;
    this.orthographicSizeY = opts.orthographicSizeY !== undefined ? opts.orthographicSizeY : 1;

    this.minOrthographicSize = opts.minOrthographicSize !== undefined ? opts.minOrthographicSize : EPSILON;
    this.maxOrthographicSize = opts.maxOrthographicSize !== undefined ? opts.maxOrthographicSize : 1024;

    this.needsUpdate = true;
}

Component.extend(Camera);


Camera.prototype.copy = function (other) {
    this.viewportRect.copy(other.viewportRect);
    this.background.copy(other.background);

    this.orthographicSizeX = other.orthographicSizeX;
    this.orthographicSizeY = other.orthographicSizeY;
    this.minOrthographicSize = other.minOrthographicSize;
    this.maxOrthographicSize = other.maxOrthographicSize;

    this.needsUpdate = true;

    return this;
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

    this.viewportRect.fromJSON(json.viewportRect);
    this.background.fromJSON(json.background);

    this.orthographicSizeX = json.orthographicSizeX;
    this.orthographicSizeY = json.orthographicSizeY;
    this.minOrthographicSize = json.minOrthographicSize;
    this.maxOrthographicSize = json.maxOrthographicSize;

    this.needsUpdate = true;

    return this;
};

module.exports = Camera;
