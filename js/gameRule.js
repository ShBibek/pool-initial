function Rule(){
	var winnerFlag;
	var foulFlag = false;
	var successFlag = false; //ball scored without foul
	var blackEntered = false;

	var foulTouch = function(player,firstTouch){ //testing foul touch 
		if(firstTouch == 0 || firstTouch == 15){ //if first touch nothing or black
			foulFlag=true;
		}
		//touching the opponents ball //in case ball is assigned
		else if( (firstTouch%2 != player.ballCatageory) && (player.ballCatageory != 2) ){
			foulFlag = true;
		}
		else{}
	}
	//no. of remaining balls of each player
	var ballCounter = function(currentPlayer,ballArray){
		var countValues = [0,0];
		if(currentPlayer.ballCatageory != 2){
			for(var i = 1; i < ballArray.length-1 ; i++ ){ //excluding black ball
				if(ballArray[i].identity%2 == currentPlayer.ballCatageory){
				countValues[0] += 1;
				}
				else{
					countValues[1] += 1;
				}
			}
		}
		return countValues;
	}
	//assigning Ball types to players
	var assignBall = function(currentPlayer,nextPlayer,ballArray){
		var count1 = 0,count2 = 0;
		if(ballArray[0].deadFlag == true){
			ballArray[0].reposition(); //repositioning white ball
			foulFlag = true;
		}
		for(var i=1;i<ballArray.length-1;i++){
			if(ballArray[i].identity%2 == 0 && ballArray[i].deadFlag == true){
				count1++;
			}
			if(ballArray[i].identity%2 != 0 && ballArray[i].deadFlag == true){
				count2++;
			}
		}
		if(foulFlag == false){
			if(count1 >=1 && count2 == 0){
				currentPlayer.ballCatageory = 0;
				nextPlayer.ballCatageory = 1;
			}
			if(count2 >=1 && count1 == 0){
				currentPlayer.ballCatageory = 1;
				nextPlayer.ballCatageory = 0;
			}
		}
	}
	//test if ball is entered
	var checkBallEntry = function(player,ballArray){
		var temp = player.ballCatageory;
		if(ballArray[0].deadFlag == true){
			ballArray[0].reposition();
			foulFlag = true;
		}
		for(var i=1;i<ballArray.length;i++){
			if(ballArray[i].deadFlag == true){
				if(ballArray[i].identity == 15){
					blackEntered = true;
				}
				else if(ballArray[i].identity%2 != player.ballCatageory){ //if opponent ball is scored
					foulFlag = true;
				}
				else{
					successFlag = true; //own ball entered
				}
				ballArray.splice(i,1); //remove the ball from array
				i--;
			}
		}
	}
	var assignToPlayer = function(player,activeStatus,hitLeft,ballCount){
		player.hitRemaining=hitLeft;
		player.activeStatus=activeStatus;
		player.ballsLeft=ballCount;
	}
	//game rule; first touch -> white ball first touched
	this.ruleTest = function(ballArray,players,firstTouch){
		var currentPlayer;
		var nextPlayer;
		var counter;
		var counterChanged;

		if(players[0].activeStatus == true){
			currentPlayer = players[0];
			nextPlayer = players[1];
		}
		else{
			currentPlayer = players[1];
			nextPlayer = players[0];
		}
		foulTouch(currentPlayer,firstTouch); //test for foul touch
		if(currentPlayer.ballCatageory == 2){ //if ball is not assigned
			assignBall(currentPlayer,nextPlayer,ballArray);
		}
		checkBallEntry(currentPlayer,ballArray); //check if ball is entered;
		counter = ballCounter(currentPlayer,ballArray); //count the number of balls

		if(currentPlayer.ballCatageory == 2){
			counter = ["pending","pending"]; //will remain 0 if ball not assigned so pending
		}


		//check if game is over
		if(blackEntered == true){
			if(currentPlayer.ballCatageory !=2 && foulFlag != true && currentPlayer.ballsLeft == 0){
				alert(currentPlayer.identity + "won the game");
			}
			else{
				alert(nextPlayer.identity+ "won the game");
			}
		}

		//finally at the end
		if(foulFlag == true){
			assignToPlayer(currentPlayer,false,0,counter[0]);
			var hitLeft = 2;
			assignToPlayer(nextPlayer,true,hitLeft,counter[1]);
			alert("FOUL");
		}
		else if(foulFlag == false && (currentPlayer.hitRemaining == 2 || successFlag == true)){ //same player is offered another hit
			assignToPlayer(currentPlayer,true,1,counter[0]);	
			assignToPlayer(nextPlayer,false,0,counter[1]);
			alert("SAME PLAYER NEXT HIT");
		}
		else{ //player changed
			assignToPlayer(currentPlayer,false,0,counter[0]);
			assignToPlayer(nextPlayer,true,1,counter[1]);
			alert("PLAYER CHANGED");
		}


		var playerDetails = ["",players[0].activeStatus,players[0].hitRemaining,players[0].ballCatageory,players[0].ballsLeft,"",players[1].activeStatus,players[1].hitRemaining,players[1].ballCatageory,players[1].ballsLeft];
		foulFlag = false;
		successFlag = false;
		return scoreBoardDecoder(playerDetails);
	}


	var scoreBoardDecoder = function(contents){
		var decodedValue = contents;
		if(contents[1] == true){
			decodedValue[1] = "active";
			decodedValue[6] = "passive";
		}
		if(contents[1] == false){
			decodedValue[1] = "passive";
			decodedValue[6] = "active";
		}
		if(contents[3] == 2){
			decodedValue[3] = "RED + BLUE";
			decodedValue[8] = "RED + BLUE";
		}
		if(contents[3] == 0){
			decodedValue[3] = "BLUE";
			decodedValue[8] = "RED";
		}
		if(contents[3] == 1){
			decodedValue[3] = "RED";
			decodedValue[8] = "BLUE";
		}
		return decodedValue;
	}
}
