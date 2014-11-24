var RenderTarget = require("./render_target");
"use strict";

/**
 * @class RenderTargetCube
 * @extends RenderTarget
 * @brief WebGL Render Target helper
 */

function RenderTargetCube(opts) {
    opts || (opts = {});

    RenderTarget.call(this, opts);

    this.activeCubeFace = 0;
}

RenderTarget.extend(RenderTargetCube);


RenderTargetCube.prototype.clone = function () {

    return new RenderTargetCube().copy(this);
};


RenderTargetCube.prototype.copy = function (other) {
    RenderTarget.prototype.copy.call(this, other);

    return this;
};


RenderTargetCube.prototype.toJSON = function (json) {
    json = RenderTarget.prototype.toJSON.call(this, json);

    json.activeCubeFace = this.activeCubeFace;

    return json;
};


RenderTargetCube.prototype.fromJSON = function (json) {
    RenderTarget.prototype.fromJSON.call(this, json);

    this.activeCubeFace = json.activeCubeFace;

    return this;
};


module.exports = RenderTargetCube;
