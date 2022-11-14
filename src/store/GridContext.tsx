import React, { useState } from "react";

const h = 40;
const w = 50;

export type State =
  | "Start"
  | "Destination"
  | "Obstacle"
  | "Drawing"
  | "FinishedDrawing";

type GridContextObj = {
  grid: string[][];
  markCell: (row: number, col: number, val: string) => boolean;
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
  markCell: (row: number, col: number, val: string) => true,
  state: "Start",
  nextTurn: () => {},
});

export const GridContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [grid, setGrid] = useState<string[][]>(startGrid);
  const [state, setSelecting] = useState<State>("Start");
  const out = (row: number, col: number) => {
    return row < 0 || col < 0 || row >= grid.length || col >= grid[0].length;
  };
  const markCell = (row: number, col: number, val: string) => {
    if (out(row, col) || grid[row][col] != "empty") return false;
    setGrid((prevState) => {
      let cloneGrid: string[][] = [];
      for (let i = 0; i < prevState.length; i++) {
        cloneGrid.push([...prevState[i]]);
      }
      cloneGrid[row][col] = val;
      return cloneGrid;
    });
    return true;
  };
  const nextTurn = () => {
    setSelecting((prevState) => {
      if (prevState === "Start") return "Destination";
      if (prevState === "Destination") return "Obstacle";
      if (prevState === "Obstacle") return "Drawing";
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