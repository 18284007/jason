class shrine extends Phaser.Scene{

    constructor()
	{
        super({key: 'shrine', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'shrine';
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