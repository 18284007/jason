skelesRemain = 1;
skeleSpawn = 0;
skelesActive = false;
skeleInterval = undefined;

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
        if (parameter.gravity) {
            createThis.physics.add.collider(this, mapLayer);
        }

        if (typeof parameter.xMove !== 'undefined'){ 
            this.moveRight = true; 
            this.xMin = parameter.x;
            this.findBounds = createThis.map.objects[0].objects;
            this.maxXBound = this.findBounds.find(function(disc) {
                return disc.name == 'farBoundary';
            });
            if (parameter.x + parameter.xMove > this.maxXBound.x) {
                this.xMax = this.maxXBound.x-100;
            } else {
                this.xMax = parameter.x + parameter.xMove; 
            }
            //this.xMax = parameter.x + parameter.xMove;
            this.xVel = parameter.xVel; 
            this.body.setVelocityX(this.xVel);
        } 
        if (typeof parameter.yMove !== 'undefined'){
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
        this.invulnerabilityWait = 1500; 
        this.invulnerability = false; 
        this.alive = true;
        this.playerDamageCollision = 20;
        this.playerDamageSword = 40; 

        this.knockback = false; 
        this.knockedBack = false;

        if (typeof parameter.invulnerabilityAlways !== 'undefined'){ 
            this.invulnerabilityAlways = parameter.invulnerabilityAlways; 
        } else {
            this.invulnerabilityAlways = false; 
        }

        if (typeof parameter.spiderBoss !== 'undefined'){ 
            this.spiderBoss = parameter.spiderBoss; 
        } else {
            this.spiderBoss = false; 
        }

        if (typeof parameter.skeleton !== 'undefined'){ 
            this.skeleton = parameter.skeleton; 
        } else {
            this.skeleton = false; 
        }

        if (typeof parameter.boss !== 'undefined'){ 
            this.boss = parameter.boss;
            activeBosses++; 
        } else {
            this.boss = false; 
        }

        if (typeof parameter.hasSword !== 'undefined'){ 
            this.hasSword = parameter.hasSword; 
        } else {
            this.hasSword = false; 
        }

        if (typeof parameter.stompable !== 'undefined'){ 
            this.stompable = parameter.stompable; 
        } else {
            this.stompable = false; 
        }

        if (typeof parameter.damageTouch !== 'undefined'){ 
            this.damageTouch = parameter.damageTouch; 
        } else {
            this.damageTouch = true; 
        }

        //Collision detection between the player and enemy. 
        createThis.physics.add.overlap(this, player, this.collision);
    }

    collision(tempEnemy) {
        tempEnemy.collisionBase(tempEnemy);
    }

    /* If the enemy is in a state of temporary invulnerability, nothing happens. 
     * Otherwise, the player will damage the enemy if the sword is swung and the 
     * enemy will damage the player if the sword is not being swung. 
     * tempEnemy refers to the enemy object. 
     */
    collisionBase(tempEnemy) {
        if (tempEnemy.stompable && player.body.velocity['y'] >= 200) {
            enemies[tempEnemy.enemyId].destroy();  
        } else if (playerSwingSword && !tempEnemy.invulnerability && !tempEnemy.invulnerabilityAlways) {
            enemies[tempEnemy.enemyId].health -= playerDamagePoints;
            enemies[tempEnemy.enemyId].invulnerability = true; 
            enemies[tempEnemy.enemyId].alpha = 0.3;
            enemies[tempEnemy.enemyId].setTint(0xFF0000);
            if (enemies[tempEnemy.enemyId].body.allowGravity) {
                enemies[tempEnemy.enemyId].knockback = true;
            }
            setTimeout(tempEnemy.invulnerabilityStop, 500, tempEnemy.enemyId);
        } else if (!playerSwingSword && !tempEnemy.invulnerability && tempEnemy.damageTouch) {
            playerDamage(tempEnemy.playerDamageCollision);
        } else if (!playerSwingSword && tempEnemy.hasSword && tempEnemy.swingSword) {
            playerDamage(tempEnemy.playerDamageSword);
        }

        //If the attacks are inactive and the spider is attacked, it will become active.
        if (enemies[tempEnemy.enemyId] !== undefined) {
            if (enemies[tempEnemy.enemyId].spiderBoss == true && !spiderBossActive) {
                spiderBossActive = true;
            }
        }
        
    }

    /* Stop enemy invulnerability. 
     * tempEnemyId refers to the enemy ID. 
     */
    invulnerabilityStop(tempEnemyId) {
        enemies[tempEnemyId].invulnerability = false; 
        enemies[tempEnemyId].alpha = 1; 
        enemies[tempEnemyId].clearTint();
    }

    //Enemy update routine. 
    update() {
        if (this.alive && this.health <= 0) {
            this.alive = false; 
            if (this.boss) {
                activeBosses--;
            }

            if (this.spiderBoss) {
                this.webGraphics.alpha = 0;
            }
            
            if (this.skeleton && skelesRemain > 0) {
                skelesRemain--;
                userIntThis.updateSkeletonText();
                if (skelesRemain === 0) {
                    userIntThis.ritualItemText.alpha = 0;
                    if (levelProgress === 3) {
                        levelProgress++;
                    }
                    //reset
                    skelesRemain = 1;
                }
            }
            
            enemies[this.enemyId].destroy(); 
        }
    }

    movement() {
        //If the enemy has been knocked back, their movement should be adjusted. 
        if (this.knockback) {
            this.knockback = false;
            if (playerFacingRight) {
                this.body.setVelocityX(100);
            } else {
                this.body.setVelocityX(-100);
            }
            this.body.setVelocityY(-300);
            this.knockedBack = true; 
        } 
        

        //Movement logic. 
        if (this.knockedBack && this.body.blocked.down) {
            if (this.x > this.xMax) {
                this.body.setVelocityX(-this.xVel);
                this.moveRight = false; 
                this.knockedBack = false;    
            } else if (this.x < this.xMin) {
                this.body.setVelocityX(this.xVel);
                this.moveRight = true; 
                this.knockedBack = false;    
            }
        } else if (!this.knockedBack){
            if (this.moveRight && this.x > this.xMax) {
                this.body.setVelocityX(-this.xVel);
                this.moveRight = false;     
            } else if (this.x < this.xMin) {
                this.body.setVelocityX(this.xVel);
                this.moveRight = true; 
            }
        }
    }

    collision(tempEnemy) {
        tempEnemy.collisionBase(tempEnemy);
    }

    /* If the enemy is in a state of temporary invulnerability, nothing happens. 
     * Otherwise, the player will damage the enemy if the sword is swung and the 
     * enemy will damage the player if the sword is not being swung. 
     * tempEnemy refers to the enemy object. 
     */
    collisionBase(tempEnemy) {
        if (tempEnemy.stompable && player.body.velocity['y'] >= 200) {
            enemies[tempEnemy.enemyId].destroy();  
        } else if (playerSwingSword && !tempEnemy.invulnerability && !tempEnemy.invulnerabilityAlways) {
            enemies[tempEnemy.enemyId].health -= playerDamagePoints;
            enemies[tempEnemy.enemyId].invulnerability = true; 
            enemies[tempEnemy.enemyId].alpha = 0.3;
            enemies[tempEnemy.enemyId].setTint(0xFF0000);
            if (enemies[tempEnemy.enemyId].body.allowGravity) {
                enemies[tempEnemy.enemyId].knockback = true;
            }
            setTimeout(tempEnemy.invulnerabilityStop, 500, tempEnemy.enemyId);
        } else if (!playerSwingSword && !tempEnemy.invulnerability && tempEnemy.damageTouch) {
            playerDamage(tempEnemy.playerDamageCollision);
        } else if (!playerSwingSword && tempEnemy.hasSword && tempEnemy.swingSword) {
            playerDamage(tempEnemy.playerDamageSword);
        }

        //If the attacks are inactive and the spider is attacked, it will become active.
        if (enemies[tempEnemy.enemyId] !== undefined) {
            if (enemies[tempEnemy.enemyId].spiderBoss == true && !spiderBossActive) {
            spiderBossActive = true;
            }
        }
    }

    /* Stop enemy invulnerability. 
     * tempEnemyId refers to the enemy ID. 
     */
    invulnerabilityStop(tempEnemyId) {
        enemies[tempEnemyId].invulnerability = false; 
        enemies[tempEnemyId].alpha = 1; 
        enemies[tempEnemyId].clearTint();
    }

    //Enemy update routine. 
    update() {
        if (this.alive && this.health <= 0) {
            this.alive = false; 
            if (this.boss) {
                activeBosses--;
            }

            if (this.spiderBoss) {
                this.webGraphics.alpha = 0;
            }
            
            if (this.skeleton && skelesRemain > 0) {
                skelesRemain--;
                userIntThis.updateSkeletonText();
                if (skelesRemain === 0) {
                    userIntThis.ritualItemText.alpha = 0;
                    if (levelProgress === 3) {
                        levelProgress++;
                    }
                    
                    //reset
                    skelesRemain = 1;
                }
            }
            
            enemies[this.enemyId].destroy(); 
        }
    }

    movement() {
        //If the enemy has been knocked back, their movement should be adjusted. 
        if (this.knockback) {
            this.knockback = false;
            if (playerFacingRight) {
                this.body.setVelocityX(100);
            } else {
                this.body.setVelocityX(-100);
            }
            this.body.setVelocityY(-300);
            this.knockedBack = true; 
        } 
        

        //Movement logic. 
        if (this.knockedBack && this.body.blocked.down) {
            if (this.x > this.xMax) {
                this.body.setVelocityX(-this.xVel);
                this.moveRight = false; 
                this.knockedBack = false;    
            } else if (this.x < this.xMin) {
                this.body.setVelocityX(this.xVel);
                this.moveRight = true; 
                this.knockedBack = false;    
            }
        } else if (!this.knockedBack) {
            if (this.moveRight && this.x > this.xMax) {
                this.body.setVelocityX(-this.xVel);
                this.moveRight = false;     
            } else if (this.x < this.xMin) {
                this.body.setVelocityX(this.xVel);
                this.moveRight = true; 
            }
        }

        if (this.body.velocity.x === 0 && this.xMove !== undefined) {
            //prevents sprite from getting 'stuck'
            this.body.setVelocityX(this.xVel);
            this.moveRight = true;
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
            health: 1, 
            stompable: true
        });
    }

    update () {
        if (this.alive && this.health <= 0) {
            this.alive = false; 
            enemies[this.enemyId].destroy(); 
        } else if (this.alive) {
            this.flipX = (this.body.velocity.x < 0);
        }
    }
}

