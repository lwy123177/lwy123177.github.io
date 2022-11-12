import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
        <Link to="/">
          <HomeIcon color={path === "/" ? "warning" : "primary"} />
        </Link>
        <Link to="/bfs">
          <Button color={path === "/bfs" ? "warning" : "primary"}>BFS</Button>
        </Link>
        <Link to="/dfs">
          <Button color={path === "/dfs" ? "warning" : "primary"}>DFS</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
