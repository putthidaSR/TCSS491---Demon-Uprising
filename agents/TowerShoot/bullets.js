function Bullet(game, board, x, y, target, damage, id) {
	this.arrow = [new Animation(AM.getAsset("./img/arrow1.png"), 0, 0, 620,  115, 1, 0.15, 1, true)];
	this.upAnimation = new Animation(AM.getAsset("./img/fireball_0.png"), 0, 128, 64, 64, 8, 0.30, 8, true);
	this.downAnimation = new Animation(AM.getAsset("./img/fireball_0.png"), 0, 384, 64, 64, 8, 0.30, 8, true);
	this.leftAnimation = new Animation(AM.getAsset("./img/fireball_0.png"), 0, 0, 64, 64, 8, 0.30, 8, true);
	this.upLeftAnimation = new Animation(AM.getAsset("./img/fireball_0.png"), 0, 64, 64, 64, 8, 0.30, 8, true);
	this.downLeftAnimation = new Animation(AM.getAsset("./img/fireball_1.png"), 0, 256, 64, 64, 8, 0.30, 8, true);
	this.rightAnimation = new Animation(AM.getAsset("./img/fireball_0.png"), 0, 256, 64, 64, 8, 0.30, 8, true);
	this.upRightAnimation = new Animation(AM.getAsset("./img/fireball_0.png"), 0, 192, 64, 64, 8, 0.30, 8, true);
	this.downRightAnimation = new Animation(AM.getAsset("./img/fireball_0.png"), 0, 320, 64, 64, 8, 0.30, 8, true);
	this.up = false;
	this.down = false;
	this.left = false;
	this.upLeft = false;
	this.downLeft = false;
	this.right = false;
	this.upRight = false;
	this.downRight = false;
	this.x = x;
	this.y = y;
	//the target the bullet need to hit
	this.target = target;
	//the damage of the bullet
	this.damage = damage;
	this.game = game;
	//the speed of the bullet
	this.speed = 10 /((5 - id));
	//the size of the bullet
	this.radius = 7 *(id+1);
	this.done = false;
	this.checkDir();
};

Bullet.prototype = new Entity();
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function () {
	Entity.prototype.update.call(this);	
	var check = true;;
	for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        //check to see if the bullet had finish its job of hitting their target
        if(ent == this && this.done) {
        	this.game.entities[i].removeFromWorld = true;       	
            break;
        }
        if(ent == this.target) {
        	check = false;
            //check to see if it is within range 
            this.move();
            if(this.checkCollision()) {
            	ent.health -= this.damage;
            	if(ent.health <= 0) {
            		ent.isAlive = false;
            		this.game.entities[i].removeFromWorld = true;
            		BOARD_CONSTANT.MONEY += 5;
        			document.getElementById('money').innerHTML = BOARD_CONSTANT.MONEY;	
            	}
            	this.done = true;	
            }
        }
    }
	if(check) {
		this.done = true;	
	}
}

Bullet.prototype.move = function() {
	//find unit vector
	//"+rectWidth/2" because we want bullet to go for center of enemy no top left corner
	var xDist = this.target.x + this.target.size - this.x; 
	var yDist = this.target.y + this.target.size - this.y;
	var dist = Math.sqrt(xDist*xDist+yDist*yDist);
	this.x = this.x+this.speed*xDist/dist;
	this.y = this.y+this.speed*yDist/dist;
};

