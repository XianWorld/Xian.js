var Class = require("../base/class");
var Game = require("./game");
var Component = require("./component");
var Prefab = require("../context/assets/prefab");
var Log = require("../context/main_context").Log;
"use strict";

function GameObject() {

    Class.call(this);

    this.name = "GameObject_" + this._id;

    this._activeSelf = true;
    this.activeInHierarchy = true;

    this.scene = undefined;

    this.tags = [];

    this.components = [];
    //this._componentType = {};
    this._componentHash = {};
    this._componentJSONHash = {};
    this._componentClassTypes = {};
}

Class.extend(GameObject);

Object.defineProperty(GameObject.prototype, "activeSelf", {
   get: function(){
        return this._activeSelf;
   }
});

GameObject.prototype.setActive = function (active) {
    if(this._activeSelf === active) return;

    this._activeSelf = active;
    this.updateActive();
};

GameObject.prototype.updateActive = function() {

    var transform = this.transform,
        children, child, i;

    if (!transform) return;

    var parentActive = transform.parent ? transform.parent.gameObject.activeInHierarchy : true;
    this.activeInHierarchy = parentActive && this._activeSelf;

    children = transform.children;
    i = children.length;

    while (i--) {
        child = children[i];

        //child.gameObject._activeParent = gameObject.activeInHierarchy;
        child.gameObject.updateActive();
    }
};

GameObject.prototype.copy = function (other) {
    var components = this.components,
        otherComponents = other.components,
        tags = other.tags,
        otherComponent, component,
        i = components.length;

    while (i--) {
        component = components[i];
        this.removeComponent(component);
    }

    var len = otherComponents.length;
    for (i = 0; i < len; i++) {
        otherComponent = otherComponents[i];

        this.addComponent(otherComponent.clone());
    }

    i = this.tags.length;
    while (i--) this.removeTag(tags[i]);

    i = tags.length;
    while (i--) this.addTag(tags[i]);

    return this;
};


GameObject.prototype.clear = function () {
    var components = this.components,
        tags = this.tags,
        componentLength = components.length,
        i;

    if(this.scene){
        this.scene.removeGameObject(this);
        this.scene = undefined;
    }
    i = componentLength;
    while (i--) components[i].destroy();

    i = tags.length;
    while (i--) this.removeTag(tags[i]);

    //i = componentLength;
    //while (i--) this.removeComponent(components[i]);

    this.off();

    return this;
};

GameObject.prototype.destroy = function () {
    this.emit("destroy");
    this.clear();
    this.tags = undefined;
    this.components = undefined;
    this._componentHash = undefined;
    this._componentJSONHash = undefined;
    this._componentClassTypes = undefined;
    return this;
};

GameObject.prototype.remove = function () {
    if (!this.scene) {
        Log.error("GameObject.remove: can't remove GameObject if it's not added to a Scene");
        return this;
    }
    this.scene.removeGameObject(this);
    this.scene = undefined;
    return this;
};

GameObject.prototype.addTag = function (tag) {
    var tags = this.tags;
    if (tags.indexOf(tag) === -1) tags.push(tag);
    return this;
};


GameObject.prototype.addTags = function () {
    var i = arguments.length;
    while (i--) this.addTag(arguments[i]);
    return this;
};


GameObject.prototype.removeTag = function (tag) {
    var tags = this.tags,
        index = tags.indexOf(tag);
    if (index !== -1) tags.splice(index, 1);
    return this;
};

GameObject.prototype.removeTags = function () {
    var i = arguments.length;
    while (i--) this.removeTag(arguments[i]);
    return this;
};

GameObject.prototype.hasTag = function (tag) {
    return this.tags.indexOf(tag) !== -1;
};

