class pause extends Phaser.Scene {
	constructor() {
		super({ key: "pause", active: false});	
	}
	
		preload()
	{
		//pause image
		
		this.load.image('menubut', 'assets/stage/background/menubut.png');
	}
	
	create(){ 
		createThis = this;
        game.scene.pause(currentLevelID);
		
		this.add.image(0,0, "menubut").setOrigin(0).setDepth(0);
		
		let toPauseButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "menubut").setDepth(1).setInteractive();
		
		 toPauseButton.on('pointerup', function () {
			
		
			 
				
				
			
			 
			
		 game.scene.resume(currentLevelID);
		 game.scene.stop('pause');
		
		});

	}
}	
		
	