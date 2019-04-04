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
//var currentLevel = "assets/map.json";

function preload ()
{
    createThis = this; 

    //Player sprites. 
    this.load.spritesheet('jason','assets/player/jason.png', 
       { frameWidth: 48, frameHeight: 48 });
    this.load.image('ship','assets/player/ship.png');

    //shrineScene
    //shrineLoad();
    this.load.image('medea', 'assets/NPC/Medea-inface.png');
    this.load.image('shrineJason', 'assets/NPC/Jason-Pholder.png');
    this.load.image('shrinePortal','assets/items/doorway.png');

    this.load.image('spiderBossSprite','assets/enemy/spiderBoss.png');
    this.load.image('spiderBossWebSprite','assets/enemy/spiderBossWeb.png');

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

    //shrineLevel
    /*if(currentLevel === 'assets/shrinemap.json')
    {
	this.shrineItems.add.group(
	{
		key: 'medea',
		setXY:
		{
			x:160
			y:780
		}
	},
	{
		key: 'shrineJason',
		setXY:
		{
			x:290
			y:780
		}
	},
	{
		key: 'shrinePortal',
		setXY:
		{
			x:1630
			y:780
		}
	});

	
    }*/
    
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

    playerCheckForFall(); 

    if (playerAlive) {
        playerEnemyCollision();
    }
}