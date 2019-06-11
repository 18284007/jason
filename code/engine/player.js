//Base stats, used when starting a new game. 
const maxHealthInit = 100;
const playerDamgePointsInit = 50; 

//Game variables relating to the player on all levels.
var maxHealth = maxHealthInit;
var currentHealth = maxHealthInit;
var playerAlive = true;

//Variables relating to normal levels
var playerJumpVelocity = 500; //Jumping Y velocity
var playerWalkVelocity = 200; //Walking X velocity
var playerFacingRight = true; //Is the player facing right?
var playerHasWings = false; //Can the player fly?
var playerSwingSword = false; //Is the player swinging their sword?
var playerSwungSword = false; //Has the player swung their sword?
var playerDamagePoints = playerDamgePointsInit; //Current damage inflicted upon enemies. 
var playerInvulnerabilityWait = 1000; //How long the player should be invulnerable.
var playerInvulnerability = false; //Is the player invulnerable?
var playerVelocityYMax = 1350; //Maximum Y velocity - prevents clipping through floor when falling. 

//Variables relating to siren level
var playerShipOffsetX = 300; //Camera offset for playerShip mode. 
var playerShip = false; //Is the player a ship or a person?
var playerShipVelocity = 300; //X velocity used in playerShip mode. 


/* Player movement. 
 * This is used when controlling a person. 
 * This is not used for controlling a ship. 
 */
function playerMovement() {
    //If the attack key is held, swing the player's sword. 
    if (attackKey.isDown && !playerSwingSword && !playerSwungSword) {
        playerSword();
    //If the player's sword has been swung and the player isn't currently in a swing, allow the player to swing their sword again. 
    } else if (!attackKey.isDown && !playerSwingSword && playerSwungSword) {
        playerSwungSword = false; 
    }

    //Cap the player's Y velocity. 
    if (player.body.velocity.y > playerVelocityYMax) {
        player.body.velocity.y = playerVelocityYMax; 
    }

    //Horizontal movement. tempVelocityX is modified and then used as the horizontal velocity of the player. 
    var tempVelocityX = 0; 
    if (cursors.left.isDown) {
        tempVelocityX -= playerWalkVelocity;
        playerFacingRight = false; 
    }
    if (cursors.right.isDown) {
        tempVelocityX += playerWalkVelocity;
        playerFacingRight = true;
    }
    player.setVelocityX(tempVelocityX);
    
    //Flip the player if they are facing left. 
    player.flipX = !(playerFacingRight); 

    //Animations. 
    if (!playerSwingSword && !cursors.left.isDown && !cursors.right.isDown) {
        //Play idle animation. 
        player.anims.play('jasonIdleRight', true);
        player.setSize(20, 64);
        player.setOffset(28, 0);
    } else if (playerSwingSword) {
        //Play attack animation. 
        player.anims.play('jasonAttackRight', true);

        /* If the player is facing a wall and close to it, the game will use the default hitbox size. 
         * If the player is not near a wall, a larger hitbox will be used.  
         */
        //Check nearby tiles. 
        var tempCheckRightTile = createThis.map.getTileAtWorldXY(player.x + 50, player.y + 31); 
        var tempCheckLeftTile = createThis.map.getTileAtWorldXY(player.x - 11, player.y + 31);
        var tempCheckRightTile2 = createThis.map.getTileAtWorldXY(player.x + 50, player.y); 
        var tempCheckLeftTile2 = createThis.map.getTileAtWorldXY(player.x - 11, player.y);

        //Check nearly tiles. The last two check whether the player is near the edge of the map.  
        if ((playerFacingRight && tempCheckRightTile !== null && tempCheckRightTile.collides) || 
            (!playerFacingRight && tempCheckLeftTile !== null && tempCheckLeftTile.collides) || 
            (playerFacingRight && tempCheckRightTile2 !== null && tempCheckRightTile2.collides) || 
            (!playerFacingRight && tempCheckLeftTile2 !== null && tempCheckLeftTile2.collides) || 
            (player.x + 50 > gameWidth) || (player.x - 11 < 0)) {
            //Smaller hitbox
            player.setSize(20, 64);
            player.setOffset(28, 0);     
        } else if (playerFacingRight) {
            //Expand hitbox to right 
            player.setSize(60, 64);
            player.setOffset(28, 0);
        } else {
            //Expand hitbox to left
            player.setSize(60, 64);
            player.setOffset(-12, 0);
        } 
    } else {
        //Play walk animation. 
        player.anims.play('jasonRight', true);
        player.setSize(20, 64);
        player.setOffset(28, 0);
    }
    
    //Vertical movement
    if (jumpKey.isDown) {
        if (playerHasWings || player.body.blocked.down){
            player.setVelocityY(-playerJumpVelocity);
        }
    }
    
    /* If there are portals in the map, iterate through them to check collision 
     * and change map if the player is holding the up key.
     */
    if (portalCount > 0) { 
        for (i = 0; i < portalCount; i++) {
            if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), portals[i].getBounds())){
                if (cursors.up.isDown && portals[i].activePortal) {
                    playerShip = false;
                    changeLevel(portalMap); 
                }   
            }
        }
    } 
}

/* Ship Movement. 
 * This movement function is used when the player is controlling a ship.
 * Vertical movement is enabled but horizontal movement and attacking are disabled.
 * This is not used for controlling a person. 
 */

