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
  let newIndex = currentIndex;
  let { direction, amount } = rotation;
  let numberoOfTimesZeroWasHit = 0;

  for (let i = 0; i < amount; i++) {
    if (direction === Direction.LEFT) newIndex--;
    else newIndex++;

    if (newIndex < 0) newIndex += arraySize;

    if (newIndex >= arraySize) newIndex -= arraySize;

    if (newIndex === 0) {
      numberoOfTimesZeroWasHit++;
      console.log("hit zero");
      console.log({ newIndex, numberoOfTimesZeroWasHit, direction, amount });
    }
  }

  return { newIndex, numberoOfTimesZeroWasHit };
};

export const getAmountOfTimesZeroIsHit = () => {
  const initialValue = 50;
  const rotations = readInputFile();

  let numberOfZeroes = 0;
  let currentIndex = initialValue;
  for (const rotation of rotations) {
    const { newIndex, numberoOfTimesZeroWasHit } = Rotate({
      currentIndex,
      rotation,
    });
    currentIndex = newIndex;
    numberOfZeroes += numberoOfTimesZeroWasHit;
  }
  return numberOfZeroes;
};
