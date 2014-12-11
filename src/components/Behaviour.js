var Component = require("./../core/component");
"use strict";

function Behaviour(opts) {
    opts || (opts = {});

    Component.call(this, opts);

    this._enabled = true;
}

Component.extend(Behaviour);

Object.defineProperty(Behaviour.prototype, "enabled", {
    get: function () {
        return this._enabled;
    },
    set: function (value) {
        if (this._enabled === value) return;

        this._enabled = value;

        if (value)
            this.onEnabled();
        else
            this.onDisabled();
    }
});

Behaviour.prototype.copy = function (other) {

    return this;
};

Behaviour.prototype.init = function () {
    Component.prototype.init.call(this);

    this.onInit();
};

Behaviour.prototype.start = function () {
    Component.prototype.start.call(this);

    this.onStart();
};

Behaviour.prototype.update = function () {
    if (!this._enabled) return;

    this.onUpdate();
};

Behaviour.prototype.destroy = function () {
    Component.prototype.destroy.call(this);

    this.onDestory();
};

Behaviour.prototype.onInit = function () {
};
Behaviour.prototype.onStart = function () {
};
Behaviour.prototype.onUpdate = function () {
};
Behaviour.prototype.onEnabled = function () {
};
Behaviour.prototype.onDisabled = function () {
};
Behaviour.prototype.onDestory = function () {
};

Behaviour.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.enabled = this._enabled;
    return json;
};


Behaviour.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this._enabled = json.enabled;
    return this;
};

module.exports = Behaviour;
