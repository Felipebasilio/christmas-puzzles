"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBeamSplitCount = void 0;
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
