var currentProjectile = 0;
var projectiles = [];

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
        this.damage = parameter.damage; 
        this.velocityAimed = parameter.velocityAimed;

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

class spiderBossWeb extends projectile {
    constructor (parameter) {
        super({
            scene: createThis,
            x: parameter.x,
            y: parameter.y, 
            key: 'spiderBossWebSprite', //temp
            velocityX: -100,
            projectileId: parameter.projectileId,
            damage: 10
        })
    }
}

/* Dragon fire projectile. 
 * If aimed is set to true, the projectile will aim towards the player. 
 * Required parameters: x, y, projectileId, aimed.
 */
class dragonFire extends projectile {
    constructor (parameter) {
        super({
            scene: createThis,
            x: parameter.x,
            y: parameter.y, 
            key: 'fireballSprite',
            velocityX: -150,
            velocityAimed: parameter.velocityAimed,
            projectileId: parameter.projectileId,
            damage: 25
        })

        this.hugeFireMovement = parameter.hugeFireMovement !== undefined && parameter.hugeFireMovement;

        if (this.aimed){
            createThis.physics.accelerateToObject(this, player, this.velocityAimed);
        } else if (this.hugeFireMovement) {
            this.body.velocity.x = Math.random() * 200 - 100; 
            this.body.velocity.y = Math.random() * 200 - 100;
        }
    }
}