class fox extends enemyBase { 
    constructor (parameter) {
        super({
            scene: createThis, 
            x: parameter.x, 
            y: parameter.y,
            key: 'fox', 
            xMove: parameter.xMove,
            xVel: 130, 
            scale: 0.45, 
            enemyId: parameter.enemyId, 
            gravity: true, 
            health: 200
        });
    }

    update () {            
        if (this.body.velocity.x < 0) {
            this.anims.play('foxLeft', true);
        } else if (this.body.velocity.x > 0) {
            this.anims.play('foxRight', true);
        }
            
        if (this.alive && this.health <= 0) {
            this.alive = false; 
            enemies[this.enemyId].destroy(); 
        }
    }    
}

/* Snake.
 * Required parameters: x, y, xMove, enemyId
 */
class snake extends enemyBase { 
    constructor (parameter) {
        super({
            scene: createThis, 
            x: parameter.x, 
            y: parameter.y,
            key: 'snake', 
            xMove: parameter.xMove,
            xVel: 130, 
            scale: 0.45, 
            enemyId: parameter.enemyId, 
            gravity: true, 
            health: 150
        });
    }
    update () {        
        if (this.body.velocity.x < 0) {
            this.anims.play('snakeLeft', true);
        } else if (this.body.velocity.x > 0) {
            this.anims.play('snakeRight', true);
        }
            
        if (this.alive && this.health <= 0) {
            this.alive = false; 
            enemies[this.enemyId].destroy(); 
        }
    }
}

