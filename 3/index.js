"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./src/utils");
var result = (0, utils_1.getBatteriesJoltages)().reduce(function (acc, curr) { return acc + BigInt(curr); }, BigInt(0));
console.log(result.toString());
