var endCutscenePhase; //0 = walking to the river, 1 = closeup of hands in the river, 2 = walking away 
var talkKeyPressed; //Has the talk key been pressed?
var endCutsceneStillImg; //Image that appears in phase 1.

class endCutscene extends Phaser.Scene{
    constructor() {
        super({key: 'endCutscene', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'endCutscene';
        backgroundLayer0 = 'bgSky';
        talkKeyPressed = false; 
        this.load.image('endCutsceneStill', 'assets/background/endCutsceneStill.png');
        commonPreload();
    }

    create() {
        loadMap();
        currentDialogue = 0;
        endCutscenePhase = 0;
        levelProgress = 1;

        //Set player animation. 
        player.anims.play('jasonRight', true);

        //Process dialogue. 
        dialogue = levelJSON['narration'];
        dialogueMax = dialogue.length - 1;
        this.processDialogue(); 
        
        //Set gravity. 
        player.body.allowGravity = true;

        //Set game width and game height. 
        gameWidth = createThis.map.widthInPixels;
        gameHeight = createThis.map.heightInPixels;

        //Set world bounds. 
        createThis.physics.world.setBounds(0, 0, gameWidth + 300, gameHeight, 64, true, true, false, false);
    }

    update() {
        //Control movement based on the phase.
        if (endCutscenePhase == 0){
            if (player.x < 474) {
                player.body.setVelocityX(90);
            } else {
                player.body.setVelocityX(0);
            }
        } else if (endCutscenePhase == 1){
            player.body.setVelocityX(0);
            player.x = 710;
        } else if (endCutscenePhase == 2){
            player.body.setVelocityX(90);
        } 

        //Control dialogue + images.
        if (talkKey.isDown && !talkKeyPressed) {
            if (endCutscenePhase < 2) {
                this.processDialogue();
                talkKeyPressed = true; 
                endCutscenePhase++; 
                if (endCutscenePhase == 1) {
                    //Draw image of hands in river. 
                    endCutsceneStillImg = createThis.add.image(1024, 576, 'endCutsceneStill');
                    endCutsceneStillImg.setOrigin(1,1);
                    endCutsceneStillImg.scrollFactorX = 0;
                    endCutsceneStillImg.scrollFactorY = 0;
                    endCutsceneStillImg.setDepth(100);
                } else if (endCutscenePhase == 2) {
                    //Remove image of hands in river. 
                    endCutsceneStillImg.alpha = 0;
                }
            } else {
                //Move to the end screen. 
                clearDialogueBox();
                changeLevel('endScreen');
            }
        } else if (!talkKey.isDown && talkKeyPressed) {
            talkKeyPressed = false; 
        } 
    }

    //Process dialogue box. 
    processDialogue() {
        clearDialogueBox();
        drawDialogueBox(); 
        npcDialogue.setText(dialogue[currentDialogue].char + '\n' + dialogue[currentDialogue].speech);
        currentDialogue++; 
        dialogueAlreadyEngaged = true;
        dialogueActive = true;  
    } 
}
