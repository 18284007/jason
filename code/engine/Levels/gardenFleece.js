class gardenFleece extends Phaser.Scene{

    constructor()
	{
        super({key: 'gardenFleece', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'gardenFleece';
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