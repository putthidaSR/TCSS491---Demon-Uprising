function GameOver(game, spritesheet) {
    this.game = game;
    this.spritesheet = spritesheet;
};

GameOver.prototype = new Entity();
GameOver.prototype.constructor = GameOver;

GameOver.prototype.update = function () {
    Entity.prototype.update.call(this);
    //checking if the health of the user went below zero
    if(BOARD_CONSTANT.HEALTH <= 0) {
    	BOARD_CONSTANT.GAME_OVER = true;
    }
};

GameOver.prototype.draw = function (ctx) {
	//draw the image when the game is over
	if(BOARD_CONSTANT.GAME_OVER) {
		this.gameOver = new Animation(this.spritesheet, 333, 289, 620, 120, 1, 0.30, 1, true);
		this.gameOver.drawFrame(this.game.clockTick, ctx, 200, 300, 0.6);
		Entity.prototype.draw.call(this)
	}   
};
