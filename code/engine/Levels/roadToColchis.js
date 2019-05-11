class roadToColchis extends Phaser.Scene{

    constructor()
	{
        super({key: 'roadToColchis', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'roadtoColchis';
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