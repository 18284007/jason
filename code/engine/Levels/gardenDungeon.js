class gardenDungeon extends Phaser.Scene{

    constructor()
	{
        super({key: 'gardenDungeon', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'gardenDungeon';
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