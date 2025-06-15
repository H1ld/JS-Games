// Checks if the letter entered is correct, if so it then moves to the next letter
function checkEnteredWord(event, TOUCH) {
  if (TOUCH == cutWord[indexChars]) {
    wordSpanArray[indexChars].style.color = colorLetterWritten;
    indexChars++;
    updateEnteredCharsStats(true);
  } else {
    // If the selected mode is Timetrialclassic or Timetrialcustom, this inflicts a time penalty when the wrong letter is entered
    if (modeSelected === "Timetrialclassic" || modeSelected === "Timetrialcustom") {
      updateTimerPenalty(penaltyTime);
    }
    event.preventDefault();
    updateEnteredCharsStats(false);
  }
}

// Checks if the letter entered is correct, if so it then moves to the next letter
function checkEnteredSentence(event, TOUCH) {
if (TOUCH === cutSentence[indexChars]) {
  sentenceSpanArray[indexChars].style.color = colorLetterWritten;
  indexChars++;
  updateEnteredCharsStats(true);
} else {
  // If the selected mode is Timetrialclassic or Timetrialcustom, this inflicts a time penalty when the wrong letter is entered
  if (modeSelected === "Timetrialclassic" || modeSelected === "Timetrialcustom") {
    updateTimerPenalty(penaltyTime);
  }
    event.preventDefault();
    updateEnteredCharsStats(false);
  }
}

function nextWordPassage() {
    indexWord++;
    // Go to the next word
    if (indexWord < cutSentence.split(" ").length) {
      cutWord = cutSentence.split(" ")[indexWord];
      wordSpanArray = createSpanArray(cutWord);
      indexChars = 0;
      indexDelete = 0;
      limitCharacters = 1;
      setTimeout(() => {
        TEXTAREAELEMENT.value = "";
      }, 5);
    } else {
      // Move to the word of the next sentence if the sentence is completed
      indexSentence++;
      if (indexSentence < shuffledSentences.length) {
        cutSentence = shuffledSentences[indexSentence];
        cutWord = cutSentence.split(" ")[0];
        wordSpanArray = createSpanArray(cutWord);
        indexWord = 0;
        indexChars = 0;
        indexDelete = 0;
        limitCharacters = 1;
        setTimeout(() => {
          TEXTAREAELEMENT.value = "";
        }, 5);
      } else {
        // Displays end game if all sentences are completed
        alert("End Game");
      }
    }
}
  
function passageNextSentence() {
    // Go to the next sentence
    indexSentence++;
    if (indexSentence < shuffledSentences.length) {
      cutSentence = shuffledSentences[indexSentence];
      sentenceSpanArray = createSpanArray(cutSentence);
      indexChars = 0;
      if (modeSelected === "Timetrialclassic" || modeSelected === "Timetrialcustom") {
        timeLeft = timeLeft + timeBonus;
      }
      setTimeout(() => {
        TEXTAREAELEMENT.value = "";
      }, 5);
    } else {
      // Displays end game if all sentences are completed
      alert("End Game");
    }
}
  
// Function that starts the stopwatch and updates it every second
function startGame() {
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function focusTextArea() {
  startGame();
  document.getElementById('startGameButton').style.display = 'none';
  if (isFirstTime) {
    var spans = document.querySelectorAll("#textToWrite span");
    spans.forEach(function(span) {
        span.classList.remove("blurred");
    });
    isFirstTime = false;
  }
  const TEXTAREA = document.querySelector('.inputArea');
  TEXTAREA.style.display = 'block';
  TEXTAREA.focus();
  const HORIZONTALALIGNELEMENT = document.getElementById("horizontalAlign");
  HORIZONTALALIGNELEMENT.style.left = "-17vw";
}
  
function updateTimerPenalty(time) {
    timeLeft = Math.max(1, timeLeft - time);
}
  
// Displays the text to guess on the web page
function createSpanArray(sentence) {
    var spans = document.querySelectorAll("span");
    spans.forEach(function(span) {
      span.parentNode.removeChild(span);
    });
  
    var sentenceSpanArray = sentence.split('').map(char => {
      var span = document.createElement("span");
      span.textContent = char;
      span.style.color = unwrittenLetterColor;
      if (isFirstTime) {
        span.classList.add("blurred");
    }
      CONTAINERGAME.appendChild(span);
      return span;
    });
    return sentenceSpanArray;
}
  
// Returns a structure containing the selected parameters
function getCheckedValues() {
    const CHECKEDVALUES = {
      difficulty: [],
      mode: [],
      type: [],
      language: []
    };
  
    if (document.getElementById("Medium").checked) {
      CHECKEDVALUES.difficulty.push("Medium");
    }
    if (document.getElementById("Easy").checked) {
      CHECKEDVALUES.difficulty.push("Easy");
    }
    if (document.getElementById("Hard").checked) {
      CHECKEDVALUES.difficulty.push("Hard");
    }
  
    if (document.getElementById("Normal").checked) {
      CHECKEDVALUES.mode.push("Normal");
    }
    if (document.getElementById("Blind").checked) {
      CHECKEDVALUES.mode.push("Blind");
    }
  
    if (document.getElementById("Word").checked) {
      CHECKEDVALUES.type.push("Word");
    }
    if (document.getElementById("Sentence").checked) {
      CHECKEDVALUES.type.push("Sentence");
    }
    if (document.getElementById("Classic").checked) {
      CHECKEDVALUES.type.push("Classic");
    }
    if (document.getElementById("Custom").checked) {
      CHECKEDVALUES.type.push("Custom");
    }

    if (document.getElementById("EN").checked) {
      CHECKEDVALUES.language.push("EN");
    }
    if (document.getElementById("FR").checked) {
      CHECKEDVALUES.language.push("FR");
    }
    if (document.getElementById("ES").checked) {
      CHECKEDVALUES.language.push("ES");
    }
    if (document.getElementById("DE").checked) {
      CHECKEDVALUES.language.push("DE");
    }
    if (document.getElementById("IT").checked) {
      CHECKEDVALUES.language.push("IT");
    }
  
    return CHECKEDVALUES;
}
  
// Returns a random value from an array passed as a parameter
function randomSelect(checkedValues) {
    var selectedValues = {};
    
    for (const KEY in checkedValues) {
      if (checkedValues.hasOwnProperty(KEY)) {
        if (checkedValues[KEY].length > 0) {
          const RANDOMINDEX = Math.floor(Math.random() * checkedValues[KEY].length);
          selectedValues[KEY] = checkedValues[KEY][RANDOMINDEX];
        }
      }
    }
    
    return selectedValues;
}
  
// Subtract 1 from the timer, and if the timer is over then that ends the game
function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    TIMERTEXT.textContent = timeLeft + "s";

    if (timeLeft === 0) {
      endTimer();
      clearInterval(timer);
      return;
    }
  }
}

