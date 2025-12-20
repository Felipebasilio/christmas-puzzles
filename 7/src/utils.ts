import { readInputFile } from "./read-file";

export const getBeamSplitCount = (): number => {
  const { grid } = readInputFile();
  
  let startRow = -1;
  let startCol = -1;
  
  for (let row = 0; row < grid.length; row++) {
    const col = grid[row]?.indexOf('S') ?? -1;
    if (col !== -1) {
      startRow = row;
      startCol = col;
      break;
    }
  }
  
  if (startRow === -1 || startCol === -1) {
    throw new Error("Starting position S not found");
  }
  
  let splitCount = 0;
  
  const beamQueue: Array<{ row: number; col: number }> = [{ row: startRow, col: startCol }];
  const processedBeams = new Set<string>();
  const hitSplitters = new Set<string>();
  
  while (beamQueue.length > 0) {
    const beam = beamQueue.shift()!;
    const beamKey = `${beam.row},${beam.col}`;
    
    if (processedBeams.has(beamKey)) {
      continue;
    }
    processedBeams.add(beamKey);
    
    let currentRow = beam.row;
    let currentCol = beam.col;
    
    currentRow++;
    
    while (currentRow < grid.length) {
      const cell = grid[currentRow]?.[currentCol];
      
      if (cell === '^') {
        const splitterKey = `${currentRow},${currentCol}`;
        
        if (!hitSplitters.has(splitterKey)) {
          splitCount++;
          hitSplitters.add(splitterKey);
        }
        
        if (currentCol > 0) {
          const leftBeamKey = `${currentRow},${currentCol - 1}`;
          if (!processedBeams.has(leftBeamKey)) {
            beamQueue.push({ row: currentRow, col: currentCol - 1 });
          }
        }
        
        if (currentCol < (grid[currentRow]?.length ?? 0) - 1) {
          const rightBeamKey = `${currentRow},${currentCol + 1}`;
          if (!processedBeams.has(rightBeamKey)) {
            beamQueue.push({ row: currentRow, col: currentCol + 1 });
          }
        }
        
        break;
      } else if (cell === '.' || cell === undefined || cell === ' ') {
        currentRow++;
      } else {
        break;
      }
    }
  }
  
  return splitCount;
};