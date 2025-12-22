import * as fs from "fs";
import * as path from "path";

/**
 * Represents a single machine with its configuration data.
 * 
 * For Part 1 (Indicator Lights):
 *   - numLights: How many indicator lights the machine has
 *   - target: Which lights need to be ON (true) or OFF (false)
 *   - buttons: Each button is an array of light indices it toggles
 * 
 * For Part 2 (Joltage Counters):
 *   - joltageTargets: The target value for each joltage counter
 *   - buttons: Each button is an array of counter indices it increments by 1
 */
export interface Machine {
  numLights: number;
  target: boolean[];
  buttons: number[][];
  joltageTargets: number[];
}

export interface IMachineData {
  machines: Machine[];
}

/**
 * Converts a string like ".##." into an array of booleans.
 * '.' means OFF (false), '#' means ON (true).
 * 
 * Example: ".##." → [false, true, true, false]
 */
const parseIndicatorLightPattern = (patternString: string): boolean[] => {
  return patternString.split('').map(character => character === '#');
};

/**
 * Converts a comma-separated string of numbers into an array of integers.
 * These represent which lights/counters a button affects.
 * 
 * Example: "0,2,3" → [0, 2, 3]
 * Example: "" → []
 */
const parseButtonAffectedIndices = (buttonString: string): number[] => {
  if (buttonString.trim() === '') return [];
  return buttonString.split(',').map(s => parseInt(s.trim(), 10));
};

/**
 * Converts a comma-separated string of joltage requirements into an array.
 * 
 * Example: "3,5,4,7" → [3, 5, 4, 7]
 */
const parseJoltageRequirements = (joltageString: string): number[] => {
  if (!joltageString || joltageString.trim() === '') return [];
  return joltageString.split(',').map(s => parseInt(s.trim(), 10));
};

/**
 * Reads and parses the input file containing machine configurations.
 * 
 * Each line has the format:
 *   [.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
 *   
 *   - [.##.] = Indicator light pattern (Part 1)
 *   - (3), (1,3), etc. = Button wiring schematics
 *   - {3,5,4,7} = Joltage requirements (Part 2)
 */
export const readInputFile = (): IMachineData => {
  const rootDir = process.cwd();
  const filePath = path.join(rootDir, "./data/input.txt");
  const input = fs.readFileSync(filePath, "utf8");

  const lines: string[] = input.split("\n").filter((line) => line.trim() !== "");

  const machines: Machine[] = lines.map((line) => {
    const indicatorMatch = line.match(/\[([.#]+)\]/);
    if (!indicatorMatch) throw new Error(`Invalid line (no indicator pattern): ${line}`);
    
    const indicatorPatternString = indicatorMatch[1];
    const target = parseIndicatorLightPattern(indicatorPatternString);
    const numLights = target.length;

    const joltageMatch = line.match(/\{([^}]+)\}/);
    const joltageTargets = joltageMatch 
      ? parseJoltageRequirements(joltageMatch[1]) 
      : [];

    const afterIndicator = line.substring(line.indexOf(']') + 1);
    const joltageStart = afterIndicator.indexOf('{');
    const buttonsSection = joltageStart >= 0 
      ? afterIndicator.substring(0, joltageStart) 
      : afterIndicator;

    const buttonMatches = buttonsSection.match(/\(([^)]*)\)/g) || [];
    const buttons = buttonMatches.map(match => {
      const content = match.slice(1, -1);
      return parseButtonAffectedIndices(content);
    });

    return { numLights, target, buttons, joltageTargets };
  });

  return { machines };
};
