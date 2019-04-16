function enemyMovement() {
	if (spiderBossSpawnPoint !== null) {
		if (spiderBossAlive){
			spiderBossMovement();
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
	spiderBossWeb = createThis.physics.add.sprite(spiderBoss.x, spiderBoss.y, 'spiderBossWebSprite').setVelocityX(-100);
	spiderBossWeb.body.allowGravity = false; 
	//spiderBossWebCount++;
} 