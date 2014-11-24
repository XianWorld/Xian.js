var Xian = require("../../../src/xian/xian");
var Enemy = require("./components/enemy");
var blood = require("./blood");


module.exports = new Xian.Prefab(
    new Xian.GameObject({
        components: [
            new Enemy({
                lineOfSight: 16,
                spd: 1,
                def: 6,
                atk: 10,
                hp: 32,

                drop: 4
            }),
            blood.clone(),
            new Xian.Transform2D,
            new Xian.Sprite({
                material: Xian.Assets.get("mat_zombie_big"),
                x: 0,
                y: 0,
                w: 32,
                h: 32,
                width: 2,
                height: 2,
                layer: 1
            }),
            new Xian.SpriteAnimation({
                sheet: Xian.Assets.get("ss_mid"),
                rate: 0
            }),
            new Xian.AudioSource({
                dopplerLevel: 0
            }),
            new Xian.RigidBody2D({
                motionState: Xian.Phys2D.P2Enums.MotionState.Dynamic,
                linearDamping: 0.999,
                angularDamping: 1,
                mass: 0.5,
                shapes: [
                    new Xian.Phys2D.P2Rect({
                        filterGroup: 1,
                        filterMask: 1,

                        position: new Xian.Vec2(0, -0.5),
                        extents: new Xian.Vec2(1, 0.5)
                    }),
                    new Xian.Phys2D.P2Rect({
                        filterGroup: 8,
                        filterMask: 4,

                        isTrigger: true,
                        extents: new Xian.Vec2(1, 1)
                    })
                ]
            })
        ],
        tag: "Enemy"
    })
);
