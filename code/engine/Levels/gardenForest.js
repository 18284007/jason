class gardenForest extends Phaser.Scene{

    constructor()
	{
        super({key: 'gardenForest', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'gardenForest';
        this.load.tilemapTiledJSON('gardenForestTilemap', 'assets/gardenForest.json');
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