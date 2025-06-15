window.onload = function() {
    initializeGame();

    document.getElementById("restart-button").addEventListener("click", restartGame);
};

function initializeGame() {
    board = document.getElementById("board");
    context = board.getContext("2d");

    // Load images
    shipImg = new Image();
    shipImg.src = "/media/ship.png";
    shipImg.onload = function() {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    };

    alienImg = new Image();
    alienImg.src = "/media/alien.png";
    alienImg.onload = function() {
        createAliens(); 
    };

    // Adjust canvas size
    resizeCanvas();

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveShip);
    document.addEventListener("keyup", shoot);
    window.addEventListener("resize", resizeCanvas);
}

function resizeCanvas() {
    let windowDiv = document.getElementById("window");
    board.width = windowDiv.clientWidth;
    board.height = windowDiv.clientHeight;
}

function restartGame() {
    // Reset game variables
    ship.x = shipX;
    ship.y = shipY;
    alienArray = [];
    bulletArray = [];
    score = 0;
    gameOver = false;

     //reset alien variables
     alienArray = [];
     alienRows = 2; // Valeur initiale
     alienColumns = 3; // Valeur initiale
 
    createAliens();

    // Hide the restart button
    document.getElementById("restart-button").style.display = "none";
}
