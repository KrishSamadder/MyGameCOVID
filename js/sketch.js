var PLAY = 1;
var END = 0;
var gameState=1;

var covidvaccine1, covidVaccine1, covidvaccine2, covidVaccine2;
var virus1, virus2,  virus3;
var runningrightboy, runningboy, runningleftboy, standingboy, standingBoy, deadboy, deadBoy;
var runningrightgirl, runninggirl, runningleftgirl, standinggirl, standingGirl, StandingGirl, deadgirl, deadGirl;
var gameover, gameOver, restart, Restart, reStart;
var boom, Boom, boomimg;
var backgroundimg;
var invisibleground;
var youWon, youwon;
var virusGroup, dose1Group, dose2Group;
var score, life;
var edges;

var backgroundsound;
var screeminggirlsound, screemingmansound;
var vaccinecollected;
var explosionsound;

function preload(){
  covidvaccine1=loadImage("images/covidvaccine1.png");
  covidvaccine2=loadImage("images/covidvaccine2.png");

  virus1=loadImage("images/covidvirus1.png");
  virus2=loadImage("images/covidvirus2.png");
  virus3=loadImage("images/covidvirus3.png");

  runningrightboy=loadAnimation("images/runningrightboy2.png", "images/runningrightboy3.png", "images/runningrightboy4.png", "images/runningrightboy5.png");
  runningleftboy=loadAnimation("images/runningleftboy2.png", "images/runningleftboy3.png", "images/runningleftboy4.png", "images/runningleftboy5.png");
  standingboy=loadImage("images/standingboy.png"); 
  deadboy=loadImage("images/deadboy.png");

  runningrightgirl=loadAnimation("images/runningrightgirl2.png", "images/runningrightgirl3.png", "images/runningrightgirl4.png", "images/runningrightgirl5.png", "images/runningrightgirl6.png", "images/runningrightgirl7.png", "images/runningrightgirl8.png", "images/runningrightgirl9.png", "images/runningrightgirl10.png");
  runningleftgirl=loadAnimation("images/runningleftgirl2.png", "images/runningleftgirl3.png", "images/runningleftgirl4.png", "images/runningleftgirl5.png", "images/runningleftgirl6.png", "images/runningleftgirl7.png", "images/runningleftgirl8.png", "images/runningleftgirl9.png", "images/runningleftgirl10.png");
  standinggirl=loadImage("images/standinggirl1.png");
  deadgirl=loadImage("images/deadgirl.png");

  gameover=loadImage("images/gameover.png");
  restart=loadImage("images/restart.png");

  boomimg=loadImage("images/boomimage.jpg");
youwon=loadImage("images/youwon.jpg");

  backgroundimg=loadImage("images/spacebg.jpg");

backgroundsound=loadSound("sounds/backgroundsound.mp3");

screeminggirlsound=loadSound("sounds/screeminggirlsound.wav");
screemingmansound=loadSound("sounds/screemingmansound.wav");

vaccinecollected=loadSound("sounds/vaccinecollected.mp3");

explosionsound=loadSound("sounds/explosionsound.mp3");
}

function setup() {
  createCanvas(1365,625);

  score=0;
  life=2;

  edges= createEdgeSprites();

  invisibleground=createSprite(682.5, 580, 1365, 5); 

  standingGirl=createSprite(682.5, 490, 10, 10);
  StandingGirl=createSprite(682.5, 490, 1, 1);
  
  runninggirl=createSprite(682.5, 490, 1, 1);
  runningboy=createSprite(682.5, 490, 1, 1);

  deadGirl=createSprite(682.5, 490, 1, 1);
  deadBoy=createSprite(682.5, 490, 1, 1);

  standingBoy=createSprite(682.5, 10, 1, 1);

Boom=createSprite(682.5, 312.5, 1, 1);

gameOver=createSprite(110, 80, 1, 1);

youWon=createSprite(682.5, 312.5, 1, 1);
Restart=createSprite(1260, 525, 1, 1); 
reStart=createSprite(645, 390, 1, 1);

  virusGroup = new Group();
dose1Group = new Group();
dose2Group = new Group();

  backgroundsound.play();
  backgroundsound.loop();

}

