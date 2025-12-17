import { IdRange, readInputFile } from "./read-file";

export const getIdsList = (): number[] => {
  const idsList = readInputFile();
  let duplicates: number[] = [];

  for (const idRange of idsList) {
    const { start, end } = idRange!;
    const difference = parseInt(end) - parseInt(start);
    let startIdNumber = parseInt(start);

    for (let i = 0; i <= difference; i++) {
      let hasDuplicate = checkHasDuplicate(startIdNumber.toString());
      if (hasDuplicate) {
        duplicates.push(startIdNumber);
        console.log("duplicates: ", duplicates);
      }
      startIdNumber++;
    }
  }

  return duplicates;
};

const checkHasDuplicate = (id: string): boolean => {
  const idLength = id.length;

  if (idLength % 2 !== 0 || idLength === 1) return false;

  const partOne = id.slice(0, idLength / 2);
  const partTwo = id.slice(idLength / 2);

  if (partOne === partTwo) {
    return true;
  } else {
    return checkHasDuplicate(partOne) && checkHasDuplicate(partTwo);
  }
};
