describe('xian/xian2d/components/Camera2D', function () {
    'use strict';

    var expect = chai.expect;
    var game, scene, level0, level1, level2, components, component, gameObject,
        point,result;

    before(function (done) {
        // runs before all tests in this block

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
                new Transform2D({
                    position: new Vec2(10,20)
                }),
                new Camera2D(),
            ]
        });
        level1 = new GameObject({
            name: "level1",
            components: [
                new Transform2D(),
            ]
        });
        level2 = new GameObject({
            name: "level2",
            components: [
                new Transform(),
            ]
        });

        //level0.transform.addChild(level1.transform);

        scene.addGameObjects(level0);

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

    it('Camera2D toScreen/toWorld', function (done) {
        scene = game.scene;
        level0 = scene.find("level0");
        expect(scene.gameObjects).to.have.length(1);

        var camera2d = level0.camera2d;
        expect(camera2d).to.be.not.undefined;


        game.once("lateUpdate", nextFrame1);

        function nextFrame1() {

            point = new Vec2(30,50);
            result = camera2d.toScreen(point);

            expect(result.x).to.equal(20);
            expect(result.y).to.equal(30);

            //game.once("lateUpdate", nextFrame2);
            done();
        }

        //point = new Vec2(40,85);
        //result = camera2d.toWorld(point);
        //
        //expect(result.x).to.equal(40);
        //expect(result.y).to.equal(85);

    });

});
