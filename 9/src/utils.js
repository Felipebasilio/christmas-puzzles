"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partTwo = exports.partOne = void 0;
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
var buildHorizontalSegments = function (tiles) {
    var segments = [];
    var n = tiles.length;
    for (var i = 0; i < n; i++) {
        var current = tiles[i];
        var next = tiles[(i + 1) % n];
        if (current.y === next.y) {
            segments.push({
                y: current.y,
                x1: Math.min(current.x, next.x),
                x2: Math.max(current.x, next.x)
            });
        }
    }
    return segments;
};
var buildVerticalSegments = function (tiles) {
    var segments = [];
    var n = tiles.length;
    for (var i = 0; i < n; i++) {
        var current = tiles[i];
        var next = tiles[(i + 1) % n];
        if (current.x === next.x) {
            segments.push({
                x: current.x,
                y1: Math.min(current.y, next.y),
                y2: Math.max(current.y, next.y)
            });
        }
    }
    return segments;
};
var isOnEdge = function (x, y, hSegments, vSegments) {
    for (var _i = 0, hSegments_1 = hSegments; _i < hSegments_1.length; _i++) {
        var seg = hSegments_1[_i];
        if (y === seg.y && x >= seg.x1 && x <= seg.x2)
            return true;
    }
    for (var _a = 0, vSegments_1 = vSegments; _a < vSegments_1.length; _a++) {
        var seg = vSegments_1[_a];
        if (x === seg.x && y >= seg.y1 && y <= seg.y2)
            return true;
    }
    return false;
};
var isInsidePolygonFast = function (x, y, vSegments) {
    var crossings = 0;
    for (var _i = 0, vSegments_2 = vSegments; _i < vSegments_2.length; _i++) {
        var seg = vSegments_2[_i];
        if (seg.x > x && y >= seg.y1 && y < seg.y2) {
            crossings++;
        }
    }
    return crossings % 2 === 1;
};
var isPointValid = function (x, y, hSegments, vSegments) {
    return isOnEdge(x, y, hSegments, vSegments) || isInsidePolygonFast(x, y, vSegments);
};
var getValidXRangeForY = function (y, minX, maxX, hSegments, vSegments) {
    var relevantVSegments = vSegments
        .filter(function (seg) { return y >= seg.y1 && y < seg.y2; })
        .map(function (seg) { return seg.x; })
        .sort(function (a, b) { return a - b; });
    var relevantHSegments = hSegments
        .filter(function (seg) { return seg.y === y; })
        .sort(function (a, b) { return a.x1 - b.x1; });
    var leftX = -1;
    var rightX = -1;
    var inside = false;
    for (var i = 0; i < relevantVSegments.length; i++) {
        if (inside) {
            if (leftX === -1)
                leftX = relevantVSegments[i - 1];
            rightX = relevantVSegments[i];
        }
        inside = !inside;
    }
    for (var _i = 0, relevantHSegments_1 = relevantHSegments; _i < relevantHSegments_1.length; _i++) {
        var seg = relevantHSegments_1[_i];
        if (leftX === -1 || seg.x1 < leftX)
            leftX = seg.x1;
        if (rightX === -1 || seg.x2 > rightX)
            rightX = seg.x2;
    }
    if (leftX <= minX && rightX >= maxX) {
        return { valid: true, leftX: leftX, rightX: rightX };
    }
    return { valid: false, leftX: leftX, rightX: rightX };
};
var isRectangleFullyInside = function (minX, maxX, minY, maxY, hSegments, vSegments, allYs, allXs) {
    if (!isPointValid(minX, minY, hSegments, vSegments) ||
        !isPointValid(minX, maxY, hSegments, vSegments) ||
        !isPointValid(maxX, minY, hSegments, vSegments) ||
        !isPointValid(maxX, maxY, hSegments, vSegments)) {
        return false;
    }
    for (var _i = 0, allYs_1 = allYs; _i < allYs_1.length; _i++) {
        var y = allYs_1[_i];
        if (y > minY && y < maxY) {
            if (!isPointValid(minX, y, hSegments, vSegments) ||
                !isPointValid(maxX, y, hSegments, vSegments)) {
                return false;
            }
        }
    }
    for (var _a = 0, allXs_1 = allXs; _a < allXs_1.length; _a++) {
        var x = allXs_1[_a];
        if (x > minX && x < maxX) {
            if (!isPointValid(x, minY, hSegments, vSegments) ||
                !isPointValid(x, maxY, hSegments, vSegments)) {
                return false;
            }
        }
    }
    var midX = Math.floor((minX + maxX) / 2);
    var midY = Math.floor((minY + maxY) / 2);
    if (!isPointValid(midX, midY, hSegments, vSegments)) {
        return false;
    }
    return true;
};
var partTwo = function () {
    var tiles = (0, read_file_1.readInputFile)().tiles;
    var n = tiles.length;
    var hSegments = buildHorizontalSegments(tiles);
    var vSegments = buildVerticalSegments(tiles);
    var allYs = Array.from(new Set(tiles.map(function (t) { return t.y; }))).sort(function (a, b) { return a - b; });
    var allXs = Array.from(new Set(tiles.map(function (t) { return t.x; }))).sort(function (a, b) { return a - b; });
    var pairs = [];
    for (var i = 0; i < n; i++) {
        for (var j = i + 1; j < n; j++) {
            var area = calculateRectangleArea(tiles[i], tiles[j]);
            pairs.push({ i: i, j: j, area: area });
        }
    }
    pairs.sort(function (a, b) { return b.area - a.area; });
    for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
        var pair = pairs_1[_i];
        var a = tiles[pair.i];
        var b = tiles[pair.j];
        var minX = Math.min(a.x, b.x);
        var maxX = Math.max(a.x, b.x);
        var minY = Math.min(a.y, b.y);
        var maxY = Math.max(a.y, b.y);
        if (isRectangleFullyInside(minX, maxX, minY, maxY, hSegments, vSegments, allYs, allXs)) {
            return pair.area;
        }
    }
    return 0;
};
exports.partTwo = partTwo;
