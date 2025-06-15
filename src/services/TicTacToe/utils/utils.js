function checkWin(isSimulating) {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
            if (!isSimulating) highlight(1, i);
            winner = board[i][0];
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
            if (!isSimulating) highlight(2, i);
            winner = board[0][i];
        }
    }

    // Diagonal
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
        if (!isSimulating) highlight(3, null);
        winner = board[0][0];
    }
    if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== '') {
        if (!isSimulating) highlight(4, null);
        winner = board[2][0];
    }

    let openSlots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                openSlots += 1;
            }
        }
    }

    if (winner == null && openSlots === 0) {
        return 'tie';
    } else {
        return winner;
    }
}

function makeMove(row, col) {
    if (gameEnded) {
        resetGame();
    } else if (!isAiPlaying) {
        let cell = document.getElementById(`cell${row}${col}`);
        if (board[row][col] === '') {
            cell.innerText = player;
            board[row][col] = player;

            player === 'X' ? cell.style.color = xColor : cell.style.color = oColor; //colors cell

            let result = checkWin(false);

            if (result !== null) {     //game ends
                gameEnded = true

                result === 'tie' ? document.getElementById('print').innerHTML = 'Draw!' : document.getElementById('print').innerHTML = `${result} wins!`;

                if (result === "X" && gamemode === 1 && aiDifficulty === 1) {
                    unlockAchievements(0);
                } else if (result === "X" && gamemode === 1 && aiDifficulty === 2) {
                    unlockAchievements(1);
                } else if (gamemode === 2 && (result === "X" || result === "O")) {
                    unlockAchievements(2);
                }

            } else {                    //switch player
                switchPlayer()
                if (gamemode === 1 && player === 'O') {
                    isAiPlaying = true
                    setTimeout(makeAIMove, 300);
                }
            }
        } else {
            alert('Invalid move!');
        }
    }
}


function resetBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`cell${i}${j}`).innerText = '';
        }
    }
}

function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    player = 'X';
    gameEnded = false;
    document.getElementById('print').innerHTML = 'Player X turn.';
    isAiPlaying = false;
    resetBoard();
}

function switchPlayer() {

    player === 'X' ? player = 'O' : player = 'X';
    player === 'X' && isAiPlaying === false ? document.getElementById('print').innerHTML = 'Player X turn.' : document.getElementById('print').innerHTML = 'Player O turn.'
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomMove() {
    i = getRandomInt(3);
    j = getRandomInt(3);
    if (board[i][j] === ''){
        return {i,j};
    } else {
        return getRandomMove();
    }
}

function makeAIMove() {
    if (aiDifficulty === 2) { // random
        isAiPlaying = false;
        let move = getRandomMove()
        makeMove(move.i, move.j)
    } else { // easy / hard
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'O';
                    let score = minimax(board, 0, false);
                    board[i][j] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        move = {i, j};
                    }
                }
            }
        }
        isAiPlaying = false;
        makeMove(move.i, move.j);
    }
}

function minimax(board, isMaximizing) {
    const RESULT = checkWin(true);
    if (RESULT !== null) {
        return scores[RESULT];
    }

    let bestScore = isMaximizing ? -Infinity : Infinity;
    const COMPARE = isMaximizing ? Math.max : Math.min;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = isMaximizing ? 'O' : 'X';
                const SCORE = minimax(board, !isMaximizing);
                board[i][j] = '';
                bestScore = COMPARE(SCORE, bestScore);
            }
        }
    }
    return bestScore;
}
