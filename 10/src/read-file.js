"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInputFile = void 0;
var fs = require("fs");
var path = require("path");
var parseTarget = function (targetStr) {
    return targetStr.split('').map(function (c) { return c === '#'; });
};
var parseButton = function (buttonStr) {
    if (buttonStr.trim() === '')
        return [];
    return buttonStr.split(',').map(function (s) { return parseInt(s.trim(), 10); });
};
var readInputFile = function () {
    var rootDir = process.cwd();
    // const filePath = path.join(rootDir, "./data/test.txt");
    var filePath = path.join(rootDir, "./data/input.txt");
    var input = fs.readFileSync(filePath, "utf8");
    var lines = input.split("\n").filter(function (line) { return line.trim() !== ""; });
    var machines = lines.map(function (line) {
        var targetMatch = line.match(/\[([.#]+)\]/);
        if (!targetMatch)
            throw new Error("Invalid line: ".concat(line));
        var targetStr = targetMatch[1];
        var target = parseTarget(targetStr);
        var numLights = target.length;
        var buttonsSection = line.substring(line.indexOf(']') + 1);
        var joltageStart = buttonsSection.indexOf('{');
        var buttonsStr = joltageStart >= 0
            ? buttonsSection.substring(0, joltageStart)
            : buttonsSection;
        var buttonMatches = buttonsStr.match(/\(([^)]*)\)/g) || [];
        var buttons = buttonMatches.map(function (match) {
            var content = match.slice(1, -1);
            return parseButton(content);
        });
        return { numLights: numLights, target: target, buttons: buttons };
    });
    return { machines: machines };
};
exports.readInputFile = readInputFile;
