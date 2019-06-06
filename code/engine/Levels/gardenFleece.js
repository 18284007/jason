class gardenFleece extends Phaser.Scene{

    constructor()
	{
        super({key: 'gardenFleece', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'gardenFleece';
        backgroundLayer0 = 'bgSky';
        this.load.spritesheet('dragonSprite','assets/enemy/dragon.png', 
           { frameWidth: 205, frameHeight: 161 });
        commonPreload();
	}

	create()
	{
        this.anims.create({
            key: 'dragonSpriteRight',
            frames: createThis.anims.generateFrameNumbers('dragonSprite', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        loadMap();

    }

    update()
    {
        callUpdateFuncs();
    }
}