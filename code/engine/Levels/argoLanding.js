var newGraphics;


class argoLanding extends Phaser.Scene{

    constructor()
	{
        super({key: 'argoLanding', active: false });
	}

	preload()
	{
        
        createThis = this;
        currentLevelID = 'argoLanding';
        commonPreload();
        
	}

	create()
	{

        loadMap();
        
        
		this.crew01SpawnPoint = this.map.findObject("Objects", obj => obj.name === "crew01");
        
        if (this.crew01SpawnPoint !== null) {
            this.crew01 = this.physics.add.sprite(this.crew01SpawnPoint.x, this.crew01SpawnPoint.y, 'jason');
            this.physics.add.collider(this.crew01, mapLayer);
        }
        
        
        this.crew02SpawnPoint = this.map.findObject("Objects", obj => obj.name === "crew02");
        if (this.crew02SpawnPoint !== null) {
            this.crew02 = this.physics.add.sprite(this.crew02SpawnPoint.x, this.crew02SpawnPoint.y, 'jason');
            this.physics.add.collider(this.crew02, mapLayer);
        }

        this.bonfireSpawnPoint = this.map.findObject("Objects", obj => obj.name === "bonfire");
        if (this.bonfireSpawnPoint !== null) {
            this.bonfire = this.physics.add.sprite(this.bonfireSpawnPoint.x, this.bonfireSpawnPoint.y, 'bonfireSprite');
            this.physics.add.collider(this.bonfire, mapLayer);
        }
        
    }

    update()
    {
        callUpdateFuncs();
    }
}