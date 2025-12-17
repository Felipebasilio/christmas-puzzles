import { readInputFile } from "./read-file";

export const countAccessibleRolls = (): number => {
  const grid = readInputFile();
  let accessibleCount = 0;

  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '@') {
        let neighborRollCount = 0;

        for (const [dr, dc] of directions) {
          const newRow = row + dr;
          const newCol = col + dc;

          if (
            newRow >= 0 &&
            newRow < rows &&
            newCol >= 0 &&
            newCol < cols &&
            grid[newRow][newCol] === '@'
          ) {
            neighborRollCount++;
          }
        }

        if (neighborRollCount < 4) {
          accessibleCount++;
        }
      }
    }
  }

  return accessibleCount;
};

