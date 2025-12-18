import { readInputFile } from "./read-file";


export const getAmountOfFreshIngredients = (): number => {
  const [freshIdsLists, _availableIds] = readInputFile();
  
  if (!freshIdsLists || freshIdsLists.length === 0) {
    return 0;
  }

  const validIntervals = freshIdsLists.filter(
    (interval): interval is [bigint, bigint] => 
      interval.length === 2 && interval[0] !== undefined && interval[1] !== undefined
  );

  if (validIntervals.length === 0) {
    return 0;
  }

  const sortedIntervals = [...validIntervals].sort((a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
  });

  const mergedIntervals: [bigint, bigint][] = [];
  let currentInterval: [bigint, bigint] = sortedIntervals[0]!;

  for (let i = 1; i < sortedIntervals.length; i++) {
    const nextInterval = sortedIntervals[i]!;
    const [currentStart, currentEnd] = currentInterval;
    const [nextStart, nextEnd] = nextInterval;

    if (nextStart <= currentEnd + BigInt(1)) {
      currentInterval = [currentStart, currentEnd > nextEnd ? currentEnd : nextEnd];
    } else {
      mergedIntervals.push(currentInterval);
      currentInterval = nextInterval;
    }
  }
  mergedIntervals.push(currentInterval);

  let totalCount = 0;
  for (const [start, end] of mergedIntervals) {
    totalCount += Number(end - start + BigInt(1));
  }

  return totalCount;
};

