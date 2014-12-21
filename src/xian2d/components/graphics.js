/**
 * Created by Dianyan on 2014/12/13.
 */
var Renderable2D = require("./renderable_2d");
var Enums2D = require("../common/enums_2d");
var Rect = require("../../math/rect");
var Vec2 = require("../../math/vec2");

function Graphics(opts) {
    opts || (opts = {});

    Renderable2D.call(this, opts);

    //this.renderable = true;

    this.fillAlpha = 1;

    this.lineWidth = 0;

    this.lineColor = 0;

    this.graphicsData = [];

    this.tint = 0xFFFFFF;

    this.currentPath = null;

    this._webGL = [];

    this.isMask = false;

    this.boundsPadding = 0;

    //this._localBounds = new Rect(0,0,1,1);

    //use for WebGLGraphics to update gl data, will be set to false in WebGLGraphics renders
    this.dirty = true;

    //this.webGLDirty = false;

    this.cachedSpriteDirty = false;

};

Renderable2D.extend(Graphics);
///**
// * When cacheAsBitmap is set to true the graphics object will be rendered as if it was a sprite.
// * This is useful if your graphics element does not change often, as it will speed up the rendering of the object in exchange for taking up texture memory.
// * It is also useful if you need the graphics object to be anti-aliased, because it will be rendered using canvas.
// * This is not recommended if you are constantly redrawing the graphics element.
// *
// * @property cacheAsBitmap
// * @type Boolean
// * @default false
// * @private
// */
//Object.defineProperty(Graphics.prototype, "cacheAsBitmap", {
//    get: function() {
//        return  this._cacheAsBitmap;
//    },
//    set: function(value) {
//        this._cacheAsBitmap = value;
//
//        if(this._cacheAsBitmap)
//        {
//
//            this._generateCachedSprite();
//        }
//        else
//        {
//            this.destroyCachedSprite();
//            this._dirtyRender = true;
//        }
//
//    }
//});

/**
 * Specifies the line style used for subsequent calls to Graphics methods such as the lineTo() method or the drawCircleShape() method.
 *
 * @method lineStyle
 * @param lineWidth {Number} width of the line to draw, will update the objects stored style
 * @param color {Number} color of the line to draw, will update the objects stored style
 * @param alpha {Number} alpha of the line to draw, will update the objects stored style
 * @return {Graphics}
 */
Graphics.prototype.lineStyle = function (lineWidth, color, alpha) {
    this.lineWidth = lineWidth || 0;
    this.lineColor = color || 0;
    this.lineAlpha = (arguments.length < 3) ? 1 : alpha;

    if (this.currentPath) {
        if (this.currentPath.shape.points.length) {
            // halfway through a line? start a new one!
            this.drawShape(new PolygonShape(this.currentPath.shape.points.slice(-2)));
            return this;
        }

        // otherwise its empty so lets just set the line properties
        this.currentPath.lineWidth = this.lineWidth;
        this.currentPath.lineColor = this.lineColor;
        this.currentPath.lineAlpha = this.lineAlpha;

    }

    return this;
};

/**
 * Moves the current drawing position to x, y.
 *
 * @method moveTo
 * @param x {Number} the X coordinate to move to
 * @param y {Number} the Y coordinate to move to
 * @return {Graphics}
 */
Graphics.prototype.moveTo = function (x, y) {
    this.drawShape(new PolygonShape([x, y]));

    return this;
};

/**
 * Draws a line using the current line style from the current drawing position to (x, y);
 * The current drawing position is then set to (x, y).
 *
 * @method lineTo
 * @param x {Number} the X coordinate to draw to
 * @param y {Number} the Y coordinate to draw to
 * @return {Graphics}
 */
Graphics.prototype.lineTo = function (x, y) {
    this.currentPath.shape.points.push(x, y);
    this._dirtyRender = true;

    return this;
};

/**
 * Calculate the points for a quadratic bezier curve and then draws it.
 * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
 *
 * @method quadraticCurveTo
 * @param cpX {Number} Control point x
 * @param cpY {Number} Control point y
 * @param toX {Number} Destination point x
 * @param toY {Number} Destination point y
 * @return {Graphics}
 */
