function Background(game, spritesheet, map) {
    this.x = 0;
    this.y = 0;
    this.map = map;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.grass = new Animation(AM.getAsset("./img/tileSheet.jpg"), GAME_CONSTANT.BLOCK_GRASS_X, 
    		GAME_CONSTANT.BLOCK_GRASS_Y,GAME_CONSTANT.BLOCK_SIZE, GAME_CONSTANT.BLOCK_SIZE, 
    		GAME_CONSTANT.BLOCK_SHEETWIDTH, GAME_CONSTANT.BLOCK_FRAMEDURATION, GAME_CONSTANT.BLOCK_FRAMES, 
    		GAME_CONSTANT.BLOCK_LOOP);
    this.road = new Animation(AM.getAsset("./img/tileSheet.jpg"),GAME_CONSTANT.BLOCK_ROAD_X, 
    		GAME_CONSTANT.BLOCK_ROAD_Y, GAME_CONSTANT.BLOCK_SIZE, GAME_CONSTANT.BLOCK_SIZE, 
    		GAME_CONSTANT.BLOCK_SHEETWIDTH, GAME_CONSTANT.BLOCK_FRAMEDURATION, GAME_CONSTANT.BLOCK_FRAMES, 
    		GAME_CONSTANT.BLOCK_LOOP)
    //Entity.call(this, game, 350, 350);
};

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.draw = function (ctx) {
	//set the map background
	for(var row = 0; row < this.map.length; row++) {
	    for(var col = 0; col < this.map[row].length; col++) {
	    	//empty space
	        if(this.map[row][col] == " " || this.map[row][col] == "t") {
	        	this.grass.drawFrame(this.game.clockTick, ctx, 
	        			this.x + col * GAME_CONSTANT.BLOCK_SIZE, 
	        			this.y + row * GAME_CONSTANT.BLOCK_SIZE);
        	//road
	        } else if(this.map[row][col] == "r" || this.map[row][col] == "s" || this.map[row][col] == "l" 
	        	|| this.map[row][col] == "u" || this.map[row][col] == "d" || this.map[row][col] == "e") {
	        	this.road.drawFrame(this.game.clockTick, ctx, 
	        			this.x + col * GAME_CONSTANT.BLOCK_SIZE, 
	        			this.y + row * GAME_CONSTANT.BLOCK_SIZE);
	        }
	    }
	}
	Entity.prototype.draw.call(this);
};

Background.prototype.update = function () {
	 Entity.prototype.update.call(this);
};