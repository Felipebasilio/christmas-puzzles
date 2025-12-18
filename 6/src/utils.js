"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAmountOfFreshIngredients = void 0;
var read_file_1 = require("./read-file");
var getAmountOfFreshIngredients = function () {
    var _a = (0, read_file_1.readInputFile)(), firstRow = _a.firstRow, secondRow = _a.secondRow, thirdRow = _a.thirdRow, fourthRow = _a.fourthRow, operationsRow = _a.operationsRow;
    var rowsSize = firstRow.length;
    console.log('firstRow size: ', firstRow.length);
    console.log('secondRow size: ', secondRow.length);
    console.log('thirdRow size: ', thirdRow.length);
    console.log('operationsRow size: ', operationsRow.length);
    var totalSum = 0;
    for (var i = 0; i < rowsSize; i++) {
        console.log('operationsRow[i]: ', operationsRow[i]);
        if (operationsRow[i] == "+") {
            totalSum += firstRow[i] + secondRow[i] + thirdRow[i] + fourthRow[i];
        }
        else if (operationsRow[i] == "*") {
            totalSum += firstRow[i] * secondRow[i] * thirdRow[i] * fourthRow[i];
        }
    }
    return totalSum;
};
exports.getAmountOfFreshIngredients = getAmountOfFreshIngredients;
