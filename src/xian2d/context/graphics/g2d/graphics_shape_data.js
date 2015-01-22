var Class = require("../../../../base/class");
var Rect = require("../../../../math/rect");
var Vec2 = require("../../../../math/vec2");
var Enums2D = require("../../../base/enums_2d");

function GraphicsShapeData () {
    this.type = -1;
}
Class.extend(GraphicsShapeData);

//GraphicsShapeData.prototype.copy = function (other) {
//    this.type = other.type;
//    return this;
//};
//GraphicsShapeData.prototype.clear = function () {
//    this.type = -1;
//    return this;
//};
//
//GraphicsShapeData.prototype.toJSON = function (json) {
//    json = Class.prototype.toJSON.call(this, json);
//
//    json.type = this.type;
//    return json;
//};
//
//GraphicsShapeData.prototype.fromJSON = function (json) {
//    Class.prototype.fromJSON.call(this, json);
//
//    this.type = json.type || -1;
//    return this;
//};

function CircleShape() {
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    this.type = Enums2D.ShapeTypes.CIRC;
}
GraphicsShapeData.extend(CircleShape);
CircleShape.prototype.init = function (x, y, radius) {
    this.x = x || 0;
    this.y = y || 0;
    this.radius = radius || 0;
    return this;
};
CircleShape.prototype.copy = function (other) {
    this.x = other.x;
    this.y = other.y;
    this.radius = other.radius;
    return this;
};
CircleShape.prototype.toJSON = function (json) {
    json = GraphicsShapeData.prototype.toJSON.call(this, json);
    json.x = this.x;
    json.y = this.y;
    json.radius = this.radius;
    return json;
};
CircleShape.prototype.fromJSON = function (json) {
    GraphicsShapeData.prototype.fromJSON.call(this, json);
    this.x = json.x || 0;
    this.y = json.y || 0;
    this.radius = json.radius || 0;
    return this;
};
CircleShape.prototype.contains = function (x, y) {
    if (this.radius <= 0)
        return false;
    var dx = (this.x - x),
        dy = (this.y - y),
        r2 = this.radius * this.radius;
    dx *= dx;
    dy *= dy;
    return (dx + dy <= r2);
};
//CircleShape.prototype.getBounds = function () {
//    return new Rect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
//};
GraphicsShapeData.CircleShape = CircleShape;

function RectangleShape() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    this.type = Enums2D.ShapeTypes.RECT;
}
GraphicsShapeData.extend(RectangleShape);
RectangleShape.prototype.init = function (x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    return this;
};
RectangleShape.prototype.copy = function (other) {
    this.x = other.x;
    this.y = other.y;
    this.width = other || 0;
    this.height = other || 0;
    return this;
};
RectangleShape.prototype.toJSON = function (json) {
    json = GraphicsShapeData.prototype.toJSON.call(this, json);
    json.x = this.x;
    json.y = this.y;
    json.width = this.width;
    json.height = this.height;
    return json;
};
RectangleShape.prototype.fromJSON = function (json) {
    GraphicsShapeData.prototype.fromJSON.call(this, json);
    this.x = json.x || 0;
    this.y = json.y || 0;
    this.width = json.width || 0;
    this.height = json.height || 0;
    return this;
};
RectangleShape.prototype.contains = function (x, y) {
    if (this.width <= 0 || this.height <= 0)
        return false;
    var x1 = this.x;
    if (x >= x1 && x <= x1 + this.width) {
        var y1 = this.y;
        if (y >= y1 && y <= y1 + this.height) {
            return true;
        }
    }
    return false;
};
GraphicsShapeData.RectangleShape = RectangleShape;

function EllipseShape() {
    RectangleShape.call(this);
    this.type = Enums2D.ShapeTypes.ELIP;
}
RectangleShape.extend(EllipseShape);
EllipseShape.prototype.contains = function (x, y) {
    if (this.width <= 0 || this.height <= 0)
        return false;
    //normalize the coords to an EllipseShape with center 0,0
    var normx = ((x - this.x) / this.width),
        normy = ((y - this.y) / this.height);

    normx *= normx;
    normy *= normy;

    return (normx + normy <= 1);
};
//EllipseShape.prototype.getBounds = function () {
//    return new Rect(this.x - this.width, this.y - this.height, this.width, this.height);
//};
GraphicsShapeData.EllipseShape = EllipseShape;

function RoundedRectangleShape() {
    RectangleShape.call(this);
    this.radius = 20;
    this.type = Enums2D.ShapeTypes.RREC;
}
GraphicsShapeData.extend(RoundedRectangleShape);
RoundedRectangleShape.prototype.init = function (x, y, width, height, radius) {
    RectangleShape.prototype.init.call(this, x, y, width, height);
    this.radius = radius || 20;
    return this;
};
RoundedRectangleShape.prototype.copy = function (other) {
    RectangleShape.prototype.copy.call(this, other);
    this.radius = other.radius;
    return this;
};
RoundedRectangleShape.prototype.toJSON = function (json) {
    json = RectangleShape.prototype.toJSON.call(this, json);
    json.radius = this.radius;
    return json;
};
RoundedRectangleShape.prototype.fromJSON = function (json) {
    RectangleShape.prototype.fromJSON.call(this, json);
    this.radius = json.radius || 20;
    return this;
};
GraphicsShapeData.RoundedRectangleShape = RoundedRectangleShape;

function PolygonShape() {
    this.closed = true;
    this.points = undefined;

    this.type = Enums2D.ShapeTypes.POLY;
}
GraphicsShapeData.extend(PolygonShape);
PolygonShape.prototype.init = function (points) {
    //if points isn't an array, use arguments as the array
    if (!(points instanceof Array))points = Array.prototype.slice.call(arguments);
    //if this is a flat array of numbers, convert it to points
    if (points[0] instanceof Vec2) {
        var p = [];
        for (var i = 0, il = points.length; i < il; i++) {
            p.push(points[i].x, points[i].y);
        }
        points = p;
    }
    this.closed = true;
    this.points = points;
    return this;
};
PolygonShape.prototype.copy = function (other) {
    if(other.points)
        this.init(other.points.slice());
    else
        this.points = undefined;
    return this;
};
PolygonShape.prototype.toJSON = function (json) {
    json = GraphicsShapeData.prototype.toJSON.call(this, json);
    json.points = this.points;
    return json;
};
PolygonShape.prototype.fromJSON = function (json) {
    GraphicsShapeData.prototype.fromJSON.call(this, json);
    this.points = json.points;
    return this;
};
PolygonShape.prototype.contains = function (x, y) {
    var inside = false;
    // use some raycasting to test hits
    // https://github.com/substack/point-in-PolygonShape/blob/master/index.js
    var length = this.points.length / 2;
    for (var i = 0, j = length - 1; i < length; j = i++) {
        var xi = this.points[i * 2], yi = this.points[i * 2 + 1],
            xj = this.points[j * 2], yj = this.points[j * 2 + 1],
            intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};
GraphicsShapeData.PolygonShape = PolygonShape;


module.exports = GraphicsShapeData;