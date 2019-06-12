class pause extends Phaser.Scene {
    constructor() {
        super({ key: "pause", active: false});    
    }
    
    preload() {
        //pause image           
    }
    
    create() { 
        game.scene.pause(currentLevelID);

        this.drawPauseSurface = this.add.graphics();

        this.drawPauseSurface.lineStyle(this.sys.game.config.width*0.004,0x000000,1);    
        this.drawPauseSurface.fillStyle(0xf2edaa,1);
        this.drawPauseSurface.fillRect(this.sys.game.config.width*0.2,this.sys.game.config.height*0.1,this.sys.game.config.width*0.6,this.sys.game.config.height*0.7);
        this.drawPauseSurface.strokeRect(this.sys.game.config.width*0.2,this.sys.game.config.height*0.1,this.sys.game.config.width*0.6,this.sys.game.config.height*0.7);
        
        this.add.image(0,0, "pausebg").setOrigin(0).setDepth(0);            
        
        let toPauseButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.5, "resumebut").setDepth(1).setInteractive();
        let toMapMenu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.7, "mapMenu").setDepth(1).setInteractive();
        let muteBtn = this.add.image(this.game.renderer.width*0.78, this.game.renderer.height * 0.135, "mutebtn").setDepth(1).setInteractive();        
        
        if (!musicMuted) {
            muteBtn.setTint(0x00ff00);
        } else {
            muteBtn.setTint(0xff0000);
        }

        toPauseButton.on('pointerup', function () {
	        game.scene.resume(currentLevelID);
	        game.scene.stop('pause');               
        });     
                
        toMapMenu.on('pointerup', ()=>{
        	changeLevel('mapMenu');
        	game.scene.stop('pause');            
        });                     
            
        muteBtn.on('pointerup', ()=>{
        	if (!musicMuted) {
        		music.setMute(true);
        		musicMuted = true;
        		muteBtn.setTint(0xff0000);
        	} else {
        		music.setMute(false);
        		musicMuted = false;
        		muteBtn.setTint(0x00ff00);
        	}            
        });         
    }
}