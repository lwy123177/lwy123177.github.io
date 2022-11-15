import React, { useEffect, useState } from "react";

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
  const [obstacles, setObstacles] = useState<[number, number][]>([]);
  const out = (row: number, col: number) => {
    return row < 0 || col < 0 || row >= grid.length || col >= grid[0].length;
  };
  const markCell = (row: number, col: number, val: string) => {
    if (
      out(row, col) ||
      (grid[row][col] !== "obstacle" && grid[row][col] !== "empty") ||
      (grid[row][col] === "obstacle" && val !== "empty")
    )
      return false;
    setGrid((prevState) => {
      let cloneGrid: string[][] = [];
      for (let i = 0; i < prevState.length; i++) {
        cloneGrid.push([...prevState[i]]);
      }
      cloneGrid[row][col] = val;
      return cloneGrid;
    });
    if (val === "obstacle") {
      setObstacles((prevState) => [...prevState, [row, col]]);
    }
    return true;
  };
  const undo = () => {
    if (state !== "Obstacle" || obstacles.length === 0) return;
    let popped = obstacles[obstacles.length - 1]!;
    markCell(popped[0], popped[1], "empty");
    setObstacles((prevState) => prevState.slice(0, -1));
  };
  const contextValue = {
    grid: grid,
    markCell: markCell,
    state: state,
    setState: setState,
    out: out,
  };
  const keyDownHandler = (event: KeyboardEvent) => {
    const { key } = event;
    let isCtrlKey = event.ctrlKey || event.metaKey;
    let isZ = key.toLowerCase() === "z";
    if (isCtrlKey && isZ) {
      undo();
      event.preventDefault();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [obstacles, state]);

  return (
    <GridContext.Provider value={contextValue}>
      {props.children}
    </GridContext.Provider>
  );
};
