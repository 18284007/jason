class titleScreen extends Phaser.Scene{

    constructor()
	{
        super({key: 'titleScreen', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'titleScreen';
	
		
		this.load.image('titlebg', 'assets/stage/background/titlebg.jpg');
		this.load.image('playbut', 'assets/stage/background/playbut.png');
		
		this.load.audio('water', ['assets/stage/background/water.mp3']);
		
	}

	create()
	{
 		console.log(this);
		this.add.image(0,0, "titlebg").setOrigin(0).setDepth(0);
		//let playButton = this.add.image(this.game.renderer.width /2, this.game.renderer.height * 0.80, "playbut").setDepth(1);
		
		
		this.playButton = this.add.sprite(this.game.renderer.width /2, this.game.renderer.height * 0.80, 'playbut').setInteractive();
    		this.playButton.on('pointerover', function (event) { /* Do something when the mouse enters */ });
   		this.playButton.on('pointerout', function (event) { /* Do something when the mouse exits. */ });
    		this.playButton.on('pointerdown', startGame); // Start game on click.
		
		
		this.sound.pauseOnBlur = false;
		this.sound.play('water',
		{loop: true});	
		

		
		function startGame(tempNewLevelID) {
		var oldLevelID = currentLevelID;
		game.scene.run(tempNewLevelID);
		game.scene.stop(oldLevelID);
}
}
}
