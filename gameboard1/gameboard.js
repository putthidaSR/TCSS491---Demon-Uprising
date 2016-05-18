function GameBoard(game, map) {
    this.game = game;
    this.map = map;
    this.removeFromWorld = false;
    this.startXArray = [];
    this.startYArray = [];
    this.humanList = [];
    this.startx = null;
    this.starty = null;
    this.clockTick = 0;
    this.setState(7);
}

GameBoard.prototype = new Entity();
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.update = function () {
    
    Entity.prototype.update.call(this);
    this.clockTick++;
    if(this.clockTick > Math.random() * 1000 + 100 && this.humanList.length > 0) {
    	this.game.addEntity(this.humanList.pop());
        this.clockTick = 0;
    }
    
}

GameBoard.prototype.draw = function (ctx) {
}

GameBoard.prototype.getStart = function () {
    var start = Math.floor(Math.random() * this.startXArray.length);
    this.startx = this.startXArray[start] * GAME_CONSTANT.BLOCK_SIZE;
    this.starty = this.startYArray[start] * GAME_CONSTANT.BLOCK_SIZE;
    return {x: this.startx, y: this.starty, nextDir: "a"};

}

GameBoard.prototype.setState = function (level) {
    for(var row = 0; row < this.map.length; row++) {
	    for(var col = 0; col < this.map[row].length; col++) {
	        if(this.map[row][col] == "s") {
                this.startXArray.push(col);
                this.startYArray.push(row);
	        } else if(this.map[row][col] == "r" || this.map[row][col] == "s" || this.map[row][col] == "w") {
	        }
	    }
	}
    for(var populated = 0; populated < level; populated++) {
        this.humanList.push(new Magician(this.game, this, AM.getAsset("./img/magician.png"), 
			AM.getAsset("./img/magician2.png")));
    }
}

GameBoard.prototype.getNextStep = function (x, y, nextDir) {
    var xpostion = x / GAME_CONSTANT.BLOCK_SIZE;
    var ypostion = y / GAME_CONSTANT.BLOCK_SIZE; 
    if(xpostion == 0) {
        ypostion++;
    } else if (ypostion == 0) {
        xpostion++;
    }
    if(nextDir == "r") {
        ypostion++;
    }
    return {x: xpostion * GAME_CONSTANT.BLOCK_SIZE, y: ypostion * GAME_CONSTANT.BLOCK_SIZE, nextDir: this.map[xpostion][ypostion]};
}
