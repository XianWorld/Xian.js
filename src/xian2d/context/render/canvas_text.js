/**
 * Created by Dianyan on 2014/12/27.
 */
var Rect = require("../../../math/rect");

function CanvasText() {
    //this.canvas = document.createElement('canvas');
    //this.context = this.canvas.getContext('2d');
}

CanvasText.fontPropertiesCache = {};
CanvasText._canvas = document.createElement('canvas');
CanvasText._context = CanvasText._canvas.getContext('2d');

var _RECT = new Rect();
CanvasText.getBounds = function (text2d, context, bounds) {
    bounds = bounds || _RECT;
    context = context || CanvasText._context;

    var text = text2d.text;
    var style = text2d.style;
    var resolution = text2d.resolution || 1;
    context.font = style.font;

    var outputText = text;

    // word wrap
    // preserve original text
    if (style.wordWrap)outputText = CanvasText._wordWrap(context, text, style.wordWrapWidth);

    //split text into lines
    var lines = outputText.split(/(?:\r\n|\r|\n)/);

    //calculate text width
    var lineWidths = [];
    var maxLineWidth = 0;
    var fontProperties = CanvasText._determineFontProperties(style.font);
    for (var i = 0; i < lines.length; i++) {
        var lineWidth = context.measureText(lines[i]).width;
        lineWidths[i] = lineWidth;
        maxLineWidth = Math.max(maxLineWidth, lineWidth);
    }

    var width = maxLineWidth + style.strokeThickness;
    if (style.dropShadow)width += style.dropShadowDistance;

    bounds.width = ( width + context.lineWidth ) * resolution;

    //calculate text height
    var lineHeight = fontProperties.fontSize + style.strokeThickness;

    var height = lineHeight * lines.length;
    if (style.dropShadow)height += style.dropShadowDistance;

    bounds.height = height * resolution;

    return bounds;
};

CanvasText.renderText = function (text2d, context, canvas) {
    //context = context || CanvasText._context;
    var offsetX = 0,
        offsetY = 0;
    //offsetX = offsetX || 0;
    //offsetY = offsetY || 0;
    var text = text2d.text;
    var style = text2d.style;
    var resolution = text2d.resolution || 1;
    context.font = style.font;

    var outputText = text;
    if (style.wordWrap)outputText = CanvasText._wordWrap(context, text, style.wordWrapWidth);
    var lines = outputText.split(/(?:\r\n|\r|\n)/);
    var i, lineWidth;
    var lineWidths = [];
    var maxLineWidth = 0;
    var fontProperties = CanvasText._determineFontProperties(style.font);
    for (i = 0; i < lines.length; i++) {
        lineWidth = context.measureText(lines[i]).width;
        lineWidths[i] = lineWidth;
        maxLineWidth = Math.max(maxLineWidth, lineWidth);
    }
    var width = maxLineWidth + style.strokeThickness;
    if(style.dropShadow)width += style.dropShadowDistance;
    width = ( width + context.lineWidth ) * resolution;
    //calculate text height
    var lineHeight = fontProperties.fontSize + style.strokeThickness;
    var height = lineHeight * lines.length;
    if(style.dropShadow)height += style.dropShadowDistance;
    height = height * resolution;

    if(text2d._dirtySize){
        var bounds = text2d._localBounds;
        bounds.width = width;
        bounds.height = height;
        text2d._dirtySize = false;
    }
    if(canvas){
        canvas.width = width;
        canvas.height = height;
    }

    //anchor??
    //offsetX -= width/2;
    //offsetY -= height/2;

    context.scale(resolution, resolution);
    //if(navigator.isCocoonJS) context.clearRect(0,0,this.canvas.width,this.canvas.height);

    context.font = style.font;
    context.strokeStyle = style.stroke;
    context.lineWidth = style.strokeThickness;
    context.textBaseline = 'alphabetic';
    //this.context.lineJoin = 'round';

    var linePositionX;
    var linePositionY;

    if (style.dropShadow) {
        context.fillStyle = style.dropShadowColor;

        var xShadowOffset = Math.sin(style.dropShadowAngle) * style.dropShadowDistance;
        var yShadowOffset = Math.cos(style.dropShadowAngle) * style.dropShadowDistance;

        for (i = 0; i < lines.length; i++) {
            linePositionX = style.strokeThickness / 2;
            linePositionY = (style.strokeThickness / 2 + i * lineHeight) + fontProperties.ascent;

            if (style.align === 'right') {
                linePositionX += maxLineWidth - lineWidths[i];
            }
            else if (style.align === 'center') {
                linePositionX += (maxLineWidth - lineWidths[i]) / 2;
            }

            if (style.fill) {
                context.fillText(lines[i], linePositionX + xShadowOffset + offsetX, linePositionY + yShadowOffset + offsetY);
            }

            //  if(dropShadow)
        }
    }

    //set canvas text styles
    context.fillStyle = style.fill;

    //draw lines line by line
    for (i = 0; i < lines.length; i++) {
        linePositionX = style.strokeThickness / 2;
        linePositionY = (style.strokeThickness / 2 + i * lineHeight) + fontProperties.ascent;

        if (style.align === 'right') {
            linePositionX += maxLineWidth - lineWidths[i];
        }
        else if (style.align === 'center') {
            linePositionX += (maxLineWidth - lineWidths[i]) / 2;
        }

        if (style.stroke && style.strokeThickness) {
            context.strokeText(lines[i], linePositionX + offsetX, linePositionY + offsetY);
        }

        if (style.fill) {
            context.fillText(lines[i], linePositionX + offsetX, linePositionY + offsetY);
        }

        //  if(dropShadow)
    }
};
/**
 * Applies newlines to a string to have it optimally fit into the horizontal
 * bounds set by the Text object's wordWrapWidth property.
 *
 * @method wordWrap
 * @param text {String}
 * @private
 */
