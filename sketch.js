//Defining variables
  var ground;
  var backgr;
  var balloon1,balloon2,balloon3,balloon4;
  var sprite, arrowLoad, arrow;
var redBalloonGroup,greenBalloonGroup,blueBalloonGroup,pinkBalloonGroup;
var arrowGroup;

var score=0;

var gameState="play";

localStorage.highestScore=0;


//loading the Image
  function preload(){
    ground=loadImage("background1.jpg");
    balloon1=loadImage("green_balloon0.png");
    balloon2=loadImage("blue_balloon0.png");
    balloon3=loadImage("pink_balloon0.png");
    balloon4=loadImage("red_balloon0.png");
    sprite=loadImage("bow0.png");
    arrowLoad=loadImage("arrow0.png");
  }

//Setting up the Stage
  function setup() {

    createCanvas(400, 400);
    
   
    
    //Creating Background infinite scroll effect
      backgr=createSprite(200,200,400,400);
      backgr.addImage(ground);
    
    //Creating the bow
      bow=createSprite(370,200,20,20);
      bow.addImage(sprite);
    
    //Creating the edge
      edges=createEdgeSprites();
    
     arrowGroup=new Group();
     redBalloonGroup=new Group();
      pinkBalloonGroup=new Group();
     blueBalloonGroup=new Group();
     greenBalloonGroup=new Group();
    
    
  }

//creating balloons and there functions
  function greenballoon(){
    var r1=createSprite(20,Math.round(random(5,200)),20,10);
    r1.addImage(balloon1);
    r1.scale=0.07;
    r1.velocityY=3;
    r1.lifetime=150;
    
    greenBalloonGroup.add(r1);
  }

  function blueballoon(){
    var r2=createSprite(50,Math.round(random(5,200)),20,10);
    r2.addImage(balloon2);
    r2.scale=0.08;
    r2.velocityY=3;
    r2.lifetime=150;
    
    blueBalloonGroup.add(r2);
  }

  function pinkballoon(){
    var r3=createSprite(80,Math.round(random(5,200)),20,10);
    r3.addImage(balloon3);
    r3.scale=0.9;
    r3.velocityY=3;
    r3.lifetime=150;
    
    pinkBalloonGroup.add(r3);
  }


  function redballoon(){
    var r4=createSprite(110,Math.round(random(5,200)),20,10);
    r4.addImage(balloon4);
    r4.scale=0.07;
    r4.velocityY=3;
    r4.lifetime=150;
  
    redBalloonGroup.add(r4);
  }

//Randomly bringing balloons
  function balloonselection(){
    var select_balloon=Math.round(random(1,4));

    if(frameCount%20===0){
      if(select_balloon===1){
        redballoon();
      }else if(select_balloon===2){
        pinkballoon();
      }else if(select_balloon===3){
        blueballoon();
      }else{
        greenballoon();
      }
    }

  }

//Defining a function carrow meaning create arrow
  function carrow(){
    //Creating arrow
      arrow=createSprite(360,200,30,5);
    
    //Setting arrow position
    
      arrow.y=bow.y;
      arrow.x=bow.x;
    
    //Arrow velocity
    
      arrow.velocityX=-5;
    
    arrow.lifetime=80;
    
    arrowGroup.add(arrow);
    
    arrow.setCollider("rectangle",0,0,35,5);

  }

//Function draw which repeats infinitely
  function draw() {  
    
    //Creating an infinite scroling effect
      if(backgr.x<0){
      backgr.x=backgr.width/2;
    }
    
    //Setting the background
      background("backgr");
    

    if(arrowGroup.isTouching(redBalloonGroup)){
      redBalloonGroup.destroyEach();
      arrowGroup.destroyEach();
      score=score+1;
    }
    
     if(arrowGroup.isTouching(greenBalloonGroup)){
      greenBalloonGroup.destroyEach();
      arrowGroup.destroyEach();
      score=score+1;
    }
    
     if(arrowGroup.isTouching(blueBalloonGroup)){
      blueBalloonGroup.destroyEach();
      arrowGroup.destroyEach();
      score=score+1;
    }
    
     if(arrowGroup.isTouching(pinkBalloonGroup)){
      pinkBalloonGroup.destroyEach();
      arrowGroup.destroyEach();
      score=score+1;
    }
    
    if(gameState==="play"){
      
      backgr.velocityX=-4; 
      
       //bow functions
      bow.y=mouseY;
      bow.bounceOff(edges);
      
       //Releasing arrow as soon as space key pressed
      if(keyWentDown("space")){
        
       var temp_arrow=carrow();
       arrow.addImage(arrowLoad);
       arrow.scale=0.2;
        
      }
    
    //Calling a function 
      balloonselection();
      
      if(frameCount%1500===0){
        gameState="end";
      }
      
    }else if(gameState==="end"){
      
         backgr.velocityX=0; 
      
      if(localStorage.highestScore<score){
      
        localStorage.highestScore=score;
      
      }
      
      score=0;
      
        redBalloonGroup.destroyEach();
        pinkBalloonGroup.destroyEach();
        greenBalloonGroup.destroyEach();
        blueBalloonGroup.destroyEach();
      
       bow.y=200;
      
      if(keyDown("r")){
        gameState="play";
      }
      
    }
    
    
    //showing the Sprite
      drawSprites();
    
    text("Score: "+score,260,390,textSize(20));
    text("Highest Score: "+localStorage.highestScore,100,390,textSize(20));
    text("Balloon Buster",80,0,textSize(40),stroke("black"));
    
     if(gameState==="end"){
    text("Round Finished",135,200,textSize(25),stroke("red"));
text("Press R to Continue",135,230,textSize(15),stroke("red"));
     }
    

  }