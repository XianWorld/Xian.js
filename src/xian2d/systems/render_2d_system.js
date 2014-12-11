var ComponentSystem = require("./../../systems/component_system");
var Camera2D = require("./../components/camera_2d");
var MainContext = require("./../../context/main_context");
var Log = MainContext.Log;
var Mat4 = require("../../math/mat4");
"use strict";

function Render2DSystem(opts) {
    opts || (opts = {});

    ComponentSystem.call(this, opts);

    this.order = -99999;

    this.addEventName = "startCamera2D";
    this.removeEventName = "removeCamera2D";
    this.componentType = Camera2D;

}

ComponentSystem.extend(Render2DSystem);

Render2DSystem.prototype.render = function () {

    var components = this.components,
        len = components.length,
        camera, i, j, viewMatrix, rootTransforms;

    if (len === 0) {
        Log.once("Render2DSystem : Can not found Camera2D gameobject!");
        return;
    }

    var transformSystem = this.scene.getSystem("Transform2DSystem");
    if (!transformSystem) {
        Log.once("Render2DSystem : Can not found relative TranformSystem!");
        return;
    }

    //var renderer = MainContext.RendererContext.renderer;

    //var transform, gameObject,
    //    _projScreenMatrix = new Mat4;

    rootTransforms = transformSystem.rootTransforms;

    for (i = 0; i < len; i++) {
        camera = components[i];
        if (!camera._active) continue;

        camera.update();

        this._renderCamera(camera, rootTransforms);
        //renderer.setTransform();
        //if(camera.clearBeforeRender) renderer.clearScreen(camera.background);
        //
        //_projScreenMatrix.mmul(camera.projection, camera.view);
        ////viewMatrix = camera.view;
        //
        //for (j = 0; j < rootTransforms.length; j++) {
        //    transform = rootTransforms[j];
        //
        //    this._renderTransform(renderer, _projScreenMatrix, transform, 1);
        //}

        //break;
    }
};

Render2DSystem.prototype._renderCamera = function (camera, transforms) {

    var j, transform, gameObject,
        _projScreenMatrix = new Mat4;

    var renderer = camera.renderer || MainContext.RendererContext.renderer;

    renderer.setTransform();
    if(camera.clearBeforeRender) renderer.clearScreen(camera.transparent, camera.background);

    _projScreenMatrix.mmul(camera.projection, camera.view);
    //viewMatrix = camera.view;

    for (j = 0; j < transforms.length; j++) {
        transform = transforms[j];

        this._renderTransform(renderer, _projScreenMatrix, transform, 1);
    }
};

Render2DSystem.prototype._renderTransform = function (renderer, viewMatrix, transform, alpha) {

    var children = transform.children,
        len = children.length,
        gameObject, components, component,
        i;

    transform.updateMatrices(viewMatrix);

    gameObject = transform.gameObject;
    //TODO local iterate gameObject.components and add a bool to the renderable2d component
    components = gameObject.getComponents("Renderable2D", true);
    if (components && components.length > 0) {
        len = components.length;
        for (i = 0; i < len; i++) {
            component = components[i];
            component.startRender(renderer);
        }
    }

    len = children.length;
    for (i = 0; i < len; i++) {
        this._renderTransform(renderer, viewMatrix, children[i], alpha);
    }

    if (components && components.length > 0) {
        i = components.length;
        while (i--) {
            component = components[i];
            component.finishRender(renderer);
        }
    }
};

Render2DSystem.prototype.sortFunction = function (a, b) {

    //TODO lower layer first! render the camera from low layer to high layer
    return a._active ? 1 : b._active ? -1 : 0;
};


module.exports = Render2DSystem;
