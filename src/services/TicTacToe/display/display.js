function backToMenu(){
    if (!isAiPlaying){
        resetGame();
        isAiPlaying=true;
        document.getElementById("menuSelect").style.display = "flex";
        document.getElementById("game").style.display = "none";
        document.getElementById('print').innerHTML = 'Select your game mode.'
    }
}

function beginGame(mode) {
    gamemode = mode
    xColor = document.getElementById("xColor").value;
    oColor = document.getElementById("oColor").value;
    document.getElementById("menuSelect").style.display = "none";
    document.getElementById("aiDifficulty").style.display = "none";
    document.getElementById("game").style.display = "flex";
    resetGame();
}

function chooseAiDifficulty() {
    document.getElementById("menuSelect").style.display = "none";
    document.getElementById("aiDifficulty").style.display = "flex";
}

function highlight(type, rowOrLine) {
    // 1 = horizontal   2 = vertical 3 = top left to bot right 4 = top right to bot left
    switch (type) {
        case 1:
            for (let i = 0; i < 3; i++) {
                document.getElementById(`cell${rowOrLine}${i}`).style.color = WINCOLOR;
            }
            break;
        case 2:
            for (let i = 0; i < 3; i++) {
                document.getElementById(`cell${i}${rowOrLine}`).style.color = WINCOLOR;
            }
            break;
        case 3:
            document.getElementById(`cell00`).style.color = WINCOLOR;
            document.getElementById(`cell11`).style.color = WINCOLOR;
            document.getElementById(`cell22`).style.color = WINCOLOR;
            break;
        case 4:
            document.getElementById(`cell02`).style.color = WINCOLOR;
            document.getElementById(`cell11`).style.color = WINCOLOR;
            document.getElementById(`cell20`).style.color = WINCOLOR;
            break;
        default:
            console.log("error highlighting");
    }
}
