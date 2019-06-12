class colchisFields extends Phaser.Scene{

    constructor()
	{
        super({key: 'colchisFields', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'colchisFields';
        backgroundLayer0 = 'bgSky';
        commonPreload();
	}

	create()
	{
        loadMap();
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

        createThis.anims.create({
            key: 'skeleIdle',
            frames: createThis.anims.generateFrameNumbers('skeleSprite', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        createThis.anims.create({
            key: 'skeleLeft',
            frames: createThis.anims.generateFrameNumbers('skeleSprite', { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
        createThis.anims.create({
            key: 'skeleRight',
            frames: createThis.anims.generateFrameNumbers('skeleSprite', { start: 13, end: 25 }),
            frameRate: 10,
            repeat: -1
        });
    
    }



    update()
    {
        callUpdateFuncs();
        if (!plow.stuck){
            plow.update();    
        }
    }
}
