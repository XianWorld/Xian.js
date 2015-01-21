var Class = require("../base/class");
var GameObject = require("./game_object");
var System = require("./system");
var Log = require("../context/main_context").Log;
"use strict";


/**
 * Scenes manage GameObjects and their Components
 * @class Xian.Scene
 * @extends Xian.Class
 * @param Object options
 */
function Scene(opts) {
    //opts || (opts = {});

    Class.call(this);

    this.game = undefined;

    //this.name = opts.name !== undefined ? opts.name : "Scene_" + this._id;
    this.name = "Scene_" + this._id;

    //this.world = undefined;

    //root GameObject list
    //this.rootGameObjects = [];

    this.gameObjects = [];
    this._gameObjectHash = {};
    this._gameObjectJSONHash = {};
    //this._newGameObjects = [];

    this._systemTypeHash = {};
    this._systems = [];
    //this._newSystems = [];

    //this.componentManagers = {};
    //this._componentManagerTypes = [];
    this._componentHash = {};
    this._componentJSONHash = {};

    //this._newComponents = [];

    //this.mainCamera = undefined;
    //add systems
    //if (opts.systems) {
    //    this.addSystems.apply(this, opts.systems);
    //}
    //if (opts.gameObjects) this.addGameObjects.apply(this, opts.gameObjects);
}

Class.extend(Scene);

Scene.prototype.copy = function (other) {
      var otherGameObjects = other.gameObjects,
        i = otherGameObjects.length;

    this.clear();
    this.name = other.name + "." + this._id;

    while (i--) this.addGameObject(otherGameObjects[i].clone());

    return this;
};


Scene.prototype.init = function () {
    var systems = this._systems,
        gameObjects = this.gameObjects,
        //newComponents = this._newComponents,
        i, il, key, component;

    //this.world && this.world.init();

    var componentHash = this._componentHash;
    for (key in componentHash) {
        if (component = componentHash[key]){
            component.init();
            component.emit("init");
        }
    }

    //this._updateNewInit();

    for (i = 0, il = gameObjects.length; i < il; i++) gameObjects[i].emit("init");
    for (i = 0, il = systems.length; i < il; i++) {
        systems[i].init();
        systems[i].emit("init");
    }
};


Scene.prototype.start = function () {
    var systems = this._systems,
        gameObjects = this.gameObjects,
        newComponents = this._newComponents,
        i, il, key, component;

    //this.world && this.world.start();
    var componentHash = this._componentHash;
    for (key in componentHash) {
        if (component = componentHash[key]){
            component.start();
            component.emit("start");
        }
    }
    //this._updateNewStart();

    for (i = 0, il = gameObjects.length; i < il; i++) gameObjects[i].emit("start");
    for (i = 0, il = systems.length; i < il; i++) {
        systems[i].start();
        systems[i].emit("start", systems[i]);
    }
};

//Scene.prototype._updateNewInit = function () {
//    var systems = this._newSystems,
//        gameObjects = this._newGameObjects,
//        newComponents = this._newComponents,
//        len, i, il;
//
//    len = newComponents.length;
//    if (len > 0) {
//        for (i = 0, il = len; i < il; i++) {
//            newComponents[i].init();
//            newComponents[i].emit("init");
//        }
//    }
//    len = gameObjects.length;
//    if (len > 0) {
//        for (i = 0, il = len; i < il; i++) gameObjects[i].emit("init");
//    }
//    len = systems.length;
//    if (len > 0) {
//        for (i = 0, il = len; i < il; i++) {
//            systems[i].init();
//            systems[i].emit("init");
//        }
//    }
//
//};
//Scene.prototype._updateNewStart = function () {
//    var systems = this._newSystems,
//        gameObjects = this._newGameObjects,
//        newComponents = this._newComponents,
//        system, gameObject, component,
//        len, i, il;
//
//    len = newComponents.length;
//    if (len > 0) {
//        for (i = 0, il = len; i < il; i++) {
//            component = newComponents[i];
//            component.start();
//            component.emit("start", component);
//
//            //only when the component started then emit the start event
//            this.emit("start" + component._className, component);
//            this.emit("startComponent", component);
//        }
//        newComponents.length = 0;
//    }
//    len = gameObjects.length;
//    if (len > 0) {
//        for (i = 0, il = len; i < il; i++) {
//            gameObject = gameObjects[i];
//            gameObject.emit("start", gameObject);
//
//            ////only check the new-start gameobject for root
//            //if ((transform = gameObject.transform || gameObject.transform2d)) {
//            //    //add the root gameobject
//            //    if(transform.parent === undefined)
//            //        roots.push(gameObject);
//        }
//        gameObjects.length = 0;
//    }
//    len = systems.length;
//    if (len > 0) {
//        for (i = 0, il = len; i < il; i++) {
//            system = systems[i];
//            system.start();
//            system.emit("start", system);
//        }
//        systems.length = 0;
//    }
//};

