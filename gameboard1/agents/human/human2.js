function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

//Human2
function Human2(game, board, spritesheetRun, spritesheetAttack, spritesheetRun2, spriteSheetAttack2) {
	
	this.animation = new Animation(spritesheetRun, 10, 60, 65, 55, 3, 0.1, 9, true);
	this.runAnimation = new Animation(spritesheetRun2, 15, 60, 65, 55, 3, 0.1, 9, true);
	this.attackAnimation = new Animation(spritesheetAttack, 20, 60, 180, 100, 7, 0.1, 7, true);
	this.attackAnimation2 = new Animation(spritesheetAttack2, 25, 60, 180, 100, 7, 0.1, 7, true);
    
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

Human2.prototype = new Entity();
Human2.prototype.constructor = Human2;

Human2.prototype.collide = function(other) {
	return distance(this, other) < this.radius + other.radius;
}

Human2.prototype.update = function () {
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
	
	 /*for (var i = 0; i < this.game.entities.length; i++) {
	        var ent = this.game.entities[i];
	        
	        if(ent == this && !this.isAlive) {
	        	this.game.entities[i].removeFromWorld = true;
	            break;
	        }
	        
	        if(this.radius <= 0) {
                this.isAlive = false;
            }
	 }*/
	
	
    Entity.prototype.update.call(this);
}

//a helper method for update on which direction it should face.
Human2.prototype.change = function(dir) {
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

Human2.prototype.draw = function (ctx) {
	//console.log(this.up);
	if (this.up) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY, 0.55);
    } else if(this.down) {
    	this.animation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY, 0.55);
    } else if(this.left) {
    	this.animation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY, 0.55);
    } else if(this.right) {
    	this.runAnimation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY, 0.55);
    } else if(this.space) {
    	this.attackAnimation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY, 0.55);
    } else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY, 0.55);
    }
    Entity.prototype.draw.call(this);
}
