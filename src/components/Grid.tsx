import classes from "./Grid.module.css";

const Grid: React.FC<{
  grid: string[][];
}> = (props) => {
  return (
    <div className={classes["div-table"]}>
      {props.grid.map((row) => (
        <div className={classes["div-table-row"]}>
          {row.map((cell) => (
            <div className={`${classes["div-table-col"]} ${classes[cell]}`} />
          ))}
        </div>
      ))}
    </div>
  );
};
export default Grid;
