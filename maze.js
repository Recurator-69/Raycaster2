export function generateMaze(width, height) {
    const maze = Array.from({ length: height }, () => Array(width).fill(1));

    function carve(x, y) {
        const directions = [
            [0, -1], [0, 1], [-1, 0], [1, 0], // Up, Down, Left, Right
        ].sort(() => Math.random() - 0.5); // Shuffle directions

        for (const [dx, dy] of directions) {
            const nx = x + dx * 2;
            const ny = y + dy * 2;

            if (nx > 0 && ny > 0 && nx < width - 1 && ny < height - 1 && maze[ny][nx] === 1) {
                maze[ny][nx] = 0;
                maze[y + dy][x + dx] = 0;
                carve(nx, ny);
            }
        }
    }

    maze[1][1] = 0; // Start position
    carve(1, 1);

    // Place exits
    for (let i = 0; i < 3; i++) {
        let ex, ey;
        do {
            ex = Math.floor(Math.random() * (width - 2)) + 1;
            ey = Math.floor(Math.random() * (height - 2)) + 1;
        } while (maze[ey][ex] !== 0);
        maze[ey][ex] = 2; // Exit
    }

    return maze;
}
