describe('xian/base/ObjectPool', function () {
    'use strict';

    var expect = chai.expect;
    var game, scene, level0, level1, level2, components, component, gameObject;

    function TestObject() {

    }
    TestObject.prototype.constructor = TestObject;

    function TestObject1() {
        this.destroyed = false;
    }
    TestObject1.prototype.constructor = TestObject1;
    TestObject1.prototype.destroy = function(){
        this.destroyed = true;
    }

    //before(function (done) {
    //    // runs before all tests in this block
    //
    //    game = new Game({
    //        debug: true,
    //        canvas: {
    //            width: 960,
    //            height: 640
    //        }
    //    });
    //
    //    scene = new Scene({
    //        name: "PlayGround"
    //    });
    //
    //    level0 = new GameObject({
    //        name: "level0",
    //        components: [
    //            new Transform(),
    //            new Camera(),
    //        ]
    //    });
    //    level1 = new GameObject({
    //        name: "level1",
    //        components: [
    //            new Transform2D(),
    //            new Camera2D(),
    //        ]
    //    });
    //    //level2 = new GameObject({
    //    //    name: "level2",
    //    //    components: [
    //    //        new Transform(),
    //    //    ]
    //    //});
    //
    //    //level0.transform.addChild(level1.transform2d);
    //
    //    scene.addGameObjects(level0);
    //    scene.addGameObjects(level1);
    //
    //    game.addScene(scene);
    //
    //    function start() {
    //        game.setScene("PlayGround");
    //        //console.log("Game Started!");
    //
    //        done();
    //    }
    //
    //    game.on("start", function () {
    //        start();
    //    });
    //    game.start();
    //});
    //
    //after(function () {
    //    // runs after all tests in this block
    //    game.destroy();
    //});

    it('ObjectPool static function', function () {

        expect(ObjectPool).to.be.a("function");

        var pool = ObjectPool.getPool(TestObject);
        expect(pool).to.be.an.instanceOf(ObjectPool);

        var pool1 = ObjectPool.getPool(TestObject);
        expect(pool).to.equals(pool1);
    });

    it('ObjectPool with object not defined destroy function', function () {

        var pool = ObjectPool.getPool(TestObject);
        var obj = pool.create();
        expect(obj).to.have.property('_objectPool', pool);
        expect(obj).to.have.property('_refCount', 1);
        expect(obj).to.have.property('_objectPool', pool);
        expect(obj).to.respondTo('retain');
        expect(obj).to.respondTo('destroy');

        expect(pool.pooled).to.have.length(0);
        expect(pool.objects).to.have.length(1);

        obj.destroy();
        expect(pool.pooled).to.have.length(1);
        expect(pool.objects).to.have.length(0);

        var obj1 = pool.create();
        expect(pool.pooled).to.have.length(0);
        expect(pool.objects).to.have.length(1);
        expect(obj1).to.have.equals(obj);

        obj1.retain();
        obj1.destroy();
        expect(pool.pooled).to.have.length(0);
        expect(pool.objects).to.have.length(1);

        obj1.destroy();
        expect(pool.pooled).to.have.length(1);
        expect(pool.objects).to.have.length(0);
    });

    it('ObjectPool with object defined destroy function', function () {

        var pool = ObjectPool.getPool(TestObject1);
        var obj = pool.create();
        expect(pool.pooled).to.have.length(0);
        expect(pool.objects).to.have.length(1);

        obj.destroy();
        expect(pool.pooled).to.have.length(1);
        expect(pool.objects).to.have.length(0);

        var obj1 = pool.create();
        expect(pool.pooled).to.have.length(0);
        expect(pool.objects).to.have.length(1);
        expect(obj1).to.have.equals(obj);

        obj1.retain();
        obj1.destroy();
        expect(pool.pooled).to.have.length(0);
        expect(pool.objects).to.have.length(1);

        obj1.destroy();
        expect(pool.pooled).to.have.length(1);
        expect(pool.objects).to.have.length(0);
    });

});
