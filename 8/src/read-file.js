"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInputFile = void 0;
var fs = require("fs");
var path = require("path");
var readInputFile = function () {
    var rootDir = process.cwd();
    // const filePath = path.join(rootDir, "./data/test.txt");
    var filePath = path.join(rootDir, "./data/input.txt");
    var input = fs.readFileSync(filePath, "utf8");
    var lines = input.split("\n").filter(function (line) { return line.trim() !== ""; });
    var junctionBoxes = lines.map(function (line, index) {
        var _a = line.split(",").map(Number), x = _a[0], y = _a[1], z = _a[2];
        return { x: x, y: y, z: z, index: index };
    });
    return {
        junctionBoxes: junctionBoxes,
    };
};
exports.readInputFile = readInputFile;
