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
			key: 'healthItemSprite', //Temporary sprite - this must be changed.
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
			key: 'maxHealthItemSprite', //Temporary sprite - this must be changed.
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
			key: 'damageIncreaseItemSprite', //Temporary sprite - this must be changed.
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
        this.setDepth(-100);

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

        this.activePortal = !(this.spawnAfterBossBattle || this.spawnAfterSpiderFlower);

        //Collision detection between the player and item. 
        createThis.physics.add.overlap(this, player, this.collision);
	}

	collision (tempPortal){
		portalMap = tempPortal.portalMap;
	}

	update (){
		var tempPortalActive = true; 

		if (tempPortalActive && this.spawnAfterSpiderFlower) {
			tempPortalActive = spiderFlowerPickedUp; 
		} 

		if (tempPortalActive && this.spawnAfterBossBattle) {
			tempPortalActive = (activeBosses <= 0); 
		} 

		if (tempPortalActive) {
			this.activePortal = true; 
			this.alpha = 1; 
		} else {
			this.activePortal = false; 
			this.alpha = 0; 
		}
	}
}

function portalUpdate() {
	for (i = 0; i < portalCount; i++) {
		portals[i].update();
	}
}