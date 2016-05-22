function GameOver(game, spritesheet) {
    //this.gameOver = new Animation(spritesheet, 333, 289, 620, 120, 1, 0.30, 1, true);
    this.game = game;
    this.spritesheet = spritesheet;
    //Entity.call(this, game, 0, 0);
};

GameOver.prototype = new Entity();
GameOver.prototype.constructor = GameOver;

GameOver.prototype.update = function () {
	
    Entity.prototype.update.call(this);
    if(BOARD_CONSTANT.HEALTH <= 0) {
    	game_over = true;
    }
};

GameOver.prototype.draw = function (ctx) {
	if(game_over) {
		this.gameOver = new Animation(this.spritesheet, 333, 289, 620, 120, 1, 0.30, 1, true);
		this.gameOver.drawFrame(this.game.clockTick, ctx, 200, 300, 0.6);
		Entity.prototype.draw.call(this)
	}   
};