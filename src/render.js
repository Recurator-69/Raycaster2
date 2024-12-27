import { castRay } from './raycast.js';

export function drawScene(ctx, canvas, playerX, playerY, playerAngle, maze, viewDistance, fov) {
    const numRays = canvas.width;
    const halfFov = fov / 2;

    // Draw the sky and floor
    drawSkyAndFloor(ctx, canvas);

    for (let i = 0; i < numRays; i++) {
        const rayAngle = -halfFov + (i / numRays) * fov;
        const { distance, hitType } = castRay(playerX, playerY, playerAngle, rayAngle, maze, viewDistance);

        // Draw the wall slice
        const lineHeight = canvas.height / (distance || 1);
        const wallStart = (canvas.height - lineHeight) / 2;
        const color = hitType === 'exit' ? 'yellow' : `rgb(${255 - distance * 10}, ${255 - distance * 10}, ${255 - distance * 10})`;

        ctx.fillStyle = color;
        ctx.fillRect(i, wallStart, 1, lineHeight);
    }
}

function drawSkyAndFloor(ctx, canvas) {
    // Sky
    let skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height / 2);
    skyGradient.addColorStop(0, 'skyblue');
    skyGradient.addColorStop(1, 'lightblue');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

    // Floor
    ctx.fillStyle = 'darkgray';
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
}
