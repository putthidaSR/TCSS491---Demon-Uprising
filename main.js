var AM = new AssetManager();

/**For magician **/

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
	this.spriteSheet = spriteSheet;
	this.frameWidth = frameWidth;
	this.frameDuration = frameDuration;
	this.frameHeight = frameHeight;
	this.sheetWidth = sheetWidth;
	this.frames = frames;
	this.totalTime = frameDuration * frames;
	this.elapsedTime = 0;
	this.loop = loop;
	this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
	this.elapsedTime += tick;
	if (this.isDone()) {
		if (this.loop) this.elapsedTime = 0;
	}
	var frame = this.currentFrame();
	var xindex = 0;
	var yindex = 0;
	xindex = frame % this.sheetWidth;
	yindex = Math.floor(frame / this.sheetWidth);

	ctx.drawImage(this.spriteSheet,
			xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
			this.frameWidth, this.frameHeight,
			x, y,
			this.frameWidth * this.scale,
			this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
	return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
	return (this.elapsedTime >= this.totalTime);
}

function Animation2(spriteSheet, startX, startY, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop) {
	this.spriteSheet = spriteSheet;
	this.startX = startX;
	this.startY = startY;
	this.frameWidth = frameWidth;
	this.frameDuration = frameDuration;
	this.frameHeight = frameHeight;
	this.sheetWidth = sheetWidth;
	this.frames = frames;
	this.totalTime = frameDuration * frames;
	this.elapsedTime = 0;
	this.loop = loop;
}

Animation2.prototype.drawFrame = function (tick, ctx, x, y, scaleBy, reflect) {
	var scaleBy = scaleBy || 1;
	this.elapsedTime += tick;
	if (this.loop) {
		if (this.isDone()) {
			this.elapsedTime = 0;
		}
	} else if (this.isDone()) {
		return;
	}
	//frame
	var frame = this.currentFrame();
	var xindex = 0;
	var yindex = 0;
	xindex = frame % this.sheetWidth;
	yindex = Math.floor(frame / this.sheetWidth);
	//console.log(xindex);
	//console.log(this.frameWidth);
	//console.log(this.startX);
	if(reflect) {
		ctx.translate((x) * 2 + this.frameWidth,0);
		ctx.scale(-1,1);
	}
	ctx.drawImage(this.spriteSheet,
			// source from sheet
			xindex * this.frameWidth + this.startX, yindex * this.frameHeight + this.startY,  
			this.frameWidth, this.frameHeight,
			x, y,
			this.frameWidth * scaleBy,
			this.frameHeight * scaleBy);

}