Bullet.prototype.draw = function(ctx) {
	//draw the bullet
	if(!this.done) {
//		ctx.beginPath();
//		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
//		ctx.fillStyle='red';
//		ctx.fill();
//		this.buleetFire.drawFrame(this.game.clockTick, ctx,this.x, this.y, 0.1);
		if (this.up) {
			this.upAnimation.drawFrame(this.game.clockTick, ctx, this.x  - 36, this.y - 24);
		} else if(this.down) {
			this.downAnimation.drawFrame(this.game.clockTick, ctx, this.x - 36, this.y - 24);
		} else if(this.left) {
			this.leftAnimation.drawFrame(this.game.clockTick, ctx, this.x - 36, this.y - 24);
		} else if(this.right) {
			this.rightAnimation.drawFrame(this.game.clockTick, ctx, this.x - 36, this.y - 24);
		} else if(this.upLeft) {
			this.upLeftAnimation.drawFrame(this.game.clockTick, ctx, this.x - 36, this.y - 24);
		} else if (this.downLeft) {
			this.downLeftAnimation.drawFrame(this.game.clockTick, ctx, this.x - 36, this.y - 24);
		} else if(this.upRight) {
			this.upRightAnimation.drawFrame(this.game.clockTick, ctx, this.x - 36, this.y - 24);
		} else {
			this.downRightAnimation.drawFrame(this.game.clockTick, ctx, this.x - 36, this.y - 24);
		}
	}
};

Bullet.prototype.checkCollision = function() {
	var xDist = this.target.x + this.target.size - this.x; 
	var yDist = this.target.y + this.target.size - this.y;
	var dist = Math.sqrt(xDist*xDist+yDist*yDist);
	
	if(dist < 15) {
		return true;
	}
	return false;
};

Bullet.prototype.checkDir = function() {
	var xside = this.target.x - this.x;
	var yside = this.target.y - this.y;
	console.log("x: " + xside + " y " + yside);
	if(xside >= 0 && yside >= -100 && yside <= 100) {
		this.change("r");
	} else if(xside <= 0 && yside >= -100 && yside <= 100) {
		this.change("l");
	} else if(xside >= -100 && yside <= 0 && xside <= 100) {
		this.change("u");
	} else if(xside >= -100 && yside >= 0 && xside <= 100) {
		this.change("d");
	} else if(xside >= 0 && yside >= 0) {
		this.change("dr");
	} else if(xside <= 0 && yside >= 0) {
		this.change("dl");
	} else if(xside <= 0 && yside <= 0) {
		this.change("ul");
	} else {
		this.change("ur");
	}
}

//a helper method for update on which direction it should face.
Bullet.prototype.change = function(dir) {
	switch(dir) {
		case "u": 
			this.up = true;
			this.down = false;
			this.left = false;
			this.upLeft = false;
			this.downLeft = false;
			this.right = false;
			this.upRight = false;
			this.downRight = false; break;
		case "d": 
			this.up = false;
			this.down = true;
			this.left = false;
			this.upLeft = false;
			this.downLeft = false;
			this.right = false;
			this.upRight = false;
			this.downRight = false; break;
		case "l": 
			this.up = false;
			this.down = false;
			this.left = true;
			this.upLeft = false;
			this.downLeft = false;
			this.right = false;
			this.upRight = false;
			this.downRight = false; break;
		case "r": 
			this.up = false;
			this.down = false;
			this.left = false;
			this.upLeft = false;
			this.downLeft = false;
			this.right = true;
			this.upRight = false;
			this.downRight = false; break;
		case "ul": 
			this.up = false;
			this.down = false;
			this.left = false;
			this.upLeft = true;
			this.downLeft = false;
			this.right = false;
			this.upRight = false;
			this.downRight = false; break;
		case "dl": 
			this.up = false;
			this.down = false;
			this.left = false;
			this.upLeft = false;
			this.downLeft = true;
			this.right = false;
			this.upRight = false;
			this.downRight = false; break;
		case "ur": 
			this.up = false;
			this.down = false;
			this.left = false;
			this.upLeft = false;
			this.downLeft = false;
			this.right = false;
			this.upRight = true;
			this.downRight = false; break;
		case "dr": 
			this.up = false;
			this.down = false;
			this.left = false;
			this.upLeft = false;
			this.downLeft = false;
			this.right = false;
			this.upRight = false;
			this.downRight = true; break;
		default: console.log("no direction on spell");
	}
}
