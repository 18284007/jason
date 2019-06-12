class gardenEntrance extends Phaser.Scene {
    constructor() {
        super({key: 'gardenEntrance', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'gardenEntrance';
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