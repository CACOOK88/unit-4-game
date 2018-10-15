var obiWan = {
    name: "Obi-Wan Kenobi",
    id: "#obiWan",
    hp: 120,
    attackBase: 9,
    attack: 8,
    counterAttack: 25,
    hpSelector: $("#obiWanHP")
}
var skywalker = {
    name: "Luke Skywalker",
    id: "#skywalker",
    hp: 100,
    attackBase: 9,
    attack: 8,
    counterAttack: 25,
    hpSelector: $("#skywalkerHP")
}
var sidious = {
    name: "Darth Sidious",
    id: "#sidious",
    hp: 150,
    attackBase: 9,
    attack: 8,
    counterAttack: 25,
    hpSelector: $("#sidiousHP")
}
var maul = {
    name: "Darth Maul",
    id: "#maul",
    hp: 100,
    attackBase: 9,
    attack: 8,
    counterAttack: 25,
    hpSelector: $("#maulHP")
}

var playerChoice;
var defender;


$(document).ready(function() {
    // initially listen for click on a char tile
    $(".playerRow").on("click", ".choice", function(e) {
        // remove choice class from selected player to make green border
        $("#"+e.currentTarget.id).removeClass("choice").addClass("playerChoice");
        // take remaining 3 characters and add enemy class to make red
        // then remove choice class and move to enemy row
        $(".choice").addClass("enemy").removeClass("choice").detach().appendTo(".enemyRow");
        // set playerChoice to object
        playerChoice = window[this.id];
        console.log(playerChoice);

    });

    // listen for click on enemy tile
    $(".enemyRow").on("click", ".enemy", function(f) {
        // only run code if defenderRow is empty. Keeps from 2 defenders being added
        if ( $(".defenderRow").children().length == 0 ) {
            // set variable to enemy clicked
            var enemyChoice = $("#"+f.currentTarget.id);
            // move enemyChoice to defender row remove enemy class
            // and add defender class for styling and selection
            enemyChoice.removeClass("enemy").addClass("defender").appendTo(".defenderRow");
            // set defender to clicked object
            defender = window[this.id]; 
            console.log(defender);
        }
    });

    // attack button listener
    $(".attack-button").on("click", function(e) {
        // if defender row is empty alert no enemy to attack
        if ( $(".defenderRow").text().length == 0 ) {
            console.log("no enemy to attack");
        } else {
            // defender hp decreased by player attack power
            defender.hp = defender.hp - playerChoice.attack;
            // update html text to new defender hp
            $(defender.hpSelector).text(defender.hp);
            if (defender.hp <=0) {
                $(defender.id).detach();
                alert("You defeated " + defender.name);
            }

            // player hp decreased by defender counter attack
            playerChoice.hp = playerChoice.hp - defender.counterAttack;
            // update html text to new player hp
            $(playerChoice.hpSelector).text(playerChoice.hp);
            // increase player attack by basepower
            if (playerChoice.hp <= 0) {
                $(playerChoice.id).detach();
                alert("You Died");
            }


            playerChoice.attack = playerChoice.attack + playerChoice.attackBase; 


            
            
            









        }
        console.log(playerChoice);
        console.log(defender);
    });
});

