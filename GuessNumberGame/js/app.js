/*jshint esversion: 6 */

// Game values
let randNumber = Math.floor(Math.random() * 100) + 1;
    guessesLeft = 10;

// UI Elements
const game = document.querySelector('#game'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});
      
// Listen for guess
guessBtn.addEventListener('click', function(){

  let guess = parseInt(guessInput.value);

    if(guessInput.value.length === 0) {
      // No value
      document.getElementById('err').innerHTML = 'Please add number';
      guessesLeft += 1;
      } else {
        // Check approximately length between compared numbers
        if(guess < randNumber) {
            document.getElementById('err').innerHTML = '';
            document.getElementById('guessesCounter').innerHTML += guess + ' &nbspis too low <br>';
        } else {
          if(guess > randNumber){
            document.getElementById('err').innerHTML = '';
            document.getElementById('guessesCounter').innerHTML += guess + ' &nbspis too high <br>';
          }
        }
    }  
      // Check if won
      if(guess === randNumber){

        // Game over - won
        gameOver(true, `${randNumber} is correct, YOU WIN!`);
      } else {
        
        guessesLeft -= 1;

        if(guessesLeft === 0){
          // Game over - lost
          gameOver(false, `Game Over. The correct number was ${randNumber}`);
        } else {

          // Game continues - answer wrong
          // Change border color
          guessInput.style.borderColor = 'tomato';

          // Clear Input
          guessInput.value = '';

          // Tell user its the wrong number
          setMessage(`${guessesLeft} tries left`, 'tomato');
        }
      }
});

// Game over
function gameOver(won, msg){
  let color;
   won === true ? color = 'green' : color = 'tomato';


  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play Again?
  guessBtn.value = 'Play Again ?';
  guessBtn.className += 'play-again';
}


// Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}