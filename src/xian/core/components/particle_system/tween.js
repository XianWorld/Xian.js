var Class = require("../../../base/class");
var Mathf = require("../../../math/mathf");
"use strict";


function Tween(opts) {
    opts || (opts = {});

    this.times = opts.times || [];
    this.values = opts.values || [];
}


Tween.prototype.copy = function (other) {

    this.times = other.times.slice();
    this.values = other.values.slice();

    return this;
};


Tween.prototype.clear = function () {

    this.times.length = 0;
    this.values.length = 0;

    return this;
};


Tween.prototype.update = function (time, out) {
    var times = this.times,
        values = this.values,
        n = times.length,
        i = 0,
        t;

    while (i < n && time > times[i]) i++;

    if (i === 0) return values[0];
    if (i === n) return values[n - 1];

    t = (time - times[i - 1]) / (times[i] - times[i - 1]);

    if (out) return out.copy(values[i - 1]).lerp(values[i], t);
    return values[i - 1] + t * (values[i] - values[i - 1]);
};


Tween.prototype.toJSON = function (json) {
    json || (json = {});
    var times = this.times,
        values = this.values,
        jsonTimes = json.times || (json.times = []),
        jsonValues = json.values || (json.values = []),
        i;

    i = times.length;
    while (i--) jsonTimes[i] = times[i];

    i = values.length;
    while (i--) jsonValues[i] = values[i].toJSON ? values[i].toJSON(jsonValues[i]) : values[i];

    return json;
};


Tween.prototype.fromJSON = function (json) {
    var times = this.times,
        values = this.values,
        jsonTimes = json.times,
        jsonValues = json.values,
        i;

    i = jsonTimes.length;
    while (i--) times[i] = fromJSON(jsonTimes[i]);

    i = jsonValues.length;
    while (i--) values[i] = fromJSON(jsonValues[i]);

    return this;
};


function fromJSON(json) {
    var classes = Class._classes,
        mathClasses = Mathf._classes;

    if (typeof(json) !== "object") {
        return json;
    } else if (mathClasses[json._className]) {
        return Mathf.fromJSON(json);
    } else if (classes[json._className]) {
        return Class.fromJSON(json);
    } else {
        return json;
    }

    return null;
}


module.exports = Tween;
