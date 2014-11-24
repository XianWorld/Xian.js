var EventEmitter = require("../../base/event_emitter");
var ObjectPool = require("../../base/object_pool");
var Time = require("../../base/time");
var Mathf = require("../../math/mathf");
var Vec2 = require("../../math/vec2");
var Vec3 = require("../../math/vec3");
var Enums = require("../enums");
var Buttons = require("./buttons");
var Button = require("./button");
var Axes = require("./axes");
var Axis = require("./axis");
var Touches = require("./touches");
"use strict";


var abs = Math.abs,
    sign = Mathf.sign,
    clamp = Mathf.clamp,

    AxisType = Enums.AxisType,
    MOUSE_BUTTONS = {
        "0": "mouse0",
        "1": "mouse1",
        "2": "mouse2"
    };


function Input() {

    EventEmitter.call(this);

    this.axes = new Axes;
    this.buttons = new Buttons;

    this.mouseWheel = 0;
    this.mousePosition = new Vec2;
    this.mouseDelta = new Vec2;
    this.mouseMoveNeedsUpdate = false;

    this.touches = new Touches;
    this.touchesMoveNeedsUpdate = false;
    this.acceleration = new Vec3;

    this.frameCount = 0;
    this._frameCount = undefined;

    this.time = 0;
    this._time = undefined;

    this._SYNC = {};
}

EventEmitter.extend(Input);


Input.prototype.update = function () {
    var axes = this.axes,
        buttons = this.buttons.hash,
        button, altButton,
        axis, value, type, touch, sensitivity, pos, neg, tmp, dt = Time.delta,
        i;

    this.frameCount = this._frameCount ? this._frameCount : Time.frameCount;
    this.time = this._time ? this._time : Time.stamp();

    this.mouseMoveNeedsUpdate = true;
    this.touchesMoveNeedsUpdate = true;

    for (i = axes.length; i--;) {
        axis = axes[i];
        value = axis.value;
        type = axis.type;
        sensitivity = axis.sensitivity;

        if (type === AxisType.Button) {
            button = buttons[axis.negButton];
            altButton = buttons[axis.altNegButton];
            neg = button && button.value || altButton && altButton.value;

            button = buttons[axis.posButton];
            altButton = buttons[axis.altPosButton];
            pos = button && button.value || altButton && altButton.value;

        } else if (type === AxisType.Mouse) {
            axis.value = this.mouseDelta[axis.axis];
            continue;

        } else if (type === AxisType.Touch) {
            touch = this.touches[axis.index];

            if (touch) {
                axis.value = touch.delta[axis.axis];
            } else {
                continue;
            }
        } else if (type === AxisType.MouseWheel) {
            value += this.mouseWheel;

        } else if (type === AxisType.Joystick) {

        }

        if (neg) value -= sensitivity * dt;
        if (pos) value += sensitivity * dt;

        if (!pos && !neg && value !== 0) {
            tmp = abs(value);
            value -= clamp(sign(value) * axis.gravity * dt, -tmp, tmp);
        }

        value = clamp(value, -1, 1);
        if (abs(value) <= axis.dead) value = 0;

        axis.value = value;
    }

    this.mouseWheel = 0;
};


Input.prototype.axis = function (name) {
    var axis = this.axes.hash[name];
    return axis ? axis.value : 0;
};


Input.prototype.mouseButton = function (id) {
    var button = this.buttons.hash[MOUSE_BUTTONS[id]];

    return button && button.value;
};


Input.prototype.mouseButtonDown = function (id) {
    var button = this.buttons.hash[MOUSE_BUTTONS[id]];

    return button && button.value && (button.frameDown >= this.frameCount);
};


Input.prototype.mouseButtonUp = function (id) {
    var button = this.buttons.hash[MOUSE_BUTTONS[id]];

    return button && (button.frameUp >= this.frameCount)
};


Input.prototype.anyKey = function () {
    var buttons = this.buttons,
        i;

    for (i = buttons.length; i--;) {
        if (buttons[i].value) return true;
    }
    return false;
};


Input.prototype.anyKeyDown = function () {
    var buttons = this.buttons,
        button,
        i;

    for (i = buttons.length; i--;) {
        if ((button = buttons[i]).value && (button.frameDown >= this.frameCount)) return true;
    }
    return false;
};


Input.prototype.key = function (name) {
    var button = this.buttons.hash[name];

    return button && button.value;
};


Input.prototype.keyDown = function (name) {
    var button = this.buttons.hash[name];

    return button && button.value && (button.frameDown >= this.frameCount);
};


Input.prototype.keyUp = function (name) {
    var button = this.buttons.hash[name];

    return button && (button.frameUp >= this.frameCount);
};


Input.prototype.toSYNC = function (json) {
    json || (json = this._SYNC);

    json._frameCount = Time.frameCount;
    json._time = Time.stamp();

    json.buttons = this.buttons.toSYNC(json.buttons);

    json.mousePosition = this.mousePosition.toJSON(json.mousePosition);
    json.mouseDelta = this.mouseDelta.toJSON(json.mouseDelta);

    json.acceleration = this.acceleration.toJSON(json.acceleration);
    json.touches = this.touches.toSYNC(json.touches);

    return json;
};


Input.prototype.fromSYNC = function (json) {

    this._frameCount = json._frameCount;
    this._time = json._time;

    this.buttons.fromSYNC(json.buttons);

    this.mousePosition.fromJSON(json.mousePosition);
    this.mouseDelta.fromJSON(json.mouseDelta);

    this.acceleration.fromJSON(json.acceleration);
    this.touches.fromSYNC(json.touches);

    return this;
};


Input.prototype.toJSON = function (json) {
    json || (json = {});

    json.buttons = this.buttons.toJSON(json.buttons);
    json.axes = this.axes.toJSON(json.axes);

    json.mousePosition = this.mousePosition.toJSON(json.mousePosition);
    json.mouseDelta = this.mouseDelta.toJSON(json.mouseDelta);

    json.acceleration = this.acceleration.toJSON(json.acceleration);
    json.touches = this.touches.toJSON(json.touches);

    return json;
};


Input.prototype.fromJSON = function (json) {

    this.buttons.fromJSON(json.buttons);
    this.axes.fromJSON(json.axes);

    this.mousePosition.fromJSON(json.mousePosition);
    this.mouseDelta.fromJSON(json.mouseDelta);

    this.acceleration.fromJSON(json.acceleration);
    this.touches.fromJSON(json.touches);

    return this;
};


module.exports = new Input;
