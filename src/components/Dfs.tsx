import Grid from "./Grid";
import { useContext } from "react";
import { GridContext } from "../store/GridContext";

const Dfs = () => {
  const gridContext = useContext(GridContext);
  return (
    <div>
      DFS page
      <Grid grid={gridContext.grid} />
    </div>
  );
};
export default Dfs;
