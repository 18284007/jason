var currentProjectile = 0; //The current projectile. Used for the projectileId.  
var projectiles = []; //Array storing all projectiles. 

/* Projectile base class. 
 * This is used to create other projectiles, so this should not be spawned directly. 
 * Required parameters: x, y, scene, key, velocityX, projectileId, damage. 
 * Optional parameters: velocityAimed. 
 */
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

    //Damage the player's health when plyaer collides into this projectile.
    playerDamage(tempProjectile) {
        playerDamage(tempProjectile.damage);
        projectiles[tempProjectile.projectileId].destroy();
    }
}

/* Spider web. 
 * Used in the shrine forest level. 
 * Required parameters: x, y, projectileId.
 */
class spiderBossWeb extends projectile {
    constructor (parameter) {
        super({
            scene: createThis,
            x: parameter.x,
            y: parameter.y, 
            key: 'spiderBossWebSprite',
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

        //If aimed is true, accelerate towards the player. 
        if (parameter.aimed){
            createThis.physics.accelerateToObject(this, player, this.velocityAimed);
        } else if (this.hugeFireMovement) {
            //If they are put of the dragon's 'huge fire', move in a random direction. 
            this.body.velocity.x = Math.random() * 200 - 100; 
            this.body.velocity.y = Math.random() * 200 - 100;
        }
    }
}