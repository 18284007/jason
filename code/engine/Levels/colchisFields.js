class colchisFields extends Phaser.Scene{

    constructor()
	{
        super({key: 'colchisFields', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'colchisFields';
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
