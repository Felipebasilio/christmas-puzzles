"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInputFile = void 0;
var fs = require("fs");
var path = require("path");
var readInputFile = function () {
    var rootDir = process.cwd();
    var filePath = path.join(rootDir, "./data/test.txt");
    // const filePath = path.join(rootDir, './data/input.txt');
    var input = fs.readFileSync(filePath, "utf8");
    var _a = input.split(" "), freshIdsLists = _a[0], availableIds = _a[1];
    console.log("freshIdsLists: ", freshIdsLists);
    console.log("availableIds: ", availableIds);
    return [];
};
exports.readInputFile = readInputFile;