Graphics.prototype.quadraticCurveTo = function (cpX, cpY, toX, toY) {
    if (this.currentPath) {
        if (this.currentPath.shape.points.length === 0)this.currentPath.shape.points = [0, 0];
    }
    else {
        this.moveTo(0, 0);
    }

    var xa,
        ya,
        n = 20,
        points = this.currentPath.shape.points;
    if (points.length === 0)this.moveTo(0, 0);


    var fromX = points[points.length - 2];
    var fromY = points[points.length - 1];

    var j = 0;
    for (var i = 1; i <= n; i++) {
        j = i / n;

        xa = fromX + ( (cpX - fromX) * j );
        ya = fromY + ( (cpY - fromY) * j );

        points.push(xa + ( ((cpX + ( (toX - cpX) * j )) - xa) * j ),
            ya + ( ((cpY + ( (toY - cpY) * j )) - ya) * j ));
    }


    this._dirtyRender = true;

    return this;
};

/**
 * Calculate the points for a bezier curve and then draws it.
 *
 * @method bezierCurveTo
 * @param cpX {Number} Control point x
 * @param cpY {Number} Control point y
 * @param cpX2 {Number} Second Control point x
 * @param cpY2 {Number} Second Control point y
 * @param toX {Number} Destination point x
 * @param toY {Number} Destination point y
 * @return {Graphics}
 */
Graphics.prototype.bezierCurveTo = function (cpX, cpY, cpX2, cpY2, toX, toY) {
    if (this.currentPath) {
        if (this.currentPath.shape.points.length === 0)this.currentPath.shape.points = [0, 0];
    }
    else {
        this.moveTo(0, 0);
    }

    var n = 20,
        dt,
        dt2,
        dt3,
        t2,
        t3,
        points = this.currentPath.shape.points;

    var fromX = points[points.length - 2];
    var fromY = points[points.length - 1];

    var j = 0;

    for (var i = 1; i <= n; i++) {
        j = i / n;

        dt = (1 - j);
        dt2 = dt * dt;
        dt3 = dt2 * dt;

        t2 = j * j;
        t3 = t2 * j;

        points.push(dt3 * fromX + 3 * dt2 * j * cpX + 3 * dt * t2 * cpX2 + t3 * toX,
            dt3 * fromY + 3 * dt2 * j * cpY + 3 * dt * t2 * cpY2 + t3 * toY);
    }

    this._dirtyRender = true;

    return this;
};

/*
 * The arcTo() method creates an arc/curve between two tangents on the canvas.
 *
 * "borrowed" from https://code.google.com/p/fxcanvas/ - thanks google!
 *
 * @method arcTo
 * @param x1 {Number} The x-coordinate of the beginning of the arc
 * @param y1 {Number} The y-coordinate of the beginning of the arc
 * @param x2 {Number} The x-coordinate of the end of the arc
 * @param y2 {Number} The y-coordinate of the end of the arc
 * @param radius {Number} The radius of the arc
 * @return {Graphics}
 */
Graphics.prototype.arcTo = function (x1, y1, x2, y2, radius) {
    if (this.currentPath) {
        if (this.currentPath.shape.points.length === 0) {
            this.currentPath.shape.points.push(x1, y1);
        }
    }
    else {
        this.moveTo(x1, y1);
    }

    var points = this.currentPath.shape.points;
    var fromX = points[points.length - 2];
    var fromY = points[points.length - 1];
    var a1 = fromY - y1;
    var b1 = fromX - x1;
    var a2 = y2 - y1;
    var b2 = x2 - x1;
    var mm = Math.abs(a1 * b2 - b1 * a2);


    if (mm < 1.0e-8 || radius === 0) {
        if (points[points.length - 2] !== x1 || points[points.length - 1] !== y1) {
            //console.log(">>")
            points.push(x1, y1);
        }
    }
    else {
        var dd = a1 * a1 + b1 * b1;
        var cc = a2 * a2 + b2 * b2;
        var tt = a1 * a2 + b1 * b2;
        var k1 = radius * Math.sqrt(dd) / mm;
        var k2 = radius * Math.sqrt(cc) / mm;
        var j1 = k1 * tt / dd;
        var j2 = k2 * tt / cc;
        var cx = k1 * b2 + k2 * b1;
        var cy = k1 * a2 + k2 * a1;
        var px = b1 * (k2 + j1);
        var py = a1 * (k2 + j1);
        var qx = b2 * (k1 + j2);
        var qy = a2 * (k1 + j2);
        var startAngle = Math.atan2(py - cy, px - cx);
        var endAngle = Math.atan2(qy - cy, qx - cx);

        this.arc(cx + x1, cy + y1, radius, startAngle, endAngle, b1 * a2 > b2 * a1);
    }

    this._dirtyRender = true;

    return this;
};

