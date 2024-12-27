export function castRay(player, angle, maze) {
    const stepSize = 0.01; // Step size for ray movement
    const viewDistance = 1000;

    let rayX = player.x;
    let rayY = player.y;
    let distance = 0;

    while (distance < viewDistance) {
        rayX += Math.cos(angle) * stepSize;
        rayY += Math.sin(angle) * stepSize;
        distance += stepSize;

        if (isWall(rayX, rayY, maze)) {
            return distance;
        }
    }

    return viewDistance; // Max view distance if no wall is hit
}

export function renderRaycasting(ctx, canvas, player, maze) {
    const numRays = canvas.width; // One ray per horizontal pixel
    const fov = Math.PI / 3; // 60-degree field of view
    const halfFov = fov / 2;

    // Render floor and ceiling
    ctx.fillStyle = '#555'; // Ceiling color
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

    ctx.fillStyle = '#333'; // Floor color
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

    for (let i = 0; i < numRays; i++) {
        const rayAngle = player.angle - halfFov + (i / numRays) * fov;
        const distance = castRay(player, rayAngle, maze);

        const wallHeight = canvas.height / (distance || 1); // Avoid division by zero
        const intensity = Math.max(50, 255 / (distance || 1)); // Adjust brightness
        const color = `rgb(${intensity}, ${intensity}, ${intensity})`;

        const wallStart = (canvas.height - wallHeight) / 2;
        ctx.fillStyle = color;
        ctx.fillRect(i, wallStart, 1, wallHeight);
    }
}

function isWall(x, y, maze) {
    const cellX = Math.floor(x);
    const cellY = Math.floor(y);
    return maze[cellY]?.[cellX] === 1; // Check if cell is a wall
}
