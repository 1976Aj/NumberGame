var randomNumber = Math.ceil(Math.random() * 100);

var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

guessField.addEventListener('keyup', keyupHandler);

var guessCount = 1;
var resetButton;

function keyupHandler(event) {
  // console.log('A keyup Event Occured, keycode:' + event.keyCode);
  //If the key pressed was "Enter"
  if (event.keyCode === 13) {
    guessSubmit.click();
  }
}


function checkGuess() {
    var userGuess = Number(guessField.value);

    if (guessField.value === '') {
      return;
    }

  if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    lastResult.textContent = "That wasn't a valid guess, try again!";
    lastResult.style.backgroundColor = "red";
    lastResult.style.textAlign = "center";
    guessField.value = '';
    guessField.focus();
    return;
  }

  if (guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
  }
  guesses.textContent += userGuess + ' ';

  //LOGIC GOES HERE
  if (userGuess === randomNumber) {
    //Correct Answer
    lastResult.textContent = "Congratulations! You got it right!";
    lastResult.style.backgroundColor = 'green';
    lastResult.style.textAlign = 'center';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    //Out of guesses
    lastResult.textContent = '!!!GAME OVER!!!';
    lastResult.style.backgroundColor = 'red';
    lastResult.style.textAlign = 'center';
    setGameOver();
  } else {
    //Not correct, but still have guesses left
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    lastResult.style.textAlign = 'center';
    if (userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else {
      lowOrHi.textContent = 'Last guess was too high!';
    }

  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}

function setGameOver() {
  //Do some work
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start New Game!';
  document.querySelector('.form').appendChild(resetButton);
  // document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessCount = 1;

  var resetParas = document.querySelectorAll('.resultParas p');
  for (var i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = '';
  }

  lastResult.style.backgroundColor = 'white';

  guessField.disabled = false;
  guessSubmit.disabled = false;

  resetButton.parentNode.removeChild(resetButton);

}

guessSubmit.addEventListener('click', checkGuess);


