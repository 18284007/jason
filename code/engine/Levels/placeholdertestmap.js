class placeholdertestmap extends Phaser.Scene{

    constructor()
    {
        super({key: 'placeholdertestmap', active: false });
    }

    preload()
    {
        createThis = this;
        currentLevelID = 'placeholdertestmap';
        commonPreload();
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