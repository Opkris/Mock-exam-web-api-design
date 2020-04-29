
/*
    Here we "simulate" a database with in-memory Map.
    Furthermore, we do not deal with the "proper" handling of
    passwords. Passwords should NEVER be saved in plain text,
    but rather hashed with secure algorithms like BCrypt.
 */

const users = new Map();


function getUser(id){

    return users.get(id);
}

function verifyUser(id, password){

    const user = getUser(id);

    if(!user){
        return false;
    }

    /*
        WARNING: remember that those passwords should be hashed,
        with salt and pepper...
        But we are not dealing with backend details
        in this course, like secure storage of passwords
     */
    return user.password === password;
}

function resetAllUsers(){
    users.clear();
}

function createUser(id, password){

    if(getUser(id)){
        return false;
    }

    const user = {
        id: id,
        balance: 1000,
        password: password,
        usersPokemons: []
    };

    users.set(id, user);
    return true;
}


function transferMoney(senderId, receiverId, amount){

    amount = parseInt(amount);

    if(isNaN(amount) || amount <= 0 || senderId === receiverId){
        return false;
    }

    const sender = users.get(senderId);
    const receiver = users.get(receiverId);

    if(!sender || !receiver){
        return false;
    }

    if(sender.balance < amount){
        return false;
    }

    sender.balance -= amount;
    receiver.balance += amount;

    return true;
}



const randomPokemonArray = [];
const myPokemonArray = [];

const pokemonArray = [
    {
        id: 1,
        pokedex: "001",
        name: "Bulbasaur",
        price: "99",
        type: [
            "Grass",
            " Poison"
        ],
        master: "",
    },
    {
        id: 2,
        pokedex: "002",
        name: "Ivysaur",
        price: "189",
        type: [
            "Grass",
            " Poison"
        ],
        master: "",
    },
    {
        id: 3,
        pokedex: "003",
        name: "Venusaur",
        price: "1089",
        type: [
            "Grass",
            " Poison"
        ],
        master: "",
    },
    {
        id: 4,
        pokedex: "004",
        name: "Charmander",
        price: 99,
        type: [
            "Fire"
        ],
        master: "",
    },
    {
        id: 5,
        pokedex: "005",
        name: "Charmelon",
        price: 199,
        type: [
            "Fire"
        ],
        master: "",
    },
    {
        id: 6,
        pokedex: "006",
        name: "Charizard",
        price: 1089,
        type: [
            "Fire",
            " Flying"
        ],
        master: "",
    },
    {
        id: 7,
        pokedex: "007",
        name: "Squirtle",
        price: 99,
        type: [
            "Water"
        ],
        master: "",
    },
    {
        id: 8,
        pokedex: "008",
        name: "Wartortle",
        price: 99,
        type: [
            "Water"
        ],
        master: "",
    },
    {
        id: 9,
        pokedex: "009",
        name: "Blastoise",
        price: 99,
        type: [
            "Water"
        ],
        master: "",
    },
    {
        id: 10,
        pokedex: "010",
        name: "Caterpie",
        price: 99,
        type: [
            "Bug"
        ],
        master: "",
    },
    {
        id: 11,
        pokedex: "011",
        name: "Metapod",
        price: 99,
        type: [
            "Bug"
        ],
        master: "",
    },
    {
        id: 12,
        pokedex: "012",
        name: "Butterfree",
        price: 99,
        type: [
            "Bug",
            " Flying"
        ],
        master: "",
    },
    {
        id: 13,
        pokedex: "013",
        name: "Weedle",
        price: 99,
        type: [
            "Bug"
        ],
        master: "",
    },
    {
        id: 14,
        pokedex: "014",
        name: "Kakuna",
        price: 99,
        type: [
            "Bug",
            " Poison"
        ],
        master: "",
    },
    {
        id: 15,
        pokedex: "015",
        name: "Beedrill",
        price: 99,
        type: [
            "Bug",
            " Poison"
        ],
        master: "",
    },
    {
        id: 16,
        pokedex: "016",
        name: "Pidgey",
        price: 99,
        type: [
            "Normal",
            " Flying"
        ],
        master: "",
    },
    {
        id: 17,
        pokedex: "017",
        name: "Pidgeotto",
        price: 99,
        type: [
            "Normal",
            " Flying"
        ],
        master: "",
    },
    {
        id: 18,
        pokedex: "018",
        name: "Pidgeot",
        price: 99,
        type: [
            "Normal",
            " Flying"
        ],
        master: "",
    }, {
        id: 19,
        pokedex: "063",
        name: "Abra",
        price: 299,
        type: [
            "Psychic",
        ],
        master: "",
    }, {
        id: 20,
        pokedex: "064",
        name: "Kadabra",
        price: 999,
        type: [
            "Psychic"
        ],
        master: "",
    }, {
        id: 21,
        pokedex: "065",
        name: "Alakazam",
        price: 2599,
        type: [
            "Psychic",
        ],
        master: "",
    },
];

function getAllPokemons(){
    return Array.from(pokemonArray.values());
}
function getMyPokemon(){
    return Array.from(myPokemonArray.values());
}
function getRandomPokemon() {
    let i = 0;

    if(randomPokemonArray.length > 0){
        while ( randomPokemonArray.length > 0){
            randomPokemonArray.pop()
        }
    }
    while (i < 3) {

        const newPokemon = Math.floor(pokemonArray.length * Math.random());

        // console.log(pokemonsArray[newPokemon]);

        randomPokemonArray.push(pokemonArray[newPokemon]);
        myPokemonArray.push(pokemonArray[newPokemon]);
        i++;
    }
    return Array.from(randomPokemonArray.values());
}


function deletePokemon(id){

    return pokemon.delete(id);
}

function getPokemon(id){

    return pokemon.get(id)
}


module.exports = {getUser, verifyUser, createUser, transferMoney, getAllPokemons, getMyPokemon, getRandomPokemon,
    getPokemon, deletePokemon , resetAllUsers};
