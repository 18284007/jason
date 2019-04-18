var dialogue; //Array containing dialogue strings. This is created from JSON file in parseLevelDialogue();. 
var dialogueMax; //What is the maximum line in a dialogue entry being read? 
var currentDialogue = 0; //What is the current line in a dialogue entry being read?
var sceneNumber = 0; 

var dialoguex; //Position where player engages with dialogue box. Used for calculating if player walks away .
var dialogueWalkAway = 100; //Distance that player must walk away for dialogue box to disappear. 
var dialogueAlreadyEngaged = false; //Is the user holding down the talk key?
var dialogueActive = false; //Is dialogue on screen?

var dialogBox; //Object to draw dialogue
var drawWidth;//Box width
var drawHeight;//Box Height
var swirlLength; //Style line length
var lineStyleThick; //line thickness
var diaBoxX; //X co-ordinate of dialogue box
var diaBoxY; //Y co-ordinate of dialogue box

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
	dialogBox = createThis.add.graphics();
	npcDialogue = createThis.add.text(0,0,'',{color: '#000000'});
}

function drawDialogueBox()
{
	
	drawWidth = createThis.sys.game.config.width;
	drawHeight = createThis.sys.game.config.height*0.30;
	swirlLength = drawWidth*0.02;
	lineStyleThick = swirlLength/5;
	diaBoxX = createThis.cameras.main.scrollX;
	diaBoxY = createThis.cameras.main.scrollY + createThis.sys.game.config.height*0.70;
	
	//draw outer rectangle
	dialogBox.lineStyle(lineStyleThick,0x000000,1);	
	dialogBox.fillStyle(0xf2edaa,1);
	dialogBox.fillRect(diaBoxX,diaBoxY,drawWidth,drawHeight);
	dialogBox.strokeRect(diaBoxX,diaBoxY,drawWidth,drawHeight);
	
	//styling
	//Top LHS
	dialogBox.beginPath();
	dialogBox.moveTo(diaBoxX+swirlLength,diaBoxY);
	dialogBox.lineTo(diaBoxX+swirlLength,diaBoxY+swirlLength);
	dialogBox.lineTo(diaBoxX+(swirlLength/2),diaBoxY+swirlLength);
	dialogBox.lineTo(diaBoxX+(swirlLength/2),diaBoxY+(swirlLength/2));
	dialogBox.strokePath();

	//Bottom LHS
	dialogBox.beginPath();
	dialogBox.moveTo(diaBoxX+swirlLength,drawHeight+diaBoxY);
	dialogBox.lineTo(diaBoxX+swirlLength,drawHeight+diaBoxY-swirlLength);
	dialogBox.lineTo(diaBoxX+(swirlLength/2),drawHeight+diaBoxY-swirlLength);
	dialogBox.lineTo(diaBoxX+(swirlLength/2),drawHeight+diaBoxY-(swirlLength/2));
	dialogBox.strokePath();

	//Top RHS
	dialogBox.beginPath();
	dialogBox.moveTo(diaBoxX+drawWidth-swirlLength,diaBoxY);
	dialogBox.lineTo(diaBoxX+drawWidth-swirlLength,diaBoxY+swirlLength);
	dialogBox.lineTo(diaBoxX+drawWidth-(swirlLength/2),diaBoxY+swirlLength);
	dialogBox.lineTo(diaBoxX+drawWidth-(swirlLength/2),diaBoxY+(swirlLength/2));
	dialogBox.strokePath();

	//Bottom RHS
	dialogBox.beginPath();
	dialogBox.moveTo(diaBoxX+drawWidth-swirlLength,drawHeight+diaBoxY);
	dialogBox.lineTo(diaBoxX+drawWidth-swirlLength,drawHeight+diaBoxY-swirlLength);
	dialogBox.lineTo(diaBoxX+drawWidth-(swirlLength/2),drawHeight+diaBoxY-swirlLength);
	dialogBox.lineTo(diaBoxX+drawWidth-(swirlLength/2),drawHeight+diaBoxY-(swirlLength/2));
	dialogBox.strokePath();

	//Style Lines
	//Top
	dialogBox.lineBetween(diaBoxX+swirlLength,diaBoxY+(swirlLength/2),diaBoxX+drawWidth-swirlLength,diaBoxY+(swirlLength/2));
	//Bottom
	dialogBox.lineBetween(diaBoxX+swirlLength,diaBoxY+drawHeight-(swirlLength/2),diaBoxX+drawWidth-swirlLength,diaBoxY+drawHeight-(swirlLength/2));
	//Left
	dialogBox.lineBetween(diaBoxX+(swirlLength*0.75),diaBoxY+swirlLength,diaBoxX+(swirlLength*0.75),diaBoxY+drawHeight-swirlLength);
	//Right
	dialogBox.lineBetween(diaBoxX+drawWidth-(swirlLength*0.75),diaBoxY+swirlLength,diaBoxX+drawWidth-(swirlLength*0.75),diaBoxY+drawHeight-swirlLength);
	
	//set text location
	npcDialogue.x = diaBoxX+(swirlLength*1.5);
	npcDialogue.y = diaBoxY+swirlLength;
	dialogBox.setDepth(9);
	npcDialogue.setDepth(10);
}

function clearDialogueBox ()
{
	dialogBox.clear();
}
