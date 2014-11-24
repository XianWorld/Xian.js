var Xian = require("../../../../src/xian/xian");
var Character = require("./character");
var pistolBullet = require("../pistol_bullet");
var smallBullet = require("../small_bullet");
var rocket = require("../rocket");
var fire = require("../fire");

window.pistolBullet = pistolBullet;

var snd_shot_short = Xian.Assets.get("snd_shot_short"),
    snd_shot_mid = Xian.Assets.get("snd_shot_mid"),
    snd_shot_long = Xian.Assets.get("snd_shot_long"),
    snd_fire = Xian.Assets.get("snd_fire"),
    snd_rocket = Xian.Assets.get("snd_rocket"),

    Time = Xian.Time,
    Input = Xian.Input,

    Mathf = Xian.Mathf,
    randInt = Mathf.randInt,
    randFloat = Mathf.randFloat,
    direction = Mathf.direction,
    sign = Mathf.sign,

    abs = Math.abs,
    floor = Math.floor,
    atan2 = Math.atan2,
    Loop = Xian.Enums.WrapMode.Loop,

    PI = Math.PI,
    HALF_PI = PI * 0.5,
    cos = Math.cos,
    sin = Math.sin,
    sqrt = Math.sqrt,

    pistol = new Weapon("Pistol", 0.5, 2, Infinity),
    shotgun = new Weapon("Shotgun", 1, 1, 0),
    uzi = new Weapon("Uzi", 0.1, 1, 0),
    flamethrower = new Weapon("Flamethrower", 0.1, 3, 0),
    bazooka = new Weapon("Bazooka", 1.5, 100, 0),

    weapons = [
        pistol,
        uzi,
        shotgun,
        flamethrower,
        bazooka
    ],

    randChoice = Mathf.randChoice,
    random = Math.random,

    moans = [
        Xian.Assets.get("snd_player_moan1"),
        Xian.Assets.get("snd_player_moan2"),
        Xian.Assets.get("snd_player_moan3")
    ];


function Player(opts) {
    opts || (opts = {});

    opts.spd || (opts.spd = 3);
    Character.call(this, opts);

    this.camera = undefined;

    this._weapon = 0;
    this.weapon = 0;

    this.weapons = weapons;
}

Character.extend(Player);


Player.prototype.start = function () {

    Input.on("mousewheel", this.onMouseWheel, this);
};


Player.prototype.clear = function () {
    Character.prototype.clear.call(this);

    Input.off("mousewheel", this.onMouseWheel, this);
    this.camera = undefined;
};


Player.prototype.onMouseWheel = function () {

    this._weapon += sign(Input.mouseWheel);
    this.weapon = abs(this._weapon) % weapons.length;
    console.log(this.weapon, weapons[this.weapon].ammo);
};


var MOUSE = new Xian.Vec2;
Player.prototype.update = function () {
    Character.prototype.update.call(this);
    if (this.dead) return;

    var force = this.force,
        position = this.transform2d.position,
        animation = this.spriteAnimation,
        camera = this.camera || (this.camera = this.gameObject.scene.findByTagFirst("Camera")),
        dt = Time.delta,
        x = Input.axis("horizontal"),
        y = Input.axis("vertical");

    force.x = x;
    force.y = y;
    if (force.lengthSq() > 1) force.normalize();

    if (Input.mouseButton(0)) {
        this.attacking = true;

        camera.camera2d.toWorld(Input.mousePosition, MOUSE);
        MOUSE.x -= position.x;
        MOUSE.y -= position.y;

        animation.play(direction(MOUSE.x, MOUSE.y), Loop, 0);
        this.fire(position, MOUSE.x, MOUSE.y, dt);
    } else {
        this.attacking = false;
    }
};


