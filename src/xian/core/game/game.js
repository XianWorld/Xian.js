var Class = require("../../base/class");
var Device = require("../../base/device");
var Time = require("../../base/time");
var Mathf = require("../../math/mathf");
var Config = require("./../../base/config");
var BaseGame = require("./base_game");
var Canvas = require("../renderer/canvas");
var Renderer = require("../renderer/renderer");
var GameObject = require("../game_object");
var Component = require("../components/component");
var Scene = require("../scene");
var Input = require("../input/input");
var Handler = require("../input/handler");
var Log = require("./../../base/log");
"use strict";


function Game(opts) {
    opts || (opts = {});
    Config.fromJSON(opts);

    BaseGame.call(this);

    this._handler = Handler;
    this.input = Input;

    this.gui = undefined;

    this.scene = undefined;
    this.camera = undefined;

    this.canvas = new Canvas(opts.canvas);
    this.renderer = new Renderer(opts.renderer);
}

BaseGame.extend(Game);


Game.prototype.init = function () {
    var canvas = this.canvas;

    canvas.init();
    this.renderer.init(canvas);
    Handler.setElement(canvas.element);

    this._loop.resume();
    this.emit("init");

    return this;
};


Game.prototype.start = function () {

    this.init();
    this.emit("start");

    return this;
};


Game.prototype.setGUI = function (gui) {
    if (typeof(gui) === "string") {
        gui = this._guiNameHash[gui];
    } else if (typeof(gui) === "number") {
        gui = this.guis[gui];
    }

    if (this._guiNameHash[gui.name] && this._guiHash[gui._id]) {
        if (this.gui) this.gui.destroy();

        gui = Class.fromJSON(gui);
        this.gui = gui;

        gui.game = this;

        gui.init();
        gui.emit("init");

        gui.start();
        gui.emit("start");

        this.emit("setGUI", this.gui);
    } else {
        Log.error("Game.setGUI: GUI is not a member of Game");
    }

    return this;
};


Game.prototype.setScene = function (scene) {
    if (typeof(scene) === "string") {
        scene = this._sceneNameHash[scene];
    } else if (typeof(scene) === "number") {
        scene = this.scenes[scene];
    }

    if (this._sceneNameHash[scene.name] && this._sceneHash[scene._id]) {
        if (this.scene) this.scene.destroy();

        scene = Class.fromJSON(scene);
        this.scene = scene;

        scene.game = this;

        scene.init();
        scene.emit("init");

        scene.start();
        scene.emit("start");

        this.emit("setScene", this.scene);
    } else {
        Log.error("Game.setScene: Scene is not a member of Game");
    }

    return this;
};


Game.prototype.setCamera = function (gameObject) {
    if (!(gameObject instanceof GameObject)) {
        Log.error("Game.setCamera: can't set argument to Game's Active Camera, it's not an instance of GameObject");
        return this;
    }
    var scene = this.scene,
        lastCamera = this.camera,
        index;

    if (!scene) {
        Log.error("Game.setCamera: can't set camera without an active scene, use Game.setScene first");
        return this;
    }

    index = scene.gameObjects.indexOf(gameObject);
    if (index === -1) {
        Log.warn("Game.setCamera: GameObject is not a member of the active Scene, adding it...");
        scene.addGameObject(gameObject);
    }

    this.camera = gameObject.camera || gameObject.camera2d;

    if (this.camera) {
        this.camera._active = true;
        if (lastCamera) lastCamera._active = false;

        this.emit("setCamera", this.camera);
    } else {
        Log.error("Game.setCamera: GameObject does't have a Camera or a Camera2D Component");
    }

    return this;
};


Game.prototype.loop = function () {
    var camera = this.camera,
        scene = this.scene,
        gui = this.gui,
        renderer = this.renderer;

    Time.update();
    Input.update();

    this.emit("update", Time.sinceStart);
    if (renderer && camera) {

        if (scene) {
            scene.update();
            scene.emit("update");
        }
        if (gui) {
            gui.aspect = camera.aspect;
            gui.width = camera.width;
            gui.height = camera.height;
            gui.invWidth = camera.invWidth;
            gui.invHeight = camera.invHeight;

            gui.update();
            gui.emit("update");
        }

        renderer.render(camera, scene, gui);
    }
    this.emit("lateUpdate", Time.sinceStart);
}


module.exports = Game;
