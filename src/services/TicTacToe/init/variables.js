let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let player = 'X';
let gamemode;
let aiDifficulty;
let isAiPlaying = true;
let xColor = 'blue';
let oColor = 'red';
const WINCOLOR = 'lime';
let gameEnded = false;
let scores;
let achievements = [false, false, false, false]; //must be replaced with list from db

/*
0: win against easy AI
1: win against normal AI
2: play a 2 player game
3: 100% TicTacToe
 */