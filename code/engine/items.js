/* spiderFlower
 * When the player picks up the flower, the spider boss will activate. 
 */

spiderFlowerItem = function (game, x, y){
	Phaser.GameObjects.Sprite(this, game, x, y, 'spiderFlowerSprite');
	this.testvar = 'asdf'; 
	//super(this.x, this.y, 'assets/items/flower.png');
}
spiderFlowerItem.prototype = Object.create(Phaser.GameObjects.Sprite.prototype);
spiderFlowerItem.prototype.constructor = spiderFlowerItem;

/*
class spiderFlower extends Phaser.GameObjects.Sprite {
    constructor(tempX, tempY) {
        super(tempX, tempY, 'assets/items/flower.png'); 
    }
}
*/