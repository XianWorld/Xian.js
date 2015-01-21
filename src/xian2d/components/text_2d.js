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
var Vec2 = require("../../math/vec2");
var Color = require("../../math/color");
var Assets = require("../../context/main_context").Assets;

function Text2D() {

    Renderable2D.call(this);

    this.resolution = 1;

    this._bitmapFont = undefined;

    this._text = '';
    this.setStyle();

    this._sprite2DDatas = undefined;
    this._fontName = '';
    this._fontSize = 0;
    this._fontColor = 0xFFFFFF;
}

Renderable2D.extend(Text2D);

Text2D.prototype.onAssetInited = function (asset) {
    this._dirtyRender = true;
    this._dirtySize = true;
};

Object.defineProperty(Text2D.prototype, "bitmapFont", {
    get: function () {
        return this._bitmapFont;
    },
    set: function (value) {
        if (this._bitmapFont === value) return;
        if (this._bitmapFont) this._bitmapFont.release(this);
        this._bitmapFont = value;
        if (this._bitmapFont) this._bitmapFont.retain(this);
        this._dirtyRender = true;
        this._dirtySize = true;
    }
});

Object.defineProperty(Text2D.prototype, "text", {
    get: function () {
        return this._text;
    },
    set: function(value) {
        value = value || '';
        if (this._text === value) return;
        this._text = value.toString() || ' ';
        this._dirtyRender = true;
        this._dirtySize = true;
    }
});

Text2D.prototype.copy = function (other) {
    Renderable2D.prototype.copy.call(this, other);

    this.resolution = other.resolution;
    this.bitmapFont = other.bitmapFont;

    this.text = other.text;
    this.setStyle(other.style);

    return this;
};

Text2D.prototype.clear = function () {
    Renderable2D.prototype.clear.call(this);

    this.resolution = 1;
    this.bitmapFont = undefined;
    this._sprite2DDatas = undefined;
    this._fontName = '';
    this._fontSize = 0;
    this._fontColor = 0xFFFFFF;

    this._text = '';
    this.setStyle();

    this._destroyCachedSprite();

    this._dirtyRender = true;
    this._dirtySize = true;

    return this;
};

Text2D.prototype.destroy = function () {
    Renderable2D.prototype.destroy.call(this);

    this._text = undefined;
    this.style = undefined;
};

Text2D.prototype.toJSON = function (json) {
    json = Renderable2D.prototype.toJSON.call(this, json);

    json.bitmapFont = this.bitmapFont ? this.bitmapFont.name : undefined;

    json.text = this._text;
    json.style = this.style;

    return json;
};

Text2D.prototype.fromJSON = function (json) {
    Renderable2D.prototype.fromJSON.call(this, json);

    this.bitmapFont = json.bitmapFont ? Assets.load(json.bitmapFont, "BitmapFont") : undefined;
    //this.setBitmapFont(bitmapFont);

    //json.text ? this.setText(json.text) : '';
    this.text = json.text;
    this.setStyle(json.style);

    return this;
};

//Text2D.prototype.setBitmapFont = function (value) {
//    if (this.bitmapFont === value) return;
//    if (this.bitmapFont) this.bitmapFont.release(this);
//    this.bitmapFont = value;
//    if (this.bitmapFont) this.bitmapFont.retain(this);
//
//    this._dirtyRender = true;
//    this._dirtySize = true;
//};

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

    var font = style.font.split(' ');
    this._fontName = font[font.length - 1];
    this._fontSize = font.length >= 2 ? parseInt(font[font.length - 2], 10) : 0;
    this._fontColor = Color.string2Hex(style.fill);

    this._dirtyRender = true;
    this._dirtySize = true;
};

//Text2D.prototype.setText = function (text) {
//    text = text || "";
//    if (this.text === text) return;
//    this.text = text.toString() || ' ';
//    this._dirtyRender = true;
//    this._dirtySize = true;
//};

Text2D.prototype.getLocalBounds = function (matrix) {
    if (this._dirtySize) {
        if (this.bitmapFont) {
            this._getBitmapTextBounds(this._localBounds);
        }
        else {
            CanvasText.getBounds(this, undefined, this._localBounds);
        }
        this._dirtySize = false;
    }
    return this._localBounds;
};

Text2D.prototype._render = function (renderer) {
    if(this.bitmapFont){
        if (!this.bitmapFont.ready) return;
        if (this._dirtyRender) {
            this._updateBitmapText();
        }
        //when use bitmap font, use font color as tint.
        var sprite2DDatas = this._sprite2DDatas;
        var sprite2DData;
        if(sprite2DDatas){
            var i;
            var len = sprite2DDatas.length;

            for(i = 0;i<len;i++){
                sprite2DData = sprite2DDatas[i];
                sprite2DData.worldMatrix = this.worldMatrix;
                sprite2DData.worldAlpha = this.worldAlpha;
                sprite2DData.tint = this._fontColor;
                renderer.renderSprite2D(sprite2DData);
            }
        }
        this._dirtyRender = false;
    }
    else{
        if (this._dirtyRender) {
        }
        renderer.renderText(this);
        this._dirtyRender = false;
    }
};

