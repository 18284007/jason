class shrine extends Phaser.Scene {
    constructor() {
        super({key: 'shrine', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'shrine';
        backgroundLayer0 = 'bgSky';
        commonPreload();
    }

    create() {
        loadMap();
    }

    update() {
        callUpdateFuncs();
    }
}