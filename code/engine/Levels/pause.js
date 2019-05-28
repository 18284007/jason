class pause extends Phaser.Scene {
	constructor() {
		super({ key: "pause", active: false});	
	}
	
		preload()
	{
		//pause image
		
		this.load.image('resumebut', 'assets/stage/background/resumebut.png');
		this.load.image('pausebg', 'assets/stage/background/pausebg.png');
		this.load.image('mapMenu', 'assets/stage/background/mapMenu.png');		
	}
	
	create(){ 
		//createThis = this;
        game.scene.pause(currentLevelID);
		
		this.add.image(0,0, "pausebg").setOrigin(0).setDepth(0);		
	
		
		let toPauseButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.5, "resumebut").setDepth(1).setInteractive();
		let toMapMenu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.7, "mapMenu").setDepth(1).setInteractive();		
		
		 toPauseButton.on('pointerup', function () {
		 game.scene.resume(currentLevelID);
		 game.scene.stop('pause');			
		
		});	 
				
		 toMapMenu.on('pointerup', ()=>{
		 changeLevel('mapMenu');
		 game.scene.stop('pause');			
		
		});	 				
			
			 
			

		
		

	}
}	
		
	