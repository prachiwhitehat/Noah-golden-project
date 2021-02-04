class Game{
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

      snowman1 = createSprite(30,30);
      snowman1.addImage(snowmanImage);
      snowman1.scale = 0.4;
      snowman2 = createSprite(displayWidth - 30, 30);
      snowman2.addImage(snowmanImage);
      snowman2.scale = 0.4;
      snowman3 = createSprite(30, displayHeight - 30);
      snowman3.addImage(snowmanImage);
      snowman3.scale = 0.4;
      snowman4 = createSprite(displayWidth - 30, displayHeight - 30);
      snowman4.addImage(snowmanImage);
      snowman4.scale = 0.4;
      snowmans = [snowman1, snowman2, snowman3, snowman4];

      for(var i = -100; i < 2*width; i = i + 20){
        tree1 = createSprite(i, 0, 80, 140);
        tree1.addImage(treeImage);
        tree1.scale = 0.5;
        tree1Group.add(tree1);
        tree1Group.collide(edges);
    }
    for(var j = -100; j < 2*width; j = j + 20){
        tree2 = createSprite(j, 950, 80, 140);
        tree2.addImage(treeImage);
        tree2.scale = 0.5;
        tree2Group.add(tree2);
        tree2Group.collide(edges);
    }
    for(var k = -100; k < 2*height; k = k + 20){
        tree3 = createSprite(0, k, 80, 140);
        tree3.addImage(treeImage);
        tree3.scale = 0.5;
        tree3Group.add(tree3);
        tree3Group.collide(edges);
    }
    for(var l = -100; l < 2*height; l = l + 20){
        tree4 = createSprite(1450, l, 80, 140);
        tree4.addImage(treeImage);
        tree4.scale = 0.5;
        tree4Group.add(tree4);
        tree4Group.collide(edges);
    }
  }


    play(){


      form.hide();
  
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        background(230);
  
        
        var index = 0;
  
        
        var x = 100;
        var y = 100;
  
        for(var plr in allPlayers){
          
          index = index + 1 ;

          //x = x + 200;
          
          y = displayHeight + allPlayers[plr].distance;
          x = displayWidth + allPlayers[plr].xdistance;

          snowmans[index-1].x = x;
          snowmans[index-1].y = y;
  
          if (index === player.index){
           // camera.position.x = snowmans[index-1].x
           // camera.position.y = snowmans[index-1].y
          }
         
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance -=10
        player.update();
      }

      
      if(keyIsDown(DOWN_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }

      
      if(keyIsDown(LEFT_ARROW) && player.index !== null){
        player.xdistance -=10
        player.update();
      }

      
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.xdistance +=10
        player.update();
      }

      
      
      if (index=== player.index && player.index !== null) {
        for (var a = 0; a < tree1Group.length; a++) { 
          if (tree1Group.get(a).isTouching(snowmans)) { 
           snowmans[index-1].collide(tree1Group.get(a)); 
           //tree1Group.get(a).collide(snowmans);
          } 
        } 
        for (var b = 0; b < tree2Group.length; b++) { 
          if (tree2Group.get(b).isTouching(snowmans)) { 
           snowmans[index-1].collide(tree2Group.get(b)); 
           //tree1Group.get(a).collide(snowmans);
          } 
        } 
        for (var c = 0; c < tree3Group.length; c++) { 
          if (tree3Group.get(c).isTouching(snowmans)) { 
           snowmans[index-1].collide(tree3Group.get(c)); 
           //tree1Group.get(a).collide(snowmans);
          } 
        } 
        for (var d = 0; d < tree4Group.length; d++) { 
          if (tree4Group.get(d).isTouching(snowmans)) { 
           snowmans[index-1].collide(tree4Group.get(d)); 
           //tree1Group.get(a).collide(snowmans);
          } 
        } 
      }
            
      
      drawSprites();
    }


}
