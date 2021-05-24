var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 350 },
      debug: true,
    },
  },
  scene: [Scene1, Scene2, Scene3, Scene4],
};
var player;
var keyZSprite;
var papas;
var papasGrandes;
var platforms;
var borders;
var magicMisil;
var plat;
var cursors;
var gameOver = false;
var scoreText;
var ravenStuned;
var goldPotato;
var txtScore;
var canUse;
var firstAtack;
var firstDeadRaven;
var canTalk;
var dialogsRaven2;
var dialogsRaven3;
var dialogsRaven4;
var pause;
var contin;
var oneTime;
var txtGameEnd;
var timeEndText;
var tmp;
var MissilText;
var txtMissil;

var uiText;
var raven;
var txt;
var keyF;
var keyX;
var keyZ;
var totalTime;
var timerOn;
var txtInit = false;
var tiempC;
var val = 30;
var a = false;
var fin;
var load = false;
var ravenPana;
var timerRavenPana;
var ravenDontMove;
var endGame;
var timeToEndGame;
var finalTimeToEndGame;
var game = new Phaser.Game(config);
