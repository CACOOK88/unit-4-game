// **************************************************
//
//              OBJECT VARIABLES
//
// **************************************************                  
var obiWan = {
    name: "Obi-Wan Kenobi",
    hp: 120,
    attackBase: 8,
    attack: 8,
    counterAttack: 10,
    hpSelector: $("#obiWanHP"),
    id: "#obiWan"
}
var skywalker = {
    name: "Luke Skywalker",
    hp: 100,
    attackBase: 15,
    attack: 15,
    counterAttack: 5,
    hpSelector: $("#skywalkerHP"),
    id: "#skywalker"
}
var sidious = {
    name: "Darth Sidious",
    hp: 150,
    attackBase: 15,
    attack: 15,
    counterAttack: 20,
    hpSelector: $("#sidiousHP"),
    id: "#sidious"
}
var maul = {
    name: "Darth Maul",
    hp: 180,
    attackBase: 15,
    attack: 15,
    counterAttack: 25,
    hpSelector: $("#maulHP"),
    id: "#maul"
}
//  VARIABLES TO KEEP TRACK OF PLAYER AND DEFENDER SELECTIONS
var playerChoice;
var defender;

// **************************************************
//
//              FUNCTIONS
//
// **************************************************  







// **************************************************
//
//              GAMEPLAY
//
// **************************************************  
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
    });

    // listen for click on enemy tile
    $(".enemyRow").on("click", ".enemy", function(f) {
        $("#result-text").empty();
        // only run code if defenderRow is empty. Keeps from 2 defenders being added
        if ( $(".defenderRow").children().length == 0 ) {
            // set variable to enemy clicked
            var enemyChoice = $("#"+f.currentTarget.id);
            // move enemyChoice to defender row remove enemy class
            // and add defender class for styling and selection
            enemyChoice.removeClass("enemy").addClass("defender").appendTo(".defenderRow");
            // set defender to clicked object
            defender = window[this.id]; 
        }
    });

    // attack button listener
    $(".attack-button").on("click", function(e) {
        // if defender row is empty alert no enemy to attack
        if ( $(".defenderRow").text().length == 0 ) {
            console.log("no enemy to attack");
        } else {

            if (playerChoice.hp >= 0) {
                // defender hp decreased by player attack power
                defender.hp = defender.hp - playerChoice.attack;
                // update html text to new defender hp
                $(defender.hpSelector).text(defender.hp);
                // print attack message on screen
                $("#attack-text").text("You attacked "+ defender.name + " for " + playerChoice.attack + " damage!!");
                // check if defender was killed
                if (defender.hp <=0) {
                    // remove defender tile if dead
                    $(defender.id).remove();
                    // update defeated text
                    $("#result-text").text("You defeated " + defender.name);
                    // clear attack and counter text
                    $("#attack-text").empty();
                    $("#counter-text").empty();
                }
            }

            // check if defender dies on player's attack. if defender died, no counter attack should be applied.
            if (defender.hp >= 0) {
                // player hp decreased by defender counter attack
                playerChoice.hp = playerChoice.hp - defender.counterAttack;
                // update html text to new player hp
                $(playerChoice.hpSelector).text(playerChoice.hp);
                // print counter attack message on screen
                $("#counter-text").text(defender.name + " attacked you for " + defender.counterAttack + " damage!!");
                // check if player dies
                if (playerChoice.hp <= 0) {
                    // if player dies, remove char tile
                    $(playerChoice.id).remove();
                    // update defeated text
                    $("#result-text").text("You were defeated by " + defender.name);   
                    // clear attack and counter text
                    $("#attack-text").empty();
                    $("#counter-text").empty();     
                }
            }
            
            // check if all enemies are dead else if player is dead
            if ( $(".enemyRow").children().length == 0  &&  $(".defenderRow").children().length == 0) {
                // create new div to hold win message
                var winner = $("<h2>");
                // update win text and make red, add to header
                winner.text("You Have Defeated All Enemies!!!").css("color", "red").appendTo(".header");
                // show reset button
                $(".reset-button").removeClass("hidden");
            } else if (playerChoice.hp <= 0) {
                // create new div to hold loser message
                var loser = $("<h2>");
                // update new div with loss text, make red, add to header
                loser.text("You Have Been Defeated By " + defender.name).css("color", "red").appendTo(".header");
                // show reset button
                $(".reset-button").removeClass("hidden");
            }

            // increase player attack by basepower
            playerChoice.attack = playerChoice.attack + playerChoice.attackBase; 

        }
        console.log(playerChoice);
        console.log(defender);
    });

    // reset button
    $(".header").on("click", ".reset-button", function() {
        // add in reset functionality

        
    });
});