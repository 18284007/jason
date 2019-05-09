class endScreen extends Phaser.Scene {
	constructor() {
		super({ key: "endScreen" });	
	}
	
	create(){ //creating end screen 
	
		//images
		
		this.add.image(0,0, "endbg").setOrigin(0);.setDepth(0);
		
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "menubut").setDepth(1);
		
	}
	
	playButton.setInteractive();

	
		

