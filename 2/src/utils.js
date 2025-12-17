"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdsList = void 0;
var read_file_1 = require("./read-file");
var getIdsList = function () {
    var idsList = (0, read_file_1.readInputFile)();
    var duplicates = [];
    for (var _i = 0, idsList_1 = idsList; _i < idsList_1.length; _i++) {
        var idRange = idsList_1[_i];
        var _a = idRange, start = _a.start, end = _a.end;
        var difference = parseInt(end) - parseInt(start);
        var startIdNumber = parseInt(start);
        for (var i = 0; i <= difference; i++) {
            var hasDuplicate = checkHasDuplicate(startIdNumber.toString());
            if (hasDuplicate) {
                duplicates.push(startIdNumber);
                console.log("duplicates: ", duplicates);
            }
            startIdNumber++;
        }
    }
    return duplicates;
};
exports.getIdsList = getIdsList;
var checkHasDuplicate = function (id) {
    var idLength = id.length;
    if (idLength % 2 !== 0 || idLength === 1)
        return false;
    var partOne = id.slice(0, idLength / 2);
    var partTwo = id.slice(idLength / 2);
    if (partOne === partTwo) {
        return true;
    }
    return false;
};
