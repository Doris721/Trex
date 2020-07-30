//declearing the Sprite Variables
var trex,ground,invisibleground,clouds,CloudsGroup,ObstaclesGroup,obstacle,gameover,restart;
//declaing gameState variables
var PLAY=1;
var END=0;
var gameState=PLAY;
//declaring score variable
var score=0;
//declearing image variables
var trexrun,groundimage,cloudsimage,obs1,obs2,obs3,obs4,obs5,obs6,gameoverimage,restartimage,trexdie;

//load all media files in this function in a variable
function preload(){
trexrun=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage=loadImage("ground2.png");
  cloudsimage=loadImage("cloud.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
  gameoverimage=loadImage("gameOver.png");
  restartimage=loadImage("restart.png");
  trexdie=loadAnimation("trex_collided.png");
}
//create the sprites and add the images on it
function setup(){
  createCanvas(600,200);
  trex=createSprite(50,180,10,20);
  trex.addAnimation("label1",trexrun);
  trex.addAnimation("label6",trexdie);
  trex.scale=0.5;
  ground=createSprite(300,180,600,20);
  ground.addImage("label2",groundimage);
  invisibleground=createSprite(300,185,600,5);
  invisibleground.visible=false;
  CloudsGroup=new Group();
  ObstaclesGroup=new Group();
  gameover=createSprite(300,100,10,10)
  gameover.visible=false;
  gameover.addImage("label4",gameoverimage);
  gameover.scale=0.5;
  restart=createSprite(300,120,10,10);
  restart.visible=false;
  restart.addImage("label5",restartimage);
  restart.scale=0.5;
}
function draw(){
  background(255);
  
  if(gameState===PLAY){
    ground.velocityX=-3;
    score=score+1;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")&&trex.y>=159){
    trex.velocityY=-15;
  }
  trex.velocityY=trex.velocityY+1;
    SpawnObstacles();
  SpawnClouds();
    if(ObstaclesGroup.isTouching(trex)){
      gameState=END;
    }
  }
  
  else if(gameState===END){
    ground.velocityX=0;
    CloudsGroup.setLifetimeEach(-1);
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setVelocityXEach(0);
    ObstaclesGroup.setVelocityXEach(0);
    gameover.visible=true;
    restart.visible=true;
    trex.changeAnimation("label6",trexdie);
  }
  text("score:"+score,500,80);
  console.log(trex.y);
  trex.collide(invisibleground);  
  
  
  drawSprites();
}

function SpawnClouds(){
  if(frameCount%60===0){
    clouds=createSprite(600,120,10,10);
    clouds.addImage("label3",cloudsimage);
    clouds.scale=0.5;
    clouds.y=Math.round(random(80,120));
    clouds.velocityX=-5;
    clouds.lifetime=120;
    clouds.depth=trex.depth-1;
    CloudsGroup.add(clouds);
  }
}
function SpawnObstacles(){
  if(frameCount%60===0){
     obstacle=createSprite(600,165,10,10);
    var rnum=  Math.round(random(1,6));
    switch(rnum){
      case 1:obstacle.addImage(obs1);
        break;
        case 2:obstacle.addImage(obs2);
        break;
        case 3:obstacle.addImage(obs3);
        break;
        case 4:obstacle.addImage(obs4);
        break;
        case 5:obstacle.addImage(obs5);
        break;
        case 6:obstacle.addImage(obs6);
        break;
        default:break;
    }
      obstacle.scale=0.5;
    obstacle.velocityX=-6;
    obstacle.lifetime=100;
    ObstaclesGroup.add(obstacle);
      
}
}