Scene.prototype.update = function () {
    var systems = this._systems,
        system, i, il;

    //this.world && this.world.update();
    //this._updateNewInit();
    //this._updateNewStart();

    for (i = 0, il = systems.length; i < il; i++) {
        if ((system = systems[i])) system.update();
    }
};

Scene.prototype.render = function () {
    var systems = this._systems,
        system, i, il;

    for (i = 0, il = systems.length; i < il; i++) {
        if ((system = systems[i]))
            if (system.render)
                system.render();
    }
};

Scene.prototype.clear = function () {
    var gameObjects = this.gameObjects,
        i = gameObjects.length,
        systems = this._systems;

    //this.removeWorld();
    while (i--) this.removeGameObject(gameObjects[i], true);

    this.name = undefined;//opts.name !== undefined ? opts.name : "Scene_" + this._id;

    i = systems.length;
    while (i--) this.removeSystem(systems[i], true);

    this.off();

    return this;
};

Scene.prototype.destroy = function () {

    this.emit("destroy");
    this.clear();

    return this;
};

Scene.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);

    json.name = this.name;

    var systems = this._systems,
        jsonSystems = json.systems || (json.systems = []),
        system,
        i = systems.length;

    while (i--) {
        if ((system = systems[i])) jsonSystems[i] = system.toJSON(jsonSystems[i]);
    }

    //json.world = this.world.toJSON(json.world);

    var gameObjects = this.gameObjects,
        jsonGameObjects = json.gameObjects || (json.gameObjects = []),
        gameObject;

    i = gameObjects.length;

    while (i--) {
        if ((gameObject = gameObjects[i])) jsonGameObjects[i] = gameObject.toJSON(jsonGameObjects[i]);
    }

    return json;
};


Scene.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);

    this.name = json.name !== undefined ? json.name : "Scene_" + this._id;

    var jsonSystems = json.systems,
        system, jsonSystem,i;
    if(jsonSystems){
        i = jsonSystems.length;

        while (i--) {
            if (!(jsonSystem = jsonSystems[i])) continue;

            if ((system = this._systemTypeHash[jsonSystem._className])) {
                system.fromJSON(jsonSystem);
            } else {
                this.addSystem(Class.fromJSON(jsonSystem));
            }
        }
    }

    //if (this.world._className === json.world._className) {
    //    this.world.fromJSON(json.world);
    //} else {
    //    this.setWorld(Class.fromJSON(json.world));
    //}

    var jsonGameObjects = json.gameObjects,
        gameObject, jsonGameObject, len;

    if(jsonGameObjects){
        len = jsonGameObjects.length;

        //while (i--) {
        for (i = 0; i < len; i++) {
            if (!(jsonGameObject = jsonGameObjects[i])) continue;

            if ((gameObject = this._gameObjectJSONHash[jsonGameObject._id])) {
                gameObject.fromJSON(jsonGameObject);
            } else {
                this.addGameObject(Class.fromJSON(jsonGameObject));
            }
        }
    }

    return this;
};


