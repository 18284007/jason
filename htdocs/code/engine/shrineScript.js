function shrineLoad()
{
	this.load.image('medea', 'assets/NPC/Medea-inface.png');
	this.load.image('shrineJason', 'assets/NPC/Jason-Pholder.png');
	this.load.image('shrinePortal','assets/items/doorway.png');
}


function shrineGroup()
{
	this.shrineItems.add.group(
	{
		key: 'medea',
		setXY:
		{
			x:160
			y:780
		}
	},
	{
		key: 'shrineJason',
		setXY:
		{
			x:290
			y:780
		}
	},
	{
		key: 'shrinePortal',
		setXY:
		{
			x:1630
			y:780
		}
	});
}

//in create
function shrineInteractive()
{
	Phaser.Actions.call(this.shrineItems.getChildren(), function(sitem){}, this);
	
	sitem.setInteractive();

	sitem.on('pointerdown', function()
	{
		if(item.texture.key === 'medea')
		{
			talkMedea = this.add.text(160,550,'Talk',{color: '#ff00ff'});
		}
		else if (item.texture.key === 'shrineJason')
		{
			//do something else
		}
	});
}

function shrineText()
{
	var debug = [
		'I am full of glee that thee has summoned me, come tell me, what is on your mind?'
	];

	talkMedea.setText(debug);
}
