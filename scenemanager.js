function Scene(game, background, type) {
    this.game = game;
    this.background = background;
    this.next = null;
    this.type = type;
}

Scene.prototype = new Entity();
Scene.prototype.constructor = Scene;

Scene.prototype.toString = function () {
    return "Scene";
};


Scene.prototype.startScene = function () {
};

Scene.prototype.endScene = function () {
};

Scene.prototype.isSceneDone = function () {
};

Scene.prototype.update = function () {
};

Scene.prototype.draw = function (ctx) {
};

Scene.prototype.reset = function () {
};

function SceneManager(game, currentScene) {
    this.game = game;
    this.currentScene = currentScene;
}

SceneManager.prototype = new Entity();
SceneManager.prototype.constructor = SceneManager;

SceneManager.prototype.reinitRoundsAndLinks = function () {
  
    var tutorialScene = new Tutorial(this.game);
    var r1 = createFirstRound(this.game); // first round

    this.currentScene.roundScene = r1; 
    this.currentScene.tutorialScene = tutorialScene;
    tutorialScene.next = this.currentScene;
    r1.next = eg;
    eg.next = this.currentScene; // this.currentScene is Title
};

SceneManager.prototype.draw = function (ctx) {
    this.currentScene.draw(ctx);
};

SceneManager.prototype.reset = function () {
    this.currentScene.reset();
};

SceneManager.prototype.toString = function () {
    return "SceneManager";
};