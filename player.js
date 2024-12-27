export const player = {
    x: 1.5, // Starting X position
    y: 1.5, // Starting Y position
    angle: 0, // Facing angle in radians
    speed: 3, // Base movement speed
    sprintMultiplier: 2, // Sprinting speed multiplier
};

const keys = { w: false, a: false, s: false, d: false, shift: false };

// Handle keyboard input
export function handleKeyDown(event) {
    if (event.key === 'w') keys.w = true;
    if (event.key === 'a') keys.a = true;
    if (event.key === 's') keys.s = true;
    if (event.key === 'd') keys.d = true;
    if (event.key === 'Shift') keys.shift = true;
}

export function handleKeyUp(event) {
    if (event.key === 'w') keys.w = false;
    if (event.key === 'a') keys.a = false;
    if (event.key === 's') keys.s = false;
    if (event.key === 'd') keys.d = false;
    if (event.key === 'Shift') keys.shift = false;
}

// Handle mouse movement for rotating the player's view
export function handleMouseMove(event) {
    const sensitivity = 0.002; // Adjust sensitivity for smoother rotation
    player.angle += event.movementX * sensitivity;
}

// Update player position and handle collision
export function updatePlayerPosition(deltaTime, maze) {
    const moveSpeed = keys.shift ? player.speed * player.sprintMultiplier : player.speed;

    let newX = player.x;
    let newY = player.y;

    // Move forward or backward
    if (keys.w) {
        newX += Math.cos(player.angle) * moveSpeed * deltaTime;
        newY += Math.sin(player.angle) * moveSpeed * deltaTime;
    }
    if (keys.s) {
        newX -= Math.cos(player.angle) * moveSpeed * deltaTime;
        newY -= Math.sin(player.angle) * moveSpeed * deltaTime;
    }

    // Inverted strafe left or right
    if (keys.a) {
        newX += Math.sin(player.angle) * moveSpeed * deltaTime;  // Inverted
        newY -= Math.cos(player.angle) * moveSpeed * deltaTime;  // Inverted
    }
    if (keys.d) {
        newX -= Math.sin(player.angle) * moveSpeed * deltaTime;  // Inverted
        newY += Math.cos(player.angle) * moveSpeed * deltaTime;  // Inverted
    }

    // Collision detection
    if (!isWall(newX, newY, maze)) {
        player.x = newX;
        player.y = newY;
    }
}

function isWall(x, y, maze) {
    const cellX = Math.floor(x);
    const cellY = Math.floor(y);
    return maze[cellY]?.[cellX] === 1; // Check if cell is a wall
}
