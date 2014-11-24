var Xian = require("../../../../src/xian/xian");


var Time = Xian.Time;


function Item(opts) {
    opts || (opts = {});

    Xian.Component.call(this, "Item", opts);

    this._life = 0;
    this.life = 24;
    this.type = opts.type != undefined ? opts.type : 1;
    this.value = opts.value != undefined ? opts.value : 0;
}

Xian.Component.extend(Item);


Item.prototype.start = function () {

    this._life = 0;
    this.rigidBody2d.on("collide", this.onCollide, this);
};


Item.prototype.clear = function () {
    Xian.Component.prototype.clear.call(this);

    this.owner = undefined;
};


Item.prototype.onCollide = function (other) {
    var gameObject = other.gameObject;
    if (gameObject && gameObject.hasTag("Player")) {
        gameObject.character.weapons[this.type].ammo += this.value;
        this.gameObject.remove();
    }
};


Item.prototype.update = function () {

    this._life += Time.delta;
    if (this._life > this.life) this.gameObject.remove();
};


Item.prototype.toJSON = function (json) {
    json = Xian.Component.prototype.toJSON.call(this, json);

    json.type = this.type;
    json.value = this.value;

    return json;
};


Item.prototype.fromJSON = function (json) {
    Xian.Component.prototype.fromJSON.call(this, json);

    this.type = json.type;
    this.value = json.value;

    return this;
};

module.exports = Item;
