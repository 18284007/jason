class argoLanding extends Phaser.Scene{

    constructor()
	{
        super({key: 'argoLanding', active: false });
	}

	preload()
	{
        
        createThis = this;
        currentLevelID = 'argoLanding';
        backgroundLayer0 = 'bgSky';
        commonPreload();

		
		
        //Placeholder
        //this.load.image('bonfireSprite','assets/bonfire.png');
        
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
