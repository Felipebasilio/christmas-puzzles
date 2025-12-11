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
    var newIndex = currentIndex;
    var direction = rotation.direction, amount = rotation.amount;
    var numberoOfTimesZeroWasHit = 0;
    for (var i = 0; i < amount; i++) {
        if (direction === Direction.LEFT)
            newIndex--;
        else
            newIndex++;
        if (newIndex < 0)
            newIndex += arraySize;
        if (newIndex >= arraySize)
            newIndex -= arraySize;
        if (newIndex === 0) {
            numberoOfTimesZeroWasHit++;
            console.log("hit zero");
            console.log({ newIndex: newIndex, numberoOfTimesZeroWasHit: numberoOfTimesZeroWasHit, direction: direction, amount: amount });
        }
    }
    return { newIndex: newIndex, numberoOfTimesZeroWasHit: numberoOfTimesZeroWasHit };
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
        }), newIndex = _a.newIndex, numberoOfTimesZeroWasHit = _a.numberoOfTimesZeroWasHit;
        currentIndex = newIndex;
        numberOfZeroes += numberoOfTimesZeroWasHit;
    }
    return numberOfZeroes;
};
exports.getAmountOfTimesZeroIsHit = getAmountOfTimesZeroIsHit;
