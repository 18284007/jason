var dialogue; //Array containing dialogue strings. This is created from JSON file in parseLevelDialogue();. 
var dialogueMax; //What is the maximum line in a dialogue entry being read? 
var currentDialogue = 0; //What is the current line in a dialogue entry being read?
var sceneNumber = 0; 

var dialoguex; //Position where player engages with dialogue box. Used for calculating if player walks away .
var dialogueWalkAway = 100; //Distance that player must walk away for dialogue box to disappear. 
var dialogueAlreadyEngaged = false; //Is the user holding down the talk key?
var dialogueActive = false; //Is dialogue on screen?

/* Reads the level dialogue from an external JSON file. 
 * This is currently non-functional. 
 */
function loadLevelDialogue() { 
	createThis.load.json('levelJSON', currentLevelDialogueJSON);
}

function parseLevelDialogue() {
	levelJSON = createThis.cache.json.get('levelJSON');
	dialogue = levelJSON.dialogue;
	dialogueMax = dialogue.length - 1;
}

/*function shrineGroup()
{
	createThis.shrineItems.add.group(
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
	Phaser.Actions.call(createThis.shrineItems.getChildren(), function(sitem){}, createThis);
	
	sitem.setInteractive();

	sitem.on('pointerdown', function()
	{
		if (item.texture.key === 'medea')
		{
			talkMedea = createThis.add.text(160,550,'Talk',{color: '#ff00ff'});
		}
		else if (item.texture.key === 'shrineJason')
		{
			//do something else
		}
	});
}

function shrineText()
{
	talkMedea.setText(debug);
}

*/