/**
 * The arc method creates an arc/curve (used to create CircleShapes, or parts of CircleShapes).
 *
 * @method arc
 * @param cx {Number} The x-coordinate of the center of the CircleShape
 * @param cy {Number} The y-coordinate of the center of the CircleShape
 * @param radius {Number} The radius of the CircleShape
 * @param startAngle {Number} The starting angle, in radians (0 is at the 3 o'clock position of the arc's CircleShape)
 * @param endAngle {Number} The ending angle, in radians
 * @param anticlockwise {Boolean} Optional. Specifies whether the drawing should be counterclockwise or clockwise. False is default, and indicates clockwise, while true indicates counter-clockwise.
 * @return {Graphics}
 */
Graphics.prototype.arc = function (cx, cy, radius, startAngle, endAngle, anticlockwise) {
    var startX = cx + Math.cos(startAngle) * radius;
    var startY = cy + Math.sin(startAngle) * radius;

    var points = this.currentPath.shape.points;

    if (points.length === 0) {
        this.moveTo(startX, startY);
        points = this.currentPath.shape.points;
    }
    else if (points[points.length - 2] !== startX || points[points.length - 1] !== startY) {
        points.push(startX, startY);
    }

    if (startAngle === endAngle)return this;

    if (!anticlockwise && endAngle <= startAngle) {
        endAngle += Math.PI * 2;
    }
    else if (anticlockwise && startAngle <= endAngle) {
        startAngle += Math.PI * 2;
    }

    var sweep = anticlockwise ? (startAngle - endAngle) * -1 : (endAngle - startAngle);
    var segs = ( Math.abs(sweep) / (Math.PI * 2) ) * 40;

    if (sweep === 0) return this;

    var theta = sweep / (segs * 2);
    var theta2 = theta * 2;

    var cTheta = Math.cos(theta);
    var sTheta = Math.sin(theta);

    var segMinus = segs - 1;

    var remainder = ( segMinus % 1 ) / segMinus;

    for (var i = 0; i <= segMinus; i++) {
        var real = i + remainder * i;


        var angle = ((theta) + startAngle + (theta2 * real));

        var c = Math.cos(angle);
        var s = -Math.sin(angle);

        points.push(( (cTheta * c) + (sTheta * s) ) * radius + cx,
            ( (cTheta * -s) + (sTheta * c) ) * radius + cy);
    }

    this._dirtyRender = true;

    return this;
};

/**
 * Specifies a simple one-color fill that subsequent calls to other Graphics methods
 * (such as lineTo() or drawCircleShape()) use when drawing.
 *
 * @method beginFill
 * @param color {Number} the color of the fill
 * @param alpha {Number} the alpha of the fill
 * @return {Graphics}
 */
Graphics.prototype.beginFill = function (color, alpha) {
    this.filling = true;
    this.fillColor = color || 0;
    this.fillAlpha = (alpha === undefined) ? 1 : alpha;

    if (this.currentPath) {
        if (this.currentPath.shape.points.length <= 2) {
            this.currentPath.fill = this.filling;
            this.currentPath.fillColor = this.fillColor;
            this.currentPath.fillAlpha = this.fillAlpha;
        }
    }
    return this;
};

/**
 * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
 *
 * @method endFill
 * @return {Graphics}
 */
Graphics.prototype.endFill = function () {
    this.filling = false;
    this.fillColor = null;
    this.fillAlpha = 1;

    return this;
};

