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
    var _a = (0, read_file_1.readInputFile)(), freshIdsLists = _a[0], _availableIds = _a[1];
    if (!freshIdsLists || freshIdsLists.length === 0) {
        return 0;
    }
    // Filter out invalid intervals and ensure both start and end are defined
    var validIntervals = freshIdsLists.filter(function (interval) {
        return interval.length === 2 && interval[0] !== undefined && interval[1] !== undefined;
    });
    if (validIntervals.length === 0) {
        return 0;
    }
    // Sort intervals by start value
    var sortedIntervals = __spreadArray([], validIntervals, true).sort(function (a, b) {
        if (a[0] < b[0])
            return -1;
        if (a[0] > b[0])
            return 1;
        return 0;
    });
    // Merge overlapping intervals
    var mergedIntervals = [];
    var currentInterval = sortedIntervals[0];
    for (var i = 1; i < sortedIntervals.length; i++) {
        var nextInterval = sortedIntervals[i];
        var currentStart = currentInterval[0], currentEnd = currentInterval[1];
        var nextStart = nextInterval[0], nextEnd = nextInterval[1];
        // Check if intervals overlap or are adjacent
        // Intervals overlap if: nextStart <= currentEnd + 1
        if (nextStart <= currentEnd + BigInt(1)) {
            // Merge: extend current interval to include the next one
            currentInterval = [currentStart, currentEnd > nextEnd ? currentEnd : nextEnd];
        }
        else {
            // No overlap: save current interval and start a new one
            mergedIntervals.push(currentInterval);
            currentInterval = nextInterval;
        }
    }
    // Don't forget to add the last interval
    mergedIntervals.push(currentInterval);
    // Calculate total count of unique IDs across all merged intervals
    var totalCount = 0;
    for (var _i = 0, mergedIntervals_1 = mergedIntervals; _i < mergedIntervals_1.length; _i++) {
        var _b = mergedIntervals_1[_i], start = _b[0], end = _b[1];
        // Count = end - start + 1 (inclusive range)
        totalCount += Number(end - start + BigInt(1));
    }
    return totalCount;
};
exports.getAmountOfFreshIngredients = getAmountOfFreshIngredients;
