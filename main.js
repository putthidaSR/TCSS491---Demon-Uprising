var AM = new AssetManager();
var gameEngine = new GameEngine();
var CANVAS_WIDTH = 1000;
var CANVAS_HEIGHT = 700;

//The varibable for all the map
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
"          eeeee                   ",
"          eemee                   ",
"          eeeee                   ",
    ],
    SECONDMAP: [
"     sssss                        ",
"     ddddd                        ",
"     ddddd                        ",
"     ddddd                        ",
"     ddddd                        ",
"     ddddrrrrrrrrrrrrrrrd         ",
"     dddrrrrrrrrrrrrrrddd         ",
"     ddrrrrrrrrrrrrrddddd         ",
"     ddddd          ddddd         ",
"     drddd          ddddd         ",
"     ddddd          ddddd         ",
"     ddddd          ddddd         ",
"     ddddd          ddddd         ",
"     ddddd          ddddd         ",
"     ddddd          ddddd         ",
"     ddrrrrrrrrrrrrrddddd         ",
"     ddrrrrrrrrrrrrrddddd         ",
"     rrrrrrrrrrrrrrrddddd         ",
"                    ddddd         ",
"                    ddddd         ",
"                    ddddd         ",
"                    eeeee         ",
"                    eemee         ",
"                    eeeee         ",
    ],
    THIRDMAP: [
"     sss                 sss      ",
"     ddd                 ddd      ",
"     ddd                 ddd      ",
"     ddd                 ddd      ",
"     ddd                 ddd      ",
"     ddd                 ddd      ",
"     ddd                 ddd      ",
"     ddd                 ddd      ",
"     ddd                 ddd      ",
"     ddd                 ddd      ",
"     ddrrrrrrrrdlllllllllldd      ",
"     drrrrrrrrdddlllllllllld      ",
"     rrrrrrrrdddddllllllllll      ",
"             ddddd                ",
"             ddddd                ",
"             ddddd                ",
"             ddddd                ",
"             ddddd                ",
"             ddddd                ",
"             ddddd                ",
"             ddddd                ",
"             eeeee                ",
"             eemee                ",
"             eeeee                ",
    ],
    FOURTHMAP: [
"                         sss      ",
"                         ddd      ",
"                         ddd      ",
"srrrrrrrrrrrdllllllllllllddd      ",
"srrrrrrrrrrdddlllllllllllldd      ",
"srrrrrrrrrdddddllllllllllddd      ",
"          ddddd          ddd      ",
"          ddddd          ddd      ",
"          ddddd          ddd      ",
"          ddddd          ddd      ",
"          ddddd          ddd      ",
"          dddddlllllllllllllllllls",
"          dddddlllllllllllllllllls",
"          dddddlllllllllllllllllls",
"          ddddd                   ",
"          ddddd                   ",
"          ddddd                   ",
"          ddddd                   ",
"          ddddd                   ",
"          ddddd                   ",
"          ddddd                   ",
"          eeeee                   ",
"          eemee                   ",
"          eeeee                   ",
    ],
    FIFTHMAP: [
"         ss              ss       ",
"         dd              dd       ",
"         dd              dd       ",
"         drrrrrd         dd       ",
"         rrrrrdd         dd       ",
"srrrrrd       dd         dd       ",
"srrrrdd       dd         dd       ",
"     dd       dd         dd       ",
"     dd       dddllllllllld  dllls",
"     dd       ddddlllllllll  ddlls",
"     dd       ddddd          dd   ",
"     dd       ddddd          dd   ",
"     drrrrrrrrrddddllllllllllld   ",
"     rrrrrrrrrdddddllllllllllll   ",
"              ddddd               ",
"              ddddd               ",
"              ddddd               ",
"              ddddd               ",
"              ddddd               ",
"              ddddd               ",
"              ddddd               ",
"              eeeee               ",
"              eemee               ",
"              eeeee               ",
    ],
};

