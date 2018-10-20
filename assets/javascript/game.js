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
    hpBase: 120,
    id: "#obiWan"
}
var skywalker = {
    name: "Luke Skywalker",
    hp: 100,
    attackBase: 15,
    attack: 15,
    counterAttack: 5,
    hpSelector: $("#skywalkerHP"),
    hpBase: 100,
    id: "#skywalker"
}
var sidious = {
    name: "Darth Sidious",
    hp: 150,
    attackBase: 15,
    attack: 15,
    counterAttack: 20,
    hpSelector: $("#sidiousHP"),
    hpBase: 150,
    id: "#sidious"
}
var maul = {
    name: "Darth Maul",
    hp: 180,
    attackBase: 15,
    attack: 15,
    counterAttack: 25,
    hpSelector: $("#maulHP"),
    hpBase: 180,
    id: "#maul"
}
//  VARIABLES TO KEEP TRACK OF PLAYER AND DEFENDER SELECTIONS
var playerChoice = "";
var defender = "";


// **************************************************
//
//              FUNCTIONS
//
// **************************************************  


function playerSelection(clicked) {
    // remove choice class from selected player to make green border
    $("#"+clicked.id).removeClass("choice").addClass("playerChoice");
    // take remaining 3 characters and add enemy class to make red
    // then remove choice class and move to enemy row
    $(".choice").addClass("enemy").removeClass("choice").detach().appendTo(".enemyRow");
    // set playerChoice to object
    playerChoice = window[clicked.id];
}
function enemySelection(clicked) {
    $("#result-text").empty();
    // only run code if defenderRow is empty. Keeps from 2 defenders being added
    if ( $(".defenderRow").children().length == 0 ) {
        // move enemyChoice to defender row remove enemy class
        // and add defender class for styling and selection
        $("#"+clicked.id).removeClass("enemy").addClass("defender").appendTo(".defenderRow");
        // set defender to clicked object
        defender = window[clicked.id]; 
        // make sure there's no message to select enemy
        $(".noEnemy").empty();
    }
}
function attackButton() {
    // if defender row is empty ask user to choose an enemy
    // else if all enemies have been defeated, ask user to click reset
    // else if player is dead, ask user to click reset
    // else run functions for gameplay
    if ( $(".defenderRow").children().length == 0 ) {
        $(".noEnemy").text("Please Choose An Enemy To Fight");
    } else if ( $(".dead-char").children().length == 3 ) {
        $(".noEnemy").text("There Are No Enemies To Fight. Click Reset");
    } else if ( $(".playerRow").children().length == 0 ) {
        $(".noEnemy").text("You Are Dead. Please Click Reset") 
    } else {
        playerDead();
        defenderDead();
        gameOver();         
    }
}
function playerDead() {
    // Make sure player is still alive
    if (playerChoice.hp >= 0) {
        // defender hp decreased by player attack power
        defender.hp = defender.hp - playerChoice.attack;
        // update html text to new defender hp
        $(defender.hpSelector).text(defender.hp);
        // print attack message on screen
        $("#attack-text").text("You attacked "+ defender.name + " for " + playerChoice.attack + " damage!!");
        // check if defender was killed
        if (defender.hp <=0) {
            // remove defender tile if dead and put in hidden div
            $(defender.id).appendTo(".dead-char");
            // update defeated text
            $("#result-text").text("You defeated " + defender.name);
            // clear attack and counter text
            $("#attack-text").empty();
            $("#counter-text").empty();
        }
        // increase player attack by basepower
        playerChoice.attack = playerChoice.attack + playerChoice.attackBase; 
    }
}
function defenderDead() {
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
            // if player dies, remove char tile and put in hidden div
            $(playerChoice.id).appendTo(".dead-char");
            // update defeated text
            $("#result-text").text("You were defeated by " + defender.name);   
            // clear attack and counter text
            $("#attack-text").empty();
            $("#counter-text").empty();
        }
    }
}
function gameOver() {
    // check if all enemies are dead else if player is dead
    if ( $(".enemyRow").children().length == 0  &&  $(".defenderRow").children().length == 0) {
        // update win text and make red, add to header
        $(".game-over-text").text("You Have Defeated All Enemies!!!").css("color", "red").appendTo(".header");
        // show reset button
        $(".reset-button").removeClass("hidden");
    } else if (playerChoice.hp <= 0) {
        // update new div with loss text, make red, add to header
        $(".game-over-text").text("You Have Been Defeated By " + defender.name).css("color", "red").appendTo(".header");
        // show reset button
        $(".reset-button").removeClass("hidden");
    }
}
function resetHP() {
    // set default hp for all characters
    obiWan.hp = obiWan.hpBase;
    $(obiWan.hpSelector).text(obiWan.hp);
    skywalker.hp = skywalker.hpBase;
    $(skywalker.hpSelector).text(skywalker.hp);
    sidious.hp = sidious.hpBase;
    $(sidious.hpSelector).text(sidious.hp);
    maul.hp = maul.hpBase;
    $(maul.hpSelector).text(obiWan.hp);
}
function resetAttack() {
    // set default attack power for all characters
    obiWan.attack = obiWan.attackBase;
    skywalker.attack = skywalker.attackBase;
    sidious.attack = sidious.attackBase;
    maul.attack = maul.attackBase;  
}
function resetButton() {
    // clear win and loss text
    $(".game-over-text").empty();
    // hide reset button
    $(".reset-button").addClass("hidden")
    resetHP(); //reset all characters hp
    resetAttack(); //reset all characters attack
    // char and choice should be tiles only classes and add to player row.
    $(".char").removeClass().addClass("char choice").appendTo(".playerRow");
    playerChoice = "";
    defender = "";
}


// **************************************************
//
//              GAMEPLAY
//
// **************************************************  


$(document).ready(function() {
    // initially listen for click on a char tile
    $(".playerRow").on("click", ".choice", function() {
        playerSelection(this);
    });
    // listen for click on enemy tile
    $(".enemyRow").on("click", ".enemy", function() {
        enemySelection(this);
    });
    // attack button listener
    $(".attack-button").on("click", function(e) {
        attackButton();
    });

    // reset button
    $(".header").on("click", ".reset-button", function() {
        resetButton();
    });
});