Scene.prototype.addGameObject = function (gameObject) {
    if (!(gameObject instanceof GameObject)) {
        Log.error("Scene.addGameObject: can't add argument to Scene, it's not an instance of GameObject");
        return this;
    }
    var gameObjects = this.gameObjects,
    //roots = this.rootGameObjects,
        index = gameObjects.indexOf(gameObject),
        components, transform, children, child,
        i, len;

    if (index === -1) {
        if (gameObject.scene) gameObject.scene.removeGameObject(gameObject);

        gameObjects.push(gameObject);
        this._gameObjectHash[gameObject._id] = gameObject;
        if (gameObject._jsonId !== -1) this._gameObjectJSONHash[gameObject._jsonId] = gameObject;

        gameObject.scene = this;

        components = gameObject.components;
        i = components.length;
        while (i--) this._addComponent(components[i]);

        if ((transform = gameObject.transform/* || gameObject.transform2d*/)) {

            len = (children = transform.children).length;

            //while (i--) {
            for (i = 0; i < len; i++) {
                if ((child = children[i].gameObject) && !this.hasGameObject(child)) {
                    this.addGameObject(child);
                }
            }
        }

        //this._newGameObjects.push(gameObject);
        if (this.game) gameObject.emit("init");
        this.emit("addGameObject", gameObject);
    } else {
        Log.error("Scene.addGameObject: GameObject is already a member of Scene");
    }

    return this;
};


Scene.prototype.addGameObjects = function () {
    var i = 0,
        il = arguments.length;

    for (; i < il; i++) this.addGameObject(arguments[i]);
    return this;
};

Scene.prototype.removeGameObject = function (gameObject, clear) {
    if (!(gameObject instanceof GameObject)) {
        Log.error("Scene.removeGameObject: can't remove argument from Scene, it's not an instance of GameObject");
        return this;
    }
    var gameObjects = this.gameObjects,
    //roots = this.rootGameObjects,
        index = gameObjects.indexOf(gameObject),
        components, transform, children, child,
        i;

    if (index !== -1) {

        gameObjects.splice(index, 1);
        this._gameObjectHash[gameObject._id] = undefined;
        if (gameObject._jsonId !== -1) this._gameObjectJSONHash[gameObject._jsonId] = undefined;

        components = gameObject.components;
        i = components.length;
        while (i--) this._removeComponent(components[i], clear);

        if ((transform = gameObject.transform/* || gameObject.transform2d*/)) {
            //remove the root gameobject
            //if(transform.parent === undefined){
            //    i = roots.indexOf(gameObject);
            //    if(i !== -1) roots.splice(i, 1);
            //}

            //disattach the removed gameobject's transform from it's parent when it's parent is in the scene
            if (transform.parent && transform.parent.gameObject.scene) {
                transform.parent.removeChild(transform);
            }

            i = (children = transform.children).length;

            while (i--) {
                if ((child = children[i].gameObject) && this.hasGameObject(child)) {
                    this.removeGameObject(child);
                }
            }
        }

        //i = this._newGameObjects.indexOf(gameObject);
        //if (i !== -1)
        //    this._newGameObjects.splice(i, 1);

        this.emit("removeGameObject", gameObject);
        gameObject.emit("remove", gameObject);
        if (clear) gameObject.destroy();
        gameObject.scene = undefined;
    } else {
        Log.error("Scene.removeGameObject: GameObject is not a member of Scene");
    }

    return this;
};

Scene.prototype.removeGameObjects = function () {
    var i = 0,
        il = arguments.length;

    for (; i < il; i++) this.removeGameObject(arguments[i]);
    return this;
};


Scene.prototype.hasGameObject = function (gameObject) {

    return !!~this.gameObjects.indexOf(gameObject);
};

Scene.prototype.findByTag = function (tag, out) {
    out || (out = []);
    var gameObjects = this.gameObjects,
        gameObject, len = gameObjects.length, i;

    //while (i--) {
    for(i=0;i<len;i++){
        if ((gameObject = gameObjects[i]).hasTag(tag)) out.push(gameObject);
    }

    return out;
};


Scene.prototype.findByTagFirst = function (tag) {
    var gameObjects = this.gameObjects,
        gameObject, len = gameObjects.length, i;

    //while (i--) {
    for(i=0;i<len;i++){
        if ((gameObject = gameObjects[i]).hasTag(tag)) return gameObject;
    }

    return undefined;
};


Scene.prototype.findById = function (id) {

    return this._gameObjectHash[id];
};


Scene.prototype.findByJSONId = function (id) {

    return this._gameObjectJSONHash[id];
};

Scene.prototype.find = function (name) {
    var gameObjects = this.gameObjects,
        child, i = gameObjects.length;

    while (i--) {
        child = gameObjects[i];

        if (child.name === name) return child;
        //All GO was saved in the gameObjects!
        //if ((child = child.find(name))) return child;
    }

    return undefined;
};