/* Bats.
 * Required parameters: x, y, xMove, enemyId
 */
class bats extends enemyBase { 
    constructor (parameter) {
        super({
            scene: createThis, 
            x: parameter.x, 
            y: parameter.y,
            key: 'bats', 
            xMove: parameter.xMove,
            xVel: 130, 
            scale: 0.45, 
            enemyId: parameter.enemyId, 
            gravity: true, 
            health: 150
        });
    }    

    update () {        
        if (this.body.velocity.x < 0) {
            this.anims.play('batsLeft', true);
        } else if (this.body.velocity.x > 0) {
            this.anims.play('batsRight', true);
        }
        
        if (this.alive && this.health <= 0) {
            this.alive = false; 
            enemies[this.enemyId].destroy(); 
        }
    }    
}

/* Bull boss.
 * Required parameters: x, y, xMove, enemyId
 */
class bullBoss extends enemyBase { 
    constructor (parameter) {
        super({
            scene: createThis, 
            x: parameter.x, 
            y: parameter.y,
            key: 'bullBossSprite', 
            xMove: 300,
            xVel: 130, 
            scale: 0.18, 
            enemyId: parameter.enemyId, 
            gravity: false, 
            health: 250, 
            boss: true, 
            invulnerabilityAlways: true
        });
        this.shoot(this);
    }
    
