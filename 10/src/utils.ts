import { readInputFile, Machine } from "./read-file";

const findMinPresses = (machine: Machine): number => {
  const { numLights, target, buttons } = machine;
  const numButtons = buttons.length;

  const targetBitmask = target.reduce((acc, on, i) => on ? acc | (1 << i) : acc, 0);

  let minPresses = Infinity;

  for (let mask = 0; mask < (1 << numButtons); mask++) {
    let state = 0;
    let presses = 0;

    for (let b = 0; b < numButtons; b++) {
      if (mask & (1 << b)) {
        presses++;
        for (const lightIndex of buttons[b]!) {
          state ^= (1 << lightIndex);
        }
      }
    }

    if (state === targetBitmask) {
      minPresses = Math.min(minPresses, presses);
    }
  }

  return minPresses === Infinity ? 0 : minPresses;
};

export const partOne = (): number => {
  const { machines } = readInputFile();

  let totalPresses = 0;
  for (const machine of machines) {
    const minPresses = findMinPresses(machine);
    totalPresses += minPresses;
  }

  return totalPresses;
};
