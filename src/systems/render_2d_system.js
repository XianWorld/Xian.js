var ComponentSystem = require("./component_system");
var Camera2D = require("./../components/camera_2d");
var Log = require("./../context/main_context").Log;
"use strict";


function Render2DSystem(opts) {
    opts || (opts = {});

    ComponentSystem.call(this, opts);

    this.order = -99999;

    this.addEventName = "startCamera2D";
    this.removeEventName = "removeCamera2D";
    this.componentType = Camera2D;

    this.rootTransforms = [];
}

ComponentSystem.extend(Render2DSystem);

Render2DSystem.prototype.render = function () {

    var components = this.components,
        len = components.length,
        camera, i, j, viewMatrix, rootTransforms;

    var transformSystem = this.scene.getSystem("Transform2DSystem");
    if(!transformSystem){
        Log.once("Render2DSystem : Can not found relative TranformSystem!");
        return;
    }

    var transform, gameObject;

    rootTransforms = transformSystem.rootTransforms;

    for(i=0;i<len;i++){
        camera = components[i];
        if(!camera._active) continue;

        viewMatrix = camera.view;

        for(j=0;j<rootTransforms.length;j++){
            transform = rootTransforms[j];
        }
    }
};

Render2DSystem.prototype._render = function (transform, alpha) {

    var children = transform.children,
        len = children.length,
        gameObject,
        i;

    gameObject = transform.gameObject;

    for(i=0;i<len;i++){

    }
};

Render2DSystem.prototype.sortFunction = function (a, b) {

    //TODO lower layer first! render the camera from low layer to high layer
    return a._active ? 1 : b._active ? -1 : 0;
};


module.exports = Render2DSystem;
