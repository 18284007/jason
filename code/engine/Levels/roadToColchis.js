class roadToColchis extends Phaser.Scene{

    constructor()
	{
        super({key: 'roadToColchis', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'roadToColchis';
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