window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function GameEngine() {
    this.entities = [];
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    //extra for jump
    this.showOutlines = false;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

//added for listen space for jump
GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;
    //getting the position of where the mouse is
    var getXandY = function (e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;
        return { x: x, y: y };
    }
    //getting the key pressed
    this.ctx.canvas.addEventListener("keypress", function (e) {
    	switch(e.code) {
    		case 'Space': that.space = true; break;
    		case 'KeyW': that.w = true; break;
    		case 'KeyS': that.s = true; break;
    		case 'KeyA': that.a = true; break;
    		case 'KeyD': that.d = true; break;
    		case 'Key1': that.one = true; break;
    		case 'Key2': that.two = true; break;
    		default: console.log("something else");
    	}
        console.log(e);
        e.preventDefault();
    }, false);
    this.ctx.canvas.addEventListener("click", function (e) {
        that.position = getXandY(e);
        that.click = true;
    }, false);

    this.ctx.canvas.addEventListener("mousemove", function (e) {
    	var newCor = getXandY(e);
    	if(newCor != null) {
    		that.mouse = newCor;
    	}
    }, false);
    console.log('Input started');
}

GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }
    
    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
}

GameEngine.prototype.loop = function () {
	if(!BOARD_CONSTANT.GAME_OVER || !BOARD_CONSTANT.FINISH) {
	    this.clockTick = this.timer.tick();
	    this.update();
	    this.draw();
	    this.space = null;
	    this.w = null;
	    this.a = null;
	    this.s = null;
	    this.d = null;
	    this.one = null;
	    this.two = null;
	    this.mouse = null;
	    this.click = null;
	    this.position = null;
	}
}

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}
