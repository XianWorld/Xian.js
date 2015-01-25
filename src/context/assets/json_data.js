//var Enums = require("../core/enums");
var Asset = require("./asset");
"use strict";

function JsonData(opts) {
    //opts || (opts = {});

    Asset.call(this, opts);

    this.jsonData = undefined;
}

Asset.extend(JsonData);

JsonData.prototype.clear = function () {
    this.jsonData = undefined;
    return this;
};

JsonData.prototype.copy = function (other) {
    Asset.prototype.copy.call(this, other);
    //TODO
    return this;
};

JsonData.prototype.toJSON = function (json, pack) {
    json = Asset.prototype.toJSON.call(this, json);
    //TODO

    json.jsonData = this.jsonData;

    return json;
};

JsonData.prototype.fromJSON = function (json) {
    Asset.prototype.fromJSON.call(this, json);
    //TODO

    this.jsonData = json.jsonData;
    return this;
};

module.exports = JsonData;
