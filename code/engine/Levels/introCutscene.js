class introCutscene extends Phaser.Scene {
    constructor() {
        super({key: 'introCutscene', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'introCutscene';
        /*variable re-use, used for performance enhancement in this case*/
        talkKeyPressed = false;

        this.load.image('introSlide1', 'assets/background/introSlide1.jpg');
        this.load.image('introSlide2', 'assets/background/introSlide2.jpg');
        this.load.image('introSlide3', 'assets/background/introSlide3.jpg');
        this.load.image('introSlide4', 'assets/background/introSlide4.jpg');
        this.load.image('introSlide5', 'assets/background/introSlide5.jpg');
        this.load.image('introSlide6', 'assets/background/introSlide6.jpg');
        this.load.image('introSlide7', 'assets/background/introSlide7.jpg');
    }

    create() {
        endCutscenePhase = 0;
        setTimeout(this.updateProgress,15000);
        setTimeout(this.updateProgress,26000);
        setTimeout(this.updateProgress,39000);
        setTimeout(this.updateProgress,52000);
        setTimeout(this.updateProgress,68000);
        setTimeout(this.updateProgress,75000);
        setTimeout(this.updateProgress,86000);
    }

    update() {
        //Control movement based on the phase.
        if (!talkKeyPressed) {
            if (endCutscenePhase == 0){
                endCutsceneStillImg = createThis.add.image(1024, 576, 'introSlide1');
                endCutsceneStillImg.setOrigin(1,1);
                endCutsceneStillImg.scrollFactorX = 0;
                endCutsceneStillImg.scrollFactorY = 0;
                endCutsceneStillImg.setDepth(100);
                talkKeyPressed = true;
            } else if (endCutscenePhase == 1){
                endCutsceneStillImg = createThis.add.image(1024, 576, 'introSlide2');
                endCutsceneStillImg.setOrigin(1,1);
                endCutsceneStillImg.scrollFactorX = 0;
                endCutsceneStillImg.scrollFactorY = 0;
                endCutsceneStillImg.setDepth(100);
                talkKeyPressed = true;
            } else if (endCutscenePhase == 2){
                endCutsceneStillImg = createThis.add.image(1024, 576, 'introSlide3');
                endCutsceneStillImg.setOrigin(1,1);
                endCutsceneStillImg.scrollFactorX = 0;
                endCutsceneStillImg.scrollFactorY = 0;
                endCutsceneStillImg.setDepth(100);
                talkKeyPressed = true;
            } else if (endCutscenePhase == 3){
                endCutsceneStillImg = createThis.add.image(1024, 576, 'introSlide4');
                endCutsceneStillImg.setOrigin(1,1);
                endCutsceneStillImg.scrollFactorX = 0;
                endCutsceneStillImg.scrollFactorY = 0;
                endCutsceneStillImg.setDepth(100);
                talkKeyPressed = true;
            } else if (endCutscenePhase == 4){
                endCutsceneStillImg = createThis.add.image(1024, 576, 'introSlide5');
                endCutsceneStillImg.setOrigin(1,1);
                endCutsceneStillImg.scrollFactorX = 0;
                endCutsceneStillImg.scrollFactorY = 0;
                endCutsceneStillImg.setDepth(100);
                talkKeyPressed = true;
            } else if (endCutscenePhase == 5){
                endCutsceneStillImg = createThis.add.image(1024, 576, 'introSlide6');
                endCutsceneStillImg.setOrigin(1,1);
                endCutsceneStillImg.scrollFactorX = 0;
                endCutsceneStillImg.scrollFactorY = 0;
                endCutsceneStillImg.setDepth(100);
                talkKeyPressed = true;
            } else if (endCutscenePhase == 6){
                endCutsceneStillImg = createThis.add.image(1024, 576, 'introSlide7');
                endCutsceneStillImg.setOrigin(1,1);
                endCutsceneStillImg.scrollFactorX = 0;
                endCutsceneStillImg.scrollFactorY = 0;
                endCutsceneStillImg.setDepth(100);
                talkKeyPressed = true;
            } else {
                changeLevel('siren');
            }
        }
          
    }

    updateProgress() {
        endCutscenePhase++;
        talkKeyPressed = false;
    }
}
