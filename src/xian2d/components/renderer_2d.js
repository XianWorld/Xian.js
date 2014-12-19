/**
 * Created by Dianyan on 2014/12/19.
 */
var Enums = require("../../core/enums");
var Component = require("./../../core/component");
var Assets = require("../../assets/assets");
var Rect = require("../../math/rect");
var FilterLib = require("../context/pixi/webgl/filters/FilterLib");

function Renderer2D(opts) {
    opts || (opts = {});

    Component.call(this, opts);

    //this.worldMatrix = undefined;
    this.alpha = opts.alpha !== undefined ? opts.alpha : 1.0;
    this.worldAlpha = 1.0;

    //this.mask = opts.mask !== undefined ? opts.mask : undefined;

    this.filterArea = undefined;
    this._filters = undefined;
    this._filterBlock = undefined;
    if (opts.filters) this.filters = opts.filters;

    this._boundsSelf = new Rect;
    this._boundsAll = new Rect;
}


Component.extend(Renderer2D);

Object.defineProperty(Renderer2D.prototype, 'filters', {

    get: function () {
        return this._filters;
    },

    set: function (value) {

        if (value) {
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
        }

        this._filters = value;
    }
});

Renderer2D.prototype.copy = function (other) {

    return this;
};


Renderer2D.prototype.clear = function () {
    Component.prototype.clear.call(this);

    return this;
};

function _getTransformBounds(transform, bounds, matrix)
{
    var children = transform.children,
        len = children.length,len1,
        gameObject, components, component,
        i,j;

    for (i = 0; i < len; i++) {
        var child = children[i];

        gameObject = child.gameObject;
        if (!gameObject.activeInHierarchy)continue;

        _getTransformBounds(child, bounds);
    }

    //var minX = bounds.xMin;
    //var minY = bounds.yMin;
    //
    //var maxX = bounds.xMax;
    //var maxY = bounds.yMax;

    var childBounds;
    var childMaxX;
    var childMaxY;

    var childVisible = false;

    gameObject = transform.gameObject;
    component = gameObject.getComponent("Renderer2D");
    if (component && component.enabled) {
        //transform.updateMatrices(viewMatrix);

        childVisible = true;

        childBounds = component.getBoundsSelf();

        bounds.updateBounds(childBounds);
        //minX = minX < childBounds.x ? minX : childBounds.x;
        //minY = minY < childBounds.y ? minY : childBounds.y;
        //
        //childMaxX = childBounds.width + childBounds.x;
        //childMaxY = childBounds.height + childBounds.y;
        //
        //maxX = maxX > childMaxX ? maxX : childMaxX;
        //maxY = maxY > childMaxY ? maxY : childMaxY;
    }

    //if (!childVisible)
    //    return;
    //
    //bounds.xMin = minX;
    //bounds.yMin = minY;
    //bounds.xMax = maxX;
    //bounds.yMax = maxY;
    //
    //return bounds;
}

Renderer2D.prototype.getBounds = function (matrix) {

    var bounds = this._boundsAll;
    bounds.infinity();
    _getTransformBounds(this.transform, bounds);

    return bounds;
};

Renderer2D.prototype.getBoundsSelf = function (matrix) {
    var transform = this.transform,
        children = transform.children,
        len = children.length,len1,
        gameObject, components, component,
        i,j;

    //var minX = Infinity;
    //var minY = Infinity;
    //
    //var maxX = -Infinity;
    //var maxY = -Infinity;

    var childBounds;
    //var childMaxX;
    //var childMaxY;
    var bounds = this._boundsSelf;
    bounds.infinity();

    var childVisible = false;

    gameObject = this.gameObject;
    components = gameObject.getComponents("Renderable2D", true);
    if (components && components.length > 0) {

        //transform.updateMatrices(viewMatrix);

        len1 = components.length;
        for (j = 0; j < len1; j++) {
            component = components[j];
            if (!component.enabled) continue;

            childVisible = true;

            childBounds = component.getBounds();

            bounds.updateBounds(childBounds);
            //minX = minX < childBounds.x ? minX : childBounds.x;
            //minY = minY < childBounds.y ? minY : childBounds.y;
            //
            //childMaxX = childBounds.width + childBounds.x;
            //childMaxY = childBounds.height + childBounds.y;
            //
            //maxX = maxX > childMaxX ? maxX : childMaxX;
            //maxY = maxY > childMaxY ? maxY : childMaxY;
        }
    }

    //if (!childVisible)
    //    return Rect.Empty;
    //
    //var bounds = this._boundsSelf;
    //
    //bounds.x = minX;
    //bounds.y = minY;
    //bounds.width = maxX - minX;
    //bounds.height = maxY - minY;

    return bounds;
};

//Renderer2D.prototype.update = function () {
//// multiply the alphas..
//    var transform = this.transform || this.transform2d;
//    //this.worldAlpha = this.alpha * transform.parent.worldAlpha;
//
//};

Renderer2D.prototype.startRender = function (renderer) {
    var transform = this.transform;

    if (this._filters) {
        renderer.pushFilter(this._filterBlock);
    }

    var children = transform.children,
        len = children.length,
        gameObject, components, component,
        i, mask, colorTransform;

    gameObject = transform.gameObject;
    //TODO local iterate gameObject.components and add a bool to the renderable2d component
    components = gameObject.getComponents("Renderable2D", true);
    if (components && components.length > 0) {

        //transform.updateMatrices(viewMatrix);

        len = components.length;
        for (i = 0; i < len; i++) {
            component = components[i];
            if (!component.enabled) continue;

            component.worldAlpha = this.worldAlpha * component.alpha;

            component._render(renderer);
        }
    }
};

Renderer2D.prototype.finishRender = function (renderer) {
    if (this._filters) {
        renderer.popFilter();
    }
};

Renderer2D.prototype.toJSON = function (json) {
    json = Component.prototype.toJSON.call(this, json);

    json.alpha = this.alpha;

    //if(this.mask)
    //    json.mask = this.mask.toJSON(json.mask);

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

    //if(json.mask){
    //    this.mask = new Rect();
    //    this.mask.fromJSON(json.mask);
    //}
    //else
    //    this.mask = undefined;

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
