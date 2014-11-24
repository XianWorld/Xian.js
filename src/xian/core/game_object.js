var Class = require("../base/class");
var Component = require("./components/component");
var Log = require("./../base/log");
"use strict";

/**
 * @class GameObject
 * @extends Class
 * @memberof Odin
 * @brief Base class for entities in scenes
 * @param Object options
 */
function GameObject(opts) {
    opts || (opts = {});

    Class.call(this);

    this.name = opts.name != undefined ? opts.name : "GameObject_" + this._id;

    this.scene = undefined;

    this.tags = [];

    this.components = [];
    this._componentType = {};
    this._componentHash = {};
    this._componentJSONHash = {};

    if (opts.tag) this.addTag(opts.tag);
    if (opts.tags) this.addTags.apply(this, opts.tags);

    if (opts.components) this.addComponents.apply(this, opts.components);
}

Class.extend(GameObject);


GameObject.prototype.copy = function (other) {
    var components = this.components,
        otherComponents = other.components,
        tags = other.tags,
        otherComponent, component,
        i = components.length;

    while (i--) {
        component = components[i];
        if (!other.hasComponent(component._className)) this.removeComponent(component);
    }

    i = otherComponents.length;
    while (i--) {
        otherComponent = otherComponents[i];

        if ((component = this.getComponent(otherComponent._type))) {
            component.copy(otherComponent);
        } else {
            this.addComponent(otherComponent.clone());
        }
    }

    i = tags.length;
    while (i--) this.addTag(tags[i]);

    return this;
};


GameObject.prototype.clear = function () {
    var components = this.components,
        tags = this.tags,
        componentLength = components.length,
        i;

    i = componentLength;
    while (i--) components[i].clear();

    i = tags.length;
    while (i--) this.removeTag(tags[i]);

    i = componentLength;
    while (i--) this.removeComponent(components[i]);

    this.off();

    return this;
};


GameObject.prototype.destroy = function () {
    if (!this.scene) {
        Log.error("GameObject.destroy: can't destroy GameObject if it's not added to a Scene");
        return this;
    }

    this.scene.removeGameObject(this);
    this.emit("destroy");

    this.clear();

    return this;
};


GameObject.prototype.remove = function () {
    if (!this.scene) {
        Log.error("GameObject.remove: can't remove GameObject if it's not added to a Scene");
        return this;
    }

    this.scene.removeGameObject(this);
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
    if (typeof(component) === "string") component = new Class._classes[component];
    if (!(component instanceof Component)) {
        Log.error("GameObject.addComponent: can't add passed argument, it is not an instance of Component");
        return this;
    }
    var name = component._name,
        components = this.components,
        comp, i, j;


    if (!this[name]) {
        if (component.gameObject) component = component.clone();

        components.push(component);
        this._componentType[component._type] = component;
        this._componentHash[component._id] = component;
        if (component._jsonId !== -1) this._componentJSONHash[component._jsonId] = component;

        component.gameObject = this;
        this[name] = component;

        if (!others) {
            //TODO one loop will ok!
            i = components.length;
            while (i--) {
                comp = components[i];
                if (!comp) continue;

                j = components.length;
                while (j--) comp[components[j]._name] = components[j];
            }

            component.init();
            component.emit("init");
        }

        this.emit("add" + component._type, component);
        this.emit("addComponent", component);
        component.emit("add", this);

        if (this.scene) this.scene._addComponent(component);
    } else {
        Log.error("GameObject.addComponent: GameObject already has a(n) " + component._type + " Component");
    }

    return this;
};


GameObject.prototype.addComponents = function () {
    var length = arguments.length,
        components = this.components,
        component, name,
        i, j;

    i = length;
    while (i--) this.addComponent(arguments[i], true);

    //TODO one loop will ok!
    i = components.length;
    while (i--) {
        component = components[i];
        if (!component) continue;

        j = components.length;
        while (j--) {
            name = components[j]._name;
            component[name] = components[j];
        }
    }

    i = components.length;
    while (i--) {
        component = components[i];
        component.init();
        component.emit("init");
    }

    return this;
};


GameObject.prototype.removeComponent = function (component, clear, others) {
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
        this.emit("remove" + component._type, component);
        this.emit("removeComponent", component);

        if (!others) {
            i = components.length;
            while (i--) {
                comp = components[i];
                if (!comp) continue;

                j = components.length;
                while (j--) {
                    if (name === components[j]._name) comp[name] = undefined;
                }
            }
        }

        components.splice(components.indexOf(component), 1);
        this._componentType[component._type] = undefined;
        this._componentHash[component._id] = undefined;
        if (component._jsonId !== -1) this._componentJSONHash[component._jsonId] = undefined;

        component.gameObject = undefined;
        this[name] = undefined;

        if (this.scene) this.scene._removeComponent(component);
        if (clear) component.clear();
    } else {
        Log.error("GameObject.removeComponent: GameObject does not have a(n) " + type + " Component");
    }

    return this;
};


GameObject.prototype.removeComponents = function () {
    var length = arguments.length,
        components = this.components,
        toRemove = arguments,
        component, name,
        i, j;

    i = length;
    while (i--) this.removeComponent(arguments[i], null, true);

    i = components.length;
    while (i--) {
        component = components[i];
        if (!component) continue;

        name = component._name;
        j = toRemove.length;
        while (j--) {
            if (name === toRemove[i]._name) component[name] = undefined;
        }
    }

    return this;
};


GameObject.prototype.getComponent = function (type) {

    return this._componentType[type];
};


GameObject.prototype.hasComponent = function (type) {
    var components = this.components,
        i = components.length;
    ;

    while (i--) {
        if (components[i]._type === type) return true;
    }

    return false;
};


GameObject.prototype.find = function (name) {
    var transform = this.transform || this.transform2d,
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


GameObject.prototype.findComponentById = function (id) {

    return this._componentHash[id];
};


GameObject.prototype.findComponentByJSONId = function (id) {

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

    while (i--) {
        if ((component = components[i]).json) jsonComponents[i] = component.toJSON(jsonComponents[i]);
    }
    i = tags.length;
    while (i--) jsonTags[i] = tags[i];

    json.name = this.name;

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

    while (i--) {
        component = components[i];
        type = component._type;
        has = false;

        j = jsonComponents.length;
        while (j--) {
            jsonComponent = jsonComponents[i];
            if (type === jsonComponent._type) has = true;
        }

        if (!has) this.removeComponent(component);
    }

    i = jsonComponents.length;
    while (i--) {
        if (!(jsonComponent = jsonComponents[i])) continue;

        if ((component = this.findComponentByJSONId(jsonComponent._id)) || (component = this.getComponent(jsonComponent._type))) {
            component.fromJSON(jsonComponent);
        } else {
            this.addComponent(Class.fromJSON(jsonComponent));
        }
    }

    i = jsonTags.length;
    while (i--) {
        if (tags.indexOf((tag = jsonTags[i])) === -1) tags.push(tag);
    }

    this.name = json.name;

    return this;
};


module.exports = GameObject;
