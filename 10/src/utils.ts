import { readInputFile, Machine } from "./read-file";

const solver = require("javascript-lp-solver");

const findMinPressesForIndicatorLights = (machine: Machine): number => {
  const { target, buttons } = machine;
  const numButtons = buttons.length;

  const targetBitmask = target.reduce(
    (accumulator, isLightOn, lightIndex) => 
      isLightOn ? accumulator | (1 << lightIndex) : accumulator, 
    0
  );

  let minimumPresses = Infinity;

  for (let buttonCombination = 0; buttonCombination < (1 << numButtons); buttonCombination++) {
    let currentLightState = 0;
    let pressCount = 0;

    for (let buttonIndex = 0; buttonIndex < numButtons; buttonIndex++) {
      const isButtonPressed = (buttonCombination & (1 << buttonIndex)) !== 0;
      
      if (isButtonPressed) {
        pressCount++;
        for (const lightIndex of buttons[buttonIndex]!) {
          currentLightState ^= (1 << lightIndex);
        }
      }
    }

    if (currentLightState === targetBitmask) {
      minimumPresses = Math.min(minimumPresses, pressCount);
    }
  }

  return minimumPresses === Infinity ? 0 : minimumPresses;
};

export const partOne = (): number => {
  const { machines } = readInputFile();

  let totalPresses = 0;
  for (const machine of machines) {
    const minPresses = findMinPressesForIndicatorLights(machine);
    totalPresses += minPresses;
  }

  return totalPresses;
};

const buildLinearProgrammingModel = (
  buttons: number[][],
  joltageTargets: number[]
): any => {
  const model: any = {
    optimize: "total_presses",
    opType: "min",
    constraints: {},
    variables: {},
    ints: {}
  };

  joltageTargets.forEach((targetValue, counterIndex) => {
    const constraintName = `counter${counterIndex}`;
    model.constraints[constraintName] = { equal: targetValue };
  });

  buttons.forEach((affectedCounterIndices, buttonIndex) => {
    const variableName = `button${buttonIndex}`;
    
    model.variables[variableName] = { total_presses: 1 };
    model.ints[variableName] = 1;

    affectedCounterIndices.forEach(counterIndex => {
      const constraintName = `counter${counterIndex}`;
      model.variables[variableName][constraintName] = 1;
    });
  });

  return model;
};

const findMinPressesForJoltageCounters = (machine: Machine): number => {
  const { buttons, joltageTargets } = machine;

  if (joltageTargets.length === 0) {
    return 0;
  }

  const model = buildLinearProgrammingModel(buttons, joltageTargets);
  const solution = solver.Solve(model);

  if (!solution.feasible) {
    console.warn("No feasible solution found for machine:", machine);
    return 0;
  }

  return Math.round(solution.result);
};

export const partTwo = (): number => {
  const { machines } = readInputFile();

  let totalPresses = 0;
  for (const machine of machines) {
    const minPresses = findMinPressesForJoltageCounters(machine);
    totalPresses += minPresses;
  }

  return totalPresses;
};
