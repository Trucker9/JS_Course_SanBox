'use strict';
/*
// Selecting paragraph's content
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Right Number';

// Change number value
document.querySelector('.guess').value = 23;
*/


// Number
let numToGuess = Math.trunc(Math.random() * 20) + 1;
document.querySelector('.number').textContent = String(numToGuess);
// Score
let score = 5;
document.querySelector('.score').textContent = String(score);

// High score
let highScore = document.querySelector(".highscore").value;

// Functions
const display = function(message){
  document.querySelector('.message').textContent = message;
}



// Adding event listener
document.querySelector('.check').
addEventListener('click', function() {  // ( "type" , eventHandlerFunction )
  const guess = Number(document.querySelector('.guess').value);
  /* No Input */
  if (!guess) { // If empty , guess will be 0
  display('⛔ No Number Found ');
  }
  /* Win */
  else if (numToGuess === guess) {
    document.querySelector('.number').
      textContent = String(numToGuess);
      display( '🎉 You Won !') ;

    //These both change the HTML file not the CSS
    document.querySelector("body").
      style.backgroundColor = "#60b347"; //value always should be string
    document.querySelector(".number").
      style.width = "40rem";             //value always should be string

    if(score > highScore ){
      highScore = score;
      document.querySelector(".highscore").
        value = highScore;
    }
  }

  else if( guess !== numToGuess){
    if (score > 0) {
      score--;
      display( numToGuess < guess ? '🔼' : '🔽');  // omg omg omg omg omg

      document.querySelector('.score').
        textContent = String(score);
    } else {
      display( 'You lost' );
    }
  }

});


// Again button
document.querySelector(".again").
addEventListener("click", function() {
  display( "Start Guessing ...");

  document.querySelector("body").
    style.backgroundColor = "#222";

  document.querySelector(".number").
    style.width = "20rem";

  score = 5;
  document.querySelector('.score').
    textContent = String(score);

  numToGuess = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.number').
    textContent = "?";

  document.querySelector('.guess').value = "";
});

