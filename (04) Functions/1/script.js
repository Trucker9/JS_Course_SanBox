'use strict';

/*
*  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 Setting DEFAULT VALUE for function inputs */
const bookings = [];
const createBooking = function (
    flightNum,
    numPassengers = 1,
    price = 199 * numPassengers
) {
    // ES5
    // numPassengers = numPassengers || 1;
    // price = price || 199;
    const booking = {
        flightNum,
        numPassengers,
        price,
    };
    console.log(booking);
    bookings.push(booking);
};
createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
// if wanted to skip some value we just set it to undefined and it will be set to default value
createBooking('LH123', undefined, 1000);


/*
*  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 primitive data types : call by value
 Objects : call by reference
 dont read the rest */
const jonas = {
    name: 'Jonas Schmedtmann',
    passport: 24739479284,
};

const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 100000000000);
};
console.log(jonas.passport);
newPassport(jonas);
console.log(jonas.passport);



/*  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
* High-order functions */
// call-back function 1
const oneWord = function (str) {
    return str.replace( / /g , "").toLowerCase();  //   / /g -> all the spaces
}
// call-back function 2
const upperFirstWord = function (str) {
    const [first, ...others] = str.split(" ");
    return [first.toUpperCase(), ...others].join(" ");
}

/* Takes in a call-back function and therefore its a higher order function */
const transformer = function (str , func){

    console.log(`Transformed String ${func(str)}`);
    console.log(`Transformed by : ${func.name}`); /* Functions are special kind of objects, objects had methods, one
                                                     of those methods is the name method for every function object.*/
}
transformer("java scripts is the best" , upperFirstWord);  /* NOT upperFirstWord() --> by this we are calling the
                                                                * function at this line */

transformer("java scripts is the best" , oneWord); // NOT oneWord()


/* ### ### ### --------------------------------- Returning a function */
const func = function (outerFuncArg) {
    return function (innerFuncArg) {
        console.log( ` This is the outer function argument : ${outerFuncArg} 
        This is the inner function Argument : ${innerFuncArg}`);
    }
}

const myFunc = func("one");
/* Now "myFunc" is what "func" returns. so myFunc is also a function */
myFunc("two");
/* First calling the func, it returns a function, then we call the returned function with required arguments */
func("one")("two");

const funcArrowVersion = outerFuncArg => innerFuncArg =>  console.log( `outer function argument : ${outerFuncArg} 
    inner function Argument : ${innerFuncArg}`);

funcArrowVersion("one")("two");



