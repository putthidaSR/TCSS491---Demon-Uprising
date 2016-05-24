var AM = new AssetManager();
var gameEngine = new GameEngine();
var game_over = false;

var MAP = {
	FIRSTMAP: [
"     sssss                        ",
"     ddddd                        ",
"     ddddd                        ",
"     ddddd                        ",
"     ddddd                        ",
"     ddddrrrrrrrrrrrrrrrd         ",
"     ddrrrrrrrrrrrrrrrddd         ",
"     rrrrrrrrrrrrrrrddddd         ",
"                    ddddd         ",
"                    ddddd         ",
"                    ddddd         ",
"                    ddddd         ",
"                    ddddd         ",
"                    ddddd         ",
"                    ddddd         ",
"          dlllllllllldddd         ",
"          dddlllllllllldd         ",
"          dddddllllllllll         ",
"          ddddd                   ",
"          ddddd                   ",
"          ddddd                   ",
"          ddddd                   ",
"          eeeee                   ",
"          eeeee                   ",
    ],
};

/*
 * A helper function to compute the distance between two objects.
 */
 function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function changeTower(n) {
	BOARD_CONSTANT.CURRENTTOWER = n;
}

/*
 * Downloadn the picture from the file.
 */
//attack
AM.queueDownload("./img/fireball_0.png");
//AM.queueDownload("./img/explosion.png");
//AM.queueDownload("./img/snowball.png");
//AM.queueDownload("./img/light.png");

//other
AM.queueDownload("./img/titleScreen1.jpg");
AM.queueDownload("./img/textbox.png");
AM.queueDownload("./img/health_bar.png");
AM.queueDownload("./img/coin.png");
AM.queueDownload("./img/heart.png");
AM.queueDownload("./img/tileSheet.jpg");
AM.queueDownload("./img/Game_Over.png");
//AM.queueDownload("./img/gameboard.jpg");

//agents
AM.queueDownload("./img/magician.png");
AM.queueDownload("./img/magician2.png");

//tower
AM.queueDownload("./img/tower1.png");
AM.queueDownload("./img/tower2.png");
AM.queueDownload("./img/tower3.png");

//tree
AM.queueDownload("./img/tree1.png");
AM.queueDownload("./img/tree2.png");


/*
 * This is where the game start.
 */
 AM.downloadAll(function () {
	var canvas = document.getElementById("gameWorld");
	var ctx = canvas.getContext("2d");

	var gameEngine = new GameEngine();
	gameEngine.init(ctx);
	gameEngine.start();
    
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/tileSheet.jpg"), MAP.FIRSTMAP));
	gameEngine.addEntity(new GameBoard(gameEngine, MAP.FIRSTMAP));   
    gameEngine.addEntity(new Spell(gameEngine, AM.getAsset("./img/fireball_0.png")));
    gameEngine.addEntity(new GameOver(gameEngine, AM.getAsset("./img/Game_Over.png")));
    

	//ani(gameEngine);

	//Generate the monster every 500 miliseconds
	//var generate = window.setInterval(spawn, 500);    

	/*var monsterNum = 0;
	function spawn() {
		gameEngine.addEntity(new Human1(gameEngine, AM.getAsset("./img/walk1.png")));
		monsterNum += 1;

	}*/

	console.log("All Done!");
});

var ani = function(gameEngine) {
	
	gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/bgtest2.jpg")));

	//gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/gameboard.jpg")));
	gameEngine.addEntity(new Magician(gameEngine, AM.getAsset("./img/magician.png")));
	gameEngine.addEntity(new Human1(gameEngine, AM.getAsset("./img/walk1.png")));
	gameEngine.addEntity(new Human1(gameEngine, AM.getAsset("./img/health_bar.png")));
	gameEngine.addEntity(new Bird(gameEngine, AM.getAsset("./img/Animal.png")));
	//gameEngine.addEntity(new Hero(gameEngine, AM.getAsset("./img/hero2.png")));
	gameEngine.addEntity(new Demon(gameEngine, AM.getAsset("./img/demon.png")));
	//gameEngine.addEntity(new Knight(gameEngine, AM.getAsset("./img/knightFT.png")));
	gameEngine.addEntity(new Demon1(gameEngine, AM.getAsset("./img/demon1.png")));
	gameEngine.addEntity(new Magician1(gameEngine, AM.getAsset("./img/Magician1.png")));
	gameEngine.addEntity(new FireBall(gameEngine, AM.getAsset("./img/explosion.png")));
	gameEngine.addEntity(new Light(gameEngine, AM.getAsset("./img/light.png")));
	gameEngine.addEntity(new Snowball(gameEngine, AM.getAsset("./img/snowball.png")));
	gameEngine.addEntity(new Spell(gameEngine, AM.getAsset("./img/fireball_0.png")));
	gameEngine.addEntity(new Coin(gameEngine, AM.getAsset("./img/coin.png")));
	gameEngine.addEntity(new Heart(gameEngine, AM.getAsset("./img/heart.png")));
	
	//Tower Object
	gameEngine.addEntity(new TowerObject1(gameEngine, AM.getAsset("./img/tower1.png")));
	//gameEngine.addEntity(new TowerObject2(gameEngine, AM.getAsset("./img/tower2.png")));
	//gameEngine.addEntity(new TowerObject3(gameEngine, AM.getAsset("./img/tower3.png")));

}

var CANVAS_WIDTH = 1000;
var CANVAS_HEIGHT = 700;

var startGame = function (gameEngine) {

	var background = new Background(gameEngine, AM.getAsset("./img/titleScreen1.png"), 1000, 600);


}

//Coin
function Coin(game, spritesheet) {
	this.animation = new Animation(spritesheet, 100, 100, 100, 0.08, 10, true, 0.4);
	this.speed = 80;
	this.ctx = game.ctx;
	Entity.call(this, game, 960, 20);

}

Coin.prototype = new Entity();
Coin.prototype.constructor = Coin;

Coin.prototype.update = function () {
	Entity.prototype.update.call(this);
}

Coin.prototype.draw = function () {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	Entity.prototype.draw.call(this);

}

//heart
function Heart(game, spritesheet) {
	this.animation = new Animation(spritesheet, 300, 250, 300, 0.08, 1, true, 0.12);
	this.speed = 80;
	this.ctx = game.ctx;
	Entity.call(this, game, 910, 23);
}

Heart.prototype = new Entity();
Heart.prototype.constructor = Heart;

Heart.prototype.update = function () {
	Entity.prototype.update.call(this);
}


Heart.prototype.draw = function () {
	//this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	//Entity.prototype.draw.call(this);
	//ctx.drawImage(AM.getAsset("./img/heart.png"), 900, 100);
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	Entity.prototype.draw.call(this);
}
