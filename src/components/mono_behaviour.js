var Behaviour = require("./../components/behaviour");
"use strict";

function MonoBehaviour() {

    Behaviour.call(this);
}

Behaviour.extend(MonoBehaviour);

MonoBehaviour.prototype.copy = function (other) {
    Behaviour.prototype.copy.call(other);

    return this;
};

MonoBehaviour.prototype.init = function () {
    Behaviour.prototype.init.call(this);

    this.onInit();
};

MonoBehaviour.prototype.start = function () {
    Behaviour.prototype.start.call(this);

    if(this.onLateUpdate)
        this.gameObject.scene.on("afterRender", this.onLateUpdate.bind(this));
    this.onStart();
};

MonoBehaviour.prototype.update = function () {
    //if (!this._enabled) return;

    this.onUpdate();
};

MonoBehaviour.prototype.clear = function () {
    Behaviour.prototype.clear.call(this);

    if(this.onLateUpdate)
        this.gameObject.scene.off("afterRender", this.onLateUpdate.bind(this));

    this.onClear();
};
MonoBehaviour.prototype.destroy = function () {
    Behaviour.prototype.destroy.call(this);

    this.onDestory();
};

MonoBehaviour.prototype.onInit = function () {
};
MonoBehaviour.prototype.onStart = function () {
};
MonoBehaviour.prototype.onUpdate = function () {
};
//MonoBehaviour.prototype.onLateUpdate = function () {
//};
//MonoBehaviour.prototype.onEnabled = function () {
//};
//MonoBehaviour.prototype.onDisabled = function () {
//};
MonoBehaviour.prototype.onClear = function () {
};
MonoBehaviour.prototype.onDestory = function () {
};

module.exports = MonoBehaviour;
