function beginGame() {
    snakeColor = document.getElementById("snakeColor").value;
    foodColor = document.getElementById("foodColor").value;

    document.getElementById("game").style.display = "block";
    document.getElementById("startingMenu").style.display = "none";
    document.getElementById("menuButton").style.display = "none";

    snake = [
        {x: 200, y: 200},
        {x: 190, y: 200},
        {x: 180, y: 200},
        {x: 170, y: 200},
        {x: 160, y: 200}
    ];
    score = 0;
    changingDirection = false;
    dx = 10;
    dy = 0;
    document.getElementById('score').innerHTML = score

    main();
    generateFood();
    document.addEventListener("keydown", changeDirection);
}


// prevents arrows from scrolling the page
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);