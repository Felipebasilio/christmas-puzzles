import * as fs from "fs";
import * as path from "path";

export const readInputFile = (): string[] => {
  const rootDir = process.cwd();
  // const filePath = path.join(rootDir, "./data/test.txt");
  const filePath = path.join(rootDir, './data/input.txt');
  const input = fs.readFileSync(filePath, "utf8");

  const lines = input.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);

  return lines;
};