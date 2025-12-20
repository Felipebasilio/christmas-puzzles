import * as fs from "fs";
import * as path from "path";

export interface IManifoldData {
  grid: string[];
}

export const readInputFile = (): IManifoldData => {
  const rootDir = process.cwd();
  // const filePath = path.join(rootDir, "./data/test.txt");
  const filePath = path.join(rootDir, "./data/input.txt");
  const input = fs.readFileSync(filePath, "utf8");

  let lines: string[] = input.split("\n").filter((line) => line.trim() !== "");

  return {
    grid: lines,
  };
};
