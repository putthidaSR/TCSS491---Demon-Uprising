function Spell(game, board, x, y, id) {
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
                 switch(this.id) {
	        		case 0: ent.health -= this.damage; break;
	        		case 1: ent.speed = 0.5; break;
	        		case 2: ent.health -= this.damage * 3; ent.speed = 2; break;
	        		default: console.log("spell damage");
            	}
            	
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
}
