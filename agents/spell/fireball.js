function Spell(game, board, x, y, id) {
    this.spell = [new Animation(AM.getAsset("./img/explosion_transparent.png"), 0 , 0, 64, 64, 5, 0.05, 23, false)];
    this.id = id - 1;
    this.board = board;
    this.game = game;
    this.x = x - 32;
    this.y = y - 32;
    this.damage = id * 5;
    this.animation = this.spell[this.id];
    this.radius = 17;
    this.done = false;
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
        	this.game.entities[i].removeFromWorld = true;
            break;
        }
        //check the target
        if(ent instanceof Magician) {
            //check to see if it is within range 
            if(this.collideRect(ent)) {
            	ent.health -= this.damage;
            	if(ent.health <= 0) {
            		ent.isAlive = false;
            		this.game.entities[i].removeFromWorld = true;
            		BOARD_CONSTANT.MONEY += 5;
        			document.getElementById('money').innerHTML = BOARD_CONSTANT.MONEY;	
            	}
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
		case 0: this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1); break;
		case 1: this.animation.drawFrame(this.game.clockTick, ctx, this.x - 7, this.y - 50, 0.7); break;
		case 2: this.animation.drawFrame(this.game.clockTick, ctx, this.x - 11, this.y - 50, 0.2); break;
		default: console.log("spell");
	}
    Entity.prototype.draw.call(this);
}
