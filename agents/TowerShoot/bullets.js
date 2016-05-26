function Bullet(game, board, x, y, target, damage, id) {
	this.x = x;
	this.y = y;
	this.target = target;
	this.damage = damage;
	this.game = game;
	this.speed = 5*20/((id+1)*10);
	this.radius = 7 *(id+1);
	this.done = false;;
};

Bullet.prototype = new Entity();
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function () {
	Entity.prototype.update.call(this);	
	var check = true;;
	for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
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
            		//console.log("Money = " + BOARD_CONSTANT.MONEY);
        			document.getElementById('money').innerHTML = BOARD_CONSTANT.MONEY;
            	
                //	this.game.entities[i].HEALTH_WIDTH -= 15;

                	
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

Bullet.prototype.draw = function() {
	if(!this.done) {
		context.beginPath();
		context.arc(this.x,this.y,this.radius,0,2*Math.PI);
		context.fillStyle='red';
		context.fill();
	}
};

Bullet.prototype.checkCollision = function() {

	var xDist = this.target.x + this.target.size - this.x; 
	var yDist = this.target.y + this.target.size - this.y;
	var dist = Math.sqrt(xDist*xDist+yDist*yDist);
	
	if(dist < 20) {
		return true;
	}
	
	// if(this.x <= this.target.x + this.target.size &&
// 			this.x + this.radius >= this.target.x &&
// 			this.y <= this.target.y + this.target.size &&
// 			this.y + this.radius >= this.target.y) {
// 		return true;
// 		
// 	}
	
	return false;
	
};
