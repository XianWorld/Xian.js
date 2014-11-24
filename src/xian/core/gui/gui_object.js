var Class = require("../../base/class");
var GUIComponent = require("./components/gui_component");
var GUITransform = require("./components/gui_transform");
var Log = require("../../base/log");
"use strict";

/**
 * @class GUIObject
 * @extends Class
 * @memberof Odin
 * @brief Base class for entities in scenes
 * @param Object options
 */
function GUIObject(opts) {
    opts || (opts = {});

    Class.call(this);

    this.name = opts.name != undefined ? opts.name : "GUIObject_" + this._id;

    this.scene = undefined;

    this.tags = [];

    this.components = [];
    this._componentType = {};
    this._componentHash = {};
    this._componentJSONHash = {};

    if (opts.tag) this.addTag(opts.tag);
    if (opts.tags) this.addTags.apply(this, opts.tags);

    this.addGUIComponent(new GUITransform);
    if (opts.components) this.addGUIComponents.apply(this, opts.components);
}

Class.extend(GUIObject);


GUIObject.prototype.copy = function (other) {
    var components = this.components,
        otherGUIComponents = other.components,
        tags = other.tags,
        otherGUIComponent, component,
        i = components.length;

    while (i--) {
        component = components[i];
        if (!other.hasGUIComponent(component._className)) this.removeGUIComponent(component);
    }

    i = otherGUIComponents.length;
    while (i--) {
        otherGUIComponent = otherGUIComponents[i];

        if ((component = this.getGUIComponent(otherGUIComponent._type))) {
            component.copy(otherGUIComponent);
        } else {
            this.addGUIComponent(otherGUIComponent.clone());
        }
    }

    i = tags.length;
    while (i--) this.addTag(tags[i]);

    return this;
};


GUIObject.prototype.clear = function () {
    var components = this.components,
        tags = this.tags,
        componentLength = components.length,
        i;

    i = componentLength;
    while (i--) components[i].clear();

    i = tags.length;
    while (i--) this.removeTag(tags[i]);

    i = componentLength;
    while (i--) this.removeGUIComponent(components[i]);

    this.off();

    return this;
};


GUIObject.prototype.destroy = function () {
    if (!this.scene) {
        Log.error("GUIObject.destroy: can't destroy GUIObject if it's not added to a Scene");
        return this;
    }

    this.scene.removeGUIObject(this);
    this.emit("destroy");

    this.clear();

    return this;
};


GUIObject.prototype.remove = function () {
    if (!this.scene) {
        Log.error("GUIObject.remove: can't remove GUIObject if it's not added to a Scene");
        return this;
    }

    this.scene.removeGUIObject(this);
    return this;
};


GUIObject.prototype.addTag = function (tag) {
    var tags = this.tags;

    if (tags.indexOf(tag) === -1) tags.push(tag);

    return this;
};


GUIObject.prototype.addTags = function () {
    var i = arguments.length;

    while (i--) this.addTag(arguments[i]);
    return this;
};


GUIObject.prototype.removeTag = function (tag) {
    var tags = this.tags,
        index = tags.indexOf(tag);

    if (index !== -1) tags.splice(index, 1);

    return this;
};


GUIObject.prototype.removeTags = function () {
    var i = arguments.length;

    while (i--) this.removeTag(arguments[i]);
    return this;
};


GUIObject.prototype.hasTag = function (tag) {

    return this.tags.indexOf(tag) !== -1;
};


GUIObject.prototype.addGUIComponent = function (component, others) {
    if (typeof(component) === "string") component = new Class._classes[component];
    if (!(component instanceof GUIComponent)) {
        Log.error("GUIObject.addGUIComponent: can't add passed argument, it is not an instance of GUIComponent");
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
        this.emit("addGUIComponent", component);
        component.emit("add", this);

        if (this.scene) this.scene._addGUIComponent(component);
    } else {
        Log.error("GUIObject.addGUIComponent: GUIObject already has a(n) " + component._type + " GUIComponent");
    }

    return this;
};


