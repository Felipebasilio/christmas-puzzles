"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAmountOfFreshIngredients = void 0;
var read_file_1 = require("./read-file");
var getAmountOfFreshIngredients = function () {
    var _a;
    var _b = (0, read_file_1.readInputFile)(), rows = _b.rows, operationsRow = _b.operationsRow;
    var maxWidth = Math.max.apply(Math, __spreadArray(__spreadArray([], rows.map(function (row) { return row.length; }), false), [operationsRow.length], false));
    var paddedRows = rows.map(function (row) { return row.padEnd(maxWidth, ' '); });
    var paddedOperationsRow = operationsRow.padEnd(maxWidth, ' ');
    var totalSum = 0;
    var isSeparatorColumn = function (col) {
        var _a;
        for (var _i = 0, paddedRows_2 = paddedRows; _i < paddedRows_2.length; _i++) {
            var row = paddedRows_2[_i];
            if (row[col] && row[col] !== ' ') {
                return false;
            }
        }
        var opChar = (_a = paddedOperationsRow[col]) === null || _a === void 0 ? void 0 : _a.trim();
        if (opChar && opChar !== '') {
            return false;
        }
        return true;
    };
    var col = maxWidth - 1;
    while (col >= 0) {
        if (isSeparatorColumn(col)) {
            col--;
            continue;
        }
        var operationCol = col;
        var operation = '';
        for (var c = col; c >= 0; c--) {
            if (isSeparatorColumn(c)) {
                break;
            }
            var opChar = (_a = paddedOperationsRow[c]) === null || _a === void 0 ? void 0 : _a.trim();
            if (opChar === '+' || opChar === '*') {
                operation = opChar;
                operationCol = c;
                break;
            }
        }
        if (operation === '+' || operation === '*') {
            var problemEnd = col;
            var problemStart = operationCol;
            while (problemStart > 0 && !isSeparatorColumn(problemStart - 1)) {
                problemStart--;
            }
            var numbers = [];
            for (var numCol = problemEnd; numCol >= problemStart; numCol--) {
                var numberStr = '';
                for (var _i = 0, paddedRows_1 = paddedRows; _i < paddedRows_1.length; _i++) {
                    var row = paddedRows_1[_i];
                    var char = row[numCol];
                    if (char && char !== ' ') {
                        numberStr += char;
                    }
                }
                if (numberStr.length > 0) {
                    numbers.push(parseInt(numberStr, 10));
                }
            }
            if (numbers.length > 0) {
                var result = void 0;
                if (operation === '+') {
                    result = numbers.reduce(function (acc, curr) { return acc + curr; }, 0);
                }
                else {
                    result = numbers.reduce(function (acc, curr) { return acc * curr; }, 1);
                }
                totalSum += result;
            }
            col = problemStart - 1;
        }
        else {
            col--;
        }
    }
    return totalSum;
};
exports.getAmountOfFreshIngredients = getAmountOfFreshIngredients;
