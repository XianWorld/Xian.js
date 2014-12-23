/**
 * Created by Dianyan on 2014/12/19.
 */
var Enums = require("../../core/enums");
var Component = require("./../../core/component");
var Assets = require("../../assets/assets");
var Rect = require("../../math/rect");
var FilterLib = require("../context/pixi/webgl/filters/FilterLib");
var Sprite2D = require("./sprite_2d");
var Camera2D = require("./camera_2d");
var RenderTexture = require("../../assets/render_texture");
var Sprite2dData = require("../context/sprite_2d_data");

function Renderer2D(opts) {
    opts || (opts = {});

    Component.call(this, opts);

    //this.worldMatrix = undefined;
    this.alpha = opts.alpha !== undefined ? opts.alpha : 1.0;
    this.worldAlpha = 1.0;

    this._mask = opts.mask !== undefined ? opts.mask : undefined;

    this.filterArea = undefined;
    this._filters = undefined;
    this._filterBlock = undefined;
    if (opts.filters) this.filters = opts.filters;

    this._boundsSelf = new Rect;
    this._boundsAll = new Rect;

    this._cachedSprite = undefined;
    this._cacheAsBitmap = false;
}

Component.extend(Renderer2D);

Object.defineProperty(Renderer2D.prototype, 'mask', {
    get: function () {
        return this._mask;
    },
    set: function (value) {

        if (this._mask)this._mask.isMask = false;
        this._mask = value;
        if (this._mask)this._mask.isMask = true;
    }
});
Object.defineProperty(Renderer2D.prototype, 'filters', {
    get: function () {
        return this._filters;
    },
    set: function (value) {
        if (value && value.length > 0) {
            // now put all the passes in one place..
            var passes = [];
            for (var i = 0; i < value.length; i++) {
                var filterPasses = value[i].passes;
                for (var j = 0; j < filterPasses.length; j++) {
                    passes.push(filterPasses[j]);
                }
            }
            // TODO change this as it is legacy
            this._filterBlock = {target: this, filterPasses: passes};
            this._filters = value;
        }
        else {
            this._filterBlock = this._filters = undefined;
        }
    }
});
Object.defineProperty(Renderer2D.prototype, "cacheAsBitmap", {
    get: function () {
        return this._cacheAsBitmap;
    },
    set: function (value) {
        if (this._cacheAsBitmap === value) return;

        if (value) {
            this._generateCachedSprite();
        }
        else {
            this._destroyCachedSprite();
        }

        this._cacheAsBitmap = value;
    }
});

Renderer2D.prototype.copy = function (other) {
    this.alpha = other.alpha;
    this.mask = other._mask;
    this.filterArea = other.filterArea;
    this.filters = other._filters;

    return this;
};

Renderer2D.prototype.clear = function () {
    Component.prototype.clear.call(this);
    this.alpha = 1;
    this.mask = undefined;
    this.filterArea = undefined;
    this.filters = undefined;

    return this;
};

function _getTransformBounds(transform, bounds, matrix) {
    var children = transform.children,
        len = children.length,
        gameObject, component,
        i;

    for (i = 0; i < len; i++) {
        var child = children[i];

        gameObject = child.gameObject;
        if (!gameObject.activeInHierarchy)continue;
        _getTransformBounds(child, bounds, matrix);
    }

    var childBounds;

    //transform.updateMatrices(matrix);
    gameObject = transform.gameObject;
    component = gameObject.getComponent("Renderer2D");
    if (component && component.enabled) {
        childBounds = component.getBoundsSelf();

        bounds.updateBounds(childBounds);
    }
}

Renderer2D.prototype.getBounds = function (matrix) {

    var bounds = this._boundsAll;
    bounds.infinity();
    _getTransformBounds(this.transform, bounds, matrix);

    return bounds;
};

Renderer2D.prototype.getBoundsSelf = function (matrix) {
    var len1, gameObject, components, component, j;

    var childBounds;
    var bounds = this._boundsSelf;
    bounds.infinity();

    gameObject = this.gameObject;
    components = gameObject.getComponents("Renderable2D", true);
    if (components && components.length > 0) {
        len1 = components.length;
        for (j = 0; j < len1; j++) {
            component = components[j];
            if (!component.enabled) continue;

            childBounds = component.getBounds();
            bounds.updateBounds(childBounds);
        }
    }
    return bounds;
};

