class marketplace extends Phaser.Scene{

    constructor()
	{
        super({key: 'marketplace', active: false });
	}

	preload()
	{
        createThis = this;
        this.load.tilemapTiledJSON('marketplaceTilemap', 'assets/marketplace.json');
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