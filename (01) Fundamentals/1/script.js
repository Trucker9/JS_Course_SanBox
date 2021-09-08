/*
let js = "amazing";
if( js === "amazing") alert("fuck u");
console.log("mother fucker");
*/


/*
// Constant variable : ALL_CAPS
let PI = 3.1415;
*/


/*
// We try to use 'const' as much as possible.
// Another way to declare constant I guess
const birthYear = 1990;
// Also const can't be empty. it needs to be initialized.
*/


/*
// outdated version of declaring variables
var test = 3;
*/


/*
// Power : line below means 2 to the power of 3 ( 2 * 2 * 2 )
const age = 2 ** 3;
*/



/*
// ---------- Template strings !
const job = "pornStar";
const name = "Stoya";
const salary = "a lot of";
const newTemplateString = `Hi, my name is ${name} and I am a ${job} and I make ${salary} money`
console.log(newTemplateString);
*/


/*
// old way of multi line string
console.log(" Hello \n\ world! \n\ newLine");
//new
console.log(` Hello
world
newLine`);
*/


/*
// Explicit Casting (conversion)
const inputYear = "1991";
console.log( Number(inputYear) + 2 );  // log: 1993
console.log( Number("test")   ); // log : NaN
console.log(String(2) + " two ");// log : 2 two
*/


/*
// Implicit Casting ( coercion )
console.log("I am" + 23 + "y.o."); // 23 will cast to string
console.log("23" / 2);
console.log("23" > "18");
console.log("1" + 1);  //log : 11
console.log(1 + "1");  //log : 11    ==> string + number = string
console.log("10" - " 6" + 2); //log : 2
*/


/*
// == VS ===
console.log( "18" == 18 ); //Does the auto casting and log : True
console.log( "18" === 18); //No casting and log : False
*/


/*
// Prompt
const res = prompt("enter a number");
console.log(res);
console.log(typeof res); //log : string
*/

/*
const day = "monday";
switch (day){ // compares strict (===)
    case "monday" :
        console.log("its monday");
        console.log("I said its monday");
        break;

    case "thursday" :
        console.log("its thursday");
        break;
    case "wednesday" :
    case "friday" :
        console.log("go kill some mama's");
}
*/

/*
//Ternary operator (returns the selected value)
const age= 23;
const whatToDrink = age >= 18 ? "Wine 🍷" : "Water 💦";
console.log(whatToDrink);
console.log(`I like to drink ${age >= 18 ? "Wine 🍷" : "Water 💦"}`);
*/


