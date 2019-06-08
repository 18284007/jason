/*variables relating to user controls*/
var cursors;
var attackKey;
var jumpKey;
var talkKey;
var pauseKey;
/*variables relating to the players character*/
var player;
/*variables relating to map generation*/
var mapLayer;
var createThis;
var userIntThis;
var currentLevelDialogueJSON;
var levelProgress = 1;
var music;
var musicMuted = false;
var musicPlaying = false;
//var currentLevelID;
/*variables relating to moving between levels*/
var portalMap;

var backgroundLayer0;
var backgroundLayer1;

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
        this.load.spritesheet('medeaSprite','assets/NPC/medea.png', 
           { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('jason','assets/player/jason.png', 
           { frameWidth: 76, frameHeight: 64 });
	this.load.spritesheet('kingSprite','assets/NPC/king.png', 
           { frameWidth: 40, frameHeight: 64 });

        //portal
        this.load.image('portalSprite','assets/items/portal.png');
	//music
        this.load.audio('female', ['assets/stage/background/female.mp3']);
        this.load.audio('water', ['assets/stage/background/water.mp3']);
        this.load.audio('male',['assets/stage/background/male.mp3']);
	   this.load.audio('upbeat', ['assets/stage/background/upbeat.mp3']);
       this.load.audio('jasonIntro', ['assets/stage/background/jasonIntro.mp3']);
        //other/Placeholders (may move/remove later)
        this.load.spritesheet('tempEnemy','assets/enemy/eviljason.png', 
           { frameWidth: 48, frameHeight: 48 });
	this.load.image('artemisSprite','assets/NPC/artemis.png');
        this.load.image('bonfireSprite','assets/bonfire.png');
	this.load.image('fireballSprite','assets/fireball.png');
        this.load.image('spiderBossSprite','assets/enemy/spiderBoss.png');
        this.load.image('spiderBossWebSprite','assets/enemy/spiderBossWeb.png');
        //medusaBoss
        this.load.image('medusaBossSprite','assets/enemy/medusaBoss.png');
        //bullBoss
        this.load.image('bullBossSprite','assets/enemy/bullBoss.png');
        //Items (must be constantly loaded for inventory)
        this.load.image('spiderFlowerSprite', 'assets/items/flower.png');
        this.load.image('thoughtBubbleSprite', 'assets/npc/thought.png');

        //LEVEL STUFF
        //Environment sprites - PLACEHOLDERS.
        this.load.image('bgSky', 'assets/background/sky.png');
        this.load.image('bgClouds', 'assets/background/clouds.png');
        this.load.image('bgDungeon', 'assets/background/dungeon.png');
        this.load.image('bgForest', 'assets/background/forest.png');
        this.load.image('bgMarket', 'assets/background/market.png');
        this.load.image("tiles", "assets/tilesheet-extruded.png");
        this.load.image('plowSprite','assets/items/plow.png');
        this.load.image('maxHealthItemSprite', 'assets/items/maxHealth.png');
        this.load.image('healthItemSprite', 'assets/items/health.png');
        this.load.image('damageIncreaseItemSprite', 'assets/items/damageIncrease.png');

        //Pause
        this.load.image('resumebut', 'assets/stage/background/resumebut.png');
        this.load.image('pausebg', 'assets/stage/background/pausebg.png');
        this.load.image('mapMenu', 'assets/stage/background/mapMenu.png');
        this.load.image('mutebtn', 'assets/stage/background/mutebtn.png');  
	    
	//SIGNS
	this.load.image('signR2CSprite','assets/items/signR2C.png');
	this.load.image('signMarketSprite','assets/items/signMarket.png');
	this.load.image('signShrineSprite','assets/items/signShrine.png');
	this.load.image('signShrineForestSprite','assets/items/signShrineForest.png');
	this.load.image('signPalaceSprite','assets/items/signPalace.png');
	this.load.image('signColchisFieldsSprite','assets/items/signColchisFields.png');
	this.load.image('signRiverCrossingSprite','assets/items/signRiverCrossing.png');
	this.load.image('signGardenEntranceSprite','assets/items/signGardenEntrance.png');
	this.load.image('signDungeonSprite','assets/items/signDungeon.png');
	this.load.image('signGardenForestSprite','assets/items/signGardenForest.png');
        loadCharacterMetaJSON();
    }

    create()
    {
    	firstInitHealthBar();
	pauseKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
	initDialogueBox();
        parseCharacterMetaJSON();

    	game.scene.run(currentLevelID);
	if (['endScreen','titleScreen','mapMenu','introCutscene'].includes(currentLevelID))
	{
		userIntThis.scene.sendToBack('controller');	
	}
	else
	{
		userIntThis.scene.bringToTop('controller');
	}

        this.ritualItemText = userIntThis.add.text(800, 50, '0/x Ritual Items', undefined);
        this.ritualItemText.alpha = 0; 

    }

    update()
    {
	if (pauseKey.isDown) {
				
	game.scene.run('pause');
	}
	/*Music*/
        if(!musicPlaying)
        {
             if (['endScreen','titleScreen','mapMenu'].includes(currentLevelID))
            {
                music = this.sound.add('water', {loop: true});
                music.play();
                music.setVolume(1);
            }else if(['colchisFields','gardenFleece'].includes(currentLevelID))
            {
            	music = this.sound.add('male', {loop: true})
                music.play();
                music.setVolume(0.8);
            }else if(['siren'].includes(currentLevelID))
            {
                music = this.sound.add('upbeat', {loop: true})
                music.play();
                music.setVolume(1);
            }else if(['introCutscene'].includes(currentLevelID))
            {
                music = this.sound.add('jasonIntro', {loop: true})
                music.play();
                music.setVolume(1);
            }else
            {
                music = this.sound.add('female', {loop: true});
                music.play();
                music.setVolume(0.8);
            }
            musicPlaying = true;
        }
	
    }

    updateRitualItemText() {
        var tempCount = 0; 
        for (i = 0; i < ritualItemCount; i++){
            tempCount += (1 * inventory[i]);
        } 
        
        //Update the text. 
        if (tempCount != ritualItemCount){
            userIntThis.ritualItemText.setText(tempCount + '/' + ritualItemCount + " Ritual Items.");
            userIntThis.ritualItemText.alpha = 1; 
        } else {
            userIntThis.ritualItemText.alpha = 0;
            if (levelProgress === 4)
            {
                levelProgress++;
            } 
        }
    }

    updateSkeletonText() {
        //Update the text.
        //Variable Re-use
        userIntThis.ritualItemText.setText(skelesRemain  + " skeletons remain");
        userIntThis.ritualItemText.alpha = 1;

    }
}

