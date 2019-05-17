class palace extends Phaser.Scene{

    constructor()
	{
        super({key: 'palace', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'palace';
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