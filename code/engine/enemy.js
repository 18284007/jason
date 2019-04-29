/* The enemyBase class is used as a base for various enemies.  
 * This should not be spawned directly. 
 * Required parameters: scene, x, y, key, xMove/yMove, xVel/yVel, scale, enemyId, gravity, health.
 */
class enemyBase extends Phaser.GameObjects.Sprite {
	constructor (parameter) {
        super(parameter.scene, parameter.x, parameter.y, parameter.key);
        parameter.scene.physics.world.enable(this);
        parameter.scene.add.existing(this);

        //Set variables. 
        this.body.allowGravity = parameter.gravity;
        if (typeof parameter.xMove !== 'undefined'){ 
        	this.moveRight = true; 
	        this.xMin = parameter.x; 
	        this.xMax = parameter.x + parameter.xMove; 
	        this.xVel = parameter.xVel; 
	        this.body.setVelocityX(this.xVel);
        } else if (typeof parameter.yMove !== 'undefined'){
			this.moveUp = false; 
			this.yMin = parameter.y; 
			this.yMax = parameter.y + parameter.yMove; 
			this.yVel = parameter.yVel; 
	        this.body.setVelocityY(this.yVel);
        }
        this.scaleX = parameter.scale; 
        this.scaleY = parameter.scale; 
        this.enemyId = parameter.enemyId;
        this.health = parameter.health;
		this.spiderBossAlive = true; 
		this.invulnerabilityWait = 1000; 
		this.invulnerability = false; 

        //Collision detection between the player and enemy. 
        createThis.physics.add.overlap(this, player, this.collision);
	}

	/* If the enemy is in a state of temporary invulnerability, nothing happens. 
	 * Otherwise, the player will damage the enemy if the sword is swung and the 
	 * enemy will damage the player if the sword is not being swung. 
	 * tempEnemy refers to the enemy object. 
	 */
	collision(tempEnemy) {
		if (playerSwingSword && !tempEnemy.invulnerability) {
			enemies[tempEnemy.enemyId].health -= 100;
			enemies[tempEnemy.enemyId].invulnerability = true; 
			enemies[tempEnemy.enemyId].alpha = 0.3; 
			setTimeout(tempEnemy.invulnerabilityStop, 500, tempEnemy.enemyId);
		} else if (!playerSwingSword && !tempEnemy.invulnerability) {
			playerDamage(10);
		}
	}

	/* Stop enemy invulnerability. 
	 * tempEnemyId refers to the enemy ID. 
	 */
	invulnerabilityStop(tempEnemyId) {
		enemies[tempEnemyId].invulnerability = false; 
		enemies[tempEnemyId].alpha = 1; 
	}

	//Enemy update routine. 
	update() {
		if (this.health < 0) {
			enemies[this.enemyId].destroy(); 
		}
	}
}

/* Mini spider enemy.
 * Required parameters: x, y, xMove, enemyId
 */
class spiderMini extends enemyBase { 
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y,
			key: 'spiderBossSprite', 
			xMove: parameter.xMove,
			xVel: 130, 
			scale: 0.45, 
			enemyId: parameter.enemyId, 
			gravity: false, 
			health: 1
        });
	}

	movement() {
		if (this.moveRight) {
			if (this.x > this.xMax) {
				this.body.setVelocityX(-this.xVel);
				this.moveRight = false; 	
			}
		} else {
			if (this.x < this.xMin) {
				this.body.setVelocityX(this.xVel);
				this.moveRight = true; 
			}
		} 
	}
}

/* Spider boss.
 * Required parameters: x, y, yMove, enemyId
 */
class spiderBoss extends enemyBase {
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y,
			key: 'spiderBossSprite', 
			yMove: parameter.yMove,
			yVel: 300, 
			scale: 1, 
			enemyId: parameter.enemyId, 
			gravity: false, 
			health: 250
        });

		//Create a white line that represents the spider web. 
	    var line = new Phaser.Geom.Line(parameter.x, parameter.y, parameter.x, parameter.y + parameter.yMove);
	    var graphics = createThis.add.graphics({lineStyle: {width: 3, color: 0xFFFFFF}});
	    graphics.strokeLineShape(line);
	}

	movement() { 
		if (this.moveUp) {
			if (this.y < this.yMin) {
				this.body.setVelocityY(this.yVel);
				this.moveUp = false; 
				if (spiderBossActive) {
					this.shootWeb(); 
				}
			}
		} else {
			if (this.y > this.yMax) {
				this.body.setVelocityY(-this.yVel);
				this.moveUp = true; 
				if (spiderBossActive) {
					this.shootWeb(); 
				}	
			}
		}
	}

	shootWeb() {
		new projectile({
	        scene: createThis, 
	        x: this.x, 
	        y: this.y,
	        key: 'spiderBossWebSprite',
	        velocityX: -100
	    });
	}
}

function enemyMovement() {
	if (typeof spiderBossAlive != 'undefined') {
		if (spiderBossAlive){
			spiderBossMovement();
		} 
	}
	if (enemyCount > 0){
		for (i = 0; i < enemyCount; i++){
			enemies[i].movement();	
			enemies[i].update();
		}
	}
}