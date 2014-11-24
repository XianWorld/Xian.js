var ComponentManager = require("./component_manager");
"use strict";


function CameraComponentManager() {

    ComponentManager.call(this);
}

ComponentManager.extend(CameraComponentManager);


CameraComponentManager.prototype.sortFunction = function (a, b) {

    return a._active ? 1 : b._active ? -1 : 0;
};


module.exports = CameraComponentManager;
