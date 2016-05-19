//Magician
function Magician(game, board, spritesheet, spritesheet2) {
	//this.animation = new Animation(spritesheet, 64, 64, 4, 0.15, 16, true, false);
    this.animation = new Animation(spritesheet, 0, 0, 64, 64, 4, 0.15, 16, true);
    this.upAnimation = new Animation(spritesheet, 0, 256, 64, 64, 4, 0.15, 16, true);
    this.leftAnimation = new Animation(spritesheet, 256, 0, 64, 64, 4, 0.15, 16, true);
    this.rightAnimation = new Animation(spritesheet2, 0, 0, 64, 64, 4, 0.15, 16, true);
    this.attackAnimation = new Animation(spritesheet, 256, 256, 64, 64, 4, 0.15, 16, false);
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
    this.prevX = this.xPosition;
    this.prevY = this.yPosition;
    console.log("dir: " + this.nextMove.y);
    Entity.call(this, game, this.xPosition, this.yPosition);//position where it start
}

Magician.prototype = new Entity();
Magician.prototype.constructor = Magician;

Magician.prototype.update = function () {
	if(this.clocktick > GAME_CONSTANT.BLOCK_SIZE) {
	this.clocktick = 0;
	//console.log("movex " + this.yPosition);
	//console.log("prevx " + this.prevY);
		this.nextMove = this.board.getNextStep(this.nextMove.x, this.nextMove.y, this.nextMove.nextDir);
		this.xPosition = this.nextMove.x - 16;
	    this.yPosition = this.nextMove.y;
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
    Entity.prototype.update.call(this);
}

//a helper method for update on which dirction it should face.
Magician.prototype.change = function(dir) {
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

Magician.prototype.draw = function (ctx) {
	//console.log(this.up);
	if (this.up) {
        this.upAnimation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY);
    } else if(this.down) {
    	this.animation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY);
    } else if(this.left) {
    	this.leftAnimation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY);
    } else if(this.right) {
    	this.rightAnimation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY);
    } else if(this.space) {
    	this.attackAnimation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY);
    } else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.prevX, this.prevY);
    }
    Entity.prototype.draw.call(this);
}
