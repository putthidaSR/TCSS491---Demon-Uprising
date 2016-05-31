//constant for the game picture
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
    
    HEALTH_WIDTH : 30,
	HEALTH_HEIGHT : 5,
};

function GameBoard(game) {
    this.game = game;
    this.map = MAP.FIRSTMAP;
    //starting position of the human
    this.startXArray = [];
    this.startYArray = [];
    //the list of human to be added to the board in the level
    this.humanList = [];
    this.clockTick = 0;
    //set the starting level
    this.setState(BOARD_CONSTANT.LEVEL);
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
    		//check to see if the tower is allowed on the map
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
    	} else if(BOARD_CONSTANT.CURRENTSPELL > 0 && !BOARD_CONSTANT.SPELL_ACTIVATED) {
            //add the spell to the entity
            this.game.addEntity(new Spell(this.game, this, this.game.position.x, this.game.position.y, 
            		BOARD_CONSTANT.CURRENTSPELL));
            BOARD_CONSTANT.SPELL_ACTIVATED = true;
        }
        this.game.click = false;
    }
        
    //adding enemy
    if(this.clockTick > Math.random() * 5000/(BOARD_CONSTANT.LEVEL) + 100 && this.humanList.length > 0) {
    	this.game.addEntity(this.humanList.pop());
        this.clockTick = 0;
    }
    
    //check if there are anymore human left on the board
    var check = true;
    for(var i =0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if(ent instanceof Magician2 || ent instanceof Human1 || ent instanceof Human6
        		|| ent instanceof Human9) {
            check = false;
        }
    }
    
    //level up if there is no more human left on the board
    if(check && this.humanList.length < 1) {
        if(BOARD_CONSTANT.LEVEL < 5){
            BOARD_CONSTANT.LEVEL++;
            //update money when adding tower
            BOARD_CONSTANT.MONEY += 100;
            document.getElementById('money').innerHTML = BOARD_CONSTANT.MONEY;
            this.resetMap();
            this.setState(BOARD_CONSTANT.LEVEL);
        } else {
            //win the game
        	this.game.addEntity(new WinGame(this.game, AM.getAsset("./img/winwave.png")));
        }
    }
}

//drawing the tower range for new tower to be placed
GameBoard.prototype.draw = function (ctx) {
	if(this.game.mouse != null) {
		this.lastCor = this.game.mouse;
	}
	if(BOARD_CONSTANT.CURRENTTOWER > 0 && this.lastCor != null) {
		var xPos = Math.floor(this.lastCor.x / GAME_CONSTANT.BLOCK_SIZE);
        var yPos = Math.floor(this.lastCor.y / GAME_CONSTANT.BLOCK_SIZE);
		if(this.map[yPos][xPos] == " ") {
			ctx.beginPath();
	        ctx.fillStyle = "rgba(155, 155, 155, 0.55)";
	        ctx.arc(this.lastCor.x, this.lastCor.y, 
	        		BOARD_CONSTANT.TOWER_RANGE[BOARD_CONSTANT.CURRENTTOWER], 0, Math.PI * 2, false);
	        ctx.fill();
	        ctx.closePath();
		} else {
			//draw a re circle when the player can't place a tower
			ctx.beginPath();
	        ctx.fillStyle = "rgba(255, 0, 0, 0.55)";
	        ctx.arc(this.lastCor.x, this.lastCor.y, 
	        		BOARD_CONSTANT.TOWER_RANGE[BOARD_CONSTANT.CURRENTTOWER], 0, Math.PI * 2, false);
	        ctx.fill();
	        ctx.closePath();
		}
	}
}

//get the starting position for human
GameBoard.prototype.getStart = function () {
	//getting the starting point of the human
    var start = Math.floor(Math.random() * this.startXArray.length);
    return {x: this.startXArray[start] * GAME_CONSTANT.BLOCK_SIZE, 
    	y: this.startYArray[start] * GAME_CONSTANT.BLOCK_SIZE, nextDir: "a"};
}

//set the starting position and human for each level
GameBoard.prototype.setState = function (level) {
	//checking where the starting point is
    for(var row = 0; row < this.map.length; row++) {
	    for(var col = 0; col < this.map[row].length; col++) {
	        if(this.map[row][col] == "s") {
                this.startXArray.push(col);
                this.startYArray.push(row);
            //adding the magician
	        } else if(this.map[row][col] == "m") {
                this.game.addEntity(new Magician(this.game, AM.getAsset("./img/magician.png"), 
                    AM.getAsset("./img/magician2.png"), col * GAME_CONSTANT.BLOCK_SIZE, 
                    row * GAME_CONSTANT.BLOCK_SIZE));
	        }
	    }
	}

    //set how many human are spawning for each level
    switch (level) {
        case 1: this.createWave1(); break;
        case 2: this.createWave2(); break;
        case 3: this.createWave3(); break;
        case 4: this.createWave4(); break;
        case 5: this.createWave5(); break;
        default:
            console.log("no human");
    }
}

//reset the board by removing all the tower that had been placed and move the magician
GameBoard.prototype.resetMap = function (x, y, nextDir) {
	//removing tower and magician
    for(var i =0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if(ent instanceof Tower || ent instanceof Magician) {
            this.game.entities[i].removeFromWorld = true;
        }
    }
    //reset the starting position
    this.startXArray.splice(0,this.startXArray.length)
    this.startYArray.splice(0,this.startYArray.length)
    //change the map
    switch(BOARD_CONSTANT.LEVEL) {
        case 1: this.map = MAP.FIRSTMAP; break;
        case 2: this.map = MAP.SECONDMAP; break;
        case 3: this.map = MAP.THIRDMAP; break;
        case 4: this.map = MAP.FOURTHMAP; break;
        case 5: this.map = MAP.FIFTHMAP; break;
        default: console.log("no map");
    }
}

