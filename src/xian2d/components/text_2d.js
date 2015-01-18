/**
 * A Text Object will create a line or multiple lines of text. To split a line you can use '\n' in your text string,
 * or add a wordWrap property set to true and and wordWrapWidth property with a value in the style object.
 *
 * @class Text
 * @extends Sprite
 * @constructor
 * @param text {String} The copy that you would like the text to display
 * @param [style] {Object} The style parameters
 * @param [style.font] {String} default 'bold 20px Arial' The style and size of the font
 * @param [style.fill='black'] {String|Number} A canvas fillstyle that will be used on the text e.g 'red', '#00FF00'
 * @param [style.align='left'] {String} Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
 * @param [style.stroke] {String|Number} A canvas fillstyle that will be used on the text stroke e.g 'blue', '#FCFF00'
 * @param [style.strokeThickness=0] {Number} A number that represents the thickness of the stroke. Default is 0 (no stroke)
 * @param [style.wordWrap=false] {Boolean} Indicates if word wrap should be used
 * @param [style.wordWrapWidth=100] {Number} The width at which text will wrap, it needs wordWrap to be set to true
 * @param [style.dropShadow=false] {Boolean} Set a drop shadow for the text
 * @param [style.dropShadowColor='#000000'] {String} A fill style to be used on the dropshadow e.g 'red', '#00FF00'
 * @param [style.dropShadowAngle=Math.PI/4] {Number} Set a angle of the drop shadow
 * @param [style.dropShadowDistance=5] {Number} Set a distance of the drop shadow
 */
var CanvasText = require("../context/graphics/canvas_text");
var Renderable2D = require("./renderable_2d");
var CanvasBuffer = require("../../context/graphics/canvas_buffer");
var Texture = require("../../context/assets/texture");
var Sprite2DData = require("../context/graphics/g2d/sprite_2d_data");

function Text2D(opts) {
    //opts || (opts = {});

    Renderable2D.call(this, opts);

    //temporary for cache as bitmap or render to webgl
    //this.canvas = undefined;//document.createElement('canvas');
    //this.context = undefined;//this.canvas.getContext('2d');

    this.resolution = 1;

    this.text = "";
    //this.setText(opts.text);
    //this.setStyle(opts.style);
    this.setStyle();
}

Renderable2D.extend(Text2D);

Text2D.prototype.setStyle = function (style) {
    style = style || {};
    style.font = style.font || 'bold 20pt Arial';
    style.fill = style.fill || 'black';
    style.align = style.align || 'left';
    style.stroke = style.stroke || 'black'; //provide a default, see: https://github.com/GoodBoyDigital/pixi.js/issues/136
    style.strokeThickness = style.strokeThickness || 0;
    style.wordWrap = style.wordWrap || false;
    style.wordWrapWidth = style.wordWrapWidth || 100;

    style.dropShadow = style.dropShadow || false;
    style.dropShadowAngle = style.dropShadowAngle || Math.PI / 6;
    style.dropShadowDistance = style.dropShadowDistance || 4;
    style.dropShadowColor = style.dropShadowColor || 'black';

    this.style = style;
    this._dirtyRender = true;
    this._dirtySize = true;
};

Text2D.prototype.setText = function (text) {
    text = text || "";
    if (this.text === text) return;
    this.text = text.toString() || ' ';
    this._dirtyRender = true;
    this._dirtySize = true;
};

Text2D.prototype.getLocalBounds = function (matrix) {
    if (this._dirtySize) {
        CanvasText.getBounds(this, undefined, this._localBounds);
        this._dirtySize = false;
    }
    return this._localBounds;
};

Text2D.prototype._render = function (renderer) {
    if (this._dirtyRender) {
    }
    renderer.renderText(this);
    this._dirtyRender = false;
};

Text2D.prototype._generateCachedSprite = function () {
    var sprite2D = this._cachedSprite;
    if (!sprite2D) {
        var canvasBuffer = new CanvasBuffer(1, 1);
        var texture = Texture.fromCanvas(canvasBuffer.canvas);//new Texture();//(canvasBuffer.canvas);
        //texture.parse(canvasBuffer.canvas);

        sprite2D = this._cachedSprite = new Sprite2DData();
        sprite2D.buffer = canvasBuffer;
        sprite2D.destTexture = texture;
    }

    var buffer = sprite2D.buffer;
    CanvasText.renderText(this, buffer.context, buffer.canvas);
    var bounds = this._localBounds;
    sprite2D.sourceWidth = bounds.width;
    sprite2D.sourceHeight = bounds.height;
    sprite2D.destWidth = bounds.width;
    sprite2D.destHeight = bounds.height;
    sprite2D.destTexture.width = bounds.width;
    sprite2D.destTexture.height = bounds.height;
    sprite2D.destTexture.needsUpdate = true;
};
Text2D.prototype._destroyCachedSprite = function()
{
    if(!this._cachedSprite) return;
    this._cachedSprite.buffer.destroy();
    this._cachedSprite.destroy();
    // let the gc collect the unused sprite
    // TODO could be object pooled!
    this._cachedSprite = null;
};

Text2D.prototype.destroy = function () {
    // make sure to reset the the context and canvas.. dont want this hanging around in memory!
    this._destroyCachedSprite();
};
Text2D.prototype.toJSON = function (json) {
    json = Renderable2D.prototype.toJSON.call(this, json);

    json.text = this.text;
    json.style = this.style;

    return json;
};

Text2D.prototype.fromJSON = function (json) {
    Renderable2D.prototype.fromJSON.call(this, json);

    this.setText(json.text);
    this.setStyle(json.style);

    return this;
};

module.exports = Text2D;