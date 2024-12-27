export function castRay(playerX, playerY, playerAngle, angle, maze, viewDistance) {
    let rayX = playerX;
    let rayY = playerY;
    const stepSize = 0.01; // The precision of the ray
    let distance = 0;

    while (distance < viewDistance) {
        rayX += Math.cos(playerAngle + angle) * stepSize;
        rayY += Math.sin(playerAngle + angle) * stepSize;
        distance += stepSize;

        // Check if the ray hits a wall
        if (isWall(rayX, rayY, maze)) {
            return { distance, hitType: 'wall' };
        }

        // Check if the ray hits an exit
        if (isExit(rayX, rayY, maze)) {
            return { distance, hitType: 'exit' };
        }
    }

    return { distance: viewDistance, hitType: null };
}

function isWall(x, y, maze) {
    const mapX = Math.floor(x);
    const mapY = Math.floor(y);
    return maze[mapY] && maze[mapY][mapX] === 1;
}

function isExit(x, y, maze) {
    const mapX = Math.floor(x);
    const mapY = Math.floor(y);
    return maze[mapY] && maze[mapY][mapX] === 2;
}
