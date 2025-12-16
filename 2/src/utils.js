"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdsList = void 0;
var read_file_1 = require("./read-file");
var dividersMap = new Map([
    [1, [1]],
    [2, [1, 2]],
    [3, [1, 3]],
    [4, [1, 2, 4]],
    [5, [1, 5]],
    [6, [1, 2, 3, 6]],
    [7, [1, 7]],
    [8, [1, 2, 4, 8]],
    [9, [1, 3, 9]],
    [10, [1, 2, 5, 10]],
    [11, [1, 11]],
    [12, [1, 2, 3, 4, 6, 12]],
    [13, [1, 13]],
    [14, [1, 2, 7, 14]],
    [15, [1, 3, 5, 15]],
    [16, [1, 2, 4, 8, 16]],
    [17, [1, 17]],
    [18, [1, 2, 3, 6, 9, 18]],
    [19, [1, 19]],
    [20, [1, 2, 4, 5, 10, 20]],
    [21, [1, 3, 7, 21]],
    [22, [1, 2, 11, 22]],
    [23, [1, 23]],
    [24, [1, 2, 3, 4, 6, 8, 12, 24]],
    [25, [1, 5, 25]],
    [26, [1, 2, 13, 26]],
    [27, [1, 3, 9, 27]],
    [28, [1, 2, 4, 7, 14, 28]],
    [29, [1, 29]],
    [30, [1, 2, 3, 5, 6, 10, 15, 30]],
]);
var getIdsList = function () {
    var idsList = (0, read_file_1.readInputFile)();
    var duplicates = [];
    for (var _i = 0, idsList_1 = idsList; _i < idsList_1.length; _i++) {
        var idRange = idsList_1[_i];
        var start = idRange.start, end = idRange.end;
        var difference = parseInt(end) - parseInt(start);
        var startIdNumber = parseInt(start);
        if (idRange === idsList[0])
            continue;
        if (idRange === idsList[1])
            continue;
        if (idRange === idsList[2])
            continue;
        if (idRange === idsList[4])
            break;
        for (var i = 0; i < difference; i++) {
            if (startIdNumber.toString().length % 2 !== 0) {
                startIdNumber++;
                continue;
            }
            duplicates.push.apply(duplicates, (checkHasDuplicate(startIdNumber, idRange) || []));
            startIdNumber++;
        }
        // console.log("idRange: ", idRange);
        console.log("--------------------------------");
        console.log("duplicates outside: ", duplicates);
        console.log("--------------------------------");
    }
};
exports.getIdsList = getIdsList;
var checkHasDuplicate = function (id, interval) {
    var _a;
    var duplicates = [];
    var idSize = id.toString().length;
    if (idSize === 1)
        return;
    if (id < parseInt(interval.start) || id > parseInt(interval.end))
        return;
    for (var _i = 0, _b = dividersMap.get(idSize) || []; _i < _b.length; _i++) {
        var divider = _b[_i];
        var idString = id.toString();
        console.log("idString: ", idString);
        // console.log("divider: ", divider);
        var chunks = chunkArray(idString.split(""), divider);
        console.log("idSize: ", idSize);
        console.log("dividersMap.get(idSize): ", dividersMap.get(idSize));
        console.log("chunks: ", chunks);
        console.log("divider: ", divider);
        // if (chunks.length === 1) break;
        // console.log("divider % 2 !== 0: ", divider % 2 !== 0);
        // if (divider % 2 !== 0 && divider !== 1) continue;
        var chunksToCompare = chunks.slice(1);
        console.log("chunksToCompare: ", chunksToCompare);
        var areEqual = true;
        for (var _c = 0, chunksToCompare_1 = chunksToCompare; _c < chunksToCompare_1.length; _c++) {
            var chunk = chunksToCompare_1[_c];
            console.log("chunk: ", chunk);
            console.log("chunks[0]: ", chunks[0]);
            areEqual = areEqual && compareArrays((_a = chunks[0]) !== null && _a !== void 0 ? _a : [], chunk);
        }
        if (areEqual) {
            console.log("areEqual: ", areEqual);
            duplicates.push(id);
            console.log("--------------------------------");
            console.log("duplicates: ", duplicates);
            console.log("--------------------------------");
            console.log("--------------------------------");
            break;
        }
    }
    return duplicates;
};
var compareArrays = function (array1, array2) {
    if (array1.length !== array2.length)
        return false;
    for (var i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i])
            return false;
    }
    return true;
};
function chunkArray(arr, chunkAmount) {
    var chunkedArr = [];
    var chunkSize = Math.floor(arr.length / chunkAmount);
    var remainder = arr.length % chunkAmount;
    var currentIndex = 0;
    for (var i = 0; i < chunkAmount; i++) {
        // Distribute remainder across first chunks
        var currentChunkSize = chunkSize + (i < remainder ? 1 : 0);
        var chunk = arr.slice(currentIndex, currentIndex + currentChunkSize);
        chunkedArr.push(chunk);
        currentIndex += currentChunkSize;
    }
    return chunkedArr;
}