function draw() {
  background(backgroundimg);  

  textSize(12.5);
  fill("white");
  text("Press left and right arrow keys to collect both dose 1 and 2 of the vaccines (to get scores) and avoid the viruses. Both the agents can slide as well as run. You have 2 lives. To win get a score of 5. Press on restart once your lives get exhausted.",  13, 13);
text("They can slide because of less gravity!", 550, 26);
  runninggirl.velocityX=0;
  runningboy.velocityX=0;

  runninggirl.bounceOff(edges[1]);
  runningboy.bounceOff(edges[1]);

if(runningboy.x<=0){
  runningboy.x=100;
}

if(runninggirl.x<=0){
  runninggirl.x=60;
}

  if(gameState===PLAY){

    standingGirl.addImage(standinggirl);
    standingGirl.scale=0.2;

    if(virusGroup.isTouching(invisibleground)){
boom.addImage(boomimg);
explosionsound.play();
  }

standingBoy.collide(invisibleground);


if(keyDown(LEFT_ARROW)){
  standingGirl.visible=false;
runninggirl.addAnimation("runninggirl", runningleftgirl);
  runninggirl.velocityX=-5;
}

if(keyDown(RIGHT_ARROW)){
  standingGirl.visible=false;
  runninggirl.addAnimation("runninggirl", runningrightgirl);
  runninggirl.velocityX=5;
}

if(dose1Group.isTouching(runninggirl||standingGirl)){
score+=0.5;
vaccinecollected.play();
dose1Group.destroyEach();
dose1Group.setVelocityYEach(0);
dose1Group.setLifetimeEach(-1);
spawnVaccine2();
}

if(dose2Group.isTouching(runninggirl||standingGirl)){
  score+=0.5;
  vaccinecollected.play();
  dose1Group.destroyEach();
  dose2Group.destroyEach();
  dose1Group.setVelocityYEach(0);
  dose2Group.setVelocityYEach(0);
  dose1Group.setLifetimeEach(-1);
  dose2Group.setLifetimeEach(-1);
  }  

if(virusGroup.isTouching(runninggirl||standingGirl)){
  standingGirl.visible=false;
  runninggirl.visible=false;
  screeminggirlsound.play();
  deadGirl.addImage(deadgirl);
  deadGirl.lifetime=6;
deadGirl.scale=0.3;
  life=life-1;
  standingGirl.destroy();
  runninggirl.destroy();
  virusGroup.destroyEach();
  dose1Group.destroyEach();
  dose2Group.destroyEach();
  virusGroup.setVelocityYEach(0);
dose1Group.setVelocityYEach(0);
dose2Group.setVelocityYEach(0);
dose1Group.setLifetimeEach(-1);
dose2Group.setLifetimeEach(-1);
  virusGroup.setLifetimeEach(-1); 
  standingBoy.velocityY=10;
  standingBoy.addImage(standingboy);
  standingBoy.scale=0.2;
  gameState=END;
}

spawnVirus();
spawnVaccine1();

if(score>=5){
  youWon.addImage(youwon);
  standingGirl.visible=false;
  runninggirl.visible=false;
  virusGroup.destroyEach();
  dose1Group.destroyEach();
  dose2Group.destroyEach();
  virusGroup.setVelocityYEach(0);
  dose1Group.setVelocityYEach(0);
  dose2Group.setVelocityYEach(0);
  dose1Group.setLifetimeEach(-1);
  dose2Group.setLifetimeEach(-1);
  virusGroup.setLifetimeEach(-1); 
  reStart.addImage(restart);
  vaccinecollected.play();
}

if(life>=2){
  gameState=PLAY;
}

if(mousePressedOver(reStart)){
reset();
  }
  }

  else if(gameState===END){

    if(virusGroup.isTouching(invisibleground)){
      boom.addImage(boomimg);
      explosionsound.play();
        }

    if(keyDown(LEFT_ARROW)){
      standingBoy.visible=false;
    runningboy.addAnimation("runningboy", runningleftboy);
    runningboy.scale=0.5;
    runningboy.velocityX=-5;
    }
    
    if(keyDown(RIGHT_ARROW)){
      standingBoy.visible=false;
      runningboy.addAnimation("runningboy", runningrightboy);
      runningboy.velocityX=5;
      runningboy.scale=0.5;
  }


standingBoy.collide(invisibleground);

if(dose1Group.isTouching(runningboy||standingBoy)){
  score+=0.5;
  vaccinecollected.play();
  dose1Group.destroyEach();
  dose1Group.setVelocityYEach(0);
  dose1Group.setLifetimeEach(-1);
spawnVaccine2();
  }

  if(dose2Group.isTouching(runningboy||standingBoy)){
    score+=0.5;
    vaccinecollected.play();
    dose1Group.destroyEach();
    dose2Group.destroyEach();
     dose1Group.setVelocityYEach(0);
    dose2Group.setVelocityYEach(0);
    dose1Group.setLifetimeEach(-1);
    dose2Group.setLifetimeEach(-1);
    }
    

if(virusGroup.isTouching(runningboy||standingBoy)){
  standingBoy.visible=false;
  runningboy.visible=false;
  screemingmansound.play();
  life=life-1;
  runningboy.destroy();
  standingBoy.destroy();
  virusGroup.destroyEach();
  dose1Group.destroyEach();
  dose2Group.destroyEach();
  virusGroup.setVelocityYEach(0);
  dose1Group.setVelocityYEach(0);
  dose2Group.setVelocityYEach(0);
  dose1Group.setLifetimeEach(-1);
  dose2Group.setLifetimeEach(-1);
  virusGroup.setLifetimeEach(-1); 
deadBoy.addImage(deadboy);
deadBoy.lifetime=6;
deadBoy.scale=0.3;
Boom.addImage(boomimg);
Boom.scale=3;
gameOver.addImage(gameover);
Restart.addImage(restart);
explosionsound.play();
}

if(mousePressedOver(Restart)){
reset();
}

spawnVirus();
spawnVaccine1();

if(score>=5){
  youWon.addImage(youwon);
  standingBoy.visible=false;
  runningboy.visible=false;
  virusGroup.destroyEach();
  dose1Group.destroyEach();
  dose2Group.destroyEach();
  virusGroup.setVelocityYEach(0);
  dose1Group.setVelocityYEach(0);
  dose2Group.setVelocityYEach(0);
  dose1Group.setLifetimeEach(-1);
  dose2Group.setLifetimeEach(-1);
  virusGroup.setLifetimeEach(-1); 
  reStart.addImage(restart);
}

if(mousePressedOver(reStart)){
reset();
  }
  }

  invisibleground.visible=false;

textSize(20);
fill("white");
text("Score: "+score, 1250, 40);
text("Life: "+life, 1250, 60);

  drawSprites();
}