Animation2.prototype.currentFrame = function () {
	return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation2.prototype.isDone = function () {
	//console.log(this.elapsedTime >= this.totalTime);
	return (this.elapsedTime >= this.totalTime);
}

//no inheritance
function Background(game, spritesheet) {
	this.x = 0;
	this.y = 0;
	this.spritesheet = spritesheet;
	this.game = game;
	this.ctx = game.ctx;
};

Background.prototype.draw = function () {
	this.ctx.drawImage(this.spritesheet,
			this.x, this.y);
};

Background.prototype.update = function () {
};




//Magician1
function Magician1(game, spritesheet) {
	//this.animation = new Animation(spritesheet, 64, 64, 4, 0.15, 16, true, false);
	this.animation = new Animation2(spritesheet, 3, 145, 40, 45, 4, 0.15, 1, true);
	this.upAnimation = new Animation2(spritesheet, 61, 72, 47, 59, 4, 0.15, 1, true);
	this.rightAnimation = new Animation2(spritesheet, 3, 145, 40, 50, 4, 0.15, 1, true);
	this.attackAnimation = new Animation2(spritesheet, 150, 13, 56, 50, 4, 0.15, 4, false);
	this.up = false;
	this.down = false;
	this.right = false;
	this.left = false;
	this.shoot = false;
	this.move = false;
	this.radius = 100;
	this.ground = 350;
	this.xPosition = 400;
	this.yPosition = 400;
	Entity.call(this, game, 300, 300);//position where it start
}

Magician1.prototype = new Entity();
Magician1.prototype.constructor = Magician;

Magician1.prototype.update = function () {
	//checking which key board is click
	if (this.game.i) {
		this.change("up");
		console.log("yes");
	}
	if (this.game.k) {
		this.change("down");
		console.log("yes");
	}
	if (this.game.j) {
		this.change("left");
		console.log("yes");
	}
	if (this.game.l) {
		this.change("right");
		console.log("yes");
	}
//	if (this.game.space) {
//		this.change("space");
//		console.log("yes");
//	}
	
	if (this.game.shooting) {
		//this.shoot = true;
		this.change("shoot");
		console.log("shoooot");
	}
	//move the character
	
	
	if (this.up) {
		if(this.move) {
			this.yPosition -= 15;
			if(this.yPosition <= 0) {
				this.yPosition = 0;
			}
			this.move = false;
		}
		this.y = this.yPosition;
		//this.shoot = false;
	} else if(this.down) {
		if(this.move) {
			this.yPosition += 15;
			if(this.yPosition >= 645) {
				this.yPosition = 645;
			}
			this.move = false;
		}
		this.y = this.yPosition;
		//this.shoot = false;

	} else if(this.right) {
		if(this.move) {
			this.xPosition += 15;
			if(this.xPosition >= 700) {
				this.xPosition = 700;
			}
			this.move = false;
		}
		this.x = this.xPosition;
		//this.shoot = false;

	} else if(this.left) {
		if(this.move) {
			this.xPosition -= 15;
			if(this.xPosition <= 0) {
				this.xPosition = 0;
			}
			this.move = false;
		}
		this.x = this.xPosition;
		//this.shoot = false;

	} else if(this.shoot) {
		if (this.attackAnimation.isDone()) {
			this.attackAnimation.elapsedTime = 0;
			this.shoot = false;
		}
		//this.shoot = true;
	} 

	Entity.prototype.update.call(this);
}

//a helper method for update on which dirction it should face.
Magician1.prototype.change = function(dir) {
	switch(dir) {
	case "up": this.up = true; this.down = false; this.left = false; this.right = false; this.shoot = false; break;
	case "down": this.up = false; this.down = true; this.left = false; this.right = false; this.shoot = false; break;
	case "left": this.up = false; this.down = false; this.left = true; this.right = false; this.shoot = false; break;
	case "right": this.up = false; this.down = false; this.left = false; this.right = true; this.shoot = false; break;
	case "shoot": this.up = false; this.down = false; this.left = false; this.right = false; this.shoot = true; break;
	default: console.log("none");
	}
	this.move = true;
	//this.shoot = true;
	
}

Magician1.prototype.draw = function (ctx) {
	//console.log(this.up);
	if (this.up) {
		this.upAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	} else if(this.down) {
		this.upAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	} else if(this.right) {
		this.rightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	} else if(this.left) {
		this.rightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, false, true);
	} else if(this.shoot) {
		this.attackAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
		
	} else {
		this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	}
	Entity.prototype.draw.call(this);
}

//Magician
function Magician(game, spritesheet) {
	//this.animation = new Animation(spritesheet, 64, 64, 4, 0.15, 16, true, false);
	this.animation = new Animation2(spritesheet, 0, 0, 64, 64, 4, 0.15, 16, true);
	this.upAnimation = new Animation2(spritesheet, 0, 256, 64, 64, 4, 0.15, 16, true);
	this.leftAnimation = new Animation2(spritesheet, 256, 0, 64, 64, 4, 0.15, 16, true);
	this.attackAnimation = new Animation2(spritesheet, 256, 256, 64, 64, 4, 0.15, 16, false);
	this.up = false;
	this.down = false;
	this.right = false;
	this.left = false;
	this.space = false;
	this.move = false;
	this.radius = 100;
	this.ground = 350;
	this.xPosition = 350;
	this.yPosition = 350;
	Entity.call(this, game, 350, 350);//position where it start
}

Magician.prototype = new Entity();
Magician.prototype.constructor = Magician;

