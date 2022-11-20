import { Route, Routes } from "react-router-dom";
import Bfs from "./components/Bfs";
import Dfs from "./components/Dfs";
import AStar from "./components/AStar";
import Navbar from "./components/Navbar";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<AStar />} />
        <Route path="/bfs" element={<Bfs />} />
        <Route path="/dfs" element={<Dfs />} />
        <Route path="/astar" element={<AStar />} />
      </Routes>
    </>
  );
};

export default App;
