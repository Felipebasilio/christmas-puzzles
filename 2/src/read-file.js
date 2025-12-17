"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInputFile = void 0;
var fs = require("fs");
var path = require("path");
var readInputFile = function () {
    var rootDir = process.cwd();
    // const filePath = path.join(rootDir, "./data/test.txt");
    var filePath = path.join(rootDir, './data/input.txt');
    // const filePath = path.join(rootDir, './data/input2.txt');
    var input = fs.readFileSync(filePath, "utf8");
    var lines = input.split(",").map(function (line) { return line.trim(); });
    return lines.map(function (line) {
        var _a = line.split("-"), start = _a[0], end = _a[1];
        return { start: String(start), end: String(end) };
    });
};
exports.readInputFile = readInputFile;