Player.prototype.attack = function (other) {
    if (this.dead) return;

    if (other.takeDamage(this.atk + weapons[this.weapon].atk)) {
        var exp = floor(randInt(other.maxHp * other.level * 0.5, other.maxHp * other.level));

        this.exp += exp;
        console.log("GAINED " + exp + " exp");

        if (this.exp > this.nextLevel) {
            this.setLevel(this.level + 1);
            console.log("LEVEL UP");
        }
    }
};


Player.prototype.takeDamage = function (atk) {
    if (!this.audioSource.playing) {
        this.audioSource.clip = randChoice(moans);
        this.audioSource.play();
    }

    return Character.prototype.takeDamage.call(this, atk);
};


var FIRE = new Xian.Vec2;
Player.prototype.fire = function (position, dx, dy, dt) {
    if (!weapons[this.weapon].fire(dt)) return;
    var audioSource = this.audioSource,
        scene = this.gameObject.scene,
        invLen = 1 / sqrt(dx * dx + dy * dy),
        x = dx * invLen,
        y = dy * invLen,
        transform2d, instance;

    switch (this.weapon) {
        case 4: //rocket launcher
            if (audioSource.clip !== snd_rocket) audioSource.clip = snd_rocket;
            if (!audioSource.playing) audioSource.play();

            scene.addGameObject(createBullet(rocket, this, position, atan2(y, x), 5));
            break;

        case 3: //flamethrower
            if (audioSource.clip !== snd_fire) audioSource.clip = snd_fire;
            if (!audioSource.playing) audioSource.play();

            scene.addGameObject(createBullet(fire, this, position, atan2(y, x), 5, false, randFloat(0.5, 1)));
            break;

        case 2: //shotgun
            if (audioSource.clip !== snd_shot_long) audioSource.clip = snd_shot_long;
            audioSource.play();

            scene.addGameObjects(
                createBullet(smallBullet, this, position, atan2(y, x) - (PI * 0.05), 15, false, randFloat(0.25, 0.75)),
                createBullet(smallBullet, this, position, atan2(y, x) - (PI * 0.025), 15, false, randFloat(0.25, 0.75)),
                createBullet(smallBullet, this, position, atan2(y, x), 15, false, randFloat(0.25, 0.75)),
                createBullet(smallBullet, this, position, atan2(y, x) + (PI * 0.025), 15, false, randFloat(0.25, 0.75)),
                createBullet(smallBullet, this, position, atan2(y, x) + (PI * 0.05), 15, false, randFloat(0.25, 0.75))
            );
            break;

        case 1: //uzi
            if (audioSource.clip !== snd_shot_short) audioSource.clip = snd_shot_short;
            audioSource.play();

            scene.addGameObject(createBullet(smallBullet, this, position, atan2(y, x), 20, true));
            break;

        case 0: //pistal
            if (audioSource.clip !== snd_shot_mid) audioSource.clip = snd_shot_mid;
            audioSource.play();

            scene.addGameObject(createBullet(pistolBullet, this, position, atan2(y, x), 10, true));
            break;
    }
};


function createBullet(type, owner, position, angle, spd, destoryOnFlesh, life) {
    var instance = type.create(),
        transform2d = instance.transform2d,
        bullet = instance.bullet,
        x = cos(angle),
        y = sin(angle);

    life || (life = Infinity);

    transform2d.position.copy(position).add(FIRE.set(x, y).smul(0.25));
    transform2d.rotation = angle - HALF_PI;
    instance.rigidBody2d.body.velocity.set(x, y).smul(spd);
    bullet.owner = owner;
    bullet.destoryOnFlesh = destoryOnFlesh;
    bullet.life = life;

    return instance;
}


function Weapon(name, freq, atk, ammo) {
    this.name = name;
    this.freq = freq;
    this.atk = atk;
    this.ammo = ammo;
    this._time = 0;
}

Weapon.prototype.fire = function (dt) {
    if (this.ammo <= 0) return false;

    this._time += dt;
    if (this._time >= this.freq) {
        this.ammo--;
        this._time = 0;
        return true;
    }

    return false;
};


module.exports = Player;