CanvasText._wordWrap = function (context, text, wordWrapWidth) {
    // Greedy wrapping algorithm that will wrap words as the line grows longer
    // than its horizontal bounds.
    var result = '';
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var spaceLeft = wordWrapWidth;
        var words = lines[i].split(' ');
        for (var j = 0; j < words.length; j++) {
            var wordWidth = context.measureText(words[j]).width;
            var wordWidthWithSpace = wordWidth + context.measureText(' ').width;
            if (j === 0 || wordWidthWithSpace > spaceLeft) {
                // Skip printing the newline if it's the first word of the line that is
                // greater than the word wrap width.
                if (j > 0) {
                    result += '\n';
                }
                result += words[j];
                spaceLeft = wordWrapWidth - wordWidth;
            }
            else {
                spaceLeft -= wordWidthWithSpace;
                result += ' ' + words[j];
            }
        }

        if (i < lines.length - 1) {
            result += '\n';
        }
    }
    return result;
};

/**
 * Calculates the ascent, descent and fontSize of a given fontStyle
 *
 * @method determineFontProperties
 * @param fontStyle {Object}
 * @private
 */
CanvasText._determineFontProperties = function (fontStyle) {
    var properties = CanvasText.fontPropertiesCache[fontStyle];

    if (!properties) {
        properties = {};

        var canvas = CanvasText._canvas;
        var context = CanvasText._context;

        context.font = fontStyle;

        var width = Math.ceil(context.measureText('|Mq').width);
        var baseline = Math.ceil(context.measureText('M').width);
        var height = 2 * baseline;

        baseline = baseline * 1.4 | 0;

        canvas.width = width;
        canvas.height = height;

        context.fillStyle = '#f00';
        context.fillRect(0, 0, width, height);

        context.font = fontStyle;

        context.textBaseline = 'alphabetic';
        context.fillStyle = '#000';
        context.fillText('|Mq', 0, baseline);

        var imagedata = context.getImageData(0, 0, width, height).data;
        var pixels = imagedata.length;
        var line = width * 4;

        var i, j;

        var idx = 0;
        var stop = false;

        // ascent. scan from top to bottom until we find a non red pixel
        for (i = 0; i < baseline; i++) {
            for (j = 0; j < line; j += 4) {
                if (imagedata[idx + j] !== 255) {
                    stop = true;
                    break;
                }
            }
            if (!stop) {
                idx += line;
            }
            else {
                break;
            }
        }

        properties.ascent = baseline - i;

        idx = pixels - line;
        stop = false;

        // descent. scan from bottom to top until we find a non red pixel
        for (i = height; i > baseline; i--) {
            for (j = 0; j < line; j += 4) {
                if (imagedata[idx + j] !== 255) {
                    stop = true;
                    break;
                }
            }
            if (!stop) {
                idx -= line;
            }
            else {
                break;
            }
        }

        properties.descent = i - baseline;
        properties.fontSize = properties.ascent + properties.descent;

        CanvasText.fontPropertiesCache[fontStyle] = properties;
    }

    return properties;
};

module.exports = CanvasText;
