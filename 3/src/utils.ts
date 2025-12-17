import { readInputFile } from "./read-file";

export const getBatteriesJoltages = () => {
  const banks = readInputFile();
  let batteryJoltagesArray: string[] = [];

  for (const bank of banks) {
    const batteryJoltage = getBiggest12DigitNumber(bank);
    batteryJoltagesArray.push(batteryJoltage);
  }

  return batteryJoltagesArray;
};

const getBiggest12DigitNumber = (bank: string): string => {
  let maxJoltage = "";
  let startIndex = 0;

  for (let position = 0; position < 12; position++) {
    const digitsNeeded = 12 - position - 1;
    const maxSearchIndex = bank.length - digitsNeeded - 1;
    
    let bestDigit = "";
    let bestIndex = -1;
    for (let digit = 9; digit >= 1; digit--) {
      const digitStr = digit.toString();
      const index = bank.indexOf(digitStr, startIndex);
      
      if (index !== -1 && index <= maxSearchIndex) {
        bestDigit = digitStr;
        bestIndex = index;
        break;
      }
    }
    
    if (bestIndex === -1) {
      break;
    }
    
    maxJoltage += bestDigit;
    startIndex = bestIndex + 1;
  }

  return maxJoltage;
};

