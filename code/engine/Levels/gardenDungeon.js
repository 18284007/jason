class gardenDungeon extends Phaser.Scene{

    constructor()
	{
        super({key: 'gardenDungeon', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'gardenDungeon';
        backgroundLayer0 = 'bgDungeon';
        commonPreload();
		
		this.load.spritesheet('bats','assets/enemy/bats.png',
		{	frameWidth: 100, frameHeight: 140});	
        this.load.spritesheet('minotaurSprite', 'assets/enemy/minotaur.png',
        {frameWidth: 48, frameHeight: 48});	
	}

	create()
	{
        loadMap();

        createThis.anims.create({
            key: 'batsLeft',
            frames: createThis.anims.generateFrameNumbers('bats', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        createThis.anims.create({
            key: 'batsRight',
            frames: createThis.anims.generateFrameNumbers('bats', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        createThis.anims.create({
            key: 'minotaurWalkLeft',
            frames: createThis.anims.generateFrameNumbers('minotaurSprite', { start: 20, end: 29 }),
            frameRate: 10,
            repeat: -1
        });
        createThis.anims.create({
            key: 'minotaurSwingLeft',
            frames: createThis.anims.generateFrameNumbers('minotaurSprite', { start: 30, end: 39}),
            frameRate: 30,
            repeat: -1
        });
    }

    update()
    {
        callUpdateFuncs();
    }
}