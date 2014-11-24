var ComponentManager = require("./component_manager");
"use strict";


function MeshAnimationComponentManager() {

    ComponentManager.call(this, -999999);
}

ComponentManager.extend(MeshAnimationComponentManager);


module.exports = MeshAnimationComponentManager;
