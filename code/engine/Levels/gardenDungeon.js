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
    }

    update()
    {
        callUpdateFuncs();
    }
}