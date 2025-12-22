import * as fs from "fs";
import * as path from "path";

export interface Point {
  x: number;
  y: number;
}

export type ShapeSymmetries = Point[][];

export interface Region {
  width: number;
  height: number;
  shapeCounts: number[];
}

export interface IPuzzleData {
  shapes: ShapeSymmetries[];
  regions: Region[];
}

const normalizePoints = (points: Point[]): Point[] => {
  if (points.length === 0) return [];
  
  const minX = Math.min(...points.map(p => p.x));
  const minY = Math.min(...points.map(p => p.y));
  
  return points
    .map(p => ({ x: p.x - minX, y: p.y - minY }))
    .sort((a, b) => a.y - b.y || a.x - b.x);
};

const generateAllSymmetries = (grid: string[]): ShapeSymmetries => {
  const points: Point[] = [];
  grid.forEach((row, y) => {
    row.split('').forEach((char, x) => {
      if (char === '#') {
        points.push({ x, y });
      }
    });
  });

  const uniqueSymmetries = new Set<string>();
  const results: Point[][] = [];

  let current = points;

  for (let flip = 0; flip < 2; flip++) {
    for (let rotation = 0; rotation < 4; rotation++) {
      const normalized = normalizePoints(current);
      const key = JSON.stringify(normalized);
      
      if (!uniqueSymmetries.has(key)) {
        uniqueSymmetries.add(key);
        results.push(normalized);
      }
      
      current = current.map(p => ({ x: -p.y, y: p.x }));
    }
    current = current.map(p => ({ x: -p.x, y: p.y }));
  }

  return results;
};

const parseShapes = (shapeLines: string[]): ShapeSymmetries[] => {
  const shapes: ShapeSymmetries[] = [];
  let currentGrid: string[] = [];

  for (const line of shapeLines) {
    if (line.includes(':')) {
      if (currentGrid.length > 0) {
        shapes.push(generateAllSymmetries(currentGrid));
      }
      currentGrid = [];
    } else if (line.trim()) {
      currentGrid.push(line.trim());
    }
  }
  
  if (currentGrid.length > 0) {
    shapes.push(generateAllSymmetries(currentGrid));
  }

  return shapes;
};

const parseRegions = (regionLines: string[]): Region[] => {
  return regionLines.map(line => {
    const [sizePart, countsPart] = line.split(': ');
    const [width, height] = sizePart.split('x').map(Number);
    const shapeCounts = countsPart.split(' ').map(Number);
    
    return { width, height, shapeCounts };
  });
};

export const readInputFile = (): IPuzzleData => {
  const rootDir = process.cwd();
  const filePath = path.join(rootDir, "./data/input.txt");
  const input = fs.readFileSync(filePath, "utf8");

  const sections = input.trim().split('\n\n');
  
  const lines = input.trim().split('\n');
  let regionStartIndex = lines.findIndex(line => /^\d+x\d+:/.test(line));
  
  const shapeLines = lines.slice(0, regionStartIndex).filter(l => l.trim());
  const regionLines = lines.slice(regionStartIndex).filter(l => l.trim());

  const shapes = parseShapes(shapeLines);
  const regions = parseRegions(regionLines);

  return { shapes, regions };
};
