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
        currentLevelID = 'pause';
		
		this.add.image(0,0, "menubut").setOrigin(0).setDepth(0);
		
		
		
		this.input.on('pointerup', function () {
			
		
			if (pauseKey.isDown) {
				
			let toPauseButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "menubut").setDepth(1).setInteractive();	
			
			 this.scene.pause(currentLevelID);
			
			// this.scene.resume(currentLevelID);
		}
		}

	}	
}	
		
	
