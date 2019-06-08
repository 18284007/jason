class gardenForest extends Phaser.Scene{

    constructor()
	{
        super({key: 'gardenForest', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'gardenForest';
        backgroundLayer0 = 'bgSky';
        backgroundLayer1 = 'bgForest';
        commonPreload();
		
		this.load.spritesheet('snake','assets/enemy/snake.png',
		{	frameWidth: 120, frameHeight: 83});	
			

	}

	create()
	{

        loadMap();  

		createThis.anims.create({
        key: 'snakeLeft',
        frames: createThis.anims.generateFrameNumbers('snake', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });
		createThis.anims.create({
        key: 'snakeRight',
        frames: createThis.anims.generateFrameNumbers('snake', { start: 1, end: 1 }),
        frameRate: 10,
        repeat: -1
    });
	
    }

    update()
    {
        callUpdateFuncs(); 
		
    }
}