//Magician
function Magician(game, spritesheet, spritesheet2, x, y) {
	this.animation = new Animation(spritesheet, 0, 0, 64, 64, 4, 0.15, 16, true);
	this.upAnimation = new Animation(spritesheet, 0, 256, 64, 64, 4, 0.15, 16, true);
	this.leftAnimation = new Animation(spritesheet, 256, 0, 64, 64, 4, 0.15, 16, true);
	this.rightAnimation = new Animation(spritesheet2, 0, 0, 64, 64, 4, 0.15, 16, true);
	this.attackAnimation = new Animation(spritesheet, 256, 256, 64, 64, 4, 0.15, 16, false);
	this.x = x - 16;
	this.y = y - 25;
    this.clocktick = 0;
	Entity.call(this, game, this.x, this.y);//position where it start
}

Magician.prototype = new Entity();
Magician.prototype.constructor = Magician;

Magician.prototype.update = function () {
    if(BOARD_CONSTANT.GAME_OVER) {
        if(this.clocktick > 200) {
            BOARD_CONSTANT.FINISH = true;
        }
        this.clocktick++;
    }
	Entity.prototype.update.call(this);
}

Magician.prototype.draw = function (ctx) {
    if(BOARD_CONSTANT.GAME_OVER) {
        this.attackAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y); 
    } else {
       this.upAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y); 
    }
	Entity.prototype.draw.call(this);
}
