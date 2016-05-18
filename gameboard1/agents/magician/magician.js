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
    this.xPosition = this.nextMove.x;
    this.yPosition = this.nextMove.y;
    console.log("x: " + this.xPosition);
    Entity.call(this, game, this.xPosition, this.yPosition);//position where it start
}

Magician.prototype = new Entity();
Magician.prototype.constructor = Magician;

Magician.prototype.update = function () {
	this.nextMove = this.board.getNextStep(this.nextMove.x, this.nextMove.y, this.nextMove.nextDir);
	
    
    Entity.prototype.update.call(this);
}

//a helper method for update on which dirction it should face.
Magician.prototype.change = function(dir) {
	switch(dir) {
		case "up": this.up = true; this.down = false; this.left = false; this.right = false; this.space = false; break;
		case "down": this.up = false; this.down = true; this.left = false; this.right = false; this.space = false; break;
		case "left": this.up = false; this.down = false; this.left = true; this.right = false; this.space = false; break;
		case "right": this.up = false; this.down = false; this.left = false; this.right = true; this.space = false; break;
		case "space": this.up = false; this.down = false; this.left = false; this.right = false; this.space = true; break;
		default: console.log("none");
	}
	this.move = true;
}

Magician.prototype.draw = function (ctx) {
	//console.log(this.up);
	if (this.up) {
        this.upAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if(this.down) {
    	this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if(this.left) {
    	this.leftAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if(this.right) {
    	this.rightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if(this.space) {
    	this.attackAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.nextMove.x, this.nextMove.y);
    }
    Entity.prototype.draw.call(this);
}