Graphics.prototype.drawRect = function (x, y, width, height) {
    this.drawShape(new RectangleShape(x, y, width, height));

    return this;
};

Graphics.prototype.drawRoundedRect = function (x, y, width, height, radius) {
    this.drawShape(new RoundedRectangleShape(x, y, width, height, radius));

    return this;
};

/**
 * Draws a CircleShape.
 *
 * @method drawCircleShape
 * @param x {Number} The X coordinate of the center of the CircleShape
 * @param y {Number} The Y coordinate of the center of the CircleShape
 * @param radius {Number} The radius of the CircleShape
 * @return {Graphics}
 */
Graphics.prototype.drawCircle = function (x, y, radius) {
    this.drawShape(new CircleShape(x, y, radius));

    return this;
};

Graphics.prototype.drawEllipse = function (x, y, width, height) {
    this.drawShape(new EllipseShape(x, y, width, height));

    return this;
};

Graphics.prototype.drawPolygon = function (path) {
    if (!(path instanceof Array))path = Array.prototype.slice.call(arguments);
    this.drawShape(new PolygonShape(path));
    return this;
};

/**
 * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
 *
 * @method clear
 * @return {Graphics}
 */
Graphics.prototype.clear = function () {
    this.lineWidth = 0;
    this.filling = false;

    this._dirtyRender = true;
    this.clearDirty = true;
    this.graphicsData = [];

    return this;
};

