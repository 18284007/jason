class spiderFlowerItem extends Phaser.GameObjects.Sprite {
	constructor (parameter) {
        super(createThis, parameter.x, parameter.y, parameter.key);
        createThis.physics.world.enable(this);
        createThis.add.existing(this);
        this.body.allowGravity = false; 
        createThis.physics.add.overlap(this, player, this.collision);
	}

	collision(tempItem) {
		spiderBossActive = true;
		tempItem.destroy();
	}
}