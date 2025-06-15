// Function to generate a list of random numbers
function selectNumber(listLength) {
    const LISTNUMBER = [];
    for (let i = 0; i < listLength; i++) {
        const RANDOMNUMBER = Math.floor(Math.random() * (25  - 1 + 1)) + 1;
        LISTNUMBER.push(RANDOMNUMBER);
    }
    return LISTNUMBER;
}

// Returns false if one or more variables are incomplete otherwise returns true
function checkingVariables() {
    if (!arraySizeInput || !rectangleColor || !secondaryColor || !displaySelected || !modeSelected || !intervalSelected || (intervalSelected < 100 || intervalSelected > 10000)) {
        alert("Please complete all fields.");
        return  false;
    }
    return true;
}

// If auto mode is selected then it goes to the next sorting step automatically based on a given interval
function automaticMode() {
    document.getElementById("stepButton").style.display = "none";
    autoInterval = setInterval(function() {
        document.getElementById("continue").click();
        if (currentIndex === stepHistory.length - 1) {
            clearInterval(autoInterval);
        }
    }, intervalSelected);
}
