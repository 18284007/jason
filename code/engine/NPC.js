/* NPC Base.  
 * This is used as the base for several NPC classes. 
 * Do not create this object directly. 
 * Required parameters: scene, x, y, key.
 * Optional parameters: dialogueKey.
 */
class npcBase extends Phaser.GameObjects.Sprite {
	constructor (parameter) {
		//Create the object. 
        super(parameter.scene, parameter.x, parameter.y, parameter.key);
        parameter.scene.physics.world.enable(this);
        parameter.scene.add.existing(this);

        //Set gravity. 
        this.body.allowGravity = parameter.gravity;

        //Does this character have dialogue? 
        this.hasDialogue = (typeof parameter.dialogueKey !== 'undefined');

        //DialogueKey defines which conversation in the dialogue JSON file will be read. 
		this.dialogueKey = parameter.dialogueKey;

        //Collision detection between the player and item. 
        createThis.physics.add.overlap(this, player, this.collision);
	}

	collision (tempNPC){
		if (tempNPC.hasDialogue){ 
			dialogue = levelJSON[tempNPC.dialogueKey];
			dialogueMax = dialogue.length - 1;
			processNPCdialogue();
		}
	}
}

/* Medea. 
 * Required attributes: x, y. 
 * Optional attributes: dialogueKey. 
 */
class medeaNPC extends npcBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y, 
			key: 'medeaSprite',
			dialogueKey: parameter.dialogueKey
		})
	}
}

/* Process NPC dialogue. 
 * The game will display one entry for char and speech in dialogue[currentDialogue]. 
 * Doing this repeatedly will cycle through the contents of dialogue[currentDialogue].
 * If the text is blank, a box will not appear. 
 */
function processNPCdialogue () {
	if (talkKey.isDown) {
		if (!dialogueAlreadyEngaged) {
			clearDialogueBox();
        	drawDialogueBox(); 
            npcDialogue.setText(dialogue[currentDialogue].char + '\n' + dialogue[currentDialogue].speech);
            dialoguex = player.x; 
            if (currentDialogue == dialogueMax) {
                currentDialogue = 0;
            } else {
                currentDialogue++; 
	        } 
            dialogueAlreadyEngaged = true;
            dialogueActive = true;  
	    } 

	    //Don't display a blank entry. 
	    if (npcDialogue.text == '\n') {
	    	clearDialogueBox();
	    }
	} else {
		dialogueAlreadyEngaged = false; 
	} 
}