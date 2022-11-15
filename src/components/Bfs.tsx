import Grid from "./Grid";
import { useContext, useRef } from "react";
import { GridContext } from "../store/GridContext";
import classes from "./Bfs.module.css";
import utils from "../util/Util.module.css";

const Bfs = () => {
  const gridContext = useContext(GridContext);
  const speedRef = useRef<HTMLInputElement>(null);
  const delay = (delayInms: number) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };
  const getAnimationDelay = () => 500 - parseInt(speedRef.current!.value);
  const encode = (row: number, col: number) => row + "," + col;
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
    const parent: Record<string, string> = {};
    vis.add(encode(startR, startC));
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
        await delay(getAnimationDelay());
        for (let di = 0; di < 4; di++) {
          let dr = popped[0] + dirs[di][0],
            dc = popped[1] + dirs[di][1];
          if (
            !gridContext.out(dr, dc) &&
            !vis.has(encode(dr, dc)) &&
            gridContext.grid[dr][dc] !== "obstacle"
          ) {
            vis.add(encode(dr, dc));
            queue.push([dr, dc]);
            gridContext.markCell(dr, dc, "exploring");
            parent[encode(dr, dc)] = encode(popped[0], popped[1]);
          }
        }
        gridContext.markCell(popped[0], popped[1], "visited");
      }
    }
    if (found) {
      let cells: [number, number][] = [];
      let now = encode(destR, destC);
      while (now && parent[now]) {
        let points = now.split(",").map((x) => parseInt(x));
        cells.push([points[0], points[1]]);
        now = parent[now];
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
    <div className={classes["bfs-page"]}>
      <h2>Breadth-first Search (BFS)</h2>
      <div
        className={`${gridContext.state === "Drawing" ? utils.visible : ""}
                    ${gridContext.state === "Drawing" ? utils.blink : ""}
                    ${gridContext.state !== "Drawing" ? utils.hidden : ""}
        `}
      >
        Animation Speed <input type="range" min="1" max="499" ref={speedRef} />
      </div>
      <Grid search={search} />
    </div>
  );
};
export default Bfs;
