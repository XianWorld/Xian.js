// Set configuration
seajs.config({
    base: "../../dist/"
});

seajs.use(['index-debug.js'], function (Xian) {
    console.log(Xian);

    Xian.globalize();

    var game, scene, level0, level1, level2, system;

    //function GraphicsBehaviour(){
    //    Behaviour.call(this);
    //}
    //Behaviour.extend(GraphicsBehaviour);
    //GraphicsBehaviour.prototype.onStart = function(){
    //    var graphics = this.gameObject.graphics;
    //    // set a fill and line style
    //    graphics.beginFill(0xFF3300);
    //    graphics.lineStyle(10, 0xffd900, 1);
    //
    //    // draw a shape
    //    graphics.moveTo(50,50);
    //    graphics.lineTo(250, 50);
    //    graphics.lineTo(100, 100);
    //    graphics.lineTo(250, 220);
    //    graphics.lineTo(50, 220);
    //    graphics.lineTo(50, 50);
    //    graphics.endFill();
    //
    //    // set a fill and line style again
    //    graphics.lineStyle(10, 0xFF0000, 0.8);
    //    graphics.beginFill(0xFF700B, 1);
    //
    //    // draw a second shape
    //    graphics.moveTo(210,300);
    //    graphics.lineTo(450,320);
    //    graphics.lineTo(570,350);
    //    graphics.quadraticCurveTo(600, 0, 480,100);
    //    graphics.lineTo(330,120);
    //    graphics.lineTo(410,200);
    //    graphics.lineTo(210,300);
    //    graphics.endFill();
    //
    //    // draw a rectangle
    //    graphics.lineStyle(2, 0x0000FF, 1);
    //    graphics.drawRect(50, 250, 100, 100);
    //
    //    // draw a circle
    //    graphics.lineStyle(0);
    //    graphics.beginFill(0xFFFF0B, 0.5);
    //    graphics.drawCircle(470, 200,100);
    //    graphics.endFill();
    //
    //    graphics.lineStyle(20, 0x33FF00);
    //    graphics.moveTo(30,30);
    //    graphics.lineTo(600, 300);
    //};

    function Sprite2DBehaviour(opts) {
        Behaviour.call(this, opts);
    }

    Behaviour.extend(Sprite2DBehaviour);
    Sprite2DBehaviour.prototype.onStart = function () {
    };
    Sprite2DBehaviour.prototype.onUpdate = function () {
        var transform = this.transform;
        //transform.position.x += 1;
        //transform.position.y += 1;
        transform.rotation += 0.01;
        //var sprite2d = this.gameObject.sprite2d_0;
        //if(sprite2d.mask)
        //{
        //    sprite2d.mask.width += 1;
        //    sprite2d.mask.height += 1;
        //}
    };

    //function CacheAsBitmapBehaviour(opts){
    //    Behaviour.call(this,opts);
    //
    //    this.cached = false;
    //}
    //Behaviour.extend(CacheAsBitmapBehaviour);
    //CacheAsBitmapBehaviour.prototype.onStart = function(){
    //
    //};
    //CacheAsBitmapBehaviour.prototype.onUpdate = function(){
    //    if(this.cached) return;
    //
    //    var gameObject = this.gameObject;
    //    var sprite2d = gameObject.addComponent(new Sprite2D());
    //    var camera2d = gameObject.addComponent(new Camera2D({name: "camera_temp"}));
    //
    //    var children = gameObject.transform.children;
    //    camera2d.update();
    //    camera2d.renderTexture = new RenderTexture({width: 300, height: 300});
    //    camera2d.render(children);
    //    camera2d.enabled = false;
    //    //sprite2d.enabled = false;
    //
    //    sprite2d.texture = camera2d.renderTexture;
    //
    //    //var i = children.length;
    //    //while(i--)
    //    //    children[i].gameObject.setActive(false);
    //
    //    this.cached = true;
    //};

    Assets.addAssets(
        new Texture({
            name: "img_player",
            flipY: true,
            //filter: Enums.FilterMode.None,
            src: "../content/images/player.png"
        }),
        new Texture({
            name: "img_hospital",
            flipY: true,
            //filter: Enums.FilterMode.None,
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
            //canvasRenderer: CanvasRenderer2D,
            //canvasRenderer: PIXICanvasRenderer2D,
            //webglRenderer: WebGLRenderer2D
            webglRenderer: PIXIWebGLRenderer2D,
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
            new Transform2D({
                //identity: true
            }),
            new Camera2D({
                //enabled: false,
                transparent: false,
                clearBeforeRender: true,
                background: new Color(0.5, 0.5, 0.5)
            }),
            new TilingSprite2D({
                texture: Assets.get("img_player"),
                destWidth: 500,
                destHeight: 500,
                alpha: 0.5,
                tint: 0xff0000,
            }),
            new Sprite2D({
                //enabled: false,
                name: "sprite2d_0",
                alpha: 1,
                tint: 0xff0000,
                //mask: new Rect(10,10,20,20),
                texture: Assets.get("img_player")
            }),
            new Renderer2D,
            //new Graphics({
            //    //name: "graphics_0",
            //    isMask: true
            //}),
            //new GraphicsBehaviour()
            //new CacheAsBitmapBehaviour
        ]
    });
    level1 = new GameObject({
        name: "level1",
        active: false,
        components: [
            new Transform2D({
                //identity: true
                position: new Vec2(100, 100)
            }),
            new Sprite2D({
                name: "sprite2d_1",
                alpha: 0.5,
                //tint: 0x00ff00,
                //blendMode: Enums.blendModes.ADD,
                texture: Assets.get("img_player")
            }),
            new Renderer2D({
                filters: [
                    //new FilterLib._classes.BlurXFilter({
                    //    blur: 30
                    //}),
                    //new FilterLib._classes.AsciiFilter({
                    //    size: 16
                    //}),
                    //new FilterLib._classes.ColorMatrixFilter({
                    //    matrix: [
                    //        1, 0, 0, 0,
                    //        0, 1, 0, 0,
                    //        0, 0, 0, 0,
                    //        0, 0, 0, 1
                    //    ]
                    //})
                    new FilterLib._classes.ColorStepFilter(),
                ],
            }),
            new Sprite2DBehaviour({
                //enabled: false
            })
        ]
    });
    level2 = new GameObject({
        name: "level2",
        active: false,
        components: [
            new Transform2D({
                //identity: true
                position: new Vec2(-50, -50),
                rotation: 0.5
            }),
            new Sprite2D({
                name: "sprite2d_1",
                alpha: 0.5,
                tint: 0x00ff00,
                //blendMode: Enums.blendModes.ADD,
                texture: Assets.get("img_player")
            }),
            new Renderer2D({
                alpha: 0.5,
                filters: [
                    new FilterLib._classes.BlurXFilter({
                        blur: 30
                    }),
                ]
            }),
            new Sprite2DBehaviour({
                //enabled: false
            })
        ]
    });

    level1.transform.addChild(level2.transform);
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

