class palace extends Phaser.Scene{

    constructor()
	{
        super({key: 'palace', active: false });
	}

	preload()
	{
        createThis = this;
        currentLevelID = 'palace';
        this.load.tilemapTiledJSON('palaceTilemap', 'assets/palace.json');
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