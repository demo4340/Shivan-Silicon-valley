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
        
        gameState : state

      });

    }
  
    start(){

      if(page === 2){

        button2.destroy();
        player = new Player();
        player.getCount();
        form = new Form()
        form.display();
        
      }

    }

    play(){
      
      game.getState();

      if(gameState === 1){

        Player.getPlayerInfo();

        var plrluck = player.luck;
        var plrArray = [];
        var a;
    
        var plrReady = [];

        if(allPlayers !== undefined){

          for(var plr in allPlayers){

            plrArray.push(allPlayers[plr].luck);
            plrReady.push(allPlayers[plr].ready);  

            //console.log(allPlayers[plr].x);
            
          }

          if(allPlayers[plr].ready === true){

              allReady = allReady + 1;
              //console.log(allReady);

          }      

          for(var i = 0; i < plrArray.length; i++){

            a = plrArray[i];

              if(plrluck > a){
                player.state = "player";
                player.update();
              }
              else if(plrluck < a){
                player.state = "hunter";
                player.update();
              }
            
          }
          

        }

      }

    }

    gameStart(){

      if(gameState === 2){

        var index = 0;

        form.hide(); 
        
        if(player.state === "player"){

          playerDamage = 2;
          mainPlayerSprite.scale = 0.5;

        }

        player.x = mainPlayerSprite.x;
        player.y = mainPlayerSprite.y;
        /*
        mainPlayerSprite.rotation = player.rotation;
        playerDamage = player.damage;
        playerWeapon = player.weapon;
        playerArmor = player.armor;
        playerDamageIncrease = player.damageIncrease;
        playerDamageReduction = player.damageReduction;

        weaponSprite.x = player.WeaponX;
        weaponSprite.y = player.WeaponY;*/

        //Player Movement
        mainPlayerSprite.rotateToDirection = true;
        mainPlayerSprite.visible =true;
        weaponSprite.visible = true;
        weaponSprite.rotateToDirection = true;

        //KitEffect

        if(player.choosenKit === "Kit1"){

          playerWeapon = "bow";
          playerArmor = "leather";

        }

        if(player.choosenKit === "Kit2"){

          playerWeapon = "sword";
          playerArmor = "chainmail";

        }

        if(player.choosenKit === "Kit3"){

          playerWeapon = "trident";
          playerArmor = "chainmail";

        }

        //WeaponEffect

        if(playerWeapon === "bow"){

          playerDamageIncrease = 1.2;
          playerRange = 100;
          playerWeaponDelay = 40;
          weaponSprite.addImage("weapon", kitShowImg);

        }

        if(playerWeapon === "sword"){

          playerDamageIncrease = 1.6;
          playerRange = 20;
          playerWeaponDelay = 20;
          weaponSprite.addImage("weapon", kitShowImg2);

        }

        if(playerWeapon === "trident"){

          playerDamageIncrease = 2;
          playerRange = 30;
          playerWeaponDelay = 50;
          weaponSprite.addImage("weapon", kitShowImg3);

        }
        
        //console.log(mainPlayerSprite.rotation);

        //Player Movement

        if(keyDown("left_arrow")){

          mainPlayerSprite.addAnimation("player", playerMovementImage);
          mainPlayerSprite.rotation = 180;
          mainPlayerSprite.velocityX = -3;

          weaponSprite.x = mainPlayerSprite.x - 70;
          weaponSprite.y = mainPlayerSprite.y;
          weaponSprite.rotation = 180;

        }
        else if(keyDown("right_arrow")){

          mainPlayerSprite.addAnimation("player", playerMovementImage);
          mainPlayerSprite.rotation = 0;
          mainPlayerSprite.velocityX = 3;

          weaponSprite.x = mainPlayerSprite.x + 70;
          weaponSprite.y = mainPlayerSprite.y;
          weaponSprite.rotation = 0;

        }
        else if(keyDown("up_arrow")){

          mainPlayerSprite.addAnimation("player", playerMovementImage);
          mainPlayerSprite.rotation = 270;
          mainPlayerSprite.velocityY = -3;

          weaponSprite.x = mainPlayerSprite.x;
          weaponSprite.y = mainPlayerSprite.y -70;
          weaponSprite.rotation = 270;

        }
        else if(keyDown("down_arrow")){

          mainPlayerSprite.addAnimation("player", playerMovementImage);
          mainPlayerSprite.rotation = 90;
          mainPlayerSprite.velocityY = 3;
          
          weaponSprite.y = mainPlayerSprite.x;
          weaponSprite.y = mainPlayerSprite.y + 70;
          weaponSprite.rotation = 90;

        }
        else {

          mainPlayerSprite.velocityX = 0;
          mainPlayerSprite.velocityY = 0;
          mainPlayerSprite.addAnimation("player", playerIdle)

        }

        if(keyWentDown("space") && mainPlayerSprite.rotation === 180){

          weaponSprite.x = weaponSprite.x - 90;

        }
        else if(mainPlayerSprite.rotation === 180){

          weaponSprite.x = mainPlayerSprite.x - 70;

          if(mouseX < mainPlayerSprite.x){

            weaponSprite.pointTo(mouseX, mouseY);

          }

        }

        if(keyWentDown("space") && mainPlayerSprite.rotation === 0){

          weaponSprite.x = weaponSprite.x + 90;

        }
        else if(mainPlayerSprite.rotation === 0){

          weaponSprite.x = mainPlayerSprite.x + 70;

          if(mouseX > mainPlayerSprite.x){

            weaponSprite.pointTo(mouseX, mouseY);

          }

        }

        if(keyWentDown("space") && mainPlayerSprite.rotation > -91 && mainPlayerSprite.rotation < -89){

          weaponSprite.y = weaponSprite.y -90;

        }
        else if(mainPlayerSprite.rotation > -91 && mainPlayerSprite.rotation < -89){

          weaponSprite.y = mainPlayerSprite.y - 70;

          if(mouseY < mainPlayerSprite.y){

            weaponSprite.pointTo(mouseX, mouseY);

          }

        }

        if(keyWentDown("space") && mainPlayerSprite.rotation < 91 && mainPlayerSprite.rotation > 89){

          weaponSprite.y = weaponSprite.y + 90;

        }
        else if( mainPlayerSprite.rotation < 91 && mainPlayerSprite.rotation > 89){

          weaponSprite.y = mainPlayerSprite.y + 70;

          if(mouseY > mainPlayerSprite.y){

            weaponSprite.pointTo(mouseX, mouseY);

          }

        }
        
        //ArmorEffect

        if(playerArmor === "leather"){

          playerDamageReduction = 1.5;

        }

        if(playerArmor === "chainmail"){

          playerDamageReduction = 1.7;

        }

        if(playerArmor === "gold"){

          playerDamageReduction = 2;

        }

        //Player Room Change

        if(mainPlayerSprite.x > 0 && mainPlayerSprite.x < 1500 && mainPlayerSprite.y > 0 && mainPlayerSprite.y < 750){

          camera.x = 750;
          camera.y = 375;
  
      }
      if(mainPlayerSprite.x > 1500 && mainPlayerSprite.x < 3000 && mainPlayerSprite.y > 0 && mainPlayerSprite.y < 750){
  
          camera.x = 2250;
          camera.y = 375;
  
      }
      if(mainPlayerSprite.x < 0 && mainPlayerSprite.x > -1500 && mainPlayerSprite.y > 0 && mainPlayerSprite.y < 750){
  
          camera.x = -750;
          camera.y = 375;
  
      }
  
      //Bottom Rooms
  
      if(mainPlayerSprite.x > 0 && mainPlayerSprite.x < 1500 && mainPlayerSprite.y > 750 && mainPlayerSprite.y < 1500){
  
          camera.x = 750;
          camera.y = 375 + 750;
  
      }
      if(mainPlayerSprite.x > 1500 && mainPlayerSprite.x < 3000 && mainPlayerSprite.y > 750 && mainPlayerSprite.y < 1500){
  
          camera.x = 2250;
          camera.y = 375 + 750;
  
      }
      if(mainPlayerSprite.x < 0 && mainPlayerSprite.x > -1500 && mainPlayerSprite.y > 750 && mainPlayerSprite.y < 1500){
  
          camera.x = -750;
          camera.y = 375 + 750;
  
      }
  
      //Top Rooms
  
      if(mainPlayerSprite.x > 0 && mainPlayerSprite.x < 1500 && mainPlayerSprite.y < 0 && mainPlayerSprite.y > -750){
  
          camera.x = 750;
          camera.y = -375;
  
      }
      if(mainPlayerSprite.x < 0 && mainPlayerSprite.x > -1500 && mainPlayerSprite.y < 0 && mainPlayerSprite.y > -750){
  
          camera.x = -750;
          camera.y = -375;
  
      }
      if(mainPlayerSprite.x > 1500 && mainPlayerSprite.x < 3000 && mainPlayerSprite.y < 0 && mainPlayerSprite.y > -750){
  
          camera.x = 2250;
          camera.y = -375;
  
      }
      
      //Boss Room
  
      if(mainPlayerSprite.x > 3000 && mainPlayerSprite.x < 4500){
  
          camera.x = 3750;
  
          if(mainPlayerSprite.y > -425 && mainPlayerSprite.y < 1125){
  
              camera.y = mainPlayerSprite.y;
  
          }
  
      }

      //Hearts

      //console.log(playerHealth);

      if(keyWentDown("1")){

        playerHealth = playerHealth - 1;
        

      }

      if(playerHealth < 50 && playerHealth > 40){
        heartSprite.addImage(fiveHeart);

      }

      if(playerHealth < 40 && playerHealth > 30){

        heartSprite.addImage(fourHeart);

      }

      if(playerHealth < 30 && playerHealth > 20){

        heartSprite.addImage(threeHeart);

      }

      if(playerHealth < 20 && playerHealth > 10){

        heartSprite.addImage(twoHeart);

      }

      if(playerHealth < 10 && playerHealth > 0){

        heartSprite.addImage(oneHeart);

      }
      
      player.updateInGame();
      
    }

    }
    
  }
  
