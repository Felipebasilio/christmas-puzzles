import * as fs from "fs";
import * as path from "path";

export const readInputFile = (): [bigint[][], bigint[]] => {
  const rootDir = process.cwd();
  // const filePath = path.join(rootDir, "./data/test.txt");
  const filePath = path.join(rootDir, './data/input.txt');
  const input = fs.readFileSync(filePath, "utf8");

  let [freshIdsLists, availableIds] = input.split(" ");

  const freshIdsListsFormatted = freshIdsLists
    ?.split("\n")
    .map((item) => item.split("-"))
    .map((item) => item.map((item) => BigInt(item)))

  freshIdsListsFormatted?.pop();

  const availableIdsFormatted = availableIds
    ?.split("\n")
    .map((item) => BigInt(item));

  availableIdsFormatted?.shift();

  return [freshIdsListsFormatted ?? [], availableIdsFormatted ?? []];
};
