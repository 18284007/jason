
class endScreen extends Phaser.Scene {
	constructor() {
		super({ key: "endScreen", active: false});	
	}

	preload()
	{
		//end game image
		this.load.image('endbg', 'assets/stage/background/endbg.png');
		this.load.image('menubut', 'assets/stage/background/menubut.png');
	}
	
	create(){ //creating end screen 
		createThis = this;
        currentLevelID = 'endScreen';
		//images
		
		this.add.image(0,0, "endbg").setOrigin(0).setDepth(0);
		
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "menubut").setDepth(1);
		playButton.setInteractive();
		
	}
	
}

		

