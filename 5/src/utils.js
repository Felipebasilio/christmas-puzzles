"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAmountOfFreshIngredients = void 0;
var read_file_1 = require("./read-file");
var getAmountOfFreshIngredients = function () {
    var _a = (0, read_file_1.readInputFile)(), freshIdsLists = _a[0], availableIds = _a[1];
    var amountOfFreshIngredients = 0;
    // Instead of storing all numbers in a Set (which would exceed Set size limits),
    // we check if each available ID falls within any of the ranges
    for (var _i = 0, _b = availableIds !== null && availableIds !== void 0 ? availableIds : []; _i < _b.length; _i++) {
        var availableId = _b[_i];
        for (var _c = 0, _d = freshIdsLists !== null && freshIdsLists !== void 0 ? freshIdsLists : []; _c < _d.length; _c++) {
            var freshIdsList = _d[_c];
            var start = freshIdsList[0], end = freshIdsList[1];
            // Check if availableId is within the range [start, end] (inclusive)
            if (availableId >= start && availableId <= end) {
                amountOfFreshIngredients++;
                break; // Found in a range, no need to check other ranges
            }
        }
    }
    return amountOfFreshIngredients;
};
exports.getAmountOfFreshIngredients = getAmountOfFreshIngredients;