GameObject.prototype.addComponent = function (component, others) {
    if (typeof(component) === "string") component = Class.create(component);
    if (typeof(component) === "function") component = new component;
    if (!(component instanceof Component)) {
        Log.error("GameObject.addComponent: can't add passed argument, it is not an instance of Component");
        return undefined;
    }
    var name = component._name,
        components = this.components,
        comp, i, j;

    //if component existed, try to find a unique name by ascending key.
    if (this[name]) {
        var tempName = name;
        var tempNum = 0;
        while (this[tempName]) {
            tempName = name + "_" + tempNum;
            tempNum++;
        }
        name = component._name = tempName;
    }

    if (!this[name]) {
        if (component.gameObject) component = component.clone();

        components.push(component);
        //this._componentType[component._type] = component;
        this._componentHash[component._id] = component;
        if (component._jsonId !== -1) this._componentJSONHash[component._jsonId] = component;

        var classType = component._className;//prototype.constructor;
        var tempComponents = this._componentClassTypes[classType];
        if (tempComponents === undefined) {
            tempComponents = this._componentClassTypes[classType] = [];
        }
        tempComponents.push(component);

        component.gameObject = this;
        this[name] = component;

        //if (!others) {
        //    i = components.length;
        //    while (i--) {
        //        comp = components[i];
        //        if (!comp) continue;
        //
        //        j = components.length;
        //        while (j--) comp[components[j]._name] = components[j];
        //    }
        //
        //    //component.init();
        //    //component.emit("init");
        //}

        this.emit("add" + component._className, component);
        this.emit("addComponent", component);
        component.emit("add", this);

        if (this.scene) this.scene._addComponent(component);

        return component;
    } else {
        Log.error("GameObject.addComponent: GameObject already has a(n) " + name + " named Component");
    }

    return undefined;
};


GameObject.prototype.addComponents = function () {
    var length = arguments.length,
        components = this.components,
        component, name,
        i, j;

    //i = length;
    for (i = 0; i < length; i++) this.addComponent(arguments[i], true);

    //i = components.length;
    //while (i--) {
    //    component = components[i];
    //    if (!component) continue;
    //
    //    j = components.length;
    //    while (j--) {
    //        name = components[j]._name;
    //        component[name] = components[j];
    //    }
    //}

    //i = components.length;
    //while (i--) {
    //    component = components[i];
    //    component.init();
    //    component.emit("init");
    //}

    return this;
};

GameObject.prototype.removeComponent = function (component, clear) {
    if (typeof(component) === "string") component = this.getComponent(component);
    if (!(component instanceof Component)) {
        Log.error("GameObject.removeComponent: can't remove passed argument, it is not an instance of Component");
        return this;
    }
    var name = component._name,
        components = this.components,
        comp, i, j;

    if (this[name]) {
        component.emit("remove", this);
        this.emit("remove" + component._className, component);
        this.emit("removeComponent", component);

        //if (!others) {
        //    i = components.length;
        //    while (i--) {
        //        comp = components[i];
        //        if (!comp) continue;
        //
        //        j = components.length;
        //        while (j--) {
        //            if (name === components[j]._name) comp[name] = undefined;
        //        }
        //    }
        //}

        components.splice(components.indexOf(component), 1);
        //this._componentType[component._type] = undefined;
        this._componentHash[component._id] = undefined;
        if (component._jsonId !== -1) this._componentJSONHash[component._jsonId] = undefined;

        var classType = component._className;//prototype.constructor;
        var tempComponents = this._componentClassTypes[classType];
        if (tempComponents !== undefined) {
            var index = tempComponents.indexOf(component);
            if (index !== -1) {
                tempComponents.splice(index, 1);
            }
            if (tempComponents.length === 0) {
                this._componentClassTypes[classType] = undefined;
            }
        }

        this[name] = undefined;

        if (this.scene) this.scene._removeComponent(component);
        if (clear) component.destroy();
        component.gameObject = undefined;
    } else {
        Log.error("GameObject.removeComponent: GameObject does not have a(n) " + type + " Component");
    }

    return this;
};


GameObject.prototype.removeComponents = function (clear) {
    var length = arguments.length,
        components = this.components,
        toRemove = arguments,
        component, name,
        i, j;

    i = length;
    while (i--) this.removeComponent(arguments[i], clear);

    //i = components.length;
    //while (i--) {
    //    component = components[i];
    //    if (!component) continue;
    //
    //    name = component._name;
    //    j = toRemove.length;
    //    while (j--) {
    //        if (name === toRemove[i]._name) component[name] = undefined;
    //    }
    //}

    return this;
};


