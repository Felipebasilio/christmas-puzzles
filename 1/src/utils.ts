import { readInputFile } from "./read-file";

export enum Direction {
  LEFT = "left",
  RIGHT = "right",
}

export interface IRotation {
  direction: Direction;
  amount: number;
}

type RotateProps = {
  currentIndex: number;
  rotation: IRotation;
};

const arraySize = 100;

interface IZeroHitConditionOnClick {
  currentIndex: number;
  amount: number;
  direction: Direction;
}

const upperCondition = ({
  currentIndex,
  amount,
  direction,
}: IZeroHitConditionOnClick) => {
  const isDirectionIncreasing = direction === Direction.RIGHT;
  const isCrossingZeroOnce = currentIndex + amount > 100 && amount < 100;
  return isDirectionIncreasing && isCrossingZeroOnce;
};

const lowerCondition = ({
  currentIndex,
  amount,
  direction,
}: IZeroHitConditionOnClick) => {
  if (currentIndex === 0) return false;
  const isDirectionDecreasing = direction === Direction.LEFT;
  const isCrossingZeroOnce = currentIndex < amount && amount < 100;
  return isDirectionDecreasing && isCrossingZeroOnce;
};

export const Rotate = ({ currentIndex, rotation }: RotateProps) => {
  const { direction, amount } = rotation;
  let numberoOfTimesZeroWasHit = 0;
  let newIndex = currentIndex;
  let numberOfZeroHitsNonFullRotation = 0;
  
  if (direction === Direction.LEFT) {
    
    // Hits zero but not a full rotation
    if (lowerCondition({ currentIndex, amount, direction })) numberOfZeroHitsNonFullRotation++;

    newIndex = currentIndex - amount;
    while (newIndex < 0) {
      newIndex += arraySize;

      if (newIndex < 0) {
        numberoOfTimesZeroWasHit++;
      }
    }

    // console.log({dir: 'left', numberoOfTimesZeroWasHit, numberOfZeroHitsNonFullRotation });

    const numberOfZeroHitsOnClick =
      numberoOfTimesZeroWasHit + numberOfZeroHitsNonFullRotation;

    return { newIndex, numberOfZeroHitsOnClick };
  }

  if (upperCondition({ currentIndex, amount, direction })) numberOfZeroHitsNonFullRotation++;

  newIndex = currentIndex + amount;
  while (newIndex >= arraySize) {
    newIndex -= arraySize;

    if (newIndex >= arraySize) {
      numberoOfTimesZeroWasHit++;
    }
  }

  // console.log({dir: 'right', numberoOfTimesZeroWasHit, numberOfZeroHitsNonFullRotation });

  const numberOfZeroHitsOnClick =
    numberoOfTimesZeroWasHit + numberOfZeroHitsNonFullRotation;

  return { newIndex, numberOfZeroHitsOnClick };
};

export const getAmountOfTimesZeroIsHit = () => {
  const initialValue = 50;
  const rotations = readInputFile();
  let numberOfZeroes = 0;

  let currentIndex = initialValue;
  for (const rotation of rotations) {
    const { newIndex, numberOfZeroHitsOnClick } = Rotate({
      currentIndex,
      rotation,
    });

    currentIndex = newIndex;

    if (currentIndex === 0) {
      //ends at zero
      numberOfZeroes++;
    }

    // console.log({ numberOfZeroes, numberOfZeroHitsOnClick });

    numberOfZeroes += numberOfZeroHitsOnClick;
  }
  return numberOfZeroes;
};
