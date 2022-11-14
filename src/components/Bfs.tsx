import Grid from "./Grid";
import { useContext } from "react";
import { GridContext } from "../store/GridContext";

const Bfs = () => {
  const gridContext = useContext(GridContext);
  const search = () => {
    // TODO: Implement BFS here
  };
  return (
    <div>
      <h2>Breadth-first Search (BFS)</h2>
      <Grid grid={gridContext.grid} search={search} />
    </div>
  );
};
export default Bfs;
