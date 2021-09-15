'use strict';

// Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");  /*faster way*/
const currScore0 = document.getElementById("current--0");
const currScore1 = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const scores = [0 , 0];
let activePlayerNo = 0;
let playing = true;


score0El.textContent = String(0);
score1El.textContent = String(0);
diceEl.classList.add("hidden");

const switchPlayer = function () {
    document.getElementById(`current--${activePlayerNo}`).textContent = String(0);
    /* Switching Player */
    activePlayerNo = activePlayerNo === 0 ? 1 : 0 ;

    currScore = 0 ;
    /* toggle : removes the class if available and adds it if not available */
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}







//------------------------ Rolling the dice
let currScore = 0;
btnRoll.addEventListener("click", function () {
    if (playing){
    const diceValue = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    /* Selecting dice number */
    diceEl.src = `img/dice-${diceValue}.png`

    if( diceValue === 1){switchPlayer()}else {
    currScore += diceValue;
    document.getElementById(`current--${activePlayerNo}`).textContent = currScore;
    }

}});
//------------------------ Holding score
btnHold.addEventListener("click", function () {
    if (playing){
    // Saving the score
    scores[activePlayerNo] += currScore;
    // Changing score on screen
    document.getElementById(`score--${activePlayerNo}` ).textContent =
        String(scores[activePlayerNo]);

    /* Check for winner*/
    if(scores[activePlayerNo] >= 10){
    playing  = false;
    document.querySelector(`.player--${activePlayerNo}`).classList.add("player--winner");
    document.querySelector(`.player--${activePlayerNo}`).classList.remove("player--active");
        diceEl.classList.add("hidden");


    }

    switchPlayer();
}}
);


btnNew.addEventListener("click", function () {
    playing = true;

    scores[0] = 0;
    scores[1] = 0;
    score0El.textContent = String(0);
    score1El.textContent = String(0);

    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player1El.classList.remove("player--active");
    player0El.classList.add("player--active");

})
















