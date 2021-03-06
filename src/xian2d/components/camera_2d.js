var Mathf = require("../../math/mathf");
var Color = require("../../math/color");
var Vec2 = require("../../math/vec2");
var Mat32 = require("../../math/mat32");
var Mat4 = require("../../math/mat4");
var Camera = require("./../../components/camera");
var Transform = require("./../../components/transform");
//var Renderer2D = require("./renderer_2d");
var MainContext = require("../../context/main_context");
var GraphicsContext = MainContext.GraphicsContext;
"use strict";


var clamp = Mathf.clamp,
    EPSILON = Mathf.EPSILON;


function Camera2D() {

    Camera.call(this);

    this.transparent = false;
    this.clearBeforeRender = true;

    this.projection = new Mat32;
    this.view = new Mat32;

    this._projectionView = new Mat32;
    this._pv_changed = false;

    //TODO ???
    this.renderer = undefined;
}

Camera.extend(Camera2D);


Camera2D.prototype.copy = function (other) {
    Camera.prototype.copy.call(this, other);

    this.transparent = other.transparent;
    this.clearBeforeRender = other.clearBeforeRender;

    return this;
};

Camera2D.prototype.destroy = function () {
    Camera.prototype.destroy.call(this);

    this.projection = undefined;
    this.view = undefined;
    this._projectionView = undefined;
};

Camera2D.prototype.toJSON = function (json) {
    json = Camera.prototype.toJSON.call(this, json);

    json.transparent = this.transparent;
    json.clearBeforeRender = this.clearBeforeRender;

    return json;
};


Camera2D.prototype.fromJSON = function (json) {
    Camera.prototype.fromJSON.call(this, json);

    this.transparent = json.transparent !== undefined ? !!json.transparent : false;
    this.clearBeforeRender = json.clearBeforeRender !== undefined ?  !!json.clearBeforeRender : true;

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

    var transform = this.transform;

    this._pv_changed = false;

    if (this.needsUpdate) {
        var orthographicSizeX = this.orthographicSizeX,
            orthographicSizeY = this.orthographicSizeY,
            right = orthographicSizeX,// * this.aspect,
            left = -right,
            top = orthographicSizeY,
            bottom = -top;

        this.projection.orthographic(left, right, top, bottom, -1, 1);
        this.needsUpdate = false;

        this._pv_changed = true;
        //this.guiProjection.orthographic(0, this.width, 0, this.height, -1, 1);
        //this.guiProjection.orthographic(-1, 1, 1, -1, -1, 1);
    }

    if (transform._matrix_changed) {
        this.view.inverseMat(transform.matrixWorld);
        //this._view.fromMat4(this.view);
        this._pv_changed = true;
    }

    if (this._pv_changed)
        this._projectionView.mmul(this.projection, this.view);
};

Camera2D.prototype.render = function (target) {

    var j, transform, _pv_changed = this._pv_changed,
        _projectionView = this._projectionView;

    var renderer = this.renderer || GraphicsContext.renderContext2D;
    var renderTexture = this.renderTexture;
    renderer.startRender(renderTexture, this.viewportRect);
    if (this.clearBeforeRender) renderer.clearScreen(this.transparent, this.background);

    if (target instanceof Array) {
        var transforms = target;
        var len = transforms.length;
        for (j = 0; j < len; j++) {
            transform = transforms[j];
            _updateTransform(transform, _projectionView, _pv_changed);
            //if(transform.gameObject.activeInHierarchy)
            this._renderTransform(renderer, _projectionView, transform, 1.0);
        }
    }
    else if (target instanceof Transform) {
        transform = target;
        //if(transform.gameObject.activeInHierarchy)
        _updateTransform(transform, _projectionView, _pv_changed);
        this._renderTransform(renderer, _projectionView, transform, 1.0);
    }
    //else if (target instanceof Renderer2D) {
    //    var component = target;
    //    if(component.enabled){
    //        component.worldAlpha = component.alpha;
    //
    //        component.startRender(renderer);
    //        component.finishRender(renderer);
    //    }
    //}

    renderer.finishRender(renderTexture);

};

Camera2D.prototype.updateMVP = function (target) {
    var j, transform,
        _projectionView = this._projectionView;

    if (!target) {
    }
    else if (target instanceof Array) {
        var transforms = target;
        for (j = 0; j < transforms.length; j++) {
            transform = transforms[j];
            _updateTransform(transform, _projectionView);
        }
    }
    else if (target instanceof Transform) {
        transform = target;
        _updateTransform(transform, _projectionView);
    }
};

function _updateTransform(transform, _projectionView, changed) {
    if (!transform.gameObject.activeInHierarchy) return;

    var children = transform.children,
        len = children.length, i;

    transform.updateMatrices(_projectionView, changed);

    for (i = 0; i < len; i++) {
        _updateTransform(children[i], _projectionView, changed);
    }
}

Camera2D.prototype._renderTransform = function (renderer, viewMatrix, transform, alpha) {
    var gameObject = transform.gameObject;
    if (!gameObject.activeInHierarchy) return;

    var children = transform.children,
        len, component, i;

    //component = gameObject.getComponent("Renderer2D", true);
    component = gameObject.renderer2d;//getComponent("Renderer2D", true);
    var enable = component && component.enabled;
    if (enable) {
        //transform.updateMatrices(viewMatrix);

        alpha = component.worldAlpha = alpha * component.alpha;
        component.startRender(renderer);
    }

    len = children.length;
    for (i = 0; i < len; i++) {
        this._renderTransform(renderer, viewMatrix, children[i], alpha);
    }

    if (enable) {
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



module.exports = Camera2D;
