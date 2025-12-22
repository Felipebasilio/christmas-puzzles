"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partTwo = exports.partOne = void 0;
var read_file_1 = require("./read-file");
var countPathsToOutMemoized = function (currentDevice, graph, memo) {
    if (memo.has(currentDevice)) {
        return memo.get(currentDevice);
    }
    if (currentDevice === "out") {
        return 1;
    }
    var outputs = graph.get(currentDevice);
    if (!outputs || outputs.length === 0) {
        memo.set(currentDevice, 0);
        return 0;
    }
    var totalPaths = 0;
    for (var _i = 0, outputs_1 = outputs; _i < outputs_1.length; _i++) {
        var nextDevice = outputs_1[_i];
        totalPaths += countPathsToOutMemoized(nextDevice, graph, memo);
    }
    memo.set(currentDevice, totalPaths);
    return totalPaths;
};
var partOne = function () {
    var graph = (0, read_file_1.readInputFile)().graph;
    var memo = new Map();
    return countPathsToOutMemoized("you", graph, memo);
};
exports.partOne = partOne;
var countPathsWithRequiredDevicesMemoized = function (currentDevice, graph, visitedDac, visitedFft, memo) {
    var nowVisitedDac = visitedDac || currentDevice === "dac";
    var nowVisitedFft = visitedFft || currentDevice === "fft";
    var memoKey = "".concat(currentDevice, "|").concat(nowVisitedDac, "|").concat(nowVisitedFft);
    if (memo.has(memoKey)) {
        return memo.get(memoKey);
    }
    if (currentDevice === "out") {
        var result = (nowVisitedDac && nowVisitedFft) ? 1 : 0;
        memo.set(memoKey, result);
        return result;
    }
    var outputs = graph.get(currentDevice);
    if (!outputs || outputs.length === 0) {
        memo.set(memoKey, 0);
        return 0;
    }
    var totalPaths = 0;
    for (var _i = 0, outputs_2 = outputs; _i < outputs_2.length; _i++) {
        var nextDevice = outputs_2[_i];
        totalPaths += countPathsWithRequiredDevicesMemoized(nextDevice, graph, nowVisitedDac, nowVisitedFft, memo);
    }
    memo.set(memoKey, totalPaths);
    return totalPaths;
};
var partTwo = function () {
    var graph = (0, read_file_1.readInputFile)().graph;
    var memo = new Map();
    return countPathsWithRequiredDevicesMemoized("svr", graph, false,
    false,
    memo);
};
exports.partTwo = partTwo;
