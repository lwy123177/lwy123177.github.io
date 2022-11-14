import Grid from "./Grid";
import { useContext } from "react";
import { GridContext } from "../store/GridContext";

const Dfs = () => {
  const gridContext = useContext(GridContext);
  const search = () => {
    // TODO: Implement DFS here
  };
  return (
    <div>
      <h2>Depth-first Search (DFS)</h2>
      <Grid grid={gridContext.grid} search={search} />
    </div>
  );
};
export default Dfs;
