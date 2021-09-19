"use strict"
/* String are primitive data types but when we call a method on a string, JS converts that string to String object and
* applies the methods. (Boxing) */
const airline = 'TAP Air Portugal';
const plane = 'A320';
/* indexed characters */
console.log(plane[1]); // log : 3
console.log('B737'[0]); // log : B
/* Length */
console.log(airline.length);
console.log('B737'.length);
/* Indexes */
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r')); // index of last "r" in the string
console.log(airline.indexOf('portugal')); //index of the word (case sensitive)

/* Slice Method :
* Returns   <end - beginning>  */

console.log(airline.slice(4)); // Returns   4 to end
console.log(airline.slice(4, 7)); // Returns  4 to 7

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));
/* negative value : counts from the end of the string and extracts */
console.log(airline.slice(-2));
console.log(airline.slice(1, -1)); // cuts off the first and the last character

const checkMiddleSeat = function (seat) {
    // B and E are middle seat
    const s = seat.slice(-1); /* extracting 1 characer of the end */
    if (s === 'B' || s === 'E') console.log('You got the middle seat 😬');
    else console.log('You got lucky 😎');
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');

// How Boxing Works ?
console.log(new String('jonas'));
console.log(typeof new String('jonas'));
console.log(typeof new String('jonas').slice(1));


// Working With Strings - Part 2

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

/* Fix capitalization in name*/
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
    passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
/* Trim removes white spaces and /n */
const normalizedEmail = loginEmail.toLowerCase().trim(); // calling trim on the result of toLowerCase();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

/* Replacing */
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.'); //chaining
console.log(priceUS);

const announcement =
    'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate'));
/* Regular expression : we are telling to do this for all of the "door"s that are in the announcement.*/
console.log(announcement.replace(/door/g, 'gate'));

// Booleans returners
const plane1 = 'Airbus A320neo';
console.log(plane1.includes('A320'));
console.log(plane1.includes('Boeing'));
console.log(plane1.startsWith('Airb'));
console.log(plane1.endsWith('neo'));

// Working With Strings - Part 3

/* Split  --- Returns array */
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));
const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
/* Join works on arrays */
const newName = ['Mr.', firstName, lastName.toUpperCase()].join('---');
console.log(newName);
/* Good example */
const capitalizeName = function (name) {
    const names = name.split(' ');
    const namesUpper = [];

    for (const n of names) {
        // namesUpper.push(n[0].toUpperCase() + n.slice(1));
        namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    }
    console.log(namesUpper.join(' '));
};
capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding -> first argument is the size, second is a character. FILLS UP (not adds up)  the string to the required size
//with the given character
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
    const str = number + ''; // using casting to create string from number
    const last = str.slice(-4);
    return last.padStart(str.length, '*');
};
console.log(maskCreditCard(64637836));

// Repeat
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(5));
/* Wise */
const planesInLine = function (n) {
    console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);