//GameObject.prototype.getComponent = function (type) {
//
//    return this._componentType[type];
//};
GameObject.prototype.getComponent = function (type, inherit) {
    var components, len, i, component;

    if (!inherit) {
        if (typeof(type) === "function") type = type._className;

        components = this._componentClassTypes[type];
        return components === undefined ? undefined : components[0];
    }
    else {
        if (typeof(type) === "string") type = Class._classes[type];

        components = this.components;
        len = components.length;
        for (i = 0; i < len; i++) {
            component = components[i];
            if (component instanceof type) return component;
        }
        return undefined;
    }
};

GameObject.prototype.getComponents = function (type, inherit, results) {
    var components, len, i, component;

    if (!inherit) {
        if (typeof(type) === "function") type = type._className;

        components = this._componentClassTypes[type];
        return components;
    }
    else {
        if (typeof(type) === "string") type = Class._classes[type];

        components = this.components;
        results = results || [];
        len = components.length;
        for (i = 0; i < len; i++) {
            component = components[i];
            if (component instanceof type) results.push(component);
        }
        return results;
    }
};

GameObject.prototype.hasComponent = function (type, inherit) {
    //var components = this.components,
    //    i = components.length;
    //
    //while (i--) {
    //    if (components[i]._type === type) return true;
    //}
    //
    //return false;

    return this.getComponent(type, inherit) !== undefined;
};

GameObject.prototype.find = function (name) {
    var transform = this.transform,// || this.transform2d,
        children, child, i;

    if (!transform) return undefined;

    children = transform.children;
    i = children.length;

    while (i--) {
        child = children[i];

        if (child.gameObject.name === name) return child.gameObject;
        if ((child = child.find(name))) return child;
    }

    return undefined;
};


GameObject.prototype.getComponentById = function (id) {

    return this._componentHash[id];
};


GameObject.prototype.getComponentByJSONId = function (id) {

    return this._componentJSONHash[id];
};

GameObject.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);
    var components = this.components,
        jsonComponents = json.components || (json.components = []),
        tags = this.tags,
        jsonTags = json.tags || (json.tags = []),
        component,
        i = components.length;

    json.name = this.name;
    json.active = this._activeSelf;

    while (i--) {
        if ((component = components[i]).json) jsonComponents[i] = component.toJSON(jsonComponents[i]);
    }
    i = tags.length;
    while (i--) jsonTags[i] = tags[i];


    return json;
};


GameObject.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);
    var components = this.components,
        jsonComponents = json.components || (json.components = []),
        component, jsonComponent, tag,
        tags = this.tags,
        jsonTags = json.tags || (json.tags = []),
        i = components.length,
        has, type, j;

    this.name = json.name || "GameObject_" + this._id;
    this._activeSelf = json.active || true;
    this.activeInHierarchy = this._activeSelf;

    //destroy all exist components
    while (i--) {
        component = components[i];
        component.destroy();
        //this.removeComponent(component);
    }

    var len = jsonComponents.length;
    for (i = 0; i < len; i++) {
        if (!(jsonComponent = jsonComponents[i])) continue;

        this.addComponent(Class.fromJSON(jsonComponent));
    }

    i = tags.length;
    while (i--) this.removeTag(tags[i]);

    i = jsonTags.length;
    while (i--) {
        if (tags.indexOf((tag = jsonTags[i])) === -1) tags.push(tag);
    }

    return this;
};

//Unity3D like static functions of GameObject
GameObject.Find = function (name) {
    var scene = Game.scene;
    return scene ? scene.find(name) : undefined;
};

GameObject.FindGameObjectsWithTag = function (tag, out) {
    var scene = Game.scene;
    return scene ? scene.findByTag(tag, out) : undefined;
};

GameObject.FindWithTag = function (tag) {
    var scene = Game.scene;
    return scene ? scene.findByTagFirst(tag) : undefined;
};

GameObject.Instantiate = function (original, position, rotation) {
    var scene = Game.scene;
    var gameobject;
    if(original instanceof GameObject)
        gameobject =  original.clone();
    else if(original instanceof Prefab)
        gameobject =  Class.create('GameObject').fromJSON(original.jsonData);
    else
        gameobject =  Class.create('GameObject').fromJSON(original);

    if(position) gameobject.transform.position = position;
    if(rotation) gameobject.transform.rotation = rotation;
    if(scene) scene.addGameObject(gameobject);

    return gameobject;
};

GameObject.Destroy = function (obj) {

    return obj.destroy();
};

module.exports = GameObject;
