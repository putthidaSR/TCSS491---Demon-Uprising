function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

//Human
function Human(game, board, spritesheetWalk, spritesheetRun, spritesheetAttack1, spritesheetWalkRight, spritesheetAttack2) {
	
	this.animation = new Animation(spritesheetWalk, 30, 50, 587, 707, 5, 0.1, 10, true);
	this.runAnimation = new Animation(spritesheetRun, 20, 50, 587, 707, 5, 0.1, 10, true);
	this.upAnimation = new Animation(spritesheetWalk, 30, 50, 587, 707, 5, 0.1, 10, true);
	this.rightAnimation = new Animation(spritesheetWalk, 60, 50, 587, 707, 5, 0.1, 10, true);
	this.attackRightAnimation = new Animation(spritesheetAttack1, 70, 50, 587, 707, 5, 0.1, 10, true);
	this.attackLeftAnimation = new Animation(spritesheetAttack1, 70, 50, 587, 707, 5, 0.1, 10, true);
	this.leftAnimation = new Animation(spritesheetWalkRight, 80, 50, 587, 707, 5, 0.1, 10, true);
    
    this.up = false;
    this.down = false;
    this.right = false;
    this.left = false;
    this.space = false;
    this.move = false;
    
    //this.radius = 
    
    this.isAlive = true;
    
    this.board = board;
    this.nextMove = board.getStart();
    //this.speed = 50;
    this.clocktick = 0;
    this.xPosition = this.nextMove.x;
    this.yPosition = this.nextMove.y;
    this.prevX = this.xPosition;
    this.prevY = this.yPosition;
    console.log("dir: " + this.nextMove.y);
    Entity.call(this, game, this.xPosition, this.yPosition);//position where it start
}

Human.prototype = new Entity();
Human.prototype.constructor = Human;

Human.prototype.collide = function(other) {
	return distance(this, other) < this.radius + other.radius;
}

Human.prototype.update = function () {
	if(this.clocktick > GAME_CONSTANT.BLOCK_SIZE) {
	this.clocktick = 0;
	//console.log("movex " + this.yPosition);
	//console.log("prevx " + this.prevY);
		this.nextMove = this.board.getNextStep(this.nextMove.x, this.nextMove.y, this.nextMove.nextDir);
		this.xPosition = this.nextMove.x - 20;
	    this.yPosition = this.nextMove.y + 40;
		this.change(this.nextMove.nextDir);
	}
	//movement
	switch(this.nextMove.nextDir) {
	case "u": this.prevY--; break;
	case "d": this.prevY++; break;
	case "l": this.prevX--; break;
	case "r": this.prevX++; break;
	case "a": break;
	default: console.log(this.nextMove.nextDir);
}
	this.clocktick++;
	
	 for (var i = 0; i < this.game.entities.length; i++) {
	        var ent = this.game.entities[i];
	        
	        if(ent == this && !this.isAlive) {
	        	this.game.entities[i].removeFromWorld = true;
	            break;
	        }
	        
	        if(this.radius <= 0) {
                this.isAlive = false;
            }
	 }
	
	
    Entity.prototype.update.call(this);
}

//a helper method for update on which direction it should face.
Human.prototype.change = function(dir) {
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

Human.prototype.draw = function (ctx) {
	//console.log(this.up);
	if (this.up) {
        this.upAnimation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY, 0.06);
    } else if(this.down) {
    	this.upAnimation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY, 0.06);
    } else if(this.left) {
    	this.leftAnimation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY, 0.06);
    } else if(this.right) {
    	this.rightAnimation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY, 0.06);
    } else if(this.space) {
    	this.attackRightAnimation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY, 0.06);
    } else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY, 0.06);
    }
    Entity.prototype.draw.call(this);
}
