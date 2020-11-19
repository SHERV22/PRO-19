var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sonic, sonicImage;
var back,backImage;

var cloud,cloudsGroup, cloudImage;
var enemyGroup, enemy, enemyImage;

var score=0;

var gameover, restart;
var gameoverImg, restartImg; 



function preload(){
  sonicImage=loadImage("sonic running.jpg");
  
  backImage = loadImage("background.jpg");
  
  cloudImage = loadImage("cloud.png");
  
  enemyImage = loadImage("doctorEggman.png");
  
  
  gameoverImg = loadImage("gameover.png");
  restartImg = loadImage("reset.png");
}

function setup() {
  createCanvas(600, 200);
  
  sonic = createSprite(50,180,20,50);
  
  sonic.addImage(sonicImage);
  sonic.scale = 0.5;
  
  ground =createSprite(200,180,400,20);
  ground.visible= false
  ground.x = ground.width /2;
  ground.velocityX = -(6 +3*score/100);
  
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameover.scale = 0.5;
  restart.scale = 0.5;

  gameover.visible = false;
  restart.visible = false;
  
  invisibleGround=createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  enemyGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && sonic.y >= 159) {
      sonic.velocityY = -12;
    }
  
    sonic.velocityY = sonic.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    sonic.collide(invisibleGround);
    spawnClouds();
    spawnEnemy();
  
    if(enemyGroup.isTouching(sonic)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameover.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    sonic.velocityY = 0;
    enemyGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    
    enemyGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      restart();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.2;
    cloud.velocityX = -3;
    
    cloud.lifetime = 200;
    
    cloud.depth = sonic.depth;
    sonic.depth = sonic.depth + 1;
    
    cloudsGroup.add(cloud);
  }
  
}

function spawnEnemy() {
  if(frameCount % 60 === 0) {
    var enemy = createSprite(600,165,10,40);
    enemy.velocityX = -(6 + 3*score/100);
    enemy.addImage(enemyImage)
   
            
    enemy.scale = 0.1;
    enemy.lifetime = 300;
    enemyGroup.add(enemy);
  }
}

function restart(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  restart.scale = 0.2;
  
  enemyGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  score = 0;
  
}