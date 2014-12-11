
// Set configuration
seajs.config({
    base: "../../dist/"
});

seajs.use(['index-debug.js'], function (Xian) {
    console.log(Xian);

    Xian.globalize();

    var game, scene, level0, level1, level2, system;
    //var random = Math.random,
    //    PI = Math.PI,
    //    TWO_PI = PI * 2;

    function Rotate2DBehaviour(){
        Behaviour.call(this);
    }
    Behaviour.extend(Rotate2DBehaviour);
    Rotate2DBehaviour.prototype.onUpdate = function(){
        var transform = this.transform;
        //transform.position.x += 1;
        //transform.position.y += 1;
        transform.rotation += 0.01;
    };

    Assets.addAssets(
        new Texture({
            name: "img_player",
            flipY: true,
            filter: Enums.FilterMode.None,
            src: "../content/images/player.png"
        }),
        new Texture({
            name: "img_hospital",
            flipY: true,
            filter: Enums.FilterMode.None,
            src: "../content/images/hospital.png"
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
            new BehaviourSystem(),
            new Render2DSystem(),
        ]
    });

    level0 = new GameObject({
        name: "level0",
        components: [
            new Transform2D(),
            new Camera2D({
                transparent: false,
                clearBeforeRender: true,
                background: new Color(0.5, 0.5, 0.5)
            }),
            new Sprite2D({
                name: "test0",
                texture: Assets.get("img_player")
            }),
        ]
    });
    level1 = new GameObject({
        name: "level1",
        components: [
            new Transform2D({
                position: new Vec2(0,0)
            }),
            new Sprite2D({
                name: "test1",
                blendMode: Enums.blendModes.NORMAL,
                texture: Assets.get("img_player")
            }),
            new Rotate2DBehaviour()
        ]
    });

    level0.transform.addChild(level1.transform);

    scene.addGameObjects(level0);

    game.addScene(scene);

    function start() {
        game.setScene("PlayGround");
        console.log("Game Started!");

    }

    game.on("start", function () {
        start();
    });
    //game.start();

    AssetLoader.on("load", function () {
        game.start();
    }).load();

});




