class gardenFleece extends Phaser.Scene{

    constructor()
	{
        super({key: 'gardenFleece', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'gardenFleece';
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