var healthBar;
const maxHealth = 100;
var currentHealth;
var hbX;
var hbY;
var hbWidth;
var hbHeight;
var hbIncrement;
var hbReady = true;

function parseHealthBarSkipWait()
{
	hbReady = true;
	parseHealthBar();
}

function parseHealthBar()
{
	healthBar = createThis.add.graphics();
	if (hbReady)
	{
		hbReady = false;
		drawHealthBar();
		setTimeout(setHBReady(), 100);
	}
}

function drawHealthBar()
{
	healthBar.clear();
	hbX = createThis.cameras.main.scrollX + createThis.sys.game.config.width*0.70;
	hbY = createThis.cameras.main.scrollY + createThis.sys.game.config.height*0.05;
	hbWidth = createThis.cameras.main.scrollX + createThis.sys.game.config.width*0.25;
	hbHeight = createThis.cameras.main.scrollY + createThis.sys.game.config.height*0.10;
	hbIncrement = hbWidth/maxHealth;
	healthBar.lineStyle(hbY/5,0x000000,1);
	healthBar.fillStyle(ff0000,1);
	if (currentHealth > 0)
	{
		healthBar.fillRect(hbX,hbY,hbIncrement*currenthealth,hbHeight);
	}
	healthBar.strokeRect(hbX,hbY,hbWidth,hbHeight);
	
}

function setHBReady ()
{
	hbReady = true;
}