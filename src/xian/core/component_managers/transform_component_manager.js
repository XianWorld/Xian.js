var ComponentManager = require("./component_manager");
"use strict";


function TransformComponentManager() {

    ComponentManager.call(this, 999999);
}

ComponentManager.extend(TransformComponentManager);


TransformComponentManager.prototype.sortFunction = function (a, b) {

    return a.depth - b.depth;
};


module.exports = TransformComponentManager;