function playerShipMovement() {
    //Set X velocity to playerShipVelocity. 
    player.setVelocityX(playerShipVelocity);

    //Set Y velocity. 
    var tempVelocityY = 0; 
    if (cursors.up.isDown) {
        tempVelocityY -= playerShipVelocity;
    }
    if (cursors.down.isDown) {
        tempVelocityY += playerShipVelocity;
    }
    player.setVelocityY(tempVelocityY);

    //If the player's ship hits something, they should die. 
    if (player.body.blocked.right) {
        playerAlive = false;
        //Disabling collision prevents an issue where the ship can get stuck on a rock when falling.
        player.body.checkCollision = false;  
        player.setCollideWorldBounds(false);
    }

    //Check if the player has won the level by flying offscreen.  
    if (player.x > gameWidth + 100) {
        playerShip = false; 
        playerSprite = 'jason';
        changeLevel('argoLanding'); 
    }
}

/* This function controls what happens when a player collides with a rock.
 * The ship will fall and spin, with gameOver() being called when the player is off-screen. 
 */ 
function playerShipSink() {
    player.setVelocityX(0);
    player.setVelocityY(300);
    player.angle += 5;
    currentHealth = 1;
    parseHealthBarAnimate();
}

/* Stops a period of playerInvulnerability triggered upon hitting an enemy. 
 * It is assumed that the player is in an invulnerable state .
 */
function playerInvulnerabilityStop() {
    playerInvulnerability = false; 
    player.alpha = 1; 
}

/* Damage the player. 
 * Required parameters: tempHealth.
 */
function playerDamage(tempHealth) {
    if (!playerInvulnerability){
        playerInvulnerability = true; 
        player.alpha = 0.3; 
        setTimeout(playerInvulnerabilityStop, playerInvulnerabilityWait);
        currentHealth -= tempHealth;
        parseHealthBarAnimate();
        if (currentHealth <= 0) {
            gameOver(); 
        }
    }
}

//Boosts max health by the number stated in tempHealth.
function maxHealthBoost(tempHealth) {
    maxHealth += tempHealth; 
    currentHealth = maxHealth;
    maxHealthUpdate();
    parseHealthBarAnimate();
}

/* Heals player by the amount in tempHealth. 
 * The player's health can not exceed maxHealth. 
 */
function playerHeal(tempHealth){
    currentHealth += tempHealth;
    if (currentHealth > maxHealth){
        currentHealth = maxHealth;
    }
    parseHealthBarAnimate();
}

/* gameOver() is called when the player dies and the level should reset.  
 * The player's health can not exceed maxHealth. 
 */
function gameOver() {
    playerAlive = false; 

    //Reset health and the health bar.
    currentHealth = maxHealth;
    healthBarReset();

    //Clear skeleton interval if applicable. 
    if (skeleInterval !== undefined) {
        clearInterval(skeleInterval);
    }

    //Kill all enemeis on the level to prevent bugs when resetting. 
    for (i = 0; i < enemyCount; i++){
        enemies[i].alive = false; 
    }

    //Reset inventory to a prior state (stored in resetInventory)
    for (j = 0; j < inventory.length; j++) {
        inventory[j] = (resetInventory[j]);
    }

    if (currentLevelID === 'colchisFields' && userIntThis.ritualItemText.alpha > 0) {
        userIntThis.ritualItemText.alpha = 0;
    } else if (userIntThis.ritualItemText.alpha > 0){
        userIntThis.updateRitualItemText();
    }

    //Restart the level. 
    createThis.scene.restart(currentLevelID);
}

/* Check if the player has fallen off the map. 
 * If they have, they should die.  
 */
function playerCheckForFall() {
    if (player.y > gameHeight + 100 ) {
        gameOver();
    }
}

/* This is used when the player spawns into a level. 
 * The game checks if there is a portal linked to the level the player came out of. 
 * If there is, the player is moved there, rather than spawning from the spawn point defined in Tiled.
 * oldLevelID refers to the levelID of the previous level.  
 */
function playerCheckForPortal() {
    if (typeof oldLevelID !== 'undefined'){ 
        for (i = 0; i < portalCount; i++) {
            if (portals[i].portalMap == oldLevelID) {
                player.x = portals[i].x;
                player.y = portals[i].y;
            }
        }
    }
}

/* Check if the player has walked away from a portal. 
 * The radius is defined by dialogueWalkAway. 
 */
function playerCheckDialogueWalkAway(){
    if ((player.x > dialoguex + dialogueWalkAway) || (player.x < dialoguex - dialogueWalkAway)) {
        dialogueAlreadyEngaged = false; 
        dialogueActive = false; 
        npcDialogue.setText(''); 
        currentDialogue = 0;
        clearDialogueBox();
    }
}

/* The player swings their sword. 
 * This only handles the playerSwingSword and playerSwungSword variables. 
 * It does not affect animation or damage.  
 */
function playerSword () {
    playerSwingSword = true; 
    playerSwungSword = true; 
    setTimeout(playerSwordStop, 500);
}

/* The player stops swinging their sword. 
 * This only handles the playerSwingSword variable. 
 * It does not affect animation or damage.  
 */
function playerSwordStop () {
    playerSwingSword = false; 
}
