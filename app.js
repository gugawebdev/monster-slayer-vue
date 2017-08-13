new Vue({
    el:"#app",
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning: false,
        turns:[]

    },
    methods:{
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []
        },
        attack: function(){

            playerDamage = this.calculateDamage(3,10)
            monsterDamage = this.calculateDamage(3,10)


            this.turns.unshift({
                isPlayer:true,
                text:"Player hits monster and deal:" + playerDamage + " damage."
            })

            this.turns.unshift({
                isMonster:true,
                text:"Monster hits player and deal:" + monsterDamage + " damage."
            })


            
            this.playerHealth = this.playerHealth - playerDamage;
            this.monsterHealth = this.monsterHealth - monsterDamage;
        },

        specialAttack: function(){
            playerSpecial = this.calculateDamage(5,15)
            monsterSpecial = this.calculateDamage(5,15)

            this.turns.unshift({
                isPlayer:true,
                text:"Player hits an special on monster and deal:" + playerSpecial + " damage."
            })

            this.turns.unshift({
                isMonster:true,
                text:"Monster hits an special on player and deal:" + monsterSpecial + " damage."
            })

            this.playerHealth = this.playerHealth - playerSpecial
            this.monsterHealth = this.monsterHealth - monsterSpecial;

        },

        heal: function(){
            var healPlayer = Math.floor((Math.random() * 10) + 1);
            var healMonster = Math.floor((Math.random() * 10) + 1);
            
            this.playerHealth = this.playerHealth + healPlayer;
            this.monsterHealth = this.monsterHealth + healMonster;

        },
        giveUp: function(){
            this.gameIsRunning = false;

        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random()* max) +1, min);
        },

    },
    watch:{
        playerHealth: function(){
            if(this.playerHealth <=0 && this.monsterHealth > 0){
                if(confirm("Monster WIN. Wanna play a new game?")){
                    this.startGame()
                }                
                return;
            }

            if(this.playerHealth >= 100){
                this.playerHealth = 100;
            }
        },
        monsterHealth:function(){
            if(this.monsterHealth <=0 && this.playerHealth > 0){
               if(confirm("You WIN. Wanna play a new game?")){
                    this.startGame()
                }         
                return;
            }

            if(this.monsterHealth >= 100){
                this.monsterHealth = 100
            }
        }
    }
})