Magician.prototype.update = function () {
	//checking which key board is click
	if (this.game.w) {
		this.change("up");
		console.log("yes");
	}
	if (this.game.s) {
		this.change("down");
		console.log("yes");
	}
	if (this.game.a) {
		this.change("left");
		console.log("yes");
	}
	if (this.game.d) {
		this.change("right");
		console.log("yes");
	}
	if (this.game.space) {
		this.change("space");
		console.log("yes");
	}
	//move the character
	if (this.up) {
		if(this.move) {
			this.yPosition -= 15;
			if(this.yPosition <= 0) {
				this.yPosition = 0;
			}
			this.move = false;
		}
		this.y = this.yPosition;
	} else if(this.down) {
		if(this.move) {
			this.yPosition += 15;
			if(this.yPosition >= 645) {
				this.yPosition = 645;
			}
			this.move = false;
		}
		this.y = this.yPosition;
	} else if(this.right) {
		if(this.move) {
			this.xPosition += 15;
			if(this.xPosition >= 700) {
				this.xPosition = 700;
			}
			this.move = false;
		}
		this.x = this.xPosition;
	} else if(this.left) {
		if(this.move) {
			this.xPosition -= 15;
			if(this.xPosition <= 0) {
				this.xPosition = 0;
			}
			this.move = false;
		}
		this.x = this.xPosition;
	} else if(this.space) {
		if (this.attackAnimation.isDone()) {
			this.attackAnimation.elapsedTime = 0;
			this.space = false;
		}
	}

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
		this.leftAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, false, true);
	} else if(this.space) {
		this.attackAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	} else {
		this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	}
	Entity.prototype.draw.call(this);
}


//Human
function Hero(game, spritesheet) {
	this.animation = new Animation(spritesheet, 144, 145, 5, 0.1, 21, true, 1);
	this.x = 0;
	this.y = 0;
	this.speed = 100;
	this.game = game;
	this.ctx = game.ctx;

}

Hero.prototype.draw = function () {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Hero.prototype.update = function () {
	if (this.animation.elapsedTime < this.animation.totalTime * 8 / 21)
		this.x += this.game.clockTick * this.speed;
	if (this.x > 800) this.x = -230;
}

function Demon(game, spritesheet) {
	this.animation = new Animation(spritesheet, 450, 355, 4, 0.15, 12, true, 0.3);
	this.speed = 200;
	this.ctx = game.ctx;
	Entity.call(this, game, 0, 270);
}

Demon.prototype = new Entity();
Demon.prototype.constructor = Demon;

Demon.prototype.update = function() {
	this.x += this.game.clockTick * this.speed;
	if (this.x > 800) this.x = -230;
	Entity.prototype.update.call(this);
}

Demon.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	Entity.prototype.draw.call(this);
}

function Demon1(game, spritesheet) {
	this.animation = new Animation(spritesheet, 450, 355, 4, 0.15, 4, true, 0.3);
	this.speed = 200;
	this.ctx = game.ctx;
	Entity.call(this, game, 0, 475);
}

Demon1.prototype = new Entity();
Demon1.prototype.constructor = Demon1;

Demon1.prototype.update = function() {
	this.x += this.game.clockTick * this.speed;
	if (this.x > 800) this.x = -230;
	Entity.prototype.update.call(this);
}

Demon1.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	Entity.prototype.draw.call(this);
}

function Knight(game, spritesheet) {
	this.animation = new Animation(spritesheet, 77, 111, 4, 0.15, 22, true, 1.2);
	this.speed = 100;
	this.ctx = game.ctx;
	Entity.call(this, game, 0, 150);
}

Knight.prototype = new Entity();
Knight.prototype.constructor = Knight;

Knight.prototype.update = function() {
	this.x += this.game.clockTick * this.speed;
	if (this.x > 800) this.x = -230;
	Entity.prototype.update.call(this);
}

Knight.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	Entity.prototype.draw.call(this);
}

//bird fly
function Bird(game, spritesheet) {
	this.animation = new Animation(spritesheet, 240, 314, 2, 0.1, 4, true, 0.5);
	this.speed = 350;
	this.ctx = game.ctx;
	Entity.call(this, game, 0, 50);
}

Bird.prototype = new Entity();
Bird.prototype.constructor = Bird;

Bird.prototype.update = function () {
	this.x += this.game.clockTick * this.speed;
	if (this.x > 800) this.x = -230;
	Entity.prototype.update.call(this);
}

Bird.prototype.draw = function () {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	Entity.prototype.draw.call(this);
}

//Human
function Human1(game, spritesheet) {
	this.animation = new Animation(spritesheet, 250, 221, 200, 0.1, 10, true, 0.5);
	this.speed = 350;
	this.ctx = game.ctx;
	Entity.call(this, game, 0, 330);

}

