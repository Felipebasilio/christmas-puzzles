import { readInputFile, Machine } from "./read-file";

const solver = require("javascript-lp-solver");

/**
 * Finds the minimum number of button presses needed to configure indicator lights.
 * 
 * KEY INSIGHT: Pressing a button toggles lights (ON↔OFF), which is XOR.
 * Pressing the same button twice cancels out, so each button is pressed 0 or 1 times.
 * With n buttons, there are exactly 2^n combinations to try.
 * 
 * ALGORITHM: Brute-force all 2^n combinations using bitmasks.
 * 
 * @param machine - The machine to solve
 * @returns The minimum number of button presses required
 */
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

/**
 * Solves Part One: Sum of minimum presses for all machines' indicator lights.
 */
export const partOne = (): number => {
  const { machines } = readInputFile();

  let totalPresses = 0;
  for (const machine of machines) {
    const minPresses = findMinPressesForIndicatorLights(machine);
    totalPresses += minPresses;
  }

  return totalPresses;
};

/**
 * Part Two is fundamentally different from Part One:
 * 
 * Part One: Buttons TOGGLE lights (XOR). Press twice = cancel out. Each button: 0 or 1 times.
 * Part Two: Buttons INCREMENT counters (+1). No cancellation. Each button: 0, 1, 2, 3, ... times.
 * 
 * This is an Integer Linear Programming (ILP) problem:
 * 
 * OBJECTIVE: Minimize total button presses
 *   minimize: x₀ + x₁ + x₂ + ... (where xᵢ = times button i is pressed)
 * 
 * CONSTRAINTS: Each counter must reach its target value
 *   Counter 0: (sum of xᵢ for all buttons affecting counter 0) = target[0]
 *   Counter 1: (sum of xᵢ for all buttons affecting counter 1) = target[1]
 *   etc.
 * 
 * EXAMPLE:
 *   Machine: (0,2) (0,1) with targets {3, 5, 4, 7}
 *   
 *   Buttons:
 *     x₀ = times we press button (0,2) - affects counters 0 and 2
 *     x₁ = times we press button (0,1) - affects counters 0 and 1
 *   
 *   Constraints:
 *     Counter 0: x₀ + x₁ = 3       (both buttons affect counter 0)
 *     Counter 1: x₁ = 5             (only button 1 affects counter 1)
 *     Counter 2: x₀ = 4             (only button 0 affects counter 2)
 *     Counter 3: 0 = 7              (no buttons affect counter 3 - impossible!)
 */

/**
 * Builds the Linear Programming model for a single machine.
 * 
 * The model is a JavaScript object that the LP solver understands:
 * {
 *   optimize: "total_presses",  // What we want to minimize
 *   opType: "min",              // Minimize (not maximize)
 *   constraints: {
 *     counter0: { equal: 3 },   // Counter 0 must equal 3
 *     counter1: { equal: 5 },   // Counter 1 must equal 5
 *     ...
 *   },
 *   variables: {
 *     button0: { total_presses: 1, counter0: 1, counter2: 1 },  // Button 0 affects counters 0 and 2
 *     button1: { total_presses: 1, counter0: 1, counter1: 1 },  // Button 1 affects counters 0 and 1
 *     ...
 *   },
 *   ints: {
 *     button0: 1,  // Button 0 presses must be an integer
 *     button1: 1,  // Button 1 presses must be an integer
 *     ...
 *   }
 * }
 */
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

/**
 * Finds the minimum number of button presses needed for joltage configuration.
 * Uses Integer Linear Programming to solve the optimization problem.
 * 
 * @param machine - The machine to solve
 * @returns The minimum number of button presses, or 0 if no solution exists
 */
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

/**
 * Solves Part Two: Sum of minimum presses for all machines' joltage counters.
 */
export const partTwo = (): number => {
  const { machines } = readInputFile();

  let totalPresses = 0;
  for (const machine of machines) {
    const minPresses = findMinPressesForJoltageCounters(machine);
    totalPresses += minPresses;
  }

  return totalPresses;
};
