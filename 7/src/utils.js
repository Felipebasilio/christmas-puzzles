"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimelineCount = exports.getBeamSplitCount = void 0;
var read_file_1 = require("./read-file");
var getBeamSplitCount = function () {
    var _a, _b, _c, _d, _e;
    var grid = (0, read_file_1.readInputFile)().grid;
    var startRow = -1;
    var startCol = -1;
    for (var row = 0; row < grid.length; row++) {
        var col = (_b = (_a = grid[row]) === null || _a === void 0 ? void 0 : _a.indexOf('S')) !== null && _b !== void 0 ? _b : -1;
        if (col !== -1) {
            startRow = row;
            startCol = col;
            break;
        }
    }
    if (startRow === -1 || startCol === -1) {
        throw new Error("Starting position S not found");
    }
    var splitCount = 0;
    var beamQueue = [{ row: startRow, col: startCol }];
    var processedBeams = new Set();
    var hitSplitters = new Set();
    while (beamQueue.length > 0) {
        var beam = beamQueue.shift();
        var beamKey = "".concat(beam.row, ",").concat(beam.col);
        if (processedBeams.has(beamKey)) {
            continue;
        }
        processedBeams.add(beamKey);
        var currentRow = beam.row;
        var currentCol = beam.col;
        currentRow++;
        while (currentRow < grid.length) {
            var cell = (_c = grid[currentRow]) === null || _c === void 0 ? void 0 : _c[currentCol];
            if (cell === '^') {
                var splitterKey = "".concat(currentRow, ",").concat(currentCol);
                if (!hitSplitters.has(splitterKey)) {
                    splitCount++;
                    hitSplitters.add(splitterKey);
                }
                if (currentCol > 0) {
                    var leftBeamKey = "".concat(currentRow, ",").concat(currentCol - 1);
                    if (!processedBeams.has(leftBeamKey)) {
                        beamQueue.push({ row: currentRow, col: currentCol - 1 });
                    }
                }
                if (currentCol < ((_e = (_d = grid[currentRow]) === null || _d === void 0 ? void 0 : _d.length) !== null && _e !== void 0 ? _e : 0) - 1) {
                    var rightBeamKey = "".concat(currentRow, ",").concat(currentCol + 1);
                    if (!processedBeams.has(rightBeamKey)) {
                        beamQueue.push({ row: currentRow, col: currentCol + 1 });
                    }
                }
                break;
            }
            else if (cell === '.' || cell === undefined || cell === ' ') {
                currentRow++;
            }
            else {
                break;
            }
        }
    }
    return splitCount;
};
exports.getBeamSplitCount = getBeamSplitCount;
var getTimelineCount = function () {
    var _a, _b;
    var grid = (0, read_file_1.readInputFile)().grid;
    var startRow = -1;
    var startCol = -1;
    for (var row = 0; row < grid.length; row++) {
        var col = (_b = (_a = grid[row]) === null || _a === void 0 ? void 0 : _a.indexOf('S')) !== null && _b !== void 0 ? _b : -1;
        if (col !== -1) {
            startRow = row;
            startCol = col;
            break;
        }
    }
    if (startRow === -1 || startCol === -1) {
        throw new Error("Starting position S not found");
    }
    // Memoization: cache the number of paths from each position
    var memo = new Map();
    // Function to count all unique paths (timelines) from a given position
    var countPaths = function (row, col) {
        var _a, _b, _c, _d, _e, _f;
        var key = "".concat(row, ",").concat(col);
        // Check memo
        if (memo.has(key)) {
            return memo.get(key);
        }
        // Check if the starting position itself is a splitter
        var startCell = (_a = grid[row]) === null || _a === void 0 ? void 0 : _a[col];
        if (startCell === '^') {
            // Starting at a splitter - count paths from both left and right
            var pathCount = 0;
            if (col > 0) {
                pathCount += countPaths(row, col - 1);
            }
            if (col < ((_c = (_b = grid[row]) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) - 1) {
                pathCount += countPaths(row, col + 1);
            }
            memo.set(key, pathCount);
            return pathCount;
        }
        var currentRow = row;
        var currentCol = col;
        // Move downward from the next row
        currentRow++;
        while (currentRow < grid.length) {
            var cell = (_d = grid[currentRow]) === null || _d === void 0 ? void 0 : _d[currentCol];
            if (cell === '^') {
                // Hit a splitter - count paths from both left and right
                // Each choice (left or right) creates a new timeline
                var pathCount = 0;
                if (currentCol > 0) {
                    pathCount += countPaths(currentRow, currentCol - 1);
                }
                if (currentCol < ((_f = (_e = grid[currentRow]) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : 0) - 1) {
                    pathCount += countPaths(currentRow, currentCol + 1);
                }
                memo.set(key, pathCount);
                return pathCount;
            }
            else if (cell === '.' || cell === undefined || cell === ' ') {
                // Continue moving downward
                currentRow++;
            }
            else {
                // Hit something unexpected - no valid path
                memo.set(key, 0);
                return 0;
            }
        }
        // Reached the bottom - this is one valid path (timeline)
        memo.set(key, 1);
        return 1;
    };
    return countPaths(startRow, startCol);
};
exports.getTimelineCount = getTimelineCount;
