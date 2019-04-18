class projectile extends Phaser.GameObjects.Sprite {
	constructor (parameter) {
        super(parameter.scene, parameter.x, parameter.y, parameter.key);
		parameter.scene.physics.world.enable(this);
        parameter.scene.add.existing(this);
        this.body.setVelocityX(parameter.velocityX);
        this.body.allowGravity = false; 
        createThis.physics.add.overlap(this, player, this.playerDamage);
	}

	playerDamage() {
		playerDamage(100);
	}
}