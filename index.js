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

    //this.Phys2D = require("././phys2d");

    //this.AudioCtx = require("./context/audio_ctx");
    this.Class = require("./src/base/class");
    //this.Device = require("./context/device");
    //this.Dom = require("./context/dom");
    this.Enum = require("./src/base/enum");
    this.EventEmitter = require("./src/base/event_emitter");
    this.ObjectPool = require("./src/base/object_pool");
    //this.requestAnimationFrame = require("./context/request_animation_frame");
    //this.io = require("./context/socket.io.js");
    //this.Time = require("./context/time");
    this.util = require("./src/base/util");

    this.Context = require("./src/context/main_context");
    //
    //this.Shader = require("././shader");
    //this.ShaderLib = require("././shader_lib");
    this.Asset = require("./src/assets/asset");
    this.AssetLoader = require("./src/assets/asset_loader");
    this.Assets = require("./src/assets/assets");
    this.AudioClip = require("./src/assets/audio_clip");
    //this.Material = require("./../xian-3d/assets/material");
    //this.Mesh = require("./../xian-3d/assets/mesh");
    //this.SpriteSheet = require("./../xian-2d/assets/sprite_sheet");
    this.Texture = require("./src/assets/texture");
    //this.TextureCube = require("./../xian-3d/assets/texture_cube");
    //
    this.System = require("./src/core/system");
    this.ComponentSystem = require("./src/systems/component_system");
    this.TransformSystem = require("./src/systems/transform_system");
    this.Transform2DSystem = require("./src/systems/transform_2d_system");

    //this.BoneComponentManager = require("./../xian-3d/component_managers/bone_component_manager");
    //this.Camera2DComponentManager = require("././camera_2d_component_manager");
    //this.CameraComponentManager = require("././camera_component_manager");
    //this.ComponentManager = require("./src/core/component_manager");
    //this.LightComponentManager = require("./../xian-3d/component_managers/light_component_manager");
    //this.MeshAnimationComponentManager = require("./../xian-3d/component_managers/mesh_animation_component_manager");
    //this.MeshFilterComponentManager = require("./../xian-3d/component_managers/mesh_filter_component_manager");
    //this.SpriteComponentManager = require("././sprite_component_manager");
    //this.Transform2DComponentManager = require("././transform_2d_component_manager");
    //this.TransformComponentManager = require("././transform_component_manager");

    //this.ParticleSystem = require("././particle_system");
    this.AudioSource = require("./src/components/audio_source");
    this.Camera = require("./src/components/camera");
    this.Camera2D = require("./src/components/camera_2d");
    this.Component = require("./src/core/component");
    //this.GUIText = require("./../xian-2d/components/gui_text");
    //this.GUITexture = require("./../xian-2d/components/gui_texture");
    //this.Light = require("./../xian-3d/components/light");
    //this.MeshAnimation = require("./../xian-3d/components/mesh_animation");
    //this.MeshFilter = require("./../xian-3d/components/mesh_filter");
    //this.OrbitControl = require("./../xian-3d/components/orbit_control");
    //this.RigidBody2D = require("./../xian-2d/components/rigid_body_2d");
    this.Sprite = require("./src/components/sprite");
    this.Renderable2D = require("./src/components/renderable_2d");
    this.Sprite2D = require("./src/components/sprite_2d");
    //this.SpriteAnimation = require("./../xian-2d/components/sprite_animation");
    this.Transform = require("./src/components/transform");
    this.Transform2D = require("./src/components/transform_2d");
    //
    //this.BaseGame = require("./.././base_game");
    //this.ClientGame = require("./core/game/client_game");
    this.Game = require("./src/core/game");
    this.Config = require("./src/base/config");
    //this.Log = require("./src/context/log");
    //
    //this.GUIComponentManager = require("./core/gui/component_managers/gui_component_manager");
    //
    //this.GUIComponent = require("./core/gui/components/gui_component");
    //this.GUIContent = require("./core/gui/components/gui_content");
    //this.GUITransform = require("./core/gui/components/gui_transform");
    //
    //this.GUI = require("./core/gui/gui");
    //this.GUIObject = require("./core/gui/gui_object");
    //this.GUIStyle = require("./core/gui/gui_style");
    //this.GUIStyleState = require("./core/gui/gui_style_state");

    //this.Handler = require("./context/input/handler");
    //this.Input = require("./context/input");
    //
    //this.Canvas = require("./context/canvas");
    //this.RenderTarget = require("././render_target");
    //this.Renderer = require("./../xian-3d/context/render");
    //this.ShaderChunks = require("././shader_chunks");
    //
    //this.World = require("./core/world/world");
    //this.World2D = require("./core/world/world_2d");
    //
    this.Enums = require("./src/core/enums");
    this.GameObject = require("./src/core/game_object");
    this.Prefab = require("./src/core/prefab");
    this.Scene = require("./src/core/scene");
    //
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
