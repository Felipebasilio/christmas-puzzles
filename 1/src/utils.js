"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAmountOfTimesZeroIsHit = exports.Rotate = exports.Direction = void 0;
var read_file_1 = require("./read-file");
var Direction;
(function (Direction) {
    Direction["LEFT"] = "left";
    Direction["RIGHT"] = "right";
})(Direction || (exports.Direction = Direction = {}));
var arraySize = 100;
var upperCondition = function (_a) {
    var currentIndex = _a.currentIndex, amount = _a.amount, direction = _a.direction;
    var isDirectionIncreasing = direction === Direction.RIGHT;
    var isCrossingZeroOnce = currentIndex + amount > 100 && amount < 100;
    return isDirectionIncreasing && isCrossingZeroOnce;
};
var lowerCondition = function (_a) {
    var currentIndex = _a.currentIndex, amount = _a.amount, direction = _a.direction;
    if (currentIndex === 0)
        return false;
    var isDirectionDecreasing = direction === Direction.LEFT;
    var isCrossingZeroOnce = currentIndex < amount && amount < 100;
    return isDirectionDecreasing && isCrossingZeroOnce;
};
var Rotate = function (_a) {
    var currentIndex = _a.currentIndex, rotation = _a.rotation;
    var direction = rotation.direction, amount = rotation.amount;
    var numberoOfTimesZeroWasHit = 0;
    var newIndex = currentIndex;
    var numberOfZeroHitsNonFullRotation = 0;
    if (direction === Direction.LEFT) {
        // Hits zero but not a full rotation
        if (lowerCondition({ currentIndex: currentIndex, amount: amount, direction: direction }))
            numberOfZeroHitsNonFullRotation++;
        newIndex = currentIndex - amount;
        while (newIndex < 0) {
            newIndex += arraySize;
            if (newIndex < 0) {
                numberoOfTimesZeroWasHit++;
            }
        }
        // console.log({dir: 'left', numberoOfTimesZeroWasHit, numberOfZeroHitsNonFullRotation });
        var numberOfZeroHitsOnClick_1 = numberoOfTimesZeroWasHit + numberOfZeroHitsNonFullRotation;
        return { newIndex: newIndex, numberOfZeroHitsOnClick: numberOfZeroHitsOnClick_1 };
    }
    if (upperCondition({ currentIndex: currentIndex, amount: amount, direction: direction }))
        numberOfZeroHitsNonFullRotation++;
    newIndex = currentIndex + amount;
    while (newIndex >= arraySize) {
        newIndex -= arraySize;
        if (newIndex >= arraySize) {
            numberoOfTimesZeroWasHit++;
        }
    }
    // console.log({dir: 'right', numberoOfTimesZeroWasHit, numberOfZeroHitsNonFullRotation });
    var numberOfZeroHitsOnClick = numberoOfTimesZeroWasHit + numberOfZeroHitsNonFullRotation;
    return { newIndex: newIndex, numberOfZeroHitsOnClick: numberOfZeroHitsOnClick };
};
exports.Rotate = Rotate;
var getAmountOfTimesZeroIsHit = function () {
    var initialValue = 50;
    var rotations = (0, read_file_1.readInputFile)();
    var numberOfZeroes = 0;
    var currentIndex = initialValue;
    for (var _i = 0, rotations_1 = rotations; _i < rotations_1.length; _i++) {
        var rotation = rotations_1[_i];
        var _a = (0, exports.Rotate)({
            currentIndex: currentIndex,
            rotation: rotation,
        }), newIndex = _a.newIndex, numberOfZeroHitsOnClick = _a.numberOfZeroHitsOnClick;
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
exports.getAmountOfTimesZeroIsHit = getAmountOfTimesZeroIsHit;
