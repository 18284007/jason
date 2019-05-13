/* NPC Base.  
 * This is used as the base for several NPC classes. 
 * Do not create this object directly. 
 * Required parameters: scene, x, y, key, npcId.
 * Optional parameters: dialogueKey, gravity
 */
class npcBase extends Phaser.GameObjects.Sprite {
	constructor (parameter) {
		//Create the object. 
        super(parameter.scene, parameter.x, parameter.y, parameter.key);
        parameter.scene.physics.world.enable(this);
        parameter.scene.add.existing(this);

        //Set gravity. 
        this.body.allowGravity = parameter.gravity;
        if (this.body.allowGravity) {
        	createThis.physics.add.collider(this, mapLayer);
        }

        //Does this character have dialogue? 
        this.hasDialogue = (typeof parameter.dialogueKey !== 'undefined');

        //DialogueKey defines which conversation in the dialogue JSON file will be read. 
		this.dialogueKey = parameter.dialogueKey;

		this.npcId = parameter.npcId;

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

	dialogueUpdate () {

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
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId
		})
	}
}

/* King Aetios. 
 * Required attributes: x, y. 
 * Optional attributes: dialogueKey. 
 */
class kingAetiosNPC extends npcBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y, 
			key: 'medeaSprite',
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
		this.isWalking = false; 
		this.hasWalked = false; 
	}

	walk () {
		this.isWalking = true; 
		this.body.setVelocityX(-150);
		setTimeout(this.stopWalk, 4200, this);
	}

	stopWalk (tempNPC) {
		tempNPC.body.setVelocityX(0);
		tempNPC.hasWalked = true; 
	}

	dialogueUpdate () {
		if (!this.isWalking && !this.hasWalked && typeof dialogue !== 'undefined' && 
			typeof dialogue[currentDialogue]._KINGAETIOSWALK !== 'undefined') {
			this.walk(); 
		}
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
	    	//Some NPCs react to flags in dialogue.
	    	for (i = 0; i < npcCount; i++){
				npcs[i].dialogueUpdate();
			}

			//Clear the existing dialogue box. 
			clearDialogueBox();

			//Draw a new dialogue box. 
        	drawDialogueBox(); 
            npcDialogue.setText(dialogue[currentDialogue].char + '\n' + dialogue[currentDialogue].speech);
            dialoguex = player.x; //dialoguex is used to check if the player walks away. 
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