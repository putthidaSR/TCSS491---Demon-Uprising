function Background(game) {
    this.x = 0;
    this.y = 0;
    this.map = MAP.FIRSTMAP;
    this.game = game;
    this.ctx = game.ctx;
    this.grass = new Animation(AM.getAsset("./img/tileSheet1.png"), GAME_CONSTANT.BLOCK_GRASS_X, 
    		GAME_CONSTANT.BLOCK_GRASS_Y,GAME_CONSTANT.BLOCK_SIZE, GAME_CONSTANT.BLOCK_SIZE, 
    		GAME_CONSTANT.BLOCK_SHEETWIDTH, GAME_CONSTANT.BLOCK_FRAMEDURATION, GAME_CONSTANT.BLOCK_FRAMES, 
    		GAME_CONSTANT.BLOCK_LOOP);
    this.tallgrass = new Animation(AM.getAsset("./img/tileSheet1.png"), GAME_CONSTANT.BLOCK_TALLGRASS_X, 
    		GAME_CONSTANT.BLOCK_TALLGRASS_Y,GAME_CONSTANT.BLOCK_SIZE, GAME_CONSTANT.BLOCK_SIZE, 
    		GAME_CONSTANT.BLOCK_SHEETWIDTH, GAME_CONSTANT.BLOCK_FRAMEDURATION, GAME_CONSTANT.BLOCK_FRAMES, 
    		GAME_CONSTANT.BLOCK_LOOP);
    this.flower = new Animation(AM.getAsset("./img/tileSheet1.png"), GAME_CONSTANT.BLOCK_FLOWER_X, 
    		GAME_CONSTANT.BLOCK_FLOWER_Y,GAME_CONSTANT.BLOCK_SIZE, GAME_CONSTANT.BLOCK_SIZE, 
    		GAME_CONSTANT.BLOCK_SHEETWIDTH, GAME_CONSTANT.BLOCK_FRAMEDURATION, GAME_CONSTANT.BLOCK_FRAMES, 
    		GAME_CONSTANT.BLOCK_LOOP);
    this.darkgrass = new Animation(AM.getAsset("./img/tileSheet1.png"), GAME_CONSTANT.BLOCK_DARKGRASS_X, 
    		GAME_CONSTANT.BLOCK_DARKGRASS_Y,GAME_CONSTANT.BLOCK_SIZE, GAME_CONSTANT.BLOCK_SIZE, 
    		GAME_CONSTANT.BLOCK_SHEETWIDTH, GAME_CONSTANT.BLOCK_FRAMEDURATION, GAME_CONSTANT.BLOCK_FRAMES, 
    		GAME_CONSTANT.BLOCK_LOOP);
    this.lava = new Animation(AM.getAsset("./img/tileSheet1.png"), GAME_CONSTANT.BLOCK_FIRE_X, 
    		GAME_CONSTANT.BLOCK_FIRE_Y,GAME_CONSTANT.BLOCK_SIZE, GAME_CONSTANT.BLOCK_SIZE, 
    		GAME_CONSTANT.BLOCK_SHEETWIDTH, GAME_CONSTANT.BLOCK_FRAMEDURATION, GAME_CONSTANT.BLOCK_FRAMES, 
    		GAME_CONSTANT.BLOCK_LOOP);
    this.road = new Animation(AM.getAsset("./img/tileSheet.jpg"),GAME_CONSTANT.BLOCK_ROAD_X, 
    		GAME_CONSTANT.BLOCK_ROAD_Y, GAME_CONSTANT.BLOCK_SIZE, GAME_CONSTANT.BLOCK_SIZE, 
    		GAME_CONSTANT.BLOCK_SHEETWIDTH, GAME_CONSTANT.BLOCK_FRAMEDURATION, GAME_CONSTANT.BLOCK_FRAMES, 
    		GAME_CONSTANT.BLOCK_LOOP)
    
    this.treeA = new Animation(AM.getAsset("./img/tree1.png"),GAME_CONSTANT.BLOCK_TREE_X, 
    		GAME_CONSTANT.BLOCK_TREE_Y, GAME_CONSTANT.BLOCK_SIZE, GAME_CONSTANT.BLOCK_SIZE, 
    		GAME_CONSTANT.BLOCK_SHEETWIDTH, GAME_CONSTANT.BLOCK_FRAMEDURATION, GAME_CONSTANT.BLOCK_FRAMES, 
    		GAME_CONSTANT.BLOCK_LOOP)
    
    this.treeB = new Animation(AM.getAsset("./img/tree1.png"),GAME_CONSTANT.BLOCK_TREE_X, 
    		GAME_CONSTANT.BLOCK_TREE_Y, GAME_CONSTANT.BLOCK_SIZE, GAME_CONSTANT.BLOCK_SIZE, 
    		GAME_CONSTANT.BLOCK_SHEETWIDTH, GAME_CONSTANT.BLOCK_FRAMEDURATION, GAME_CONSTANT.BLOCK_FRAMES, 
    		GAME_CONSTANT.BLOCK_LOOP)
    
};

