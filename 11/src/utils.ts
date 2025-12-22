import { readInputFile } from "./read-file";

const countPathsToOutMemoized = (
  currentDevice: string,
  graph: Map<string, string[]>,
  memo: Map<string, number>
): number => {
  if (memo.has(currentDevice)) {
    return memo.get(currentDevice)!;
  }

  if (currentDevice === "out") {
    return 1;
  }

  const outputs = graph.get(currentDevice);

  if (!outputs || outputs.length === 0) {
    memo.set(currentDevice, 0);
    return 0;
  }

  let totalPaths = 0;

  for (const nextDevice of outputs) {
    totalPaths += countPathsToOutMemoized(nextDevice, graph, memo);
  }

  memo.set(currentDevice, totalPaths);
  return totalPaths;
};

export const partOne = (): number => {
  const { graph } = readInputFile();
  const memo = new Map<string, number>();
  return countPathsToOutMemoized("you", graph, memo);
};

const countPathsWithRequiredDevicesMemoized = (
  currentDevice: string,
  graph: Map<string, string[]>,
  visitedDac: boolean,
  visitedFft: boolean,
  memo: Map<string, number>
): number => {
  const nowVisitedDac = visitedDac || currentDevice === "dac";
  const nowVisitedFft = visitedFft || currentDevice === "fft";

  const memoKey = `${currentDevice}|${nowVisitedDac}|${nowVisitedFft}`;
  
  if (memo.has(memoKey)) {
    return memo.get(memoKey)!;
  }

  if (currentDevice === "out") {
    const result = (nowVisitedDac && nowVisitedFft) ? 1 : 0;
    memo.set(memoKey, result);
    return result;
  }

  const outputs = graph.get(currentDevice);

  if (!outputs || outputs.length === 0) {
    memo.set(memoKey, 0);
    return 0;
  }

  let totalPaths = 0;

  for (const nextDevice of outputs) {
    totalPaths += countPathsWithRequiredDevicesMemoized(
      nextDevice,
      graph,
      nowVisitedDac,
      nowVisitedFft,
      memo
    );
  }

  memo.set(memoKey, totalPaths);
  return totalPaths;
};

export const partTwo = (): number => {
  const { graph } = readInputFile();
  const memo = new Map<string, number>();
  
  return countPathsWithRequiredDevicesMemoized(
    "svr",
    graph,
    false,
    false,
    memo
  );
};
