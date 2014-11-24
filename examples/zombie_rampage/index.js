var Xian = require("../../src/xian/xian");
var assets = require("./src/assets");
var sceneLevel = require("./src/scene_level");

var game = new Xian.Game({
    debug: true,
    canvas: {
        width: 960,
        height: 640
    },
    renderer: {
        autoClear: false,
        disableDepth: true
    }
});

game.addScene(sceneLevel);


function startLevel() {
    game.setScene("Level");
    game.setCamera(game.scene.findByTagFirst("Camera"));

    game.on("update", function () {

        this.scene.componentManagers.Sprite.sort();
    });
}


Xian.AssetLoader.on("load", function () {

    game.on("start", startLevel).start();
}).load();
