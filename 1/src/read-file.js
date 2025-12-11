"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInputFile = void 0;
var utils_1 = require("./utils");
var fs = require("fs");
var path = require("path");
var readInputFile = function () {
    var rootDir = process.cwd();
    // const filePath = path.join(rootDir, "./data/test.txt");
    // const filePath = path.join(rootDir, './data/input.txt');
    var filePath = path.join(rootDir, './data/input2.txt');
    var input = fs.readFileSync(filePath, "utf8");
    var lines = input.split("\n").map(function (line) { return line.trim(); });
    return lines.map(function (line) {
        var direction = line[0] == "L" ? utils_1.Direction.LEFT : utils_1.Direction.RIGHT;
        var amount = line.slice(1);
        return { direction: direction, amount: parseInt(amount) };
    });
};
exports.readInputFile = readInputFile;