// Mix the sentences to change their order
function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

// Returns false if one or more values ​​are incomplete
function checkValidityValues(type) {
    if (type === "time") {
      if (!modeSelected || !levelSelected || !extraSelected) {
        alert("Please select start time, penalty time and bonus time.");
        return false;
      }
    } else if (type === "selections") {
      if (!modeSelected || !levelSelected || !extraSelected) {
        alert("Please select game mode, level and extra.");
        return false;
      }
    }
    return true;
}
  
// Updates game setting variables
function updatingGameSettings(modeSelected) {
  if (modeSelected == "Random") {
      const RESULTRANDOMSELECT = randomSelect(getCheckedValues())
      modeSelected = RESULTRANDOMSELECT.mode;
      levelSelected = RESULTRANDOMSELECT.difficulty;
      extraSelected = RESULTRANDOMSELECT.type;
      selectedLanguage = RESULTRANDOMSELECT.language;
    } else if (modeSelected == "Timetrialcustom") {
      timeLeft = parseInt(document.getElementById("startTime").value);
      penaltyTime = parseInt(document.getElementById("penaltyTime").value);
      timeBonus = parseInt(document.getElementById("timeBonus").value);
  
      if (!checkValidityValues("time")) {
        return;
      }
    } else {
      levelSelected = document.getElementById("level").value;
      extraSelected = document.getElementById("langue").value;
      selectedLanguage = document.getElementById("langue").value;
    }
}
  
// Generates a sentence or a word based on the chosen parameters
function textGeneration() {
    shuffledSentences = shuffleArray(SENTENCETOWRITE[selectedLanguage][levelSelected]);
    indexSentence = 0;
    cutSentence = shuffledSentences[indexSentence];
    if (modeSelected === "Word") {
      cutWord = cutSentence.split(" ")[indexWord];
      wordSpanArray = createSpanArray(cutWord);
    } else if (modeSelected === "Timetrialclassic")  {
      sentenceSpanArray = createSpanArray(cutSentence);
      timeLeft = 30;
    } else if (modeSelected === "Timetrialcustom")  {
      sentenceSpanArray = createSpanArray(cutSentence);
    } else {
      sentenceSpanArray = createSpanArray(cutSentence);
    }
}
  
// Manages the activation of Blind mode
function blindModeActivation() {
    if (extraSelected == "Blind") {
      TEXTAREAELEMENT.addEventListener('input', function() {
        var contentb = TEXTAREAELEMENT.value;
        var maskedContent = '';
        for (var i = 0; i < contentb.length; i++) {
          maskedContent += '*';
        }
        TEXTAREAELEMENT.value = maskedContent;
      });
    }
}

function calculateTypingSpeed() {
  let timeElapsed = (60 - timeLeft) / 60; 
  let wordsTyped = correctCharsEntered / 5;
  let typingSpeed = wordsTyped / timeElapsed;
  return typingSpeed.toFixed(2);
}

function calculateAccuracy() {
  let accuracy = (correctCharsEntered / totalCharsEntered) * 100;
  return accuracy.toFixed(2);
}

function updateEnteredCharsStats(isCorrect) {
  totalCharsEntered++;
  if (isCorrect) {
      correctCharsEntered++;
  }
}

function updateProgressBars() {
  const TYPINGSPEEDPROGRESS = document.getElementById('typingSpeedProgress');
  const ACCURACYPROGRESS = document.getElementById('accuracyProgress');
  
  let typingSpeed = calculateTypingSpeed();
  let accuracy = calculateAccuracy();
  
  if (typingSpeed != 0) {
    TYPINGSPEEDPROGRESS.style.width = typingSpeed + '%';
    TYPINGSPEEDPROGRESS.innerText = typingSpeed + ' WPM';
  } else {
    TYPINGSPEEDPROGRESS.style.width = typingSpeed + '%';
    TYPINGSPEEDPROGRESS.innerText = typingSpeed;
  }

  if (!isNaN(accuracy)) {
    ACCURACYPROGRESS.style.width = accuracy + '%';
    ACCURACYPROGRESS.innerText = accuracy + '%';
  } else {
    ACCURACYPROGRESS.style.width = "0%";
    ACCURACYPROGRESS.innerText = "0";
  }
}

function endGame() {
  resetGame();
  document.getElementById("popupHomepage").style.display = "block";
  document.getElementById("containerGame").style.display = "none";
  document.getElementById("containerEndTime").style.display = "none";
}

function endTimer() {
  document.getElementById("containerGame").style.display = "none";
  document.getElementById("containerEndTime").style.display = "block";
  updateProgressBars();
}
