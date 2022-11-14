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
  setState: (state: State) => void;
  out: (row: number, col: number) => boolean;
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
  setState: (state: State) => {},
  out: (row: number, col: number) => true,
});

export const GridContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [grid, setGrid] = useState<string[][]>(startGrid);
  const [state, setState] = useState<State>("Start");
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
  const contextValue = {
    grid: grid,
    markCell: markCell,
    state: state,
    setState: setState,
    out: out,
  };
  return (
    <GridContext.Provider value={contextValue}>
      {props.children}
    </GridContext.Provider>
  );
};