GUIObject.prototype.addGUIComponents = function () {
    var length = arguments.length,
        components = this.components,
        component, name,
        i, j;

    i = length;
    while (i--) this.addGUIComponent(arguments[i], true);

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


GUIObject.prototype.removeGUIComponent = function (component, clear, others) {
    if (typeof(component) === "string") component = this.getGUIComponent(component);
    if (!(component instanceof GUIComponent)) {
        Log.error("GUIObject.removeGUIComponent: can't remove passed argument, it is not an instance of GUIComponent");
        return this;
    }
    var name = component._name,
        components = this.components,
        comp, i, j;

    if (this[name]) {
        component.emit("remove", this);
        this.emit("remove" + component._type, component);
        this.emit("removeGUIComponent", component);

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

        if (this.scene) this.scene._removeGUIComponent(component);
        if (clear) component.clear();
    } else {
        Log.error("GUIObject.removeGUIComponent: GUIObject does not have a(n) " + type + " GUIComponent");
    }

    return this;
};


GUIObject.prototype.removeGUIComponents = function () {
    var length = arguments.length,
        components = this.components,
        toRemove = arguments,
        component, name,
        i, j;

    i = length;
    while (i--) this.removeGUIComponent(arguments[i], null, true);

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


GUIObject.prototype.getGUIComponent = function (type) {

    return this._componentType[type];
};


GUIObject.prototype.hasGUIComponent = function (type) {
    var components = this.components,
        i = components.length;
    ;

    while (i--) {
        if (components[i]._type === type) return true;
    }

    return false;
};


GUIObject.prototype.find = function (name) {
    var transform = this.guiTransform,
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


GUIObject.prototype.findGUIComponentById = function (id) {

    return this._componentHash[id];
};


GUIObject.prototype.findGUIComponentByJSONId = function (id) {

    return this._componentJSONHash[id];
};


GUIObject.prototype.toJSON = function (json) {
    json = Class.prototype.toJSON.call(this, json);
    var components = this.components,
        jsonGUIComponents = json.components || (json.components = []),
        tags = this.tags,
        jsonTags = json.tags || (json.tags = []),
        component,
        i = components.length;

    while (i--) {
        if ((component = components[i]).json) jsonGUIComponents[i] = component.toJSON(jsonGUIComponents[i]);
    }
    i = tags.length;
    while (i--) jsonTags[i] = tags[i];

    json.name = this.name;

    return json;
};


GUIObject.prototype.fromJSON = function (json) {
    Class.prototype.fromJSON.call(this, json);
    var components = this.components,
        jsonGUIComponents = json.components || (json.components = []),
        component, jsonGUIComponent, tag,
        tags = this.tags,
        jsonTags = json.tags || (json.tags = []),
        i = components.length,
        has, type, j;

    while (i--) {
        component = components[i];
        type = component._type;
        has = false;

        j = jsonGUIComponents.length;
        while (j--) {
            jsonGUIComponent = jsonGUIComponents[i];
            if (type === jsonGUIComponent._type) has = true;
        }

        if (!has) this.removeGUIComponent(component);
    }

    i = jsonGUIComponents.length;
    while (i--) {
        if (!(jsonGUIComponent = jsonGUIComponents[i])) continue;

        if ((component = this.findGUIComponentByJSONId(jsonGUIComponent._id)) || (component = this.getGUIComponent(jsonGUIComponent._type))) {
            component.fromJSON(jsonGUIComponent);
        } else {
            this.addGUIComponent(Class.fromJSON(jsonGUIComponent));
        }
    }

    i = jsonTags.length;
    while (i--) {
        if (tags.indexOf((tag = jsonTags[i])) === -1) tags.push(tag);
    }

    this.name = json.name;

    return this;
};


module.exports = GUIObject;
