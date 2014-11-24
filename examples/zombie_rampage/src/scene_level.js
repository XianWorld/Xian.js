var Xian = require("../../../src/xian/xian");
var CameraControl = require("./components/camera_control");
var Level = require("./components/level");
//Xian.Phys2D.P2Space.DefaultBroadPhase = Xian.Phys2D.P2BroadphaseSpatialHash;

var sceneLevel = new Xian.Scene({
    name: "Level",
    world: new Xian.World2D({
        space: {
            useGravity: false
        }
    })
});
var camera = new Xian.GameObject({
    components: [
        new Xian.Transform2D,
        new Xian.Camera2D({
            background: new Xian.Color("black"),

            orthographicSize: 6,
            minOrthographicSize: 2,
            maxOrthographicSize: 8
        }),
        new CameraControl
    ],
    tag: "Camera"
});
var background = new Xian.GameObject({
    components: [
        new Xian.Transform2D,
        new Xian.Sprite({
            material: Xian.Assets.get("mat_hospital"),
            x: 0,
            y: 0,
            w: 480,
            h: 320,
            width: 30,
            height: 20,
            layer: 0
        }),
        new Xian.AudioSource({
            playOnStart: true,
            loop: true,
            dopplerLevel: 0,
            volume: 0.1,
            clip: Xian.Assets.get("snd_sure_shot")
        }),
        new Level
    ],
    tag: "Level"
});
var wall_top = new Xian.GameObject({
    components: [
        new Xian.Transform2D({
            position: new Xian.Vec2(0, 12)
        }),
        new Xian.RigidBody2D({
            mass: 0,
            shape: new Xian.Phys2D.P2Rect({
                filterGroup: 1,
                filterMask: 1 | 4,
                extents: new Xian.Vec2(16, 4)
            })
        })
    ],
    tags: ["Wall", "Top"]
});
var wall_bottom = new Xian.GameObject({
    components: [
        new Xian.Transform2D({
            position: new Xian.Vec2(0, -10)
        }),
        new Xian.RigidBody2D({
            mass: 0,
            shape: new Xian.Phys2D.P2Rect({
                filterGroup: 1,
                filterMask: 1 | 4,
                extents: new Xian.Vec2(16, 4)
            })
        })
    ],
    tags: ["Wall", "Bottom"]
});
var wall_left = new Xian.GameObject({
    components: [
        new Xian.Transform2D({
            position: new Xian.Vec2(-18, 0)
        }),
        new Xian.RigidBody2D({
            mass: 0,
            shape: new Xian.Phys2D.P2Rect({
                filterGroup: 1,
                filterMask: 1 | 4,
                extents: new Xian.Vec2(4, 16)
            })
        })
    ],
    tags: ["Wall", "Left"]
});
var wall_right = new Xian.GameObject({
    components: [
        new Xian.Transform2D({
            position: new Xian.Vec2(18, 0)
        }),
        new Xian.RigidBody2D({
            mass: 0,
            shape: new Xian.Phys2D.P2Rect({
                filterGroup: 1,
                filterMask: 1 | 4,
                extents: new Xian.Vec2(4, 16)
            })
        })
    ],
    tags: ["Wall", "Right"]
});

sceneLevel.addGameObjects(camera, wall_top, wall_bottom, wall_left, wall_right, background);

module.exports = sceneLevel;
