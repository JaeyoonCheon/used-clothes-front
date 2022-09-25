import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

const App = () => {
  console.log("Render start");
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
