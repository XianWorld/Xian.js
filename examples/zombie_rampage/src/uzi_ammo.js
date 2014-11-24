var Xian = require("../../../src/xian/xian");
var Item = require("./components/item");


module.exports = new Xian.Prefab(
    new Xian.GameObject({
        components: [
            new Item({
                type: 1
            }),
            new Xian.Transform2D,
            new Xian.Sprite({
                material: Xian.Assets.get("mat_objects"),
                x: 24,
                y: 0,
                w: 9,
                h: 13,
                width: 0.5625,
                height: 0.8125,
                layer: 1
            }),
            new Xian.RigidBody2D({
                motionState: Xian.Phys2D.P2Enums.MotionState.Dynamic,
                shapes: [
                    new Xian.Phys2D.P2Rect({
                        filterGroup: 2,
                        filterMask: 1,

                        isTrigger: true,
                        extents: new Xian.Vec2(0.28125, 0.40625)
                    })
                ]
            })
        ],
        tag: "Ammo"
    })
);
