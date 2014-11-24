var ComponentManager = require("./component_manager");
"use strict";


function Camera2DComponentManager() {

    ComponentManager.call(this);
}

ComponentManager.extend(Camera2DComponentManager);


Camera2DComponentManager.prototype.sortFunction = function (a, b) {

    return a._active ? 1 : b._active ? -1 : 0;
};


module.exports = Camera2DComponentManager;
