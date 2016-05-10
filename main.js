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


AM.downloadAll(function () {
	var canvas = document.getElementById("gameWorld");
	var ctx = canvas.getContext("2d");

	var gameEngine = new GameEngine();
	gameEngine.init(ctx);
	gameEngine.start();

	gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/gameboard.jpg")));
	gameEngine.addEntity(new Magician(gameEngine, AM.getAsset("./img/magician.png")));
	gameEngine.addEntity(new Human1(gameEngine, AM.getAsset("./img/walk1.png")));
	gameEngine.addEntity(new Human1(gameEngine, AM.getAsset("./img/health_bar.png")));
	gameEngine.addEntity(new Bird(gameEngine, AM.getAsset("./img/Animal.png")));
	gameEngine.addEntity(new Hero(gameEngine, AM.getAsset("./img/hero2.png")));
	gameEngine.addEntity(new Demon(gameEngine, AM.getAsset("./img/demon.png")));
	gameEngine.addEntity(new Knight(gameEngine, AM.getAsset("./img/knightFT.png")));
	gameEngine.addEntity(new Demon1(gameEngine, AM.getAsset("./img/demon1.png")));
	gameEngine.addEntity(new Magician1(gameEngine, AM.getAsset("./img/Magician1.png")));
	gameEngine.addEntity(new FireBall(gameEngine, AM.getAsset("./img/explosion.png")));
	gameEngine.addEntity(new Light(gameEngine, AM.getAsset("./img/light.png")));
	gameEngine.addEntity(new Snowball(gameEngine, AM.getAsset("./img/snowball.png")));
	gameEngine.addEntity(new Spell(gameEngine, AM.getAsset("./img/fireball_0.png")));

	console.log("All Done!");
});

var CANVAS_WIDTH = 1000;
var CANVAS_HEIGHT = 600;

var makeSceneManager = function (gameEngine) {
   
    var titleScene = new Title(gameEngine);
    var tutorialScene = new Tutorial(gameEngine);
    
    var r1 = createFirstRound(gameEngine); // first round
 
    titleScene.next = r1;
    titleScene.tutorialScene = tutorialScene;
    tutorialScene.next = titleScene;

    return new SceneManager(gameEngine, logoSplash);
};

