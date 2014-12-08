"use strict";


var SPLITER = /[ ,]+/,

    WEBGL_NAMES = ["webgl", "webkit-3d", "moz-webgl", "experimental-webgl", "3d"],
    WEBGL_ATTRIBUTES = {
        alpha: true,
        antialias: true,
        depth: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        stencil: true
    };


function Dom() {
}


var EVENT_CALLBACK_ID = 0,
    EVENT_CALLBACKS = {};
Dom.prototype.addEvent = function (obj, name, callback, ctx) {
    var names = name.split(SPLITER),
        i = names.length,
        scope = ctx || obj,
        afn = function (e) {
            callback.call(scope, e || window.event);
        };

    EVENT_CALLBACKS[(callback.__EVENT_CALLBACK_ID__ = EVENT_CALLBACK_ID++)] = afn;

    while (i--) {
        name = names[i];

        if (obj.attachEvent) {
            obj.attachEvent("on" + name, afn);
        } else {
            obj.addEventListener(name, afn, false);
        }
    }
};


Dom.prototype.removeEvent = function (obj, name, callback, ctx) {
    var names = name.split(SPLITER),
        i = names.length,
        scope = ctx || obj,
        id = callback.__EVENT_CALLBACK_ID__,
        afn = EVENT_CALLBACKS[id];

    EVENT_CALLBACKS[id] = null;

    while (i--) {
        name = names[i];

        if (obj.detachEvent) {
            obj.detachEvent("on" + name, afn);
        } else {
            obj.removeEventListener(name, afn, false);
        }
    }
};


Dom.prototype.addMeta = function (id, name, content) {
    var meta = document.createElement("meta"),
        head = document.head;

    if (id) meta.id = id;
    if (name) meta.name = name;
    if (content) meta.content = content;

    head.insertBefore(meta, head.firstChild);
};


Dom.prototype.getWebGLContext = function (canvas, attributes) {
    var key, gl, i = WEBGL_NAMES.length;

    attributes || (attributes = {});
    for (key in WEBGL_ATTRIBUTES) {
        if (attributes[key] === undefined) attributes[key] = WEBGL_ATTRIBUTES[key];
    }

    while (i--) {
        try {
            gl = canvas.getContext(WEBGL_NAMES[i], attributes);
        } catch (err) {
            console.error("Dom.getWebGLContext: could not get a WebGL Context " + (err.message || ""));
        }
        if (gl) break;
    }

    if (!gl) throw "Dom.getWebGLContext: could not get a WebGL Context";

    return gl;
};


var createShader = Dom.prototype.createShader = function (gl, source, type) {
    var shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Dom.createShader: problem compiling shader " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return undefined;
    }

    return shader;
};


Dom.prototype.createProgram = function (gl, vertex, fragment) {
    var program = gl.createProgram(),
        shader;

    shader = createShader(gl, vertex, gl.VERTEX_SHADER);
    gl.attachShader(program, shader);
    gl.deleteShader(shader);

    shader = createShader(gl, fragment, gl.FRAGMENT_SHADER);
    gl.attachShader(program, shader);
    gl.deleteShader(shader);

    gl.linkProgram(program);
    gl.validateProgram(program);
    gl.useProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Dom.createProgram: problem compiling Program " + gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return undefined;
    }

    return program;
};

/**
 * Checks whether the Canvas BlendModes are supported by the current browser
 *
 * @method canUseNewCanvasBlendModes
 * @return {Boolean} whether they are supported
 */
Dom.prototype.canUseNewCanvasBlendModes = function()
{
    if (typeof document === 'undefined') return false;
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    var context = canvas.getContext('2d');
    context.fillStyle = '#000';
    context.fillRect(0,0,1,1);
    context.globalCompositeOperation = 'multiply';
    context.fillStyle = '#fff';
    context.fillRect(0,0,1,1);
    return context.getImageData(0,0,1,1).data[0] === 0;
};


module.exports = new Dom;
