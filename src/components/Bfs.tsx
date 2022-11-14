import Grid from "./Grid";
import { useContext } from "react";
import { GridContext } from "../store/GridContext";
import classes from "./Bfs.module.css";
import { State } from "../store/GridContext";

const Bfs = () => {
  const gridContext = useContext(GridContext);
  const search = () => {
    // Start Searching
    gridContext.setState("Drawing");

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
