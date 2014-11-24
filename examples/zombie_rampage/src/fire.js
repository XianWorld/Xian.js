var Xian = require("../../../src/xian/xian");
var Bullet = require("./components/bullet");


module.exports = new Xian.Prefab(
    new Xian.GameObject({
        components: [
            new Bullet,
            new Xian.Transform2D,
            new Xian.Sprite({
                material: Xian.Assets.get("mat_objects"),
                x: 96,
                y: 16,
                w: 32,
                h: 32,
                width: 1,
                height: 1,
                layer: 1
            }),
            new Xian.SpriteAnimation({
                sheet: Xian.Assets.get("ss_fire"),
                rate: 0.1,
                mode: Xian.Enums.WrapMode.Clamp
            }),
            new Xian.RigidBody2D({
                motionState: Xian.Phys2D.P2Enums.MotionState.Dynamic,
                angularDamping: 1,
                shapes: [
                    new Xian.Phys2D.P2Rect({
                        filterGroup: 4,
                        filterMask: 8 | 1,

                        isTrigger: true,
                        extents: new Xian.Vec2(0.5, 0.5)
                    })
                ]
            })
        ],
        tag: "Bullet"
    })
);
