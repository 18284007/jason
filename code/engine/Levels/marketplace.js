class marketplace extends Phaser.Scene{

    constructor()
	{
        super({key: 'marketplace', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'marketplace';
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