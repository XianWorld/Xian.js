"use strict";


function Phys2D() {

    this.P2Broadphase = require("./collision/p2broadphase");
    this.P2BroadphaseSpatialHash = require("./collision/p2broadphase_spatialhash");
    this.P2Nearphase = require("./collision/p2nearphase");

    this.P2Circle = require("./objects/p2circle");
    this.P2Convex = require("./objects/p2convex");
    this.P2Rect = require("./objects/p2rect");
    this.P2Rigidbody = require("./objects/p2rigidbody");
    this.P2Segment = require("./objects/p2segment");
    this.P2Shape = require("./objects/p2shape");

    this.P2Constraint = require("./constraints/p2constraint");
    this.P2DistanceConstraint = require("./constraints/p2distance_constraint");

    this.P2Enums = require("./p2enums");
    this.P2Space = require("./p2space");
}


module.exports = new Phys2D;
