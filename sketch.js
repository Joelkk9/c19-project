var PLAY = 1;
var END = 0;

var gameState = PLAY;
var clouds,cloudsAnimation;
var background,backgroundImg;
var sun,sunImg;
var boy,boyAnimation;

var score;

function preload(){
    cloudsAnimation = loadAnimation("cloud_1.png","cloud_2.png","cloud_3.png","cloud_4.png","cloud_6.png","cloud_7.png","cloud_8.png","cloud_9.png");
    boyAnimation = loadAnimation("boywalking_1.png","boywalking_2.png","boywalking_3.png","boywalking_4.png","boywalking_5.png","boywalking_6.png","boywalking_7.png","boywalking_8.png","boywalking_9.png");
    sunImg = loadImage("sun.jpg");
    tyreImg = loadImage("tyre.jpg");
    backgroundImg = loadImage("background image.jpg");
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    
    boy = createSprite(50,200,20,50);
    boy.addAnimation(boyAnimation);
    boy.scale = 0.5;
    
    background_1 = createSprite(200,180,400,20);
    background_1.addImage(backgroundImg);
    background_1.x = background_1.width /2;
    background_1.scale = 4;
    
    sun = createSprite (100,90,20,20);
    sun.addImage(sunImg);
    sun.scale = 0.5;
    
    invisibleBackground = createSprite(400,400,400,10);
    invisibleBackground.visible = false;
    
    tyreGroup = createGroup();
    cloudsGroup = createGroup();
    
    console.log("Hello" + 5);
    
    boy.setCollider("circle",0,0,40);
    boy.debug = true;
    
    score = 0
  }
  
  function draw() {
    background(180);
    text("Score: "+ score, 500,50);
    
    console.log("this is ",gameState)
    
    
    if(gameState === PLAY){
      background_1.velocityX = -4;
      score = score + Math.round(frameCount/60);
      
      if (background_1.x < 0){
        background_1.x = background_1.width/8;
      }
      
      if(keyDown("space")&& boy.y >=100) {
          boy.velocityY = -13;
      }
      
      boy.velocityY = boy.velocityY + 0.8

      spawnClouds();
    
      spawnObstacles();
      
      if(tyreGroup.isTouching(boy)){
          gameState = END;
      }
    }
     else if (gameState === END) {
        background_1.velocityX = 0;
       
       tyreGroup.setVelocityXEach(0);
       cloudsGroup.setVelocityXEach(0);
  
       tyreGroup.setLifetimeEach (-1) ; 
       cloudsGroup.setLifetimeEach (-1) ;  
       
       text("Game Over",200,200);
     }
    
  
    boy.collide(invisibleBackground);
    
    
    
    drawSprites();
  }
  
  function spawnObstacles(){
   if (frameCount % 60 === 0){
     var tyre = createSprite(400,200,10,40);
     tyre.addImage(tyreImg);
     tyre.velocityX = 5;
           
      tyre.scale = 0.2;
      tyre.lifetime = 300;
    
      tyreGroup.add(tyre);
   }
  }
  
  function spawnClouds() {
     if (frameCount % 60 === 0) {
      clouds = createSprite(600,100,40,10);
      clouds.y = Math.round(random(10,60));
      clouds.addAnimation(cloudsAnimation);
      clouds.scale = 0.5;
      clouds.velocityX = -3;
      
      clouds.lifetime = 134;

      clouds.depth = boy.depth;
      boy.depth = boy.depth + 1;
      
      cloudsGroup.add(clouds);
      }
  }