///**
// * Useful function that returns a texture of the graphics object that can then be used to create sprites
// * This can be quite useful if your geometry is complicated and needs to be reused multiple times.
// *
// * @method generateTexture
// * @param resolution {Number} The resolution of the texture being generated
// * @param scaleMode {Number} Should be one of the PIXI.scaleMode consts
// * @return {Texture} a texture of the graphics object
// */
//Graphics.prototype.generateTexture = function(resolution, scaleMode)
//{
//    resolution = resolution || 1;
//
//    var bounds = this.getBounds();
//
//    var canvasBuffer = new PIXI.CanvasBuffer(bounds.width * resolution, bounds.height * resolution);
//
//    var texture = PIXI.Texture.fromCanvas(canvasBuffer.canvas, scaleMode);
//    texture.baseTexture.resolution = resolution;
//
//    canvasBuffer.context.scale(resolution, resolution);
//
//    canvasBuffer.context.translate(-bounds.x,-bounds.y);
//
//    PIXI.CanvasGraphics.renderGraphics(this, canvasBuffer.context);
//
//    return texture;
//};
//
///**
// * Renders the object using the WebGL renderer
// *
// * @method _renderWebGL
// * @param renderSession {RenderSession}
// * @private
// */
//Graphics.prototype._renderWebGL = function(renderSession)
//{
//    // if the sprite is not visible or the alpha is 0 then no need to render this element
//    if(this.visible === false || this.alpha === 0 || this.isMask === true)return;
//
//    if(this._cacheAsBitmap)
//    {
//
//        if(this._dirtyRender || this.cachedSpriteDirty)
//        {
//
//            this._generateCachedSprite();
//
//            // we will also need to update the texture on the gpu too!
//            this.updateCachedSpriteTexture();
//
//            this.cachedSpriteDirty = false;
//            this._dirtyRender = false;
//        }
//
//        this._cachedSprite.worldAlpha = this.worldAlpha;
//        PIXI.Sprite.prototype._renderWebGL.call(this._cachedSprite, renderSession);
//
//        return;
//    }
//    else
//    {
//        renderSession.spriteBatch.stop();
//        renderSession.blendModeManager.setBlendMode(this.blendMode);
//
//        if(this._mask)renderSession.maskManager.pushMask(this._mask, renderSession);
//        if(this._filters)renderSession.filterManager.pushFilter(this._filterBlock);
//
//        // check blend mode
//        if(this.blendMode !== renderSession.spriteBatch.currentBlendMode)
//        {
//            renderSession.spriteBatch.currentBlendMode = this.blendMode;
//            var blendModeWebGL = PIXI.blendModesWebGL[renderSession.spriteBatch.currentBlendMode];
//            renderSession.spriteBatch.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
//        }
//
//        // check if the webgl graphic needs to be updated
//        if(this.webGLDirty)
//        {
//            this._dirtyRender = true;
//            this.webGLDirty = false;
//        }
//
//        PIXI.WebGLGraphics.renderGraphics(this, renderSession);
//
//        // only render if it has children!
//        if(this.children.length)
//        {
//            renderSession.spriteBatch.start();
//
//            // simple render children!
//            for(var i=0, j=this.children.length; i<j; i++)
//            {
//                this.children[i]._renderWebGL(renderSession);
//            }
//
//            renderSession.spriteBatch.stop();
//        }
//
//        if(this._filters)renderSession.filterManager.popFilter();
//        if(this._mask)renderSession.maskManager.popMask(this.mask, renderSession);
//
//        renderSession.drawCount++;
//
//        renderSession.spriteBatch.start();
//    }
//};
//
///**
// * Renders the object using the Canvas renderer
// *
// * @method _renderCanvas
// * @param renderSession {RenderSession}
// * @private
// */
//Graphics.prototype._renderCanvas = function(renderSession)
//{
//    // if the sprite is not visible or the alpha is 0 then no need to render this element
//    if(this.visible === false || this.alpha === 0 || this.isMask === true)return;
//
//    if(this._cacheAsBitmap)
//    {
//        if(this._dirtyRender || this.cachedSpriteDirty)
//        {
//            this._generateCachedSprite();
//
//            // we will also need to update the texture
//            this.updateCachedSpriteTexture();
//
//            this.cachedSpriteDirty = false;
//            this._dirtyRender = false;
//        }
//
//        this._cachedSprite.alpha = this.alpha;
//        PIXI.Sprite.prototype._renderCanvas.call(this._cachedSprite, renderSession);
//
//        return;
//    }
//    else
//    {
//        var context = renderSession.context;
//        var transform = this.worldTransform;
//
//        if(this.blendMode !== renderSession.currentBlendMode)
//        {
//            renderSession.currentBlendMode = this.blendMode;
//            context.globalCompositeOperation = PIXI.blendModesCanvas[renderSession.currentBlendMode];
//        }
//
//        if(this._mask)
//        {
//            renderSession.maskManager.pushMask(this._mask, renderSession);
//        }
//
//        var resolution = renderSession.resolution;
//        context.setTransform(transform.a * resolution,
//            transform.b * resolution,
//            transform.c * resolution,
//            transform.d * resolution,
//            transform.tx * resolution,
//            transform.ty * resolution);
//
//        PIXI.CanvasGraphics.renderGraphics(this, context);
//
//        // simple render children!
//        for(var i=0, j=this.children.length; i<j; i++)
//        {
//            this.children[i]._renderCanvas(renderSession);
//        }
//
//        if(this._mask)
//        {
//            renderSession.maskManager.popMask(renderSession);
//        }
//    }
//};

//Graphics.prototype.startRender = function (renderer) {
//    if (!this.visible) {
//        return;
//    }
//    var transform = this.transform;
//    this.worldMatrix = transform.modelView;
//    if (this.isMask) {
//        renderer.pushMask(this);
//        //renderer.renderGraphicsMask(transform.modelView, this.graphicsData, this.worldAlpha, this.tint);
//    }
//    //else{
//    //    renderer.setAlpha(this.worldAlpha, this.blendMode);
//    //    renderer.renderGraphics(transform.modelView, this.graphicsData, this.worldAlpha, this.tint);
//    //}
//    //renderer.setTransform(transform.modelView);
//
//    this._render(renderer);
//};

Graphics.prototype._render = function (renderer) {
    //this.worldMatrix = this.transform.modelView;
    if (!this.isMask) {
        if(this._dirtyRender){
            this._updateLocalBounds();
            this.dirty = true;
            this._dirtyRender = false;
        }
        //var transform = this.transform;
        //renderer._setAlpha(this.worldAlpha, this.blendMode);
        //renderer.renderGraphics(transform.modelView, this.graphicsData, this.worldAlpha, this.tint);
        renderer.renderGraphics(this);
    }
};

