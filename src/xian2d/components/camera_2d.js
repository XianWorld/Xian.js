var Mathf = require("../../math/mathf");
var Color = require("../../math/color");
var Vec2 = require("../../math/vec2");
var Mat32 = require("../../math/mat32");
var Mat4 = require("../../math/mat4");
var Camera = require("./../../components/camera");
var Transform = require("./../../components/transform");
var Renderable2D = require("./renderable_2d");
"use strict";


var clamp = Mathf.clamp,
    EPSILON = Mathf.EPSILON;


function Camera2D(opts) {
    opts || (opts = {});

    Camera.call(this, opts);

    //this.width = 960;
    //this.height = 640;
    //this.invWidth = 1 / this.width;
    //this.invHeight = 1 / this.height;
    //
    //this.autoResize = opts.autoResize !== undefined ? !!opts.autoResize : true;
    //this.background = opts.background !== undefined ? opts.background : new Color(0.5, 0.5, 0.5);
    //
    //this.aspect = this.width / this.height;
    //
    //this.orthographicSize = opts.orthographicSize !== undefined ? opts.orthographicSize : 1;
    //
    //this.minOrthographicSize = opts.minOrthographicSize !== undefined ? opts.minOrthographicSize : EPSILON;
    //this.maxOrthographicSize = opts.maxOrthographicSize !== undefined ? opts.maxOrthographicSize : 1024;

    this.projection = new Mat32;
    //this._projection = new Mat32;
    //this.guiProjection = new Mat4;

    this.view = new Mat32;
    //this._view = new Mat32;

    this._projectionView = new Mat32;

    //this.needsUpdate = true;
    //this._active = true;

    this.renderer = undefined;
    this.transparent = opts.transparent !== undefined ? opts.transparent : false;
    this.clearBeforeRender = opts.clearBeforeRender !== undefined ? opts.clearBeforeRender : true;

    //render target: default(main)/RenderTexture
    this.renderTexture = undefined;

}

Camera.extend(Camera2D);


Camera2D.prototype.copy = function (other) {

    Camera.prototype.copy.call(this, other);
    //this.width = other.width;
    //this.height = other.height;
    //
    //this.invWidth = 1 / this.width;
    //this.invHeight = 1 / this.height;
    //
    //this.autoResize = other.autoResize;
    //this.background.copy(other.background);
    //
    //this.orthographicSize = other.orthographicSize;
    //this.minOrthographicSize = other.minOrthographicSize;
    //this.maxOrthographicSize = other.maxOrthographicSize;
    //
    //this.needsUpdate = true;

    this.transparent = other.transparent;
    this.clearBeforeRender = other.clearBeforeRender;

    return this;
};


//Camera2D.prototype.set = function (width, height) {
//
//    this.width = width;
//    this.height = height;
//
//    this.invWidth = 1 / this.width;
//    this.invHeight = 1 / this.height;
//
//    this.aspect = width / height;
//    this.needsUpdate = true;
//};
//
//
//Camera2D.prototype.setWidth = function (width) {
//
//    this.width = width;
//    this.aspect = width / this.height;
//
//    this.invWidth = 1 / this.width;
//
//    this.needsUpdate = true;
//};
//
//
//Camera2D.prototype.setHeight = function (height) {
//
//    this.height = height;
//    this.aspect = this.width / height;
//
//    this.invHeight = 1 / this.height;
//
//    this.needsUpdate = true;
//};
//
//
//Camera2D.prototype.setOrthographicSize = function (size) {
//
//    this.orthographicSize = clamp(size, this.minOrthographicSize, this.maxOrthographicSize);
//    this.needsUpdate = true;
//};


var MAT32 = new Mat32,
    VEC2 = new Vec2;
Camera2D.prototype.toWorld = function (v, out) {
    out || (out = new Vec2);

    //out.x = 2 * (v.x * this.invWidth) - 1;
    //out.y = -2 * (v.y * this.invHeight) + 1;
    out.x = v.x;
    out.y = v.y;
    //out.transformMat32(MAT32.mmul(this._projection, this._view).inverse());
    out.transformMat32(MAT32.inverseMat(this._projectionView));

    return out;
};


