function Tower(game, board, x, y, id) {
	this.x = x * GAME_CONSTANT.BLOCK_SIZE;
	this.y = y * GAME_CONSTANT.BLOCK_SIZE;
	this.game = game;
	this.board = board;
	this.id = id - 1;
	this.color = [new Animation(AM.getAsset("./img/tower1.png"), 178, 12, 410, 730, 1, 0.15, 1, true),
	              new Animation(AM.getAsset("./img/tower2.png"), 35, 12, 55, 155, 1, 0.15, 1, true),
	              new Animation(AM.getAsset("./img/tower3.png"), 130, 50, 250, 420, 1, 0.15, 1, true)];
	this.range = BOARD_CONSTANT.TOWER_RANGE[id] + 50;
	//damage the tower can done
	this.damage = 5 * (this.id + 1);
	this.animation = this.color[this.id];
	//the current cool down of the bullet 
	this.rateOfFire = 1000;
	//the total cool down time needed to fire another one
	this.fps = BOARD_CONSTANT.TOWER_FPS[this.id + 1];
};

Tower.prototype = new Entity();
Tower.prototype.constructor = Tower;

Tower.prototype.collideRect = function (other) {
	return distance(this, other) < this.range;
};

Tower.prototype.update = function () {
	Entity.prototfunction Spell(game, board, x, y, id) {
    this.spell = [new Animation(AM.getAsset("./img/explosion_transparent.png"), 
    		0 , 0, 64, 64, 5, 0.05, 23, false),
    		new Animation(AM.getAsset("./img/snowball.png"), 
			0 , 0, 192, 192, 5, 0.05, 35, false),
			new Animation(AM.getAsset("./img/light.png"), 
    		0 , 0, 192, 192, 5, 0.05, 20, false)];
    this.id = id - 1;
    this.board = board;
    this.game = game;
    this.x = x;
    this.y = y;
    this.damage = 5;
    this.animation = this.spell[this.id];
    //range of the spell
    this.radius = 50;
    //checking when the animation is finished
    this.done = false;
    //checking if it hits one of them
    this.hit = false;
    this.clocktick = 0;
    Entity.call(this, game, this.x, this.y);//position where it start
}

Spell.prototype = new Entity();
Spell.prototype.constructor = Spell;

Spell.prototype.collideRect = function (other) {
	return distance(this, other) < this.radius;
};

Spell.prototype.update = function () {
	for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        //remove the spell once it is finish
        if(ent == this && this.done) {
        	BOARD_CONSTANT.SPELL_ACTIVATED = false;
        	this.game.entities[i].removeFromWorld = true;
            break;
        }
        //check the target
        if(!this.hit && (ent instanceof Magician2 || ent instanceof Human1 || ent instanceof Human6
        		|| ent instanceof Human9)) {
            //check to see if it is within range 
            if(this.collideRect(ent)) {
            	ent.health -= this.damage;
            	if(ent.health <= 0) {
            		ent.isAlive = false;
            		this.game.entities[i].removeFromWorld = true;
            		BOARD_CONSTANT.MONEY += 5;
        			document.getElementById('money').innerHTML = BOARD_CONSTANT.MONEY;	
            	}
            	this.hit = true;
//            	this.done = true;           	
            }
        }
    }
    if(this.clocktick > 50) {
        this.done = true;
    }
	this.clocktick++;
    Entity.prototype.update.call(this);
}

Spell.prototype.draw = function (ctx) {
	switch(this.id) {
		case 0: this.animation.drawFrame(this.game.clockTick, ctx, this.x - 32, this.y - 32, 1); break;
		case 1: this.animation.drawFrame(this.game.clockTick, ctx, this.x - 36, this.y - 36, 0.4); break;
		case 2: this.animation.drawFrame(this.game.clockTick, ctx, this.x - 36, this.y - 64, 0.4); break;
		default: console.log("spell");
	}
    Entity.prototype.draw.call(this);
}ype.update.call(this);
	this.findTarget();
}

Tower.prototype.findTarget = function() {
	//finding human target
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if(ent instanceof Magician2 || (ent instanceof Human6)) {
            //check to see if it is within range 
            if (ent !== this && this.collideRect(ent)) {               
                this.fire(ent);
            }
        }     
    }
};

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
		this.game.addEntity(new Bullet(this.game, this.board, this.x, this.y, other, 
				this.damage, this.id));
		//reset this objects rateOfFire to the prototypes
		this.rateOfFire = 0;
	};
};
