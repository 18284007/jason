//Game variables relating to the player on all levels.
var maxHealth = 100;
var currentHealth = 100;
var playerAlive = true;
// variables relating to normal levels
var playerJumpVelocity = 500; 
var playerWalkVelocity = 200; 
var playerFacingRight = true;
var playerHasWings = false; //Can the player fly?
var playerSwingSword = false;
var playerSwungSword = false; 
var playerDamagePoints = 50;
var playerInvulnerabilityWait = 1000; 
var playerInvulnerability = false;


// variables relating to siren level
var playerShipOffsetX = 300; //Camera offset for playerShip mode. 
var playerShip = false; //Is the player a ship or a person?
var playerShipVelocity = 300;


/* This function would be used for importing player data from a JSON file. 
 * It is currently not working, so please do not use it. 
 */
function loadCharacterMetaJSON() {
    createThis.load.json('characterMetaJSON', 'code/engine/player.json');
}

function parseCharacterMetaJSON() {
    characterMetaJSON = createThis.cache.json.get('characterMetaJSON');
    characterMeta = characterMetaJSON.characters;
}


/* Player movement. 
 * This is used when controlling a person. 
 * This is not used for controlling a ship. 
 */
function playerMovement() {
    if (attackKey.isDown && !playerSwingSword && !playerSwungSword && !playerInvulnerability) {
        playerSword();
    } else if (!attackKey.isDown && !playerSwingSword && playerSwungSword) {
        playerSwungSword = false; 
    }
    
    if (playerSwingSword) {
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
    if (cursors.left.isDown) {
        tempVelocityX -= playerWalkVelocity;
        playerFacingRight = false; 
    }
    if (cursors.right.isDown) {
        tempVelocityX += playerWalkVelocity;
        playerFacingRight = true;
    }
    player.setVelocityX(tempVelocityX);
    
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
        //Disabling collision prevents an issue where the ship can get stuck on a rock when falling.
        player.body.checkCollision = false;  
        player.setCollideWorldBounds(false);
    }

    //Check if the player has won the level by flying offscreen.  
    if (player.x > boundaryEdge.x + 100) {
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

function playerInvulnerabilityStop() {
    playerInvulnerability = false; 
    player.alpha = 1; 
}


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

// Boosts max health by the number stated in tempHealth.
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

function gameOver() {
    playerAlive = false; 
    currentHealth = maxHealth;
    healthBarReset();
    createThis.scene.restart(currentLevelID);
}

function playerCheckForFall() {
    if (player.y > bganchor.y) {
        gameOver();
    }
}

function playerCheckDialogueWalkAway(){
    if ((player.x > dialoguex + dialogueWalkAway) || (player.x < dialoguex - dialogueWalkAway)) {
        dialogueAlreadyEngaged = false; 
        dialogueActive = false; 
        npcDialogue.setText(''); 
        currentDialogue = 0;
        clearDialogueBox();
    }
}

function playerSword () {
    playerSwingSword = true; 
    playerSwungSword = true; 
    setTimeout(playerSwordStop, 500);
}

function playerSwordStop () {
    playerSwingSword = false; 
}
