function Tower(game, board, x, y, id) {
	this.x = x * GAME_CONSTANT.BLOCK_SIZE;
	this.y = y * GAME_CONSTANT.BLOCK_SIZE;
	this.game = game;
	this.board = board;
	this.id = id - 1;
	this.color = [new Animation(AM.getAsset("./img/tower1.png"), 178, 12, 410, 730, 1, 0.15, 1, true),
	              new Animation(AM.getAsset("./img/tower2.png"), 35, 12, 55, 155, 1, 0.15, 1, true),
	              new Animation(AM.getAsset("./img/tower3.png"), 130, 50, 250, 420, 1, 0.15, 1, true)];
	this.range = BOARD_CONSTANT.TOWER_COST[id] * 3;
	this.damage = id;
	this.animation = this.color[this.id];
	this.rateOfFire = id * 100;
	this.fps = id * 100;
//	this.tower1 = document.getElementById("tower1");
//	this.tower2 = document.getElementById("tower2");
//	this.tower3 = document.getElementById("tower3");
};

Tower.prototype = new Entity();
Tower.prototype.constructor = Tower;
Tower.prototype.cost = 50;

//Tower.prototype.r = rectWidth; //radius
//Tower.prototype.rateOfFire = FPS; //smaller means more bullets per second
//Tower.prototype.hurt = Enemy.prototype.maxLife/6;

Tower.prototype.collideRect = function (other) {
	return distance(this, other) < this.range;
};

Tower.prototype.update = function () {
	Entity.prototype.update.call(this);
	this.findTarget();
	
}

Tower.prototype.findTarget = function() {
	//finding human target
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if(ent instanceof Magician || (ent instanceof Human6)) {
            //check to see if it is within range 
            if (ent !== this && this.collideRect(ent)) {               
                this.fire(ent);
            }
        }
        
    }
};

//Tower.prototype.findUnitVector = function(other) {
//	var xDist = this.target.x-this.x;
//	var yDist = this.target.y-this.y;
//	var dist = Math.sqrt(xDist*xDist+yDist*yDist); 
//	this.xFire = this.x+this.r*xDist/dist; //where turret ends and bullets start
//	this.yFire = this.y+this.r*yDist/dist;
//};

Tower.prototype.draw = function (ctx) {
	switch(this.id) {
		case 0: this.animation.drawFrame(this.game.clockTick, ctx, this.x - 5, this.y - 40, 0.1); break;
		case 1: this.animation.drawFrame(this.game.clockTick, ctx, this.x - 7, this.y - 50, 0.7); break;
		case 2: this.animation.drawFrame(this.game.clockTick, ctx, this.x - 11, this.y - 50, 0.2); break;
		default: console.log("tower");
	}
	
    Entity.prototype.draw.call(this)
};

Tower.prototype.fire = function(other) {
	this.rateOfFire++;
	if(this.rateOfFire > this.fps) {
		this.game.addEntity(new Bullet(this.game, this.board, this.x, this.y, other, this.damage, this.id));
		//bullets.push(new Bullet(this.x,this.y,other,this.hurt));
		//reset this objects rateOfFire to the prototypes
		this.rateOfFire = 0;
	};
};