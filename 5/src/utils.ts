import { readInputFile } from "./read-file";


export const getAmountOfFreshIngredients = (): number => {
  const [freshIdsLists, availableIds] = readInputFile();
  let amountOfFreshIngredients = 0;

  for (const availableId of availableIds ?? []) {
    for (const freshIdsList of freshIdsLists ?? []) {
      const [start, end] = freshIdsList;
      if (availableId >= start! && availableId <= end!) {
        amountOfFreshIngredients++;
        break;
      }
    }
  }

  return amountOfFreshIngredients;
};

