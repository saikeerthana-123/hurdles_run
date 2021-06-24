var canvas, backgroundImage;
var ground;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var rand;
var form, player, game;
var hurdleimg;
var cars, car1, car2, car3, car4;
var car1img,car2img,car3img,car4img;
var ground1, ground2, ground3, ground4;

function preload(){
  car1img = loadImage("images/a.png");
  car2img = loadImage("images/b.png");
  car3img = loadImage("images/c.png");
  car4img = loadImage("images/d.png");
  backgroundImage = loadImage("images/track.png");
  hurdleimg = loadImage("images/cone.png");
  //ground = loadImage("../images/ground.png");
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
}


function draw(){
  game.start();
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