Text2D.prototype._getBitmapTextBounds = function (bounds) {
    if (!this.bitmapFont.ready) return;

    bounds = bounds || new Rect;
    var data = this.bitmapFont;
    //var pos = new Vec2;
    var posX = 0, posY = 0;
    var prevCharCode = null;
    var maxLineWidth = 0;
    //var lineWidths = [];
    var line = 0;
    var scale = this._fontSize === 0 ? 1 : this._fontSize / data.size;
    var text = this._text;
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);

        if (/(?:\r\n|\r|\n)/.test(text.charAt(i))) {
            //lineWidths.push(pos.x);
            maxLineWidth = Math.max(maxLineWidth, posX);
            line++;

            posX = 0;
            posY += data.lineHeight;
            prevCharCode = null;
            continue;
        }

        var charData = data.chars[charCode];

        if (!charData) continue;

        if (prevCharCode && charData.kerning[prevCharCode]) {
            posX += charData.kerning[prevCharCode];
        }

        posX += charData.xAdvance;

        prevCharCode = charCode;
    }

    //lineWidths.push(pos.x);
    maxLineWidth = Math.max(maxLineWidth, posX);
    bounds.x = 0;
    bounds.y = 0;
    bounds.width = maxLineWidth * scale;
    bounds.height = (posY + data.lineHeight) * scale;

    return bounds;
};

Text2D.prototype._updateBitmapText = function () {
    if(!this.bitmapFont.ready) return;

    var data = this.bitmapFont;
    var pos = new Vec2;
    var prevCharCode = null;
    var chars = [];
    var maxLineWidth = 0;
    var lineWidths = [];
    var line = 0;
    var scale = this._fontSize === 0 ? 1 : this._fontSize / data.size;
    var text = this._text;

    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);

        if (/(?:\r\n|\r|\n)/.test(text.charAt(i))) {
            lineWidths.push(pos.x);
            maxLineWidth = Math.max(maxLineWidth, pos.x);
            line++;

            pos.x = 0;
            pos.y += data.lineHeight;
            prevCharCode = null;
            continue;
        }

        var charData = data.chars[charCode];

        if (!charData) continue;

        if (prevCharCode && charData.kerning[prevCharCode]) {
            pos.x += charData.kerning[prevCharCode];
        }

        //chars.push({texture:charData.texture, line: line, charCode: charCode, position: new PIXI.Point(pos.x + charData.xOffset, pos.y + charData.yOffset)});
        chars.push({
            textureRect: charData.textureRect,
            line: line,
            charCode: charCode,
            positionX: pos.x + charData.xOffset,
            positionY: pos.y + charData.yOffset
        });
        pos.x += charData.xAdvance;

        prevCharCode = charCode;
    }

    lineWidths.push(pos.x);
    maxLineWidth = Math.max(maxLineWidth, pos.x);

    var lineAlignOffsets = [];

    for (i = 0; i <= line; i++) {
        var alignOffset = 0;
        if (this.style.align === 'right') {
            alignOffset = maxLineWidth - lineWidths[i];
        }
        else if (this.style.align === 'center') {
            alignOffset = (maxLineWidth - lineWidths[i]) / 2;
        }
        lineAlignOffsets.push(alignOffset);
    }

    if (!this._sprite2DDatas) this._sprite2DDatas = [];
    var sprite2DDatas = this._sprite2DDatas;

    var lenChildren = sprite2DDatas.length;
    var lenChars = chars.length;
    var tint = this.tint || 0xFFFFFF;
    var c, char;

    for (i = 0; i < lenChars; i++) {
        char = chars[i];
        c = i < lenChildren ? sprite2DDatas[i] : Sprite2DData.create(); // get old child if have. if not - take from pool.
        sprite2DDatas[i] = c;

        c.destTexture = data.texture;

        c.sourceX = char.textureRect.x;
        c.sourceY = char.textureRect.y;
        c.sourceWidth = char.textureRect.width;
        c.sourceHeight = char.textureRect.height;

        c.destX = (char.positionX + lineAlignOffsets[char.line]) * scale;
        c.destY = char.positionY * scale;
        c.destWidth = c.sourceWidth * scale;
        c.destHeight = c.sourceHeight * scale;

        //c.tint = 0xFFFFFF;
        //c.worldAlpha = 1;
        //c.blendMode = 0;
        //c.worldMatrix = undefined;

        //c.position.x = (chars[i].positionX + lineAlignOffsets[chars[i].line]) * scale;
        //c.position.y = chars[i].positionY * scale;
        //c.scale.x = c.scale.y = scale;
        //c.tint = tint;
    }

    // remove unnecessary children.
    // and put their into the pool.
    if (lenChildren > lenChars) {
        for (i = lenChars; i < lenChildren; i++) {
            sprite2DDatas[i].destroy();
            sprite2DDatas[i] = undefined;
        }
        sprite2DDatas.length = lenChars;
    }

    //this.textWidth = maxLineWidth * scale;
    //this.textHeight = (pos.y + data.lineHeight) * scale;
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
Text2D.prototype._destroyCachedSprite = function () {
    if (!this._cachedSprite) return;
    this._cachedSprite.buffer.destroy();
    this._cachedSprite.destroy();
    // let the gc collect the unused sprite
    // TODO could be object pooled!
    this._cachedSprite = null;
};


module.exports = Text2D;