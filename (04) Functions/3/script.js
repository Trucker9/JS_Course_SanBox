"use strict";

/* IIFE : 
* 1. writing the function
* 2. wrapping it into ( ) so it becomes an expression 
* 3. calling the function expression with  ();  after we wrote it
*  */

    ( // sec
        function () {console.log("First and Last Run");} // first
    ) // sec
    (); // last

    /* Arrow function IIFE */
(   //sec
() => console.log("Arrow")   //first
)   //sec
();   //last




/* Closures :  Better to watch the video and read PDF file.
* VE : variable environment -> in this case, is local variables and arguments.
* A function has access to the variable environment of the execution context in which it was created.
* that VE attached to the function, exactly as it was at the time and place the function was created, is called closure.
*
* In other words, A closure makes sure that a function doesn't loose connection to variables that existed at the
*  function’s birth place;
*
* NOTE : closure variables have more priority.
* */


const secureBooking = function () {
    let passengerCount = 0;  // the returning function has access to this.

    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};

const booker = secureBooking();  // booker is what secureBooker returns
booker();
booker();
booker();
/* We can watch closures in browser console at [[SCOPES]] part with this command.*/
console.dir(booker);



// Another example
const boardPassengers = function (n, wait) {
    const perGroup = n / 3;
   /* This function has access to the perGroup variable due to closures ! */
    setTimeout(function () {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;  /* Closures have priority over scope chain so this variable wont be used although its Global*/
boardPassengers(180, 3);

