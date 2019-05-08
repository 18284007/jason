class gardenDungeon extends Phaser.Scene{

    constructor()
	{
        super({key: 'gardenDungeon', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'gardenDungeon';
        this.load.tilemapTiledJSON('gardenDungeonTilemap', 'assets/gardenDungeon.json');
	}

	create()
	{

        loadMap();
        /*
        portalSpawnPoint = this.map.findObject("Objects", obj => obj.name === "portal");
        if (portalSpawnPoint !== null) {
            portal = this.physics.add.sprite(portalSpawnPoint.x, portalSpawnPoint.y, 'portalSprite');
            portal.body.allowGravity = false;
            portal.setDepth(-10);
            portalMap = portalSpawnPoint.properties[0].value; 
        }
        */
    }

    update()
    {
        callUpdateFuncs();
    }
}