Background.prototype = new Entity();
Background.prototype.constructor = Background;

//draw the background
Background.prototype.draw = function (ctx) {
	//set the map background
	for(var row = 0; row < this.map.length; row++) {
	    for(var col = 0; col < this.map[row].length; col++) {
	    	//empty space
	        if(this.map[row][col] == " " || this.map[row][col] == "t") {
                if(BOARD_CONSTANT.LEVEL === 1) {
                    this.flower.drawFrame(this.game.clockTick, ctx, 
	        			this.x + col * GAME_CONSTANT.BLOCK_SIZE, 
	        			this.y + row * GAME_CONSTANT.BLOCK_SIZE)
                } else if (BOARD_CONSTANT.LEVEL === 2) {
                    this.grass.drawFrame(this.game.clockTick, ctx, 
	        			this.x + col * GAME_CONSTANT.BLOCK_SIZE, 
	        			this.y + row * GAME_CONSTANT.BLOCK_SIZE)
                } else if (BOARD_CONSTANT.LEVEL === 3) {
                    this.tallgrass.drawFrame(this.game.clockTick, ctx, 
	        			this.x + col * GAME_CONSTANT.BLOCK_SIZE, 
	        			this.y + row * GAME_CONSTANT.BLOCK_SIZE)
                } else if (BOARD_CONSTANT.LEVEL === 4) {
                    this.darkgrass.drawFrame(this.game.clockTick, ctx, 
	        			this.x + col * GAME_CONSTANT.BLOCK_SIZE, 
	        			this.y + row * GAME_CONSTANT.BLOCK_SIZE)
                } else if (BOARD_CONSTANT.LEVEL === 5) {
                    this.lava.drawFrame(this.game.clockTick, ctx, 
	        			this.x + col * GAME_CONSTANT.BLOCK_SIZE, 
	        			this.y + row * GAME_CONSTANT.BLOCK_SIZE);
                }
	        	
        	//road
	        } else if(this.map[row][col] == "r" || this.map[row][col] == "s" || this.map[row][col] == "l" 
	        	|| this.map[row][col] == "u" || this.map[row][col] == "d" || this.map[row][col] == "e"
                || this.map[row][col] == "m") {
	        	this.road.drawFrame(this.game.clockTick, ctx, 
	        			this.x + col * GAME_CONSTANT.BLOCK_SIZE, 
	        			this.y + row * GAME_CONSTANT.BLOCK_SIZE);
	        }
	        
	    }
	}
	Entity.prototype.draw.call(this);
};

//update the background based on the level
Background.prototype.update = function () {
    switch(BOARD_CONSTANT.LEVEL) {
        case 1: this.map = MAP.FIRSTMAP; break;
        case 2: this.map = MAP.SECONDMAP; break;
        case 3: this.map = MAP.THIRDMAP; break;
        case 4: this.map = MAP.FOURTHMAP; break;
        case 5: this.map = MAP.FIFTHMAP; break;
        default: console.log("no map");
    }
	 Entity.prototype.update.call(this);
};
