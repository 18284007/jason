class mapMenu extends Phaser.Scene {
	constructor() {
		super({ key: "mapMenu", active: false});	
	}

	preload()
	{
		createThis = this;
        currentLevelID = 'mapMenu';
		//end game image
		this.load.image('mapbg1', 'assets/stage/background/mapcolchis/mapbg1.png');
		this.load.image('dot1', 'assets/stage/background/mapcolchis/dot1.png');
		this.load.image('dot2', 'assets/stage/background/mapcolchis/dot2.png');
		this.load.image('dot3', 'assets/stage/background/mapcolchis/dot3.png');
		this.load.image('dot4', 'assets/stage/background/mapcolchis/dot4.png');
		this.load.image('dot5', 'assets/stage/background/mapcolchis/dot5.png');
		this.load.image('dot6', 'assets/stage/background/mapcolchis/dot6.png');
		this.load.image('dot7', 'assets/stage/background/mapcolchis/dot7.png');
		this.load.image('dot8', 'assets/stage/background/mapcolchis/dot8.png');
		this.load.image('dot9', 'assets/stage/background/mapcolchis/dot9.png');
		this.load.image('dot10', 'assets/stage/background/mapcolchis/dot10.png');
		this.load.image('dot11', 'assets/stage/background/mapcolchis/dot11.png');
		this.load.image('dot12', 'assets/stage/background/mapcolchis/dot12.png');
		
	}
	
	create(){ //creating end screen 
		//images
		
		this.add.image(0,0, "mapbg1").setOrigin(0).setDepth(0);
		let toDot1 = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height*0.5, "dot1").setDepth(1).setInteractive();
		let toDot2 = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height*0.5, "dot2").setDepth(1).setInteractive();		
		let toDot3 = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height*0.5, "dot3").setDepth(1).setInteractive();		
		let toDot4 = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height*0.5, "dot4").setDepth(1).setInteractive();
		let toDot5 = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height*0.5, "dot5").setDepth(1).setInteractive();
		let toDot6 = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height*0.5, "dot6").setDepth(1).setInteractive();
		let toDot7 = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height*0.5, "dot7").setDepth(1).setInteractive();
		let toDot8 = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height*0.5, "dot8").setDepth(1).setInteractive();
		let toDot9 = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height*0.5, "dot9").setDepth(1).setInteractive();
		let toDot10 = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height*0.5, "dot10").setDepth(1).setInteractive();
		let toDot11 = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height*0.5, "dot11").setDepth(1).setInteractive();
		let toDot12 = this.add.image(this.game.renderer.width*0.5, this.game.renderer.height*0.5, "dot12").setDepth(1).setInteractive();

		
		toDot1.on("pointerup", ()=>{ changeLevel('argoLanding');
			});
		
		toDot2.on("pointerup", ()=>{ changeLevel('roadToColchis');
			});

		toDot3.on("pointerup", ()=>{changeLevel('marketplace');
			});

		toDot4.on("pointerup", ()=>{changeLevel('palace');
			});

		toDot5.on("pointerup", ()=>{changeLevel('shrine')
			;});

		toDot6.on("pointerup", ()=>{changeLevel('shrineForest');
			});

		toDot7.on("pointerup", ()=>{changeLevel('colchisFields');
			});

		toDot8.on("pointerup", ()=>{changeLevel('riverCrossing');
			});

		toDot9.on("pointerup", ()=>{changeLevel('gardenEntrance');
			});

		toDot10.on("pointerup", ()=>{changeLevel('gardenForest');
			});

		toDot11.on("pointerup", ()=>{changeLevel('gardenDungeon');
			});

		toDot12.on("pointerup", ()=>{changeLevel('gardenFleece');
			});			
	
	}
}

		

