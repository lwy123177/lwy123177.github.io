import Grid from "./Grid";
import { useContext } from "react";
import { GridContext } from "../store/GridContext";
import classes from "./Dfs.module.css";

const Dfs = () => {
  const gridContext = useContext(GridContext);
  const search = () => {
    // TODO: Implement DFS here
  };
  return (
    <div className={classes["dfs-page"]}>
      <h2>Depth-first Search (DFS)</h2>
      <Grid grid={gridContext.grid} search={search} />
    </div>
  );
};
export default Dfs;
