var Color = require("../../../../../math/color");
var Dom = require("../../../../../context/dom");

CanvasTinter = function () {
};

CanvasTinter.tintCache = {};

CanvasTinter.getTintedTexture = function (texture, x, y, width, height, color) {
    //var texture = sprite.texture;

    //color = CanvasTinter.roundColor(color);

    //var stringColor = Color.hexString(color);//"#" + ("00000" + ( color | 0).toString(16)).substr(-6);
    var stringColor = texture.name+x+","+y+","+width+","+height+","+color;//"#" + ("00000" + ( color | 0).toString(16)).substr(-6);

    //CanvasTinter.tintCache = CanvasTinter.tintCache || {};
    var tintCache = CanvasTinter.tintCache;
    var image = tintCache[stringColor];
    if (image) return image;

    // clone texture..
    var canvas = CanvasTinter.canvas || document.createElement("canvas");

    //CanvasTinter.tintWithPerPixel(texture, stringColor, canvas);
    CanvasTinter.tintMethod(texture, x, y, width, height, color, canvas);

    if (CanvasTinter.convertTintToImage) {
        // is this better?
        var tintImage = new Image();
        tintImage.src = canvas.toDataURL();

        tintCache[stringColor] = tintImage;
    }
    else {
        tintCache[stringColor] = canvas;
        // if we are not converting the texture to an image then we need to lose the reference to the canvas
        CanvasTinter.canvas = null;
    }

    return canvas;
};

/**
 * Tint a texture using the "multiply" operation.
 *
 * @method tintWithMultiply
 * @param texture {Texture} the texture to tint
 * @param color {Number} the color to use to tint the sprite with
 * @param canvas {HTMLCanvasElement} the current canvas
 */
CanvasTinter.tintWithMultiply = function (texture, x, y, width, height, color, canvas) {
    var context = canvas.getContext("2d");

    //var x = textureClip.clipX;
    //var y = textureClip.clipY;
    //var width = textureClip.clipWidth;
    //var height = textureClip.clipHeight;

    canvas.width = width;
    canvas.height = height;

    context.fillStyle = Color.hexString(color);

    context.fillRect(0, 0, width, height);

    context.globalCompositeOperation = "multiply";

    context.drawImage(texture.raw,
        x,
        y,
        width,
        height,
        0,
        0,
        width,
        height);

    context.globalCompositeOperation = "destination-atop";

    context.drawImage(texture.raw,
        x,
        y,
        width,
        height,
        0,
        0,
        width,
        height);
};

/**
 * Tint a texture using the "overlay" operation.
 *
 * @method tintWithOverlay
 * @param texture {Texture} the texture to tint
 * @param color {Number} the color to use to tint the sprite with
 * @param canvas {HTMLCanvasElement} the current canvas
 */
CanvasTinter.tintWithOverlay = function (texture, x, y, width, height, color, canvas) {
    var context = canvas.getContext("2d");

    //var x = textureClip.clipX;
    //var y = textureClip.clipY;
    //var width = textureClip.clipWidth;
    //var height = textureClip.clipHeight;

    canvas.width = width;
    canvas.height = height;

    context.globalCompositeOperation = "copy";
    context.fillStyle = Color.hexString(color);
    context.fillRect(0, 0, width, height);

    context.globalCompositeOperation = "destination-atop";
    context.drawImage(texture.raw,
        x,
        y,
        width,
        height,
        0,
        0,
        width,
        height);

    //context.globalCompositeOperation = "copy";
};

/**
 * Tint a texture pixel per pixel.
 *
 * @method tintPerPixel
 * @param texture {Texture} the texture to tint
 * @param color {Number} the color to use to tint the sprite with
 * @param canvas {HTMLCanvasElement} the current canvas
 */
CanvasTinter.tintWithPerPixel = function (texture, x, y, width, height, color, canvas) {
    var context = canvas.getContext("2d");

    //var x = textureClip.clipX;
    //var y = textureClip.clipY;
    //var width = textureClip.clipWidth;
    //var height = textureClip.clipHeight;

    canvas.width = width;
    canvas.height = height;

    context.globalCompositeOperation = "copy";
    context.drawImage(texture.raw,
        x,
        y,
        width,
        height,
        0,
        0,
        width,
        height);

    //var rgbValues = hex2rgb(color);
    var r = color.r, g = color.g, b = color.b;

    var pixelData = context.getImageData(0, 0, width, height);

    var pixels = pixelData.data;

    for (var i = 0; i < pixels.length; i += 4) {
        pixels[i + 0] *= r;
        pixels[i + 1] *= g;
        pixels[i + 2] *= b;
    }

    context.putImageData(pixelData, 0, 0);
};

/**
 * Rounds the specified color according to the CanvasTinter.cacheStepsPerColorChannel.
 *
 * @method roundColor
 * @param color {number} the color to round, should be a hex color
 */
CanvasTinter.roundColor = function (color) {
    var step = CanvasTinter.cacheStepsPerColorChannel;

    var rgbValues = Color.hex2rgb(color);

    rgbValues[0] = Math.min(255, (rgbValues[0] / step) * step);
    rgbValues[1] = Math.min(255, (rgbValues[1] / step) * step);
    rgbValues[2] = Math.min(255, (rgbValues[2] / step) * step);

    return PIXI.rgb2hex(rgbValues);
};

/**
 * Number of steps which will be used as a cap when rounding colors.
 *
 * @property cacheStepsPerColorChannel
 * @type Number
 */
CanvasTinter.cacheStepsPerColorChannel = 8;

/**
 * Tint cache boolean flag.
 *
 * @property convertTintToImage
 * @type Boolean
 */
CanvasTinter.convertTintToImage = false;

/**
 * Whether or not the Canvas BlendModes are supported, consequently the ability to tint using the multiply method.
 *
 * @property canUseMultiply
 * @type Boolean
 */
CanvasTinter.canUseMultiply = Dom.canUseNewCanvasBlendModes();

/**
 * The tinting method that will be used.
 *
 * @method tintMethod
 */
CanvasTinter.tintMethod = CanvasTinter.canUseMultiply ? CanvasTinter.tintWithMultiply : CanvasTinter.tintWithPerPixel;

module.exports = CanvasTinter;