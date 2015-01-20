var Enum = require("../../../base/enum");
"use strict";


module.exports = {
    //BodyType: new Enum("Particle RigidBody"),
    //ShapeType: new Enum("Convex Circle Segment"),
    //MotionState: new Enum("Dynamic Static Kinematic"),
    //SleepState: new Enum("Awake Sleepy Sleeping")
    BodyType: new Enum("Particle RigidBody"),
    ShapeType: new Enum("Convex Circle Segment"),
    MotionState: {
        Dynamic: "Dynamic",
        Static: "Static",
        Kinematic: "Kinematic"
    },
    SleepState: new Enum("Awake Sleepy Sleeping")
};
