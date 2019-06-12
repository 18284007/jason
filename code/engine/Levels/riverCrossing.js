class riverCrossing extends Phaser.Scene {
    constructor() {
        super({key: 'riverCrossing', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'riverCrossing';
        backgroundLayer0 = 'bgSky';
        commonPreload();

        this.load.spritesheet('fox','assets/enemy/fox.png',
        {frameWidth: 120, frameHeight: 79});    
    }

    create() {
        loadMap();

        createThis.anims.create({
            key: 'foxLeft',
            frames: createThis.anims.generateFrameNumbers('fox', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        createThis.anims.create({
            key: 'foxRight',
            frames: createThis.anims.generateFrameNumbers('fox', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
    }
        
    update() {
        callUpdateFuncs();
    }
}