var HOME = 1;
var PLAY = 2;
var STORY = 3;
var END = 0;
var gameState = HOME;

var play,playImg;
var home,homeImg;
var story,storyImg;

var terroristGroup,tImg;
var weaponsGroup;

var hero,heroImg;
var shot,shotImg,shotSnd;

var g1,g1Img;
var g2,g2Img;
var g3,g3Img;

var blast,blastImg;

var invisibleGround;
var bgSnd,stSnd;

var bg1,bg1Img;
var bg2,bg2Img;
var rocketImg,rSnd,rGroup;

var score = 0;

function preload(){

  playImg   = loadImage("play.png");
  homeImg   = loadImage("home.png");
  storyImg  = loadImage("story.png");
  
  tImg      = loadImage("terrorists.png");
  blastImg  = loadAnimation("blast1.png","blast2.png");
  
  heroImg   = loadAnimation("s1.png","s2.png");
  shotImg   = loadImage("gunshot.png");
  
  bg1Img    = loadImage("background.jpg");
  bg2Img    = loadImage("Bg1.png");
  
  g1Img     = loadImage("g1.png");
  g2Img     = loadImage("g2.png");
  g3Img     = loadImage("grenade.png");
  
  shotSnd   = loadSound("sound1.mp3");
  bgSnd     = loadSound("Thuppaki - BGM.mp3.mp3");
  stSnd     = loadSound("Shotgun+Pump.mp3");

  rocketImg = loadImage("rocket.png");
  rSnd      = loadSound("Arrow+Hit+2.mp3");
}

function setup() {
  createCanvas(700,500);

  //background
  bg1 = createSprite(700,300,700,500);
  bg1.addImage(bg1Img);
  bg1.scale = 0.9;
  bg1.x = bg1.width/2;
  //bg1.depth=3
  bg1.visible = false;
  console.log(bg1.depth)

  //play button sprite
  play = createSprite(540,280,20,20);
  play.addImage(playImg);
  play.scale = 0.4;
  play.setCollider("rectangle",0,0,250,60);
  play.debug = false;
  
  //home button sprite
  home = createSprite(40,280,20,20);
  home.addImage(homeImg);
  home.scale = 0.15;
  home.visible = false;
  
  //stroy button
  story = createSprite(540,230,20,20);
  story.addImage(storyImg);
  story.scale=0.2;
  story.setCollider("rectangle",0,0,story.width,story.height);
  story.debug = false;
  
  //soldier
  hero = createSprite(100,440);
  hero.addAnimation("hero",heroImg);
  hero.scale = 0.4;
  hero.debug = false;
  hero.visible = false;
  
  //creation of groups
  terroristGroup = createGroup();
  weaponsGroup   = createGroup();
  rGroup         = createGroup();

  /*//background
  bg1 = createSprite(700,300,700,500);
  bg1.addImage(bg1Img);
  bg1.scale = 0.9;
  bg1.x = bg1.width/2;
  //bg1.depth=3
  console.log(bg1.depth)*/
  
  //invisible ground
  invisibleGround = createSprite(200,510,400,10);
  invisibleGround.visible = true;
    
}

function draw() {
  background(bg1Img);
  drawSprites();

//game state play, which executes when play button is pressed
if(gameState === PLAY){

  bg1.visible = true;
  bg1.velocityX = -4;

  //score
  fill("white");
  stroke(220);
  strokeWeight(3);
  textSize(20)
  text("Score:"+score,550,50);

  story.visible = false;
  play.visible = false;
  hero.visible = true;
    
  hero.depth = hero.depth + 1;

//space button to execute shot image
if(keyDown("space")) {

  shot = createSprite(190,380,30,30);
  shot.addImage(shotImg);
  shot.velocityX = 8;
  shot.scale = 0.05;
  //shot.debug = true;

  shotSnd.play();
  //bgSnd.play();

  }
  
//soldier's death
if(rGroup.isTouching(hero)){

  gameState = END;
  
}

//to destroy terrorist
if(terroristGroup.isTouching(shot)){
  
  terroristGroup.destroyEach();
  score = score+5;
  stSnd.play();

    }
  
//to destroy weapons
if(weaponsGroup.isTouching(hero)){
  weaponsGroup.destroyEach();
  score = score+3;
  }

//moving background
if (bg1.x < 0){

  bg1.x = bg1.width = 700;
 
    }

//to jump soldier
if(keyDown("UP_ARROW") && hero.y >= 300){
  hero.velocityY = -12;
  }
  
  //gravity
  hero.velocityY = hero.velocityY + 0.9;

  //to collide the soldier with invisible ground
  hero.collide(invisibleGround);
   
  //calling of functions
  spawnTerrorist();
  spawnWeapons();
  spawnRocket();
    
  }
  
//function home, which executes at the very statr of the game
if(gameState === HOME){
    
  fill("white");
  stroke(220);
  strokeWeight(3);
  textSize(40)
  text("THE BLITZ",200,300);
    
  home.visible = false;
  hero.visible = false;
    
//story button, which displays content
if(mousePressedOver(story)){
  tale();
   }
    
//play button, playing of game
if(mousePressedOver(play)){

  gameState = PLAY;
  bgSnd.play();
   }
   
  }
  
  //gamestate end
  if(gameState === END){
    
    hero.destroy();
    terroristGroup.destroyEach();
    weaponsGroup.destroyEach();
    rGroup.destroyEach();
    
    bg1.visible = false;
    
    fill("red");
    textSize(40);
    strokeWeight(4);
    stroke("red");
    text("Game Over",290,250);
    
    bgSnd.stop();
    
  }
  
//story gamestate, function to execute the content of the game
else if(gameState === STORY){
  
  home.visible = true;

//to return to the first stage
if(mousePressedOver(home)){
  house(); 
  }  
      }
  }

//function of creating content sprite
function tale() {
    bg2 = createSprite(382,255,800,600);
    bg2.addImage(bg2Img);
    bg2.scale = 0.6;
  
  gameState = STORY;
    }

//function to remove content pic when home button is pressed
function house() {
  
   bg2.visible = false;
   gameState = HOME;
  
   }

//spawning of terrorists
function spawnTerrorist() {
    if (frameCount % 800 === 0) {

    var terrorist = createSprite(600,450,40,10);
    
    terrorist.addImage(tImg);
    terrorist.scale = 1;
    
    terrorist.velocityX = -3;
    //terrorist.debug = false;
    //terrorist.setCollider("rectangle",2,0,130,190);
    
    //assign lifetime to the variable
    terrorist.lifetime = 200;
      
    //add each cloud to the group
   terroristGroup.add(terrorist);
 }
   
}

//spawnig of weapons
function spawnWeapons(){
  if(frameCount % 150 === 0){
    
    var weapon = createSprite(700,220,20,20);
    weapon.velocityX = -4;
    
    var rand = Math.round(random(1,8));
   
    switch(rand){
      case 1: weapon.addImage(g1Img);
        break;
        
      case 2: weapon.addImage(g2Img);
        break;
        
      case 3: weapon.addImage(g3Img);
        break;
        
        default: break;    
    }
             
    weapon.scale = 0.1;
    weapon.lifetime = 300;
    weaponsGroup.add(weapon);
  }
}

//spawning of rocket
function spawnRocket() {
if(frameCount % 600 === 0) {

  var rocket = createSprite(700,430);
  rocket.velocityX = -9;
  rocket.addImage(rocketImg);
  rocket.scale = 0.4;
  rocket.lifetime = 300;
  rocket.depth = hero.depth;
  //rocket.debug = true;

  rSnd.play();
  rGroup.add(rocket);
}
  
}