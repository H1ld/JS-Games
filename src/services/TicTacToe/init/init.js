function setAiDifficulty(difficulty) {
    aiDifficulty = difficulty;
    setAiScore();
    beginGame(1);
}

function setAiScore() {
    switch (aiDifficulty) {
        case 1:
            scores = {X: 1, O: -1, tie: 0};
            break;
        case 3:
            scores = {X: -1, O: 1, tie: 0};
            break;
        default:
            scores = null;
    }
}