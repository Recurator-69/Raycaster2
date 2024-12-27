import { generateMaze } from './maze.js';
import { handleInput, updatePlayerPosition } from './player.js';
import { drawScene } from './render.js';

// Initialization
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const maze = generateMaze();
const viewDistance = 1000;
const fov = Math.PI / 3;

let playerX = 1.5;
let playerY = 1.5;
let playerAngle = 0;

function gameLoop() {
    // Update player position and angle
    const { x, y, angle } = updatePlayerPosition(playerX, playerY, playerAngle, maze);
    playerX = x;
    playerY = y;
    playerAngle = angle;

    // Render the scene
    drawScene(ctx, canvas, playerX, playerY, playerAngle, maze, viewDistance, fov);

    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
