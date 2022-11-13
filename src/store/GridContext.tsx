import React, { useState } from "react";

const h = 40;
const w = 50;

type State =
  | "Start"
  | "Destination"
  | "Obstacle"
  | "ReadyToDraw"
  | "Drawing"
  | "FinishedDrawing";

type GridContextObj = {
  grid: string[][];
  markCell: (row: number, col: number, val: string) => void;
  state: State;
  nextTurn: () => void;
};

let startGrid: string[][] = [];
for (let i = 0; i < h; i++) {
  let row: string[] = [];
  for (let j = 0; j < w; j++) {
    row.push("empty");
  }
  startGrid.push(row);
}

export const GridContext = React.createContext<GridContextObj>({
  grid: startGrid,
  markCell: (row: number, col: number, val: string) => {},
  state: "Start",
  nextTurn: () => {},
});

export const GridContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [grid, setGrid] = useState<string[][]>(startGrid);
  const [state, setSelecting] = useState<State>("Start");
  const markCell = (row: number, col: number, val: string) => {
    setGrid((prevState) => {
      let cloneGrid: string[][] = [];
      for (let i = 0; i < prevState.length; i++) {
        cloneGrid.push([...prevState[i]]);
      }
      cloneGrid[row][col] = val;
      return cloneGrid;
    });
  };
  const nextTurn = () => {
    setSelecting((prevState) => {
      if (prevState === "Start") return "Destination";
      if (prevState === "Destination") return "Obstacle";
      if (prevState === "Obstacle") return "ReadyToDraw";
      if (prevState === "ReadyToDraw") return "Drawing";
      if (prevState === "Drawing") return "FinishedDrawing";
      // if (prevState === "FinishedDrawing")
      return "Start";
    });
  };
  const contextValue = {
    grid: grid,
    markCell: markCell,
    state: state,
    nextTurn: nextTurn,
  };
  return (
    <GridContext.Provider value={contextValue}>
      {props.children}
    </GridContext.Provider>
  );
};