//Graphics.prototype.finishRender = function (renderer) {
//    if (this.isMask) {
//        var transform = this.transform;
//        renderer.popMask(this);
//    }
//};


//Graphics.prototype.getBounds = function (matrix) {
//    // return an empty object if the item is a mask!
//    if(this.isMask)return Rect.Empty;
//
//    this._updateLocalBounds();
//    //if(this._dirtyRender)
//    //{
//    //    this._updateLocalBounds();
//    //    this.webGLDirty = true;
//    //    this.cachedSpriteDirty = true;
//    //    this._dirtyRender = false;
//    //}
//
//    var bounds = this._localBounds;
//
//    var w0 = bounds.x;
//    var w1 = bounds.width + bounds.x;
//
//    var h0 = bounds.y;
//    var h1 = bounds.height + bounds.y;
//
//    return this._getBounds(w1, h1, w0, h0, matrix);
//};
//
Graphics.prototype._updateLocalBounds = function()
{
    var minX = Infinity;
    var maxX = -Infinity;

    var minY = Infinity;
    var maxY = -Infinity;

    if(this.graphicsData.length)
    {
        var shape, points, x, y, w, h;

        for (var i = 0; i < this.graphicsData.length; i++) {
            var data = this.graphicsData[i];
            var type = data.type;
            var lineWidth = data.lineWidth;
            shape = data.shape;


            if(type === Enums2D.ShapeTypes.RECT || type === Enums2D.ShapeTypes.RREC)
            {
                x = shape.x - lineWidth/2;
                y = shape.y - lineWidth/2;
                w = shape.width + lineWidth;
                h = shape.height + lineWidth;

                minX = x < minX ? x : minX;
                maxX = x + w > maxX ? x + w : maxX;

                minY = y < minY ? y : minY;
                maxY = y + h > maxY ? y + h : maxY;
            }
            else if(type === Enums2D.ShapeTypes.CIRC)
            {
                x = shape.x;
                y = shape.y;
                w = shape.radius + lineWidth/2;
                h = shape.radius + lineWidth/2;

                minX = x - w < minX ? x - w : minX;
                maxX = x + w > maxX ? x + w : maxX;

                minY = y - h < minY ? y - h : minY;
                maxY = y + h > maxY ? y + h : maxY;
            }
            else if(type === Enums2D.ShapeTypes.ELIP)
            {
                x = shape.x;
                y = shape.y;
                w = shape.width + lineWidth/2;
                h = shape.height + lineWidth/2;

                minX = x - w < minX ? x - w : minX;
                maxX = x + w > maxX ? x + w : maxX;

                minY = y - h < minY ? y - h : minY;
                maxY = y + h > maxY ? y + h : maxY;
            }
            else
            {
                // POLY
                points = shape.points;

                for (var j = 0; j < points.length; j+=2)
                {

                    x = points[j];
                    y = points[j+1];
                    minX = x-lineWidth < minX ? x-lineWidth : minX;
                    maxX = x+lineWidth > maxX ? x+lineWidth : maxX;

                    minY = y-lineWidth < minY ? y-lineWidth : minY;
                    maxY = y+lineWidth > maxY ? y+lineWidth : maxY;
                }
            }
        }
    }
    else
    {
        minX = 0;
        maxX = 0;
        minY = 0;
        maxY = 0;
    }

    var padding = this.boundsPadding;

    this._localBounds.x = minX - padding;
    this._localBounds.width = (maxX - minX) + padding * 2;

    this._localBounds.y = minY - padding;
    this._localBounds.height = (maxY - minY) + padding * 2;
};

