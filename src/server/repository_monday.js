/*
    This would be the access to a Database (eg, Postgres or MySQL).
    But, here, for simplicity, we do all in memory.
 */

// map from ids to meals
const meals = new Map();

//used to create unique ids
let counter = 0;

function initWithSomeMeals(){

    meals.clear();
    counter = 0;

    createNewMeal("Grillet Kyllingfilet", "99,-", "M, S, GB, GH");
    createNewMeal("Grillet laks", "99,-", "S, M, SF, E, SN");
    createNewMeal("Spareribs", "209,-", "GH, S, SE, E, SN, M");
    createNewMeal("Farmer's choice", "189,-", "SE, M, S, GB, GH");
    createNewMeal("All you can eat", "299,-", "**");
    createNewMeal("Quorn burger", "189,-", "E, M, S, GH, SE, SN, SM, GR");
    createNewMeal("Bacon/cheeseburger", "299,-", "M, S, GH, SE, SN, SM, GR, E");
}

function createNewMeal(name, price, allergies){

    const id = "" + counter;
    counter++;

    const meal = {
        id: id,
        name: name,
        price: price,
        allergies: allergies
    };

    meals.set(id, meal);

    return id;
}

function deleteMeal(id){

    return meals.delete(id);
}

function getMeal(id){

    return meals.get(id);
}

function getAllMeals(){

    return Array.from(meals.values());
}

function updateMeal(book){

    if(! meals.has(book.id)){
        return false;
    }

    meals.set(book.id, book);
    return true;
}

function getAllMealsSince(allergies){

    return meals.values().filter(b => b.allergies >= allergies);
}

module.exports = {initWithSomeMeals: initWithSomeMeals, getAllMeals: getAllMeals, getAllBooksSince: getAllMealsSince,
    createNewBook: createNewMeal, getMeal: getMeal, updateMeal: updateMeal, deleteMeal: deleteMeal};
