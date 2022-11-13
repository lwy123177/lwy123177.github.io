import classes from "./Grid.module.css";
import { useContext } from "react";
import { GridContext } from "../store/GridContext";

const Label: React.FC<{ name: string }> = (props) => {
  return (
    <div>
      <div
        className={`${classes["div-table-col"]} 
        ${classes[props.name.toLowerCase()]}
        `}
      />
      <label className={classes["label-col"]}>{props.name}</label>
    </div>
  );
};

const Grid: React.FC<{
  grid: string[][];
}> = (props) => {
  const gridContext = useContext(GridContext);
  return (
    <>
      <div className={classes["label-row"]}>
        <Label name={"Obstacle"} />
        <Label name={"Empty"} />
        <Label name={"Current"} />
        <Label name={"Destination"} />
      </div>
      <div className={classes["div-table"]}>
        {props.grid.map((row, rowIndex) => (
          <div className={classes["div-table-row"]}>
            {row.map((cell, colIndex) => (
              <div
                className={`${classes["div-table-col"]} ${classes[cell]}`}
                onClick={() => {
                  gridContext.markCell(rowIndex, colIndex, "obstacle");
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
export default Grid;
