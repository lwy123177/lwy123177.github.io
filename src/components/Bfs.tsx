import Grid from "./Grid";
import { useContext } from "react";
import { GridContext } from "../store/GridContext";

const Bfs = () => {
  const gridContext = useContext(GridContext);
  return (
    <div>
      <h2>Breadth-first Search (BFS)</h2>
      <Grid grid={gridContext.grid} />
    </div>
  );
};
export default Bfs;
