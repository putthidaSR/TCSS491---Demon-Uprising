var AM = new AssetManager();
var gameEngine = new GameEngine();


AM.queueDownload("./img/titleScreen1.jpg");
AM.queueDownload("./img/textbox.png");
AM.queueDownload("./img/health_bar.png");
AM.queueDownload("./img/magician.png");
AM.queueDownload("./img/gameboard.jpg");
AM.queueDownload("./img/walk1.png");
AM.queueDownload("./img/Animal.png");
AM.queueDownload("./img/hero2.png");
AM.queueDownload("./img/demon.png");
AM.queueDownload("./img/knightFT.png");
AM.queueDownload("./img/demon1.png");
AM.queueDownload("./img/explosion.png");
AM.queueDownload("./img/Magician1.png");
AM.queueDownload("./img/snowball.png");
AM.queueDownload("./img/light.png");
AM.queueDownload("./img/fireball_0.png");
AM.queueDownload("./img/coin.png");
AM.queueDownload("./img/heart.png");
AM.queueDownload("./img/bgtest2.jpg");

AM.queueDownload("./img/tower1.png");
AM.queueDownload("./img/tower2.png");
AM.queueDownload("./img/tower3.png");


AM.downloadAll(function () {
	var canvas = document.getElementById("gameWorld");
	var ctx = canvas.getContext("2d");

	var gameEngine = new GameEngine();
	gameEngine.init(ctx);
	gameEngine.start();

	ani(gameEngine);
	//gameEngine.titleScreen();

	//Generate the monster every 500 miliseconds
	var generate = window.setInterval(spawn, 500);    

	var monsterNum = 0;
	function spawn() {
		gameEngine.addEntity(new Human1(gameEngine, AM.getAsset("./img/walk1.png")));
		monsterNum += 1;

//		//Monster = 10
//		if (monsterNum === 10) {
//			window.clearInterval(generate);
//			lvl++;
//		}
	}

//	//Respawn monster
//	var level = window.setInterval(repeatSpawn, 8000);
//	var lvl = 0;
//
//	function repeatSpawn() {
//		generate = window.setInterval(spawn, 500);
//		monsterNum = 0;       
//
//		if (lvl === 1) {
//			window.clearInterval(level);
//		}
//	}
//
//
//
//	if (lvl === 2) window.clearTimeout(repeat);

//	var sm = makeSceneManager(gameEngine);
//gameEngine.sceneManager = sm;
	//gameEngine.entities.push(sm);

	//ani();
//	gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/gameboard.jpg")));
//	gameEngine.addEntity(new Magician(gameEngine, AM.getAsset("./img/magician.png")));
//	gameEngine.addEntity(new Human1(gameEngine, AM.getAsset("./img/walk1.png")));
//	gameEngine.addEntity(new Human1(gameEngine, AM.getAsset("./img/health_bar.png")));
//	gameEngine.addEntity(new Bird(gameEngine, AM.getAsset("./img/Animal.png")));
//	gameEngine.addEntity(new Hero(gameEngine, AM.getAsset("./img/hero2.png")));
//	gameEngine.addEntity(new Demon(gameEngine, AM.getAsset("./img/demon.png")));
//	gameEngine.addEntity(new Knight(gameEngine, AM.getAsset("./img/knightFT.png")));
//	gameEngine.addEntity(new Demon1(gameEngine, AM.getAsset("./img/demon1.png")));
//	gameEngine.addEntity(new Magician1(gameEngine, AM.getAsset("./img/Magician1.png")));
//	gameEngine.addEntity(new FireBall(gameEngine, AM.getAsset("./img/explosion.png")));
//	gameEngine.addEntity(new Light(gameEngine, AM.getAsset("./img/light.png")));
//	gameEngine.addEntity(new Snowball(gameEngine, AM.getAsset("./img/snowball.png")));
//	gameEngine.addEntity(new Spell(gameEngine, AM.getAsset("./img/fireball_0.png")));
//	gameEngine.addEntity(new Coin(gameEngine, AM.getAsset("./img/coin.png")));
//	gameEngine.addEntity(new Heart(gameEngine, AM.getAsset("./img/heart.png")));

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
var CANVAS_HEIGHT = 600;

var startGame = function (gameEngine) {

	var background = new Background(gameEngine, AM.getAsset("./img/titleScreen1.png"), 1000, 600);


}

