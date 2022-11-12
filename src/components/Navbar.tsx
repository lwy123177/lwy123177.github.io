import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar variant="dense">
        <Button color="primary">
          <Link to="/">Home</Link>
        </Button>
        <Button color="primary">
          <Link to="/bfs">BFS</Link>
        </Button>
        <Button color="primary">
          <Link to="/dfs">DFS</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
