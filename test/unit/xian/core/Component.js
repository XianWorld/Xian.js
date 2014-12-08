describe('xian/core/GameObject', function () {
    'use strict';

    var expect = chai.expect;
    var game, scene, level0, level1, level2, components, component, gameObject;

    before(function (done) {
        // runs before all tests in this block

        game = new Game({
            debug: true,
            canvas: {
                width: 960,
                height: 640
            }
        });

        scene = new Scene({
            name: "PlayGround"
        });

        level0 = new GameObject({
            name: "level0",
            components: [
                new Transform(),
                new Camera(),
            ]
        });
        level1 = new GameObject({
            name: "level1",
            components: [
                new Transform2D(),
                new Camera2D(),
            ]
        });
        //level2 = new GameObject({
        //    name: "level2",
        //    components: [
        //        new Transform(),
        //    ]
        //});

        //level0.transform.addChild(level1.transform2d);

        scene.addGameObjects(level0);
        scene.addGameObjects(level1);

        game.addScene(scene);

        function start() {
            game.setScene("PlayGround");
            //console.log("Game Started!");

            done();
        }

        game.on("start", function () {
            start();
        });
        game.start();
    });

    after(function () {
        // runs after all tests in this block
        game.destroy();
    });

    it('Transform addChild/removeChild', function () {
        scene = game.scene;
        level0 = scene.find("level0");
        level1 = scene.find("level1");
        expect(scene.gameObjects).to.have.length(2);

        expect(level0.camera.transform).to.equals(level0.transform);
        expect(level0.camera.transform2d).to.be.undefined;

        expect(level1.camera2d.transform2d).to.equals(level1.transform2d);
        expect(level1.camera2d.transform).to.be.undefined;

    });

});
