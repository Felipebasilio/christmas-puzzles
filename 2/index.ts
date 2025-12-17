import { getIdsList } from "./src/utils";

const result = getIdsList().reduce((acc, curr) => acc + curr, 0);
console.log(result);