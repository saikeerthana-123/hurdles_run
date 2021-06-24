class Game {
    constructor(){
      
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
      car1 = createSprite(10,200);
      car1.addImage("car1",car1img);
      car1.velocityY = 2;
      car2 = createSprite(10,400);
      car2.addImage("car2",car2img);
      car2.velocityY = 2;
      car3  = createSprite(10,600);
      car3.addImage("car3",car3img);
      car3.velocityY = 2;
      car4 = createSprite(10,800);
      car4.addImage("car4",car4img);
      car4.velocityY = 2;
      cars = [car1, car2, car3, car4];
      ground1 = createSprite(displayWidth/2, 300, displayWidth*5, 10);
      //ground1.visible = false;
      ground2 = createSprite(displayWidth/2, 580, displayWidth*5, 10);
      //ground2.visible = false;
      ground3 = createSprite(displayWidth/2, 780, displayWidth*5, 10);
      //ground3.visible = false;
      ground4 = createSprite(displayWidth/2, 900, displayWidth*5, 10);
      //ground4.visible = false;
    }
  
    play(){
      form.hide();
      Player.getPlayerInfo();
      spawnObstacles()
      if(allPlayers !== undefined){
        //var display_position = 100;
        background(rgb(223, 178, 140));
        image(backgroundImage,displayWidth,0,displayWidth*5,displayHeight);
        //index of the array
        var index = 0;
        //x and y position of the cars
        var y = 100;
        var x = 50;
        car1.collide(ground1);
        car2.collide(ground2);
        car3.collide(ground3);
        car4.collide(ground4);
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
          //position the cars a little away from each other in y direction
          y = y + 150;
          //use data form the database to display the cars in x direction
          x = 360 - allPlayers[plr].distance;
          cars[index-1].x = x;
          cars[index-1].y = y;
          cars[index-1].velocityY = 2

          if (index === player.index){
            cars[index - 1].shapeColor = "red";
            camera.position.y = displayHeight/2;
            camera.position.x = cars[index-1].x
            stroke(10);
            fill(rgb(252, 148, 148));
            ellipse(x,y,80,80);
            player.x = x;
            player.y = y;

            if(keyDown("up_arrow")){
              cars[index-1].velocityY = -2;
              //cars[index-1].velocityY += 0.5;
              console.log("Hello")
            }
          }
          if(keyIsDown(RIGHT_ARROW) && player.index !== null){
            player.distance +=10
            player.update();
          }
        }
      }
      
      if(player.distance>9000){
        gameState = 2;
      }
  
      drawSprites();
    }
  
    end(){
      console.log("game ended");
      //rank();
    }
  
    rank(){
      if(player.distance>4200){
        player.rank = 1;
        text("rank1:"+player.rank,displayWidth/2,displayHeight/2);
      }
    }
  
  }

function spawnObstacles(){
   //hurdles
    if(frameCount % 360===0){
      var hurdle = createSprite(5000,350,10, 10);
      hurdle.velocityX = -2;
      hurdle.addImage("hurdleimg",hurdleimg);
      hurdle.scale = 0.3;
    }
}