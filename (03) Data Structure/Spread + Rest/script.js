'use strict';

// Data needed for a later exercise
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    openingHours: {
        thu: {
            open: 12,
            close: 22,
        },
        fri: {
            open: 11,
            close: 23,
        },
        sat: {
            open: 0, // Open 24 hours
            close: 24,
        },
    },
    save: function (ing1, ing2, ing3) {
        console.log(`A pasta made of ${ing1}  ${ing2}  ${ing3}`);
    }
};


/* Spread operator  --> use it when want to use each array element seperated by " , " *
* Works on all iterables(Strings, Arrays, Maps, Sets)  and Objects.
 */
const arr = [3, 4, 5];
// If we need array elements individually (جدا حدا) we can use spread operator
console.log(...arr);
console.log(3, 4, 5); // Same as above
// Adding elements to the beginning of an Array
const newArr = [1, 2, ...arr];
// Making new menu
const newMainMenu = [...restaurant.mainMenu, "Orange", "Apple"];

// Copy array
const newMainMenuCopy = [...newMainMenu];

// Join 2 arrays
const fullMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// It unpacks the string letter by letter :
const str = "Mother";
const newStrAsArray = [...str, "f", "u", "c", "k", "e", "r"]; // Log : ['M', 'o', 't', 'h', 'e', 'r', 'f', 'u', 'c', 'k', 'e', 'r']
console.log(newStrAsArray)

// spreading Objects :
const newRestaurant = {
    foundedIn: 1990,
    ...restaurant,  // spread all the elements of the object !
    founder: "Cock"
}
// Copy object
const restaurantCopy = {
    ...restaurant
}

// A function with spread operator
const ingredients = [
    // prompt("Let's make Pasta, Ing no 1 ? "),
    // prompt("2 ?"),
    // prompt("3 ?"),
];
/* USAGE */
restaurant.save(...ingredients);

/* Rest :
* Rest operator collects the unused elements in destructuring. opposite of Spread.
* Left side of the "=" is REST, right side is Spread.
* */

const [a, b, ...others] = [1, 2, 3, 4, 5];
// Rest collects all the unused elements after the last used element.so the skipped ones wont be included.
// also in must be the last expression in the array ofc.
// and therefore we cant have two Rest in any destructuring assigment.
const [pizza, ,risotto, ...otherFoods ] = [...restaurant.mainMenu , ...restaurant.starterMenu ];

// Object
const { fri, ...weekdays } = restaurant.openingHours;
console.log( weekdays);

// Functions
const add = function (...numArray) {
    let sum = 0;
    for (let i = 0; i < numArray.length; i++) {
        sum += numArray[i];
    }
    console.log(sum);
}
add(2,2,2,3);




