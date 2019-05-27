var enemyCount;
var enemies;

function spawnObjects() {
    //Arrays that store appropriate objects and a corresponding counter.
    enemies = []; //Enemy array
    enemyCount = 0; //Enemy counter
    portals = []; //Portal array
    portalCount = 0; //Portal counter
    npcs = []; //NPC array
    npcCount = 0; //NPC counter
    items = []; //Item array
    itemCount = 0; //Items counter

    activeBosses = 0; 

    /* Run through the list of objects in the map and spawn the appropriate object. 
     * Object properties (xMove, yMove) and co-ordinates (x, y) are used.  
     */
    mapObjectArray = createThis.map.objects[0].objects;
    for (i = 0; i < mapObjectArray.length; i++){
        //if item not in picked up array for level 
        //if item's levelPhase == 0 || levelPhase == currentLevelPhase

        /* Reads the properties of the current object and copies them to tempProperties. 
         * This allows a property to be addressed by name (e.g. tempProperties['xMove']) rather than by position. 
         */
        tempProperties = []; 
        if (typeof mapObjectArray[i].properties !== 'undefined') {
            for (j = 0; j < mapObjectArray[i].properties.length; j++) {
                tempProperties[mapObjectArray[i].properties[j].name] = mapObjectArray[i].properties[j].value;
            } 
        }

        //Spawn the appropriate object based on the object name. 
        switch (mapObjectArray[i].name){
            case 'spiderMini': 
                enemies[enemyCount] = new spiderMini({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    xMove: tempProperties['xMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                break; 

            case 'Player Spawn':
                break; 

            case 'medea': 
                npcs[npcCount] = new medeaNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    dialogueKey: tempProperties['dialogueKey'] + levelProgress
                });
                npcCount++; 
                break;

            case 'artemis': 
                npcs[npcCount] = new artemisNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    dialogueKey: tempProperties['dialogueKey'] + levelProgress
                });
                npcCount++; 
                break;

            case 'dogs': 
                npcs[npcCount] = new artemisDogNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    dialogueKey: tempProperties['dialogueKey'] + levelProgress
                });
                npcCount++; 
                break;

            case 'ritualItem': 
                items[itemCount] = new ritualItemFind({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    inventoryKey: tempProperties['inventoryKey']
                });
                itemCount++; 
                break;

            case 'ritualFire': 
                ritualFireObject = new ritualFire({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                });
                break;

            case 'kingAetios': 
                npcs[npcCount] = new kingAetiosNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    dialogueKey: tempProperties['dialogueKey'] + levelProgress
                });
                npcCount++; 
                break;

            case 'Oileus': 
                npcs[npcCount] = new oileusNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    dialogueKey: tempProperties['dialogueKey'] + levelProgress
                });
                npcCount++; 
                break;

            case 'Iphiclus': 
                npcs[npcCount] = new iphiclusNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    dialogueKey: tempProperties['dialogueKey'] + levelProgress
                });
                npcCount++; 
                break;
                
            case 'spiderBoss': 
                enemies[enemyCount] = new spiderBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    yMove: tempProperties['yMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                spiderBossActive = false; 
                break;

            case 'fox': 
                enemies[enemyCount] = new fox({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    xMove: tempProperties['xMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'snake': 
                enemies[enemyCount] = new snake({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    xMove: tempProperties['xMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'bats': 
                enemies[enemyCount] = new bats({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y,
                    xMove: tempProperties['xMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'bullBoss': 
                enemies[enemyCount] = new bullBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'medusaBoss': 
                enemies[enemyCount] = new medusaBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'minotaurBoss': 
                enemies[enemyCount] = new minotaurBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'dragonBoss': 
                enemies[enemyCount] = new dragonBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    xMove: tempProperties['xMove'],
                    yMove: tempProperties['yMove'],
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'spiderFlower': 
                spiderFlower = new spiderFlowerItem({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y
                });
                spiderFlowerPickedUp = false; 
                break;

            case 'healthItem': 
                items[itemCount] = new healthItem({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y
                });
                itemCount++; 
                break;

            case 'damageIncreaseItem': 
                items[itemCount] = new damageIncreaseItem({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y
                });
                itemCount++; 
                break;

            case 'maxHealthItem': 
                items[itemCount] = new maxHealthItem({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y
                });
                itemCount++; 
                break;

            case 'crew': 
                crew = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'tempEnemy');
                createThis.physics.add.collider(crew, mapLayer);
                break;

            case 'bonfire':
                bonfire = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'bonfireSprite');
                createThis.physics.add.collider(bonfire, mapLayer);
                break; 

            case 'portal':
                portals[portalCount] = new portal({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    portalMap: tempProperties['portalMap'],
                    spawnAfterSpiderFlower: tempProperties['spawnAfterSpiderFlower'],
                    spawnAfterBossBattle: tempProperties['spawnAfterBossBattle'],
                    spawnAfterTalkAetios: tempProperties['spawnAfterTalkAetios'],
                    spawnAfterPlow: tempProperties['spawnAfterPlow'],
                    spawnAfterRitual: tempProperties['spawnAfterRitual']
                });
                portalCount++;
                break; 
                
                //SIGNS
				case 'signR2C':
                signR2C = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'signR2CSprite');
                createThis.physics.add.collider(signR2C, mapLayer);
                break; 
				
				case 'signMarket':
                signMarket = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'signMarketSprite');
                createThis.physics.add.collider(signMarket, mapLayer);
                break; 
				
				case 'signShrine':
                signShrine = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'signShrineSprite');
                createThis.physics.add.collider(signShrine, mapLayer);
                break; 
				
				case 'signShrineForest':
                signShrineForest = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'signShrineForestSprite');
                createThis.physics.add.collider(signShrineForest, mapLayer);
                break; 
				
				case 'signPalace':
                signPalace = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'signPalaceSprite');
                createThis.physics.add.collider(signPalace, mapLayer);
                break; 
				
				case 'signColchisFields':
                signColchisFields = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'signColchisFieldsSprite');
                createThis.physics.add.collider(signColchisFields, mapLayer);
                break; 
				
				case 'signRiverCrossing':
                signRiverCrossing = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'signRiverCrossingSprite');
                createThis.physics.add.collider(signRiverCrossing, mapLayer);
                break; 
				
				case 'signGardenEntrance':
                signGardenEntrance = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'signGardenEntranceSprite');
                createThis.physics.add.collider(signGardenEntrance, mapLayer);
                break; 
				
				case 'signDungeon':
                signDungeon = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'signDungeonSprite');
                createThis.physics.add.collider(signDungeon, mapLayer);
                break; 
				
				case 'signGardenForest':
                signGardenForest = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'signGardenForestSprite');
                createThis.physics.add.collider(signGardenForest, mapLayer);
                break; 
			
			case 'plow':
                plow = new plowItem({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y
                });
                break; 
        }
    }
}
