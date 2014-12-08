var util = require("./util");
"use strict";


var isArray = util.isArray,
    SPLITER = /[ ,]+/,
    COUNTER = 0;


function Enum(enums) {
    enums = isArray(enums) ? enums : enums.split(SPLITER);
    var i = enums.length;

    while (i--) this[enums[i]] = ++COUNTER;
}


Enum.prototype.add = function (enums) {
    enums = isArray(enums) ? enums : enums.split(SPLITER);
    var i = enums.length;

    while (i--) this[enums[i]] = ++COUNTER;

    return this;
};


Enum.prototype.in = function (num) {
    var key;

    for (key in this) {
        if (this[key] == num) return true;
    }

    return false;
};


module.exports = Enum;
