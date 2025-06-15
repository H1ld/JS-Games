const BOARDBACKGROUND = "white";
let snakeColor;
let foodColor;

let snake;

let score;
let changingDirection;
let foodX;
let foodY;
let dx; // horizontal velocity
let dy; // Vertical velocity
let gamePaused = false;

const SNAKEBOARD = document.getElementById("snakeBoard");
const SNAKEBOARD_CTX = SNAKEBOARD.getContext("2d");

let achievements = [false,false,false,false];

/*
0: get 10 points
1: get 25 points
2: get 50 points
3: 100% the game

*/