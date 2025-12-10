"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = exports.readInputFile = exports.Rotate = exports.Direction = void 0;
var fs = require("fs");
var path = require("path");
var Direction;
(function (Direction) {
    Direction["LEFT"] = "left";
    Direction["RIGHT"] = "right";
})(Direction || (exports.Direction = Direction = {}));
var arraySize = 100;
var Rotate = function (_a) {
    var currentIndex = _a.currentIndex, rotation = _a.rotation;
    var direction = rotation.direction, amount = rotation.amount;
    if (direction === Direction.LEFT) {
        var newIndex_1 = currentIndex - amount;
        while (newIndex_1 < 0) {
            console.log({ currentIndex: currentIndex, amount: amount, newIndex: newIndex_1 });
            newIndex_1 += arraySize;
        }
        return newIndex_1;
    }
    var newIndex = currentIndex + amount;
    while (newIndex >= arraySize) {
        console.log({ currentIndex: currentIndex, amount: amount, newIndex: newIndex });
        newIndex -= arraySize;
    }
    return newIndex;
};
exports.Rotate = Rotate;
var readInputFile = function () {
    var rootDir = process.cwd();
    var filePath = path.join(rootDir, "input2.txt");
    // const filePath = path.join(rootDir, 'input.txt');
    var input = fs.readFileSync(filePath, "utf8");
    var lines = input.split("\n").map(function (line) { return line.trim(); });
    return lines.map(function (line) {
        var direction = line[0] == "L" ? Direction.LEFT : Direction.RIGHT;
        var amount = line.slice(1);
        return { direction: direction, amount: parseInt(amount) };
    });
};
exports.readInputFile = readInputFile;
var getValue = function () {
    var initialValue = 50;
    var rotations = (0, exports.readInputFile)();
    var numberOfZeroes = 0;
    var currentIndex = initialValue;
    for (var _i = 0, rotations_1 = rotations; _i < rotations_1.length; _i++) {
        var rotation = rotations_1[_i];
        debugger;
        currentIndex = (0, exports.Rotate)({ currentIndex: currentIndex, rotation: rotation });
        if (currentIndex === 0) {
            numberOfZeroes++;
            // console.log({rotation, currentIndex, numberOfZeroes});
        }
    }
    return numberOfZeroes;
};
exports.getValue = getValue;
