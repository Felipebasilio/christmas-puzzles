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

interface HorizontalSegment {
  y: number;
  x1: number;
  x2: number;
}

const buildHorizontalSegments = (tiles: RedTile[]): HorizontalSegment[] => {
  const segments: HorizontalSegment[] = [];
  const n = tiles.length;

  for (let i = 0; i < n; i++) {
    const current = tiles[i]!;
    const next = tiles[(i + 1) % n]!;

    if (current.y === next.y) {
      segments.push({
        y: current.y,
        x1: Math.min(current.x, next.x),
        x2: Math.max(current.x, next.x)
      });
    }
  }

  return segments;
};

const buildVerticalSegments = (tiles: RedTile[]): Array<{ x: number; y1: number; y2: number }> => {
  const segments: Array<{ x: number; y1: number; y2: number }> = [];
  const n = tiles.length;

  for (let i = 0; i < n; i++) {
    const current = tiles[i]!;
    const next = tiles[(i + 1) % n]!;

    if (current.x === next.x) {
      segments.push({
        x: current.x,
        y1: Math.min(current.y, next.y),
        y2: Math.max(current.y, next.y)
      });
    }
  }

  return segments;
};

const isOnEdge = (
  x: number, y: number,
  hSegments: HorizontalSegment[],
  vSegments: Array<{ x: number; y1: number; y2: number }>
): boolean => {
  for (const seg of hSegments) {
    if (y === seg.y && x >= seg.x1 && x <= seg.x2) return true;
  }
  for (const seg of vSegments) {
    if (x === seg.x && y >= seg.y1 && y <= seg.y2) return true;
  }
  return false;
};

const isInsidePolygonFast = (
  x: number, y: number,
  vSegments: Array<{ x: number; y1: number; y2: number }>
): boolean => {
  let crossings = 0;
  
  for (const seg of vSegments) {
    if (seg.x > x && y >= seg.y1 && y < seg.y2) {
      crossings++;
    }
  }
  
  return crossings % 2 === 1;
};

const isPointValid = (
  x: number, y: number,
  hSegments: HorizontalSegment[],
  vSegments: Array<{ x: number; y1: number; y2: number }>
): boolean => {
  return isOnEdge(x, y, hSegments, vSegments) || isInsidePolygonFast(x, y, vSegments);
};

const getValidXRangeForY = (
  y: number,
  minX: number,
  maxX: number,
  hSegments: HorizontalSegment[],
  vSegments: Array<{ x: number; y1: number; y2: number }>
): { valid: boolean; leftX: number; rightX: number } => {
  const relevantVSegments = vSegments
    .filter(seg => y >= seg.y1 && y < seg.y2)
    .map(seg => seg.x)
    .sort((a, b) => a - b);

  const relevantHSegments = hSegments
    .filter(seg => seg.y === y)
    .sort((a, b) => a.x1 - b.x1);

  let leftX = -1;
  let rightX = -1;
  let inside = false;

  for (let i = 0; i < relevantVSegments.length; i++) {
    if (inside) {
      if (leftX === -1) leftX = relevantVSegments[i - 1]!;
      rightX = relevantVSegments[i]!;
    }
    inside = !inside;
  }

  for (const seg of relevantHSegments) {
    if (leftX === -1 || seg.x1 < leftX) leftX = seg.x1;
    if (rightX === -1 || seg.x2 > rightX) rightX = seg.x2;
  }

  if (leftX <= minX && rightX >= maxX) {
    return { valid: true, leftX, rightX };
  }

  return { valid: false, leftX, rightX };
};

const isRectangleFullyInside = (
  minX: number, maxX: number, minY: number, maxY: number,
  hSegments: HorizontalSegment[],
  vSegments: Array<{ x: number; y1: number; y2: number }>,
  allYs: number[],
  allXs: number[]
): boolean => {
  if (!isPointValid(minX, minY, hSegments, vSegments) ||
      !isPointValid(minX, maxY, hSegments, vSegments) ||
      !isPointValid(maxX, minY, hSegments, vSegments) ||
      !isPointValid(maxX, maxY, hSegments, vSegments)) {
    return false;
  }

  for (const y of allYs) {
    if (y > minY && y < maxY) {
      if (!isPointValid(minX, y, hSegments, vSegments) ||
          !isPointValid(maxX, y, hSegments, vSegments)) {
        return false;
      }
    }
  }

  for (const x of allXs) {
    if (x > minX && x < maxX) {
      if (!isPointValid(x, minY, hSegments, vSegments) ||
          !isPointValid(x, maxY, hSegments, vSegments)) {
        return false;
      }
    }
  }

  const midX = Math.floor((minX + maxX) / 2);
  const midY = Math.floor((minY + maxY) / 2);
  if (!isPointValid(midX, midY, hSegments, vSegments)) {
    return false;
  }

  return true;
};

export const partTwo = (): number => {
  const { tiles } = readInputFile();
  const n = tiles.length;
  
  const hSegments = buildHorizontalSegments(tiles);
  const vSegments = buildVerticalSegments(tiles);

  const allYs = Array.from(new Set(tiles.map(t => t.y))).sort((a, b) => a - b);
  const allXs = Array.from(new Set(tiles.map(t => t.x))).sort((a, b) => a - b);

  const pairs: Array<{ i: number; j: number; area: number }> = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const area = calculateRectangleArea(tiles[i]!, tiles[j]!);
      pairs.push({ i, j, area });
    }
  }
  
  pairs.sort((a, b) => b.area - a.area);

  for (const pair of pairs) {
    const a = tiles[pair.i]!;
    const b = tiles[pair.j]!;

    const minX = Math.min(a.x, b.x);
    const maxX = Math.max(a.x, b.x);
    const minY = Math.min(a.y, b.y);
    const maxY = Math.max(a.y, b.y);

    if (isRectangleFullyInside(minX, maxX, minY, maxY, hSegments, vSegments, allYs, allXs)) {
      return pair.area;
    }
  }

  return 0;
};
