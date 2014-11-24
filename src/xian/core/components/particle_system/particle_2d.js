var Vec2 = require("../../../math/vec2");
var Color = require("../../../math/color");
"use strict";


function Particle2D() {

    this.alpha = 1;

    this.lifeTime = 0;
    this.life = 1;

    this.size = 1;

    this.color = new Color;

    this.position = new Vec2;
    this.velocity = new Vec2;
    this.acceleration = new Vec2;

    this.angle = 0;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
}


Particle2D.prototype.update = function (dt) {
    var pos = this.position,
        vel = this.velocity,
        acc = this.acceleration;

    pos.x += vel.x * dt;
    pos.y += vel.y * dt;

    vel.x += acc.x * dt;
    vel.y += acc.y * dt;

    this.angle += this.angularVelocity * dt;
    this.angularVelocity += this.angularAcceleration * dt;

    this.lifeTime += dt;
};


module.exports = Particle2D;
