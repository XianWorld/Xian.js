var ComponentManager = require("./component_manager");
"use strict";


function LightComponentManager() {

    ComponentManager.call(this);
}

ComponentManager.extend(LightComponentManager);


LightComponentManager.prototype.sortFunction = function (a, b) {

    return a.type - b.type;
};


LightComponentManager.prototype.update = function () {

};


module.exports = LightComponentManager;
