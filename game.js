import { generateMaze } from './maze.js';
import { player, updatePlayerPosition, handleKeyDown, handleKeyUp, handleMouseMove } from './player.js';
import { renderRaycasting } from './raycast.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Generate a 50x50 maze
const maze = generateMaze(50, 50);

let lastFrameTime = performance.now();

// Event listeners for player input
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);
window.addEventListener('mousemove', handleMouseMove);

function gameLoop() {
    const currentFrameTime = performance.now();
    const deltaTime = (currentFrameTime - lastFrameTime) / 1000; // Time in seconds
    lastFrameTime = currentFrameTime;

    // Clear the canvas to prevent ghosting
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update player movement and position
    updatePlayerPosition(deltaTime, maze);

    // Render the 3D raycasting view
    renderRaycasting(ctx, canvas, player, maze);

    // Continue the game loop
    requestAnimationFrame(gameLoop);
}

gameLoop();
