class shrineForest extends Phaser.Scene {
    constructor() {
        super({key: 'shrineForest', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'shrineForest';
        backgroundLayer0 = 'bgSky';
        backgroundLayer1 = 'bgForest';
        commonPreload();
    }

    create() {
        loadMap();
    }

    update() {
        callUpdateFuncs();
    }
}