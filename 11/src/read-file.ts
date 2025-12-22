import * as fs from "fs";
import * as path from "path";

export interface IDeviceNetwork {
  graph: Map<string, string[]>;
}

const parseDeviceLine = (line: string): { device: string; outputs: string[] } => {
  const [devicePart, outputsPart] = line.split(":");
  
  const device = devicePart.trim();
  const outputs = outputsPart
    .trim()
    .split(/\s+/)
    .filter(output => output.length > 0);
  
  return { device, outputs };
};

export const readInputFile = (): IDeviceNetwork => {
  const rootDir = process.cwd();
  const filePath = path.join(rootDir, "./data/input.txt");
  const input = fs.readFileSync(filePath, "utf8");

  const lines: string[] = input.split("\n").filter((line) => line.trim() !== "");

  const graph = new Map<string, string[]>();

  for (const line of lines) {
    const { device, outputs } = parseDeviceLine(line);
    graph.set(device, outputs);
  }

  return { graph };
};
