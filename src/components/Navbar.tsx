import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
  const location = useLocation();
  const [path, setPath] = useState<string>();
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <AppBar position="static" color="secondary">
      <Toolbar variant="dense">
        <div className={classes.tab}>
          <Link to="/">
            <HomeIcon color={path === "/" ? "warning" : "primary"} />
          </Link>
        </div>
        <div className={classes.tab}>
          <Link to="/bfs" style={{ textDecoration: "none" }}>
            <Button
              color={path === "/bfs" ? "warning" : "primary"}
              className={classes.tab}
              variant={"text"}
            >
              BFS
            </Button>
          </Link>
        </div>
        <div className={classes.tab}>
          <Link to="/dfs" style={{ textDecoration: "none" }}>
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
