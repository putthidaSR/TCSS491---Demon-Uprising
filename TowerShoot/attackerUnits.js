var enemies = [];
var addedLife = 0; //incremented in checkForDead()

//Human
function Human1(game, spritesheet) {
	this.animation = new Animation(spritesheet, 250, 221, 200, 0.1, 10, true, 0.2);
	//this.fullhealthbar = new Animation(spritesheet, 256, 64, 256, 0.1, 1, true, 0.2);
	//this.healthbar = new Animation2(spritesheet, 61, 72, 47, 59, 4, 0.15, 1, true);
	this.life = this.maxLife + addedLife;

	this.left = false;
	this.right = true;
	this.up = false;
	this.down = false;

//	this.x = x;
//	this.y = y;

	this.speed = 160;
	this.ctx = game.ctx;
	Entity.call(this, game, 0, 5);


}

Human1.prototype = new Entity();
Human1.prototype.constructor = Human1;
//Human1.prototype.speed = baseSpeed;

Human1.prototype.maxLife = 40;
Human1.prototype.speed = baseSpeed;
Human1.prototype.color = 'red';

//Human1.prototype.update = function () {
//
////	else if (this.x >= 855 && this.y >= 580) {
////		this.removeFromWorld = true;
////
////	}
//	
//	if(this.x < rightBorder && this.y < 140) this.x += this.game.clockTick * this.speed;
//	
//	else if (this.x >= rightBorder && this.y < 140) this.y += this.game.clockTick * this.speed;
//	else if (this.x >= leftBorder && this.y <= 290) this.x -= this.game.clockTick * this.speed; 
//	else if (this.x <= leftBorder && this.y <= 290) this.y += this.game.clockTick * this.speed;
//	else if (this.x <= rightBorder && this.y < 440) this.x += this.game.clockTick * this.speed;
//	else if (this.x >= rightBorder  && this.y <= 440) this.y += this.game.clockTick * this.speed;
//	else  {
//		this.x -= this.game.clockTick * this.speed;
//		//returns true so enemy can be removed if another function
//		if(this.x < 0) return true; 
//	}
//	
//	Entity.prototype.update.call(this);
//}

//Human1.prototype.draw = function (ctx) {
//	
////	context.beginPath();
////	context.fillStyle = this.color;
////	context.fillRect(this.x,this.y,rectWidth,rectWidth);
//	//life bar
//	context.fillStyle='green';
//	context.fillRect(this.x + 20, this.y+rectWidth/3 -10  , rectWidth * this.life/(this.maxLife+addedLife), rectWidth/3);
//	
//	
//	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//	//this.fullhealthbar.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//	//life bar
////	context.fillStyle='orange';
////	context.fillRect(this.x,this.y+rectWidth/3,rectWidth*this.life/(this.maxLife+addedLife),rectWidth/3);
//
//	
//	Entity.prototype.draw.call(this);
//
//}


function Enemy(x,y) {
	this.x = x,
	this.y = y,
	this.life = this.maxLife + addedLife;
}

//common to all Emeny objects
Enemy.prototype.maxLife = 40;
Enemy.prototype.speed = baseSpeed;
Enemy.prototype.color = 'red';

Enemy.prototype.draw = function() {
	
//	context.beginPath();
//	context.fillStyle = this.color;
//	context.fillRect(this.x,this.y,rectWidth,rectWidth);
	Human1.prototype.draw = function (ctx) {
		
//		context.beginPath();
//		context.fillStyle = this.color;
//		context.fillRect(this.x,this.y,rectWidth,rectWidth);
		//life bar
//		context.fillStyle='green';
//		context.fillRect(this.x + 20, this.y+rectWidth/3 -10  , rectWidth * this.life/(this.maxLife+addedLife), rectWidth/3);
//		
		
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
		//this.fullhealthbar.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
		//life bar
//		context.fillStyle='orange';
//		context.fillRect(this.x,this.y+rectWidth/3,rectWidth*this.life/(this.maxLife+addedLife),rectWidth/3);

		
		Entity.prototype.draw.call(this);

	}
	
	//life bar
	context.fillStyle='green';
	context.fillRect(this.x,this.y+rectWidth/3,rectWidth*this.life/(this.maxLife+addedLife),rectWidth/3);
};

