var Xian = require("../../../src/xian/xian");


Xian.Assets.addAssets(
    new Xian.ShaderLib.Unlit,
    new Xian.ShaderLib.ParticleUnlit,
    new Xian.Texture({
        src: "content/hospital.png",
        name: "img_hospital",
        flipY: false,
        filter: Xian.Enums.FilterMode.None
    }),
    new Xian.Texture({
        name: "img_smoke",
        src: "content/smoke.png",
        flipY: false,
        filter: Xian.Enums.FilterMode.None
    }),
    new Xian.Texture({
        src: "content/blood.png",
        name: "img_blood",
        flipY: false,
        filter: Xian.Enums.FilterMode.None
    }),
    new Xian.Texture({
        name: "img_objects",
        src: "content/objects.png",
        flipY: false,
        filter: Xian.Enums.FilterMode.None
    }),
    new Xian.Texture({
        name: "img_player",
        src: "content/player.png",
        flipY: false,
        filter: Xian.Enums.FilterMode.None
    }),
    new Xian.Texture({
        name: "img_zombie",
        src: "content/zombie.png",
        flipY: false,
        filter: Xian.Enums.FilterMode.None
    }),
    new Xian.Texture({
        name: "img_zombie_big",
        src: "content/zombie_big.png",
        flipY: false,
        filter: Xian.Enums.FilterMode.None
    }),
    new Xian.Texture({
        name: "img_zombie_red",
        src: "content/zombie_red.png",
        flipY: false,
        filter: Xian.Enums.FilterMode.None
    }),

    new Xian.AudioClip({
        name: "snd_sure_shot",
        src: [
            "content/audio/sure_shot.ogg",
            "content/audio/sure_shot.mp3"
        ]
    }),
    new Xian.AudioClip({
        name: "snd_fire",
        src: "content/audio/fire.ogg"
    }),
    new Xian.AudioClip({
        name: "snd_rocket",
        src: "content/audio/rocket.ogg"
    }),
    new Xian.AudioClip({
        name: "snd_shot_short",
        src: "content/audio/shot_short.ogg"
    }),
    new Xian.AudioClip({
        name: "snd_shot_mid",
        src: [
            "content/audio/shot_mid.ogg",
            "content/audio/shot_mid.mp3"
        ]
    }),
    new Xian.AudioClip({
        name: "snd_shot_long",
        src: "content/audio/shot_long.ogg"
    }),

    new Xian.AudioClip({
        name: "snd_player_moan1",
        src: [
            "content/audio/player_moan1.ogg",
            "content/audio/player_moan1.mp3"
        ]
    }),
    new Xian.AudioClip({
        name: "snd_player_moan2",
        src: [
            "content/audio/player_moan2.ogg",
            "content/audio/player_moan2.mp3"
        ]
    }),
    new Xian.AudioClip({
        name: "snd_player_moan3",
        src: [
            "content/audio/player_moan3.ogg",
            "content/audio/player_moan3.mp3"
        ]
    }),

    new Xian.AudioClip({
        name: "snd_zombie_moan1",
        src: "content/audio/zombie_moan1.ogg"
    }),
    new Xian.AudioClip({
        name: "snd_zombie_moan2",
        src: "content/audio/zombie_moan2.ogg"
    }),
    new Xian.AudioClip({
        name: "snd_zombie_moan3",
        src: "content/audio/zombie_moan3.ogg"
    }),
    new Xian.AudioClip({
        name: "snd_zombie_moan4",
        src: "content/audio/zombie_moan4.ogg"
    }),

    new Xian.SpriteSheet({
        name: "ss_mid",
        src: "content/32x32.json"
    }),
    new Xian.SpriteSheet({
        name: "ss_small",
        src: "content/16x16.json"
    }),
    new Xian.SpriteSheet({
        name: "ss_fire",
        src: "content/fire.json"
    })
);

Xian.Assets.addAssets(
    new Xian.Material({
        name: "mat_hospital",
        uniforms: {
            diffuseMap: Xian.Assets.get("img_hospital")
        },
        shader: Xian.Assets.get("shader_unlit")
    }),
    new Xian.Material({
        name: "mat_smoke",
        uniforms: {
            diffuseMap: Xian.Assets.get("img_smoke")
        },
        shader: Xian.Assets.get("shader_particle_unlit")
    }),
    new Xian.Material({
        name: "mat_blood",
        uniforms: {
            diffuseMap: Xian.Assets.get("img_blood")
        },
        shader: Xian.Assets.get("shader_particle_unlit")
    }),
    new Xian.Material({
        name: "mat_objects",
        uniforms: {
            diffuseMap: Xian.Assets.get("img_objects")
        },
        shader: Xian.Assets.get("shader_unlit")
    }),
    new Xian.Material({
        name: "mat_player",
        uniforms: {
            diffuseMap: Xian.Assets.get("img_player")
        },
        shader: Xian.Assets.get("shader_unlit")
    }),
    new Xian.Material({
        name: "mat_zombie",
        uniforms: {
            diffuseMap: Xian.Assets.get("img_zombie")
        },
        shader: Xian.Assets.get("shader_unlit")
    }),
    new Xian.Material({
        name: "mat_zombie_big",
        uniforms: {
            diffuseMap: Xian.Assets.get("img_zombie_big")
        },
        shader: Xian.Assets.get("shader_unlit")
    }),
    new Xian.Material({
        name: "mat_zombie_red",
        uniforms: {
            diffuseMap: Xian.Assets.get("img_zombie_red")
        },
        shader: Xian.Assets.get("shader_unlit")
    })
);
