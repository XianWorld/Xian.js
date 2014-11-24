var Vec2 = require("../../math/vec2");
var P2Convex = require("./p2convex");
"use strict";


function P2Rect(opts) {
    opts || (opts = {});

    var extents = opts.extents || new Vec2(0.5, 0.5),
        x = extents.x,
        y = extents.y;

    opts.vertices = [
        new Vec2(x, y),
        new Vec2(-x, y),
        new Vec2(-x, -y),
        new Vec2(x, -y)
    ];

    P2Convex.call(this, opts);

    this.extents = extents;
}

P2Convex.extend(P2Rect);


P2Rect.prototype.toJSON = function (json) {
    json = P2Convex.prototype.toJSON.call(this, json);

    json.extents = this.extents.toJSON(json.extents);

    return json;
};


P2Rect.prototype.fromJSON = function (json) {
    P2Convex.prototype.fromJSON.call(this, json);

    this.extents.fromJSON(json.extents);

    return this;
};


module.exports = P2Rect;
