"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInputFile = void 0;
var fs = require("fs");
var path = require("path");
var readInputFile = function () {
    var _a;
    var rootDir = process.cwd();
    // const filePath = path.join(rootDir, "./data/test.txt");
    var filePath = path.join(rootDir, "./data/input.txt");
    var input = fs.readFileSync(filePath, "utf8");
    var lines = input.split("\n").map(function (line) { return line; });
    var operationsRow = (_a = lines[lines.length - 1]) !== null && _a !== void 0 ? _a : "";
    var rows = lines.slice(0, lines.length - 1);
    return {
        rows: rows,
        operationsRow: operationsRow,
    };
};
exports.readInputFile = readInputFile;
