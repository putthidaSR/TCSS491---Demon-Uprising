function Bullet(game, board, x, y, target, damage, id) {
    //this.buleetFire = new Animation(AM.getAsset("./img/bulletfire.png"), 0, 0, 192,  192, 1, 0.15, 1, true );
    this.animation = [new Animation(AM.getAsset("./img/bulletthunder.png"), 15, 13, 180, 160, 1, 0.15, 1, true),
	              new Animation(AM.getAsset("./img/bulletsnow.png"), 15 , 15, 320, 320, 1, 0.15, 1, true),
	              new Animation(AM.getAsset("./img/bulletfire.png"),  0, 0, 192,  192, 1, 0.15, 1, true)];
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
    this.id = id;
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
		// ctx.beginPath();
		// ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		// ctx.fillStyle='red';
		// ctx.fill();
        //this.buleetFire.drawFrame(this.game.clockTick, ctx,this.x - 16, this.y - 8, 0.15);
        switch(this.id) {
            case 0: this.animation[0].drawFrame(this.game.clockTick, ctx,this.x - 16, this.y - 8, 0.15); break;
            case 1: this.animation[1].drawFrame(this.game.clockTick, ctx,this.x - 16, this.y - 16, 0.1); break;
            case 2: this.animation[2].drawFrame(this.game.clockTick, ctx,this.x - 16, this.y - 8, 0.2); break;
        }
	}
};

Bullet.prototype.checkCollision = function() {
	var xDist = this.target.x + this.target.size - this.x; 
	var yDist = this.target.y + this.target.size - this.y;
	var dist = Math.sqrt(xDist*xDist+yDist*yDist);
	
	if(dist < 20) {
		return true;
	}
	return false;
};
