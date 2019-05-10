class titleScreen extends Phaser.Scene {
	constructor() {
		super({ key: "titleScreen" });	
	}
	
	create(){ //creating title screen 
	
		//images
		
		this.add.image(0,0, "titlebackground").setOrigin(0);.setDepth(0);
		
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "playbut").setDepth(1);
		
	}
	
	playButton.setInteractive();

	
		

