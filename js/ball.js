function Ball(className){
  	//view section;
	var ballView = function(className){
		var element = document.createElement("div");
		var parentClass = document.getElementsByClassName("board")[0];
		element.setAttribute("class",className);
		parentClass.appendChild(element);
		return element;
	}
	var render=function(){
		that.element.style.left = that.posX + "px";
		that.element.style.top = that.posY + "px";
	}
	var testVisibility = function(){
		if(that.deadFlag == true){
			that.element.style.visibility="hidden";	
		}
		else{
			that.element.style.visibility="visible";
		}
	}
	this.element = ballView(className);

	var meu = 0.03;
	var gravity = 0.098;
	var collisonFactor = 0.95;
	var that = this;
	var color = className;

	this.velX = 0;
	this.velY = 0;
	this.posX;
	this.posY;
	this.radius = 12;
	this.mass = 1;
	this.identity;
	this.velFlag = false;
	this.deadFlag = false;


	//model
	this.initialise = function (x,y,id){
		that.posX=x;
		that.posY=y;
		that.identity=id;
		render(); //view property
	}
	this.move = function(board){
		that.posX += that.velX;
		that.posY += that.velY;
		var resultant = Math.sqrt(Math.pow(that.velX,2)+Math.pow(that.velY,2));
			resultant>0?that.velFlag=true:that.velFlag=false;
		var fricResult = resultant-meu*gravity;
		if(fricResult>0.8){
			that.velX*=(fricResult/resultant);
			that.velY*=(fricResult/resultant);
		}
		else{
			that.velX=0;
			that.velY=0;
		}
		render(); //view property;
	}
	this.makeDead = function(){
		that.velX = 0;
		that.velY = 0;
		that.deadFlag = true;
		that.posX = 10000;
		testVisibility();//view property;
	}
	this.hitTest = function(ball){
		var dCenters = Math.sqrt(Math.pow(this.posX-ball.posX,2) + Math.pow(this.posY-ball.posY,2));
		if(dCenters <= that.radius+ball.radius){
			var normalX = (ball.posX - that.posX) / dCenters; 
			var normalY = (ball.posY - that.posY) / dCenters; 
			var p = 2 * (that.velX * normalX + that.velY * normalY - ball.velX*normalX - ball.velY * normalY) / (that.mass + ball.mass); 
			that.velX = (that.velX  - p * that.mass * normalX)*collisonFactor; 
			that.velY = (that.velY - p * that.mass * normalY)*collisonFactor; 
			ball.velX = (ball.velX + p * ball.mass * normalX)*collisonFactor; 
			ball.velY = (ball.velY + p * ball.mass * normalY)*collisonFactor;
			//moving the circle to prevent overlaping;
			var  midX = (that.posX + ball.posX)/2;
			var midY = (that.posY + ball.posY)/2;
			that.posX = midX + that.radius * (that.posX - ball.posX)/dCenters;
			that.posY = midY + that.radius * (that.posY - ball.posY)/dCenters;
			ball.posX = midX + ball.radius * (ball.posX - that.posX)/dCenters;
			ball.posY = midY + ball.radius * (ball.posY - that.posY)/dCenters;
			//sound.play(); //playing sound during collision
		}
	}
}





