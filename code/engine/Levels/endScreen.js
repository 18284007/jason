
class endScreen extends Phaser.Scene {
	constructor() {
		super({ key: "endScreen", active: false});	
	}

	preload()
	{
		createThis = this;
        currentLevelID = 'endScreen';
		//end game image
		this.load.image('endbg', 'assets/stage/background/endbg.png');
		this.load.image('menubut', 'assets/stage/background/menubut.png');
	}
	
	create(){ //creating end screen 
		//images
		
		this.add.image(0,0, "endbg").setOrigin(0).setDepth(0);
		let toMenuButton = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height * 0.8, "menubut").setDepth(1).setInteractive();
		
		
		toMenuButton.on("pointerup", ()=>{
			changeLevel('titleScreen');
		
	});
		
	}
}

		

