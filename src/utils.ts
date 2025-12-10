import * as fs from "fs";
import * as path from "path";

export enum Direction {
  LEFT = "left",
  RIGHT = "right",
}

interface IRotation {
  direction: Direction;
  amount: number;
}

type RotateProps = {
  currentIndex: number;
  rotation: IRotation;
};

const arraySize = 100;

export const Rotate = ({ currentIndex, rotation }: RotateProps) => {
  const { direction, amount } = rotation;

  if (direction === Direction.LEFT) {
    let newIndex = currentIndex - amount;
    while (newIndex < 0) {
      console.log({ currentIndex, amount, newIndex });
      newIndex += arraySize;
    }
    return newIndex;
  }

  let newIndex = currentIndex + amount;
  while (newIndex >= arraySize) {
    console.log({ currentIndex, amount, newIndex });
    newIndex -= arraySize;
  }
  return newIndex;
};

export const readInputFile = (): IRotation[] => {
  const rootDir = process.cwd();
  const filePath = path.join(rootDir, "input2.txt");
  // const filePath = path.join(rootDir, 'input.txt');
  const input = fs.readFileSync(filePath, "utf8");

  const lines = input.split("\n").map((line) => line.trim());
  return lines.map((line) => {
    const direction = line[0] == "L" ? Direction.LEFT : Direction.RIGHT;
    const amount = line.slice(1);
    return { direction: direction as Direction, amount: parseInt(amount) };
  });
};

export const getValue = () => {
  const initialValue = 50;
  const rotations = readInputFile();
  let numberOfZeroes = 0;

  let currentIndex = initialValue;
  for (const rotation of rotations) {
    debugger;
    currentIndex = Rotate({ currentIndex, rotation });
    if (currentIndex === 0) {
      numberOfZeroes++;
      // console.log({rotation, currentIndex, numberOfZeroes});
    }
  }
  return numberOfZeroes;
};