///**
// * Generates the cached sprite when the sprite has cacheAsBitmap = true
// *
// * @method _generateCachedSprite
// * @private
// */
//Graphics.prototype._generateCachedSprite = function()
//{
//    var bounds = this.getLocalBounds();
//
//    if(!this._cachedSprite)
//    {
//        var canvasBuffer = new PIXI.CanvasBuffer(bounds.width, bounds.height);
//        var texture = PIXI.Texture.fromCanvas(canvasBuffer.canvas);
//
//        this._cachedSprite = new PIXI.Sprite(texture);
//        this._cachedSprite.buffer = canvasBuffer;
//
//        this._cachedSprite.worldTransform = this.worldTransform;
//    }
//    else
//    {
//        this._cachedSprite.buffer.resize(bounds.width, bounds.height);
//    }
//
//    // leverage the anchor to account for the offset of the element
//    this._cachedSprite.anchor.x = -( bounds.x / bounds.width );
//    this._cachedSprite.anchor.y = -( bounds.y / bounds.height );
//
//    // this._cachedSprite.buffer.context.save();
//    this._cachedSprite.buffer.context.translate(-bounds.x,-bounds.y);
//
//    // make sure we set the alpha of the graphics to 1 for the render..
//    this.worldAlpha = 1;
//
//    // now render the graphic..
//    PIXI.CanvasGraphics.renderGraphics(this, this._cachedSprite.buffer.context);
//    this._cachedSprite.alpha = this.alpha;
//};
//
///**
// * Updates texture size based on canvas size
// *
// * @method updateCachedSpriteTexture
// * @private
// */
//Graphics.prototype.updateCachedSpriteTexture = function()
//{
//    var cachedSprite = this._cachedSprite;
//    var texture = cachedSprite.texture;
//    var canvas = cachedSprite.buffer.canvas;
//
//    texture.baseTexture.width = canvas.width;
//    texture.baseTexture.height = canvas.height;
//    texture.crop.width = texture.frame.width = canvas.width;
//    texture.crop.height = texture.frame.height = canvas.height;
//
//    cachedSprite._width = canvas.width;
//    cachedSprite._height = canvas.height;
//
//    // update the dirty base textures
//    texture.baseTexture.dirty();
//};
//
///**
// * Destroys a previous cached sprite.
// *
// * @method destroyCachedSprite
// */
//Graphics.prototype.destroyCachedSprite = function()
//{
//    this._cachedSprite.texture.destroy(true);
//
//    // let the gc collect the unused sprite
//    // TODO could be object pooled!
//    this._cachedSprite = null;
//};

Graphics.prototype.drawShape = function (shape) {
    if (this.currentPath) {
        // check current path!
        if (this.currentPath.shape.points.length <= 2)this.graphicsData.pop();
    }

    this.currentPath = null;

    var data = new GraphicsData(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, shape);

    this.graphicsData.push(data);

    if (data.type === Enums2D.ShapeTypes.POLY) {
        data.shape.closed = this.filling;
        this.currentPath = data;
    }

    this._dirtyRender = true;

    return data;
};

Graphics.prototype.toJSON = function (json) {
    json = Renderable2D.prototype.toJSON.call(this, json);

    //json.texture = this.texture ? this.texture.name : undefined;
    json.isMask = this.isMask;

    return json;
};


Graphics.prototype.fromJSON = function (json) {
    Renderable2D.prototype.fromJSON.call(this, json);

    //this.texture = json.texture ? Assets.get(json.texture) : undefined;
    this.isMask = json.isMask;
    return this;
};


var GraphicsData = function (lineWidth, lineColor, lineAlpha, fillColor, fillAlpha, fill, shape) {
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    this.lineAlpha = lineAlpha;

    this.fillColor = fillColor;
    this.fillAlpha = fillAlpha;
    this.fill = fill;

    this.shape = shape;
    this.type = shape.type;
};
//GraphicsData.prototype.constructor = GraphicsData;


//// SOME TYPES:
//Graphics.POLY = 0;
//Graphics.RECT = 1;
//Graphics.CIRC = 2;
//Graphics.ELIP = 3;
//Graphics.RREC = 4;

//PolygonShape.prototype.type = Graphics.POLY;
//RectangleShape.prototype.type = Graphics.RECT;
//CircleShape.prototype.type = Graphics.CIRC;
//EllipseShape.prototype.type = Graphics.ELIP;
//RoundedRectangleShape.prototype.type = Graphics.RREC;

function CircleShape(x, y, radius) {
    this.x = x || 0;
    this.y = y || 0;
    this.radius = radius || 0;

    this.type = Enums2D.ShapeTypes.CIRC;
};

CircleShape.prototype.clone = function () {
    return new CircleShape(this.x, this.y, this.radius);
};

