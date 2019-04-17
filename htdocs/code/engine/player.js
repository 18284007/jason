//Game variables relating to the player.
var health = 100;
var playerJumpVelocity = 500; 
var playerWalkVelocity = 200; 
//var playerShip = false; //Is the player a ship or a person?
var playerShipVelocity = 300;
var playerFacingRight = true;
var playerHasWings = false; //Can the player fly? 

var playerShipOffsetX = 500; //Camera offset for playerShip mode. 

/* This function would be used for importing player data from a JSON file. 
 * It is currently not working, so please do not use it. 
 */
function loadPlayerJSON() {
    //Request the JSON file. 
    var playerJSONRequest = new XMLHttpRequest();
    var playerJSONData;
    playerJSONRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            playerJSONData = JSON.parse(this.responseText);
        }
    };
    playerJSONRequest.open("GET", "code/engine/player.json", true);
    playerJSONRequest.send();

    //Load spritesheets as specified in the JSON file. 
    for (x in playerJSONData) {
        this.load.spritesheet(playerJSONData[x].characterName, playerJSONData[x].spritesheetPath);
    }
}

/* Player movement. 
 * This is used when controlling a person. 
 * This is not used for controlling a ship. 
 */
function playerMovement() {
    if (attackKey.isDown) {
        if (playerFacingRight) {
            player.anims.play('jasonAttackRight', true);
        } else {
            player.anims.play('jasonAttackLeft', true);
        }
    } else {
    	if (playerFacingRight) {
            player.anims.play('jasonRight', true);
        } else {
            player.anims.play('jasonLeft', true);
        }
    }

    //Horizontal movement 
    var tempVelocityX = 0; 
    if (!attackKey.isDown && cursors.left.isDown) {
        tempVelocityX -= playerWalkVelocity;
        player.anims.play('jasonLeft', true);
        playerFacingRight = false; 
    }
    if (!attackKey.isDown && cursors.right.isDown) {
        tempVelocityX += playerWalkVelocity;
        player.anims.play('jasonRight', true);
        playerFacingRight = true;
    }
    player.setVelocityX(tempVelocityX);
    
    //Vertical movement
    if (jumpKey.isDown) {
    	if (playerHasWings || player.body.blocked.down){
    		player.setVelocityY(-playerJumpVelocity);
    	}
    }
}

/* Ship Movement. 
 * This movement function is used when the player is controlling a ship.
 * Vertical movement is enabled but horizontal movement and attacking are disabled.
 * This is not used for controlling a person. 
 */

function playerShipMovement() {
    player.setVelocityX(playerShipVelocity);
    var tempVelocityY = 0; 
    if (cursors.up.isDown) {
        tempVelocityY -= playerShipVelocity;
    }
    if (cursors.down.isDown) {
        tempVelocityY += playerShipVelocity;
    }
    player.setVelocityY(tempVelocityY);

    if (player.body.blocked.right) {
        playerAlive = false; 
    }
}

/* This function controls what happens when a player collides with a rock.
 * The ship will fall and spin, with gameOver() being called when the player is off-screen. 
 */ 
function playerShipSink() {
    player.setVelocityX(0);
    player.setVelocityY(250);
    player.angle += 5; 
}

/* This function controls what happens when a player collides with an enemy. 
 */ 
function playerEnemyCollision() {
    /*if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), enemies.getBounds())) {
        if (attackKey.isDown){
            //Add a function here that hurts/kills the enemy. 
            enemies.setVelocityY(99999999);
        } else {
            playerDamage(10);
        }
    }*/
    if (spiderBossSpawnPoint !== null && spiderBossAlive && 
        Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), spiderBoss.getBounds())) {
        if (attackKey.isDown){
            spiderBossHealth -= 10; 
        } else {
            playerDamage(50);
        }
    }
}

function playerDamage(tempHealth) {
    health -= tempHealth; 
    if (health < 0) {
        gameOver(); 
    }
}

function gameOver() {
    playerAlive = false; 
    createThis.cameras.main.fadeOut(1000);
    setTimeout(window.location = "http://localhost:8000",20000);
}

function playerCheckForFall() {
    if (player.y > bganchor.y) {
        gameOver();
    }
}