    movement() {
        var tempVelocity = (this.body.velocity.x);
        if (!plow.stuck) {
            //An offset is derived from the enemyId so that the bulls have slightly different movement and do not stack on top of each other. 
            if (((player.x - 60 + (this.enemyId * 30)) < this.x) && ((player.x + 60 + (this.enemyId * 50)) > this.x)) {
                this.body.setVelocityX(0);
            } else if (player.x < this.x) {
                this.body.setVelocityX(-this.xVel - (this.enemyId * 30));
            } else if (player.x > this.x) {
                this.body.setVelocityX(this.xVel + (this.enemyId * 30));
            } 
    
            this.flipX = (tempVelocity > 0);
        } else {
            this.body.setVelocityX(-this.xVel);
            this.flipX = false; 
            if (this.x < -200) {
                this.alive = false; 
                enemies[this.enemyId].destroy();
                if (skelesActive) {
                    skeleArmySpawn();
                } else {
                    skelesActive = true;
                }

            }
        }
    }            

    shoot(tempBull) {
        if (tempBull.body !== undefined && tempBull.alive){
            projectiles[currentProjectile] = new dragonFire({
                x: tempBull.x, 
                y: tempBull.y,
                projectileId: currentProjectile, 
                aimed: true, 
                velocityAimed: 100
            });
            setTimeout(tempBull.shoot, 2500, tempBull);
        }
    }
    
}

/* Medusa Boss.
 * Required parameters: x, y, enemyId
 */
class medusaBoss extends enemyBase { 
    constructor (parameter) {
        super({
            scene: createThis, 
            x: parameter.x, 
            y: parameter.y,
            key: 'medusaBossSprite', 
            xMove: 300,
            xVel: 130, 
            scale: 1, 
            enemyId: parameter.enemyId, 
            gravity: false, 
            health: 250, 
            boss: true
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
                this.shootWeb();
            }
        } 
    }

    shootWeb() {
        projectiles[currentProjectile] = new spiderBossWeb({
            x: this.x, 
            y: this.y,
            projectileId: currentProjectile
        });
    }
}

/* Minotaur Boss.
 * Required parameters: x, y, enemyId
 */
class minotaurBoss extends enemyBase { 
    constructor (parameter) {
        super({
            scene: createThis, 
            x: parameter.x, 
            y: parameter.y,
            key: 'minotaurSprite', 
            xMove: 400,
            xVel: 200, 
            scale: 3, 
            enemyId: parameter.enemyId, 
            gravity: true, 
            health: 500, 
            damageTouch: true,
            hasSword: true, 
            boss: true
        });
        this.swingSword = false; //Is the minotaur swinging a sword?
        this.charging = false; //Is the minotaur charging at the player? 

        //Hitboxes
        this.body.setSize(48,35);
        this.body.setOffset(0,13);
    }

