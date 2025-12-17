"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdsList = void 0;
var read_file_1 = require("./read-file");
var dividersMap = new Map([
    [2, [2]],
    [3, [3]],
    [4, [2, 4]],
    [5, [5]],
    [6, [2, 3, 6]],
    [7, [7]],
    [8, [2, 4, 8]],
    [9, [3, 9]],
    [10, [2, 5, 10]],
    [11, [11]],
    [12, [2, 3, 4, 6, 12]],
    [13, [13]],
    [14, [2, 7, 14]],
    [15, [3, 5, 15]],
    [16, [2, 4, 8, 16]],
    [17, [17]],
    [18, [2, 3, 6, 9, 18]],
    [19, [19]],
    [20, [2, 4, 5, 10, 20]],
    [21, [3, 7, 21]],
    [22, [2, 11, 22]],
    [23, [23]],
    [24, [2, 3, 4, 6, 8, 12, 24]],
    [25, [5, 25]],
    [26, [2, 13, 26]],
    [27, [3, 9, 27]],
    [28, [2, 4, 7, 14, 28]],
    [29, [29]],
    [30, [2, 3, 5, 6, 10, 15, 30]],
]);
var getIdsList = function () {
    var _a;
    var idsList = (0, read_file_1.readInputFile)();
    var duplicates = [];
    for (var _i = 0, idsList_1 = idsList; _i < idsList_1.length; _i++) {
        var idRange = idsList_1[_i];
        var _b = idRange, start = _b.start, end = _b.end;
        var difference = parseInt(end) - parseInt(start);
        var startIdNumber = parseInt(start);
        for (var i = 0; i <= difference; i++) {
            var hasDuplicate = false;
            for (var _c = 0, _d = (_a = dividersMap.get(startIdNumber.toString().length)) !== null && _a !== void 0 ? _a : []; _c < _d.length; _c++) {
                var divider = _d[_c];
                if (checkHasNthDuplicate(startIdNumber.toString(), divider)) {
                    hasDuplicate = true;
                    duplicates.push(startIdNumber);
                    console.log("duplicates: ", duplicates);
                    break;
                }
            }
            // if (hasDuplicate) {
            //   duplicates.push(startIdNumber);
            //   console.log("duplicates: ", duplicates);
            // }
            startIdNumber++;
        }
    }
    return duplicates;
};
exports.getIdsList = getIdsList;
var checkHasNthDuplicate = function (id, n) {
    var idLength = id.length;
    if (idLength === 1)
        return false;
    var partsArray = Array.from({ length: n }, function (_, i) {
        return id.slice(i * (idLength / n), (i + 1) * (idLength / n));
    });
    console.log("partsArray: ", partsArray);
    return partsArray.every(function (part) { return part === partsArray[0] && part.length === partsArray[0].length; });
};
