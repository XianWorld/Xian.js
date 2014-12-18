describe('xian/xian2d/systems/Transform2DSystem', function () {
    'use strict';

    var expect = chai.expect;
    var game, scene, level0, level1, level2;

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
            name: "PlayGround",
            systems: [
                new Transform2DSystem()
            ]
        });

        level0 = new GameObject({
            name: "level0",
            components: [
                new Transform2D({
                    position: new Vec2(1,2)
                }),
            ]
        });
        level1 = new GameObject({
            name: "level1",
            components: [
                new Transform2D({
                    position: new Vec2(1,2)
                }),
            ]
        });

        level0.transform.addChild(level1.transform);

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
        game.start();
    });

    after(function () {
        // runs after all tests in this block
        game.destroy();
    });

    it('Module exists', function () {
        expect(Transform2DSystem).to.be.a('function');
    });

    it('TransformSystem update transform', function (done) {

        var position, elements;
        level0 = game.scene.find("level0");
        level1 = game.scene.find("level1");
        //position = level0.transform.position;
        //position.x = 1;
        //position.y = 2;
        //position.z = 3;
        //position = level1.transform.position;
        //position.x = 1;
        //position.y = 2;
        //position.z = 3;

        game.once("lateUpdate", nextFrame1);

        function nextFrame1() {
            elements = level1.transform.matrixWorld.elements;
            expect(elements[4]).to.equal(2);
            expect(elements[5]).to.equal(4);
            //expect(elements[14]).to.equal(6);
            //done();
            level0.transform.removeChild(level1.transform);

            game.once("lateUpdate", nextFrame2);
        }

        function nextFrame2() {
            elements = level1.transform.matrixWorld.elements;
            //expect(elements[4]).to.equal(1);
            //expect(elements[5]).to.equal(2);
            //expect(elements[14]).to.equal(3);
            done();
        }
    });
});
