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
                    dialogueKey: tempProperties['dialogueKey']
                });
                npcCount++; 
                break;

            case 'kingAetios': 
                npcs[npcCount] = new kingAetiosNPC({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    dialogueKey: tempProperties['dialogueKey']
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
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'snake': 
                enemies[enemyCount] = new snake({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'bats': 
                enemies[enemyCount] = new bats({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
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
                crew = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'jason');
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
                    portalMap: tempProperties['portalMap']
                });
                portalCount++;
                break; 
        }
    }
}