Human1.prototype = new Entity();
Human1.prototype.constructor = Human1;

Human1.prototype.update = function () {

	this.x += this.game.clockTick * this.speed;
	if (this.x > 800) this.x = -230;
	Entity.prototype.update.call(this);
}

Human1.prototype.draw = function () {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	Entity.prototype.draw.call(this);

}

//Explosion
function FireBall(game, spritesheet) {
	this.animation = new Animation(spritesheet, 64, 64, 64, 0.08, 23, true, 3);
	this.speed = 80;
	this.ctx = game.ctx;
	Entity.call(this, game, 100, 300);

}

FireBall.prototype = new Entity();
FireBall.prototype.constructor = FireBall;

FireBall.prototype.update = function () {

//	this.x += this.game.clockTick * this.speed;
//	if (this.x > 800) this.x = -50;
	Entity.prototype.update.call(this);
}

FireBall.prototype.draw = function () {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	Entity.prototype.draw.call(this);

}

//Light
function Light(game, spritesheet) {
	this.animation = new Animation(spritesheet, 192, 240, 185, 0.08, 20, true, 0.5);
	this.speed = 80;
	this.ctx = game.ctx;
	Entity.call(this, game, 600, 300);

}

Light.prototype = new Entity();
Light.prototype.constructor = Light;

Light.prototype.update = function () {

//	this.x += this.game.clockTick * this.speed;
//	if (this.x > 800) this.x = -50;
	Entity.prototype.update.call(this);
}

Light.prototype.draw = function () {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	Entity.prototype.draw.call(this);

}

//snowball
function Snowball(game, spritesheet) {
	this.animation = new Animation(spritesheet, 268, 137, 170, 0.08, 33, true, 0.8);
	this.speed = 80;
	this.ctx = game.ctx;
	Entity.call(this, game, 100, 100);

}

Snowball.prototype = new Entity();
Snowball.prototype.constructor = Snowball;

Snowball.prototype.update = function () {

//	this.x += this.game.clockTick * this.speed;
//	if (this.x > 800) this.x = -50;
	Entity.prototype.update.call(this);
}

Snowball.prototype.draw = function () {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	Entity.prototype.draw.call(this);

}

AM.queueDownload("./img/magician.png");
AM.queueDownload("./img/bgg.png");
AM.queueDownload("./img/walk1.png");
AM.queueDownload("./img/Animal.png");
AM.queueDownload("./img/hero2.png");
AM.queueDownload("./img/demon.png");
AM.queueDownload("./img/knightFT.png");
AM.queueDownload("./img/demon1.png");
AM.queueDownload("./img/explosion.png");
AM.queueDownload("./img/Magician1.png");
AM.queueDownload("./img/snowball.png");
AM.queueDownload("./img/light.png");


AM.downloadAll(function () {
	var canvas = document.getElementById("gameWorld");
	var ctx = canvas.getContext("2d");

	var gameEngine = new GameEngine();
	gameEngine.init(ctx);
	gameEngine.start();

	gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/bgg.png")));
	gameEngine.addEntity(new Magician(gameEngine, AM.getAsset("./img/magician.png")));
	gameEngine.addEntity(new Human1(gameEngine, AM.getAsset("./img/walk1.png")));
	gameEngine.addEntity(new Bird(gameEngine, AM.getAsset("./img/Animal.png")));
	gameEngine.addEntity(new Hero(gameEngine, AM.getAsset("./img/hero2.png")));
	gameEngine.addEntity(new Demon(gameEngine, AM.getAsset("./img/demon.png")));
	gameEngine.addEntity(new Knight(gameEngine, AM.getAsset("./img/knightFT.png")));
	gameEngine.addEntity(new Demon1(gameEngine, AM.getAsset("./img/demon1.png")));
	gameEngine.addEntity(new Magician1(gameEngine, AM.getAsset("./img/Magician1.png")));
	gameEngine.addEntity(new FireBall(gameEngine, AM.getAsset("./img/explosion.png")));
	gameEngine.addEntity(new Light(gameEngine, AM.getAsset("./img/light.png")));
	gameEngine.addEntity(new Snowball(gameEngine, AM.getAsset("./img/snowball.png")));

	console.log("All Done!");
});
