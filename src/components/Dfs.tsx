import Grid from "./Grid";
import { useContext } from "react";
import { GridContext } from "../store/GridContext";

const Dfs = () => {
  const gridContext = useContext(GridContext);
  return (
    <div>
      <h2>Depth-first Search (DFS)</h2>
      <Grid grid={gridContext.grid} />
    </div>
  );
};
export default Dfs;
