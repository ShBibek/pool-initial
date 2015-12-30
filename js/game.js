var parent = document.getElementsByTagName("body")[0];
var gameWindow1 = new GameWindow(parent);
//this function will be replaced by dragging stick soon
function rotate(){
	var ballRadius=12;
	var posX = gameWindow1.bg.board.ballsArray[0].posX;
	var posY = gameWindow1.bg.board.ballsArray[0].posY;
	gameWindow1.bg.board.stick.rotate(posX,posY,ballRadius);
}
function  placeStick(){
	gameWindow1.bg.board.stick.placeStick(gameWindow1.bg.board.ballsArray[0].posX,gameWindow1.bg.board.ballsArray[0].posY);
	rotate();	
}
function writeBoard(displayContents){
	gameWindow1.bg.scoreBoard.assignValue(displayContents);
}
var buttonClicked = false;
var powerLevel = 0; //signifies the power value of button
var moveBalls = false;
var powerFlag = true;
var stickFlag = false; //stick unmoved
var whiteBallFlag = false; //ball is not moved
var ballMoverFlag = false;
var ruleFlag = false; //rule test condition is false

var mainInterval = function(){
	if(powerFlag == true){
		gameWindow1.bg.power.powerMover(); //continue power moving animation
	}
	if(stickFlag == true){
		whiteBallFlag  = gameWindow1.bg.board.stick.move(powerLevel/4); 
		ruleFlag = false;

	}
	if(whiteBallFlag  == true){
		stickFlag = false;
		gameWindow1.bg.board.ballsArray[0].velocityStarter(gameWindow1.bg.board.stick.rotatedX,gameWindow1.bg.board.stick.rotatedY,powerLevel); //white ball velocity started
		moveBalls = true;
		whiteBallFlag  = false;
		ballMoverFlag = true; 
	}
	if(ballMoverFlag == true){
		console.log("ball moving");
		gameWindow1.bg.board.ballMover();
		ruleFlag =  !(gameWindow1.bg.board.velProfile()); //true if ball is moving;
		
	}
	if(ruleFlag == true){
		ballMoverFlag = false;
		ruleFlag = false;
		powerFlag = true;
		writeBoard(gameWindow1.gameRule.ruleTest(gameWindow1.bg.board.ballsArray,gameWindow1.players,gameWindow1.bg.board.ballsArray[0].firstCollide));
		buttonClicked= false;
		gameWindow1.bg.board.ballsArray[0].reset();
	}
	        	
}
gameWindow1.bg.power.button.onclick = (function(){
		if(buttonClicked == false){
			buttonClicked = true;
			powerLevel = gameWindow1.bg.power.powerLevel/20;
			powerFlag = false;
			stickFlag = true;
		}
	})
var mainIntervalId = setInterval(mainInterval,10);

