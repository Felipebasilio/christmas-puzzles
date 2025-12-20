import { readInputFile } from "./read-file";

export const getAmountOfFreshIngredients = (): number => {
  const { rows, operationsRow } = readInputFile();
  
  const maxWidth = Math.max(...rows.map(row => row.length), operationsRow.length);
  
  const paddedRows = rows.map(row => row.padEnd(maxWidth, ' '));
  const paddedOperationsRow = operationsRow.padEnd(maxWidth, ' ');
  
  let totalSum = 0;
  
  const isSeparatorColumn = (col: number): boolean => {
    for (const row of paddedRows) {
      if (row[col] && row[col] !== ' ') {
        return false;
      }
    }
    const opChar = paddedOperationsRow[col]?.trim();
    if (opChar && opChar !== '') {
      return false;
    }
    return true;
  };
  
  let col = maxWidth - 1;
  
  while (col >= 0) {
    if (isSeparatorColumn(col)) {
      col--;
      continue;
    }
    
    let operationCol = col;
    let operation = '';
    
    for (let c = col; c >= 0; c--) {
      if (isSeparatorColumn(c)) {
        break;
      }
      const opChar = paddedOperationsRow[c]?.trim();
      if (opChar === '+' || opChar === '*') {
        operation = opChar;
        operationCol = c;
        break;
      }
    }
    
    if (operation === '+' || operation === '*') {
      let problemEnd = col;
      let problemStart = operationCol;
      
      while (problemStart > 0 && !isSeparatorColumn(problemStart - 1)) {
        problemStart--;
      }
      
      const numbers: number[] = [];
      
      for (let numCol = problemEnd; numCol >= problemStart; numCol--) {
        let numberStr = '';
        for (const row of paddedRows) {
          const char = row[numCol];
          if (char && char !== ' ') {
            numberStr += char;
          }
        }
        
        if (numberStr.length > 0) {
          numbers.push(parseInt(numberStr, 10));
        }
      }
      
      if (numbers.length > 0) {
        let result: number;
        if (operation === '+') {
          result = numbers.reduce((acc, curr) => acc + curr, 0);
        } else {
          result = numbers.reduce((acc, curr) => acc * curr, 1);
        }
        totalSum += result;
      }
      
      col = problemStart - 1;
    } else {
      col--;
    }
  }
  
  return totalSum;
};