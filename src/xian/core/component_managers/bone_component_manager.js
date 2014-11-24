var ComponentManager = require("./component_manager");
"use strict";


function BoneComponentManager() {

    ComponentManager.call(this, 1000000);
}

ComponentManager.extend(BoneComponentManager);


BoneComponentManager.prototype.sortFunction = function (a, b) {

    return a.parentIndex - b.parentIndex;
};


module.exports = BoneComponentManager;
