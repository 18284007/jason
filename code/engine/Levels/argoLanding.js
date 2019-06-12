class argoLanding extends Phaser.Scene {
    constructor() {
        super({key: 'argoLanding', active: false });
    }

    preload() {
        createThis = this;
        currentLevelID = 'argoLanding';
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
