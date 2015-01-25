var ComponentSystem = require("./component_system");
var Behaviour = require("./../components/behaviour");
"use strict";


function BehaviourSystem(opts) {
    //opts || (opts = {});

    ComponentSystem.call(this, opts);

    this.needsSort = false;
    this.order = -99999;


    //this.addEventName = "startComponent";
    //this.removeEventName = "removeComponent";
    this.componentType = Behaviour;
}

ComponentSystem.extend(BehaviourSystem);

//BehaviourSystem.prototype.sortFunction = function (a, b) {
//
//    return a.depth - b.depth;
//};


module.exports = BehaviourSystem;
