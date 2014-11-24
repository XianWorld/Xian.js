var Vec3 = require("../../../math/vec3");
var Color = require("../../../math/color");
"use strict";


function Particle() {

    this.z = 1;
    this.alpha = 1;

    this.lifeTime = 0;
    this.life = 1;

    this.size = 1;

    this.color = new Color;

    this.position = new Vec3;
    this.velocity = new Vec3;
    this.acceleration = new Vec3;

    this.angle = 0;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
}


Particle.prototype.update = function (dt) {
    var pos = this.position,
        vel = this.velocity,
        acc = this.acceleration;

    pos.x += vel.x * dt;
    pos.y += vel.y * dt;
    pos.z += vel.z * dt;

    vel.x += acc.x * dt;
    vel.y += acc.y * dt;
    vel.z += acc.z * dt;

    this.angle += this.angularVelocity * dt;
    this.angularVelocity += this.angularAcceleration * dt;

    this.lifeTime += dt;
};


module.exports = Particle;
