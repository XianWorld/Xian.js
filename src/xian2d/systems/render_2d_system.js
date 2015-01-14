var ComponentSystem = require("./../../systems/component_system");
var Camera2D = require("./../components/camera_2d");
var MainContext = require("./../../context/main_context");
var Log = MainContext.Log;
var ScreenContext = MainContext.ScreenContext;
var Mat4 = require("../../math/mat4");
"use strict";

//TODO it seems the name should be changed to Camera2DSystem
function Render2DSystem(opts) {
    opts || (opts = {});

    ComponentSystem.call(this, opts);

    this.order = 99999;

    this.addEventName = "addCamera2D";
    this.removeEventName = "removeCamera2D";
    this.componentType = Camera2D;

}

ComponentSystem.extend(Render2DSystem);

//Render2DSystem.prototype.start = function () {
//    ComponentSystem.prototype.start.call(this);
//
//    ScreenContext.on("resize", this._onScreenResize.bind(this));
//};
//
//Render2DSystem.prototype._onScreenResize = function () {
//
//};
//
//Render2DSystem.prototype.clear = function () {
//    ComponentSystem.prototype.clear.call(this);
//
//    ScreenContext.off("resize", this._onScreenResize.bind(this));
//
//};
Render2DSystem.prototype.onPreUpdate = function (component) {
    if(component.renderTexture) return;

    //TODO temporarily update the camera scale factor every frame, should listen the resize event for update
    var scaleX = ScreenContext.getScaleX();
    if(scaleX !== 0)
        component.setOrthographicSizeX(1 / scaleX);
    var scaleY = ScreenContext.getScaleY();
    if(scaleY !== 0)
        component.setOrthographicSizeY(1 / scaleY);
};

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
        if (!camera.gameObject.activeInHierarchy) continue;
        if (!camera.enabled) continue;

        //camera.update();

        //this._renderCamera(camera, rootTransforms);
        camera.render(rootTransforms);
    }
};

//Render2DSystem.prototype._renderCamera = function (camera, transforms) {
//
//    var j, transform,
//        _projectionView = camera._projectionView;
//
//    var renderer = camera.renderer || MainContext.RendererContext.renderer;
//
//    //renderer.setTransform();
//    renderer.startRender();
//    if(camera.clearBeforeRender) renderer.clearScreen(camera.transparent, camera.background);
//
//    for (j = 0; j < transforms.length; j++) {
//        transform = transforms[j];
//
//        this._renderTransform(renderer, _projectionView, transform, 1.0);
//    }
//
//    renderer.finishRender();
//};
//
//Render2DSystem.prototype._renderTransform = function (renderer, viewMatrix, transform, alpha) {
//
//    var children = transform.children,
//        len = children.length,
//        gameObject, components, component,
//        i, mask, colorTransform;
//
//    transform.updateMatrices(viewMatrix);
//
//    gameObject = transform.gameObject;
//    //TODO local iterate gameObject.components and add a bool to the renderable2d component
//    components = gameObject.getComponents("Renderable2D", true);
//    if (components && components.length > 0) {
//        len = components.length;
//        for (i = 0; i < len; i++) {
//            component = components[i];
//            //if (!component.visible) {
//            //    continue;
//            //}
//
//            //colorTransform = component._colorTransform;
//            //if (colorTransform){
//            //    renderer.setGlobalColorTransform(colorTransform.matrix);
//            //}
//
//            alpha = component.worldAlpha = alpha * component.alpha;
//
//            //mask = component.mask;
//            //if (mask) {
//            //    renderer.pushMask(mask);
//            //}
//
//            //renderer.setAlpha(alpha, component.blendMode);
//            //renderer.setTransform(transform.modelView, true);
//
//            //component._draw(renderer);
//
//            component.startRender(renderer);
//        }
//    }
//
//    len = children.length;
//    for (i = 0; i < len; i++) {
//        this._renderTransform(renderer, viewMatrix, children[i], alpha);
//    }
//
//    if (components && components.length > 0) {
//        i = components.length;
//        while (i--) {
//            component = components[i];
//            component.finishRender(renderer);
//
//            //if (component._colorTransform){
//            //    renderer.setGlobalColorTransform(null);
//            //}
//            //
//            //mask = component.mask;
//            //if (mask) {
//            //    renderer.popMask(mask);
//            //}
//        }
//    }
//};

Render2DSystem.prototype.sortFunction = function (a, b) {

    //TODO lower layer first! render the camera from low layer to high layer
    return a._active ? 1 : b._active ? -1 : 0;
};


module.exports = Render2DSystem;
