/**
 * Created by Dianyan on 2014/12/13.
 */
var CanvasGraphics = require("./canvas_graphics");


function CanvasMaskManager(renderer)
{
    this.renderer = renderer;
};

CanvasMaskManager.prototype.constructor = CanvasMaskManager;

CanvasMaskManager.prototype.pushMask = function(worldTransform, graphicsData, worldAlpha, tint)
{
    var context = this.renderer.canvasContext;

    context.save();

    //var cacheAlpha = maskData.alpha;
    //var transform = maskData.worldTransform;
    //
    //var resolution = renderSession.resolution;
    //
    //context.setTransform(transform.a * resolution,
    //    transform.b * resolution,
    //    transform.c * resolution,
    //    transform.d * resolution,
    //    transform.tx * resolution,
    //    transform.ty * resolution);

    CanvasGraphics.renderGraphicsMask(this.renderer, worldTransform, graphicsData, worldAlpha, tint);

    context.clip();

    //maskData.worldAlpha = cacheAlpha;
};

/**
 * Restores the current drawing context to the state it was before the mask was applied.
 *
 * @method popMask
 * @param renderSession {Object} The renderSession whose context will be used for this mask manager.
 */
CanvasMaskManager.prototype.popMask = function(renderSession)
{
    var context = this.renderer.canvasContext;
    context.restore();
};

module.exports = CanvasMaskManager;