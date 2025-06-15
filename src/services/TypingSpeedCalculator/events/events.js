const TEXTAREAELEMENT = document.querySelector('.inputArea');

document.getElementById("playButton").addEventListener("click", function () {
    modeSelected = document.getElementById("mode").value;
    updatingGameSettings();
    gameColorUpdate();
  
    if (!checkValidityValues("selections")) {
      return;
    }
    
    textGeneration();
    blindModeActivation();
    if (!resetStatus) {
      resetGame();
    }
});

TEXTAREAELEMENT.addEventListener('keydown', function(event) {
    const TOUCH = event.key;
    // Only take characters into account for input
    if (/^[a-zA-Z0-9\s.,*{}()!@#$%^&\-+=àâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ]$/.test(TOUCH)) {
      if (modeSelected === "Word") {
        checkEnteredWord(event, TOUCH);
      } else {
        checkEnteredSentence(event, TOUCH);
      }
    } else {
      event.preventDefault();
    }
});

TEXTAREAELEMENT.addEventListener('input', function() {
    var content = TEXTAREAELEMENT.value;
    // Checks if the word entered is equal to the word to be guessed, if so then it goes to the next word
    if (modeSelected === "Word" && (content === cutWord || (extraSelected === "Blind" && content.length === cutWord.length))) {
      nextWordPassage();
      // Checks if the entered sentence is equal to the sentence to be guessed, if so then it goes to the next sentence
    } else if (content === cutSentence || (extraSelected === "Blind" && content.length === cutSentence.length)) {
      passageNextSentence();
    }
});

document.getElementById("mode").addEventListener("change", function() {
    const MODEOPTION = document.getElementById("randomModeOption");
    const TIMETRIALCUSTOMOPTION = document.getElementById("timeTrialCustomOption");
    // If Random mode is selected then it displays the configuration buttons
    if (this.value === "Random") {
      MODEOPTION.style.display = "flex";
      MODEOPTION.style.flexDirection = "column";
      // If Timetrialcustom mode is selected then it displays the TIMETRIAL mode configuration buttons
    } else if (this.value === "Timetrialcustom") {
      TIMETRIALCUSTOMOPTION.style.display = "block";
    } else {
      // Otherwise it hides the buttons
      MODEOPTION.style.display = "none";
      TIMETRIALCUSTOMOPTION.style.display = "none";
    }
});
  