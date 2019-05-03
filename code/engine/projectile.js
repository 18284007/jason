currentProjectile = 0;
projectiles = [];

class projectile extends Phaser.GameObjects.Sprite {
	constructor (parameter) {
		//Create object. 
        super(parameter.scene, parameter.x, parameter.y, parameter.key);
		parameter.scene.physics.world.enable(this);
        parameter.scene.add.existing(this);

        //Movement. 
        this.body.setVelocityX(parameter.velocityX);
        this.body.allowGravity = false; 
        this.projectileId = parameter.projectileId;
        this.damage = 10; 

        //Collision
        createThis.physics.add.overlap(this, player, this.playerDamage);

        //Increment current projectile count. 
        currentProjectile++;
	}

	playerDamage(tempProjectile) {
		playerDamage(tempProjectile.damage);
		projectiles[tempProjectile.projectileId].destroy();
	}
}