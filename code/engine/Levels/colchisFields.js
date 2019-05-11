class colchisFields extends Phaser.Scene{

    constructor()
	{
        super({key: 'colchisFields', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'colchiesFields';
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