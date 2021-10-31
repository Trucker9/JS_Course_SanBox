'use strict';

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


const euroToUsd = 1.1;

/*const movementsUSD = movements.map(function (mov){
  //return "kir";
  return mov * euroToUsd;
});*/

const movementsUSD = movements.map((mov) => mov * euroToUsd);

const movDescriptions = movements.map((mov, i, arr) => {
    `Movement ${i} : You ${mov > 0 ? `deposited` : `withdrew`} ${Math.abs(mov)}`;

    // if(mov > 0) {
    //    return `Movement ${i} : You deposited ${mov}`;
    //  }else return `Movement ${i} : You withdrew ${mov}`;
});
console.log(movDescriptions)


/* Filter */
const withdrawals = movements.filter((mov) => mov < 0);
console.log(withdrawals)


/* Reduce */
/* We pass a function and an initial value for accumulator */
const balance = movements.reduce(function (accumulator,
                                           currentElement,
                                           index,
                                           array) {
    console.log(` Iteration # ${index} : ${accumulator}`);
    return accumulator + currentElement;
}, 0);


/* Chaining shit */
const totalDepositUSD = function (movements) {
    movements
        .filter((mov) => mov > 0)
        .map((mov) => mov * euroToUsd)
        .reduce((acc, mov) => acc + mov, 0);

}


/* Find */
const firstWithdrawal = movements.find( mov => mov > 0 );
/* Finding a whole Object ! */
const accountObject = accounts.find(acc => acc.owner === `Jessica Davis`);