//get the next step for the human to walk through
GameBoard.prototype.getNextStep = function (x, y, nextDir) {
    var xposition = x / GAME_CONSTANT.BLOCK_SIZE;
    var yposition = y / GAME_CONSTANT.BLOCK_SIZE; 
    if(xposition == 0) {
    	xposition++;
    } else if (yposition == 0) {
    	yposition++;
    } else if(xposition == 33) {
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
    return {x: xposition * GAME_CONSTANT.BLOCK_SIZE, y: yposition * GAME_CONSTANT.BLOCK_SIZE, 
    	nextDir: this.map[yposition][xposition]};
}

//see if tower can be built here:
//starts at top of page
GameBoard.prototype.towerAllowed = function(x,y) {
    var allowed = true;
    //checking to see if the coordinate is bigger than the game board
    if(x >= 34 || y >= 24) {
    	return false;
    }
    //checking if the player can afford tower
	if (BOARD_CONSTANT.MONEY < BOARD_CONSTANT.TOWER_COST[BOARD_CONSTANT.CURRENTTOWER]) { 
        allowed = false;
    } else {      
        if(this.map[y][x] != " ") {
            allowed = false;
        }
    }
	return allowed;
}

GameBoard.prototype.createWave1 = function() {
	for (var i = 0; i < 1; i++) {
//		this.humanList.push(new Human1(this.game, this, AM.getAsset("./img/human1left.png"), 
//    			AM.getAsset("./img/human1right.png")));
//		this.humanList.push(new Human6(this.game, this, AM.getAsset("./img/human6walkback.png"), 
//    			AM.getAsset("./img/human6walkfront.png"), AM.getAsset("./img/human6walkleft.png"),
//    			AM.getAsset("./img/human6walkright.png")));
	}
    console.log("Wave 1");
}

GameBoard.prototype.createWave2 = function() {
	for (var i = 0; i < 1; i++) {
//        this.humanList.push(new Magician2(this.game, this, AM.getAsset("./img/magician.png"), 
//			AM.getAsset("./img/magician2.png")));
//		this.humanList.push(new Human1(this.game, this, AM.getAsset("./img/human1left.png"), 
//    			AM.getAsset("./img/human1right.png")));
//		this.humanList.push(new Human6(this.game, this, AM.getAsset("./img/human6walkback.png"), 
//    			AM.getAsset("./img/human6walkfront.png"), AM.getAsset("./img/human6walkleft.png"),
//    			AM.getAsset("./img/human6walkright.png")));
	}
    console.log("Wave 2");
}

GameBoard.prototype.createWave3 = function() {
	for (var i = 0; i < 1; i++) {
//		this.humanList.push(new Magician2(this.game, this, AM.getAsset("./img/magician.png"), 
//			AM.getAsset("./img/magician2.png")));
//		this.humanList.push(new Human1(this.game, this, AM.getAsset("./img/human1left.png"), 
//    			AM.getAsset("./img/human1right.png")));
//		this.humanList.push(new Human6(this.game, this, AM.getAsset("./img/human6walkback.png"), 
//    			AM.getAsset("./img/human6walkfront.png"), AM.getAsset("./img/human6walkleft.png"),
//    			AM.getAsset("./img/human6walkright.png")));
	}
    console.log("Wave 3");
}

GameBoard.prototype.createWave4 = function() {
	for (var i = 0; i < 1; i++) {
//		this.humanList.push(new Magician2(this.game, this, AM.getAsset("./img/magician.png"), 
//			AM.getAsset("./img/magician2.png")));
//		this.humanList.push(new Human1(this.game, this, AM.getAsset("./img/human1left.png"), 
//    			AM.getAsset("./img/human1right.png")));
//		this.humanList.push(new Human6(this.game, this, AM.getAsset("./img/human6walkback.png"), 
//    			AM.getAsset("./img/human6walkfront.png"), AM.getAsset("./img/human6walkleft.png"),
//    			AM.getAsset("./img/human6walkright.png")));
//		this.humanList.push(new Human9(this.game, this, AM.getAsset("./img/human9back.png"), 
//    			AM.getAsset("./img/human9front.png"), AM.getAsset("./img/human9left.png"),
//    			AM.getAsset("./img/human9right.png")));
	}
    console.log("Wave 4");
}

GameBoard.prototype.createWave5 = function() {
	for (var i = 0; i < 1; i++) {
		this.humanList.push(new Human1(this.game, this, AM.getAsset("./img/human1left.png"), 
    			AM.getAsset("./img/human1right.png")));
		this.humanList.push(new Human6(this.game, this, AM.getAsset("./img/human6walkback.png"), 
    			AM.getAsset("./img/human6walkfront.png"), AM.getAsset("./img/human6walkleft.png"),
    			AM.getAsset("./img/human6walkright.png")));
		this.humanList.push(new Human9(this.game, this, AM.getAsset("./img/human9back.png"), 
    			AM.getAsset("./img/human9front.png"), AM.getAsset("./img/human9left.png"),
    			AM.getAsset("./img/human9right.png")));
	}
    console.log("Wave 5");
}
