//Game variables relating to the player.
var health = 100;
var playerSprite = 'jason'; //Controls the current player sprite. 
var playerJumpVelocity = 500; 
var playerWalkVelocity = 200; 
//var playerShip = false; //Is the player a ship or a person?
var playerShipVelocity = 300;
var playerFacingRight = true;
var playerHasWings = false; //Can the player fly? 

function loadPlayerJSON() {
    //This doesn't work yet. I'm not sure why. 

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
}

/* This function controls what happens when a player collides with an enemy. 
 * 
 */ 

function playerEnemyCollision() {
    if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), enemies.getBounds())) {
        if (attackKey.isDown){
            //Add a function here that hurts/kills the enemy. 
            enemies.setVelocityY(99999999);
        } else {
            health -= 1;
        }
    }
    if (health < 1) {
        //Add a game over function here. 
        player.setVelocityY(9999999); 
    }
}