Camera2D.prototype.toScreen = function (v, out) {
    out || (out = new Vec2);

    //VEC2.copy(v).transformMat32(MAT32.mmul(this._projection, this._view));
    VEC2.copy(v).transformMat32(this._projectionView);

    //out.x = ((VEC2.x + 1) * 0.5) * this.width;
    //out.y = ((1 - VEC2.y) * 0.5) * this.height;
    out.x = VEC2.x;
    out.y = VEC2.y;
    return out;
};


Camera2D.prototype.update = function () {
    if (!this._active) return;

    var transform = this.transform,
        changed = false;

    if (this.needsUpdate) {
        var orthographicSize = this.orthographicSize,
            right = orthographicSize,// * this.aspect,
            left = -right,
            top = orthographicSize,
            bottom = -top;

        this.projection.orthographic(left, right, top, bottom, -1, 1);
        //this._projection.fromMat4(this.projection);
        this.needsUpdate = false;

        changed = true;
        //this.guiProjection.orthographic(0, this.width, 0, this.height, -1, 1);
        //this.guiProjection.orthographic(-1, 1, 1, -1, -1, 1);
    }

    if (transform._matrix_changed) {
        this.view.inverseMat(transform.matrixWorld);
        //this._view.fromMat4(this.view);
        changed = true;
    }

    if (changed)
        this._projectionView.mmul(this.projection, this.view);
};

Camera2D.prototype.render = function (target) {

    var j, transform,
        _projectionView = this._projectionView;

    var renderer = this.renderer || MainContext.RendererContext.renderer;

    renderer.startRender(this.renderTexture);
    if (this.clearBeforeRender) renderer.clearScreen(this.transparent, this.background);

    if (!target) {

    }
    else if (target instanceof Array) {
        var transforms = target;
        for (j = 0; j < transforms.length; j++) {
            transform = transforms[j];
            //if(transform.gameObject.activeInHierarchy)
            this._renderTransform(renderer, _projectionView, transform, 1.0);
        }
    }
    else if (target instanceof Transform) {
        transform = target;
        //if(transform.gameObject.activeInHierarchy)
        this._renderTransform(renderer, _projectionView, transform, 1.0);
    }
    else if (target instanceof Renderable2D) {
        var component = target;
        if(component.enabled){
            component.worldAlpha = component.alpha;

            component.startRender(renderer);
            component.finishRender(renderer);
        }
    }

    renderer.finishRender(this.renderTexture);

};

Camera2D.prototype._renderTransform = function (renderer, viewMatrix, transform, alpha) {
    if(!transform.gameObject.activeInHierarchy) return;

    var children = transform.children,
        len = children.length,
        gameObject, components, component,
        i, mask, colorTransform;

    transform.updateMatrices(viewMatrix);

    gameObject = transform.gameObject;
    //TODO local iterate gameObject.components and add a bool to the renderable2d component
    components = gameObject.getComponents("Renderable2D", true);
    if (components && components.length > 0) {
        len = components.length;
        for (i = 0; i < len; i++) {
            component = components[i];
            if(!component.enabled) continue;

            alpha = component.worldAlpha = alpha * component.alpha;

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
            if(!component.enabled) continue;

            component.finishRender(renderer);
        }
    }
};

Camera2D.prototype.toJSON = function (json) {
    json = Camera.prototype.toJSON.call(this, json);

    //json.width = this.width;
    //json.height = this.height;
    //
    //json.autoResize = this.autoResize;
    //json.background = this.background.toJSON(json.background);
    //
    //json.orthographicSize = this.orthographicSize;
    //json.minOrthographicSize = this.minOrthographicSize;
    //json.maxOrthographicSize = this.maxOrthographicSize;
    //
    json.transparent = this.transparent;
    json.clearBeforeRender = this.clearBeforeRender;

    return json;
};


Camera2D.prototype.fromJSON = function (json) {
    Camera.prototype.fromJSON.call(this, json);

    //this.width = json.width;
    //this.height = json.height;
    //
    //this.autoResize = json.autoResize;
    //this.background.fromJSON(json.background);
    //
    //this.orthographicSize = json.orthographicSize;
    //this.minOrthographicSize = json.minOrthographicSize;
    //this.maxOrthographicSize = json.maxOrthographicSize;
    //
    //this.needsUpdate = true;

    this.transparent = json.transparent;
    this.clearBeforeRender = json.clearBeforeRender;

    return this;
};


module.exports = Camera2D;
