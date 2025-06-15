function showGame(gameId, cssFile, jsFile) {
    
    var games = document.querySelectorAll('.game');
    games.forEach(function(game) {
        game.style.display = 'none';
    });

    
    var selectedGame = document.getElementById(gameId);
    if (selectedGame) {
        selectedGame.style.display = 'block';
    }
   
    document.getElementById('style-sheet').setAttribute('href', '/src/styles/MemoryGame/' + cssFile);

    var oldScript = document.getElementById('game-script');
    if (oldScript) {
        oldScript.parentNode.removeChild(oldScript);
    }

    var newScript = document.createElement('script');
    newScript.setAttribute('src', '/src/services/MemoryGame/' + jsFile);
    newScript.setAttribute('id', 'game-script');
    document.body.appendChild(newScript);
}

function updateDisplay(attempts) {
    ATTEMPTSDISPLAY.textContent = '❤️'.repeat(attempts);
}