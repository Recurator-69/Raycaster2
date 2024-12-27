export function drawScene(ctx, canvas, player, maze) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the maze (top-down view)
    const cellSize = 10;
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            ctx.fillStyle = maze[y][x] === 1 ? 'black' : maze[y][x] === 2 ? 'green' : 'white';
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

    // Draw the player
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(player.x * cellSize, player.y * cellSize, cellSize / 2, 0, Math.PI * 2);
    ctx.fill();
}
