class palace extends Phaser.Scene{

    constructor()
	{
        super({key: 'palace', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'palace';
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