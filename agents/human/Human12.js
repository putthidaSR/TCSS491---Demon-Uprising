//Human12
function Human12(game, board, spritesheetWalkBack, spritesheetWalkFront, spritesheetWalkLeft, spritesheetWalkRight) {
	//walk back
	this.animationBack = new Animation(spritesheetWalkBack, 0, 0, 90, 125, 4, 0.12, 4, true);

	//walk front
	this.animationFront = new Animation(spritesheetWalkFront, 0, 0, 90, 125, 4, 0.12, 4, true);

	//walk left
	this.animationLeft = new Animation(spritesheetWalkLeft, 0, 0, 90, 125, 4, 0.12, 4, true);

	//walk right
	this.animationRight = new Animation(spritesheetWalkRight, 0, 0, 90, 125, 4, 0.12, 4, true);
  
    this.up = false;
    this.down = false;
    this.right = false;
    this.left = false;
    this.space = false;
    this.move = false;
    this.board = board;
    this.nextMove = board.getStart();
    this.clocktick = 0;
    if(this.nextMove.x == 0) {
        this.xPosition = this.nextMove.x + 16;
        this.yPosition = this.nextMove.y - 30;
    } else if(this.nextMove.x == 990){
        this.xPosition = this.nextMove.x - 42;
        this.yPosition = this.nextMove.y - 30;
    } else {
    	this.xPosition = this.nextMove.x;
        this.yPosition = this.nextMove.y;
    }
    //how big the size of this entity is for collision with bullet
	this.size = 32;
	//current position of the magician
	this.x = this.xPosition;
	this.y = this.yPosition;
	//health of the magician 
	this.health = 5 * BOARD_CONSTANT.LEVEL;
	this.maxHealth = 5 * BOARD_CONSTANT.LEVEL;
    this.isALive = true;
    this.speed = 1;
    Entity.call(this, game, this.xPosition, this.yPosition);//position where it start
}

Human12.prototype = new Entity();
Human12.prototype.constructor = Human12;

Human12.prototype.update = function () {
	if(this.clocktick >= GAME_CONSTANT.BLOCK_SIZE) {
		this.clocktick = 0;
		this.nextMove = this.board.getNextStep(this.nextMove.x, this.nextMove.y, this.nextMove.nextDir);
		this.change(this.nextMove.nextDir);
	}
	//movement
	switch(this.nextMove.nextDir) {
	case "u": this.y-= 1 * this.speed; break;
	case "d": this.y+= 1 * this.speed; break;
	case "l": this.x-= 1 * this.speed; break;
	case "r": this.x+= 1 * this.speed; break;
	case "a": break;
	case "e": this.end(); break;
	default: console.log(this.nextMove.nextDir);
}
	this.clocktick += 1 * this.speed;
    Entity.prototype.update.call(this);
}

Human12.prototype.end = function() {
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

//a helper method for update on which dirction it should face.
Human12.prototype.change = function(dir) {
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

Human12.prototype.draw = function (ctx) {
	//console.log(this.up);
	if(this.isALive) {
		//health
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.rect(this.x+15, this.y, GAME_CONSTANT.HEALTH_WIDTH, GAME_CONSTANT.HEALTH_HEIGHT);
		ctx.stroke();

		ctx.beginPath();
		ctx.fillStyle = "yellow";
		ctx.rect(this.x+15, this.y, GAME_CONSTANT.HEALTH_WIDTH * (this.health/this.maxHealth), 
				GAME_CONSTANT.HEALTH_HEIGHT);
		ctx.fill();
		
		if (this.up) {
	        this.animationBack.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.4);
	    } else if(this.down) {
	    	this.animationFront.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.4);
	    } else if(this.left) {
	    	this.animationLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.4);
	    } else if(this.right) {
	    	this.animationRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.4);
	    } else if(this.space) {
	    	this.animationBack.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.4);
	    } else {
	        this.animationFront.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.4);
	    }
	}
    Entity.prototype.draw.call(this);
}
