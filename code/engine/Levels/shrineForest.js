class shrineForest extends Phaser.Scene{

    constructor()
    {
        super({key: 'shrineForest', active: false });
    }

    preload()
    {
        createThis = this;
        currentLevelID = 'shrineForest';
        commonPreload();

        //spiderBoss
        //this.load.image('spiderBossSprite','assets/enemy/spiderBoss.png');
        //this.load.image('spiderBossWebSprite','assets/enemy/spiderBossWeb.png');

        
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