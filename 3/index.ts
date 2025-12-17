import { getBatteriesJoltages } from "./src/utils";

const result = getBatteriesJoltages().reduce((acc, curr) => acc + BigInt(curr), BigInt(0));
console.log(result.toString());