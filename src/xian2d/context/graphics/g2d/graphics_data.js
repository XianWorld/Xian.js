var Class = require("../../../../base/class");
var ObjectPools = require("../../../../context/pool/object_pools");
//var GraphicsShapeData = require("./graphics_shape_data");

function GraphicsData () {
    this.lineWidth = 0;
    this.lineColor = 0;
    this.lineAlpha = 1;

    this.fillColor = 0;
    this.fillAlpha = 1;
    this.fill = false;

    this.shape = undefined;
    this.type = 0;
}
Class.extend(GraphicsData);

GraphicsData.prototype.init = function (lineWidth, lineColor, lineAlpha, fillColor, fillAlpha, fill, shape) {
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    this.lineAlpha = lineAlpha;

    this.fillColor = fillColor;
    this.fillAlpha = fillAlpha;
    this.fill = fill;

    this.shape = shape;
    this.type = shape.type;
    return this;
};

GraphicsData.prototype.copy = function (other) {
    this.lineWidth = other.lineWidth;
    this.lineColor = other.lineColor;
    this.lineAlpha = other.lineAlpha;

    this.fillColor = other.fillColor;
    this.fillAlpha = other.fillAlpha;
    this.fill = other.fill;

    this.shape = other.shape.clone();
    this.type = other.type;
    return this;
};

GraphicsData.prototype.clear = function () {
    this.lineWidth = 0;
    this.lineColor = 0;
    this.lineAlpha = 1;

    this.fillColor = 0;
    this.fillAlpha = 1;
    this.fill = false;

    if(this.shape) this.shape.destroy();
    this.shape = undefined;
    this.type = 0;
    return this;
};

GraphicsData.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.lineWidth = this.lineWidth;
    json.lineColor = this.lineColor;
    json.lineAlpha = this.lineAlpha;
    json.fillColor = this.fillColor;
    json.fillAlpha = this.fillAlpha;
    json.fill = this.fill;
    json.shape = this.shape.toJSON(json.shape);
    json.type = this.type;

    return json;
};

GraphicsData.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.lineWidth = json.lineWidth || 0;
    this.lineColor = json.lineColor || 0;
    this.lineAlpha = json.lineAlpha || 1;

    this.fillColor = json.fillColor || 0;
    this.fillAlpha = json.fillAlpha || 1;
    this.fill = json.fill !== undefined ? !!json.fill : false;

    if(json.shape){
        this.shape = Class.fromJSON(json.shape);
        this.type = json.type || this.shape.type;
    }

    return this;
};

var pool = ObjectPools.getPool(GraphicsData);
GraphicsData.create = function() {
    var obj = pool.create();
    if(!obj) obj = new GraphicsData;

    return obj;
};

module.exports = GraphicsData;