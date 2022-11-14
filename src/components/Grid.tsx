import classes from "./Grid.module.css";
import { useContext, useEffect, useState } from "react";
import { GridContext } from "../store/GridContext";
import { Button } from "@mui/material";
import { State } from "../store/GridContext";

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
  search: () => void;
}> = (props) => {
  const gridContext = useContext(GridContext);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [visible, setIsVisible] = useState<boolean>(false);
  const getInstruction = (state: State) => {
    if (state === "Start") return <h3>Please select a starting position</h3>;
    if (state === "Destination") return <h3>Please select a destination</h3>;
    if (state === "Obstacle")
      return (
        <div className={classes["label-row"]}>
          <h3>Please select obstacle(s): </h3>
          <Button variant="outlined" onClick={props.search}>
            Draw!
          </Button>
        </div>
      );
    if (state === "Drawing") return <h3>Finding the path...</h3>;
    if (state === "FinishedDrawing")
      return (
        <div className={classes["label-row"]}>
          <h3>Done: </h3>
          <Button variant="outlined">Draw Again</Button>
          <Button variant="outlined">Restart</Button>
        </div>
      );
  };
  const cellClickHandler = (row: number, col: number) => {
    let success = gridContext.markCell(
      row,
      col,
      gridContext.state.toLowerCase()
    );
    if (
      success &&
      (gridContext.state === "Start" || gridContext.state === "Destination")
    ) {
      gridContext.nextTurn();
    }
  };
  const cellOverHandler = (row: number, col: number) => {
    if (gridContext.state !== "Obstacle" || !isMouseDown) return;
    gridContext.markCell(row, col, gridContext.state.toLowerCase());
  };
  const cellDownHandler = (row: number, col: number) => {
    if (gridContext.state !== "Obstacle") return;
    gridContext.markCell(row, col, gridContext.state.toLowerCase());
  };
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className={visible ? classes.fadeIn : classes.fadeOut}>
      <div className={classes["label-row"]}>
        <Label name={"Obstacle"} />
        <Label name={"Empty"} />
        <Label name={"Current"} />
        <Label name={"Destination"} />
        <Label name={"Visited"} />
      </div>
      {getInstruction(gridContext.state)}
      <div
        className={classes["div-table"]}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
      >
        {props.grid.map((row, rowIndex) => (
          <div key={"row_" + rowIndex} className={classes["div-table-row"]}>
            {row.map((cell, colIndex) => (
              <div
                key={"cell_" + rowIndex + "," + colIndex}
                className={`${classes["div-table-col"]} ${classes[cell]}`}
                onClick={() => cellClickHandler(rowIndex, colIndex)}
                onMouseOver={() => cellOverHandler(rowIndex, colIndex)}
                onMouseDown={() => cellDownHandler(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Grid;
