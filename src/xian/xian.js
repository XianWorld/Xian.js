"use strict";


var Device = require("./base/device"),
    Time = require("./base/time"),
    now = Time.now,

    IS_SERVER = !(typeof(window) !== "undefined" && window.document),
    IS_CLIENT = !IS_SERVER,

    defineProperty = Object.defineProperty;


if (Device.mobile) {
    window.onerror = function (message, page, line) {
        alert("line: " + line + ", page: " + page + "\nmessage: " + message);
    };
}


/**
 * Holds all accessible Classes
 * @class Xian
 */
function Xian() {

    this.Phys2D = require("./phys2d/phys2d");

    this.AudioCtx = require("./base/audio_ctx");
    this.Class = require("./base/class");
    this.Device = require("./base/device");
    this.Dom = require("./base/dom");
    this.Enum = require("./base/enum");
    this.EventEmitter = require("./base/event_emitter");
    this.ObjectPool = require("./base/object_pool");
    this.requestAnimationFrame = require("./base/request_animation_frame");
    this.io = require("./base/socket.io");
    this.Time = require("./base/time");
    this.util = require("./base/util");
    //
    this.Shader = require("./core/assets/shaders/shader");
    this.ShaderLib = require("./core/assets/shaders/shader_lib");
    this.Asset = require("./core/assets/asset");
    this.AssetLoader = require("./core/assets/asset_loader");
    this.Assets = require("./core/assets/assets");
    this.AudioClip = require("./core/assets/audio_clip");
    this.Material = require("./core/assets/material");
    this.Mesh = require("./core/assets/mesh");
    this.SpriteSheet = require("./core/assets/sprite_sheet");
    this.Texture = require("./core/assets/texture");
    this.TextureCube = require("./core/assets/texture_cube");
    //
    this.BoneComponentManager = require("./core/component_managers/bone_component_manager");
    this.Camera2DComponentManager = require("./core/component_managers/camera_2d_component_manager");
    this.CameraComponentManager = require("./core/component_managers/camera_component_manager");
    this.ComponentManager = require("./core/component_managers/component_manager");
    this.LightComponentManager = require("./core/component_managers/light_component_manager");
    this.MeshAnimationComponentManager = require("./core/component_managers/mesh_animation_component_manager");
    this.MeshFilterComponentManager = require("./core/component_managers/mesh_filter_component_manager");
    this.SpriteComponentManager = require("./core/component_managers/sprite_component_manager");
    this.Transform2DComponentManager = require("./core/component_managers/transform_2d_component_manager");
    this.TransformComponentManager = require("./core/component_managers/transform_component_manager");

    this.ParticleSystem = require("./core/components/particle_system/particle_system");
    this.AudioSource = require("./core/components/audio_source");
    this.Camera = require("./core/components/camera");
    this.Camera2D = require("./core/components/camera_2d");
    this.Component = require("./core/components/component");
    this.GUIText = require("./core/components/gui_text");
    this.GUITexture = require("./core/components/gui_texture");
    this.Light = require("./core/components/light");
    this.MeshAnimation = require("./core/components/mesh_animation");
    this.MeshFilter = require("./core/components/mesh_filter");
    this.OrbitControl = require("./core/components/orbit_control");
    this.RigidBody2D = require("./core/components/rigid_body_2d");
    this.Sprite = require("./core/components/sprite");
    this.SpriteAnimation = require("./core/components/sprite_animation");
    this.Transform = require("./core/components/transform");
    this.Transform2D = require("./core/components/transform_2d");
    //
    this.BaseGame = require("./core/game/base_game");
    //this.ClientGame = require("./core/game/client_game");
    this.Game = require("./core/game/game");
    this.Config = require("./base/config");
    this.Log = require("./base/log");
    //
    this.GUIComponentManager = require("./core/gui/component_managers/gui_component_manager");

    this.GUIComponent = require("./core/gui/components/gui_component");
    //this.GUIContent = require("./core/gui/components/gui_content");
    this.GUITransform = require("./core/gui/components/gui_transform");
    //
    this.GUI = require("./core/gui/gui");
    this.GUIObject = require("./core/gui/gui_object");
    //this.GUIStyle = require("./core/gui/gui_style");
    //this.GUIStyleState = require("./core/gui/gui_style_state");
    //
    this.Handler = require("./core/input/handler");
    this.Input = require("./core/input/input");
    //
    this.Canvas = require("./core/renderer/canvas");
    this.RenderTarget = require("./core/renderer/render_target");
    this.Renderer = require("./core/renderer/renderer");
    this.ShaderChunks = require("./core/renderer/shader_chunks");

    this.World = require("./core/world/world");
    this.World2D = require("./core/world/world_2d");
    //
    this.Enums = require("./core/enums");
    this.GameObject = require("./core/game_object");
    this.Prefab = require("./core/prefab");
    this.Scene = require("./core/scene");
    //
    this.AABB2 = require("./math/aabb2");
    this.AABB3 = require("./math/aabb3");
    this.Color = require("./math/color");
    this.Mat2 = require("./math/mat2");
    this.Mat3 = require("./math/mat3");
    this.Mat32 = require("./math/mat32");
    this.Mat4 = require("./math/mat4");
    this.Mathf = require("./math/mathf");
    this.Quat = require("./math/quat");
    this.Rect = require("./math/rect");
    this.RectOffset = require("./math/rect_offset");
    this.Vec2 = require("./math/vec2");
    this.Vec3 = require("./math/vec3");
    this.Vec4 = require("./math/vec4");
}


defineProperty(Xian.prototype, "isServer", {
    get: function () {
        return IS_SERVER;
    }
});


defineProperty(Xian.prototype, "isClient", {
    get: function () {
        return IS_CLIENT;
    }
});


/**
 * attaches Xian to window/global and all subclasses
 */
Xian.prototype.globalize = function () {

    for (var key in this) window[key] = this[key];
    window.Xian = this;
};

/**
 * benchmarks function console.logs number of operations / second
 * @param String name
 * @param Function fn
 */
Xian.prototype.benchmark = function (name, fn, times) {
    times || (times = 1000);
    var start = 0.0,
        time = 0.0,
        i = times;

    while (i--) {
        start = now();
        fn();
        time += now() - start;
    }

    console.log(name + ":\n\t" + times / time + " (ops/sec)\n\t" + time / times + "(avg/call)");
};


module.exports = new Xian();
