var Xian = require("../../../../src/xian/xian");


var Time = Xian.Time,
    Mathf = Xian.Mathf,
    direction = Mathf.direction,
    randInt = Mathf.randInt,
    randArg = Mathf.randArg,
    floor = Math.floor,
    random = Math.random,

    Loop = Xian.Enums.WrapMode.Loop,
    Clamp = Xian.Enums.WrapMode.Clamp;


function Character(opts) {
    opts || (opts = {});

    Xian.Component.call(this, "Character", opts);

    this.force = new Xian.Vec2;
    this.attacking = false;

    this.dead = false;
    this.deadTime = opts.deadTime != undefined ? opts.deadTime : 2;
    this._deadTime = 0;

    this.hit = false;
    this.hitTime = opts.hitTime != undefined ? opts.hitTime : 0.5;
    this._hitTime = 0;

    this.level = opts.level != undefined ? opts.level : 1;

    this.maxHp = opts.hp != undefined ? opts.hp : 10;
    this.hp = this.maxHp;

    this.atk = opts.atk != undefined ? opts.atk : 3;
    this.def = opts.def != undefined ? opts.def : 2;
    this.spd = opts.spd != undefined ? opts.spd : 1;

    this.exp = opts.exp != undefined ? opts.exp : 0;
    this.nextLevel = opts.nextLevel != undefined ? opts.nextLevel : 100;

    if (this.level > 1) this.setLevel(this.level);
}

Xian.Component.extend(Character);


Character.prototype.start = function () {

    this._deadTime = 0;
    this._hitTime = 0;
};


Character.prototype.copy = function (other) {

    this.level = other.level;

    this.maxHp = other.maxHp;
    this.hp = other.hp;

    this.atk = other.atk;
    this.def = other.def;
    this.spd = other.spd;

    this.exp = other.exp;
    this.nextLevel = other.nextLevel;

    this.dead = false;
    this.attacking = false;
    this.hit = false;
    this._deadTime = 0;
    this._hitTime = 0;

    return this;
};


Character.prototype.update = function () {
    var animation = this.spriteAnimation,
        force = this.force,
        spd = this.spd,
        dt = Time.delta;

    this.sprite.z = -this.transform2d.position.y;

    if (this.dead) {
        if (this.deadTimer(dt)) return;

        this.rigidBody2d.body.forEachShape(setAsTrigger);
        animation.play("death", Clamp, 0.5);
        return;
    }

    this.hitTimer(dt);

    if (force.x || force.y) {
        force.x *= 10 * spd;
        force.y *= 10 * spd;
        this.rigidBody2d.applyForce(force);
        if (!this.hit && !this.attacking) animation.play(direction(force.x, force.y), Loop);
    }

    if (!this.hit) animation.rate = 1 / (force.length() * 0.5);
};


function setAsTrigger(shape) {

    shape.isTrigger = true;
    shape.filterGroup = 2;
    shape.filterMask = 1;
}


Character.prototype.attack = function (other) {
    if (this.dead) return;

    if (other.takeDamage(this.atk)) {
        this.exp += floor(other.maxHp * other.level);

        if (this.exp > this.nextLevel) this.setLevel(this.level + 1);
    }
};


Character.prototype.takeDamage = function (atk) {
    if (this.dead || this.hit) return false;
    var damage = atk * randInt(1, 6) - this.def * randInt(1, 6);

    if (damage > 0) {
        this.particleSystem.play();

        this.hp -= damage;
        this.hit = true;

        if (this.hp <= 0) {
            this.dead = true;
            return true;
        }
    }

    return false;
};


Character.prototype.hitTimer = function (dt) {
    if (!this.hit) return;

    this.spriteAnimation.play("hit", Xian.Enums.WrapMode.Clamp, 0.1);

    if ((this._hitTime += dt) > this.hitTime) {
        this.hit = false;
        this._hitTime = 0;
    }
};


Character.prototype.deadTimer = function (dt) {

    if ((this._deadTime += dt) > this.deadTime) {
        this.gameObject.remove();
        return true;
    }

    return false
};


Character.prototype.setLevel = function (level) {

    this.level = level;
    this.nextLevel += level * level * 100;

    this.maxHp += level * 2;
    this.hp = this.maxHp;

    this.atk += level % 2 === 0 ? 1 : 0;
    this.def += level % 3 === 0 ? 1 : 0;
    this.spd += level % 10 === 0 ? 1 : 0;
};


Character.prototype.toJSON = function (json) {
    json = Xian.Component.prototype.toJSON.call(this, json);

    json.level = this.level;

    json.maxHp = this.maxHp;
    json.hp = this.hp;

    json.atk = this.atk;
    json.def = this.def;
    json.spd = this.spd;

    json.exp = this.exp;
    json.nextLevel = this.nextLevel;

    return json;
};


Character.prototype.fromJSON = function (json) {
    Xian.Component.prototype.fromJSON.call(this, json);

    this.level = json.level;

    this.maxHp = json.maxHp;
    this.hp = json.hp;

    this.atk = json.atk;
    this.def = json.def;
    this.spd = json.spd;

    this.exp = json.exp;
    this.nextLevel = json.nextLevel;

    this.dead = false;
    this.attacking = false;
    this.hit = false;
    this._deadTime = 0;
    this._hitTime = 0;

    return this;
};


module.exports = Character;
