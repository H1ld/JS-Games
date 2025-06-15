function updatingGameVariables() {
    arraySizeInput = parseInt(document.getElementById("arraySize").value);
    rectangleColor = document.getElementById("rectangleColor").value;
    secondaryColor = document.getElementById("secondaryColor").value;
    displaySelected = document.getElementById("display").value;
    modeSelected = document.getElementById("mode").value;
    intervalSelected = parseInt(document.getElementById("interval").value);
}

function restartGame() {
    listRandom = [];
    stepHistory = [];
    currentIndex = 1;
    totalStep = 1;
    colorRectangle = null;
    colorSwappedRectangle = null;
    displaySelection = "bar";
    arraySizeInput = null;
    rectangleColor = null;
    secondaryColor = null;
    displaySelected = null;
    modeSelected = null;
    intervalSelected = null;
    alertStatus = false;
    clearInterval(autoInterval);
}
