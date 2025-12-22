"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInputFile = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var normalizePoints = function (points) {
    if (points.length === 0)
        return [];
    var minX = Math.min.apply(Math, points.map(function (p) { return p.x; }));
    var minY = Math.min.apply(Math, points.map(function (p) { return p.y; }));
    return points
        .map(function (p) { return ({ x: p.x - minX, y: p.y - minY }); })
        .sort(function (a, b) { return a.y - b.y || a.x - b.x; });
};
var generateAllSymmetries = function (grid) {
    var points = [];
    grid.forEach(function (row, y) {
        row.split('').forEach(function (char, x) {
            if (char === '#') {
                points.push({ x: x, y: y });
            }
        });
    });
    var uniqueSymmetries = new Set();
    var results = [];
    var current = points;
    for (var flip = 0; flip < 2; flip++) {
        for (var rotation = 0; rotation < 4; rotation++) {
            var normalized = normalizePoints(current);
            var key = JSON.stringify(normalized);
            if (!uniqueSymmetries.has(key)) {
                uniqueSymmetries.add(key);
                results.push(normalized);
            }
            current = current.map(function (p) { return ({ x: -p.y, y: p.x }); });
        }
        current = current.map(function (p) { return ({ x: -p.x, y: p.y }); });
    }
    return results;
};
var parseShapes = function (shapeLines) {
    var shapes = [];
    var currentGrid = [];
    for (var _i = 0, shapeLines_1 = shapeLines; _i < shapeLines_1.length; _i++) {
        var line = shapeLines_1[_i];
        if (line.includes(':')) {
            if (currentGrid.length > 0) {
                shapes.push(generateAllSymmetries(currentGrid));
            }
            currentGrid = [];
        }
        else if (line.trim()) {
            currentGrid.push(line.trim());
        }
    }
    if (currentGrid.length > 0) {
        shapes.push(generateAllSymmetries(currentGrid));
    }
    return shapes;
};
var parseRegions = function (regionLines) {
    return regionLines.map(function (line) {
        var _a = line.split(': '), sizePart = _a[0], countsPart = _a[1];
        var _b = sizePart.split('x').map(Number), width = _b[0], height = _b[1];
        var shapeCounts = countsPart.split(' ').map(Number);
        return { width: width, height: height, shapeCounts: shapeCounts };
    });
};
var readInputFile = function () {
    var rootDir = process.cwd();
    var filePath = path.join(rootDir, "./data/input.txt");
    var input = fs.readFileSync(filePath, "utf8");
    var sections = input.trim().split('\n\n');
    var lines = input.trim().split('\n');
    var regionStartIndex = lines.findIndex(function (line) { return /^\d+x\d+:/.test(line); });
    var shapeLines = lines.slice(0, regionStartIndex).filter(function (l) { return l.trim(); });
    var regionLines = lines.slice(regionStartIndex).filter(function (l) { return l.trim(); });
    var shapes = parseShapes(shapeLines);
    var regions = parseRegions(regionLines);
    return { shapes: shapes, regions: regions };
};
exports.readInputFile = readInputFile;
