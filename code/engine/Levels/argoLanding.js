var newGraphics;
var oileus;
var Iphiclus;

class argoLanding extends Phaser.Scene{

    constructor()
	{
        super({key: 'argoLanding', active: false });
	}

	preload()
	{
        
        createThis = this;
        currentLevelID = 'argoLanding';
        commonPreload();

	this.load.audio('female', ['assets/stage/background/female.mp3']);	
		
        //Placeholder
        //this.load.image('bonfireSprite','assets/bonfire.png');
        
	}

	create()
	{

        loadMap();
        
	this.sound.pauseOnBlur = false;
		this.sound.play('female',
		{loop: true});
        
    }

    update()
    {
        callUpdateFuncs();
    }
}
