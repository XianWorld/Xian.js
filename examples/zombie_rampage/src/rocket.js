var Xian = require("../../../src/xian/xian");
var Bullet = require("./components/bullet");


module.exports = new Xian.Prefab(
    new Xian.GameObject({
        components: [
            new Bullet,
            new Xian.Transform2D,
            new Xian.Sprite({
                material: Xian.Assets.get("mat_objects"),
                x: 7,
                y: 0,
                w: 5,
                h: 11,
                width: 0.3125,
                height: 0.6875,
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
                        extents: new Xian.Vec2(0.15625, 0.34375)
                    })
                ]
            }),
            new Xian.ParticleSystem({
                playing: true,
                emitter: new Xian.ParticleSystem.Emitter2D({
                    loop: true,
                    material: Xian.Assets.hash["mat_smoke"],

                    worldSpace: true,
                    emissionRate: 0.1,

                    minLife: 1,
                    maxLife: 2,

                    minEmission: 1,
                    maxEmission: 4,

                    color: new Xian.Color("white"),

                    alphaTween: {
                        times: [0, 0.3, 0.75, 1],
                        values: [0, 0.25, 0.5, 0]
                    },
                    sizeTween: {
                        times: [0, 1],
                        values: [0.5, 1]
                    },

                    positionType: Xian.Enums.EmitterType.Circle,
                    positionSpread: new Xian.Vec2(0, 0),
                    positionRadius: 0.01,

                    velocityType: Xian.Enums.EmitterType.Circle,
                    speed: 0,
                    speedSpread: 0.1,

                    randomAngle: true,
                    angularVelocitySpread: Math.PI,

                    accelerationSpread: new Xian.Vec2(0.01, 0.01)
                })
            })
        ],
        tag: "Bullet"
    })
);
