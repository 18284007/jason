var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800}, 
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

/* The currentLevel variable is currently located in the html file.  
 * It is controlled by the user selecting a level on a html page 
 * and a <script> tag setting the variable. 
 * This can be changed later. 
 */

function preload ()
{
    createThis = this; 
    currentLevel = 'assets/' + currentLevelID + '.json';
    currentLevelDialogueJSON = 'stages/dialogue/' + currentLevelID + '.json';

    loadLevelDialogue(); 

    //Player sprites. 
    this.load.spritesheet('jason','assets/player/jason.png', 
       { frameWidth: 48, frameHeight: 48 });
    this.load.image('ship','assets/player/ship.png');

    this.load.image('spiderBossSprite','assets/enemy/spiderBoss.png');
    this.load.image('spiderBossWebSprite','assets/enemy/spiderBossWeb.png');

    //01
    this.load.image('bonfireSprite','assets/bonfire.png');

    //shrineScene
    //shrineLoad();
    this.load.image('medeaSprite', 'assets/NPC/Medea-inface.png');
    this.load.image('shrineJason', 'assets/NPC/Jason-Pholder.png');
    this.load.image('shrinePortal','assets/items/doorway.png');

    //Temporary enemy sprite. 
    this.load.spritesheet('tempEnemy','assets/enemy/eviljason.png', 
       { frameWidth: 48, frameHeight: 48 });

    //Items
    this.load.image('spiderFlowerSprite', 'assets/items/flower.png');

    //LEVEL STUFF
    //Environment sprites - PLACEHOLDERS. 
    this.load.image('sky', 'assets/sky.png');
    //this.load.image('sky', 'assets/stage/background/01.png');
    this.load.image("tiles", "assets/tilesheet-extruded.png");
    this.load.tilemapTiledJSON("currentLevelTilemap", currentLevel);
}

function create ()
{
    //Map
    this.map = this.make.tilemap({ key: "currentLevelTilemap" });

    playerAlive = true; 

    //Render background. 
    bganchor = this.map.findObject("Objects", obj => obj.name === "bganchor");
    var backgroundLayer0 = 'sky';
    background = this.add.image(bganchor.x, bganchor.y, backgroundLayer0);
    background.setOrigin(0.1,1);
    background.scrollFactorX = 0;
    
    //Draw tileset/objects
    tileset = this.map.addTilesetImage("tilesheet-extruded","tiles");
    mapLayerBG = this.map.createStaticLayer("Layer_bg", tileset, 0, 0);
    mapLayer = this.map.createStaticLayer("Layer", tileset, 0, 0);
    
    //Spawn player.
    playerSpawnPoint = this.map.findObject("Objects", obj => obj.name === "Player Spawn");
    player = this.physics.add.sprite(playerSpawnPoint.x, playerSpawnPoint.y, playerSprite);

    spiderBossSpawnPoint = this.map.findObject("Objects", obj => obj.name === "spiderBoss");
    if (spiderBossSpawnPoint !== null){    
        spiderBossInit();
    }

    //Collision Detection
    mapLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(player, mapLayer); 

    //Player sprite stuff. 
    this.anims.create({
        key: 'jasonLeft',
        frames: this.anims.generateFrameNumbers('jason', { start: 24, end: 31 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'jasonRight',
        frames: this.anims.generateFrameNumbers('jason', { start: 8, end: 15 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'jasonAttackLeft',
        frames: this.anims.generateFrameNumbers('jason', { start: 36, end: 39 }),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({
        key: 'jasonAttackRight',
        frames: this.anims.generateFrameNumbers('jason', { start: 40, end: 43 }),
        frameRate: 15,
        repeat: -1
    });

    //Keyboard input.
    cursors = this.input.keyboard.createCursorKeys();
    attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    talkKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
 
    //Camera
    if (!playerShip) {
        this.cameras.main.startFollow(player, true, 0.05, 0.03);
    } else {
        playerOffset = this.physics.add.sprite(playerSpawnPoint.x + 400, playerSpawnPoint.y, playerSprite);
        this.cameras.main.startFollow(playerOffset, true, 0.05, 0.03);
        playerOffset.alpha = 0; 
        playerOffset.allowGravity = 0; 
    }
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    ////Create enemies - TEMPORARY STUFF. 
    //enemies = this.physics.add.sprite(200, 450, 'tempEnemy');
    //this.physics.add.collider(enemies, mapLayer); 

    //If the player is a ship, disable gravity. 
    if (playerShip) {
        player.body.allowGravity = false;
    }

    medeaSpawnPoint = this.map.findObject("Objects", obj => obj.name === "medea");
    if (medeaSpawnPoint !== null) {
        medea = this.physics.add.sprite(medeaSpawnPoint.x, medeaSpawnPoint.y, 'medeaSprite');
        this.physics.add.collider(medea, mapLayer);
        npcDialogue = createThis.add.text(medeaSpawnPoint.x,550,'',{color: '#000000'});
    }

    crew01SpawnPoint = this.map.findObject("Objects", obj => obj.name === "crew01");
    if (crew01SpawnPoint !== null) {
        crew01 = this.physics.add.sprite(crew01SpawnPoint.x, crew01SpawnPoint.y, 'jason');
        this.physics.add.collider(crew01, mapLayer);
    }

    crew02SpawnPoint = this.map.findObject("Objects", obj => obj.name === "crew02");
    if (crew02SpawnPoint !== null) {
        crew02 = this.physics.add.sprite(crew02SpawnPoint.x, crew02SpawnPoint.y, 'jason');
        this.physics.add.collider(crew02, mapLayer);
    }

    bonfireSpawnPoint = this.map.findObject("Objects", obj => obj.name === "bonfire");
    if (bonfireSpawnPoint !== null) {
        bonfire = this.physics.add.sprite(bonfireSpawnPoint.x, bonfireSpawnPoint.y, 'bonfireSprite');
        this.physics.add.collider(bonfire, mapLayer);
    }

    spiderFlowerSpawnPoint = this.map.findObject("Objects", obj => obj.name === "spiderFlower");
    if (spiderFlowerSpawnPoint !== null) {
        //spiderFlower = new spiderFlowerItem(game, player.x, player.y); 
        //console.log(spiderFlower.testvar);
    }

    parseLevelDialogue();
}

function update ()
{
    //Use the appropriate movement function for the level. 
    if (!playerShip && playerAlive) {
        playerMovement();
    } else if (playerShip && playerAlive) {
        playerShipMovement();
    } else if (playerShip && !playerAlive) {
        playerShipSink(); 
    }

    //Update the camera offset if playerShip is enabled. 
    if (playerShip) {
        playerOffset.x = player.x + playerShipOffsetX; 
        playerOffset.y = player.y; 
    }

    //Enemy Movement
    enemyMovement(); 

    //Check if a player has fallen below the map. 
    playerCheckForFall(); 

    if (playerAlive) {
        playerEnemyCollision();
    }

    if (medeaSpawnPoint !== null) {
        if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), medea.getBounds())) {
            playerNPCCollision();
        } else if (dialogueActive) {
            playerCheckDialogueWalkAway(); 
        }
    }
}