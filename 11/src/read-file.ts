import * as fs from "fs";
import * as path from "path";

/**
 * Represents the device network as a directed graph.
 * 
 * The graph is stored as an adjacency list:
 * - Key: device name (e.g., "you", "bbb", "out")
 * - Value: array of device names that this device outputs to
 * 
 * Example:
 *   "you" -> ["bbb", "ccc"]  means device "you" has outputs to "bbb" and "ccc"
 */
export interface IDeviceNetwork {
  graph: Map<string, string[]>;
}

/**
 * Parses a single line of input into a device and its outputs.
 * 
 * Input format: "deviceName: output1 output2 output3"
 * Example: "you: bbb ccc" → { device: "you", outputs: ["bbb", "ccc"] }
 * 
 * @param line - A single line from the input file
 * @returns The device name and its list of output connections
 */
const parseDeviceLine = (line: string): { device: string; outputs: string[] } => {
  const [devicePart, outputsPart] = line.split(":");
  
  const device = devicePart.trim();
  const outputs = outputsPart
    .trim()
    .split(/\s+/)  // Split by whitespace (one or more spaces)
    .filter(output => output.length > 0);  // Remove empty strings
  
  return { device, outputs };
};

/**
 * Reads the input file and builds a directed graph of device connections.
 * 
 * Each line in the input has the format:
 *   deviceName: output1 output2 output3
 * 
 * This means "deviceName" has outputs leading to "output1", "output2", etc.
 * Data flows from a device through its outputs (one-way).
 * 
 * @returns The device network as an adjacency list
 */
export const readInputFile = (): IDeviceNetwork => {
  const rootDir = process.cwd();
  // const filePath = path.join(rootDir, "./data/test.txt");
  const filePath = path.join(rootDir, "./data/input.txt");
  const input = fs.readFileSync(filePath, "utf8");

  const lines: string[] = input.split("\n").filter((line) => line.trim() !== "");

  // Build the adjacency list
  const graph = new Map<string, string[]>();

  for (const line of lines) {
    const { device, outputs } = parseDeviceLine(line);
    graph.set(device, outputs);
  }

  return { graph };
};
