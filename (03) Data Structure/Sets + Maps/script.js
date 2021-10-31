'use strict';

const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    openingHours: {
        sat: {
            open: 12,
            close: 22,
        },
        fri: {
            open: 11,
            close: 23,
        },
        mon: {
            open: 0, // Open 24 hours
            close: 24,
        }
    },

    order(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex],
            this.mainMenu[mainIndex]]
    }
};

/*
* ### Sets (it)
* We need to pass an Iterable to the Set.
* All the elements are Unique.
* There is no way to get an element out of a set. if we need to store variables to retrieve them later, we should use
* something else. Sets will tell us that if they contain a value or not.
* */
// Iterable : array
const orderArray = [
    "Pasta",
    "Pizza",
    "Pizza",
    "Risotto",
    "Pasta",
    "Pizza",
];
const orderSet = new Set(orderArray);
console.log(orderSet);
// Iterable : String
console.log(new Set("Fuck"));
// Methods :
console.log(orderSet.size);
console.log(orderSet.has("Pizza"));
orderSet.add("Bread");
orderSet.delete("Pizza");
orderSet.clear();
// Looping
for (const string of orderSet) {
    console.log(string);
}
/* Remove duplicates of Array */
const noDuplicateArray = [...new Set(orderArray)];
console.log(noDuplicateArray);



/*
 ### Maps
* key value can be anything.
* set-get-has-delete-clear
* */

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));  /* set Method also returns the map */

/* set -> returns the map again so we can call set again. */
rest
    .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
    .set('open', 11)
    .set('close', 23)
    .set(true, 'We are open :D')
    .set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 8; // wtf
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
// rest.clear();
/* Using array as the Key */
const arr = [1, 2];
rest.set(arr, 'Test');
/* Using objects (DOM elements are special type of objects ) */
//rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr));


/*
* ###  Maps Iteration
* */

/* Better way to create a Map-Filter-Reduce-Find */
const question = new Map([
    // An array that each element is also an array of [ key , value ]. (Like entries)
    ['question', 'What is the best programming language in the world?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['correct', 3],
    [true, 'Correct 🎉'],
    [false, 'Try again!'],
]);
console.log(question);

/* Convert object to map */
const hoursMap = new Map(Object.entries(restaurant.openingHours));
console.log(hoursMap);

/* Looping Maps */
for (const [key, value] of question) {
    if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);
/* Why he made it this hard ? god knows */
console.log(question.get(question.get('correct') === answer));

/* Convert map to array*/
console.log([...question]);
// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);















