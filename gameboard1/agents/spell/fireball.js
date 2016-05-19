function Spell(game, spritesheet) {
    this.animation = new Animation(spritesheet, 210, 7, 26, 63, 1, 0.30, 8, true);
    //this.oppAnimation = new Animation(spritesheet, 9, 252, 63, 60, 8, 0.30, 8, true);
    //this.xOriginal = 400;
    //this.yOriginal = 350;
    //this.xPosition = 400;
    //this.yPosition = 350;
    this.ctx = game.ctx;
    this.fire = false;
    this.game = game;
    Entity.call(this, game, 400, 350);//position where it start
}

Spell.prototype = new Entity();
Spell.prototype.constructor = Magician;

Spell.prototype.update = function () {
	if (this.game.click) {
		this.xPosition = this.game.position.x - (this.game.position.x % 10);
		this.yPosition = this.game.position.y - (this.game.position.y % 10);
		//console.log(this.yOriginal);
		this.xOriginal = this.xPosition;
	    this.yOriginal = 0;
		this.fire = true;
	}
	if(this.xOriginal < this.xPosition) {
		this.x = this.xOriginal;
		this.xOriginal += 5;
	}
	if(this.xOriginal > this.xPosition){
		this.x = this.xOriginal;
		this.xOriginal -= 5;
	} 
	if(this.yOriginal < this.yPosition) {
		this.y = this.yOriginal;
		this.yOriginal += 5;
	}
	if(this.yOriginal > this.yPosition){
		this.y = this.yOriginal;
		this.yOriginal -= 5;
	} 
	if(this.xOriginal == this.xPosition && this.yOriginal == this.yPosition) {
		this.fire = false;
		
	    
	}
	
    Entity.prototype.update.call(this);
}

Spell.prototype.draw = function () {
	if(this.fire) {
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	}
    Entity.prototype.draw.call(this);
}