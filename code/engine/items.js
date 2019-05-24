/* Inventory. 
 * IDs: 0-8: Ritual Items. 
 */
inventory = [false, false, false, false, false, false, false, false, false]; 
resetInventory = [false, false, false, false, false, false, false, false, false]; 
ritualItemCount = 9; 

var ritualX; 
var ritualY;

/* itemBase 
 * This is used as a base for other item classes. Please do not create this object directly. 
 * Required parameters: scene, x, y, key, gravity.
 * When an item collides with the player, the collision() function is called. 
 * collision() must be defined for each child class, as there is no default. 
 */

class itemBase extends Phaser.GameObjects.Sprite {
	constructor (parameter) {
		//Create the object. 
        super(parameter.scene, parameter.x, parameter.y, parameter.key);
        parameter.scene.physics.world.enable(this);
        parameter.scene.add.existing(this);

        //Set gravity. 
        this.body.allowGravity = parameter.gravity;

		this.inventoryKey = parameter.inventoryKey;

		if (typeof this.inventoryKey !== 'undefined' && inventory[this.inventoryKey]){
			this.destroy();
		}

        //Collision detection between the player and item. 
        createThis.physics.add.overlap(this, player, this.collision);
	}
}

/* Health Item 
 * This increases the player's health by a predefined amount (currently 50).
 * Required parameters: x, y
 */

class healthItem extends itemBase {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'healthItemSprite', 
			gravity: false
		})

		this.healValue = 50; 
	}

	collision (tempItem){
		playerHeal(tempItem.healValue);
		tempItem.destroy();
	}
}

/* Max Health Item 
 * This increases the player's maximum health by a predefined amount (currently 50).
 * Required parameters: x, y
 */

class maxHealthItem extends itemBase {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'maxHealthItemSprite', 
			gravity: false
		})

		this.boostValue = 50; 
	}

	collision (tempItem){
		maxHealthBoost(tempItem.boostValue);
		tempItem.destroy();
	}
}

/* Damage Increase Item 
 * This increases the player's maximum damage by a predefined amount (currently 50).
 * Required parameters: x, y
 */

class damageIncreaseItem extends itemBase {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'damageIncreaseItemSprite', 
			gravity: false
		})

		this.boostValue = 50; 
	}

	collision (tempItem){
		playerDamagePoints += tempItem.boostValue;
		tempItem.destroy();
	}
}

/* Spider Flower 
 * The spider flower activates the spider boss' attack. 
 * Required parameters: x, y
 */

class spiderFlowerItem extends itemBase {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'spiderFlowerSprite',
			gravity: false
		})
	}

	collision (tempItem){
		spiderBossActive = true;
		tempItem.destroy();
		spiderFlowerPickedUp = true; 
	}
}

//These ritual items are found in the game world. 
class ritualItemFind extends itemBase {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'spiderFlowerSprite',
			inventoryKey: parameter.inventoryKey,
			gravity: false
		})
	}

	collision (tempItem){
		inventory[tempItem.inventoryKey] = true; 
		tempItem.destroy();
	}
}

class ritualItemCutscene extends itemBase {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'spiderFlowerSprite',
			inventoryKey: parameter.inventoryKey,
			gravity: false
		})

		createThis.physics.add.overlap(this, ritualFireObject, this.destroyMe);
		this.moveToFire(ritualX, ritualY);
		this.body.setVelocityY(100);
	}

	moveToFire (tempX, tempY) {
		createThis.physics.accelerateToObject(this, ritualFireObject, 300);
	}

	destroyMe (tempItem) {
		for (i = 0; i < portals.length; i++){
			if (typeof portals[i].remainingPortals !== 'undefined'){
				portals[i].remainingPortals--;
			}
		}
		tempItem.destroy();
	}
}

class ritualFire extends itemBase {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'bonfireSprite',
			gravity: false
		})

		ritualX = this.x;
		ritualY = this.y; 
	
		this.ritualBegun = false; 
	}	

	checkBeginRitual() {
		var tempBeginRitual = true; 

		for (i = 0; i < ritualItemCount; i++){
			tempBeginRitual = tempBeginRitual && inventory[i];
		}

		return tempBeginRitual; 
	}

	ritual() {
		for (i = 0; i < ritualItemCount; i++) {
			new ritualItemCutscene({
                x: this.x, 
                y: this.y - (100 * (i + 1)),
                inventoryKey: tempProperties[i]
            });
		}
	}

	collision (tempItem) {
		if (!tempItem.ritualBegun && talkKey.isDown && tempItem.checkBeginRitual()) {
			tempItem.ritual();
			tempItem.ritualBegun = true; 
		} 
	}
}

