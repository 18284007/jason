class riverCrossing extends Phaser.Scene{

    constructor()
	{
        super({key: 'riverCrossing', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'riverCrossing';
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