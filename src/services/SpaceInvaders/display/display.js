function update() {
    requestAnimationFrame(update); // Create a game loop

    if (gameOver) {
        showRestartButton();
        return;
    }

    context.clearRect(0, 0, board.width, board.height);
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    updateAliens();
    updateBullets();
    checkNextLevel();

    context.fillStyle = "white";
    context.font = "16px courier";
    context.fillText(score, 5, 20);
}

function updateAliens() {
    for (let alien of alienArray) {
        if (alien.alive) {
            alien.x += alienVelocityX;

            if (alien.x + alien.width >= board.width || alien.x <= 0) {
                alienVelocityX *= -1;
                alien.x += alienVelocityX * 2;
                alienArray.forEach(a => a.y += alienHeight);
            }

            context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);

            if (alien.y >= ship.y) gameOver = true;
        }
    }
}

function updateBullets() {
    bulletArray.forEach(bullet => {
        bullet.y += bulletVelocityY;
        context.fillStyle = "white";
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        alienArray.forEach(alien => {
            if (!bullet.used && alien.alive && detectCollision(bullet, alien)) {
                bullet.used = true;
                alien.alive = false;
                alienCount--;
                score += 100;
            }
        });
    });

    bulletArray = bulletArray.filter(bullet => !bullet.used && bullet.y >= 0);
}

function checkNextLevel() {
    if (alienCount === 0) {
        score += alienColumns * alienRows * 100;
        alienColumns = Math.min(alienColumns + 1, columns / 2 - 2);
        alienRows = Math.min(alienRows + 1, rows - 4);
        alienVelocityX += alienVelocityX > 0 ? 0.2 : -0.2;
        alienArray = [];
        bulletArray = [];
        createAliens();
    }
}

function showRestartButton() {
    document.getElementById("restart-button").style.display = "block";
}