    movement() {
        if (this.knockback) {
            this.knockback = false;
            if (playerFacingRight) {
                this.body.setVelocityX(100);
            } else {
                this.body.setVelocityX(-100);
            }
            this.body.setVelocityY(-300);
            this.knockedBack = true; 
        } 

        if (this.knockedBack) {
            if (this.x > this.xMax) {
                this.body.setVelocityX(-this.xVel);
                this.moveRight = false; 
                this.knockedBack = false;    
            } else if (this.x < this.xMin) {
                this.body.setVelocityX(this.xVel);
                this.moveRight = true; 
                this.knockedBack = false;    
            }
        }

        if (this.charging && !this.swingSword) {
            this.body.setVelocityX(-this.xVel);
            if (this.x < this.xMin) {
                this.sword(); 
                this.flipX = true;
            }
        } else if (!this.charging && !this.swingSword) {
            this.body.setVelocityX(this.xVel);
            if (this.x > this.xMax) {
                this.sword(); 
                this.flipX = false;
            }
        }

        if (this.swingSword) {
            this.anims.play('minotaurSwingLeft', true);
            this.body.setSize(48,35);
            this.body.setOffset(0,14);
        } else {
            this.anims.play('minotaurWalkLeft', true);
            this.body.setSize(26,35);
            this.body.setOffset(11,14);
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

/* Dragon Boss. 
 * Flies horizontally and vertically. 
 * Required parameters: x, y, xMove, yMove, enemyId
 */
class dragonBoss extends enemyBase { 
    constructor (parameter) {
        super({
            scene: createThis, 
            x: parameter.x, 
            y: parameter.y,
            key: 'dragonSprite', 
            xMove: parameter.xMove,
            xVel: 300, 
            yMove: parameter.yMove, 
            yVel: 300,
            scale: 1, 
            enemyId: parameter.enemyId, 
            gravity: false, 
            health: 1000, 
            boss: true
        });

        this.verticalMove = false; 
        this.moveDirection = 0; 
        this.body.setVelocityY(0);
        this.invulnerabilityWait = 3000; 
        this.anims.play('dragonSpriteRight', true);
        this.body.setSize(140,70);
    }    

    collision (tempEnemy) {
        var tempOldPhase = tempEnemy.checkPhase(); 
        tempEnemy.collisionBase(tempEnemy);
        if (tempOldPhase !== tempEnemy.checkPhase()) {
            setTimeout(tempEnemy.hugeFire, 2000, tempEnemy);
        }
    }

    checkPhase() {
        if (this.health <= 300){
            return 2;
        } else if (this.health <= 700){
            return 1; 
        } else {
            return 0; 
        }
    }

    hugeFire (tempDragon) {
        for (i = 0; i < 8; i++) {
            projectiles[currentProjectile] = new dragonFire({
                x: tempDragon.x, 
                y: tempDragon.y,
                projectileId: currentProjectile,
                aimed: false, 
                hugeFireMovement: true
            });
        }
    }

    movement() { 
        if (!this.verticalMove && this.x > this.xMax) {
            if (this.moveUp) {
                this.body.setVelocityX(0);
                this.body.setVelocityY(-this.yVel);
                this.verticalMove = true; 
            } else {
                this.body.setVelocityX(0);
                this.body.setVelocityY(this.yVel);
                this.verticalMove = true; 
            }
        } else if (!this.verticalMove && this.x < this.xMin) {
            this.body.setVelocityX(this.xVel);
            this.body.setVelocityY(0);
            this.shoot(); 
        } else if (this.verticalMove) {
            if (!this.moveUp && (this.y > this.yMax) || (this.y < this.yMin)) {
                this.verticalMove = false;
                this.body.setVelocityX(-this.xVel);
                this.body.setVelocityY(0);
                this.moveUp = !this.moveUp; 
            }
        }

        this.flipX = (this.body.velocity.x <= 0);
    }

    shoot() {
        projectiles[currentProjectile] = new dragonFire({
            x: this.x, 
            y: this.y,
            projectileId: currentProjectile,
            aimed: (this.checkPhase() > 0), 
            velocityAimed: 400
        });

        if (this.checkPhase() == 2) {
            setTimeout(this.shootAgain, 200, this);
            setTimeout(this.shootAgain, 400, this);
        }
    }

    shootAgain(tempDragon) {
        projectiles[currentProjectile] = new dragonFire({
            x: tempDragon.x, 
            y: tempDragon.y,
            projectileId: currentProjectile,
            aimed: (tempDragon.checkPhase() > 0), 
            velocityAimed: 400
        });
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
            health: 250,
            spiderBoss: true, 
            boss: true
        });

        this.spiderBossAlive = true; 

        this.flipX = true; 

        //Create a white line that represents the spider web. 
        this.webLine = new Phaser.Geom.Line(parameter.x, parameter.y, parameter.x, parameter.y + parameter.yMove);
        this.webGraphics = createThis.add.graphics({lineStyle: {width: 3, color: 0xFFFFFF}});
        this.webGraphics.strokeLineShape(this.webLine);
        this.webGraphics.setDepth(-20);
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
        projectiles[currentProjectile] = new spiderBossWeb({
            x: this.x, 
            y: this.y,
            projectileId: currentProjectile
        });
    }
}

/* Skeleton.
 * Required parameters: x, y, enemyId.
 */
class skeleton extends enemyBase {
    constructor (parameter) {
        super({
            scene: createThis, 
            x: parameter.x, 
            y: parameter.y,
            key: 'skeleSprite', 
            xMove: 300,
            xVel: Math.round((Math.random() * 40) + 110), 
            scale: 1, 
            enemyId: parameter.enemyId, 
            gravity: true, 
            health: 100,
            skeleton:true, 
            boss: true
        });
        this.anims.play('skeleRight', true);
    }

