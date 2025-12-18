import { readInputFile } from "./read-file";

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
];

export const countAccessibleRolls = (): number => {
  const grid = readInputFile();
  let accessibleCount = 0;

  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row]![col]! === '@') {
        let neighborRollCount = 0;

        for (const [dr, dc] of directions) {
          const newRow = row + dr!;
          const newCol = col + dc!;

          if (
            newRow >= 0 &&
            newRow < rows &&
            newCol >= 0 &&
            newCol < cols &&
            grid[newRow]![newCol]! === '@'
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

export const countTotalRemovableRolls = (): number => {
  const inputGrid = readInputFile();
  const rows = inputGrid.length;
  const cols = inputGrid[0]?.length || 0;

  const grid: string[][] = inputGrid.map(row => row.split(''));

  let totalRemoved = 0;

  while (true) {
    const rollsToRemove: [number, number][] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (grid[row]![col]! === '@') {
          let neighborRollCount = 0;

          for (const [dr, dc] of directions) {
            const newRow = row + dr!;
            const newCol = col + dc!;

            if (
              newRow >= 0 &&
              newRow < rows &&
              newCol >= 0 &&
              newCol < cols &&
              grid[newRow]![newCol]! === '@'
            ) {
              neighborRollCount++;
            }
          }

          if (neighborRollCount < 4) {
            rollsToRemove.push([row, col]);
          }
        }
      }
    }

    if (rollsToRemove.length === 0) {
      break;
    }

    for (const [row, col] of rollsToRemove) {
      grid[row]![col]! = '.';
      totalRemoved++;
    }
  }

  return totalRemoved;
};

