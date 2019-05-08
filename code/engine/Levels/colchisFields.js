class colchisFields extends Phaser.Scene{

    constructor()
	{
        super({key: 'colchisFields', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'colchisFields';
        this.load.tilemapTiledJSON('colchisFieldsTilemap', 'assets/colchisFields.json');
	}

	create()
	{
        loadMap();
    }

    update()
    {
        callUpdateFuncs();
    }
}