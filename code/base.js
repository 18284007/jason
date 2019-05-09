var playLevel = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
 
    function playLevel()
    {
        Phaser.Scene.call(this, { key: 'playLevel' });
    },

    preload: function() 
    {
        createThis = this; 
        
        loadCharacterMetaJSON(); 

        //currentLevel = 'assets/' + currentLevelID + '.json';
        currentLevelDialogueJSON = 'stages/dialogue/' + currentLevelID + '.json';

        gameLevelList = ['argoLanding', 'roadToColchis', 'marketplace', 'palace', 'riverCrossing', 'gardenEntrance', 'gardenForest', 'gardenDungeon', 'gardenDungeonB', 'gardenFleece', 'siren', 'shrine', 'shrineForest', 'placeholdertestmap']; 
        for (i = 0; i < gameLevelList.length; i++){
            //Load Tilemap 
            this.load.tilemapTiledJSON(
                gameLevelList[i] + 'Tilemap', 
                'assets/' + gameLevelList[i] + '.json');
            //Load Dialogue 
           // loadLevelDialogue(gameLeveLList[i]); 
        }

        //this.load.tilemapTiledJSON("currentLevelTilemap", currentLevel);
        //this.load.tilemapTiledJSON("01Tilemap", 'assets/01.json')

        loadLevelDialogue(); 

        //Player sprites. 
        this.load.spritesheet('jason','assets/player/jason.png', 
           { frameWidth: 48, frameHeight: 48 });
        this.load.image('ship','assets/player/ship.png');

        this.load.image('spiderBossSprite','assets/enemy/spiderBoss.png');
        this.load.image('spiderBossWebSprite','assets/enemy/spiderBossWeb.png');
		
		//medusaBoss
		this.load.image('medusaBossSprite','assets/enemy/medusaBoss.png');

        //01
        this.load.image('bonfireSprite','assets/bonfire.png');

        //shrineScene
        //shrineLoad();
        this.load.image('medeaSprite', 'assets/NPC/Medea-inface.png');
        //this.load.image('shrineJason', 'assets/NPC/Jason-Pholder.png');
        this.load.image('portalSprite','assets/items/portal.png');

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
		
		//end game image
		this.load.image('endbg', 'assets/stage/background/endbg.png');
		this.load.image('menubut', 'assets/stage/background/menubut.png');
    },

    create: function() 
    {
        parseCharacterMetaJSON();

        //Generate current Tilemap key. 
        currentTilemapKey = currentLevelID + 'Tilemap';

        //Map -- fix this
        this.map = this.make.tilemap({ key: currentTilemapKey });
        
        //set Boundary
        boundaryEdge = this.map.findObject("Objects", obj => obj.name === "farBoundary");
        var gameWidth = boundaryEdge.x;
        var gameHeight = boundaryEdge.y;
        if (!playerShip) {
            this.physics.world.setBounds(0, 0, gameWidth, gameHeight, 64, true, true, false, false);
        } else { 
            this.physics.world.setBounds(0, 0, gameWidth + 500, gameHeight, 64, true, true, false, false);
        }

        playerAlive = true; 

        //Render background. 
        bganchor = this.map.findObject("Objects", obj => obj.name === "bganchor");
        var backgroundLayer0 = 'sky';
        background = this.add.image(bganchor.x, bganchor.y, backgroundLayer0);
        background.setOrigin(0.1,1);
        background.scrollFactorX = 0;
        background.setDepth(-100);
        
        //Draw tileset/objects
        tileset = this.map.addTilesetImage("tilesheet-extruded", "tiles", 64, 64, 1, 2);
        mapLayerBG = this.map.createStaticLayer("Layer_bg", tileset, 0, 0);
        mapLayer = this.map.createStaticLayer("Layer", tileset, 0, 0);
        
        //Spawn player.
        playerSpawnPoint = this.map.findObject("Objects", obj => obj.name === "Player Spawn");
        player = this.physics.add.sprite(playerSpawnPoint.x, playerSpawnPoint.y, playerSprite);
        
        //Set Player Boundary
        player.setCollideWorldBounds(true);

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
            this.cameras.main.startFollow(player, false, 0.05, 0.03); //new
            //this.cameras.main.startFollow(player, true, 0.05, 0.03); //old
        } else {
            playerOffset = this.physics.add.sprite(playerSpawnPoint.x + 400, playerSpawnPoint.y, playerSprite);
            this.cameras.main.startFollow(playerOffset, true, 0.05, 0.03);
            playerOffset.alpha = 0; 
            playerOffset.allowGravity = 0; 
        }
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        //If the player is a ship, disable gravity. 
        if (playerShip) {
            player.body.allowGravity = false;
        }

        portalSpawnPoint = this.map.findObject("Objects", obj => obj.name === "portal");
        if (portalSpawnPoint !== null) {
            portal = this.physics.add.sprite(portalSpawnPoint.x, portalSpawnPoint.y, 'portalSprite');
            portal.body.allowGravity = false;
            portal.setDepth(-10);
            portalMap = portalSpawnPoint.properties[0].value; 
        } else if (playerShip) {
            edgeMap = this.map.properties[0].value;
        }

        parseLevelDialogue();
        initHealthBar();

        spawnObjects(); 
    },

    update: function() 
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

        if (typeof medea != 'undefined') {
            if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), medea.getBounds())) {
                playerNPCCollision();
            } else if (dialogueActive) {
                playerCheckDialogueWalkAway(); 
            }
        }
        
        parseHealthBar();
    }
})

function changeLevel(tempNewLevelID) {
    currentLevelID = tempNewLevelID;
    createThis.scene.restart('playLevel');
}

var config = {
    type: Phaser.AUTO,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
        width: 1024,
        height: 576
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800}, 
            debug: false
        }
    },
    /*scene: {
        preload: preload,
        create: create,
        update: update
    },*/
    //scene: [levelSelect, playLevel]
    scene: playLevel
};

var game = new Phaser.Game(config);
