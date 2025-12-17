import { IdRange, readInputFile } from "./read-file";

const dividersMap = new Map<number, number[]>([
  [1, [1]],
  [2, [1, 2]],
  [3, [1, 3]],
  [4, [1, 2, 4]],
  [5, [1, 5]],
  [6, [1, 2, 3, 6]],
  [7, [1, 7]],
  [8, [1, 2, 4, 8]],
  [9, [1, 3, 9]],
  [10, [1, 2, 5, 10]],
  [11, [1, 11]],
  [12, [1, 2, 3, 4, 6, 12]],
  [13, [1, 13]],
  [14, [1, 2, 7, 14]],
  [15, [1, 3, 5, 15]],
  [16, [1, 2, 4, 8, 16]],
  [17, [1, 17]],
  [18, [1, 2, 3, 6, 9, 18]],
  [19, [1, 19]],
  [20, [1, 2, 4, 5, 10, 20]],
  [21, [1, 3, 7, 21]],
  [22, [1, 2, 11, 22]],
  [23, [1, 23]],
  [24, [1, 2, 3, 4, 6, 8, 12, 24]],
  [25, [1, 5, 25]],
  [26, [1, 2, 13, 26]],
  [27, [1, 3, 9, 27]],
  [28, [1, 2, 4, 7, 14, 28]],
  [29, [1, 29]],
  [30, [1, 2, 3, 5, 6, 10, 15, 30]],
]);

export const getIdsList = () => {
  const idsList = readInputFile();
  let duplicates: number[] = [];

  for (const idRange of idsList) {
    const { start, end } = idRange;
    const difference = parseInt(end) - parseInt(start);
    let startIdNumber = parseInt(start);

    if (idRange === idsList[0]) continue
    if (idRange === idsList[1]) continue
    if (idRange === idsList[2]) continue

    if (idRange === idsList[4]) break

    for (let i = 0; i < difference; i++) {
      if (startIdNumber.toString().length % 2 !== 0) {
        startIdNumber++;
        continue;
      }

      duplicates.push(...(checkHasDuplicate(startIdNumber, idRange) || []));
      startIdNumber++;
    }

    // console.log("idRange: ", idRange);
    console.log("--------------------------------");
    console.log("duplicates outside: ", duplicates);
    console.log("--------------------------------");
  }
};

const checkHasDuplicate = (id: number, interval: IdRange) => {
  const duplicates = [];
  const idSize = id.toString().length;

  if (idSize === 1) return;
  if (id < parseInt(interval.start) || id > parseInt(interval.end)) return;

  for (const divider of dividersMap.get(idSize) || []) {
    const idString = id.toString();
    console.log("idString: ", idString);
    // console.log("divider: ", divider);

    const chunks = chunkArray(idString.split(""), divider);
    console.log("idSize: ", idSize);  
    console.log("dividersMap.get(idSize): ", dividersMap.get(idSize));  
    console.log("chunks: ", chunks);
    console.log("divider: ", divider);  

    // if (chunks.length === 1) break;


    // console.log("divider % 2 !== 0: ", divider % 2 !== 0);


    // if (divider % 2 !== 0 && divider !== 1) continue;
    

    const chunksToCompare = chunks.slice(1);
    console.log("chunksToCompare: ", chunksToCompare);

    let areEqual = true;

    for (const chunk of chunksToCompare) {
      console.log("chunk: ", chunk);
      console.log("chunks[0]: ", chunks[0]);
      areEqual = areEqual && compareArrays(chunks[0] ?? [], chunk);
    }

    if (areEqual) {
      console.log("areEqual: ", areEqual);
      duplicates.push(id);
      console.log("--------------------------------");
      console.log("duplicates: ", duplicates);
      console.log("--------------------------------");
      console.log("--------------------------------");
      break;
    }
  }
  return duplicates;
};

const compareArrays = (array1: string[], array2: string[]) => {
  if (array1.length !== array2.length) return false;
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
};

function chunkArray(arr: string[], chunkAmount: number) {
  const chunkedArr = [];
  const chunkSize = Math.floor(arr.length / chunkAmount);
  const remainder = arr.length % chunkAmount;
  
  let currentIndex = 0;
  
  for (let i = 0; i < chunkAmount; i++) {
    // Distribute remainder across first chunks
    const currentChunkSize = chunkSize + (i < remainder ? 1 : 0);
    const chunk = arr.slice(currentIndex, currentIndex + currentChunkSize);
    chunkedArr.push(chunk);
    currentIndex += currentChunkSize;
  }
  
  return chunkedArr;
}