/* Portal 
 * 
 */
class portal extends Phaser.GameObjects.Sprite {
	constructor (parameter) {
		//Create the object. 
        super(createThis, parameter.x, parameter.y, 'portalSprite');
        createThis.physics.world.enable(this);
        createThis.add.existing(this);
        this.portalMap = parameter.portalMap; 
        this.body.allowGravity = false;
        this.setDepth(-45);

        if (typeof parameter.spawnAfterBossBattle !== 'undefined') {
        	this.spawnAfterBossBattle = parameter.spawnAfterBossBattle;
        } else {
        	this.spawnAfterBossBattle = false; 
        }

        if (typeof parameter.spawnAfterSpiderFlower !== 'undefined') {
        	this.spawnAfterSpiderFlower = parameter.spawnAfterSpiderFlower;
        } else {
        	this.spawnAfterSpiderFlower = false; 
        }
		
	if (typeof parameter.spawnAfterTalkAetios !== 'undefined') {
        	this.spawnAfterTalkAetios = true;
			this.spawnAfterTalkAetiosWaiting = true; 
        } else {
        	this.spawnAfterTalkAetios = false; 
			this.spawnAfterTalkAetiosWaiting = false; 
        }

        if (typeof parameter.spawnAfterRitual !== 'undefined') {
        	this.spawnAfterRitual = parameter.spawnAfterRitual;
        	this.remainingPortals = ritualItemCount;
        } else {
        	this.spawnAfterRitual = false; 
        }

        this.activePortal = !(this.spawnAfterBossBattle || this.spawnAfterSpiderFlower || this.spawnAfterTalkAetios);

        //Collision detection between the player and item. 
        createThis.physics.add.overlap(this, player, this.collision);
	}

	collision (tempPortal){
		portalMap = tempPortal.portalMap;
	}
	
	dialogueUpdate() {
		if (typeof dialogue !== 'undefined' && 
			typeof dialogue[currentDialogue]._SPAWNAFTERTALKAETIOS !== 'undefined') {
			this.spawnAfterTalkAetiosWaiting = false;
		}
	}

	update (){
		var tempPortalActive = true; 

		if (tempPortalActive && this.spawnAfterSpiderFlower) {
			tempPortalActive = spiderFlowerPickedUp; 
		} 

		if (tempPortalActive && this.spawnAfterBossBattle) {
			tempPortalActive = (activeBosses <= 0); 
		} 
		
		if (tempPortalActive && this.spawnAfterTalkAetios && this.spawnAfterTalkAetiosWaiting) {
			tempPortalActive = false;
		}

		if (tempPortalActive && this.spawnAfterRitual) {
			tempPortalActive = (this.remainingPortals <= 0);
		}

		if (tempPortalActive) {
			this.activePortal = true; 
			this.alpha = 1; 
		} else {
			this.activePortal = false; 
			this.alpha = 0; 
		}

		if (this.spawnAfterSpiderFlower && this.spawnAfterBossBattle && levelProgress == 1)
		{
			levelProgress++;
		}
	}
}


//SIGNS

class signR2C extends Phaser.GameObjects.Sprite {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'signR2CSprite',
			gravity: false
		})
	}
}
class signMarket extends Phaser.GameObjects.Sprite {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'signMarketSprite',
			gravity: false
		})
	}
}
class signShrine extends Phaser.GameObjects.Sprite {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'signShrineSprite',
			gravity: false
		})
	}
}
class signShrineForest extends Phaser.GameObjects.Sprite {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'signShrineForestSprite',
			gravity: false
		})
	}
}
class signPalace extends Phaser.GameObjects.Sprite {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'signPalaceSprite',
			gravity: false
		})
	}
}
class signColchisFields extends Phaser.GameObjects.Sprite {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'signColchisFieldsSprite',
			gravity: false
		})
	}
}
class signRiverCrossing extends Phaser.GameObjects.Sprite {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'signRiverCrossingSprite',
			gravity: false
		})
	}
}
class signGardenEntrance extends Phaser.GameObjects.Sprite {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'signGardenEntranceSprite',
			gravity: false
		})
	}
}
class signDungeon extends Phaser.GameObjects.Sprite {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'signDungeonSprite',
			gravity: false
		})
	}
}
class signGardenForest extends Phaser.GameObjects.Sprite {
	constructor(parameter){
		super({
			scene: createThis,
			x: parameter.x, 
			y: parameter.y,
			key: 'signGardenForestSprite',
			gravity: false
		})
	}
}



function portalUpdate() {
	for (i = 0; i < portalCount; i++) {
		portals[i].update();
	}
}