//
//function CameraControl(opts) {
//    opts || (opts = {});
//
//    Component.call(this, "CameraControl", opts);
//
//    this.speed = 1;
//    this.zoomSpeed = 6;
//}
//Component.extend(CameraControl);
//
//CameraControl.prototype.update = function () {
//    var transform = this.transform2d,
//        position = this.transform2d.position,
//        camera2d = this.camera2d,
//        dt = Time.delta,
//        spd = this.speed,
//        mouseWheel = Input.axis("mouseWheel");
//
//    if (Input.mouseButton(0)) {
//        position.x += -dt * spd * Input.axis("mouseX");
//        position.y += dt * spd * Input.axis("mouseY");
//    }
//    if (Input.mouseButton(1)) {
//        var instance = random() < 0.5 ? box.clone() : circle.clone();
//
//        camera2d.toWorld(Input.mousePosition, instance.transform2d.position);
//        instance.transform2d.rotation = TWO_PI * random();
//
//        this.gameObject.scene.addGameObject(instance);
//    }
//    if (mouseWheel) camera2d.setOrthographicSize(camera2d.orthographicSize + -dt * this.zoomSpeed * Input.axis("mouseWheel"));
//};
//
//
//Assets.addAssets(
//    new ShaderLib.Unlit,
//    new Texture({
//        name: "img_player",
//        flipY: true,
//        filter: Enums.FilterMode.None,
//        src: "../content/images/player.png"
//    }),
//    new Texture({
//        name: "img_hospital",
//        flipY: true,
//        filter: Enums.FilterMode.None,
//        src: "../content/images/hospital.png"
//    })
//);
//
//Assets.addAssets(
//    new Material({
//        name: "mat_player",
//        uniforms: {
//            diffuseMap: Assets.get("img_player")
//        },
//        shader: Assets.get("shader_unlit")
//    }),
//    new Material({
//        name: "mat_hospital",
//        uniforms: {
//            diffuseMap: Assets.get("img_hospital")
//        },
//        shader: Assets.get("shader_unlit")
//    })
//);
//
//game = new Game({
//    debug: true,
//    forceCanvas: false,
//    width: 960,
//    height: 640,
//    render: {
//        disableDepth: true
//    }
//});
//
//Phys2D.P2Space.DefaultBroadPhase = Phys2D.P2BroadphaseSpatialHash;
//
//var scene = new Scene({
//    name: "PlayGround",
//    world: new World2D({
//        space: {
//            useGravity: true,
//            gravity: new Vec2(0, -9.801),
//            broadphase: {
//                cellSize: 1
//            }
//        }
//    })
//});
//
//var camera = new GameObject({
//    components: [
//        new Transform2D({
//            position: new Vec2(0, 8)
//        }),
//        new Camera2D({
//            orthographicSize: 9
//        }),
//        new CameraControl
//    ],
//    tag: "Camera"
//});
//var circle = new GameObject({
//    components: [
//        new Transform2D,
//        new Sprite({
//            material: Assets.get("mat_player"),
//            x: 0,
//            y: 0,
//            w: 64,
//            h: 64,
//            width: 1,
//            height: 1
//        }),
//        new RigidBody2D({
//            motionState: Phys2D.P2Enums.MotionState.Dynamic,
//            shape: new Phys2D.P2Circle({
//                radius: 0.5
//            })
//        })
//    ]
//});
//var box = new GameObject({
//    components: [
//        new Transform2D,
//        new Sprite({
//            material: Assets.get("mat_player"),
//            x: 0,
//            y: 0,
//            w: 64,
//            h: 64,
//            width: 1,
//            height: 1
//        }),
//        new RigidBody2D({
//            motionState: Phys2D.P2Enums.MotionState.Dynamic,
//            shape: new Phys2D.P2Rect({
//                extents: new Vec2(0.5, 0.5)
//            })
//        })
//    ]
//});
//var top = new GameObject({
//    components: [
//        new Transform2D({
//            position: new Vec2(0, 32)
//        }),
//        new Sprite({
//            material: Assets.get("mat_hospital"),
//            x: 0,
//            y: 0,
//            w: 64,
//            h: 64,
//            width: 32,
//        }),
//        new RigidBody2D({
//            motionState: Phys2D.P2Enums.MotionState.Static,
//            shape: new Phys2D.P2Rect({
//                extents: new Vec2(16, 0.5)
//            })
//        })
//    ]
//});
//var bottom = new GameObject({
//    components: [
//        new Transform2D,
//        new Sprite({
//            material: Assets.get("mat_hospital"),
//            x: 0,
//            y: 0,
//            w: 64,
//            h: 64,
//            width: 32
//        }),
//        new RigidBody2D({
//            motionState: Phys2D.P2Enums.MotionState.Static,
//            shape: new Phys2D.P2Rect({
//                extents: new Vec2(16, 0.5)
//            })
//        })
//    ]
//});
//var left = new GameObject({
//    components: [
//        new Transform2D({
//            position: new Vec2(-16, 16)
//        }),
//        new Sprite({
//            material: Assets.get("mat_hospital"),
//            x: 0,
//            y: 0,
//            w: 64,
//            h: 64,
//            height: 32,
//        }),
//        new RigidBody2D({
//            motionState: Phys2D.P2Enums.MotionState.Static,
//            shape: new Phys2D.P2Rect({
//                extents: new Vec2(0.5, 16)
//            })
//        })
//    ]
//});
//var right = new GameObject({
//    components: [
//        new Transform2D({
//            position: new Vec2(16, 16)
//        }),
//        new Sprite({
//            material: Assets.get("mat_hospital"),
//            x: 0,
//            y: 0,
//            w: 64,
//            h: 64,
//            height: 32,
//        }),
//        new RigidBody2D({
//            motionState: Phys2D.P2Enums.MotionState.Static,
//            shape: new Phys2D.P2Rect({
//                extents: new Vec2(0.5, 16)
//            })
//        })
//    ]
//});
//
//scene.addGameObjects(camera, left, right, top, bottom);
//
//game.addScene(scene);
//
//
//function start() {
//    game.setGUI("Level");
//    game.setScene("PlayGround");
//    game.setCamera(game.scene.findByTagFirst("Camera"));
//}
//
//function restart() {
//    start();
//}
//
//
//game.on("start", function () {
//    start();
//});
//game.start();
//
//AssetLoader.on("load", function () {
//
//    game.start();
//}).load();

