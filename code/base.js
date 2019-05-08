/*variables relating to user controls*/
var cursors;
var attackKey;
var jumpKey;
var talkKey;
/*variables relating to the players character*/
var player;
/*variables relating to map generation*/
var mapLayer;
var createThis;
//var currentLevelID;
/*variables relating to moving between levels*/
var portal;
var portalSpawnPoint;
var portalMap;

class controller extends Phaser.Scene
{
    constructor()
    {
        super();
    }

    preload()
    {
    	//Load assets used in all levels
    	createThis = this;
    	//this.load.tilemapTiledJSON('argoLandingTilemap', 'assets/argoLanding.json');
        this.load.image('bonfireSprite','assets/bonfire.png');
        this.load.spritesheet('jason','assets/player/jason.png', 
           { frameWidth: 48, frameHeight: 48 });
        this.load.image('portalSprite','assets/items/portal.png');
        this.load.spritesheet('tempEnemy','assets/enemy/eviljason.png', 
           { frameWidth: 48, frameHeight: 48 });
        //LEVEL STUFF
        //Environment sprites - PLACEHOLDERS.
        this.load.image('sky', 'assets/sky.png');
        this.load.image("tiles", "assets/tilesheet-extruded.png");
    }

    create()
    {
    	firstInitHealthBar();
    	game.scene.run(currentLevelID);
    }

    update()
    {
    	
    }
}

function loadMap()
{
	var currentTilemapKey = currentLevelID + 'Tilemap';

    createThis.map = createThis.make.tilemap({ key: currentTilemapKey });
    //set Boundary
    boundaryEdge = createThis.map.findObject("Objects", obj => obj.name === "farBoundary");
    var gameWidth = boundaryEdge.x;
    var gameHeight = boundaryEdge.y;
    if (!playerShip) {
        createThis.physics.world.setBounds(0,0,gameWidth, gameHeight,64,true,true,false,false);
    }

    //Render background. 
    bganchor = createThis.map.findObject("Objects", obj => obj.name === "bganchor");
    var backgroundLayer0 = 'sky';
    var background = createThis.add.image(bganchor.x, bganchor.y, backgroundLayer0);
    background.setOrigin(0.1,1);
    background.scrollFactorX = 0;
    background.setDepth(-100);

    //Draw tileset/objects
    var tileset = createThis.map.addTilesetImage("tilesheet-extruded", "tiles", 64, 64, 1, 2);
    var mapLayerBG = createThis.map.createStaticLayer("Layer_bg", tileset, 0, 0);
    mapLayer = createThis.map.createStaticLayer("Layer", tileset, 0, 0);

    //Spawn player.
    var playerSpawnPoint = createThis.map.findObject("Objects", obj => obj.name === "Player Spawn");
    player = createThis.physics.add.sprite(playerSpawnPoint.x, playerSpawnPoint.y, playerSprite);

    if(!playerShip)
    {
    	player.setCollideWorldBounds(true);
    }

    mapLayer.setCollisionByProperty({ collides: true });
    createThis.physics.add.collider(player, mapLayer);

    //Player sprite stuff. 
    createThis.anims.create({
        key: 'jasonLeft',
        frames: createThis.anims.generateFrameNumbers('jason', { start: 24, end: 31 }),
        frameRate: 10,
        repeat: -1
    });
    createThis.anims.create({
        key: 'jasonRight',
        frames: createThis.anims.generateFrameNumbers('jason', { start: 8, end: 15 }),
        frameRate: 10,
        repeat: -1
    });
    createThis.anims.create({
        key: 'jasonAttackLeft',
        frames: createThis.anims.generateFrameNumbers('jason', { start: 36, end: 39 }),
        frameRate: 15,
        repeat: -1
    });
    createThis.anims.create({
        key: 'jasonAttackRight',
        frames: createThis.anims.generateFrameNumbers('jason', { start: 40, end: 43 }),
        frameRate: 15,
        repeat: -1
    });

    //Keyboard input.
    cursors = createThis.input.keyboard.createCursorKeys();
    attackKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    jumpKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    talkKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    //Camera
    if (!playerShip) {
    	createThis.cameras.main.startFollow(player, true, 0.05, 0.03);
    } else {
        playerOffset = createThis.physics.add.sprite(playerSpawnPoint.x + 400, playerSpawnPoint.y, playerSprite);
        createThis.cameras.main.startFollow(playerOffset, true, 0.05, 0.03);
        playerOffset.alpha = 0; 
        playerOffset.allowGravity = 0; 
    }
    createThis.cameras.main.setBounds(0, 0, createThis.map.widthInPixels, createThis.map.heightInPixels);

    if (playerShip) {
        player.body.allowGravity = false;
    }

    portalSpawnPoint = createThis.map.findObject("Objects", obj => obj.name === "portal");
    if (portalSpawnPoint !== null) {
        portal = createThis.physics.add.sprite(portalSpawnPoint.x, portalSpawnPoint.y, 'portalSprite');
        portal.body.allowGravity = false;
        portal.setDepth(-10);
        portalMap = portalSpawnPoint.properties[0].value; 
    }

    initHealthBar();

    spawnObjects();
}

function callUpdateFuncs()
{
	//Use the appropriate movement function for the level. 
    //if (!playerShip && playerAlive) {
    playerMovement();
    //} else if (playerShip && playerAlive) {
        //playerShipMovement();
    //} else if (playerShip && !playerAlive) {
       // playerShipSink(); 
    //}

        //Update the camera offset if playerShip is enabled. 
    //if (playerShip) {
        //playerOffset.x = player.x + playerShipOffsetX; 
        //playerOffset.y = player.y; 
    //}

    //Enemy Movement
    enemyMovement();
     
    playerCheckForFall(); 
    if (playerAlive) {
        playerItemCollision();
    }
    parseHealthBar();
    /*
    if (medeaSpawnPoint !== null) {
        if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), medea.getBounds())) {
            playerNPCCollision();
        } else if (dialogueActive) {
            playerCheckDialogueWalkAway(); 
        }
    }
    */
}

function changeLevel(tempNewLevelID) {
	var oldLevelID = currentLevelID;
    game.scene.run(tempNewLevelID);
    game.scene.stop(oldLevelID);
}



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
    scene: [controller, argoLanding, roadToColchis, marketplace, palace, shrine, shrineForest,
    		colchisFields, riverCrossing, gardenEntrance, gardenForest, gardenDungeon, gardenFleece] 
    
};

var game = new Phaser.Game(config);