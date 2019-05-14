class riverCrossing extends Phaser.Scene{

    constructor()
	{
        super({key: 'riverCrossing', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'riverCrossing';
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