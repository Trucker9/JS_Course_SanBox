'use strict';
const restaurant = {
    name: 'Classico Italiano',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex],
            this.mainMenu[mainIndex]]
    },

    /* Using Objects in function arguments*/
    // We used an object as argument and have defined default variables in case that one of the arguments was missing in function call
    orderDelivery : function ({starterIndex = 0, mainIndex = 0, time = "00:00" , address = "No Address"}) {

        console.log(`New Order !
         Starter: ${starterIndex}
          Main Course: ${mainIndex}
           Time limit: ${time}
            Address: ${address}`);
    },

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
};




/* --------------------------------------------------- Destructing Arrays */
const numberArray = ["one", "two", "three", "four", "five"];
const [first, second] = numberArray; // one    two
const [first1, , third3] = numberArray // one    three
// Nested
const nested = [2, 4, [5, 6]];
const [i, , [j1, j2]] = nested;  // i=2    j1=5   j2=6
// Setting a default value in case variable was not found on the array
const def = [8, 9];
const [p = 1, q = 1, r = 1] = def;  // Now "r" will be "1" (not undefined) because it was not found.

// Switching variables trick 
let a = 5;
let b = 7;
//old
const temp = a;
a = b;
b = temp;
//new 
[a, b] = [b, a];

// Returning two variable out of a function and string them separately
const [starter, main] = restaurant.order(2, 0);


/* --------------------------------------------------- Destructing Objects */
// ---------- Extracting variables from the restaurant object
const {name, openingHours, categories} = restaurant;
// With specific names
const {name: extractedName,
    openingHours: exOpeningHours,
    categories: exCategories
} = restaurant;
// With default value
const {
    name: restaurantName = "No Name",
    starterMenu: starterFood = [], // If starter menu was not available it will assign to [].
} = restaurant;

// ---------- Mutating variables in objects
let aa = 111;
let bb = 222;
const sampleOBJ = {a: 111,  b: 222, c: 333};
// ERROR : We cant assign a block to an object.
/*{a, b} = sampleOBJ;*/
// SOLVE :
( {a, b} = sampleOBJ );

// ---------- Nested Objects
// const { fri } = restaurant.openingHours;  ---> Step one
const {
    fri: {open : openH}

} = restaurant.openingHours;

// ---------- Function call with Object argument
restaurant.orderDelivery({time: "22:30", address:"someWhere", mainIndex:2, starterIndex:1});
restaurant.orderDelivery({ mainIndex:2, starterIndex:1}); //default values will be used

















