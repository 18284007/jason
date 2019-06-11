var healthBar;
var oldHealth;
var healthDif;
var hbX;
var hbY;
var hbWidth;
var hbHeight;
var hbIncrement;
var hbReady;
var intervalVar;

function firstInitHealthBar() {
    hbWidth = userIntThis.sys.game.config.width*0.20;
    hbHeight = userIntThis.sys.game.config.height*0.05;
    hbIncrement = hbWidth/maxHealth;
    hbReady = true;
    oldHealth = maxHealth;
    healthBar = userIntThis.add.graphics();
    healthBar.setDepth(500);
}

function maxHealthUpdate() {
    hbIncrement = hbWidth/maxHealth;    
}

function healthBarReset() {
    oldHealth = maxHealth;
    healthDif = 0;
    if (intervalVar !== undefined) {
        clearInterval(intervalVar);
    }
}

function parseHealthBarAnimate() {
    hbReady = true;
    healthDif = oldHealth - currentHealth;
    if (healthDif != 0) {
        intervalVar = setInterval(oldHealthCtr, 50);
    }
}

function oldHealthCtr() {
    if (healthDif > 0) {
        healthDif--;
        oldHealth--;
    } else if (healthDif < 0) {
        healthDif++;
        oldHealth++;
    } else {
        clearInterval(intervalVar);
    }

    drawHealthBar();
}

function parseHealthBar() {
    if (hbReady) {
        hbReady = false;
        drawHealthBar();
        setTimeout(setHBReady(), 250);
    }
}

function drawHealthBar() {
    healthBar.clear();
    hbX = userIntThis.cameras.main.scrollX + userIntThis.sys.game.config.width*0.775;
    hbY = userIntThis.cameras.main.scrollY + userIntThis.sys.game.config.height*0.0225;
    healthBar.lineStyle(1,0x000000,1);
    healthBar.fillStyle(0xff0000,1);
    healthBar.strokeRect(hbX,hbY,hbWidth,hbHeight);
    
    if (currentHealth > 0) {
        healthBar.fillRect(hbX,hbY,hbIncrement*oldHealth,hbHeight);
    }
}

function setHBReady() {
    hbReady = true;
}
