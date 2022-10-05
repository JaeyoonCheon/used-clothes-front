import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import IDForgotPage from "./pages/IDForgotPage";
import PWForgotPage from "./pages/PWForgotPage";

const App = () => {
  console.log("Render start");
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="idforgot" element={<IDForgotPage />}></Route>
        <Route path="pwforgot" element={<PWForgotPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
