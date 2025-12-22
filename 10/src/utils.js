"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partOne = void 0;
var read_file_1 = require("./read-file");
var findMinPresses = function (machine) {
    var numLights = machine.numLights, target = machine.target, buttons = machine.buttons;
    var numButtons = buttons.length;
    var targetBitmask = target.reduce(function (acc, on, i) { return on ? acc | (1 << i) : acc; }, 0);
    var minPresses = Infinity;
    for (var mask = 0; mask < (1 << numButtons); mask++) {
        var state = 0;
        var presses = 0;
        for (var b = 0; b < numButtons; b++) {
            if (mask & (1 << b)) {
                presses++;
                for (var _i = 0, _a = buttons[b]; _i < _a.length; _i++) {
                    var lightIndex = _a[_i];
                    state ^= (1 << lightIndex);
                }
            }
        }
        if (state === targetBitmask) {
            minPresses = Math.min(minPresses, presses);
        }
    }
    return minPresses === Infinity ? 0 : minPresses;
};
var partOne = function () {
    var machines = (0, read_file_1.readInputFile)().machines;
    var totalPresses = 0;
    for (var _i = 0, machines_1 = machines; _i < machines_1.length; _i++) {
        var machine = machines_1[_i];
        var minPresses = findMinPresses(machine);
        totalPresses += minPresses;
    }
    return totalPresses;
};
exports.partOne = partOne;
