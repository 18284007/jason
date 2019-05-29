class titleScreen extends Phaser.Scene{

    constructor()
	{
        super({key: 'titleScreen', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'titleScreen';
		
		this.load.image('titlebg', 'assets/stage/background/titlebg.png');
		this.load.image('playbut', 'assets/stage/background/playbut.png');
	}

	create()
	{
		
 		console.log(this);
		this.add.image(0,0, "titlebg").setOrigin(0).setDepth(0);
		//let playButton = this.add.image(this.game.renderer.width /2, this.game.renderer.height * 0.80, "playbut").setDepth(1);
		
		let startGame = this.add.image(this.game.renderer.width / 2, this.game.renderer.height *0.80, "playbut").setDepth(1).setInteractive();
			
		startGame.on("pointerup", ()=>{
			playerSprite = 'ship';
			changeLevel('siren');
		});
			
		

		
		
}
}
