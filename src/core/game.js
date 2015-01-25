var Class = require("../base/class");
var EventEmitter = require('../base/event_emitter');
var Config = require("../base/config");
//var Scene = require("./scene");
var Context = require("../context/main_context");
var Log = Context.Log;
var Time = Context.Time;
var Loop = Context.Loop;
"use strict";

function Game(opts) {
    //opts || (opts = {});
    //Config.fromJSON(opts);

    EventEmitter.call(this);

    this._loop = new Loop(this.loop, this);

    this.scenes = [];
    this._sceneHash = {};
    this._sceneJSONHash = {};
    this._sceneNameHash = {};

    this.scene = undefined;

}

EventEmitter.extend(Game);

Game.prototype.init = function () {

    //this.canvas = new Canvas(opts.canvas);
    //this.render = new Renderer(opts.render);
    //canvas.init();
    //this.render.init(canvas);
    //Handler.setElement(canvas.element);

    Context.init();

    this.emit("init");

    return this;
};


Game.prototype.clear = function () {
    var scenes = this.scenes,
        i = scenes.length;

    if(this.scene) this.scene.destroy();
    this.scene = undefined;

    while (i--) this.removeScene(scenes[i], true);

    Context.clear();

    return this;
};


Game.prototype.destroy = function () {

    this.emit("destroy");
    this.clear();

    return this;
};

Game.prototype.start = function () {

    this.init();
    this._loop.resume();
    this.emit("start");

    return this;
};

Game.prototype.pause = function () {

    this._loop.pause();
    this.emit("pause");
    return this;
};


Game.prototype.resume = function () {

    this._loop.resume();
    this.emit("resume");
    return this;
};


Game.prototype.loop = function () {
    var scene = this.scene;

    Context.update();

    this.emit("update", Time.sinceStart);
    if (scene) {
        scene.emit("beforeUpdate");
        scene.update();
        scene.emit("afterUpdate");

        scene.emit("beforeRender");
        scene.render();
        scene.emit("afterRender");
    }
    this.emit("lateUpdate", Time.sinceStart);
};


Game.prototype.addScene = function (scene) {
    var sceneHash = this._sceneHash,
        sceneNameHash = this._sceneNameHash,
        name = scene.name,
        id = scene._id,
        json;

    if(!id) id = scene._id = this.scenes.length;
    if (!sceneNameHash[name] && !sceneHash[id]) {
        //if (!(scene instanceof Scene)) {
        if (scene._className !== 'Scene') {
            //Log.error("Game.addScene: can't add argument to Game, it's not an instance of Scene");
            //return this;
            json = scene;
            //if(!json._className) json._className = 'Scene';
        }
        else{
            json = scene.toJSON();
        }

        sceneNameHash[name] = json;
        sceneHash[id] = json;
        this.scenes.push(json);
        if (scene._jsonId && scene._jsonId !== -1) this._sceneJSONHash[scene._jsonId] = json;

        this.emit("addScene", name);
    } else {
        Log.error("Game.addScene: Scene is already a member of Game");
    }

    return this;
};


//Game.prototype.addScenes = function () {
//    var i, il;
//
//    for (i = 0, il = arguments.length; i < il; i++) this.addScene(arguments[i]);
//    return this;
//};


Game.prototype.removeScene = function (scene) {
    if (typeof(scene) === "string") {
        scene = this._sceneNameHash[scene];
    } else if (typeof(scene) === "number") {
        scene = this._sceneHash[scene];
    }
    var scenes = this.scenes,
        sceneHash = this._sceneHash,
        sceneNameHash = this._sceneNameHash,
        name = scene.name,
        id = scene._id,
        json;

    if (sceneNameHash[name] && sceneHash[id]) {
        json = sceneNameHash[name];

        sceneNameHash[name] = undefined;
        sceneHash[id] = undefined;
        scenes.splice(scenes.indexOf(json), 1);
        if (json._jsonId !== -1) this._sceneJSONHash[json._jsonId] = undefined;

        this.emit("removeScene", name);
    } else {
        Log.error("Game.removeScene: Scene not a member of Game");
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

        //scene = Class.fromJSON(scene);
        scene = Class.create('Scene').fromJSON(scene);
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

//Game.prototype.removeScenes = function () {
//    var i, il;
//
//    for (i = 0, il = arguments.length; i < il; i++) this.removeScene(arguments[i]);
//    return this;
//};


//Game.prototype.findSceneByName = function (name) {
//
//    return this._sceneNameHash[name];
//};
//
//
//Game.prototype.findSceneById = function (id) {
//
//    return this._sceneHash[id];
//};


//Game.prototype.findSceneByJSONId = function (id) {
//
//    return this._sceneJSONHash[id];
//};


module.exports = new Game;
