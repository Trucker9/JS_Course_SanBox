'use strict';



/* /////////////////////////////////////////// Array Methods */
let arr = [ "a" , "b" , "c" , "d" , "e"];

/* ### ### ###
   ### ### ### .slice (returns new array)
   ### ### ###
   */
/* extracts what is between index 2 and index 4 */
const sliced = arr.slice( 2 , 4);  // log : c d
/* minus value : starts from the end (last element is -1, then -2, and so on .. */
console.log(arr.slice(1, -2));
/* Creating copy */
console.log(arr.slice());

/* ### ### ###
   ### ### ### .splice (changes original array)
   ### ### ###
   */
// Removing last element
console.log(arr.splice(-1));
/* firstArg : start index to delete
*  secArg : number of elements to delete */
console.log(arr.splice(1 , 2)); // log : ["a", "d"] Trying to convince my dad.

/* ### ### ###
   ### ### ### .reverse (changes original array)
   ### ### ###
   */
const arr2 = [...arr];
console.log(arr2.reverse());

/* ### ### ###
   ### ### ### .concat (joining SRC and DST)
   ### ### ###
   */

const concat = arr.concat(arr2);
// OR
const concat2 = [...arr, ...arr2];
console.log(concat);

/* ### ### ###
   ### ### ### .join (places a string between each element an returns it as string)
   ### ### ###
   */

const array = ["e", "f", "g", "h"];
console.log(array.join(" - "));








/* //////////////////////////////////////////////////////////////////// ForEach
* there is no way to break the forEach loop.
* We use forEach if we want to do sth on each element*/

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/* forEach is a high order function that requires a callback function
* first argument : current element of the array
* sec argument   : current index
* third argument : the original array on which we are looping
* NOTE : we can ignore these arguments if we dont need them.
* */
movements.forEach( function (currElement, index, array){
  if( currElement > 0 )
    console.log(`Movement ${index + 1} : You deposited ${currElement}`);
  else console.log(`Movement ${index + 1} : You withdrew ${Math.abs(currElement)} `);
})


/* ### ### ###
   ### ### ### forEach on Sets and Maps :
   ### ### ###
   */
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


/* 3 arguments like above,       value - key - whole map    */
currencies.forEach(function (currValue , currKey, mapItself){
  console.log(`key : ${currKey}\nvalue: ${currValue}`);
});

















