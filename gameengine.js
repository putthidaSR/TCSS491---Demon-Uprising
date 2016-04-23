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
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    
    this.continueKeyPressed = false;
    this.anyKeyPressed = false;
    this.muteHitbox = {left: 750, right: 800, top: 550, bottom: 600}; //for object to click

}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();//input for jump
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
    //up
    this.ctx.canvas.addEventListener("keypress", function (e) {
        //if (e.code === 'KeyW') that.w = true;
    	switch(e.code) {
    		case 'Space': that.space = true; break;
    		case 'KeyW': that.w = true; break;
    		case 'KeyS': that.s = true; break;
    		case 'KeyA': that.a = true; break;
    		case 'KeyD': that.d = true; break;
    		
    		//for magician1
    		case 'KeyI': that.i = true; break;
    		case 'KeyK': that.k = true; break;
    		case 'KeyJ': that.j = true; break;
    		case 'KeyL': that.l = true; break;
    		
    		default: console.log("something else");
    	}
        console.log(e);
        //console.log("Key Down Event - Char " + e.code + " Code " + e.keyCode);
        e.preventDefault();
    }, false);

    /* === MOUSE SETTINGS === */
    this.ctx.canvas.addEventListener("mouseup", function (e) {
        that.shooting = true;
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
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.space = null;
    this.w = null;
    this.a = null;
    this.s = null;
    this.d = null;
    
    this.space = null;
    this.i = null;
    this.k = null;
    this.j = null;
    this.l = null;
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

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}