//Constant for the board
var BOARD_CONSTANT = {
    //current money
    MONEY: 100,
    //cost of the tower
    TOWER_COST: [0, 50, 100 ,150],
    //range of the tower
    TOWER_RANGE: [0, 100, 150 ,200],
    //firerate of the tower
    TOWER_FPS: [0, 40, 80 ,150],
    //tower damage
    TOWER_DAMAGE: [0, 1, 3, 5],
    //tower type selector.
    CURRENTTOWER: 0,
    //current spell
    CURRENTSPELL: 0,
    //spell activated
    SPELL_ACTIVATED: false,
    //User's health
    HEALTH: 10,
    //current level
    LEVEL: 1,
    //gameover?
    GAME_OVER: false,
    //when magician died
    FINISH: false,
};

/*
 * A helper function to compute the distance between two objects.
 */
 function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

 /*
  * A function to detemine which tower the user had selected.
  */
 function changeTower(n) {
	BOARD_CONSTANT.CURRENTTOWER = n;
    BOARD_CONSTANT.CURRENTSPELL = 0;
}

 /*
  * A function to detemine which spell the user had selected.
  */
 function changeSpell(n) {
	BOARD_CONSTANT.CURRENTSPELL = n;
    BOARD_CONSTANT.CURRENTTOWER = 0;
}

/*
 * Downloadn the picture from the file.
 */
//attack
AM.queueDownload("./img/explosion_transparent.png");
AM.queueDownload("./img/snowball.png");
AM.queueDownload("./img/light.png");

//other
AM.queueDownload("./img/titleScreen1.jpg");
AM.queueDownload("./img/textbox.png");
AM.queueDownload("./img/health_bar.png");
AM.queueDownload("./img/coin.png");
AM.queueDownload("./img/heart.png");
AM.queueDownload("./img/tileSheet.jpg");
AM.queueDownload("./img/tileSheet1.png");
AM.queueDownload("./img/Game_Over.png");
AM.queueDownload("./img/winwave.png");

//agents
AM.queueDownload("./img/magician.png");
AM.queueDownload("./img/magician2.png");

AM.queueDownload("./img/human1left.png");
AM.queueDownload("./img/human1right.png");

//Human 6
AM.queueDownload("./img/human6walkback.png");
AM.queueDownload("./img/human6walkfront.png");
AM.queueDownload("./img/human6walkleft.png");
AM.queueDownload("./img/human6walkright.png");

//Human 9
AM.queueDownload("./img/human9back.png");
AM.queueDownload("./img/human9front.png");
AM.queueDownload("./img/human9left.png");
AM.queueDownload("./img/human9right.png");

//Human 10
AM.queueDownload("./img/human10back.png");
AM.queueDownload("./img/human10front.png");
AM.queueDownload("./img/human10left.png");
AM.queueDownload("./img/human10right.png");

//Human 11
AM.queueDownload("./img/human11back.png");
AM.queueDownload("./img/human11front.png");
AM.queueDownload("./img/human11left.png");
AM.queueDownload("./img/human11right.png");

//Human 12
AM.queueDownload("./img/human12back.png");
AM.queueDownload("./img/human12front.png");
AM.queueDownload("./img/human12left.png");
AM.queueDownload("./img/human12right.png");

//Human 14
AM.queueDownload("./img/human14back.png");
AM.queueDownload("./img/human14front.png");
AM.queueDownload("./img/human14left.png");
AM.queueDownload("./img/human14right.png");

//tower
AM.queueDownload("./img/tower1.png");
AM.queueDownload("./img/tower2.png");
AM.queueDownload("./img/tower3.png");
AM.queueDownload("./img/arrow1.png");
//bullet
AM.queueDownload("./img/bulletthunder.png");
AM.queueDownload("./img/bulletfire.png");
AM.queueDownload("./img/bulletsnow.png");


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
    
    gameEngine.addEntity(new Background(gameEngine));
    //gameEngine.addEntity(new GameOver(gameEngine, AM.getAsset("./img/Game_Over.png")));
	gameEngine.addEntity(new GameBoard(gameEngine));   
    

	console.log("All Done!");
});

