function WinGame(game, spritesheet) {
    this.game = game;
    this.win = new Animation(spritesheet, 0, 0, 500, 200, 1, 0.30, 1, true);
    //Entity.call(this, game, 0, 0);
};

WinGame.prototype = new Entity();
WinGame.prototype.constructor = WinGame;

WinGame.prototype.update = function () {
    Entity.prototype.update.call(this);
    //checking if the health of the user went below zero
};

WinGame.prototype.draw = function (ctx) {
	//draw the image when the game is over
	
	this.win.drawFrame(this.game.clockTick, ctx, 300, 250);
	Entity.prototype.draw.call(this)  
};