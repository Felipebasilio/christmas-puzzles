import { readInputFile } from "./read-file";

export const getAmountOfFreshIngredients = (): number => {
  const { firstRow, secondRow, thirdRow, fourthRow, operationsRow } =
    readInputFile();
  const rowsSize = firstRow.length;

  let totalSum = 0;

  for (let i = 0; i < rowsSize; i++) {
    if (operationsRow[i] == "+") {
      totalSum += firstRow[i]! + secondRow[i]! + thirdRow[i]! + fourthRow[i]!;
    } else if (operationsRow[i] == "*") {
      totalSum += firstRow[i]! * secondRow[i]! * thirdRow[i]! * fourthRow[i]!;
    }
  }

  return totalSum;
};
