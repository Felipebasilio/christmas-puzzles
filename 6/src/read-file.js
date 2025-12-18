"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInputFile = void 0;
var fs = require("fs");
var path = require("path");
var formatRow = function (row, isOperation) {
    if (isOperation === void 0) { isOperation = false; }
    return row
        .split(" ")
        .map(function (item) { return item.trim(); })
        .filter(function (item) { return item.length > 0; })
        .map(function (item) { return (isOperation ? item : parseInt(item)); });
};
var readInputFile = function () {
    var _a, _b, _c, _d, _e;
    var rootDir = process.cwd();
    // const filePath = path.join(rootDir, "./data/test.txt");
    var filePath = path.join(rootDir, './data/input.txt');
    var input = fs.readFileSync(filePath, "utf8");
    var operationsData = input.split("\n").map(function (line) { return line.trim(); });
    var firstRow = formatRow((_a = operationsData[0]) !== null && _a !== void 0 ? _a : "");
    var secondRow = formatRow((_b = operationsData[1]) !== null && _b !== void 0 ? _b : "");
    var thirdRow = formatRow((_c = operationsData[2]) !== null && _c !== void 0 ? _c : "");
    var fourthRow = formatRow((_d = operationsData[3]) !== null && _d !== void 0 ? _d : "");
    var operationsRow = formatRow((_e = operationsData[4]) !== null && _e !== void 0 ? _e : "", true);
    return { firstRow: firstRow, secondRow: secondRow, thirdRow: thirdRow, fourthRow: fourthRow, operationsRow: operationsRow };
};
exports.readInputFile = readInputFile;
