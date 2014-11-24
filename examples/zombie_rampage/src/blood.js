var Xian = require("../../../src/xian/xian");


module.exports = new Xian.ParticleSystem({
    playing: false,
    emitter: new Xian.ParticleSystem.Emitter2D({
        loop: false,
        material: Xian.Assets.get("mat_blood"),

        worldSpace: true,
        emissionRate: 0.1,

        minLife: 0.1,
        maxLife: 0.3,

        minEmission: 1,
        maxEmission: 8,

        alphaTween: {
            times: [0, 0.3, 0.75, 1],
            values: [0, 0.5, 1, 0]
        },
        colorTween: {
            times: [0.5, 1],
            values: [new Xian.Color("red"), new Xian.Color("black")]
        },
        sizeTween: {
            times: [0, 0.5, 0.75, 1],
            values: [0, 0.5, 0.5, 1]
        },

        positionType: Xian.Enums.EmitterType.Circle,
        positionSpread: new Xian.Vec2(0.1, 0.1),
        positionRadius: 0.1,

        velocityType: Xian.Enums.EmitterType.Circle,
        speed: 1,
        speedSpread: 2,

        randomAngle: true,
        angularVelocitySpread: Math.PI,

        accelerationSpread: new Xian.Vec2(1, 1)
    })
});
