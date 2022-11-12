import { useState } from "react";
import Grid from "./Grid";

const h = 40;
const w = 50;

const Bfs = () => {
  let startGrid: string[][] = [];
  for (let i = 0; i < h; i++) {
    let row: string[] = [];
    for (let j = 0; j < w; j++) {
      row.push("empty");
    }
    startGrid.push(row);
  }
  const [grid, setGrid] = useState<string[][]>(startGrid);
  return (
    <div>
      BFS page
      <Grid grid={grid} />
    </div>
  );
};
export default Bfs;
