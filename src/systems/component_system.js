/**
 * Created by Dianyan on 2014/12/4.
 */
var System = require("./../core/system");
var Component = require("./../core/component");
"use strict";

function ComponentSystem(opts) {

    System.call(this, opts);

    this.needsSort = true;
    this._dirty = true;

    this.addEventName = "addComponent";
    this.removeEventName = "removeComponent";
    this.componentType = Component;

    this.components = [];
}

System.extend(ComponentSystem);

ComponentSystem.prototype.start = function () {
    var key, component,
        scene = this.scene;

    if (scene) {
        scene.on(this.addEventName, this.add, this);
        scene.on(this.removeEventName, this.remove, this);

        //add all components in the scene.
        var componentHash = scene._componentHash;
        for (key in componentHash) {
            if (component = componentHash[key]){
                if(this.isMatch(component))
                    this.add(component);
            }
        }
    }
};

ComponentSystem.prototype.isMatch = function (component) {
    if(component instanceof this.componentType)
    //if (component._type === this.componentTypeName)
        return true;

    return false;
};

ComponentSystem.prototype.clear = function () {
    var scene = this.scene;
    if (scene) {
        scene.off(this.addEventName, this.add, this);
        scene.off(this.removeEventName, this.remove, this);

        this.scene = undefined;
    }

    this.components.length = 0;
    this._dirty = true;
};

ComponentSystem.prototype._setDirty = function(){
    this._dirty = true;
};


ComponentSystem.prototype.update = function () {
    var components = this.components,
        i = 0,
        il = components.length,
        component;

    if (this.needsSort && this._dirty) {
        this.sort();
        this._dirty = false;
    }

    for (; i < il; i++)
        if ((component = components[i]) && component.enabled && component.gameObject.activeInHierarchy){
            if(this.onPreUpdate) this.onPreUpdate(component);
            component.update();
        }
};

ComponentSystem.prototype.add = function (component) {
    if(!this.isMatch(component)) return;
    var components = this.components,
        i = components.indexOf(component);

    if (i !== -1) return;

    this.components.push(component);
    this._dirty = true;
    this.onAdd(component);
};

ComponentSystem.prototype.onAdd = function (component) {

};

ComponentSystem.prototype.remove = function (component) {
    if(!this.isMatch(component)) return;
    var components = this.components,
        i = components.indexOf(component);

    if (i === -1) return;

    this.components.splice(i, 1);
    //this.sorted = false;
    this.onRemove(component);
};

ComponentSystem.prototype.onRemove = function (component) {

};

ComponentSystem.prototype.sort = function () {

    this.components.sort(this.sortFunction);
};

ComponentSystem.prototype.sortFunction = function (a, b) {

    return a._id - b._id;
};


module.exports = ComponentSystem;
