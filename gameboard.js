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
};

var BOARD_CONSTANT = {
    MONEY: 100,
    //this is used to figure out which 
    //class of tower to add when mouse is clicked
//    TOWER_CLASSES: [],
//    TOWERS: [],
    TOWER_COST: [0, 25, 50 ,75],
    //tower type selector.
    CURRENTTOWER: 0,
    HEALTH: 10,
    /*//FPS = 30,
    //baseSpeed = 4*rectWidth/FPS,
    mouse, //mouse x and y for drawing range
    //borders for attacker's path
    leftBorder = maxWidth/6,
    rightBorder = maxWidth*5/6,
    //vertical borders:
    firstBorder = maxWidth/4,
    secondBorder = maxWidth/2,
    thirdBorder = maxWidth*3/4,
    //points/statistics
    attackerPoints = 0,
    stopped = 0,
    //counter for when to add enemy units
    addEnemyTimer = 60,
    money = 250,
    moneyIncrement = 5;*/
};

function GameBoard(game, map) {
    this.game = game;
    this.map = map;
    this.removeFromWorld = false;
    this.startXArray = [];
    this.startYArray = [];
    this.humanList = [];
    this.clockTick = 0;
    this.setState(30);
    this.fireballActivated = false;
    this.lastCor;
}

GameBoard.prototype = new Entity();
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.update = function () {
    Entity.prototype.update.call(this);
    this.clockTick++;
    //adding tower
    if(this.game.click) {
    	var xPos = Math.floor(this.game.position.x / GAME_CONSTANT.BLOCK_SIZE);
        var yPos = Math.floor(this.game.position.y / GAME_CONSTANT.BLOCK_SIZE);
    	if(BOARD_CONSTANT.CURRENTTOWER > 0) {
    		
	        if(this.towerAllowed(xPos, yPos)) {
	        	//change the map to tower
	        	MAP.FIRSTMAP[yPos] = MAP.FIRSTMAP[yPos].substring(0, xPos) + "t" 
	        		+ MAP.FIRSTMAP[yPos].substring(xPos + 1, MAP.FIRSTMAP[yPos].length);
	        	//add the tower to the entity
	        	this.game.addEntity(new Tower(this.game, this, xPos, yPos, BOARD_CONSTANT.CURRENTTOWER));
	        	//money subtraction
	            BOARD_CONSTANT.MONEY -= BOARD_CONSTANT.TOWER_COST[BOARD_CONSTANT.CURRENTTOWER];
	          //update money when adding tower
	            document.getElementById('money').innerHTML = BOARD_CONSTANT.MONEY;
	            BOARD_CONSTANT.CURRENTTOWER = 0;
	        }
    	}
        this.game.click = false;
    }
        
    //adding enemy
    if(this.clockTick > Math.random() * 3000 + 100 && this.humanList.length > 0) {
    	this.game.addEntity(this.humanList.pop());
        this.clockTick = 0;
    }
    
    
    //fireball
    /*
    if(this.game.click) {
    	this.fireballActivated = true;
        console.log("fireball2");
    } else if(this.game.two) {
    	this.fireballActivated = false;
    }
    if(this.fireballActivated) {
        var position = this.game.position;
        //console.log(position);
        this.game.addEntity(new Spell(gameEngine, AM.getAsset("./img/fireball_0.png"), 0, 0));
        this.game.click = false;
    }*/
}

GameBoard.prototype.draw = function (ctx) {
	if(this.game.mouse != null) {
		this.lastCor = this.game.mouse;
	}
	if(BOARD_CONSTANT.CURRENTTOWER > 0 && this.lastCor != null) {
		var xPos = Math.floor(this.lastCor.x / GAME_CONSTANT.BLOCK_SIZE);
        var yPos = Math.floor(this.lastCor.y / GAME_CONSTANT.BLOCK_SIZE);
		//console.log(this.map[yPos][xPos]);
		if(this.map[yPos][xPos] == " ") {
			ctx.beginPath();
	        ctx.fillStyle = "rgba(155, 155, 155, 0.55)";
	        ctx.arc(this.lastCor.x, this.lastCor.y, 
	        		BOARD_CONSTANT.TOWER_COST[BOARD_CONSTANT.CURRENTTOWER] * 3, 0, Math.PI * 2, false);
	        ctx.fill();
	        ctx.closePath();
		} else {
			ctx.beginPath();
	        ctx.fillStyle = "rgba(255, 0, 0, 0.55)";
	        ctx.arc(this.lastCor.x, this.lastCor.y, 
	        		BOARD_CONSTANT.TOWER_COST[BOARD_CONSTANT.CURRENTTOWER] * 3, 0, Math.PI * 2, false);
	        ctx.fill();
	        ctx.closePath();
		}
	}
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
	this.humanList.push(new Human6(this.game, this, AM.getAsset("./img/human6walkback.png"), 
    			AM.getAsset("./img/human6walkfront.png"), AM.getAsset("./img/human6walkleft.png"),
    			AM.getAsset("./img/human6walkright.png")));
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

//see if tower can be built here:
//starts at top of page
GameBoard.prototype.towerAllowed = function(x,y) {
    var allowed = true;
    //console.log("x " + x + " y: " + y);
    if(x >= 34 || y >= 24) {
    	return false;
    }
	if (BOARD_CONSTANT.MONEY < BOARD_CONSTANT.TOWER_COST[BOARD_CONSTANT.CURRENTTOWER]) { //can afford tower?
        allowed = false;
    } else {      
        if(this.map[y][x] != " ") {
            allowed = false;
        }
    }
	return allowed;
}
