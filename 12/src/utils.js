"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partOne = void 0;
var read_file_1 = require("./read-file");
var canPlaceShape = function (grid, width, height, points, ox, oy) {
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var p = points_1[_i];
        var nx = ox + p.x;
        var ny = oy + p.y;
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
            return false;
        }
        if (grid[ny][nx]) {
            return false;
        }
    }
    return true;
};
var toggleShape = function (grid, points, ox, oy, value) {
    for (var _i = 0, points_2 = points; _i < points_2.length; _i++) {
        var p = points_2[_i];
        grid[oy + p.y][ox + p.x] = value;
    }
};
var findFirstEmptyCell = function (grid, width, height) {
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            if (!grid[y][x]) {
                return { x: x, y: y };
            }
        }
    }
    return null;
};
var backtrack = function (grid, width, height, shapes, remainingShapeIndices, shapeIdx) {
    if (shapeIdx >= remainingShapeIndices.length) {
        return true;
    }
    var emptyCell = findFirstEmptyCell(grid, width, height);
    if (!emptyCell) {
        return false;
    }
    var emptyX = emptyCell.x, emptyY = emptyCell.y;
    var currentShapeIndex = remainingShapeIndices[shapeIdx];
    var shapeSymmetries = shapes[currentShapeIndex];
    for (var _i = 0, shapeSymmetries_1 = shapeSymmetries; _i < shapeSymmetries_1.length; _i++) {
        var symmetry = shapeSymmetries_1[_i];
        for (var _a = 0, symmetry_1 = symmetry; _a < symmetry_1.length; _a++) {
            var offset = symmetry_1[_a];
            var startX = emptyX - offset.x;
            var startY = emptyY - offset.y;
            if (canPlaceShape(grid, width, height, symmetry, startX, startY)) {
                toggleShape(grid, symmetry, startX, startY, true);
                if (backtrack(grid, width, height, shapes, remainingShapeIndices, shapeIdx + 1)) {
                    return true;
                }
                toggleShape(grid, symmetry, startX, startY, false);
            }
        }
    }
    grid[emptyY][emptyX] = true;
    var result = backtrack(grid, width, height, shapes, remainingShapeIndices, shapeIdx);
    grid[emptyY][emptyX] = false;
    return result;
};
var canFitRegion = function (shapes, region) {
    var width = region.width, height = region.height, shapeCounts = region.shapeCounts;
    var requiredShapes = [];
    shapeCounts.forEach(function (qty, shapeIdx) {
        for (var i = 0; i < qty; i++) {
            requiredShapes.push(shapeIdx);
        }
    });
    var totalShapeArea = 0;
    for (var _i = 0, requiredShapes_1 = requiredShapes; _i < requiredShapes_1.length; _i++) {
        var shapeIdx = requiredShapes_1[_i];
        totalShapeArea += shapes[shapeIdx][0].length;
    }
    if (totalShapeArea > width * height) {
        return false;
    }
    var grid = Array.from({ length: height }, function () { return new Array(width).fill(false); });
    return backtrack(grid, width, height, shapes, requiredShapes, 0);
};
var partOne = function () {
    var _a = (0, read_file_1.readInputFile)(), shapes = _a.shapes, regions = _a.regions;
    var validCount = 0;
    for (var i = 0; i < regions.length; i++) {
        var region = regions[i];
        if (canFitRegion(shapes, region)) {
            validCount++;
        }
        if ((i + 1) % 100 === 0) {
            console.log("Processed ".concat(i + 1, "/").concat(regions.length, " regions..."));
        }
    }
    return validCount;
};
exports.partOne = partOne;
