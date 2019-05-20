class marketplace extends Phaser.Scene{

    constructor()
	{
        super({key: 'marketplace', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'marketplace';
        backgroundLayer0 = 'bgMarket';
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