"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partOne = void 0;
var read_file_1 = require("./read-file");
var calculateRectangleArea = function (a, b) {
    var width = Math.abs(a.x - b.x) + 1;
    var height = Math.abs(a.y - b.y) + 1;
    return width * height;
};
var partOne = function () {
    var tiles = (0, read_file_1.readInputFile)().tiles;
    var n = tiles.length;
    var maxArea = 0;
    for (var i = 0; i < n; i++) {
        for (var j = i + 1; j < n; j++) {
            var area = calculateRectangleArea(tiles[i], tiles[j]);
            if (area > maxArea) {
                maxArea = area;
            }
        }
    }
    return maxArea;
};
exports.partOne = partOne;
