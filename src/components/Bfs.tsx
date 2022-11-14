import Grid from "./Grid";
import { useContext } from "react";
import { GridContext } from "../store/GridContext";
import classes from "./Bfs.module.css";
import { State } from "../store/GridContext";

const Bfs = () => {
  const gridContext = useContext(GridContext);
  const delay = (delayInms: number) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };
  const search = async () => {
    // Start Searching
    gridContext.setState("Drawing");
    let grid = gridContext.grid;
    let queue: [number, number][] = [];
    let startR = 0,
      startC = 0,
      destR = 0,
      destC = 0;
    const dirs = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ];
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] === "start") {
          startR = r;
          startC = c;
        }
        if (grid[r][c] === "destination") {
          destR = r;
          destC = c;
        }
      }
    }
    queue.push([startR, startC]);
    const vis = new Set<string>();
    vis.add(startR + "," + startC);
    let found = false;
    while (!found && queue.length > 0) {
      let sz = queue.length;
      for (let i = 0; i < sz; i++) {
        let popped = queue.shift()!;
        if (popped[0] === destR && popped[1] === destC) {
          found = true;
          break;
        }
        gridContext.markCell(popped[0], popped[1], "current");
        for (let di = 0; di < 4; di++) {
          let dr = popped[0] + dirs[di][0],
            dc = popped[1] + dirs[di][1];
          if (!gridContext.out(dr, dc) && !vis.has(dr + "," + dc)) {
            gridContext.markCell(popped[0], popped[1], "visited");
            vis.add(dr + "," + dc);
            queue.push([dr, dc]);
          }
          await delay(5);
        }
      }
    }
    // Finish Searching
    // gridContext.setState("FinishedDrawing");
  };
  return (
    <div className={classes["bfs-page"]}>
      <h2>Breadth-first Search (BFS)</h2>
      <Grid grid={gridContext.grid} search={search} />
    </div>
  );
};
export default Bfs;
