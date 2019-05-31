var medeaActive = false;
var thoughtBubbleRadius = 75; 

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
			if (dialogue !== undefined)
			{
				dialogueMax = dialogue.length - 1;
				processNPCdialogue();
			}
		}
	}

	dialogueUpdate () {

	}

	update () {
		this.updateThoughtBubble();
	}

	updateThoughtBubble () {
		if (player.x - thoughtBubbleRadius < this.x && player.x + thoughtBubbleRadius > this.x) {
			if (this.thoughtBubble == undefined && this.hasDialogue && typeof levelJSON[this.dialogueKey] !== 'undefined') {
				this.thoughtBubble = createThis.physics.add.sprite(this.x - 20, this.y - 50, 'thoughtBubbleSprite');
				this.thoughtBubble.body.allowGravity = false; 
				this.thoughtBubble.setDepth(-50);
			}
		} else if (this.thoughtBubble !== undefined) {
			this.thoughtBubble.destroy(); 
			this.thoughtBubble = undefined;
		}
	}
}

class artemisNPC extends npcBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y, 
			key: 'artemisSprite',
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
	}
}

class artemisDogNPC extends npcBase {
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
	}

	update () 
	{
		this.updateThoughtBubble();
		if (player.x < this.x && this.active) {
			this.anims.play('medeaIdleLeft', true);
		} else if (player.x > this.x && this.active) {
			this.anims.play('medeaIdleRight', true);
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
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
		//this.scaleX = playerScale; 
		//this.scaleY = playerScale;
		this.medeaActive = false;
	}

	makeInactive ()
	{
		medeaActive = false;
	}

	stopWalk (tempNPC) {
		tempNPC.body.setVelocityX(0);
		tempNPC.anims.play('medeaIdleRight', true);
		tempNPC.isWalking = false;
	}

	walk (tempNPC)
	{
		tempNPC.anims.play('medeaWalkRight', true);
		tempNPC.body.setVelocityX(-150);
		tempNPC.isWalking = true;
	}

	walkBack (tempNPC)
	{
		tempNPC.anims.play('medeaWalkRight', true);
		tempNPC.body.setVelocity(150);
		tempNPC.isWalking = true;
	}

	dialogueUpdate () {
		if (typeof dialogue !== 'undefined' &&
			typeof dialogue[currentDialogue]._MEDEAPREPAREOINTMENT !== 'undefined' && 
			!medeaActive) {
				medeaActive = true;
				this.anims.play('medeaWalkRight', true);
				this.walk(this);
				setTimeout(this.stopWalk, 1000, this);
				setTimeout(this.walkBack,2000,this);
				setTimeout(this.stopWalk, 3000, this);
				setTimeout(this.makeInactive,3100,this);
			}
	}

	update () 
	{
		this.updateThoughtBubble();
		if (this.active && this.body.velocity.x == 0) {
			this.flipX = (player.x < this.x);
		} else {
			this.flipX = (this.body.velocity.x < 0);
		}
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
			key: 'kingSprite',
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
		this.isWalking = false; 
		this.originalX = this.x; 
		this.originalY = this.y; 
	}

	walk () {
		this.isWalking = true; 
		this.body.setVelocityX(-150);
		setTimeout(this.stopWalk, 4200, this);
	}

	walkAway () {
		this.isWalking = true; 
		this.body.setVelocityX(150);
		setTimeout(this.stopWalk, 4200, this);
	}

	stopWalk (tempNPC) {
		tempNPC.body.setVelocityX(0);
		tempNPC.isWalking = false;  
	}

	dialogueUpdate () {
		if (typeof dialogue !== 'undefined' && 
			typeof dialogue[currentDialogue]._KINGAETIOSRESETXY !== 'undefined') {
			this.x = this.originalX;
			this.y = this.originalY; 
			this.isWalking = false; 
		} else if (!this.isWalking && typeof dialogue !== 'undefined' && 
			typeof dialogue[currentDialogue]._KINGAETIOSWALK !== 'undefined') {
			this.walk(); 
		} else if (!this.isWalking && typeof dialogue !== 'undefined' && 
			typeof dialogue[currentDialogue]._KINGAETIOSWALKAWAY !== 'undefined') {
			this.walkAway(); 
		} 
	}

	update () {
		this.updateThoughtBubble();
		if (currentLevelID == 'colchisFields')
		{
			if (player.x < this.x && this.active) {
				this.anims.play('kingIdleLeft', true);
			} else if (player.x > this.x && this.active) {
				this.anims.play('kingIdleRight', true);
			}
		}
	}
}
class oileusNPC extends npcBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y, 
			key: 'tempEnemy',
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
		//this.scaleX = playerScale; 
		//this.scaleY = playerScale;
	}
}

class iphiclusNPC extends npcBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y, 
			key: 'tempEnemy',
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
		//this.scaleX = playerScale; 
		//this.scaleY = playerScale;
	}
}

/* Signs */
class signR2CNPC extends npcBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y, 
			key: 'signR2CSprite',
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
	}
}

class signMarketNPC extends npcBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y, 
			key: 'signMarketSprite',
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
	}
}

class signShrineNPC extends npcBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y, 
			key: 'signShrineSprite',
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
	}
}

class signShrineForestNPC extends npcBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y, 
			key: 'signShrineForestSprite',
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
	}
}

class signPalaceNPC extends npcBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y, 
			key: 'signPalaceSprite',
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
	}
}

class signColchisFieldsNPC extends npcBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y, 
			key: 'signColchisFieldsSprite',
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
	}
}

class signRiverCrossingNPC extends npcBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y, 
			key: 'signRiverCrossingSprite',
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
	}
}

class signGardenEntranceNPC extends npcBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y, 
			key: 'signGardenEntranceSprite',
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
	}
}

class signDungeonNPC extends npcBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y, 
			key: 'signDungeonSprite',
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
	}
}

class signGardenForestNPC extends npcBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y, 
			key: 'signGardenForestSprite',
			dialogueKey: parameter.dialogueKey,
			npcId: parameter.npcId, 
			gravity: true
		})
	}
}

/* Process NPC dialogue. 
 * The game will display one entry for char and speech in dialogue[currentDialogue]. 
 * Doing this repeatedly will cycle through the contents of dialogue[currentDialogue].
 * If the text is blank, a box will not appear. 
 */
function processNPCdialogue () {
	if (talkKey.isDown && typeof dialogue !== 'undefined') {
		if (!dialogueAlreadyEngaged) {
	    	//Some NPCs react to flags in dialogue.
	    	for (i = 0; i < npcCount; i++){
				npcs[i].dialogueUpdate();
			}

			//Some portals react to flags in dialogue.
	    	for (i = 0; i < portalCount; i++){
				portals[i].dialogueUpdate();
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


function npcUpdate() {
	for (i = 0; i < npcCount; i++) {
		npcs[i].update();
	}
}
