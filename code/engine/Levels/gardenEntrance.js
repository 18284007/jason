class gardenEntrance extends Phaser.Scene{

    constructor()
	{
        super({key: 'gardenEntrance', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'gardenEntrance';
        this.load.tilemapTiledJSON('gardenEntranceTilemap', 'assets/gardenEntrance.json');
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