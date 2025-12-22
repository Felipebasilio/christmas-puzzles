import * as fs from "fs";
import * as path from "path";

export interface Machine {
  numLights: number;
  target: boolean[];
  buttons: number[][];
}

export interface IMachineData {
  machines: Machine[];
}

const parseTarget = (targetStr: string): boolean[] => {
  return targetStr.split('').map(c => c === '#');
};

const parseButton = (buttonStr: string): number[] => {
  if (buttonStr.trim() === '') return [];
  return buttonStr.split(',').map(s => parseInt(s.trim(), 10));
};

export const readInputFile = (): IMachineData => {
  const rootDir = process.cwd();
  // const filePath = path.join(rootDir, "./data/test.txt");
  const filePath = path.join(rootDir, "./data/input.txt");
  const input = fs.readFileSync(filePath, "utf8");

  const lines: string[] = input.split("\n").filter((line) => line.trim() !== "");

  const machines: Machine[] = lines.map((line) => {
    const targetMatch = line.match(/\[([.#]+)\]/);
    if (!targetMatch) throw new Error(`Invalid line: ${line}`);
    const targetStr = targetMatch[1];
    const target = parseTarget(targetStr);
    const numLights = target.length;

    const buttonsSection = line.substring(line.indexOf(']') + 1);
    const joltageStart = buttonsSection.indexOf('{');
    const buttonsStr = joltageStart >= 0 
      ? buttonsSection.substring(0, joltageStart) 
      : buttonsSection;

    const buttonMatches = buttonsStr.match(/\(([^)]*)\)/g) || [];
    const buttons = buttonMatches.map(match => {
      const content = match.slice(1, -1);
      return parseButton(content);
    });

    return { numLights, target, buttons };
  });

  return { machines };
};