    movement() {
        //If the enemy has been knocked back, their movement should be adjusted. 
        if (this.knockback) {
            this.knockback = false;
            if (playerFacingRight) {
                this.body.setVelocityX(100);
                this.anims.play('skeleRight', true);
            } else {
                this.body.setVelocityX(-100);
                this.anims.play('skeleLeft', true);
            }
            this.body.setVelocityY(-300);
            this.knockedBack = true; 
        } 
        

        //Movement logic. 
        if (this.knockedBack && this.body.blocked.down) {
            if (this.x > this.xMax) {
                this.body.setVelocityX(-this.xVel);
                this.moveRight = false; 
                this.knockedBack = false;
                this.anims.play('skeleLeft', true);    
            } else if (this.x < this.xMin) {
                this.body.setVelocityX(this.xVel);
                this.moveRight = true; 
                this.knockedBack = false;
                this.anims.play('skeleRight', true);    
            }
        } else if (!this.knockedBack){
            if (this.moveRight && this.x > this.xMax) {
                this.body.setVelocityX(-this.xVel);
                this.moveRight = false;
                this.anims.play('skeleLeft', true);
            } else if (this.x < this.xMin) {
                this.body.setVelocityX(this.xVel);
                this.moveRight = true;
                this.anims.play('skeleRight', true);
            } 
        }

        if (this.body.velocity.x === 0) {
            //prevents sprite from getting 'stuck'
            this.body.setVelocityX(50);
            this.moveRight = true;
            this.anims.play('skeleRight', true);
        }
    }
}

//Spawn a skeleton army. 
function skeleArmySpawn() {
    skelesActive = false;
    skelesRemain = 28;
    skeleSpawn = 1;
    this.activeSkeles = 0;
    this.skeleDelay = 4000;
    //Activate skeleton counter
    userIntThis.updateSkeletonText();
    skeleInterval = setTimeout(delayedSkeleSpawn,4000);
    //Deactivate skeleton counter
    //open portal, set progression
}

//Spawn a skeleton. 
function spawnSkeleton() {
    enemies[enemyCount] = new skeleton({
    x: Math.floor(200 + (Math.random() * (gameWidth - 400))), 
    y: 1750, 
     enemyId: enemyCount
    });
    enemyCount++;
}

//Delayed spawn of a skeleton. 
function delayedSkeleSpawn() {
    this.skeleDelay = 500;

    //Spawn new skeleton.
    if (skeleSpawn > 7) {
        if (skeleSpawn%2 === 0) {
            for (this.i = 0; this.i < skeleSpawn/2; this.i++) {
                spawnSkeleton();
            }
        } else {
            for (this.i = 0; this.i < 3; this.i++) {
                spawnSkeleton();
            }
        }
    } else {
        spawnSkeleton();
    }
    
    //Spawn skeleton later if needed. 
    if (skeleSpawn < 12) {
        skeleInterval = setTimeout(delayedSkeleSpawn, this.skeleDelay*skeleSpawn);
    }
    skeleSpawn++;
}

/* Runs the movement() and update() functions of each enemy. 
 * The enemy must be alive and not undefined. 
 */
function enemyMovement() {
    if (enemyCount > 0){
        for (i = 0; i < enemyCount; i++){
            if (enemies[i].alive && enemies[i].body !== undefined){
                enemies[i].movement();
                enemies[i].update();
            }
        }
    }
}
