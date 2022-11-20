import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import classes from "./Navbar.module.css";
import { GridContext } from "../store/GridContext";

const Navbar = () => {
  const location = useLocation();
  const [path, setPath] = useState<string>();
  const gridContext = useContext(GridContext);
  const isDrawing = gridContext.state === "Drawing";
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <AppBar position="static" color="secondary">
      <Toolbar variant="dense">
        <div className={`${classes.tab} ${isDrawing ? classes.inactive : ""}`}>
          <Link
            to={isDrawing ? "#" : "/astar"}
            style={{ textDecoration: "none" }}
          >
            <Button
              color={path === "/astar" ? "warning" : "primary"}
              className={classes.tab}
              variant={"text"}
            >
              A*
            </Button>
          </Link>
        </div>
        <div className={`${classes.tab} ${isDrawing ? classes.inactive : ""}`}>
          <Link
            to={isDrawing ? "#" : "/bfs"}
            style={{ textDecoration: "none" }}
          >
            <Button
              color={path === "/bfs" ? "warning" : "primary"}
              className={classes.tab}
              variant={"text"}
            >
              BFS
            </Button>
          </Link>
        </div>
        <div className={`${classes.tab} ${isDrawing ? classes.inactive : ""}`}>
          <Link
            to={isDrawing ? "#" : "/dfs"}
            style={{ textDecoration: "none" }}
          >
            <Button
              color={path === "/dfs" ? "warning" : "primary"}
              className={classes.tab}
              variant={"text"}
            >
              DFS
            </Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
