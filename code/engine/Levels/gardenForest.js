class gardenForest extends Phaser.Scene{

    constructor()
	{
        super({key: 'gardenForest', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'gardenForest';
        backgroundLayer0 = 'bgForest';
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