import * as fs from "fs";
import * as path from "path";

export interface Machine {
  numLights: number;
  target: boolean[];
  buttons: number[][];
  joltageTargets: number[];
}

export interface IMachineData {
  machines: Machine[];
}

const parseIndicatorLightPattern = (patternString: string): boolean[] => {
  return patternString.split('').map(character => character === '#');
};

const parseButtonAffectedIndices = (buttonString: string): number[] => {
  if (buttonString.trim() === '') return [];
  return buttonString.split(',').map(s => parseInt(s.trim(), 10));
};

const parseJoltageRequirements = (joltageString: string): number[] => {
  if (!joltageString || joltageString.trim() === '') return [];
  return joltageString.split(',').map(s => parseInt(s.trim(), 10));
};

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
