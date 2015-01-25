"use strict";

/**
 * Holds all accessible Classes
 * @class Xian
 */
function Xian() {

    //base
    this.Class = require("./src/base/class");
    this.Enum = require("./src/base/enum");
    this.EventEmitter = require("./src/base/event_emitter");
    this.util = require("./src/base/util");
    this.Config = require("./src/base/config");
    this.Enums = require("./src/base/enums");

    //context
    this.MainContext = require("./src/context/main_context");
    //context/screen
    //this.ResolutionPolicy = require("./src/context/screen/ResolutionPolicy");
    //this.ContainerStrategy = require("./src/context/screen/container_strategy");
    //this.ContentStrategy = require("./src/context/screen/content_strategy");
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
    //context/assets
    this.Asset = require("./src/context/assets/asset");
    this.AssetLoader = require("./src/context/assets/asset_loader");
    this.AssetLoaderLib = require("./src/context/assets/asset_loader_lib");
    this.AudioClip = require("./src/context/assets/audio_clip");
    this.Texture = require("./src/context/assets/texture");
    this.RenderTexture = require("./src/context/assets/render_texture");
    this.JsonData = require("./src/context/assets/json_data");
    this.Prefab = require("./src/context/assets/prefab");
    this.Module = require("./src/context/assets/module");
    this.BitmapFont = require("./src/context/assets/bitmap_font");
    //context/render
    //this.RendererLib = require("./src/context/graphics/renderer_lib");

    //components
    this.AudioSource = require("./src/components/audio_source");
    this.Camera = require("./src/components/camera");
    this.Component = require("./src/core/component");
    //this.Sprite = require("./src/components/sprite");
    this.Transform = require("./src/components/transform");
    this.Behaviour = require("./src/components/behaviour");

    //behaviours
    this.AssetAgent = require("./src/components/asset_agent");

    //core
    this.Game = require("./src/core/game");
    this.GameObject = require("./src/core/game_object");
    this.Scene = require("./src/core/scene");
    this.System = require("./src/core/system");

    //systems
    this.ComponentSystem = require("./src/systems/component_system");
    this.TransformSystem = require("./src/systems/transform_system");
    this.BehaviourSystem = require("./src/systems/behaviour_system");
    //this.AssetSystem = require("./src/systems/asset_system");

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

    //xian2d/base
    this.Enums2D = require("./src/xian2d/base/enums_2d");
    //xian2d/contexts
    //this.XianShader = require("./src/xian2d/context/renderer/shaders/xian_shader");
    this.FilterLib = require("./src/xian2d/context/graphics/g2d/webgl/filters/FilterLib");
    //register renderer lib
    //var CanvasRenderer2D = require("./src/xian2d/context/renderer/canvas_renderer_2d");
    //var WebGLRenderer2D = require("./src/xian2d/context/renderer/webgl_renderer_2d");
    var CanvasRenderContext2D = require("./src/xian2d/context/graphics/g2d/canvas/canvas_render_context_2d");
    var WebGLRenderContext2D = require("./src/xian2d/context/graphics/g2d/webgl/webgl_render_context_2d");
    this.MainContext.GraphicsContext.setRenderContext("2d", CanvasRenderContext2D, WebGLRenderContext2D);
    this.Sprite2DData = require("./src/xian2d/context/graphics/g2d/sprite_2d_data");
    this.GraphicsData = require("./src/xian2d/context/graphics/g2d/graphics_data");
    this.GraphicsShapeData = require("./src/xian2d/context/graphics/g2d/graphics_shape_data");

    //xian2d/context/assets
    this.TextureClipData = require("./src/xian2d/context/assets/texture_clip_data");
    this.SpriteSheet = require("./src/xian2d/context/assets/sprite_sheet");
    //register asset loaders
    var SpriteSheetLoader = require("./src/xian2d/context/assets/sprite_sheet_loader");
    this.AssetLoaderLib.registerLoader("json", "SpriteSheet", SpriteSheetLoader);
    this.Phys2D = require("./src/xian2d/context/phys2d/phys2d");

    //xian2d/components
    this.Transform2D = require("./src/xian2d/components/transform_2d");
    this.Camera2D = require("./src/xian2d/components/camera_2d");
    //this.Renderer2D = require("./src/xian2d/context/renderer/canvas_renderer_2d");
    this.Renderer2D = require("./src/xian2d/components/renderer_2d");
    this.Renderable2D = require("./src/xian2d/components/renderable_2d");
    this.Sprite2D = require("./src/xian2d/components/sprite_2d");
    this.TilingSprite2D = require("./src/xian2d/components/tiling_sprite_2d");
    this.Graphics = require("./src/xian2d/components/graphics");
    this.Text2D = require("./src/xian2d/components/text_2d");
    this.RigidBody2D = require("./src/xian2d/components/rigid_body_2d");

    //xian2d systems
    this.Render2DSystem = require("./src/xian2d/systems/render_2d_system");
    this.Transform2DSystem = require("./src/xian2d/systems/transform_2d_system");
    this.Phys2DSystem = require("./src/xian2d/systems/phys_2d_system");

}

/**
 * attaches Xian to window/global and all subclasses
 */
Xian.prototype.globalize = function () {

    for (var key in this) window[key] = this[key];
    window.Xian = this;
};

module.exports = new Xian();