function commonPreload()
{
	//load map
	createThis.load.tilemapTiledJSON(currentLevelID + 'Tilemap', 'assets/'+ currentLevelID + '.json');

	//load dialogue
	currentLevelDialogueJSON = 'stages/dialogue/' + currentLevelID + '.json';
	loadLevelDialogue();

    for (j = 0; j < inventory.length; j++) {
        resetInventory[j] = (inventory[j]);
    }
}

function loadMap()
{
    destroyOldObjects();
    createThis.physics.world.TILE_BIAS = 64; 

	var currentTilemapKey = currentLevelID + 'Tilemap';

    createThis.map = createThis.make.tilemap({ key: currentTilemapKey });
    
    //set Boundary
    //boundaryEdge = createThis.map.findObject("Objects", obj => obj.name === "farBoundary");
    gameWidth = createThis.map.widthInPixels;
    gameHeight = createThis.map.heightInPixels;
    createThis.physics.world.setBounds(0, 0, gameWidth + (200 * playerShip), gameHeight, 64, true, true, false, false);

    //Render background. 
    //bganchor = createThis.map.findObject("Objects", obj => obj.name === "bganchor");
    background = createThis.add.image(1024, 576, backgroundLayer0);
    background.setOrigin(1,1);
    background.scrollFactorX = 0;
    background.scrollFactorY = 0;
    background.setDepth(-100);

    if (backgroundLayer0 == 'bgSky') {
        backgroundClouds = createThis.add.image(0, 576, 'bgClouds');
        backgroundClouds.setOrigin(0,1);
        backgroundClouds.scrollFactorX = 0.2;
        backgroundClouds.scrollFactorY = 0;
        backgroundClouds.setDepth(-95);
    }

    if (backgroundLayer1 !== undefined) {
        backgroundLayer1Image = createThis.add.image(0, 576, backgroundLayer1);
        backgroundLayer1Image.setOrigin(0,1);
        backgroundLayer1Image.scrollFactorX = 0.4;
        backgroundLayer1Image.scrollFactorY = 0;
        backgroundLayer1Image.setDepth(-95);
    }

    //Draw tileset/objects
    var tileset = createThis.map.addTilesetImage("tilesheet-extruded", "tiles", 64, 64, 1, 2);
    var mapLayerBG = createThis.map.createStaticLayer("Layer_bg", tileset, 0, 0);
    mapLayer = createThis.map.createStaticLayer("Layer", tileset, 0, 0);
    mapLayer.setDepth(-40);
    mapLayerBG.setDepth(-50);

    //Spawn player.
    var playerSpawnPoint = createThis.map.findObject("Objects", obj => obj.name === "Player Spawn");
    player = createThis.physics.add.sprite(playerSpawnPoint.x, playerSpawnPoint.y, playerSprite);
    player.setCollideWorldBounds(true);
    
    mapLayer.setCollisionByProperty({ collides: true });
    createThis.physics.add.collider(player, mapLayer);

    //Player sprite stuff. 
    createThis.anims.create({
        key: 'jasonRight',
        frames: createThis.anims.generateFrameNumbers('jason', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    createThis.anims.create({
        key: 'jasonAttackRight',
        frames: createThis.anims.generateFrameNumbers('jason', { start: 12, end: 29 }),
        frameRate: 30,
        repeat: -1
    });
    createThis.anims.create({
        key: 'jasonIdleRight',
        frames: createThis.anims.generateFrameNumbers('jason', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });

    createThis.anims.create({
        key: 'medeaIdleRight',
        frames: createThis.anims.generateFrameNumbers('medeaSprite', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });
    createThis.anims.create({
        key: 'medeaWalkRight',
        frames: createThis.anims.generateFrameNumbers('medeaSprite', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });


    //Keyboard input.
    cursors = createThis.input.keyboard.createCursorKeys();
    attackKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    jumpKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    talkKey = createThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    if (playerShip) {
        player.body.allowGravity = false;
    }

    parseLevelDialogue();
    if (currentLevelID != 'endCutscene'){
    	parseHealthBar();
    }

    spawnObjects();

    playerCheckForPortal(); 

    //Camera
    if (!playerShip) {
        createThis.cameras.main.startFollow(player, false, 0.05, 0.03);
    } else {
        playerOffset = createThis.physics.add.sprite(playerSpawnPoint.x + playerShipOffsetX, playerSpawnPoint.y, playerSprite);
        createThis.cameras.main.startFollow(playerOffset, true, 1, 1);
        playerOffset.alpha = 0; 
        playerOffset.allowGravity = 0; 
    }
    createThis.cameras.main.setBounds(0, 0, createThis.map.widthInPixels, createThis.map.heightInPixels);

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

    npcUpdate();
    
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
	oldLevelID = currentLevelID;
	playerShip = false;
    if ((['endScreen','titleScreen','colchisFields', 'gardenFleece','mapMenu','siren','introCutscene'].includes(currentLevelID)) ||
    		(['endScreen','titleScreen','colchisFields', 'gardenFleece','mapMenu','siren','introCutscene'].includes(tempNewLevelID)))
    {
        musicPlaying = false;
        music.stop();
    }
    clearDialogueBox();
    npcDialogue.text = '';
	if (['endScreen','titleScreen','mapMenu','introCutscene'].includes(tempNewLevelID))
	{
		userIntThis.scene.sendToBack('controller');	
	}
	else
	{
		userIntThis.scene.bringToTop('controller');
	}

    backgroundLayer1 = undefined; 
    game.scene.run(tempNewLevelID);
    game.scene.stop(oldLevelID);
}

function destroyOldObjects() {
    for (i = 0; i < enemyCount; i++){
        enemies[i].destroy();
    }
    for (i = 0; i < npcCount; i++){
        npcs[i].destroy();
    }
    for (i = 0; i < portalCount; i++){
        portals[i].destroy();
    }
    for (i = 0; i < itemCount; i++){
        items[i].destroy();
    }
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
            placeholdertestmap, endCutscene, endScreen, siren, pause, mapMenu, introCutscene]
};

var game = new Phaser.Game(config);
