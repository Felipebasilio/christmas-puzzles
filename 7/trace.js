"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var grid = fs.readFileSync(path.join(__dirname, "./data/test.txt"), "utf8")
    .split("\n")
    .filter(function (line) { return line.trim() !== ""; });
// Find S
var startRow = -1;
var startCol = -1;
for (var row = 0; row < grid.length; row++) {
    var col = grid[row].indexOf('S');
    if (col !== -1) {
        startRow = row;
        startCol = col;
        break;
    }
}
var splitCount = 0;
var hitSplitters = new Set();
var beamQueue = [{ row: startRow, col: startCol }];
var processedBeams = new Set();
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
        var cell = (_a = grid[currentRow]) === null || _a === void 0 ? void 0 : _a[currentCol];
        if (cell === '^') {
            var splitterKey = "".concat(currentRow, ",").concat(currentCol);
            hitSplitters.add(splitterKey);
            splitCount++;
            console.log("Split ".concat(splitCount, " at (").concat(currentRow, ", ").concat(currentCol, ")"));
            if (currentCol > 0) {
                var leftBeamKey = "".concat(currentRow, ",").concat(currentCol - 1);
                if (!processedBeams.has(leftBeamKey)) {
                    beamQueue.push({ row: currentRow, col: currentCol - 1 });
                }
            }
            if (currentCol < grid[currentRow].length - 1) {
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
console.log("\nTotal splits: ".concat(splitCount));
console.log("Hit splitters: ".concat(hitSplitters.size));
console.log("All splitters:");
for (var row = 0; row < grid.length; row++) {
    for (var col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === '^') {
            var key = "".concat(row, ",").concat(col);
            var hit = hitSplitters.has(key) ? '✓' : '✗';
            console.log("  ".concat(hit, " (").concat(row, ", ").concat(col, ")"));
        }
    }
}
