var GAME_CONSTANT = {
    BLOCK_SIZE : 30,
    BLOCK_GRASS_X : 185,
    BLOCK_GRASS_Y : 370,
    BLOCK_ROAD_X : 0,
    BLOCK_ROAD_Y : 92,
    BLOCK_SHEETWIDTH : 1,
    BLOCK_FRAMEDURATION : 0.3,
    BLOCK_FRAMES : 1,
    BLOCK_LOOP: true,
    CANVAS_WIDTH: 1000,
    CANVAS_HEIGHT: 800,
}

function GameBoard(game, map) {
    this.game = game;
    this.map = map;
    this.removeFromWorld = false;
    this.startXArray = [];
    this.startYArray = [];
    this.humanList = [];
    this.clockTick = 0;
    this.setState(10);
    this.fireballActivated = false;
}

GameBoard.prototype = new Entity();
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.update = function () {
    Entity.prototype.update.call(this);
    this.clockTick++;
    if(this.clockTick > Math.random() * 3000 + 100 && this.humanList.length > 0) {
    	this.game.addEntity(this.humanList.pop());
        this.clockTick = 0;
    }
    if(this.game.one) {
    	this.fireballActivated = true;
    } else if(this.game.two) {
    	this.fireballActivated = false;
    }
}

GameBoard.prototype.draw = function (ctx) {
}

GameBoard.prototype.getStart = function () {
	//getting the starting point of the human
    var start = Math.floor(Math.random() * this.startXArray.length);
    return {x: this.startXArray[start] * GAME_CONSTANT.BLOCK_SIZE, 
    	y: this.startYArray[start] * GAME_CONSTANT.BLOCK_SIZE, nextDir: "a"};
}

GameBoard.prototype.setState = function (level) {
	//checking where the starting point is
    for(var row = 0; row < this.map.length; row++) {
	    for(var col = 0; col < this.map[row].length; col++) {
	        if(this.map[row][col] == "s") {
                this.startXArray.push(col);
                this.startYArray.push(row);
	        } else if(this.map[row][col] == "r" || this.map[row][col] == "s" || this.map[row][col] == "w") {
	        }
	    }
	}
    //set how many human are spawning for each level
    for(var populated = 0; populated < level; populated++) {
        this.humanList.push(new Magician(this.game, this, AM.getAsset("./img/magician.png"), 
			AM.getAsset("./img/magician2.png")));
	this.humanList.push(new Human(this.game, this, AM.getAsset("./img/knightwalk.png"), 
        		AM.getAsset("./img/knightrun.png"), AM.getAsset("./img/knightattack.png"),
        		AM.getAsset("./img/knightwalkright.png"), AM.getAsset("./img/knightattackotherdir.png")));
    }
}

GameBoard.prototype.getNextStep = function (x, y, nextDir) {
    var xposition = x / GAME_CONSTANT.BLOCK_SIZE;
    var yposition = y / GAME_CONSTANT.BLOCK_SIZE; 
    if(xposition == 0) {
    	xposition++;
    } else if (yposition == 0) {
    	yposition++;
    } else if(xposition == GAME_CONSTANT.CANVAS_WIDTH) {
    	xposition--;
    }
    switch(nextDir) {
		case "u": yposition--; break;
		case "d": yposition++; break;
		case "l": xposition--; break;
		case "r": xposition++; break;
		case "a": break;
		default: console.log(nextDir);
    }
    //console.log("dir: " + xposition + " y: " + yposition);
    //console.log("dir: " + this.map[yposition][xposition]);
    return {x: xposition * GAME_CONSTANT.BLOCK_SIZE, y: yposition * GAME_CONSTANT.BLOCK_SIZE, 
    	nextDir: this.map[yposition][xposition]};
}
