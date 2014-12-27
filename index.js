"use strict";


//var Device = require("./src/context/device"),
//    Time = require("./src/context/time"),
//    now = Time.now,
//
//    IS_SERVER = !(typeof(window) !== "undefined" && window.document),
//    IS_CLIENT = !IS_SERVER,
//
//    defineProperty = Object.defineProperty;
//
//
//if (Device.mobile) {
//    window.onerror = function (message, page, line) {
//        alert("line: " + line + ", page: " + page + "\nmessage: " + message);
//    };
//}


/**
 * Holds all accessible Classes
 * @class Xian
 */
function Xian() {

    //base
    this.Class = require("./src/base/class");
    this.Enum = require("./src/base/enum");
    this.EventEmitter = require("./src/base/event_emitter");
    this.ObjectPool = require("./src/base/object_pool");
    this.util = require("./src/base/util");
    this.Config = require("./src/base/config");

    //context
    this.MainContext = require("./src/context/main_context");
    this.ResolutionPolicy = require("./src/context/screen/ResolutionPolicy");
    this.ContainerStrategy = require("./src/context/screen/ContainerStrategy");
    this.ContentStrategy = require("./src/context/screen/ContentStrategy");
    //this.AudioCtx = require("./context/audio_ctx");
    //this.Device = require("./context/device");
    //this.Dom = require("./context/dom");
    //this.requestAnimationFrame = require("./context/request_animation_frame");
    //this.io = require("./context/socket.io.js");
    //this.Time = require("./context/time");
    //this.Log = require("./src/context/log");
    //this.Handler = require("./context/input/handler");
    //this.Input = require("./context/input");
    //this.Canvas = require("./context/canvas");

    //assets
    this.Asset = require("./src/assets/asset");
    this.AssetLoader = require("./src/assets/asset_loader");
    this.Assets = require("./src/assets/assets");
    this.AudioClip = require("./src/assets/audio_clip");
    this.Texture = require("./src/assets/texture");
    this.RenderTexture = require("./src/assets/render_texture");

    //components
    this.AudioSource = require("./src/components/audio_source");
    this.Camera = require("./src/components/camera");
    this.Component = require("./src/core/component");
    this.Sprite = require("./src/components/sprite");
    this.Transform = require("./src/components/transform");
    this.Behaviour = require("./src/components/behaviour");

    //core
    this.Game = require("./src/core/game");
    this.Enums = require("./src/core/enums");
    this.GameObject = require("./src/core/game_object");
    this.Prefab = require("./src/core/prefab");
    this.Scene = require("./src/core/scene");
    this.System = require("./src/core/system");

    //systems
    this.ComponentSystem = require("./src/systems/component_system");
    this.TransformSystem = require("./src/systems/transform_system");
    this.BehaviourSystem = require("./src/systems/behaviour_system");

    //math
    this.AABB2 = require("./src/math/aabb2");
    this.AABB3 = require("./src/math/aabb3");
    this.Color = require("./src/math/color");
    this.Mat2 = require("./src/math/mat2");
    this.Mat3 = require("./src/math/mat3");
    this.Mat32 = require("./src/math/mat32");
    this.Mat4 = require("./src/math/mat4");
    this.Mathf = require("./src/math/mathf");
    this.Quat = require("./src/math/quat");
    this.Rect = require("./src/math/rect");
    this.RectOffset = require("./src/math/rect_offset");
    this.Vec2 = require("./src/math/vec2");
    this.Vec3 = require("./src/math/vec3");
    this.Vec4 = require("./src/math/vec4");

    //xian2d
    this.Transform2D = require("./src/xian2d/components/transform_2d");
    this.Camera2D = require("./src/xian2d/components/camera_2d");
    this.TextureClip = require("./src/xian2d/assets/texture_clip");
    //this.Renderer2D = require("./src/xian2d/context/renderer/canvas_renderer_2d");
    this.Renderer2D = require("./src/xian2d/components/renderer_2d");
    this.Renderable2D = require("./src/xian2d/components/renderable_2d");
    this.Sprite2D = require("./src/xian2d/components/sprite_2d");
    this.TilingSprite2D = require("./src/xian2d/components/tiling_sprite_2d");
    this.Graphics = require("./src/xian2d/components/graphics");
    this.Text2D = require("./src/xian2d/components/text_2d");

    this.CanvasRenderer2D = require("./src/xian2d/context/renderer/canvas_renderer_2d");
    this.WebGLRenderer2D = require("./src/xian2d/context/renderer/webgl_renderer_2d");
    this.XianShader = require("./src/xian2d/context/renderer/shaders/xian_shader");
    this.Render2DSystem = require("./src/xian2d/systems/render_2d_system");
    this.Transform2DSystem = require("./src/xian2d/systems/transform_2d_system");

    this.PIXICanvasRenderer2D = require("./src/xian2d/context/pixi/canvas/pixi_canvas_renderer_2d");
    this.PIXIWebGLRenderer2D = require("./src/xian2d/context/pixi/webgl/pixi_webgl_renderer_2d");

    this.FilterLib = require("./src/xian2d/context/pixi/webgl/filters/FilterLib");

}


//defineProperty(Xian.prototype, "isServer", {
//    get: function () {
//        return IS_SERVER;
//    }
//});
//
//
//defineProperty(Xian.prototype, "isClient", {
//    get: function () {
//        return IS_CLIENT;
//    }
//});


/**
 * attaches Xian to window/global and all subclasses
 */
Xian.prototype.globalize = function () {

    for (var key in this) window[key] = this[key];
    window.Xian = this;
};

///**
// * benchmarks function console.logs number of operations / second
// * @param String name
// * @param Function fn
// */
//Xian.prototype.benchmark = function (name, fn, times) {
//    times || (times = 1000);
//    var start = 0.0,
//        time = 0.0,
//        i = times;
//
//    while (i--) {
//        start = now();
//        fn();
//        time += now() - start;
//    }
//
//    console.log(name + ":\n\t" + times / time + " (ops/sec)\n\t" + time / times + "(avg/call)");
//};


module.exports = new Xian();
