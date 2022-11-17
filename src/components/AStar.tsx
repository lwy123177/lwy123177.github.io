import Grid from "./Grid";
import { useContext, useRef } from "react";
import { GridContext } from "../store/GridContext";
import { MinHeap } from "../util/MinHeap";
import classes from "./AStar.module.css";

const AStar = () => {
  const gridContext = useContext(GridContext);
  const speedRef = useRef<HTMLInputElement>(null);
  const delay = (delayInms: number) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };
  const getAnimationDelay = () => 500 - parseInt(speedRef.current!.value);
  const search = async () => {
    // Start Searching
    gridContext.setState("Drawing");
    let grid = gridContext.grid;
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
    // TODO: Implement A* on grid from [startR, startC] to [destR, destC]
    const encode = (row: number, col: number) => row + "," + col;
    const gScore: Record<string, number> = {};
    const confirmed = new Set<string>();
    const cameFrom: Record<string, string> = {};
    const heuristic = (row: number, col: number) => {
      return Math.abs(row - destR) + Math.abs(col - destC);
    };
    const openSet = new MinHeap<[number, number, number]>();

    let found = false;
    openSet.add([heuristic(startR, startC), startR, startC]);
    gScore[encode(startR, startC)] = 0;
    while (openSet.count > 0) {
      const [, r, c] = openSet.extractMin()!;
      const current = encode(r, c);
      if (r === destR && c === destC) {
        found = true;
        break;
      }
      if (confirmed.has(current)) continue;
      confirmed.add(current);
      gridContext.markCell(r, c, "current");
      await delay(getAnimationDelay());
      for (let i = 0; i < 4; i++) {
        const nr = r + dirs[i][0],
          nc = c + dirs[i][1];
        const out =
          nr < 0 || nc < 0 || nr >= grid.length || nc >= grid[0].length;
        if (!out && grid[nr][nc] !== "obstacle") {
          const neighbor = encode(nr, nc);
          const tempG = gScore[current] + 1;
          if (gScore[neighbor] === undefined || tempG < gScore[neighbor]) {
            cameFrom[neighbor] = current;
            gScore[neighbor] = tempG;
            openSet.add([tempG + heuristic(nr, nc), nr, nc]);
          }
        }
      }
      gridContext.markCell(r, c, "visited");
    }
    if (found) {
      let cells: [number, number][] = [];
      let now = encode(destR, destC);
      while (now && cameFrom[now]) {
        let points = now.split(",").map((x) => parseInt(x));
        cells.push([points[0], points[1]]);
        now = cameFrom[now];
      }
      for (let i = cells.length - 1; i >= 1; i--) {
        gridContext.markCell(cells[i][0], cells[i][1], "path");
        await delay(getAnimationDelay());
      }
    }
    // Finish Searching
    gridContext.setState("FinishedDrawing");
  };
  return (
    <div className={classes["astar-page"]}>
      <h2>A* Algorithm</h2>
      <Grid search={search} speedRef={speedRef} />
    </div>
  );
};
export default AStar;
