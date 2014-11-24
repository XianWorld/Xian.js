var ComponentManager = require("./component_manager");
"use strict";


function Transform2DComponentManager() {

    ComponentManager.call(this, 999999);
}

ComponentManager.extend(Transform2DComponentManager);


Transform2DComponentManager.prototype.sortFunction = function (a, b) {

    return a.depth - b.depth;
};


module.exports = Transform2DComponentManager;
