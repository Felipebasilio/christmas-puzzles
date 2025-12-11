import { Direction, IRotation } from "./utils";
import * as fs from "fs";
import * as path from "path";

export const readInputFile = (): IRotation[] => {
  const rootDir = process.cwd();
  // const filePath = path.join(rootDir, "./data/test.txt");
  // const filePath = path.join(rootDir, './data/input.txt');
  const filePath = path.join(rootDir, './data/input2.txt');
  const input = fs.readFileSync(filePath, "utf8");

  const lines = input.split("\n").map((line) => line.trim());
  return lines.map((line) => {
    const direction = line[0] == "L" ? Direction.LEFT : Direction.RIGHT;
    const amount = line.slice(1);
    return { direction: direction as Direction, amount: parseInt(amount) };
  });
};