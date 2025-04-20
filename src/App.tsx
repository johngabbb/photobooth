import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/main/Main";
import Camera from "./components/main/Camera";
import Upload from "./components/main/Upload";
import Selection from "./components/main/Selection";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />}></Route>
            <Route path="/selection" element={<Selection />}></Route>
            <Route path="/camera" element={<Camera />}></Route>
            <Route path="/upload" element={<Upload />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
