"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partTwo = exports.partOne = void 0;
var read_file_1 = require("./read-file");
var solver = require("javascript-lp-solver");
var findMinPressesForIndicatorLights = function (machine) {
    var target = machine.target, buttons = machine.buttons;
    var numButtons = buttons.length;
    var targetBitmask = target.reduce(function (accumulator, isLightOn, lightIndex) {
        return isLightOn ? accumulator | (1 << lightIndex) : accumulator;
    }, 0);
    var minimumPresses = Infinity;
    for (var buttonCombination = 0; buttonCombination < (1 << numButtons); buttonCombination++) {
        var currentLightState = 0;
        var pressCount = 0;
        for (var buttonIndex = 0; buttonIndex < numButtons; buttonIndex++) {
            var isButtonPressed = (buttonCombination & (1 << buttonIndex)) !== 0;
            if (isButtonPressed) {
                pressCount++;
                for (var _i = 0, _a = buttons[buttonIndex]; _i < _a.length; _i++) {
                    var lightIndex = _a[_i];
                    currentLightState ^= (1 << lightIndex);
                }
            }
        }
        if (currentLightState === targetBitmask) {
            minimumPresses = Math.min(minimumPresses, pressCount);
        }
    }
    return minimumPresses === Infinity ? 0 : minimumPresses;
};
var partOne = function () {
    var machines = (0, read_file_1.readInputFile)().machines;
    var totalPresses = 0;
    for (var _i = 0, machines_1 = machines; _i < machines_1.length; _i++) {
        var machine = machines_1[_i];
        var minPresses = findMinPressesForIndicatorLights(machine);
        totalPresses += minPresses;
    }
    return totalPresses;
};
exports.partOne = partOne;
var buildLinearProgrammingModel = function (buttons, joltageTargets) {
    var model = {
        optimize: "total_presses",
        opType: "min",
        constraints: {},
        variables: {},
        ints: {}
    };
    joltageTargets.forEach(function (targetValue, counterIndex) {
        var constraintName = "counter".concat(counterIndex);
        model.constraints[constraintName] = { equal: targetValue };
    });
    buttons.forEach(function (affectedCounterIndices, buttonIndex) {
        var variableName = "button".concat(buttonIndex);
        model.variables[variableName] = { total_presses: 1 };
        model.ints[variableName] = 1;
        affectedCounterIndices.forEach(function (counterIndex) {
            var constraintName = "counter".concat(counterIndex);
            model.variables[variableName][constraintName] = 1;
        });
    });
    return model;
};
var findMinPressesForJoltageCounters = function (machine) {
    var buttons = machine.buttons, joltageTargets = machine.joltageTargets;
    if (joltageTargets.length === 0) {
        return 0;
    }
    var model = buildLinearProgrammingModel(buttons, joltageTargets);
    var solution = solver.Solve(model);
    if (!solution.feasible) {
        console.warn("No feasible solution found for machine:", machine);
        return 0;
    }
    return Math.round(solution.result);
};
var partTwo = function () {
    var machines = (0, read_file_1.readInputFile)().machines;
    var totalPresses = 0;
    for (var _i = 0, machines_2 = machines; _i < machines_2.length; _i++) {
        var machine = machines_2[_i];
        var minPresses = findMinPressesForJoltageCounters(machine);
        totalPresses += minPresses;
    }
    return totalPresses;
};
exports.partTwo = partTwo;
