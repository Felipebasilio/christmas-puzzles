"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInputFile = void 0;
var fs = require("fs");
var path = require("path");
var readInputFile = function () {
    var rootDir = process.cwd();
    // const filePath = path.join(rootDir, "./data/test.txt");
    var filePath = path.join(rootDir, './data/input.txt');
    var input = fs.readFileSync(filePath, "utf8");
    var lines = input.split("\n").map(function (line) { return line.trim(); });
    return lines;
};
exports.readInputFile = readInputFile;
