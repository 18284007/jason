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
		
	}
	
	create(){ //creating end screen 
		//images
		
		this.add.image(0,0, "mapbg1").setOrigin(0).setDepth(0);
		
		let toDot1 = this.add.image(this.game.renderer.width*0.295, this.game.renderer.height*0.88, "dot1").setDepth(1).setInteractive();
		toDot1.on("pointerup", ()=>{ changeLevel('argoLanding');
			});
		
		if (levelProgress > 1)
		{
			let toDot2 = this.add.image(this.game.renderer.width*0.35, this.game.renderer.height*0.64, "dot1").setDepth(1).setInteractive();		
			let toDot3 = this.add.image(this.game.renderer.width*0.495, this.game.renderer.height*0.66, "dot1").setDepth(1).setInteractive();		
			let toDot4 = this.add.image(this.game.renderer.width*0.6, this.game.renderer.height*0.86, "dot1").setDepth(1).setInteractive();

			toDot2.on("pointerup", ()=>{ changeLevel('roadToColchis');
				});

			toDot3.on("pointerup", ()=>{changeLevel('marketplace');
				});

			toDot4.on("pointerup", ()=>{changeLevel('palace');
				});
		}

		if (levelProgress > 2)
		{		
			let toDot5 = this.add.image(this.game.renderer.width*0.648, this.game.renderer.height*0.495, "dot1").setDepth(1).setInteractive();
			let toDot6 = this.add.image(this.game.renderer.width*0.73, this.game.renderer.height*0.67, "dot1").setDepth(1).setInteractive();

			toDot5.on("pointerup", ()=>{changeLevel('shrine');
			});

			toDot6.on("pointerup", ()=>{changeLevel('shrineForest');
			});
		}

		if (levelProgress > 3)
		{
			let toDot7 = this.add.image(this.game.renderer.width*0.9, this.game.renderer.height*0.88, "dot1").setDepth(1).setInteractive();
			let toDot8 = this.add.image(this.game.renderer.width*0.89, this.game.renderer.height*0.65, "dot1").setDepth(1).setInteractive();
			let toDot9 = this.add.image(this.game.renderer.width*0.815, this.game.renderer.height*0.33, "dot1").setDepth(1).setInteractive();
			let toDot10 = this.add.image(this.game.renderer.width*0.6, this.game.renderer.height*0.23, "dot1").setDepth(1).setInteractive();
			let toDot11 = this.add.image(this.game.renderer.width*0.93, this.game.renderer.height*0.48, "dot1").setDepth(1).setInteractive();
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
		}

		if (levelProgress > 5)
		{		
			let toDot12 = this.add.image(this.game.renderer.width*0.81, this.game.renderer.height*0.05, "dot1").setDepth(1).setInteractive();
			toDot12.on("pointerup", ()=>{changeLevel('gardenFleece');
			});	
		}


	}
}

		

