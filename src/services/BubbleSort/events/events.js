document.addEventListener("DOMContentLoaded", function () {
    displayModal();
    restartGame();
});

// Event listener for the play button click event
document.getElementById("playButton").addEventListener("click", function () {
    restartGame();
    updatingGameVariables();

    if (!checkingVariables()) {
        return;
    }

    displaySelection = displaySelected;
    document.documentElement.style.setProperty('--rectangle-color', rectangleColor);
    colorRectangle = rectangleColor;
    colorSwappedRectangle = secondaryColor;

    sortDisplay();

    if (modeSelected === "auto") {
        automaticMode();
    } else {
        document.getElementById("stepButton").style.display = "block";
    }
});

// Event listener for mode selection change
document.getElementById("mode").addEventListener("change", function() {
    const INTERVAL = document.getElementById("interval");
    if (this.value === "auto") {
        INTERVAL.style.display = "block";
    } else {
        INTERVAL.style.display = "none";
    }
});

// Event listener for the continue button click event
document.getElementById("continue").addEventListener("click", function () {
    if (currentIndex < stepHistory.length - 1) {
        currentIndex++;
        displayList(stepHistory[currentIndex].list);
        FOLLOWEDSTEP.textContent = (currentIndex) + "/" + totalStep;
    } else {
        if (!alertStatus) {
            alert("You are already the end!");
            alertStatus = true;
        }
    }
});

// Event listener for the back button click event
document.getElementById("back").addEventListener("click", function () {
    if (currentIndex > 1) {
        currentIndex--;
        displayList(stepHistory[currentIndex - 1].list);
        FOLLOWEDSTEP.textContent = (currentIndex) + "/" + totalStep;
    } else {
        alert("You are already at the beginning!");
    }
});

// Event listener for the full continue button click event
document.getElementById("fullcontinue").addEventListener("click", function () {
    if (currentIndex < stepHistory.length - 1) {
        currentIndex = stepHistory.length - 1;
        displayList(stepHistory[currentIndex].list);
        FOLLOWEDSTEP.textContent = (currentIndex) + "/" + totalStep;
    } else {
        if (!alertStatus) {
            alert("You are already the end!");
            alertStatus = true;
        }
    }
});

// Event listener for the full back button click event
document.getElementById("fullback").addEventListener("click", function () {
    if (currentIndex > 0) {
        currentIndex = 1;
        displayList(stepHistory[currentIndex - 1].list);
        FOLLOWEDSTEP.textContent = (currentIndex) + "/" + totalStep;
    } else {
        alert("You are already at the beginning!");
    }
});

document.getElementById("restartButton").addEventListener("click", function () {
    displayModal();
    restartGame();
});
