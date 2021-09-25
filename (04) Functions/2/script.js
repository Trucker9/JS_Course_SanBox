"use strict";
/*
*  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
* Call + Apply  Methods
* */

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function() {}
    book(flightNum, name) {
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};
/* Trying to extract the book function to use it in eurowings object.*/
const book = lufthansa.book;

/* Inside the book function we had "this" keyword, so if we call it simpy like line below, the "this" is undefined
* because there is no object holding the function. */
// book(23, 'Sarah Williams');


/* first argument : THE OBJECT THAT WE GONNA USE ITS "THIS" KEYWORD */
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);


const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');

/* Apply is same as the call method, but receives an Array of arguments after the object. instead of writing them one by
 one */
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
/* This is why apply is not so much used*/
book.call(swiss, ...flightData);


/* ### ### ### ### ### --------------------------------------  BIND */

/* BINDING OBJECT   :  it binds an object's "this" keyword to a method and returns it. */
const bookEW = book.bind(eurowings); // "this" in the bookEW method is equal to eurowings object's "this"
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');
/* PRESETTING ARGUMENT   : Presetting a function argument  */
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann'); //first argument has been preset.


// With Event Listeners
/* adding new parameters to lufthansa object */
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
};
// lufthansa.buyPlane();
/* In an EventHandlerFunction the <this> always points to the element of the DOM on which the handler is attached to.

* document.querySelector('.buy')
    .addEventListener('click', lufthansa.buyPlane);        // WONT WORK

     */
document.querySelector('.buy')
    .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));  //changing <this> keyword.

// Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
const addVAT = addTax.bind(null, 0.23); // first argument in bind is the <this> keyword.
// addVAT = value => value + value * 0.23;
/* What is done above with bind, is here with high order functions */
const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    };
};
const addVAT2 = addTaxRate(0.23);





















