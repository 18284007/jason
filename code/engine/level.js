//temp function
function shrineLoad()
{
	medeaSprite = createThis.load.image('medea', 'assets/NPC/Medea-inface.png');
	createThis.load.image('shrineJason', 'assets/NPC/Jason-Pholder.png');
	createThis.load.image('shrinePortal','assets/items/doorway.png');
}

function spawnObjects() {
	enemies = []; 
    enemyCount = 0; 

    mapObjectArray = createThis.map.objects[0].objects;
    for (i = 0; i < mapObjectArray.length; i++){
        switch (mapObjectArray[i].name){
        	case 'spiderMini': 
                enemies[enemyCount] = new spiderMini({
	                x: mapObjectArray[i].x, 
	                y: mapObjectArray[i].y, 
	                xMove: mapObjectArray[i].properties[0].value,
	                enemyId: enemyCount
            	});
            	enemyCount++; 
            	break; 

            case 'Player Spawn':
            	break; 

            case 'medea': 
            	medea = createThis.physics.add.sprite(mapObjectArray[i].x, mapObjectArray[i].y, 'medeaSprite');
            	createThis.physics.add.collider(medea, mapLayer);
            	break;

            case 'spiderBoss': 
                enemies[enemyCount] = new spiderBoss({
	                x: mapObjectArray[i].x, 
	                y: mapObjectArray[i].y, 
	                yMove: mapObjectArray[i].properties[0].value,
	                enemyId: enemyCount
            	});
            	enemyCount++; 
            	spiderBossActive = false; 
            	break;

            case 'fox': 
                enemies[enemyCount] = new fox({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    //xMove: mapObjectArray[i].properties[0].value,
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'snake': 
                enemies[enemyCount] = new snake({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    //xMove: mapObjectArray[i].properties[0].value,
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'bats': 
                enemies[enemyCount] = new bats({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    //xMove: mapObjectArray[i].properties[0].value,
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'bullBoss': 
                enemies[enemyCount] = new bullBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    //xMove: mapObjectArray[i].properties[0].value,
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'medusaBoss': 
                enemies[enemyCount] = new medusaBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    //xMove: mapObjectArray[i].properties[0].value,
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'minotaurBoss': 
                enemies[enemyCount] = new minotaurBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    //xMove: mapObjectArray[i].properties[0].value,
                    enemyId: enemyCount
                });
                enemyCount++; 
                break;

            case 'dragonBoss': 
                enemies[enemyCount] = new dragonBoss({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y, 
                    xMove: mapObjectArray[i].properties[0].value,
                    yMove: mapObjectArray[i].properties[1].value,
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
                new healthItem({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y
                });
                break;

            case 'damageIncreaseItem': 
                new damageIncreaseItem({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y
                });
                break;

            case 'maxHealthItem': 
                new maxHealthItem({
                    x: mapObjectArray[i].x, 
                    y: mapObjectArray[i].y
                });
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
        		break; 
        }
    }
}
