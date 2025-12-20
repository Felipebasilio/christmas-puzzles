import * as fs from "fs";
import * as path from "path";

interface IOperationsData {
  rows: string[];
  operationsRow: string;
}

export const readInputFile = (): IOperationsData => {
  const rootDir = process.cwd();
  // const filePath = path.join(rootDir, "./data/test.txt");
  const filePath = path.join(rootDir, "./data/input.txt");
  const input = fs.readFileSync(filePath, "utf8");

  let lines: string[] = input.split("\n").map((line) => line);
  
  const operationsRow = lines[lines.length - 1] ?? "";
  const rows = lines.slice(0, lines.length - 1);

  return {
    rows,
    operationsRow,
  };
};
