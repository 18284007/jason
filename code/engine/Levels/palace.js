class palace extends Phaser.Scene {
    constructor() {
        super({key: 'palace', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'palace';
        backgroundLayer0 = 'bgSky';
        commonPreload();

        createThis.anims.create({
            key: 'kingIdleLeft',
            frames: createThis.anims.generateFrameNumbers('kingSprite', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        createThis.anims.create({
            key: 'kingIdleRight',
            frames: createThis.anims.generateFrameNumbers('kingSprite', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
    }

    create() {
        loadMap();
    }

    update() {
        callUpdateFuncs();
    }
}
