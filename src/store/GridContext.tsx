import React, { useState } from "react";

const h = 40;
const w = 50;

type GridContextObj = {
  grid: string[][];
  markCell: (row: number, col: number, val: string) => void;
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
});

export const GridContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [grid, setGrid] = useState<string[][]>(startGrid);
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
  const contextValue = {
    grid: grid,
    markCell: markCell,
  };
  return (
    <GridContext.Provider value={contextValue}>
      {props.children}
    </GridContext.Provider>
  );
};
