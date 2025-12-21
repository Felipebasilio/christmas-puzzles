import * as fs from "fs";
import * as path from "path";

export interface RedTile {
  x: number;
  y: number;
}

export interface ITileData {
  tiles: RedTile[];
}

export const readInputFile = (): ITileData => {
  const rootDir = process.cwd();
  // const filePath = path.join(rootDir, "./data/test.txt");
  const filePath = path.join(rootDir, "./data/input.txt");
  const input = fs.readFileSync(filePath, "utf8");

  const lines: string[] = input.split("\n").filter((line) => line.trim() !== "");

  const tiles: RedTile[] = lines.map((line) => {
    const [x, y] = line.split(",").map(Number);
    return { x, y };
  });

  return {
    tiles,
  };
};
