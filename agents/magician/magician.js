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
    if(this.nextMove.x == 0) {
        this.xPosition = this.nextMove.x + 16;
        this.yPosition = this.nextMove.y - 46;
    } else if(this.nextMove.x == 990){
        this.xPosition = this.nextMove.x - 42;
        this.yPosition = this.nextMove.y - 46;
    } else {
        this.xPosition = this.nextMove.x - 16;
        this.yPosition = this.nextMove.y - 16;
    }
    console.log("this.x " + this.nextMove.x + "this.y " + this.nextMove.y);
	this.size=32;
	this.x = this.xPosition;
	this.y = this.yPosition;
	this.health = 3;
	this.isALive = true;
	//console.log("dir: " + this.nextMove.y);
	Entity.call(this, game, this.xPosition, this.yPosition);//position where it start
}

Magician.prototype = new Entity();
Magician.prototype.constructor = Magician;

Magician.prototype.update = function () {
	if(this.clocktick > GAME_CONSTANT.BLOCK_SIZE - 1) {
		this.clocktick = 0;
		//console.log("movex " + this.yPosition);
		//console.log("thi.x " + this.x + "this.y " + this.y);
		this.nextMove = this.board.getNextStep(this.nextMove.x, this.nextMove.y, this.nextMove.nextDir);
		this.xPosition = this.nextMove.x - 16;
		this.yPosition = this.nextMove.y - 16;
		this.change(this.nextMove.nextDir);
	}
	//movement
	switch(this.nextMove.nextDir) {
	case "u": this.y--; break;
	case "d": this.y++; break;
	case "l": this.x--; break;
	case "r": this.x++; break;
	case "a": break;
	case "e": this.end(); break;
	default: console.log(this.nextMove.nextDir);
	}
	this.clocktick++;
	Entity.prototype.update.call(this);
}

Magician.prototype.end = function() {
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
	if(this.isALive) {

		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.rect(this.x+25, this.y, GAME_CONSTANT.HEALTH_WIDTH, GAME_CONSTANT.HEALTH_HEIGHT);
		ctx.stroke();

		ctx.beginPath();
		ctx.fillStyle = "yellow";
		ctx.rect(this.x+25, this.y, this.health*7, GAME_CONSTANT.HEALTH_HEIGHT);
		ctx.fill();


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
			this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
		}
	}

	Entity.prototype.draw.call(this);
}
