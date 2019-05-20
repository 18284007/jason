class pause extends Phaser.Scene {
	constructor() {
		super({ key: "pause", active: false});	
	}
	
		preload()
	{
		//pause image
		this.load.image('endbg', 'assets/stage/background/endbg.png');
		this.load.image('menubut', 'assets/stage/background/menubut.png');
	}
	
	create(){ 
		createThis = this;
        currentLevelID = 'pause';
		
		this.add.image(0,0, "endbg").setOrigin(0).setDepth(0);
		
		this.input.on('pointerup', function () {
			
			this.scene.pause();
			this.scene.launch('pauseMenu');
		
		}, this);
		
		this.events.on('pause', function () {
		
		}), this;
		
		this.events.on('resume', function () {
		
		})
		
	}
		
		
		this.scene.resume();
		
		
		