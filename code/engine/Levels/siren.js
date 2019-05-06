export default class sirenScene extends Phaser.Scene
{
	constructor ()
	{

	}

	preload ()
	{
		this.load.image('ship','assets/player/ship.png');
	}

	create ()
	{
		this.scene.start('preload');
	}
}