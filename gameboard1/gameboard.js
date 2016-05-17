function GameBoard(game, map) {
    this.game = game;
    this.map = map;
    this.removeFromWorld = false;
    this.startXArray = [];
    this.startYArray = [];
    this.startx = null;
    this.starty = null;
    this.setState();
}

GameBoard.prototype = new Entity();
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.update = function () {
    
    Entity.prototype.update.call(this);
}

GameBoard.prototype.draw = function (ctx) {
}

GameBoard.prototype.getStart = function () {
    var start = Math.floor(Math.random() * this.startXArray.length);
    this.startx = this.startXArray[start] * GAME_CONSTANT.BLOCK_SIZE;
    this.starty = this.startYArray[start] * GAME_CONSTANT.BLOCK_SIZE;

}

GameBoard.prototype.setState = function () {
    for(var row = 0; row < this.map.length; row++) {
	    for(var col = 0; col < this.map[row].length; col++) {
	        if(this.map[row][col] == "s") {
                this.startXArray.push(col);
                this.startYArray.push(row);
	        } else if(this.map[row][col] == "r" || this.map[row][col] == "s" || this.map[row][col] == "w") {
	        }
	    }
	}
}