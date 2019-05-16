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
	}

	create()
	{
        loadMap();
    }

    update()
    {
        callUpdateFuncs();
    }
}