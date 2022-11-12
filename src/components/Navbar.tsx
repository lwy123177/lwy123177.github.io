import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [path, setPath] = useState<string>();
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <AppBar position="static" color="secondary">
      <Toolbar variant="dense">
        <Button variant={path == "/" ? "outlined" : "text"}>
          <Link to="/">Home</Link>
        </Button>
        <Button variant={path == "/bfs" ? "outlined" : "text"}>
          <Link to="/bfs">BFS</Link>
        </Button>
        <Button variant={path == "/dfs" ? "outlined" : "text"}>
          <Link to="/dfs">DFS</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
