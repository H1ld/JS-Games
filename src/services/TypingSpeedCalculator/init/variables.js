// Initializes variables with default values
let resetStatus = true;

let timeLeft = 60;

const TIMERTEXT = document.getElementById("remainingTime");
const CONTAINERGAME = document.getElementById("textToWrite");

let indexChars = 0;
let indexSentence = 0;
let indexWord = 0;

let cutSentence = null;
let cutWord = null;

let timer = null;

let penaltyTime = 5;
let timeBonus = 15;

let sentenceSpanArray = null;
let wordSpanArray = null;
let modeSelected = "Letter";
let levelSelected = "Easy";
let extraSelected = "Normal";
let selectedLanguage = "EN";
let colorLetterWritten = "#3af008";
let unwrittenLetterColor = "#f00808";

let isFirstTime = true;

let correctCharsEntered = 0;
let totalCharsEntered = 0;
