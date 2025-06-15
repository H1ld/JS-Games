
// Handles the movement of the player's ship in response to keyboard input
function moveShip(e) {
    if (gameOver) {
        return;
    }

    if (e.code === "ArrowLeft" && ship.x - shipVelocityX >= 0) {
        ship.x -= shipVelocityX; // Move left one tile
    } else if (e.code === "ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width) {
        ship.x += shipVelocityX; // Move right one tile
    }
}

// Generate a grid of aliens on the game board
function createAliens() {
    for (let c = 0; c < alienColumns; c++) {
        for (let r = 0; r < alienRows; r++) {
            let alien = {
                img: alienImg,
                x: alienX + c * alienWidth,
                y: alienY + r * alienHeight,
                width: alienWidth,
                height: alienHeight,
                alive: true
            };
            alienArray.push(alien);
        }
    }
    alienCount = alienArray.length;
}

// Player action of shooting bullets from the ship when the spacebar key is pressed
function shoot(e) {
    if (gameOver) {
        return;
    }

    if (e.code === "Space") {
        // Shoot
        let bullet = {
            x: ship.x + shipWidth * 15 / 32,
            y: ship.y,
            width: tileSize / 8,
            height: tileSize / 2,
            used: false
        };
        bulletArray.push(bullet);
    }
}

// Detecting collisions between two objects in the game
function detectCollision(a, b) {
    return a.x < b.x + b.width &&   // a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   // a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  // a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    // a's bottom left corner passes b's top left corner
}
