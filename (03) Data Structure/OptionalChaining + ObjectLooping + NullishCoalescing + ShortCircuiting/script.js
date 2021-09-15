'use strict';
/* property names can be computed and not be hard coded by using   [ ]   */
const week = ["thu" , "fri", "sat"];
const o = "opennnnn";
const hours =  {
    [week[0]]: {
        [o]: 12,
        close: 22,
    },
    [week[1]]: {
        open: 11,
        close: 23,
    },
    [week[3] + `4444`]: {
        open: 0, // Open 24 hours
        close: 24,
    }
}

const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    /* Objects that are implemented out of current object */
    openingHours : hours,

    /* Functions can now be written like this */
    order (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex],
            this.mainMenu[mainIndex]]
    }
    // order: function (starterIndex, mainIndex) {
    //     return [this.starterMenu[starterIndex],
    //         this.mainMenu[mainIndex]]
    // }

};



console.log(restaurant.openingHours);

/* ### Short Circuiting
* && -> returns first falsy value and ignores the rest
* || -> returns first truly value and ignores the rest
*
* With that being said,
* now we can use "&&" as if statement
* and use "||" to set default values.
* */

const aa = 20;
let bb = 0;
//-------- &&
if(aa) {
    bb++;
}
// If aa is false , then it will short circuit the rest.
aa && bb++;

// ------- ||
// If aa is false , then the default value of 10 will be replaced. (returns first truly value)
let numberOfGuests = aa || 10;

/* Nullish coalescing operator
There is a problem. If we want to only use the default data when the "aa" is undefined or when its null,
* (maybe we need it to be 0 ! ) then, we should write like this.
* ?? -> returns the first not nullish value. ( null or undefined ) */
numberOfGuests = aa ?? 10; // If aa = 0, number of guests wont be 10.


/* For-of Loop + entries
* entries makes each element an Array of [ index, element]  */
for(const item of restaurant.mainMenu.entries()) console.log(item);
for(const [index, element] of restaurant.mainMenu.entries());



/*
* ### Optional chaining   "?."
* On property chain : If a part of chain to reach a property does not exist, it will return undefined.
* On chain function call : if the function does not exist, it will return what we've put after  "??"
* On Arrays : checks if the element exists on the array or not.
* */

/* Property*/
// console.log(restaurant.openingHours.mon.open); // logs error cause there is no mon
console.log(restaurant.openingHours.mon?.open); // if any part before ".open" doesn't exist, returns undefined.  (No error)
/* Function */
console.log(restaurant.order(1,0));
console.log(restaurant.orderSomething?.(0,1) ?? "Method not available" ); // No error
/* Array */
const users = [{name: "jonas", email: "something"}];
console.log(users[0]?.name ?? "User not found");




/* ### Looping over object properties
* Object.keys( __ObjectName__ );  returns an Array of object properties.
* Object.values( __ObjectName__); returns an Array of object property values.
* (Object.entries( __ObjectName__ ); returns an Array that each element is also an Array of [ key, value ].
*  */

console.log(Object.values(restaurant.openingHours));
console.log("###");
console.log(Object.keys(restaurant.openingHours));
console.log("###");

console.log(Object.entries(restaurant.openingHours));
const entries = Object.entries(restaurant.openingHours); // array of entries
for (const [key, {open, close}] of entries) {
    console.log(`on ${key} we open at ${open} and close at ${close}`);
}






















