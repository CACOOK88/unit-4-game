
var characters = {
    obiWan: {
        name: "Obi-Wan Kenobi",
        hp: 120,
        attackBase: 8,
        attack: 8,
        counterAttack: 10,
        hpSelector: $("#obiWanHP"),
        hpBase: 120,
        id: "#obiWan"
    },
    skywalker: {
        name: "Luke Skywalker",
        hp: 100,
        attackBase: 15,
        attack: 15,
        counterAttack: 5,
        hpSelector: $("#skywalkerHP"),
        hpBase: 100,
        id: "#skywalker"
    },
    sidious: {
        name: "Darth Sidious",
        hp: 150,
        attackBase: 15,
        attack: 15,
        counterAttack: 20,
        hpSelector: $("#sidiousHP"),
        hpBase: 150,
        id: "#sidious"
    },
    maul: {
        name: "Darth Maul",
        hp: 180,
        attackBase: 15,
        attack: 15,
        counterAttack: 25,
        hpSelector: $("#maulHP"),
        hpBase: 180,
        id: "#maul"
    }
}

let name = "#"


console.log(characters.$("#obiWan").id);