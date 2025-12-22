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
/**
 * Parses a single line of input into a device and its outputs.
 *
 * Input format: "deviceName: output1 output2 output3"
 * Example: "you: bbb ccc" → { device: "you", outputs: ["bbb", "ccc"] }
 *
 * @param line - A single line from the input file
 * @returns The device name and its list of output connections
 */
var parseDeviceLine = function (line) {
    var _a = line.split(":"), devicePart = _a[0], outputsPart = _a[1];
    var device = devicePart.trim();
    var outputs = outputsPart
        .trim()
        .split(/\s+/) // Split by whitespace (one or more spaces)
        .filter(function (output) { return output.length > 0; }); // Remove empty strings
    return { device: device, outputs: outputs };
};
/**
 * Reads the input file and builds a directed graph of device connections.
 *
 * Each line in the input has the format:
 *   deviceName: output1 output2 output3
 *
 * This means "deviceName" has outputs leading to "output1", "output2", etc.
 * Data flows from a device through its outputs (one-way).
 *
 * @returns The device network as an adjacency list
 */
var readInputFile = function () {
    var rootDir = process.cwd();
    // const filePath = path.join(rootDir, "./data/test.txt");
    var filePath = path.join(rootDir, "./data/input.txt");
    var input = fs.readFileSync(filePath, "utf8");
    var lines = input.split("\n").filter(function (line) { return line.trim() !== ""; });
    // Build the adjacency list
    var graph = new Map();
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var _a = parseDeviceLine(line), device = _a.device, outputs = _a.outputs;
        graph.set(device, outputs);
    }
    return { graph: graph };
};
exports.readInputFile = readInputFile;
