import { readInputFile, Point, ShapeSymmetries, Region } from "./read-file";

const canPlaceShape = (
  grid: boolean[][],
  width: number,
  height: number,
  points: Point[],
  ox: number,
  oy: number
): boolean => {
  for (const p of points) {
    const nx = ox + p.x;
    const ny = oy + p.y;
    
    if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
      return false;
    }
    
    if (grid[ny][nx]) {
      return false;
    }
  }
  return true;
};

const toggleShape = (
  grid: boolean[][],
  points: Point[],
  ox: number,
  oy: number,
  value: boolean
): void => {
  for (const p of points) {
    grid[oy + p.y][ox + p.x] = value;
  }
};

const findFirstEmptyCell = (
  grid: boolean[][],
  width: number,
  height: number
): { x: number; y: number } | null => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!grid[y][x]) {
        return { x, y };
      }
    }
  }
  return null;
};

const backtrack = (
  grid: boolean[][],
  width: number,
  height: number,
  shapes: ShapeSymmetries[],
  remainingShapeIndices: number[],
  shapeIdx: number
): boolean => {
  if (shapeIdx >= remainingShapeIndices.length) {
    return true;
  }

  const emptyCell = findFirstEmptyCell(grid, width, height);
  
  if (!emptyCell) {
    return false;
  }

  const { x: emptyX, y: emptyY } = emptyCell;
  const currentShapeIndex = remainingShapeIndices[shapeIdx];
  const shapeSymmetries = shapes[currentShapeIndex];

  for (const symmetry of shapeSymmetries) {
    for (const offset of symmetry) {
      const startX = emptyX - offset.x;
      const startY = emptyY - offset.y;

      if (canPlaceShape(grid, width, height, symmetry, startX, startY)) {
        toggleShape(grid, symmetry, startX, startY, true);

        if (backtrack(grid, width, height, shapes, remainingShapeIndices, shapeIdx + 1)) {
          return true;
        }

        toggleShape(grid, symmetry, startX, startY, false);
      }
    }
  }

  grid[emptyY][emptyX] = true;
  const result = backtrack(grid, width, height, shapes, remainingShapeIndices, shapeIdx);
  grid[emptyY][emptyX] = false;

  return result;
};

const canFitRegion = (
  shapes: ShapeSymmetries[],
  region: Region
): boolean => {
  const { width, height, shapeCounts } = region;

  const requiredShapes: number[] = [];
  shapeCounts.forEach((qty, shapeIdx) => {
    for (let i = 0; i < qty; i++) {
      requiredShapes.push(shapeIdx);
    }
  });

  let totalShapeArea = 0;
  for (const shapeIdx of requiredShapes) {
    totalShapeArea += shapes[shapeIdx][0].length;
  }
  
  if (totalShapeArea > width * height) {
    return false;
  }

  const grid: boolean[][] = Array.from(
    { length: height },
    () => new Array(width).fill(false)
  );

  return backtrack(grid, width, height, shapes, requiredShapes, 0);
};

export const partOne = (): number => {
  const { shapes, regions } = readInputFile();

  let validCount = 0;
  
  for (let i = 0; i < regions.length; i++) {
    const region = regions[i];
    if (canFitRegion(shapes, region)) {
      validCount++;
    }
    
    if ((i + 1) % 100 === 0) {
      console.log(`Processed ${i + 1}/${regions.length} regions...`);
    }
  }

  return validCount;
};
