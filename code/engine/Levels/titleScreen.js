class titleScreen extends Phaser.Scene{

    constructor()
	{
        super({key: 'titleScreen', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'titleScreen';
		commonPreload();
		
		this.load.image('titlebg', 'assets/stage/background/titlebg.jpg');
		this.load.image('playbut', 'assets/stage/background/playbut.png');
		
		this.load.audio('water', ['assets/stage/background/water.mp3']);
		
	}

	create()
	{
 		this.add.image(0,0, "titlebg").setOrigin(0).setDepth(0);
		let playButton = this.add.image(this.game.renderer.width /2, this.game.renderer.height * 0.80, "playbut").setDepth(1);
		
		this.sound.pauseOnBlur = false;
		this.sound.play('water',
		{loop: true});	
		
		playButton.setInteractive();
    }
 
   
}