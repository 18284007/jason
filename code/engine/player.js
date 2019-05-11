//Game variables relating to the player.
var maxHealth = 100;
var currentHealth = 100;
var playerJumpVelocity = 500; 
var playerWalkVelocity = 200; 
//var playerShip = false; //Is the player a ship or a person?
var playerShipVelocity = 300;
var playerFacingRight = true;
var playerHasWings = false; //Can the player fly? 

var playerShipOffsetX = 500; //Camera offset for playerShip mode. 

var playerSwingSword = false; 
var playerDamagePoints = 50; 

var playerInvulnerabilityWait = 1000; 
var playerInvulnerability = false; 

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
    if (attackKey.isDown && !playerSwingSword) {
        playerSword();
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

    //Move into portals. 
    if (!playerShip && portalSpawnPoint !== null && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), portal.getBounds())){
        if (cursors.up.isDown) {
            playerShip = false;
            portal.destroy();
            changeLevel(portalMap);
            //temp 
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
        changeLevel(edgeMap); 
    }
}

/* This function controls what happens when a player collides with a rock.
 * The ship will fall and spin, with gameOver() being called when the player is off-screen. 
 */ 
function playerShipSink() {
    player.setVelocityX(0);
    player.setVelocityY(300);
    player.angle += 5; 
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

//The game is reset. 
function gameOver() {
    playerAlive = false; 
    //createThis.cameras.main.fadeOut(1000);
    //setTimeout(window.location = "index.html",20000);\
    currentHealth = maxHealth;
    healthBarReset();
    createThis.scene.restart('playLevel');
}

function playerCheckForFall() {
    if (player.y > bganchor.y) {
        gameOver();
    }
}

function playerNPCCollision() {
    if (talkKey.isDown) {
        if (!dialogueAlreadyEngaged) {
        	if (currentDialogue > -1)
        	{
        		npcDialogue.setText(dialogue[currentDialogue].char + '\n' + dialogue[currentDialogue].speech);
        	}
        	
            if (currentDialogue === 0)
            {
                drawDialogueBox();
                dialoguex = player.x;
                if (dialogueMax === 0)
                {
                	currentDialogue = -1;
                }
                else
                {
                	currentDialogue++; 
                } 
            } 
            else if (currentDialogue == dialogueMax || currentDialogue < 0) {
                currentDialogue = 0;
                clearDialogueBox();
            } else {
                currentDialogue++; 
            } 
            dialogueAlreadyEngaged = true;
            dialogueActive = true;  
            dialogueAlreadyEngaged = true;
            dialogueActive = true;  
        }
    } else {
        dialogueAlreadyEngaged = false; 
    }
}

function playerCheckDialogueWalkAway(){ 
    //if (dialogueAlreadyEngaged) {
        if ((player.x > dialoguex + dialogueWalkAway) || (player.x < dialoguex - dialogueWalkAway)) {
            dialogueAlreadyEngaged = false; 
            dialogueActive = false; 
            npcDialogue.setText(''); 
            currentDialogue = 0;
            clearDialogueBox();
        }
    //}
}

function playerSword () {
    playerSwingSword = true; 
    setTimeout(playerSwordStop, 500);
}

function playerSwordStop () {
    playerSwingSword = false; 
}