function spawnVirus(){
  if(life>=1){
  if(frameCount%65===0){
    var virus=createSprite(Math.round(random(30, 1350)), 60, 10, 10);

    virus.velocityY=8;
virus.velocityX=0;

virus.lifetime=63;

    var rand=Math.round(random(1, 3));
    switch(rand){
      case 1: virus.addImage(virus1);
             break;
             case 2:virus.addImage(virus2);
        break;
        case 3: virus.addImage(virus3);
        break;
        default: break;
    }
boom=createSprite(virus.x, virus.y+490, 0.1, 0.1);
boom.scale=0.1;
boom.lifetime=75;

    virus.scale=0.3;

    virusGroup.add(virus);
  }
}
}

function spawnVaccine1(){
  if(life>=1){
    if(frameCount%200===0){
    var covidVaccine1=createSprite(Math.round(random(30, 1350)), 60, 0.00001, 0.00001); 

        covidVaccine1.addImage(covidvaccine1);
      covidVaccine1.velocityY=7;
      covidVaccine1.velocityX=0;
      covidVaccine1.scale=0.22;
covidVaccine1.lifetime= 65;
    dose1Group.add(covidVaccine1);
    }
}
}

function spawnVaccine2(){
  var covidVaccine2=createSprite(Math.round(random(30, 1350)), 60, 0.00001, 0.00001);
covidVaccine2.addImage(covidvaccine2);           
    covidVaccine2.velocityY=7;
    covidVaccine2.velocityX=0;
    covidVaccine2.lifetime=65;
    covidVaccine2.scale=0.22;

    dose2Group.add(covidVaccine2);
  }


  function reset(){
    location.reload();
  }