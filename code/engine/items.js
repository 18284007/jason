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
			key: 'spiderBossWebSprite', //Temporary sprite - this must be changed.
			gravity: false
		})

		this.healValue = 50; 
	}

	collision (tempItem){
		playerHeal(tempItem.healValue);
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
	}
}