//Renderer2D.prototype._render = function (renderer) {
//    if(this._cacheAsBitmap){
//        if(!this._cachedSprite){
//            this._generateCachedSprite();
//        }
//        this._cachedSprite.worldMatrix = this.worldMatrix;
//        this._cachedSprite.worldAlpha = this.worldAlpha;
//        renderer.renderSprite2D(this._cachedSprite);
//    }
//    else{
//        if(this._cachedSprite){
//            this._destroyCachedSprite();
//        }
//        renderer.renderGraphics(this);
//
//    }
//};
Renderer2D.prototype.startRender = function (renderer) {

    if (this._cacheAsBitmap) {
        //if (!this._cachedSprite) {
        //    this._generateCachedSprite();
        //}
        this._cachedSprite.worldMatrix = this.transform.modelView;
        //this._cachedSprite.worldAlpha = this.worldAlpha;
        renderer.renderSprite2D(this._cachedSprite);
        return;
    }

    var transform = this.transform;
    if (this._filters) {
        renderer.pushFilter(this._filterBlock);
    }
    if (this._mask) {
        this._mask.update();
        renderer.pushMask(this._mask);
    }

    var children = transform.children,
        len = children.length,
        gameObject, components, component, i;

    gameObject = transform.gameObject;
    //TODO local iterate gameObject.components and add a bool to the renderable2d component
    components = gameObject.getComponents("Renderable2D", true);
    if (components && components.length > 0) {

        len = components.length;
        for (i = 0; i < len; i++) {
            component = components[i];
            if (!component.enabled) continue;

            component.worldAlpha = this.worldAlpha * component.alpha;
            component.update();
            component._render(renderer);
        }
    }
};

Renderer2D.prototype.finishRender = function (renderer) {
    if (this._cacheAsBitmap) {
        return;
    }

    if (this._mask) {
        renderer.popMask(this._mask);
    }
    if (this._filters) {
        renderer.popFilter();
    }
};

Renderer2D.prototype._generateCachedSprite = function () {

    var gameObject = this.gameObject;
    var camera2d = gameObject.addComponent(new Camera2D({name: "camera_temp", transparent: true}));
    var children = gameObject.transform.children;
    camera2d.update();
    camera2d.updateMVP(gameObject.transform);
    var bounds = this.getBounds();
    var renderTexture = new RenderTexture({width: bounds.width, height: bounds.height});
    camera2d.renderTexture = renderTexture;
    this._cacheAsBitmap = false;
    camera2d.render(gameObject.transform);
    this._cacheAsBitmap = true;
    //camera2d.enabled = false;
    gameObject.removeComponent(camera2d);

    //this._cachedSprite = gameObject.addComponent(new Sprite2D({name: "sprite2d_temp"}));
    //this._cachedSprite.texture = camera2d.renderTexture;
    var i = children.length;
    while (i--)
        children[i].gameObject.setActive(false);

    this._cachedSprite = new Sprite2dData();//gameObject.addComponent(new Sprite2D({name: "sprite2d_temp"}));
    this._cachedSprite.destTexture = camera2d.renderTexture;
    this._cachedSprite.sourceWidth = bounds.width;
    this._cachedSprite.sourceHeight = bounds.height;
    this._cachedSprite.destX = -bounds.x;
    this._cachedSprite.destX = -bounds.y;
    this._cachedSprite.destWidth = bounds.width;
    this._cachedSprite.destHeight = bounds.height;

    // now render the graphic..
    this._cachedSprite.worldAlpha = 1;
};
Renderer2D.prototype._destroyCachedSprite = function () {
    var gameObject = this.gameObject;
    gameObject.removeComponent(this._cachedSprite);
    this._cachedSprite.destroy();

    // let the gc collect the unused sprite
    // TODO could be object pooled!
    this._cachedSprite = undefined;

    var children = gameObject.transform.children;
    var i = children.length;
    while (i--)
        children[i].gameObject.setActive(true);
};

Renderer2D.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.alpha = this.alpha;

    if (this._mask)
        json.mask = this._mask._id;

    if (this._filters) {
        json.filters = [];

        var len = this._filters.length;
        var i;
        for (i = 0; i < len; i++) {
            //TODO the filter would be null or undefined
            json.filters.push(this._filters[i].toJSON());
        }
    }

    return json;
};


Renderer2D.prototype.fromJSON = function (json) {
    Component.prototype.fromJSON.call(this, json);

    this.alpha = json.alpha;

    //TODO how to confirm the unique id for the component
    if (json.mask) {
        var scene;
        if (this.gameObject && (scene = this.gameObject.scene)) {
            this.mask = scene.findComponentByJSONId(json.mask);
        } else {
            this.once("init", function () {
                scene = this.gameObject.scene;
                this.mask = scene.findComponentByJSONId(json.mask);
            });
        }
    }
    else {
        this.mask = undefined;
    }

    if (json.filters) {
        var filters = [];

        var len = json.filters.length;
        var i;
        for (i = 0; i < len; i++) {
            //TODO the filter would be null or undefined
            filters.push(FilterLib.fromJSON(json.filters[i]));
        }
        this.filters = filters;
    }
    return this;
};


module.exports = Renderer2D;
