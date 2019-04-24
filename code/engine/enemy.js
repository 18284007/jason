/* The enemyBase class is used as a base for various enemies.  
 * This should not be spawned directly. 
 * Required parameters: scene, x, y, key, xMove, xVel, scale, enemyId.
 */
class enemyBase extends Phaser.GameObjects.Sprite {
	constructor (parameter) {
        super(parameter.scene, parameter.x, parameter.y, parameter.key);
        parameter.scene.physics.world.enable(this);
        parameter.scene.add.existing(this);

        //Set variables. 
        this.body.allowGravity = false; 
        this.moveRight = true; 
        this.xMin = parameter.x; 
        this.xMax = parameter.x + parameter.xMove; 
        this.xVel = parameter.xVel; 
        this.scaleX = parameter.scale; 
        this.scaleY = parameter.scale; 
        this.enemyId = parameter.enemyId; 

        //Collision detection between the player and enemy. 
        createThis.physics.add.overlap(this, player, this.collision);

        //Begin enemy movement.
        this.body.setVelocityX(this.xVel);
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

	collision(tempEnemy) {
		if (attackKey.isDown) {
			enemies[tempEnemy.enemyId].destroy(); 
		} else {
			playerDamage(10);
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
			enemyId: parameter.enemyId
        });
	}
}

function enemyMovement() {
	if (spiderBossSpawnPoint !== null) {
		if (spiderBossAlive){
			spiderBossMovement();
		} 
	}
	if (enemyCount > 0){
		for (i = 0; i < enemyCount; i++){
			enemies[i].movement();	
		}
	}
}

function spiderBossInit() {
	//Define some variables that spiderBoss will use. 
	spiderBossActive = false; 
	spiderBossAlive = true; 
	spiderBossMinY = spiderBossSpawnPoint.y - 350; 
	spiderBossMaxY = spiderBossSpawnPoint.y; 
	spiderBossTravelUp = true; 
	spiderBossVelocity = 300; 
	spiderBossHealth = 100; 
	//spiderBossWebCount = 0; 

	//Create a white line that represents the spider web. 
    var line = new Phaser.Geom.Line(spiderBossSpawnPoint.x, spiderBossMinY, spiderBossSpawnPoint.x, spiderBossMaxY);
    var graphics = createThis.add.graphics({lineStyle: {width: 3, color: 0xFFFFFF}});
    graphics.strokeLineShape(line);

    //Create the spider boss. 
    spiderBoss = createThis.physics.add.sprite(spiderBossSpawnPoint.x, spiderBossSpawnPoint.y, 'spiderBossSprite');
    
    //Disable gravity.
    spiderBoss.body.allowGravity = false;
}

/* This function controls the movement of the spider boss.  
 * The spider boss will move up and down. 
 * The velocity and minimum and maximum Y values are defined in spiderBossInit(). 
 * The Y values are relative to the boss' spawn point. 
 * It is assumed that the spiderBoss object exists.
 */ 
function spiderBossMovement() {
	if (spiderBossTravelUp) {
		if (spiderBoss.y > spiderBossMinY) {
			spiderBoss.setVelocityY(-spiderBossVelocity);
		} else {
			spiderBoss.setVelocityY(spiderBossVelocity);
			spiderBossTravelUp = false; 
			if (spiderBossActive) {
				spiderBossShootWeb();
			}
		}
	} else {
		if (spiderBoss.y < spiderBossMaxY) {
			spiderBoss.setVelocityY(spiderBossVelocity);
		} else {
			spiderBoss.setVelocityY(-spiderBossVelocity);
			spiderBossTravelUp = true; 
			if (spiderBossActive) {
				spiderBossShootWeb(); 
			}
		}
	}
	if (spiderBossHealth < 0){
		spiderBossAlive = false; 
		spiderBoss.body.allowGravity = true;
	}
}

function spiderBossShootWeb() {
	spiderBossWeb = new projectile({
        scene: createThis, 
        x: spiderBoss.x, 
        y: spiderBoss.y,
        key: 'spiderBossWebSprite',
        velocityX: -100
    });
}