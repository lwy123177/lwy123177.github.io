import Grid from "./Grid";
import { useContext, useRef } from "react";
import { GridContext } from "../store/GridContext";
import { MinHeap } from "../util/MinHeap";
import classes from "./AStar.module.css";
import utils from "../util/Util.module.css";

const AStar = () => {
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

    // Finish Searching
    gridContext.setState("FinishedDrawing");
  };
  return (
    <div className={classes["astar-page"]}>
      <h2>A* Algorithm</h2>
      <div className={gridContext.state === "Drawing" ? utils.blink : ""}>
        Animation Speed <input type="range" min="1" max="499" ref={speedRef} />
      </div>
      <Grid search={search} />
    </div>
  );
};
export default AStar;
