//Human1
function Human1(game, board, spritesheetWalkLeft, spritesheetWalkRight) {
  //walk back
  this.animationBack = new Animation(spritesheetWalkLeft, 0, 0, 587, 707, 5, 0.1, 10, true);

  //walk front
  this.animationFront = new Animation(spritesheetWalkLeft, 0, 0, 587, 707, 5, 0.1, 10, true);

  //walk left
  this.animationLeft = new Animation(spritesheetWalkLeft, 0, 0, 587, 707, 5, 0.1, 10, true);

  //walk right
  this.animationRight = new Animation(spritesheetWalkRight, 0, 0, 587, 707, 5, 0.1, 10, true);
  
    this.up = false;
    this.down = false;
    this.right = false;
    this.left = false;
    this.space = false;
    this.move = false;
    this.board = board;
    this.nextMove = board.getStart();
    //this.speed = 50;
    this.clocktick = 0;
    this.xPosition = this.nextMove.x - 24;
    this.yPosition = this.nextMove.y - 16;
    this.x = this.xPosition;
    this.y = this.yPosition;
    this.health = 5;
    this.size = 32;
    this.isALive = true;
    console.log("dir: " + this.nextMove.y);
    Entity.call(this, game, this.xPosition, this.yPosition);//position where it start
}

Human1.prototype = new Entity();
Human1.prototype.constructor = Human1;

Human1.prototype.update = function () {
	if(this.clocktick >= GAME_CONSTANT.BLOCK_SIZE) {
	this.clocktick = 0;
	//console.log("movex " + this.yPosition);
	//console.log("x " + this.y);
		this.nextMove = this.board.getNextStep(this.nextMove.x, this.nextMove.y, this.nextMove.nextDir);
		this.xPosition = this.nextMove.x - 64;
	    this.yPosition = this.nextMove.y + 16;
		this.change(this.nextMove.nextDir);
	}
	//movement
	switch(this.nextMove.nextDir) {
	case "u": this.y-= 0.5; break;
	case "d": this.y+= 0.5; break;
	case "l": this.x-=0.5; break;
	case "r": this.x+=0.5; break;
	case "a": break;
	case "e": this.end(); break;
	default: console.log(this.nextMove.nextDir);
}
	this.clocktick += 0.5;
    Entity.prototype.update.call(this);
}

Human1.prototype.end = function() {
	this.isALive = false;
	for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if(ent == this) {
        	
        	this.game.entities[i].removeFromWorld = true;
        	BOARD_CONSTANT.HEALTH -= 1;
            document.getElementById('health').innerHTML = BOARD_CONSTANT.HEALTH;

        	
            break;
        }
    }
}

//a helper method for update on which direction it should face.
Human1.prototype.change = function(dir) {
	switch(dir) {
		case "u": this.up = true; this.down = false; this.left = false; 
			this.right = false; this.space = false; break;
		case "d": this.up = false; this.down = true; this.left = false; 
			this.right = false; this.space = false; break;
		case "l": this.up = false; this.down = false; this.left = true; 
			this.right = false; this.space = false; break;
		case "r": this.up = false; this.down = false; this.left = false; 
			this.right = true; this.space = false; break;
		case "space": this.up = false; this.down = false; this.left = false; 
			this.right = false; this.space = true; break;
		default: console.log("none");
	}
	this.move = true;
}

Human1.prototype.draw = function (ctx) {
	//console.log(this.up);
	if(this.isALive) {
		if (this.up) {
	        this.animationBack.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.06);
	    } else if(this.down) {
	    	this.animationFront.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.06);
	    } else if(this.left) {
	    	this.animationLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.06);
	    } else if(this.right) {
	    	this.animationRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.06);
	    } else if(this.space) {
	    	this.animationBack.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.06);
	    } else {
	        this.animationFront.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.06);
	    }
	}
    Entity.prototype.draw.call(this);
}
