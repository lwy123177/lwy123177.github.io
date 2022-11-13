import Grid from "./Grid";
import { useContext } from "react";
import { GridContext } from "../store/GridContext";

const Bfs = () => {
  const gridContext = useContext(GridContext);
  return (
    <div>
      Breadth-first Search (BFS)
      <Grid grid={gridContext.grid} />
    </div>
  );
};
export default Bfs;
