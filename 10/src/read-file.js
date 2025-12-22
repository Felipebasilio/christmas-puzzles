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
var parseIndicatorLightPattern = function (patternString) {
    return patternString.split('').map(function (character) {         return character === '#'; });
};
var parseButtonAffectedIndices = function (buttonString) {
    if (buttonString.trim() === '')
        return [];
        return buttonString.split(',').map(function (s) { return parseInt(s.trim(), 10); });
};
var parseJoltageRequirements = function (joltageString) {
    if (!joltageString || joltageString.trim() === '')
        return [];
        return joltageString.split(',').map(function (s) { return parseInt(s.trim(), 10); });
};
var readInputFile = function () {
    var rootDir = process.cwd();
    var filePath = path.join(rootDir, "./data/input.txt");
    var input = fs.readFileSync(filePath, "utf8");
    var lines = input.split("\n").filter(function (line) { return line.trim() !== ""; });
    var machines = lines.map(function (line) {
        var indicatorMatch = line.match(/\[([.#]+)\]/);
        if (!indicatorMatch)
            throw new Error("Invalid line (no indicator pattern): ".concat(line));
        var indicatorPatternString = indicatorMatch[1];
        var target = parseIndicatorLightPattern(indicatorPatternString);
        var numLights = target.length;
        var joltageMatch = line.match(/\{([^}]+)\}/);
        var joltageTargets = joltageMatch
            ? parseJoltageRequirements(joltageMatch[1])
            : [];
        var afterIndicator = line.substring(line.indexOf(']') + 1);
        var joltageStart = afterIndicator.indexOf('{');
        var buttonsSection = joltageStart >= 0
            ? afterIndicator.substring(0, joltageStart)
            : afterIndicator;
        var buttonMatches = buttonsSection.match(/\(([^)]*)\)/g) || [];
        var buttons = buttonMatches.map(function (match) {
            var content = match.slice(1, -1);
            return parseButtonAffectedIndices(content);
        });
        return { numLights: numLights, target: target, buttons: buttons, joltageTargets: joltageTargets };
    });
    return { machines: machines };
};
exports.readInputFile = readInputFile;
