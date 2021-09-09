// This must be in the beginning of the script.
// It wont allow you to create undefined variables.
"use strict";


/*
// Function - ArrowFunction

// Function declaration
console.log(foodProcessor(2, 3)); // We can call it before declaring
function foodProcessor(apple, orange) {
    return `juice made of ${apple} apples and ${orange} oranges`;
}

//Function expression
const ageCalc = function (birthYear){
    return 2021 - birthYear;
}
console.log(ageCalc(1990)); // Most be called after



// Arrow function    input => return
const ageCalc =
    birthYear => 2021 - birthYear;

// (inout) => {body}
const yearsUntilRetirement =
    (birthYear, firstName) =>{
    const age = 2021 - birthYear;
    const years = 60 - age;
    return firstName + `${years}`
    }
console.log(yearsUntilRetirement(1991,"baba "));
*/


/*
/ /Arrays :
const friends1 = ["Jasem" , "Abood" , "Saeed"];
const friends2 = new Array("jasem" , " Abood" , "Saeed");
console.log(friends1[0]);
console.log(friends1.length);

friends1[1] = "naser"; // Although it was const

//Ok basically fuck java. look how powerful are the arrays
const firstName = "Pit";
const fuckingSoPowerFullArray = [ firstName, // variable
                                  "String",
                                  123 + 4,   // expression :|
                                  friends1  ]// another fucking ARRAY



const array = ["Jasem" , "Abood" , "Saeed"];

// adds to end and returns length
const length = array.push("Jax1");
//adds to beginning
array.unshift("Jax2");

// Remove last element and returns it
const popped = array.pop();
// Remove first element and returns it
const shifted = array.shift();

// Returns index of an element ( of not exist returns -1)
array.indexOf("Abood");
// Returns Ture if includes and False if not
array.includes("motherFucker") // Strict
*/


// OBJECTS
// Literal Syntax
const sampleObject = {
    firstName: "Xin",
    lastName: "Zhao",
    age: 2021 - 1990,
    friends: ["Niko", "Zed"]
}
console.log(sampleObject.firstName);
const key = "Name";
console.log(sampleObject["last" + key]); // in the [ ] we can insert expressions !

// Objects can have a property than holds function value
const person = {
    firstName: "Tahm",
    // string value
    lastName: "kench",
    birthYear: 1990,                 // number value
    isAlive: true,                   // boolean value

    calcAge: function () {           // Function value
        return 2021 - this.birthYear;
    }

}
console.log(person.calcAge());
console.log(person['calcAge']());

// 'this' usage
const person2 = {
    firstName: "naser",

    calcAge: function () {
        this.age = 30;      //declaring a new property for the object not for the method
    }

}

console.error("123");
console.warn("123");
console.table(person2);


// Coding challenge 5.10

const printForecast = function (arr) {
    let tmp = "";
    for (let i = 0; i < arr.length; i++) {
        tmp +=`${arr[i]} deg in ${i + 1} days...`;
    }
    console.log(tmp);
}

printForecast([17, 21, 23]);