CircleShape.prototype.contains = function (x, y) {
    if (this.radius <= 0)
        return false;

    var dx = (this.x - x),
        dy = (this.y - y),
        r2 = this.radius * this.radius;

    dx *= dx;
    dy *= dy;

    return (dx + dy <= r2);
};

CircleShape.prototype.getBounds = function () {
    return new Rect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
};

// constructor
CircleShape.prototype.constructor = CircleShape;
Graphics.CircleShape = CircleShape;

function RectangleShape(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;

    this.type = Enums2D.ShapeTypes.RECT;
};

RectangleShape.prototype.clone = function () {
    return new RectangleShape(this.x, this.y, this.width, this.height);
};

RectangleShape.prototype.contains = function (x, y) {
    if (this.width <= 0 || this.height <= 0)
        return false;

    var x1 = this.x;
    if (x >= x1 && x <= x1 + this.width) {
        var y1 = this.y;

        if (y >= y1 && y <= y1 + this.height) {
            return true;
        }
    }

    return false;
};

// constructor
RectangleShape.prototype.constructor = RectangleShape;
//PIXI.EmptyRectangleShape = new RectangleShape(0,0,0,0);
Graphics.RectangleShape = RectangleShape;


function EllipseShape(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.type = Enums2D.ShapeTypes.ELIP;
};

EllipseShape.prototype.clone = function () {
    return new EllipseShape(this.x, this.y, this.width, this.height);
};

EllipseShape.prototype.contains = function (x, y) {
    if (this.width <= 0 || this.height <= 0)
        return false;

    //normalize the coords to an EllipseShape with center 0,0
    var normx = ((x - this.x) / this.width),
        normy = ((y - this.y) / this.height);

    normx *= normx;
    normy *= normy;

    return (normx + normy <= 1);
};

EllipseShape.prototype.getBounds = function () {
    return new Rect(this.x - this.width, this.y - this.height, this.width, this.height);
};

// constructor
EllipseShape.prototype.constructor = EllipseShape;
Graphics.EllipseShape = EllipseShape;

function PolygonShape(points) {
    //if points isn't an array, use arguments as the array
    if (!(points instanceof Array))points = Array.prototype.slice.call(arguments);

    //if this is a flat array of numbers, convert it to points
    if (points[0] instanceof Vec2) {
        var p = [];
        for (var i = 0, il = points.length; i < il; i++) {
            p.push(points[i].x, points[i].y);
        }

        points = p;
    }

    this.closed = true;
    this.points = points;

    this.type = Enums2D.ShapeTypes.POLY;
};

PolygonShape.prototype.clone = function () {
    var points = this.points.slice();
    return new PolygonShape(points);
};

PolygonShape.prototype.contains = function (x, y) {
    var inside = false;

    // use some raycasting to test hits
    // https://github.com/substack/point-in-PolygonShape/blob/master/index.js
    var length = this.points.length / 2;

    for (var i = 0, j = length - 1; i < length; j = i++) {
        var xi = this.points[i * 2], yi = this.points[i * 2 + 1],
            xj = this.points[j * 2], yj = this.points[j * 2 + 1],
            intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

        if (intersect) inside = !inside;
    }

    return inside;
};

// constructor
PolygonShape.prototype.constructor = PolygonShape;
Graphics.PolygonShape = PolygonShape;


function RoundedRectangleShape(x, y, width, height, radius) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.radius = radius || 20;
    this.type = Enums2D.ShapeTypes.RREC;
};

RoundedRectangleShape.prototype.clone = function () {
    return new RoundedRectangleShape(this.x, this.y, this.width, this.height, this.radius);
};

RoundedRectangleShape.prototype.contains = function (x, y) {
    if (this.width <= 0 || this.height <= 0)
        return false;

    var x1 = this.x;
    if (x >= x1 && x <= x1 + this.width) {
        var y1 = this.y;

        if (y >= y1 && y <= y1 + this.height) {
            return true;
        }
    }

    return false;
};

// constructor
RoundedRectangleShape.prototype.constructor = RoundedRectangleShape;
Graphics.RoundedRectangleShape = RoundedRectangleShape;

module.exports = Graphics;
