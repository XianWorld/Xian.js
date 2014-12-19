var Mathf = require("../../math/mathf");
var Color = require("../../math/color");
var Vec2 = require("../../math/vec2");
var Mat32 = require("../../math/mat32");
var Mat4 = require("../../math/mat4");
var Camera = require("./../../components/camera");
var Transform = require("./../../components/transform");
var Renderable2D = require("./renderable_2d");
var MainContext  = require("../../context/main_context");
"use strict";


var clamp = Mathf.clamp,
    EPSILON = Mathf.EPSILON;


function Camera2D(opts) {
    opts || (opts = {});

    Camera.call(this, opts);

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

    this.transparent = other.transparent;
    this.clearBeforeRender = other.clearBeforeRender;

    return this;
};

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
    else if (target instanceof Renderer2D) {
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


    gameObject = transform.gameObject;

    component = gameObject.getComponent("Renderer2D", true);
    if(component && component.enabled){
        transform.updateMatrices(viewMatrix);

        alpha = component.worldAlpha = alpha * component.alpha;
        component.startRender(renderer);
    }

    len = children.length;
    for (i = 0; i < len; i++) {
        this._renderTransform(renderer, viewMatrix, children[i], alpha);
    }

    if(component && component.enabled) {
        component.finishRender(renderer);
    }
    //components = gameObject.getComponents("Renderable2D", true);
    //if (components && components.length > 0) {
    //    len = components.length;
    //    for (i = 0; i < len; i++) {
    //        component = components[i];
    //        if(!component.enabled) continue;
    //
    //        alpha = component.worldAlpha = alpha * component.alpha;
    //
    //        component.startRender(renderer);
    //    }
    //}
    //
    //len = children.length;
    //for (i = 0; i < len; i++) {
    //    this._renderTransform(renderer, viewMatrix, children[i], alpha);
    //}
    //
    //if (components && components.length > 0) {
    //    i = components.length;
    //    while (i--) {
    //        component = components[i];
    //        if(!component.enabled) continue;
    //
    //        component.finishRender(renderer);
    //    }
    //}
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
