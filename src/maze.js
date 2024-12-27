export function generateMaze(width, height) {
    const maze = Array.from({ length: height }, () => Array(width).fill(1));
  
    function carve(x, y) {
      const directions = [
        [0, -1], [0, 1], [-1, 0], [1, 0]
      ].sort(() => Math.random() - 0.5);
  
      for (const [dx, dy] of directions) {
        const nx = x + dx * 2;
        const ny = y + dy * 2;
  
        if (nx > 0 && ny > 0 && nx < width - 1 && ny < height - 1 && maze[ny][nx] === 1) {
          maze[y + dy][x + dx] = 0;
          maze[ny][nx] = 0;
          carve(nx, ny);
        }
      }
    }
  
    maze[1][1] = 0;
    carve(1, 1);
  
    return maze;
  }
  