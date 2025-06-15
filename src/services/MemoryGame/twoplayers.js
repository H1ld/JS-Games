var emojis = ["😁", "😎", "💖", "😒", "😡", "👽", "💩", "✌️"];
var gameBoard = document.getElementById('game-board');
var cards = [];
var flippedCards = [];
var matchedCards = [];
var currentPlayer = 1;
var player1Pairs = 0;
var player2Pairs = 0;

initializeGame();

function initializeGame() {
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedCards = [];
    currentPlayer = 1;
    player1Pairs = 0;
    player2Pairs = 0;
    document.getElementById('Player1').textContent = 'Score: 0';
    document.getElementById('Player2').textContent = 'Score: 0';

    var emojiPairs = emojis.concat(emojis);
    shuffleArray(emojiPairs);

    for (var i = 0; i < 16; i++) {
        var card = document.createElement('div');
        card.className = 'card';
        card.dataset.emoji = emojiPairs[i];
        card.textContent = emojiPairs[i]; 
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    var card1 = flippedCards[0];
    var card2 = flippedCards[1];

    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedCards.push(card1, card2);
        updateScore();
        checkGameEnd();
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        currentPlayer = (currentPlayer === 1) ? 2 : 1;
    }

    flippedCards = [];
}

function updateScore() {
    if (currentPlayer === 1) {
        player1Pairs++;
        document.getElementById('Player1').textContent = 'Score: ' + player1Pairs;
    } else {
        player2Pairs++;
        document.getElementById('Player2').textContent = 'Score: ' + player2Pairs;
    }
}

function checkGameEnd() {
    if (matchedCards.length === cards.length) {
        var result;

        if (player1Pairs > player2Pairs) {
            result = 'Player 1 won';
        } else if (player2Pairs > player1Pairs) {
            result = 'Player 2 won';
        } else {
            result = "It's a draw";
        }

        window.alert(result);
        document.location.reload();
    }
}
