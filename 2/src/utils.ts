import { IdRange, readInputFile } from "./read-file";

const dividersMap = new Map<number, number[]>([
  [2, [2]],
  [3, [3]],
  [4, [2, 4]],
  [5, [5]],
  [6, [2, 3, 6]],
  [7, [7]],
  [8, [2, 4, 8]],
  [9, [3, 9]],
  [10, [2, 5, 10]],
  [11, [11]],
  [12, [2, 3, 4, 6, 12]],
  [13, [13]],
  [14, [2, 7, 14]],
  [15, [3, 5, 15]],
  [16, [2, 4, 8, 16]],
  [17, [17]],
  [18, [2, 3, 6, 9, 18]],
  [19, [19]],
  [20, [2, 4, 5, 10, 20]],
  [21, [3, 7, 21]],
  [22, [2, 11, 22]],
  [23, [23]],
  [24, [2, 3, 4, 6, 8, 12, 24]],
  [25, [5, 25]],
  [26, [2, 13, 26]],
  [27, [3, 9, 27]],
  [28, [2, 4, 7, 14, 28]],
  [29, [29]],
  [30, [2, 3, 5, 6, 10, 15, 30]],
]);

export const getIdsList = (): number[] => {
  const idsList = readInputFile();
  let duplicates: number[] = [];

  for (const idRange of idsList) {
    const { start, end } = idRange!;
    const difference = parseInt(end) - parseInt(start);
    let startIdNumber = parseInt(start);

    for (let i = 0; i <= difference; i++) {
      let hasDuplicate = false;

      for (const divider of dividersMap.get(startIdNumber.toString().length) ??
        []) {
        if (checkHasNthDuplicate(startIdNumber.toString(), divider)) {
          hasDuplicate = true;
          duplicates.push(startIdNumber);
          console.log("duplicates: ", duplicates);
          break;
        }
      }

      startIdNumber++;
    } 
  }

  return duplicates;
};

const checkHasNthDuplicate = (id: string, n: number): any => {
  const idLength = id.length;

  if (idLength === 1) return false;

  const partsArray = Array.from({ length: n }, (_, i) =>
    id.slice(i * (idLength / n), (i + 1) * (idLength / n))
  );

  console.log("partsArray: ", partsArray);

  return partsArray.every(
    (part) => part === partsArray[0] && part.length === partsArray[0].length
  );
};
