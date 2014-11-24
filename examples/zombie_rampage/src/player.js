var Xian = require("../../../src/xian/xian");
var Player = require("./components/player");
var blood = require("./blood");


module.exports = new Xian.Prefab(
    new Xian.GameObject({
        components: [
            new Player,
            blood.clone(),
            new Xian.Transform2D,
            new Xian.Sprite({
                material: Xian.Assets.get("mat_player"),
                x: 0,
                y: 0,
                w: 16,
                h: 16,
                layer: 1
            }),
            new Xian.SpriteAnimation({
                sheet: Xian.Assets.get("ss_small"),
                rate: 0
            }),
            new Xian.AudioSource({
                dopplerLevel: 0,
            }),
            new Xian.RigidBody2D({
                motionState: Xian.Phys2D.P2Enums.MotionState.Dynamic,
                linearDamping: 0.999,
                angularDamping: 1,
                shapes: [
                    new Xian.Phys2D.P2Rect({
                        filterGroup: 1,
                        filterMask: 1 | 2,

                        position: new Xian.Vec2(0, -0.25),
                        extents: new Xian.Vec2(0.5, 0.25)
                    }),
                    new Xian.Phys2D.P2Rect({
                        filterGroup: 8,
                        filterMask: 4,

                        isTrigger: true,
                        extents: new Xian.Vec2(0.5, 0.5)
                    })
                ]
            })
        ],
        tag: "Player"
    })
);
