import * as fs from "fs";
import * as path from "path";

export interface JunctionBox {
  x: number;
  y: number;
  z: number;
  index: number;
}

export interface IJunctionData {
  junctionBoxes: JunctionBox[];
}

export const readInputFile = (): IJunctionData => {
  const rootDir = process.cwd();
  // const filePath = path.join(rootDir, "./data/test.txt");
  const filePath = path.join(rootDir, "./data/input.txt");
  const input = fs.readFileSync(filePath, "utf8");

  const lines: string[] = input.split("\n").filter((line) => line.trim() !== "");

  const junctionBoxes: JunctionBox[] = lines.map((line, index) => {
    const [x, y, z] = line.split(",").map(Number);
    return { x, y, z, index };
  });

  return {
    junctionBoxes,
  };
};
