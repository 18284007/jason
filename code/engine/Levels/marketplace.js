class marketplace extends Phaser.Scene{

    constructor()
	{
        super({key: 'marketplace', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'marketplace';
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