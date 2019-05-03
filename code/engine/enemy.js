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
		this.invulnerabilityWait = 1000; 
		this.invulnerability = false; 
		if (typeof parameter.hasSword !== 'undefined'){ 
			this.hasSword = parameter.hasSword; 
		} else {
			this.hasSword = false; 
		}
		if (typeof parameter.damageTouch !== 'undefined'){ 
			this.damageTouch = parameter.damageTouch; 
		} else {
			this.damageTouch = true; 
		}

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
		} else if (!playerSwingSword && !tempEnemy.invulnerability && tempEnemy.damageTouch) {
			playerDamage(10);
		} else if (!playerSwingSword && tempEnemy.hasSword && tempEnemy.swingSword) {
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

class fox extends enemyBase { 
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

class snake extends enemyBase { 
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

class bats extends enemyBase { 
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

class bullBoss extends enemyBase { 
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

class medusaBoss extends enemyBase { 
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

class minotaurBoss extends enemyBase { 
	constructor (parameter) {
		super({
			scene: createThis, 
			x: parameter.x, 
			y: parameter.y,
			key: 'jason', //temp sprite 
			xMove: 200,//parameter.xMove,
			xVel: 130, 
			scale: 1, 
			enemyId: parameter.enemyId, 
			gravity: false, 
			health: 250, 
			damageTouch: false,
			hasSword: true
        });
        this.swingSword = false; 
        this.charging = false; //Is the minotaur charging at the player? 
	}

	movement() {
		if (typeof this.body !== 'undefined'){
			if (this.charging && !this.swingSword) {
				this.body.setVelocityX(-this.xVel);
				if (this.x < this.xMin) {
					this.sword(); 
				}
			} else if (!this.charging && !this.swingSword) {
				this.body.setVelocityX(this.xVel);
				if (this.x > this.xMax) {
					this.sword(); 
				}
			}	
		}
	}

	sword () {
		if (typeof this !== 'undefined'){
			this.body.setVelocityX(0);
   			this.swingSword = true; 
    		setTimeout(this.swordStop, 500, this);
		}
	}

 	swordStop (tempEnemy) {
    	tempEnemy.swingSword = false; 
    	tempEnemy.charging = !tempEnemy.charging; 
	}
}

class dragonBoss extends enemyBase { 
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

		this.spiderBossAlive = true; 

		//Create a white line that represents the spider web. 
	    var line = new Phaser.Geom.Line(parameter.x, parameter.y, parameter.x, parameter.y + parameter.yMove);
	    var graphics = createThis.add.graphics({lineStyle: {width: 3, color: 0xFFFFFF}});
	    graphics.strokeLineShape(line);
	}

	collision(tempEnemy) {
		if (playerSwingSword && !tempEnemy.invulnerability) {
			enemies[tempEnemy.enemyId].health -= 100;
			enemies[tempEnemy.enemyId].invulnerability = true; 
			enemies[tempEnemy.enemyId].alpha = 0.3; 
			setTimeout(tempEnemy.invulnerabilityStop, 500, tempEnemy.enemyId);
		} else if (!playerSwingSword && !tempEnemy.invulnerability) {
			playerDamage(10);
		}

		//If the attacks are inactive and the spider is attacked, it will become active.
		if (!this.spiderBossActive) {
			spiderBossActive = true; 
		}
	}

	checkPhase() {
		if (this.health <= 50){
			return 2;
		} else if (this.health <= 150){
			return 1; 
		} else {
			return 0; 
		}
	}

	movement() { 
		if (this.moveUp) {
			if (this.y < this.yMin) {
				this.body.setVelocityY(this.yVel);
				this.moveUp = false; 
				if (spiderBossActive && this.checkPhase() != 1) {
					this.shootWeb(); 
				}
			}
		} else {
			if (this.y > this.yMax) {
				this.body.setVelocityY(-this.yVel);
				this.moveUp = true; 
				if (spiderBossActive && this.checkPhase() != 0) {
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
	if (enemyCount > 0){
		for (i = 0; i < enemyCount; i++){
			enemies[i].movement();	
			enemies[i].update();
		}
	}
}