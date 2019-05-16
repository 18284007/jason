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