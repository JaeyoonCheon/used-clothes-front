import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import IDForgotPage from "./pages/IDForgotPage";

const App = () => {
  console.log("Render start");
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="forgot" element={<IDForgotPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
