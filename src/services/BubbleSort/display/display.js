function sortDisplay() {
    if (!isNaN(arraySizeInput) && arraySizeInput >= 5 && arraySizeInput <= 60) {
        listRandom = selectNumber(arraySizeInput);
        stepHistory = [{ list: listRandom, items: [] }];
        currentIndex = 1;

        let currentList = listRandom.slice();
        while (currentList.some((value, index, self) => self[index + 1] && value > self[index + 1])) {
            currentList = sortAndDisplayStep(currentList);
        }

        displayList(stepHistory[currentIndex].list);
        document.getElementById("popupHomepage").style.display = "none";
        document.getElementById("containerGame").style.display = "block";
        FOLLOWEDSTEP.textContent = (currentIndex) + "/" + totalStep;
    } else {
        alert("Please enter a number between 5 and 60.");
    }
}

// Function to display the list with the current step highlighted
function displayList(list) {
    const CONTAINER = document.getElementById("containerElements");
    CONTAINER.innerHTML = "";

    const CURRENTSTEP = stepHistory[currentIndex - 1];
    for (let i = 0; i < list.length; i++) {
        let ELEMENTSDIV = initializesDisplayComponents(i, list);
        if (CURRENTSTEP && CURRENTSTEP.items.includes(i)) {
            ELEMENTSDIV.style.backgroundColor = colorSwappedRectangle;
        } else {
            ELEMENTSDIV.style.backgroundColor = colorRectangle;
        }

        addingElementValue(i, list, ELEMENTSDIV, CONTAINER);
    }
}

// Function to display the modal popup at the start
function displayModal() {
    document.getElementById("popupHomepage").style.display = "block";
    document.getElementById("containerGame").style.display = "none";
}

// Function to initialize display components based on the display mode
function initializesDisplayComponents(index, list) {
    const ELEMENTSDIV = document.createElement("div");
    ELEMENTSDIV.classList.add("elements");
    if (displaySelection === "bar") {
        ELEMENTSDIV.style.width = "67px";
        ELEMENTSDIV.style.height = (list[index] * 5) + "px";
    } else if (displaySelection === "circle") {
        ELEMENTSDIV.style.width = "90px";
        ELEMENTSDIV.style.height = "90px";
        ELEMENTSDIV.style.borderRadius = "50px";
    } else if (displaySelection === "array") {
        ELEMENTSDIV.style.width = "80px";
        ELEMENTSDIV.style.height = "80px";
        ELEMENTSDIV.style.border = "1px solid black";
        ELEMENTSDIV.style.margin = "0px";
        if (index === 0) {
            ELEMENTSDIV.style.borderTopLeftRadius = "10px";
            ELEMENTSDIV.style.borderBottomLeftRadius = "10px";
        } else if (index === list.length - 1) {
            ELEMENTSDIV.style.borderTopRightRadius = "10px";
            ELEMENTSDIV.style.borderBottomRightRadius = "10px";
        }
    }
    return ELEMENTSDIV;
}

// Function to add value to the display element
function addingElementValue(index, list, ELEMENTSDIV, CONTAINER) {
    if (displaySelection != "bar") {
        const TEXTDIV = document.createElement("div");
        TEXTDIV.classList.add("text");
        TEXTDIV.textContent = list[index];
        ELEMENTSDIV.appendChild(TEXTDIV);
    }
    
    CONTAINER.appendChild(ELEMENTSDIV);
}
