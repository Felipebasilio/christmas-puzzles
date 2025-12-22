"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partOne = void 0;
var read_file_1 = require("./read-file");
/**
 * Counts all unique paths from a starting device to the target device "out".
 *
 * This uses Depth-First Search (DFS) with recursion:
 * - Base case: If we reach "out", we found 1 complete path
 * - Recursive case: For each output of the current device, count paths from there
 * - Sum up all the paths from all outputs
 *
 * IMPORTANT: We track visited nodes in the current path to avoid infinite loops
 * (in case there are cycles in the graph).
 *
 * @param currentDevice - The device we're currently at
 * @param graph - The adjacency list representing the device network
 * @param visited - Set of devices already visited in the current path
 * @returns The number of unique paths from currentDevice to "out"
 */
var countPathsToOut = function (currentDevice, graph, visited) {
    // Base case: We reached the destination!
    if (currentDevice === "out") {
        return 1;
    }
    // Get the outputs for this device
    var outputs = graph.get(currentDevice);
    // If this device has no outputs defined, it's a dead end
    if (!outputs || outputs.length === 0) {
        return 0;
    }
    // Mark this device as visited (to avoid cycles)
    visited.add(currentDevice);
    var totalPaths = 0;
    // Explore each output connection
    for (var _i = 0, outputs_1 = outputs; _i < outputs_1.length; _i++) {
        var nextDevice = outputs_1[_i];
        // Only visit if not already in current path (avoid infinite loops)
        if (!visited.has(nextDevice)) {
            totalPaths += countPathsToOut(nextDevice, graph, visited);
        }
    }
    // Backtrack: remove from visited so other paths can use this device
    visited.delete(currentDevice);
    return totalPaths;
};
/**
 * Solves Part One: Count all unique paths from "you" to "out".
 *
 * The problem is a classic graph traversal where we need to find ALL paths
 * (not just the shortest) between two nodes in a directed graph.
 *
 * Algorithm: Depth-First Search (DFS) with backtracking
 *
 * Why DFS works well here:
 * - We need to explore ALL possible paths, not find the shortest one
 * - DFS naturally explores one complete path before backtracking
 * - The recursion stack keeps track of the current path
 * - Backtracking allows us to reuse nodes in different paths
 *
 * Time complexity: O(V + E) per path, potentially exponential total
 * Space complexity: O(V) for the recursion stack and visited set
 *
 * @returns The total number of unique paths from "you" to "out"
 */
var partOne = function () {
    var graph = (0, read_file_1.readInputFile)().graph;
    // Start DFS from "you" with an empty visited set
    var visited = new Set();
    var pathCount = countPathsToOut("you", graph, visited);
    return pathCount;
};
exports.partOne = partOne;
