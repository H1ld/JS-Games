function resetGame() {
    clearInterval(timer);
    timeLeft = 60;
    TIMERTEXT.textContent = timeLeft;
  
    indexChars = 0;
    indexSentence = 0;
    indexWord = 0;
  
    cutSentence = null;
    cutWord = null;
  
    penaltyTime = 5;
    timeBonus = 15;
  
    sentenceSpanArray = null;
    wordSpanArray = null;
    modeSelected = "Letter";
    levelSelected = "Easy";
    extraSelected = "Normal";
    selectedLanguage = "EN";
    colorLetterWritten = "#3af008";
    unwrittenLetterColor = "#f00808";
    isFirstTime = true;

    correctCharsEntered = 0;
    totalCharsEntered = 0;
  
    document.getElementById('startGameButton').style.display = 'block';
}
  