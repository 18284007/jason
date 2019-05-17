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
var userIntThis;
var currentLevelDialogueJSON;
//var currentLevelID;
/*variables relating to moving between levels*/
var portalMap;

var backgroundLayer0;

class controller extends Phaser.Scene
{
    constructor()
    {
        super({key: 'controller'});
    }

    preload()
    {
    	//Load assets used in all levels
    	createThis = this;
	userIntThis = this;

        //main characters
    	this.load.image('medeaSprite', 'assets/NPC/Medea-inface.png');
        this.load.spritesheet('jason','assets/player/jason.png', 
           { frameWidth: 48, frameHeight: 48 });
        //portal
        this.load.image('portalSprite','assets/items/portal.png');
        //other/Placeholders (may move/remove later)
        this.load.spritesheet('tempEnemy','assets/enemy/eviljason.png', 
           { frameWidth: 48, frameHeight: 48 });
        this.load.image('bonfireSprite','assets/bonfire.png');
        this.load.image('spiderBossSprite','assets/enemy/spiderBoss.png');
        this.load.image('spiderBossWebSprite','assets/enemy/spiderBossWeb.png');
        //medusaBoss
        this.load.image('medusaBossSprite','assets/enemy/medusaBoss.png');
	//bullBoss
        this.load.image('bullBossSprite','assets/enemy/bullBoss.png');
        //Items (must be constantly loaded for inventory)
        this.load.image('spiderFlowerSprite', 'assets/items/flower.png');
        //LEVEL STUFF
        //Environment sprites - PLACEHOLDERS.
        this.load.image('bgSky', 'assets/background/sky.png');
        this.load.image('bgDungeon', 'assets/background/dungeon.png');
        this.load.image('bgForest', 'assets/background/forest.png');
        this.load.image('bgMarket', 'assets/background/market.png');
        this.load.image("tiles", "assets/tilesheet-extruded.png");

        this.load.image('maxHealthItemSprite', 'assets/items/maxHealth.png');
        this.load.image('healthItemSprite', 'assets/items/health.png');
        this.load.image('damageIncreaseItemSprite', 'assets/items/damageIncrease.png');
        loadCharacterMetaJSON();
    }

    create()
    {
    	firstInitHealthBar();
	
        parseCharacterMetaJSON();
    	game.scene.run(currentLevelID);
	if (currentLevelID == 'titleScreen' || currentLevelID == 'endScreen')
	{
		userIntThis.scene.sendToBack('controller');	
	}
	else
	{
		userIntThis.scene.bringToTop('controller');
	}
		
    }

    update()
    {
    	
    }
}

function commonPreload()
{
	//load map
	createThis.load.tilemapTiledJSON(currentLevelID + 'Tilemap', 'assets/'+ currentLevelID + '.json');

	//load dialogue
	currentLevelDialogueJSON = 'stages/dialogue/' + currentLevelID + '.json';
	loadLevelDialogue();
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
    background = createThis.add.image(1024, 576, backgroundLayer0);
    background.setOrigin(1,1);
    background.scrollFactorX = 0;
    background.scrollFactorY = 0;
    background.setDepth(-100);

    //Draw tileset/objects
    var tileset = createThis.map.addTilesetImage("tilesheet-extruded", "tiles", 64, 64, 1, 2);
    var mapLayerBG = createThis.map.createStaticLayer("Layer_bg", tileset, 0, 0);
    mapLayer = createThis.map.createStaticLayer("Layer", tileset, 0, 0);
    mapLayer.setDepth(-40);
    mapLayerBG.setDepth(-50);


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
    	createThis.cameras.main.startFollow(player, false, 0.05, 0.03);
    } else {
        playerOffset = createThis.physics.add.sprite(playerSpawnPoint.x + playerShipOffsetX, playerSpawnPoint.y, playerSprite);
        createThis.cameras.main.startFollow(playerOffset, true, 0.5, 0.5);
        playerOffset.alpha = 0; 
        playerOffset.allowGravity = 0; 
    }
    createThis.cameras.main.setBounds(0, 0, createThis.map.widthInPixels, createThis.map.heightInPixels);

    if (playerShip) {
        player.body.allowGravity = false;
    }

    parseLevelDialogue();
    parseHealthBar();

    spawnObjects();

    playerAlive = true;
}

function callUpdateFuncs()
{
	//Use the appropriate movement function for the level. 
    playerMovement();
    
    //Enemy Movement
    enemyMovement();
     
    playerCheckForFall(); 

    portalUpdate();
    
    if (dialogueActive) {
        playerCheckDialogueWalkAway(); 
    }
    
}

function shipUpdate()
{
	if (playerAlive)
	{
		playerShipMovement();
	}
	else
	{
		playerShipSink();
	}

	playerOffset.x = player.x + playerShipOffsetX; 
    playerOffset.y = player.y;

	playerCheckForFall();
}

function changeLevel(tempNewLevelID) {
	var oldLevelID = currentLevelID;
	if(playerShip)
	{
		playerShip = false;
	}
	if (tempNewLevelID == 'titleScreen' || tempNewLevelID == 'endScreen')
	{
		userIntThis.scene.sendToBack('controller');	
	}
	else
	{
		userIntThis.scene.bringToTop('controller');
	}
    game.scene.run(tempNewLevelID);
    game.scene.stop(oldLevelID);
}

var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
        width: 1024,
        height: 576
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 900}, 
            debug: false
        }
    },
    scene: [controller, titleScreen, argoLanding, roadToColchis, marketplace, palace, shrine, shrineForest,
    		colchisFields, riverCrossing, gardenEntrance, gardenForest, gardenDungeon, gardenFleece, 
            placeholdertestmap, endCutscene, siren]
};

var game = new Phaser.Game(config);
