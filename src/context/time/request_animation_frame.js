"use strict";


var RATE = 1000 / 60,
    w = typeof(window) !== "undefined" ? window : global;

module.exports = (
w.requestAnimationFrame ||
w.webkitRequestAnimationFrame ||
w.mozRequestAnimationFrame ||
w.oRequestAnimationFrame ||
w.msRequestAnimationFrame ||
function (callback) {

    return w.setTimeout(callback, RATE);
}
);
