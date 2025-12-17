"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBatteriesJoltages = void 0;
var read_file_1 = require("./read-file");
var getBatteriesJoltages = function () {
    var banks = (0, read_file_1.readInputFile)();
    var batteryJoltagesArray = [];
    for (var _i = 0, banks_1 = banks; _i < banks_1.length; _i++) {
        var bank = banks_1[_i];
        var batteryJoltage = getBiggest12DigitNumber(bank);
        batteryJoltagesArray.push(batteryJoltage);
    }
    return batteryJoltagesArray;
};
exports.getBatteriesJoltages = getBatteriesJoltages;
var getBiggest12DigitNumber = function (bank) {
    var maxJoltage = "";
    var startIndex = 0;
    for (var position = 0; position < 12; position++) {
        var digitsNeeded = 12 - position - 1;
        var maxSearchIndex = bank.length - digitsNeeded - 1;
        var bestDigit = "";
        var bestIndex = -1;
        for (var digit = 9; digit >= 1; digit--) {
            var digitStr = digit.toString();
            var index = bank.indexOf(digitStr, startIndex);
            if (index !== -1 && index <= maxSearchIndex) {
                bestDigit = digitStr;
                bestIndex = index;
                break;
            }
        }
        if (bestIndex === -1) {
            break;
        }
        maxJoltage += bestDigit;
        startIndex = bestIndex + 1;
    }
    return maxJoltage;
};
