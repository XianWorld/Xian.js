describe('xian/systems/Render2DSystem', function () {
    'use strict';

    var expect = chai.expect;
    var game, scene, level0, level1, level2, system;

    before(function (done) {
        // runs before all tests in this block

        Assets.addAssets(
            new Texture({
                name: "img_player",
                flipY: true,
                filter: Enums.FilterMode.None,
                src: "../../../content/images/player.png"
            }),
            new Texture({
                name: "img_hospital",
                flipY: true,
                filter: Enums.FilterMode.None,
                src: "../../../content/images/hospital.png"
            })
        );

        game = new Game({
            debug: true,
            canvas: {
                width: 960,
                height: 640
            },
            renderer: {
                canvasRenderer: CanvasRenderer2D
            }
        });

        scene = new Scene({
            name: "PlayGround",
            systems: [
                new Transform2DSystem(),
                new Render2DSystem(),
            ]
        });

        level0 = new GameObject({
            name: "level0",
            components: [
                new Transform({
                    position: new Vec3(1, 2, 3)
                }),
                new Camera2D(),
            ]
        });
        level1 = new GameObject({
            name: "level1",
            components: [
                new Transform({
                    position: new Vec3(1, 2, 3)
                }),
                new Sprite2D({
                    texture: Assets.get("img_player")
                }),
            ]
        });

        //level0.transform.addChild(level1.transform);

        scene.addGameObjects(level0);

        game.addScene(scene);

        function start() {
            game.setScene("PlayGround");
            console.log("Game Started!");

            done();
        }

        game.on("start", function () {
            start();
        });
        //game.start();

        AssetLoader.on("load", function () {
            game.start();
        }).load();

    });

    after(function () {
        // runs after all tests in this block
        game.destroy();
    });

    it('Module exists', function (done) {
        scene = game.scene;
        system = scene.getSystem("Render2DSystem");
        expect(system).to.be.a.instanceOf(Render2DSystem);

        game.once("lateUpdate", nextFrame1);

        function nextFrame1() {

            game.once("lateUpdate", nextFrame2);
        }

        function nextFrame2() {

            //setTimeout(done, 10000);
            done();
        }

    });

});
