var ComponentManager = require("./component_manager");
"use strict";


function MeshFilterComponentManager() {

    ComponentManager.call(this);
}

ComponentManager.extend(MeshFilterComponentManager);


MeshFilterComponentManager.prototype.sortFunction = function (a, b) {

    return a.mesh === b.mesh ? 1 : -1;
};


MeshFilterComponentManager.prototype.update = function () {

};


module.exports = MeshFilterComponentManager;
