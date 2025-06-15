function main() {

    if (hasGameEnded()) {
        document.getElementById("menuButton").style.display = "block";
        if (score >=50){
            unlockAchievements(2);
            unlockAchievements(1);
            unlockAchievements(0);
        } else if (score >= 25){
            unlockAchievements(1);
            unlockAchievements(0);
        } else if (score >= 10){
            unlockAchievements(0);
        }
    }
    if (gamePaused || hasGameEnded()) return;

    changingDirection = false;
    setTimeout(function onTick() {
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        main();
    }, 100)
}

function hasGameEnded() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const HITLEFTWALL = snake[0].x < 0;
    const HITRIGHTWALL = snake[0].x > SNAKEBOARD.width - 10;
    const HITTOPWALL = snake[0].y < 0;
    const HITBOTTOMWALL = snake[0].y > SNAKEBOARD.height - 10;
    return HITLEFTWALL || HITRIGHTWALL || HITTOPWALL || HITBOTTOMWALL
}

function randomFood(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function generateFood() {
    foodX = randomFood(0, SNAKEBOARD.width - 10);
    foodY = randomFood(0, SNAKEBOARD.height - 10);

    //makes sure food hasn't been generated where the snake is
    snake.forEach(function hasSnakeEatenFood(part) {
        const HASEATEN = part.x === foodX && part.y === foodY;
        if (HASEATEN) generateFood();
    });
}

function changeDirection(event) {
    const SPACE_KEY = 32;
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const KEYPRESSED = event.keyCode;

    if (KEYPRESSED === SPACE_KEY) { // pause/play
        if (gamePaused) {
            gamePaused = false;
            main();
        } else {
            gamePaused = true;
        }
    }


    if (changingDirection) return;
    changingDirection = true;
    const GOINGUP = dy === -10;
    const GOINGDOWN = dy === 10;
    const GOINGRIGHT = dx === 10;
    const GOINGLEFT = dx === -10;
    if (KEYPRESSED === LEFT_KEY && !GOINGRIGHT) {
        dx = -10;
        dy = 0;
    }
    if (KEYPRESSED === UP_KEY && !GOINGDOWN) {
        dx = 0;
        dy = -10;
    }
    if (KEYPRESSED === RIGHT_KEY && !GOINGLEFT) {
        dx = 10;
        dy = 0;
    }
    if (KEYPRESSED === DOWN_KEY && !GOINGUP) {
        dx = 0;
        dy = 10;
    }
}

function moveSnake() {
    const HEAD = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(HEAD);
    const HASEATENFOOD = snake[0].x === foodX && snake[0].y === foodY;
    if (HASEATENFOOD) {
        score += 1;
        document.getElementById('score').innerHTML = score;
        generateFood();
    } else {
        snake.pop();
    }
}

function backToMenu() {
    document.getElementById("game").style.display = "none";
    document.getElementById("startingMenu").style.display = "flex";
    clearBoard();
}
