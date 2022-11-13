import classes from "./Grid.module.css";
import { useContext } from "react";
import { GridContext } from "../store/GridContext";
import { Button } from "@mui/material";

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
  const drawPathHandler = () => {
    // TODO: use some algorithm (bfs/dfs) to find the path here
    gridContext.nextTurn();
  };
  const getInstruction = (state: string) => {
    if (state === "Start") return <h3>Please select a starting position</h3>;
    if (state === "Destination") return <h3>Please select a destination</h3>;
    if (state === "Obstacle") return <h3>Please select obstacle(s)"</h3>;
    if (state === "ReadyToDraw")
      return (
        <Button variant="outlined" onClick={drawPathHandler}>
          Draw the path!
        </Button>
      );
    if (state === "Drawing") return <h3>Finding the path...</h3>;
  };
  const cellClickHandler = (row: number, col: number) => {
    gridContext.markCell(row, col, gridContext.state.toLowerCase());
    gridContext.nextTurn();
  };
  return (
    <>
      <div className={classes["label-row"]}>
        <Label name={"Obstacle"} />
        <Label name={"Empty"} />
        <Label name={"Current"} />
        <Label name={"Destination"} />
      </div>
      {getInstruction(gridContext.state)}
      <div className={classes["div-table"]}>
        {props.grid.map((row, rowIndex) => (
          <div className={classes["div-table-row"]}>
            {row.map((cell, colIndex) => (
              <div
                className={`${classes["div-table-col"]} ${classes[cell]}`}
                onClick={() => cellClickHandler(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
export default Grid;
