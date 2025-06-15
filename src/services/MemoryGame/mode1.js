let squares = document.querySelectorAll('.square');
const STARTBTN = document.getElementById('startButton');
const MESSAGE = document.getElementById('message');
const SCOREDISPLAY = document.getElementById('score-value');
const ATTEMPTSDISPLAY = document.getElementById('attempts-value');
const GOODCLICKSOUND = new Audio ('../media/Bip.mp3')
const FARTCLICKSOUND = new Audio ('../media/dry-fart.mp3')
let sequence = [];
let playerSequence = [];
let score = 0;
let active = false;
let attempts = 3;

STARTBTN.addEventListener('click', startGame);
squares.forEach(square => square.addEventListener('click', handleClick));

function startGame() {
    document.getElementById('startButton').style.display = 'none';
    if (!active) {
      sequence = [];
      playerSequence = [];
      score = 0;
      SCOREDISPLAY.textContent = score;
      MESSAGE.textContent = '';
      attempts = 3
      updateDisplay(attempts);
      generateSequence();
      showSequence();
      active = true;
    }
  }


function activateSquares() {
    squares.forEach(square => square.classList.add('active'));
}

function deactivateSquares() {
    squares.forEach(square => square.classList.remove('active'));
}

function generateSequence() {
    sequence = [];
  
    const sequenceLength = 3 + (2 * Math.floor(score / 2));
    
    for (let i = 0; i < sequenceLength; i++) {
      sequence.push(Math.floor(Math.random() * 9) + 1);
    }
}

function showSequence() {
  deactivateSquares();
    let i = 0;
    const interval = setInterval(() => {
      const currentSquare = document.getElementById(`square${sequence[i]}`);
      currentSquare.style.backgroundColor = '#fff';
      setTimeout(() => {
        currentSquare.style.backgroundColor = '#267c65';
      }, 400);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        deactivateSquares();
      }
    }, 600);
}

function handleClick(event) {
    if (active) {
        const clickedSquareIndex = parseInt(event.currentTarget.id.slice(-1));
        playerSequence.push(clickedSquareIndex);
       

        if (playerSequence[playerSequence.length - 1] === sequence[playerSequence.length - 1]) {
            event.currentTarget.classList.add('rotate');
            GOODCLICKSOUND.currentTime = 0;
            GOODCLICKSOUND.play();
           setTimeout(() => {
              this.style.backgroundColor = '#267c65';
              this.classList.remove('rotate');
          }, 300);
        } else {
            event.currentTarget.classList.add('shake-animation');
            FARTCLICKSOUND.currentTime = 0;
            FARTCLICKSOUND.play();
            setTimeout(() => {
                event.currentTarget.classList.remove('shake-animation');
            }, 500);

            attempts--;
            updateDisplay(attempts);
            if (attempts === 0) {
                endGame();
            } else {
                playerSequence = [];
                setTimeout(showSequence, 1000);
            }
            return;
        }

        checkSequence();
    }
}

function checkSequence() {
  if (playerSequence.length === sequence.length) {
      if (playerSequence.every((value, index) => value === sequence[index])) {
          score++;
          SCOREDISPLAY.textContent = score;
          playerSequence = [];
          setTimeout(() => {
              generateSequence();
              showSequence();
          }, 1000);
      } else {
          attempts--;
          updateDisplay(attempts);
          if (attempts === 0) {
              endGame();
          } else {
              playerSequence = [];
                setTimeout(showSequence, 1000);
          }
      }
  }
}

function updateDisplay(attempts) {
  ATTEMPTSDISPLAY.textContent = '❤️'.repeat(attempts);
}

function endGame() {
  MESSAGE.textContent = 'Loose!';
  active = false;
  STARTBTN.style.display = 'block';
}