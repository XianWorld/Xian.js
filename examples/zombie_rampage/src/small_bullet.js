var Xian = require("../../../src/xian/xian");
var Bullet = require("./components/bullet");


module.exports = new Xian.Prefab(
    new Xian.GameObject({
        components: [
            new Bullet,
            new Xian.Transform2D,
            new Xian.Sprite({
                material: Xian.Assets.get("mat_objects"),
                x: 6,
                y: 0,
                w: 1,
                h: 16,
                width: 0.0625,
                height: 1,
                layer: 1
            }),
            new Xian.RigidBody2D({
                motionState: Xian.Phys2D.P2Enums.MotionState.Dynamic,
                angularDamping: 1,
                shapes: [
                    new Xian.Phys2D.P2Rect({
                        filterGroup: 4,
                        filterMask: 8 | 1,

                        isTrigger: true,
                        extents: new Xian.Vec2(0.03125, 0.5)
                    })
                ]
            })
        ],
        tag: "Bullet"
    })
);
