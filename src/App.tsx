import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Bfs from "./components/Bfs";
import Dfs from "./components/Dfs";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bfs" element={<Bfs />} />
        <Route path="/dfs" element={<Dfs />} />
      </Routes>
    </>
  );
};

export default App;
