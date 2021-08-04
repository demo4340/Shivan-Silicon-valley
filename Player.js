class Player {
  constructor(){

    this.index = null;
    this.name = null;
    this.choosenKit = 0;
    this.luck = round(random(0, 60));
    this.state = null;
    this.ready = false;

    this.damage = null;
    this.damageReduction = null;
    this.damageIncrease = null;
    this.armor = null;
    this.rotation = null;
    this.x = null;
    this.y = null;
    this.weapon = null;

    this.WeaponX = null;
    this.WeaponY = null;

    //this.xArray = [];
    //this.yArray = [];
    this.XYarray = [];

  }

  getCount(){

      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",function(data){
      
          playerCount = data.val();
    
      });

    }

  getReadiness () {

    var ready = database.ref('players/player' + index);
    ready.on("value", (data)=> {

      readiness = data.val();

    });

  }


  updateCount(count){

      database.ref('/').update({

          playerCount: count
      
      });

  }

  update(){

    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({

      name : this.name,
      kit : this.choosenKit,
      luck : this.luck,
      state : this.state,
      ready : this.ready

    });

  }

  updateInGame(){

    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({

      name : this.name,
      kit : this.choosenKit,
      luck : this.luck,
      state : this.state,
      ready : this.ready,

      damage : this.damage ,
      damageReduction : this.damageReduction ,
      damageIncrease : this.damageIncrease ,
      armor : this.armor ,
      rotation : this.rotation ,
      x : this.x ,
      y : this.y ,
      weapon : this.weapon,

      //weaponx : this.weaponX,
      //weapony : this.weaponY

    });

  }


  getXInGame(){


    var XYref = database.ref('players/player' + this.index);
    XYref.on("value", function(data){
      XYvalue = data.val();
      //console.log(XYvalue.x);
      var XYposition = [XYvalue.x, XYvalue.y];
      console.log(XYposition);

    })

  }

  
  

  static getPlayerInfo(){

    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{

      allPlayers = data.val();

    })
    
  }

  
  
}
