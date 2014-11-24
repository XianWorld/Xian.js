var Xian = require("../../../../src/xian/xian");


var Time = Xian.Time,
    Input = Xian.Input;


function CameraControl(opts) {
    opts || (opts = {});

    Xian.Component.call(this, "CameraControl", opts);

    this.player = undefined;
    this.speed = 1;
    this.zoomSpeed = 8;
}

Xian.Component.extend(CameraControl);


CameraControl.prototype.clear = function () {

    this.player = undefined;
};


CameraControl.prototype.update = function () {
    var transform2d = this.transform2d,
        position = this.transform2d.position,
        camera2d = this.camera2d,
        player = this.player || (this.player = this.gameObject.scene.findByTagFirst("Player")),
        dt = Time.delta,
        spd = this.speed;

    if (player) {
        if (player.character && !player.character.dead) {
            transform2d.follow(player.transform2d, dt * spd);
        } else {
            this.player = this.gameObject.scene.findByTagFirst("Player");
        }
    } else {
        if (Input.mouseButton(0)) {
            position.x += -dt * spd * Input.axis("mouseX");
            position.y += dt * spd * Input.axis("mouseY");
        }
        if (Input.axis("mouseWheel") !== 0) camera2d.setOrthographicSize(camera2d.orthographicSize + -dt * this.zoomSpeed * Input.axis("mouseWheel"));
    }
};


module.exports = CameraControl;
