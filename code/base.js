var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 900}, 
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
 * The level is selected by choosing a particular HTML file. 
 * This can be changed later.
 */ 
//var currentLevel = "assets/map.json";

function preload ()
{
    //Player sprites. 
    this.load.spritesheet('jason','assets/player/jason.png', 
       { frameWidth: 48, frameHeight: 48 });

    //Temporary enemy sprite. 
    this.load.spritesheet('tempEnemy','assets/enemy/eviljason.png', 
       { frameWidth: 48, frameHeight: 48 });

    //LEVEL STUFF
    //Environment sprites - PLACEHOLDERS. 
    this.load.image('sky', 'assets/sky.png');
    this.load.image("tiles", "assets/tilesheet-extruded.png");
    this.load.tilemapTiledJSON("currentLevelTilemap", currentLevel);
}

var map;

function create ()
{
    //Map
    this.map = this.make.tilemap({ key: "currentLevelTilemap" });

    //Render background. 
    //const bganchor = this.map.findObject("Objects", obj => obj.name === "bganchor");
    //var backgroundLayer0 = 'sky';
    //background = this.add.image(bganchor.x, bganchor.y, backgroundLayer0);
    
    //Draw tileset/objects
    tileset = this.map.addTilesetImage("tilesheet-extruded","tiles");
    mapLayerBG = this.map.createStaticLayer("Layer_bg", tileset, 0, 0);
    mapLayer = this.map.createStaticLayer("Layer", tileset, 0, 0);
    
    //Spawn player.
    playerSpawnPoint = this.map.findObject("Objects", obj => obj.name === "Player Spawn");
    player = this.physics.add.sprite(playerSpawnPoint.x, playerSpawnPoint.y, playerSprite);

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
 
    //Camera
    this.cameras.main.startFollow(player, true, 0.05, 0.03);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.mainCamera = this.cameras.main;

    //Create enemies - TEMPORARY STUFF. 
    enemies = this.physics.add.sprite(200, 450, 'tempEnemy');
    this.physics.add.collider(enemies, mapLayer); 
}

function update ()
{
    //Use the appropriate movement function for the level. 
    if (!playerShip) {
        playerMovement();
    } else {
        playerShipMovement();
    }

    playerEnemyCollision();
}