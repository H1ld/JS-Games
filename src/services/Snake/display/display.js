function drawCanvasBorder() {
    SNAKEBOARD_CTX.strokeRect(0, 0, SNAKEBOARD.width, SNAKEBOARD.height);
}

function clearBoard() {
    SNAKEBOARD_CTX.fillStyle = BOARDBACKGROUND;
    SNAKEBOARD_CTX.fillRect(0, 0, SNAKEBOARD.width, SNAKEBOARD.height);
    drawCanvasBorder();
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawFood() {
    SNAKEBOARD_CTX.fillStyle = foodColor;
    SNAKEBOARD_CTX.fillRect(foodX, foodY, 10, 10);
    SNAKEBOARD_CTX.strokeRect(foodX, foodY, 10, 10);
}

function drawSnakePart(snakePart) {
    SNAKEBOARD_CTX.fillStyle = snakeColor;
    SNAKEBOARD_CTX.fillRect(snakePart.x, snakePart.y, 10, 10);
    SNAKEBOARD_CTX.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
