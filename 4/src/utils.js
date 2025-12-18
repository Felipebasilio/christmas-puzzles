"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countTotalRemovableRolls = exports.countAccessibleRolls = void 0;
var read_file_1 = require("./read-file");
var directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
];
var countAccessibleRolls = function () {
    var _a;
    var grid = (0, read_file_1.readInputFile)();
    var accessibleCount = 0;
    var rows = grid.length;
    var cols = ((_a = grid[0]) === null || _a === void 0 ? void 0 : _a.length) || 0;
    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            if (grid[row][col] === '@') {
                var neighborRollCount = 0;
                for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
                    var _b = directions_1[_i], dr = _b[0], dc = _b[1];
                    var newRow = row + dr;
                    var newCol = col + dc;
                    if (newRow >= 0 &&
                        newRow < rows &&
                        newCol >= 0 &&
                        newCol < cols &&
                        grid[newRow][newCol] === '@') {
                        neighborRollCount++;
                    }
                }
                if (neighborRollCount < 4) {
                    accessibleCount++;
                }
            }
        }
    }
    return accessibleCount;
};
exports.countAccessibleRolls = countAccessibleRolls;
var countTotalRemovableRolls = function () {
    var _a;
    var inputGrid = (0, read_file_1.readInputFile)();
    var rows = inputGrid.length;
    var cols = ((_a = inputGrid[0]) === null || _a === void 0 ? void 0 : _a.length) || 0;
    var grid = inputGrid.map(function (row) { return row.split(''); });
    var totalRemoved = 0;
    while (true) {
        var rollsToRemove = [];
        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
                if (grid[row][col] === '@') {
                    var neighborRollCount = 0;
                    for (var _i = 0, directions_2 = directions; _i < directions_2.length; _i++) {
                        var _b = directions_2[_i], dr = _b[0], dc = _b[1];
                        var newRow = row + dr;
                        var newCol = col + dc;
                        if (newRow >= 0 &&
                            newRow < rows &&
                            newCol >= 0 &&
                            newCol < cols &&
                            grid[newRow][newCol] === '@') {
                            neighborRollCount++;
                        }
                    }
                    if (neighborRollCount < 4) {
                        rollsToRemove.push([row, col]);
                    }
                }
            }
        }
        if (rollsToRemove.length === 0) {
            break;
        }
        for (var _c = 0, rollsToRemove_1 = rollsToRemove; _c < rollsToRemove_1.length; _c++) {
            var _d = rollsToRemove_1[_c], row = _d[0], col = _d[1];
            grid[row][col] = '.';
            totalRemoved++;
        }
    }
    return totalRemoved;
};
exports.countTotalRemovableRolls = countTotalRemovableRolls;