Enemy.prototype.move = function() {
	
	var move = this.speed;
	if(this.x < rightBorder && this.y < firstBorder) this.x += move;
	else if (this.x >= rightBorder && this.y < firstBorder) this.y += move;
	else if (this.x >= leftBorder && this.y <= secondBorder) this.x -= move; 
	else if (this.x <= leftBorder && this.y <= secondBorder) this.y += move;
	else if (this.x <= rightBorder && this.y < thirdBorder) this.x += move;
	else if (this.x >= rightBorder  && this.y <= thirdBorder) this.y += move;
	else  {
		this.x -= move;
		//returns true so enemy can be removed if another function
		if(this.x < 0) return true; 
	}
	return false;
	
	Human1.prototype.update = function () {

//		else if (this.x >= 855 && this.y >= 580) {
//			this.removeFromWorld = true;
	//
//		}
		
		if(this.x < rightBorder && this.y < 140) this.x += this.game.clockTick * this.speed;
		
		else if (this.x >= rightBorder && this.y < 140) this.y += this.game.clockTick * this.speed;
		else if (this.x >= leftBorder && this.y <= 290) this.x -= this.game.clockTick * this.speed; 
		else if (this.x <= leftBorder && this.y <= 290) this.y += this.game.clockTick * this.speed;
		else if (this.x <= rightBorder && this.y < 440) this.x += this.game.clockTick * this.speed;
		else if (this.x >= rightBorder && this.y <= 440) this.y += this.game.clockTick * this.speed;
		else  {
			this.x -= this.game.clockTick * this.speed;
			//returns true so enemy can be removed if another function
			if(this.x < 0) return true; 
		}
		
		Entity.prototype.update.call(this);
	}
};

function checkForDead() {
	for (var i = 0, j = enemies.length; i < j; i++ ) {
		if (enemies[i].life <=0) {
			addedLife = Math.floor(stopped/10) * (1 + Math.floor(stopped/100)); //used to make enemies tougher as the number of stopped enemies goes up
			document.getElementById('stopped').innerHTML = ++stopped;
			money += moneyIncrement;
			document.getElementById('money').innerHTML = money;
			enemies.splice(i,1);
			i--;
			j--; 
		}
	}
}

////Human
//function Human1(game, spritesheet) {
//	this.animation = new Animation(spritesheet, 250, 221, 200, 0.1, 10, true, 0.2);
//	this.fullhealthbar = new Animation(spritesheet, 256, 64, 256, 0.1, 1, true, 0.2);
//	//this.healthbar = new Animation2(spritesheet, 61, 72, 47, 59, 4, 0.15, 1, true);
//	this.life = this.maxLife + addedLife;
//
//	this.left = false;
//	this.right = true;
//	this.up = false;
//	this.down = false;
//
////	this.x = x;
////	this.y = y;
//
//	this.speed = 250;
//	this.ctx = game.ctx;
//	Entity.call(this, game, 0, 50);
//
//
//}
//
//Human1.prototype = new Entity();
//Human1.prototype.constructor = Human1;
////Human1.prototype.speed = baseSpeed;
//
//Human1.prototype.maxLife = 40;
//Human1.prototype.speed = baseSpeed;
//Human1.prototype.color = 'red';
//
//Human1.prototype.update = function () {
//
//	//this.x += this.game.clockTick * this.speed;
//	//console.log("x = " + this.x + ", y = " + this.y);
//	//var move = this.speed;
//	//move right
//
//
//	if(this.x < 855) {
//		//console.log("moveeee...");	
//		this.x += this.game.clockTick * this.speed;
//	} 
//
//	else if(this.x >= 855 && this.y < 580) {
//		//console.log("move YYYYYY...");	
//		this.y += this.game.clockTick * this.speed;
//
//
//	} else if (this.x >= 855 && this.y >= 580) {
//		this.removeFromWorld = true;
//
//	}
//	Entity.prototype.update.call(this);
//}
//
//Human1.prototype.draw = function (ctx) {
//	
//	
//	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//	this.fullhealthbar.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//	//life bar
//	context.fillStyle='orange';
//	context.fillRect(this.x,this.y+rectWidth/3,rectWidth*this.life/(this.maxLife+addedLife),rectWidth/3);
//
//	
//	Entity.prototype.draw.call(this);
//
//}


var addEnemy = function() {
	var enemy;
	if(stopped > 20) { 
		var pick = Math.floor(Math.random()*enemyTypes.length); 
		//select random enemy type
		enemy = new enemyTypes[pick](0,rectWidth);
	} else {
		enemy = new Enemy(0,rectWidth);
	}
	enemies.push(enemy);
}

//faster enemy
var FastEnemy = function(x,y) {
	Enemy.call(this,x,y);
};
FastEnemy.prototype = Object.create(Enemy.prototype);
FastEnemy.prototype.constructor = FastEnemy;

FastEnemy.prototype.speed = Enemy.prototype.speed*1.4;
FastEnemy.prototype.color = 'DarkRed';

//stronger enemy
var StrongEnemy = function(x,y) {
	Enemy.call(this,x,y);
};
StrongEnemy.prototype = Object.create(Enemy.prototype);
StrongEnemy.prototype.constructor = StrongEnemy;

StrongEnemy.prototype.color = 'FireBrick';
StrongEnemy.prototype.maxLife = Enemy.prototype.maxLife*2;


//list of enemy types
var enemyTypes = [Enemy,FastEnemy,StrongEnemy];
