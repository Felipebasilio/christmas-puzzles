import * as fs from "fs";
import * as path from "path";

interface IOperationsData {
  firstRow: number[];
  secondRow: number[];
  thirdRow: number[];
  fourthRow: number[];
  operationsRow: string[];
}

const formatRow = (
  row: string,
  isOperation: boolean = false
): (number | string)[] => {
  return row
    .split(" ")
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .map((item) => (isOperation ? item : parseInt(item)));
};

export const readInputFile = (): IOperationsData => {
  const rootDir = process.cwd();
  // const filePath = path.join(rootDir, "./data/test.txt");
  const filePath = path.join(rootDir, "./data/input.txt");
  const input = fs.readFileSync(filePath, "utf8");

  let operationsData: string[] = input.split("\n").map((line) => line.trim());

  let firstRow = formatRow(operationsData[0] ?? "");
  let secondRow = formatRow(operationsData[1] ?? "");
  let thirdRow = formatRow(operationsData[2] ?? "");
  let fourthRow = formatRow(operationsData[3] ?? "");
  let operationsRow = formatRow(operationsData[4] ?? "", true);

  return {
    firstRow: firstRow as number[],
    secondRow: secondRow as number[],
    thirdRow: thirdRow as number[],
    fourthRow: fourthRow as number[],
    operationsRow: operationsRow as string[],
  };
};
