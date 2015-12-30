function Stick(){
	//view property
	var stickView = function(){
    	for(var i=0;i<3;i++){ //loading 3 div for single stick
			var element = document.createElement("div");
			var parentPrimary = document.getElementsByClassName("board")[0];
			var parentSecondary = document.getElementsByClassName("stick")[0];
			if(i == 0){
				addClass(element,"stick");
				appendTo(element,parentPrimary);
				wrp = element; //stick wrapper
				setWrapper();
			}
			else if(i == 1){
				addClass(element,"innerstick");
				appendTo(element,parentSecondary);
				mainStick = element; //mainstick
			}
			else{
				addClass(element,"stick-arrow");
				appendTo(element,parentSecondary);
				arrow = element; //pointer of stick
				setPointer();
			}
    	}
  	}
  	var appendTo = function(element,parentElement){
    	parentElement.appendChild(element);
  	}
  	var addClass = function(element,className){
    	element.setAttribute("class", 
    	element.getAttribute("class") + " " + className);
  	}
  	var testVisibility = function(){
    	if(that.hiddenFlag == true){
      		wrp.style.visibility = "hidden";
	   	}
    	else{
      		wrp.style.visibility = "visible";
    	}
  	} 
  	var display = function(){
    	wrp.style.left = that.posX + "px";
    	wrp.style.top = that.posY + "px"; 
	}
  	var displayMove = function(){
    	mainStick.style.marginLeft = that.stickMargin + "px";
  	}
	var angleRotate = function(angle){
    	wrp.style.transform = "rotate("+angle+"deg)";
    	wrp.style.MozTransform="rotate("+angle+"deg)";
    	wrp.style.WebkitTransform="rotate("+angle+"deg)";
    	wrp.style.OTransform="rotate("+angle+"deg)";
    	wrp.style.MsTransform="rotate("+angle+"deg)";
	}
  	var setPointer = function(){
    	arrow.style.width = arrowlength + "px";
    	arrow.style.marginRight = arrowMargin + "px";
  	}
  	var setWrapper = function(){
    	wrp.style.width = wrpLength+"px";
  	}
  	var wrp; //stick wraper
  	var mainStick; //main stick in view
  	var arrow; //arrow of stick

	//model
	var that = this;
	var lengthFactor = 0.3; //% stickArrow
	var mainLength = 383; //main stick length;
	var widthFactor = 12; //widht of stick to be entered in center
	var wrpLength = mainLength*2+8*widthFactor; //length of stickWrp
	var heightValue = 12; //height of stick
	var arrowlength = mainLength*lengthFactor+3*widthFactor; //lenght of pointe
	var arrowMargin = (1-lengthFactor)*mainLength;

	this.posX; //original reference position
	this.posY;
	this.rotatedX;
	this.rotatedY;//dx and dy position
	this.angle = 0; //angle of rotation
	this.stickMargin = 0; //inner stick left margin
	this.hiddenFlag = false;  //if it is hidden or not;

	//function that moves main stick
	this.move = function(factor){
		that.stickMargin += 1*factor;
		displayMove(); // view property
		if(that.stickMargin >= 3*widthFactor){
			that.stickMargin = 0;
			displayMove();
			return true; //end point reached
		}
		else{
			return false;
		}
	}
	this.hide = function(){
		that.hiddenFlag = true;
		testVisibility(); //view property
	}
	this.showStick = function(){
		that.hiddenFlag = false;
		testVisibility(); //view property;
	}
	this.initialise = function(x,y){
		that.posX = x;
		that.posY = y;
		display();
	}
	this.rotate = function(ballX,ballY,ballRadius){
		that.angle += 10;
		that.rotatedX = (ballX+ballRadius)+250*Math.cos(Math.PI/180*(180-that.angle));
		that.rotatedY = (ballY+ballRadius)-250*Math.sin(Math.PI/180*(180-that.angle));
		angleRotate(that.angle);
	}
	//placing with reference to white ball; white ball array given;
	this.placeStick = function(x,y){
		var newX = x+widthFactor-wrpLength/2;
		var newY = y+widthFactor-heightValue/2;
		that.initialise(newX,newY);
	}
	stickView(); //view property
}