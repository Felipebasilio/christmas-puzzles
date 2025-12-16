import * as fs from "fs";
import * as path from "path";

export interface IdRange {
  start: string;
  end: string;
}

export const readInputFile = (): IdRange[] => {
  const rootDir = process.cwd();
  const filePath = path.join(rootDir, "./data/test.txt");
  // const filePath = path.join(rootDir, './data/input.txt');
  // const filePath = path.join(rootDir, './data/input2.txt');
  const input = fs.readFileSync(filePath, "utf8");

  const lines = input.split(",").map((line) => line.trim());

  return lines.map((line) => {
    const [start, end] = line.split("-");
    return { start: String(start), end: String(end) };
  });
};