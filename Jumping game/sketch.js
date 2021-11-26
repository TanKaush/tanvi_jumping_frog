var ocean,oceanImg;
var coin, coinImg, coinGroup;
var plant, plantImg, plantGroup;
var frog, frogImg;

var gameState = 1;
var score = 0;
var position = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  plantImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(600,500);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  ocean.velocityY = 0.25;
  
  frog = createSprite(300,300,50,50);
  frog.scale = 0.125;
  frog.addImage("frog", frogImg);  
  frog.setCollider("rectangle",0,0,400,400);
  
  //create coin group and climber group
  coinGroup = new Group();
  plantGroup = new Group();
  
}

function draw(){
  background("black");
  drawSprites();

  textSize(25);
  fill('purple');
  text('Score:'+score, 250, 60);
  //GAME STARTS
  if (gameState == 1) {

    if (ocean.y>300){
      ocean.y = 290;
    }
    //CALL FUNCTION
    plantCoin();

    //FROG MOVEMENTS
    if(keyDown("space")){
      frog.y = frog.y - 50;
      frog.velocityY = 8;
    }
    if(keyDown("left")){
      frog.x = frog.x - 10;
    }
    if(keyDown("right")){
      frog.x = frog.x + 10;
    }
    //COLLISION CONDITIONS
    if(frog.isTouching(plantGroup)){
      frog.velocityY = 0;
    }
    if(frog.isTouching(coinGroup)){
      score = score + 1;
      coinGroup.destroyEach();
      frog.velocityY = 2;
    }
    if(frog.y >= 590){
      gameState = 0;
    }
 }
 //GAME OVER 
 if (gameState == 0){
  ocean.velocityY = 0;
   frog.destroy();
   plantGroup.destroyEach();
   coinGroup.destroyEach();

  textSize(50);
  fill('red');
  text('GAME OVER!', 150, 250);
 }

}

// create the coin and climber in the same function
function plantCoin() {
  
  if (frameCount % 200 === 0) {
    //make the x position of the coin and climber the same
    position = Math.round(random(50,550));

    coin = createSprite(position,40,10,10);
    coin.addImage(coinImg);
    coin.scale = 0.08;
    //coin.debug = true;
    coin.setCollider("rectangle",0,10,50,50);
    coin.velocityY = 2;
    coinGroup.add(coin);

    plant = createSprite(position,90,10,10);
    plant.addImage(plantImg);
    plant.scale = 0.4;
    //plant.debug = true;
    plant.setCollider("rectangle",0,10,450,100);
    plant.velocityY = 2;
    plantGroup.add(plant);
   
  }
}

