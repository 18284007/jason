class gardenEntrance extends Phaser.Scene{

    constructor()
	{
        super({key: 'gardenEntrance', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'gardenEntrance';
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