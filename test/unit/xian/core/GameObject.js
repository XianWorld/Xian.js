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
                new Sprite2D(),
            ]
        });
        level1 = new GameObject({
            name: "level1",
            components: [
                new Transform(),
            ]
        });

        level0.transform.addChild(level1.transform);

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

    it('Scene get GameObject', function () {
        scene = game.scene;
        level0 = scene.find("level0");
        expect(level0).to.be.an.instanceOf(GameObject);
    });

    it('GameObject getComponent from scene-inited object', function () {
        scene = game.scene;
        level0 = scene.find("level0");
        component = level0.getComponent("Transform");
        expect(component).to.be.an.instanceOf(Transform);
        component = level0.getComponent(Transform);
        expect(component).to.be.an.instanceOf(Transform);
        component = level0.getComponent("Sprite2D");
        expect(component).to.be.an.instanceOf(Sprite2D);
        component = level0.getComponent("Renderable2D", true);
        expect(component).to.be.an.instanceOf(Sprite2D);
    });

    it('GameObject addComponent/addComponents/removeComponent/removeComponents/hasComponent', function () {
        scene = game.scene;
        level0 = scene.find("level0");

        //can not add an component with same name(or name not assigned)
        level0.addComponent(new Transform());
        expect(level0.components).to.have.length(2);

        level0.addComponent(new Sprite2D({name:"one"}));
        expect(level0.components).to.have.length(3);

        components = level0.getComponents("Sprite2D");
        expect(components).to.have.length(2);
        expect(components[0]._name).to.equal("sprite2d");
        expect(components[1]._name).to.equal("one");

        components = level0.getComponents(Renderable2D, true);
        expect(components).to.have.length(2);

        expect(level0["sprite2d"]).to.be.an.instanceOf(Sprite2D);
        expect(level0.one).to.be.an.instanceOf(Sprite2D);

        //test hasComponent
        expect(level0.hasComponent(Sprite2D)).to.be.true;
        expect(level0.hasComponent("Renderable2D")).to.not.be.true;
        expect(level0.hasComponent("Renderable2D", true)).to.be.true;

        //test addComponents
        level0.addComponents(new Sprite2D({name:"two"}), new Sprite2D({name:"three"}));
        expect(level0.components).to.have.length(5);
        //test removeComponent
        level0.removeComponent(level0.one);
        expect(level0.components).to.have.length(4);
        //test removeComponents
        level0.removeComponents(level0.two, level0.three);
        expect(level0.components).to.have.length(2);

        components = level0.components;
        expect(components[0]._name).to.equal("transform");
        expect(components[1]._name).to.equal("sprite2d");

    });

    it('GameObject find', function () {
        scene = game.scene;
        level0 = scene.find("level0");

        //can not add an component with same name(or name not assigned)
        level1 = level0.find("level1");
        expect(level1.name).to.equals("level1");

        level2 = level0.find("level2");
        expect(level2).to.be.undefined;

        level2 = new GameObject({
            name: "level2",
            components: [
                new Transform(),
            ]
        });

        level1.transform.addChild(level2.transform);
        //scene.addGameObjects(level2);

        level2 = scene.find("level2");
        expect(level2).to.not.be.undefined;
        level2 = level0.find("level2");
        expect(level2).to.not.be.undefined;
        level2 = level1.find("level2");
        expect(level2).to.not.be.undefined;

    });

    it('GameObject active test1', function () {
        scene = game.scene;
        //scene.clear();
        scene.removeGameObjects(level0, level1, level2);

        level0.transform.detachChildren();
        level1.transform.detachChildren();
        level2.transform.detachChildren();

        level0.transform.addChild(level1.transform);
        level1.transform.addChild(level2.transform);
        scene.addGameObject(level0);

        expect(level0.activeSelf).to.be.true;

        level0.setActive(false);
        expect(level0.activeSelf).to.be.false;
        expect(level0.activeInHierarchy).to.be.false;

        expect(level1.activeSelf).to.be.true;
        expect(level1.activeInHierarchy).to.be.false;

        expect(level2.activeSelf).to.be.true;
        expect(level2.activeInHierarchy).to.be.false;

        level1.setActive(false);
        expect(level1.activeSelf).to.be.false;
        expect(level1.activeInHierarchy).to.be.false;

        expect(level2.activeSelf).to.be.true;
        expect(level2.activeInHierarchy).to.be.false;

        level0.setActive(true);
        expect(level0.activeSelf).to.be.true;
        expect(level0.activeInHierarchy).to.be.true;

        expect(level1.activeSelf).to.be.false;
        expect(level1.activeInHierarchy).to.be.false;

        expect(level2.activeSelf).to.be.true;
        expect(level2.activeInHierarchy).to.be.false;

        level1.transform.removeChild(level2.transform);
        expect(level2.activeSelf).to.be.true;
        expect(level2.activeInHierarchy).to.be.true;

        level0.setActive(false);
        expect(level0.activeSelf).to.be.false;
        expect(level0.activeInHierarchy).to.be.false;

        level0.transform.addChild(level2.transform);
        expect(level2.activeSelf).to.be.true;
        expect(level2.activeInHierarchy).to.be.false;

        scene.removeGameObject(level2);
        expect(level2.activeSelf).to.be.true;
        expect(level2.activeInHierarchy).to.be.true;

        level0.transform.addChild(level2.transform);
        expect(level2.activeSelf).to.be.true;
        expect(level2.activeInHierarchy).to.be.false;

    });

});
