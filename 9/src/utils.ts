import { readInputFile, RedTile } from "./read-file";

const calculateRectangleArea = (a: RedTile, b: RedTile): number => {
  const width = Math.abs(a.x - b.x) + 1;
  const height = Math.abs(a.y - b.y) + 1;
  return width * height;
};

export const partOne = (): number => {
  const { tiles } = readInputFile();
  const n = tiles.length;

  let maxArea = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const area = calculateRectangleArea(tiles[i]!, tiles[j]!);
      if (area > maxArea) {
        maxArea = area;
      }
    }
  }

  return maxArea;
};
