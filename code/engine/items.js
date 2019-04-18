class spiderFlowerItem extends Phaser.GameObjects.Sprite {
	constructor (parameter) {
        super(parameter.scene, parameter.x, parameter.y, parameter.key);
        parameter.scene.physics.world.enable(this);
        parameter.scene.add.existing(this);
        this.body.allowGravity = false; 
	}

	playerCollide() {
		spiderBossActive = true;
		this.destroy();
	}
}