"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInputFile = void 0;
var fs = require("fs");
var path = require("path");
var readInputFile = function () {
    var rootDir = process.cwd();
    // const filePath = path.join(rootDir, "./data/test.txt");
    var filePath = path.join(rootDir, './data/input.txt');
    var input = fs.readFileSync(filePath, "utf8");
    var _a = input.split(" "), freshIdsLists = _a[0], availableIds = _a[1];
    var freshIdsListsFormatted = freshIdsLists === null || freshIdsLists === void 0 ? void 0 : freshIdsLists.split("\n").map(function (item) { return item.split("-"); }).map(function (item) { return item.map(function (item) { return BigInt(item); }); });
    freshIdsListsFormatted === null || freshIdsListsFormatted === void 0 ? void 0 : freshIdsListsFormatted.pop();
    var availableIdsFormatted = availableIds === null || availableIds === void 0 ? void 0 : availableIds.split("\n").map(function (item) { return BigInt(item); });
    availableIdsFormatted === null || availableIdsFormatted === void 0 ? void 0 : availableIdsFormatted.shift();
    return [freshIdsListsFormatted !== null && freshIdsListsFormatted !== void 0 ? freshIdsListsFormatted : [], availableIdsFormatted !== null && availableIdsFormatted !== void 0 ? availableIdsFormatted : []];
};
exports.readInputFile = readInputFile;
