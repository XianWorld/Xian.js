describe('xian/components/Transform', function () {
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
            ]
        });
        level1 = new GameObject({
            name: "level1",
            components: [
                new Transform(),
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

    it('Transform addChild/removeChild', function () {
        scene = game.scene;
        level0 = scene.find("level0");
        expect(scene.gameObjects).to.have.length(1);

        //when level1'transform attach to level0'transform which is in the scene, it is added to the scene automatically
        level0.transform.addChild(level1.transform);
        expect(scene.gameObjects).to.have.length(2);

        //when level1'transform attach to level2'transform which is not in the scene, then it is removed from the scene
        level2.transform.addChild(level1.transform);
        expect(scene.gameObjects).to.have.length(1);
        expect(level1.transform.parent.gameObject).to.equals(level2);
        expect(level1.scene).to.be.undefined;

        level0.transform.addChild(level2.transform);
        expect(scene.gameObjects).to.have.length(3);

        //TODO when level2'transform removed from level0'transform which is in the scene, it still retain in the scene
        level0.transform.removeChild(level2.transform);
        expect(scene.gameObjects).to.have.length(3);

        level0.transform.addChild(level2.transform);
        expect(scene.gameObjects).to.have.length(3);

        //when level2 is removed from the scene, it's transform tree is retained
        scene.removeGameObject(level2);
        expect(scene.gameObjects).to.have.length(1);
        expect(level1.transform.parent.gameObject).to.equals(level2);
        expect(level1.scene).to.be.undefined;
    });

    it('Transform find', function () {
        scene = game.scene;
        level0 = scene.find("level0");
        level0.transform.addChild(level1.transform);
        level1.transform.addChild(level2.transform);
        gameObject = level0.transform.find("level1");
        expect(gameObject).to.equals(level1);
        gameObject = level0.transform.find("level2");
        expect(gameObject).to.equals(level2);
    });
});
