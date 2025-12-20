"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partOneTest = exports.partOne = exports.getCircuitProduct = void 0;
var read_file_1 = require("./read-file");
var calculateDistance = function (a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    var dz = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
};
var UnionFind = /** @class */ (function () {
    function UnionFind(n) {
        this.parent = Array.from({ length: n }, function (_, i) { return i; });
        this.rank = Array(n).fill(0);
        this.size = Array(n).fill(1);
    }
    UnionFind.prototype.find = function (x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    };
    UnionFind.prototype.union = function (x, y) {
        var rootX = this.find(x);
        var rootY = this.find(y);
        if (rootX === rootY) {
            return false;
        }
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
            this.size[rootY] += this.size[rootX];
        }
        else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
            this.size[rootX] += this.size[rootY];
        }
        else {
            this.parent[rootY] = rootX;
            this.size[rootX] += this.size[rootY];
            this.rank[rootX]++;
        }
        return true;
    };
    UnionFind.prototype.getCircuitSizes = function () {
        var sizes = new Map();
        for (var i = 0; i < this.parent.length; i++) {
            var root = this.find(i);
            if (!sizes.has(root)) {
                sizes.set(root, this.size[root]);
            }
        }
        return Array.from(sizes.values());
    };
    return UnionFind;
}());
var getCircuitProduct = function (numConnections) {
    var junctionBoxes = (0, read_file_1.readInputFile)().junctionBoxes;
    var n = junctionBoxes.length;
    var pairs = [];
    for (var i = 0; i < n; i++) {
        for (var j = i + 1; j < n; j++) {
            pairs.push({
                boxA: i,
                boxB: j,
                distance: calculateDistance(junctionBoxes[i], junctionBoxes[j]),
            });
        }
    }
    pairs.sort(function (a, b) { return a.distance - b.distance; });
    var uf = new UnionFind(n);
    var connectionsMade = 0;
    for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
        var pair = pairs_1[_i];
        if (connectionsMade >= numConnections) {
            break;
        }
        uf.union(pair.boxA, pair.boxB);
        connectionsMade++;
    }
    var circuitSizes = uf.getCircuitSizes();
    circuitSizes.sort(function (a, b) { return b - a; });
    var top3 = circuitSizes.slice(0, 3);
    return top3.reduce(function (product, size) { return product * size; }, 1);
};
exports.getCircuitProduct = getCircuitProduct;
var partOne = function () {
    return (0, exports.getCircuitProduct)(1000);
};
exports.partOne = partOne;
var partOneTest = function () {
    return (0, exports.getCircuitProduct)(10);
};
exports.partOneTest = partOneTest;