Scene.prototype._addComponent = function (component) {
    if (!component) return;
    var type = component._className;//_type;
    //componentManagers = this.componentManagers,
    //componentManager = componentManagers[type],
    //componentManagerTypes = this._componentManagerTypes,
    //isNew = !componentManager;

    //if (isNew) {
    //    var classType = Class._classes[type + "ComponentManager"] || ComponentManager;
    //    componentManager = componentManagers[type] = new classType;
    //    //componentManager = componentManagers[type] = new (Class._classes[type + "ComponentManager"] || ComponentManager);
    //    componentManagerTypes.push(componentManager);
    //    componentManagerTypes.sort(sortComponentManagerTypes);
    //    componentManager.scene = this;
    //}
    //
    //componentManager.add(component);
    //componentManager.sort();

    this._componentHash[component._id] = component;
    if (component._jsonId !== -1) this._componentJSONHash[component._jsonId] = component;

    //if (component._comp_state === undefined) {
    //    this._newComponents.push(component);
    //}

    this.emit("add" + type, component);
    this.emit("addComponent", component);
    component.emit("addToScene");

    if (this.game) {
        component.init();
        component.emit("init");
        component.start();
        component.emit("start");
        //component.update();
    }
};

Scene.prototype._removeComponent = function (component, clear) {
    if (!component) return;
    var type = component._className;//_type;
    //componentManagers = this.componentManagers,
    //componentManager = componentManagers[type],
    //componentManagerTypes = this._componentManagerTypes;

    //componentManager.remove(component);
    this._componentHash[component._id] = undefined;
    if (component._jsonId !== -1) this._componentJSONHash[component._jsonId] = undefined;
    //
    //if (componentManager.empty()) {
    //    componentManagers[type] = undefined;
    //    componentManagerTypes.splice(componentManagerTypes.indexOf(componentManager), 1);
    //    componentManager.scene = undefined;
    //}

    //if (component._comp_state === undefined) {
    //    var index = this._newComponents.indexOf(component);
    //    if (index !== -1) this._newComponents.splice(index, 1);
    //}

    this.emit("remove" + type, component);
    this.emit("removeComponent", component);
    component.emit("removeFromScene");

    if (clear) component.destroy();
};

Scene.prototype.findComponentById = function (id) {

    return this._componentHash[id];
};


Scene.prototype.findComponentByJSONId = function (id) {

    return this._componentJSONHash[id];
};

Scene.prototype.addSystem = function (system) {
    if (!system) return this;

    if (!(system instanceof System)) {
        Log.error("Scene.addSystem: can't add argument to Scene, it's not an instance of System");
        return this;
    }
    var systemTypeHash = this._systemTypeHash,
        systems = this._systems;

    systemTypeHash[system._className] = system;
    systems.push(system);
    systems.sort(sortSystemList);
    system.scene = this;

    //this._newSystems.push(system);

    this.emit("addSystem", system);
    if(this.game){
        system.init();
        system.emit("init");
        system.start();
        system.emit("start");
    }

    return this;
};

Scene.prototype.addSystems = function () {
    var i = 0,
        il = arguments.length;

    for (; i < il; i++) this.addSystem(arguments[i]);
    return this;
};

Scene.prototype.removeSystem = function (system, clear) {
    if (!system) return this;

    if (!(system instanceof System)) {
        Log.error("Scene.removeSystem: can't remove argument from Scene, it's not an instance of System");
        return this;
    }
    var systemTypeHash = this._systemTypeHash,
        systems = this._systems,
        index = systems.indexOf(system);

    if (index !== -1) {
        systemTypeHash[system._className] = undefined;
        systems.splice(index, 1);

        //index = this._newSystems.indexOf(system);
        //if (index !== -1) this._newSystems.splice(index, 1);

        this.emit("removeSystem", system);
        if (clear) system.destroy();
        system.scene = undefined;
    } else {
        Log.error("Scene.removeSystem: System is not a member of Scene");
    }
    return this;
};

Scene.prototype.removeSystems = function () {
    var i = 0,
        il = arguments.length;

    for (; i < il; i++) this.removeSystem(arguments[i]);
    return this;
};

function sortSystemList(a, b) {

    return a.order - b.order;
}

Scene.prototype.getSystem = function (name) {
    return this._systemTypeHash[name];
};

module.exports = Scene;
