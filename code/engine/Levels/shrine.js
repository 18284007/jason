class shrine extends Phaser.Scene{

    constructor()
	{
        super({key: 'shrine', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'shrine';
        this.load.tilemapTiledJSON('shrineTilemap', 'assets/shrine.json');
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