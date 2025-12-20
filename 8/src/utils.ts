import { readInputFile, JunctionBox } from "./read-file";

const calculateDistance = (a: JunctionBox, b: JunctionBox): number => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

interface JunctionPair {
  boxA: number;
  boxB: number;
  distance: number;
}

class UnionFind {
  private parent: number[];
  private rank: number[];
  private size: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
    this.size = Array(n).fill(1);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]!);
    }
    return this.parent[x];
  }

  union(x: number, y: number): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) {
      return false;
    }

    if (this.rank[rootX]! < this.rank[rootY]!) {
      this.parent[rootX] = rootY;
      this.size[rootY]! += this.size[rootX]!;
    } else if (this.rank[rootX]! > this.rank[rootY]!) {
      this.parent[rootY] = rootX;
      this.size[rootX]! += this.size[rootY]!;
    } else {
      this.parent[rootY] = rootX;
      this.size[rootX]! += this.size[rootY]!;
      this.rank[rootX]!++;
    }

    return true;
  }

  getCircuitSizes(): number[] {
    const sizes = new Map<number, number>();
    for (let i = 0; i < this.parent.length; i++) {
      const root = this.find(i);
      if (!sizes.has(root)) {
        sizes.set(root, this.size[root]!);
      }
    }
    return Array.from(sizes.values());
  }
}

export const getCircuitProduct = (numConnections: number): number => {
  const { junctionBoxes } = readInputFile();
  const n = junctionBoxes.length;

  const pairs: JunctionPair[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      pairs.push({
        boxA: i,
        boxB: j,
        distance: calculateDistance(junctionBoxes[i]!, junctionBoxes[j]!),
      });
    }
  }

  pairs.sort((a, b) => a.distance - b.distance);

  const uf = new UnionFind(n);

  let connectionsMade = 0;
  for (const pair of pairs) {
    if (connectionsMade >= numConnections) {
      break;
    }
    uf.union(pair.boxA, pair.boxB);
    connectionsMade++;
  }

  const circuitSizes = uf.getCircuitSizes();
  circuitSizes.sort((a, b) => b - a);

  const top3 = circuitSizes.slice(0, 3);
  return top3.reduce((product, size) => product * size, 1);
};

export const partOne = (): number => {
  return getCircuitProduct(1000);
};

export const partOneTest = (): number => {
  return getCircuitProduct(10);
};

export const partTwo = (): number => {
  const { junctionBoxes } = readInputFile();
  const n = junctionBoxes.length;

  const pairs: JunctionPair[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      pairs.push({
        boxA: i,
        boxB: j,
        distance: calculateDistance(junctionBoxes[i]!, junctionBoxes[j]!),
      });
    }
  }

  pairs.sort((a, b) => a.distance - b.distance);

  const uf = new UnionFind(n);

  let lastBoxA = -1;
  let lastBoxB = -1;

  for (const pair of pairs) {
    const merged = uf.union(pair.boxA, pair.boxB);
    
    if (merged) {
      lastBoxA = pair.boxA;
      lastBoxB = pair.boxB;
      
      const circuitSizes = uf.getCircuitSizes();
      if (circuitSizes.length === 1) {
        break;
      }
    }
  }

  const boxA = junctionBoxes[lastBoxA]!;
  const boxB = junctionBoxes[lastBoxB]!;
  
  return boxA.x * boxB.x;
};
